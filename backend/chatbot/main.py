from fastapi import HTTPException
from fastapi.applications import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langserve import add_routes
from langchain_community.chat_models.openai import ChatOpenAI
from langchain_community.vectorstores import Qdrant
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader
from pydantic import BaseModel, HttpUrl
from qdrant_client.models import (
    Distance,
    VectorParams,
    FilterSelector,
    Filter,
    FieldCondition,
    MatchValue,
)
from qdrant_client.http.exceptions import UnexpectedResponse
from dotenv import load_dotenv
import qdrant_client
import os
from datetime import datetime
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain import hub

load_dotenv()

QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION")

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

client = qdrant_client.QdrantClient(
    os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),  # For Qdrant Cloud, None for local instance
)


try:
    client.get_collection(QDRANT_COLLECTION)
except UnexpectedResponse as e:
    if "404" in str(e):
        client.create_collection(
            QDRANT_COLLECTION,
            vectors_config=VectorParams(size=1536, distance=Distance.DOT),
        )
    else:
        raise


doc_store = Qdrant(
    client=client,
    collection_name=QDRANT_COLLECTION,
    embeddings=embeddings,
)

retriever = doc_store.as_retriever()

app = FastAPI(
    title="RPL",
    version="1.0",
    description="A simple chatbot server",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/collections")
def get_collections():
    return client.get_collections()


class CreateDocsRequest(BaseModel):
    url: str
    chunk_size: int = 500
    chunk_overlap: int = 0


class ReadDocsRequest(BaseModel):
    title: str


class DeleteDocsRequest(BaseModel):
    title: str


@app.post("/docs/create")
async def create_docs(request: CreateDocsRequest):
    try:
        loader = WebBaseLoader(request.url)
        data = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=request.chunk_size, chunk_overlap=request.chunk_overlap
        )

        splits = text_splitter.split_documents(data)
        for doc in splits:
            doc.metadata["timestamp"] = datetime.now()
            doc.page_content = doc.page_content.replace("\n", "")

        await doc_store.aadd_documents(documents=splits)

        return splits[0]  # Returning the first split as a sample response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/docs/read")
def read_docs():
    try:
        response = client.scroll(
            collection_name=QDRANT_COLLECTION,
            scroll_filter=Filter(
                must=[
                    FieldCondition(
                        key="metadata.language", match=MatchValue(value="en")
                    )
                ]
            ),
        )

        # Ensure response is valid and return it
        if response:
            return response
        else:
            raise HTTPException(status_code=404, detail="No documents found")

    except Exception as e:
        # Log the exception for debugging
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.delete("/docs/delete")
def delete_docs(request: DeleteDocsRequest):
    try:
        response = (
            client.delete(
                collection_name=QDRANT_COLLECTION,
                points_selector=Filter(
                    must=[
                        FieldCondition(
                            key="metadata.title", match=MatchValue(value=request.title)
                        )
                    ]
                ),
            ),
        )

        if response:
            return response[1]
        else:
            raise HTTPException(status_code=404, detail="No documents found")

    except Exception as e:
        return e


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


llm = ChatOpenAI(model="gpt-3.5-turbo")
prompt = hub.pull("rlm/rag-prompt")

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

add_routes(
    app,
    rag_chain,
    path="/chat",
    # enabled_endpoints=["invoke"]
)

from fastapi.applications import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langserve import add_routes
from langchain_community.chat_models.openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

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


add_routes(
    app,
    ChatOpenAI(),
    path="/chat",
    # enabled_endpoints=["invoke"]
)

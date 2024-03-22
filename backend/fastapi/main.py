from fastapi.applications import FastAPI

app = FastAPI()

@app.get("/get/ehr/{id}")
async def get_ehr_by_id(id: int):
    return {"example_response": "here", "id": id, "success":True}
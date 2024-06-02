import os
import motor.motor_asyncio
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client.get_database("rpl")

alzheimer_preds = db.get_collection("alzheimer_preds")
pneumonia_preds = db.get_collection("pneumonia_preds")
fetal_preds = db.get_collection("fetal_preds")



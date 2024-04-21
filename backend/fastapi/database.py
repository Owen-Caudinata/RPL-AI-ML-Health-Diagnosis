import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017/")
db = client.get_database("rpl")

alzheimer_preds = db.get_collection("alzheimer_preds")
pneumonia_preds = db.get_collection("pneumonia_preds")



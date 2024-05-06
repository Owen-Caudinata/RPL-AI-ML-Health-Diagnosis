import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const router = Router();
const prisma = new PrismaClient();

// ... existing code ...

// Function to find the most relevant document
async function findMostRelevantDocument(query) {
  const documents = await prisma.retrievalAugmented.findMany();
  let maxAccuracy = 0;
  let mostRelevantDocument = null;

  documents.forEach(document => {
    const accuracy = (document.content.match(new RegExp(query, 'g')) || []).length;
    if (accuracy > maxAccuracy) {
      maxAccuracy = accuracy;
      mostRelevantDocument = document;
    }
  });

  return mostRelevantDocument;
}

// Endpoint to get the most relevant document
router.post('/getDocument', async (req, res) => {
  try {
    const query = req.body.query;
    const document = await findMostRelevantDocument(query);
    res.json(document);
  } catch (error) {
    console.error('Error during document retrieval:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;
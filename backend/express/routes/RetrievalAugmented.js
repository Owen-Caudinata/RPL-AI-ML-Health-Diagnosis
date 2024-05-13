import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const router = Router();
const prisma = new PrismaClient();


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

// Endpoint to update a document
router.put('/updateDocument/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { RetrievalID, title, content, description } = req.body;

    const document = await prisma.retrievalAugmented.update({
      where: { id: Number(id) },
      data: {
        RetrievalID,
        title,
        content,
        description,
      },
    });

    res.json(document);
  } catch (error) {
    console.error('Error during document update:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to delete a document
router.delete('/deleteDocument/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.retrievalAugmented.delete({
      where: { id: Number(id) },
    });

    res.json(document);
  } catch (error) {
    console.error('Error during document deletion:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
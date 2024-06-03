import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin, authenticateUser } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/create", authenticateAdmin, async (req, res) => {
    try {
        const { title, content, author, category, published } = req.body;

        const createBlog = await prisma.healthEducationBlog.create({
            data: {
                title,
                content,
                author,
                category,
                published: published || false, // Default to false if not provided
            },
        });

        res.status(201).json(createBlog);
    } catch (error) {
        console.error("Error creating Blog record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/edit/:id", authenticateAdmin, async (req, res) => {
    try {
        const blogId = parseInt(req.params.id);
        const { title, content, author, category, published } = req.body;

        const existingBlog = await prisma.healthEducationBlog.findUnique({
            where: {
                id: blogId,
            },
        });

        if (!existingBlog) {
            return res.status(404).send("Blog record with the given ID not found");
        }

        const updatedBlog = await prisma.healthEducationBlog.update({
            where: {
                id: blogId,
            },
            data: {
                title: title !== undefined ? title : existingBlog.title,
                content: content !== undefined ? content : existingBlog.content,
                author: author !== undefined ? author : existingBlog.author,
                category: category !== undefined ? category : existingBlog.category,
                published: published !== undefined ? published : existingBlog.published,
            },
        });

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error("Error updating Blog record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/delete/:id", authenticateAdmin, async (req, res) => {
    try {
        const blogId = parseInt(req.params.id);

        const blogRecord = await prisma.healthEducationBlog.findUnique({
            where: {
                id: blogId,
            },
        });

        if (!blogRecord) {
            return res.status(404).send("Blog record with the given ID not found");
        }

        await prisma.healthEducationBlog.delete({
            where: {
                id: blogId,
            },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting Blog record:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/get-all", authenticateAdmin, async (req, res) => {
    try {
        const blogsRecords = await prisma.healthEducationBlog.findMany();

        res.status(200).json(blogsRecords);
    } catch (error) {
        console.error("Error fetching Blogs records:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/get-all-published", authenticateUser, async (req, res) => {
    try {
        const blogsRecords = await prisma.healthEducationBlog.findMany({
            where: {
                published: true
            }
        });

        res.status(200).json(blogsRecords);
    } catch (error) {
        console.error("Error fetching Blogs records:", error);
        res.status(500).send("Internal Server Error");
    }
});


export default router;
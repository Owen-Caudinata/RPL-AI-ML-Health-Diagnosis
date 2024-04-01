import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await prisma.admin.findUnique({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.admin.create({
            data: {
                email,
                hashedPassword,
            },
        });

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.hashedPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ adminId: admin.id }, process.env.ADMIN_JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/me", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token)
        const decodedToken = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        const adminId = decodedToken.adminId;

        const admin = await prisma.admin.findUnique({ where: { id: adminId } });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ admin });
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/get", async (req, res) => {
    try {
        const admins = await prisma.admin.findMany();

        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;

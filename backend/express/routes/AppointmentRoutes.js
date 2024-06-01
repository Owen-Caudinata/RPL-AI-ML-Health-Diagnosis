import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin, authenticateUser } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/get", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const appointmentRecords = await prisma.appointment.findMany({ where: { userId } });

    res.status(200).json(appointmentRecords);
  } catch (error) {
    console.error("Error fetching Appointments Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/get-all", authenticateAdmin, async (req, res) => {
  try {

    const appointmentRecords = await prisma.appointment.findMany();

    res.status(200).json(appointmentRecords);
  } catch (error) {
    console.error("Error fetching Appointments Record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, description, appointmentDate, status, location } = req.body;

    const createAppointment = await prisma.appointment.create({
      data: {
        title,
        description,
        appointmentDate,
        status,
        location,
        userId,
      },
    });

    res.status(201).json(createAppointment);
  } catch (error) {
    console.error("Error creating Appointment record:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const appointmentId = parseInt(req.params.id);
    const { title, description, appointmentDate, status, location } = req.body;

    const existingAppointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
        userId: userId,
      },
    });

    if (!existingAppointment) {
      return res.status(404).send("Appointment record with the given ID not found");
    }

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        title: title || existingAppointment.title,
        description: description || existingAppointment.description,
        appointmentDate: appointmentDate || existingAppointment.appointmentDate,
        status: status || existingAppointment.status,
        location: location || existingAppointment.location,
      },
    });

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error updating Appointment record:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.delete("/delete/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const appointmentId = parseInt(req.params.id);

    const appointmentRecord = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
        userId: userId,
      },
    });

    if (!appointmentRecord) {
      return res.status(404).send("Appointment record with the given ID not found");
    }

    await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Appointment record:", error);
    res.status(500).send("Internal Server Error");
  }
});


export default router;

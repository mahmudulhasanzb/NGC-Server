import { Router } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../lib/response";

const router = Router();

// 1. CREATE Teacher
router.post("/", async (req, res) => {
  try {
    const {
      name,
      designation,
      department,
      qualification,
      email,
      phone,
      photoUrl,
      bio,
      presentAddress,
      permanentAddress,
      mpoIndexNo,
      joiningDate,
      experience,
      interest,
      orderIndex,
    } = req.body;

    if (!name || !designation || !department || !qualification) {
      return sendResponse(
        res,
        400,
        false,
        "Name, designation, department, and qualification are required"
      );
    }

    const teacher = await prisma.teacher.create({
      data: {
        name,
        designation,
        department,
        qualification,
        email: email || null,
        phone: phone || null,
        photoUrl: photoUrl || null,
        bio: bio || null,
        presentAddress: presentAddress || null,
        permanentAddress: permanentAddress || null,
        mpoIndexNo: mpoIndexNo || null,
        joiningDate: joiningDate || null,
        experience: experience || null,
        interest: interest || null,
        orderIndex: Number(orderIndex) || 0,
      },
    });

    sendResponse(res, 201, true, "Teacher created successfully", teacher);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to create teacher");
  }
});

// 2. GET ALL Teachers (with optional department filter & orderIndex sorting)
router.get("/", async (req, res) => {
  try {
    const { department, search } = req.query;

    const teachers = await prisma.teacher.findMany({
      where: {
        isDeleted: false,
        ...(department ? { department: String(department) } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: String(search), mode: "insensitive" } },
                { designation: { contains: String(search), mode: "insensitive" } },
                { department: { contains: String(search), mode: "insensitive" } },
                { qualification: { contains: String(search), mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
    });

    sendResponse(res, 200, true, "Teachers retrieved successfully", teachers);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve teachers");
  }
});

// 3. GET Teacher BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await prisma.teacher.findFirst({
      where: { id, isDeleted: false },
    });

    if (!teacher) {
      return sendResponse(res, 404, false, "Teacher not found");
    }

    sendResponse(res, 200, true, "Teacher retrieved successfully", teacher);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve teacher");
  }
});

// 4. UPDATE Teacher
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      designation,
      department,
      qualification,
      email,
      phone,
      photoUrl,
      bio,
      presentAddress,
      permanentAddress,
      mpoIndexNo,
      joiningDate,
      experience,
      interest,
      orderIndex,
    } = req.body;

    const teacherExists = await prisma.teacher.findFirst({
      where: { id, isDeleted: false },
    });

    if (!teacherExists) {
      return sendResponse(res, 404, false, "Teacher not found");
    }

    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(designation && { designation }),
        ...(department && { department }),
        ...(qualification && { qualification }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(bio !== undefined && { bio }),
        ...(presentAddress !== undefined && { presentAddress }),
        ...(permanentAddress !== undefined && { permanentAddress }),
        ...(mpoIndexNo !== undefined && { mpoIndexNo }),
        ...(joiningDate !== undefined && { joiningDate }),
        ...(experience !== undefined && { experience }),
        ...(interest !== undefined && { interest }),
        ...(orderIndex !== undefined && { orderIndex: Number(orderIndex) }),
      },
    });

    sendResponse(res, 200, true, "Teacher updated successfully", updatedTeacher);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to update teacher");
  }
});

// 5. DELETE Teacher (Soft Delete)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const teacherExists = await prisma.teacher.findFirst({
      where: { id, isDeleted: false },
    });

    if (!teacherExists) {
      return sendResponse(res, 404, false, "Teacher not found");
    }

    await prisma.teacher.update({
      where: { id },
      data: { isDeleted: true },
    });

    sendResponse(res, 200, true, "Teacher deleted successfully");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to delete teacher");
  }
});

export default router;

import { Router } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../lib/response";

const router = Router();

// 1. CREATE User
router.post("/", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return sendResponse(res, 400, false, "Email, password, and name are required");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return sendResponse(res, 409, false, "User with this email already exists");
    }

    const user = await prisma.user.create({
      data: {
        email,
        password, // In real auth, hash with Bun.password or bcrypt
        name,
        role: role || "ADMIN",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    sendResponse(res, 201, true, "User created successfully", user);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to create user");
  }
});

// 2. GET ALL Users (Exclude soft deleted)
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    sendResponse(res, 200, true, "Users retrieved successfully", users);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve users");
  }
});

// 3. GET User BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    sendResponse(res, 200, true, "User retrieved successfully", user);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve user");
  }
});

// 4. UPDATE User
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, isActive } = req.body;

    const userExists = await prisma.user.findFirst({
      where: { id, isDeleted: false },
    });

    if (!userExists) {
      return sendResponse(res, 404, false, "User not found");
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    sendResponse(res, 200, true, "User updated successfully", updatedUser);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to update user");
  }
});

// 5. DELETE User (Soft Delete)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userExists = await prisma.user.findFirst({
      where: { id, isDeleted: false },
    });

    if (!userExists) {
      return sendResponse(res, 404, false, "User not found");
    }

    await prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    sendResponse(res, 200, true, "User deleted successfully");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to delete user");
  }
});

export default router;

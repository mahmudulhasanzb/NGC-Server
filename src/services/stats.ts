import { Router } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../lib/response";

const router = Router();

// 1. CREATE College Stat
router.post("/", async (req, res) => {
  try {
    const { label, value, icon, orderIndex } = req.body;

    if (!label || !value) {
      return sendResponse(res, 400, false, "Label and value are required");
    }

    const stat = await prisma.collegeStat.create({
      data: {
        label,
        value,
        icon: icon || null,
        orderIndex: Number(orderIndex) || 0,
      },
    });

    sendResponse(res, 201, true, "College stat created successfully", stat);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to create college stat");
  }
});

// 2. GET ALL College Stats
router.get("/", async (_req, res) => {
  try {
    const stats = await prisma.collegeStat.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        orderIndex: "asc",
      },
    });

    sendResponse(res, 200, true, "College stats retrieved successfully", stats);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve college stats");
  }
});

// 3. GET Stat BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const stat = await prisma.collegeStat.findFirst({
      where: { id, isDeleted: false },
    });

    if (!stat) {
      return sendResponse(res, 404, false, "College stat not found");
    }

    sendResponse(res, 200, true, "College stat retrieved successfully", stat);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve college stat");
  }
});

// 4. UPDATE Stat
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { label, value, icon, orderIndex } = req.body;

    const statExists = await prisma.collegeStat.findFirst({
      where: { id, isDeleted: false },
    });

    if (!statExists) {
      return sendResponse(res, 404, false, "College stat not found");
    }

    const updated = await prisma.collegeStat.update({
      where: { id },
      data: {
        ...(label && { label }),
        ...(value && { value }),
        ...(icon !== undefined && { icon }),
        ...(orderIndex !== undefined && { orderIndex: Number(orderIndex) }),
      },
    });

    sendResponse(res, 200, true, "College stat updated successfully", updated);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to update college stat");
  }
});

// 5. DELETE Stat (Soft Delete)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const statExists = await prisma.collegeStat.findFirst({
      where: { id, isDeleted: false },
    });

    if (!statExists) {
      return sendResponse(res, 404, false, "College stat not found");
    }

    await prisma.collegeStat.update({
      where: { id },
      data: { isDeleted: true },
    });

    sendResponse(res, 200, true, "College stat deleted successfully");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to delete college stat");
  }
});

export default router;

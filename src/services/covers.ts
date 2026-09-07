import { Router } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../lib/response";

const router = Router();

// 1. CREATE Cover
router.post("/", async (req, res) => {
  try {
    const {
      imageUrl,
      badge,
      title,
      subtitle,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      orderIndex,
      isActive,
    } = req.body;

    if (!title || !imageUrl) {
      return sendResponse(res, 400, false, "Title and imageUrl are required");
    }

    const cover = await prisma.cover.create({
      data: {
        imageUrl,
        badge: badge || null,
        title,
        subtitle: subtitle || null,
        primaryCtaText: primaryCtaText || "Apply for Admission",
        primaryCtaLink: primaryCtaLink || "/admission",
        secondaryCtaText: secondaryCtaText || "Learn More",
        secondaryCtaLink: secondaryCtaLink || "/about",
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    sendResponse(res, 201, true, "Cover created successfully", cover);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to create cover");
  }
});

// 2. GET ALL Covers
router.get("/", async (req, res) => {
  try {
    const { isActive } = req.query;

    const covers = await prisma.cover.findMany({
      where: {
        isDeleted: false,
        ...(isActive !== undefined ? { isActive: isActive === "true" } : {}),
      },
      orderBy: [
        { orderIndex: "asc" },
        { createdAt: "desc" },
      ],
    });

    sendResponse(res, 200, true, "Covers retrieved successfully", covers);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve covers");
  }
});

// 3. GET Cover BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cover = await prisma.cover.findFirst({
      where: { id, isDeleted: false },
    });

    if (!cover) {
      return sendResponse(res, 404, false, "Cover not found");
    }

    sendResponse(res, 200, true, "Cover retrieved successfully", cover);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve cover");
  }
});

// 4. UPDATE Cover
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      imageUrl,
      badge,
      title,
      subtitle,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      orderIndex,
      isActive,
    } = req.body;

    const coverExists = await prisma.cover.findFirst({
      where: { id, isDeleted: false },
    });

    if (!coverExists) {
      return sendResponse(res, 404, false, "Cover not found");
    }

    const updatedCover = await prisma.cover.update({
      where: { id },
      data: {
        ...(imageUrl !== undefined && { imageUrl }),
        ...(badge !== undefined && { badge }),
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(primaryCtaText !== undefined && { primaryCtaText }),
        ...(primaryCtaLink !== undefined && { primaryCtaLink }),
        ...(secondaryCtaText !== undefined && { secondaryCtaText }),
        ...(secondaryCtaLink !== undefined && { secondaryCtaLink }),
        ...(orderIndex !== undefined && { orderIndex: Number(orderIndex) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      },
    });

    sendResponse(res, 200, true, "Cover updated successfully", updatedCover);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to update cover");
  }
});

// 5. DELETE Cover (Soft Delete)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const coverExists = await prisma.cover.findFirst({
      where: { id, isDeleted: false },
    });

    if (!coverExists) {
      return sendResponse(res, 404, false, "Cover not found");
    }

    await prisma.cover.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    sendResponse(res, 200, true, "Cover deleted successfully");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to delete cover");
  }
});

export default router;

import { Router } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../lib/response";

const router = Router();

// 1. CREATE Gallery / Moment Item
router.post("/", async (req, res) => {
  try {
    const { title, imageUrl, caption, category, isFeatured } = req.body;

    if (!title || !imageUrl) {
      return sendResponse(res, 400, false, "Title and imageUrl are required");
    }

    const item = await prisma.galleryItem.create({
      data: {
        title,
        imageUrl,
        caption: caption || null,
        category: category || "General",
        isFeatured: Boolean(isFeatured),
      },
    });

    sendResponse(res, 201, true, "Gallery item created successfully", item);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to create gallery item");
  }
});

// 2. GET ALL Gallery Items (filter by category, isFeatured)
router.get("/", async (req, res) => {
  try {
    const { category, isFeatured } = req.query;

    const items = await prisma.galleryItem.findMany({
      where: {
        isDeleted: false,
        ...(category ? { category: String(category) } : {}),
        ...(isFeatured !== undefined ? { isFeatured: isFeatured === "true" } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    sendResponse(res, 200, true, "Gallery items retrieved successfully", items);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve gallery items");
  }
});

// 3. GET Gallery Item BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.galleryItem.findFirst({
      where: { id, isDeleted: false },
    });

    if (!item) {
      return sendResponse(res, 404, false, "Gallery item not found");
    }

    sendResponse(res, 200, true, "Gallery item retrieved successfully", item);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve gallery item");
  }
});

// 4. UPDATE Gallery Item
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, caption, category, isFeatured } = req.body;

    const itemExists = await prisma.galleryItem.findFirst({
      where: { id, isDeleted: false },
    });

    if (!itemExists) {
      return sendResponse(res, 404, false, "Gallery item not found");
    }

    const updated = await prisma.galleryItem.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(imageUrl && { imageUrl }),
        ...(caption !== undefined && { caption }),
        ...(category !== undefined && { category }),
        ...(isFeatured !== undefined && { isFeatured }),
      },
    });

    sendResponse(res, 200, true, "Gallery item updated successfully", updated);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to update gallery item");
  }
});

// 5. DELETE Gallery Item (Soft Delete)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const itemExists = await prisma.galleryItem.findFirst({
      where: { id, isDeleted: false },
    });

    if (!itemExists) {
      return sendResponse(res, 404, false, "Gallery item not found");
    }

    await prisma.galleryItem.update({
      where: { id },
      data: { isDeleted: true },
    });

    sendResponse(res, 200, true, "Gallery item deleted successfully");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to delete gallery item");
  }
});

export default router;

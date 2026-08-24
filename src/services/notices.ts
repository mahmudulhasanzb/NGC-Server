import { Router } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../lib/response";

const router = Router();

// Helper: Convert title to URL slug
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// 1. CREATE Notice
router.post("/", async (req, res) => {
  try {
    const { title, slug, content, category, attachment, isFeatured, authorId } = req.body;

    if (!title || !content || !authorId) {
      return sendResponse(res, 400, false, "Title, content, and authorId are required");
    }

    // Verify author exists
    const authorExists = await prisma.user.findFirst({
      where: { id: authorId, isDeleted: false },
    });

    if (!authorExists) {
      return sendResponse(res, 404, false, "Author user not found");
    }

    // Generate unique slug if not provided
    const finalSlug = slug ? slugify(slug) : `${slugify(title)}-${Date.now().toString().slice(-4)}`;

    const notice = await prisma.notice.create({
      data: {
        title,
        slug: finalSlug,
        content,
        category: category || "GENERAL",
        attachment: attachment || null,
        isFeatured: Boolean(isFeatured),
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    sendResponse(res, 201, true, "Notice created successfully", notice);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to create notice");
  }
});

// 2. GET ALL Notices (with filter by category, isFeatured, and search)
router.get("/", async (req, res) => {
  try {
    const { category, isFeatured, search } = req.query;

    const notices = await prisma.notice.findMany({
      where: {
        isDeleted: false,
        ...(category ? { category: String(category).toUpperCase() as any } : {}),
        ...(isFeatured !== undefined ? { isFeatured: isFeatured === "true" } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: String(search), mode: "insensitive" } },
                { content: { contains: String(search), mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    sendResponse(res, 200, true, "Notices retrieved successfully", notices);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve notices");
  }
});

// 3. GET Notice BY ID or SLUG
router.get("/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const notice = await prisma.notice.findFirst({
      where: {
        isDeleted: false,
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!notice) {
      return sendResponse(res, 404, false, "Notice not found");
    }

    sendResponse(res, 200, true, "Notice retrieved successfully", notice);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve notice");
  }
});

// 4. UPDATE Notice
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, attachment, isFeatured } = req.body;

    const noticeExists = await prisma.notice.findFirst({
      where: { id, isDeleted: false },
    });

    if (!noticeExists) {
      return sendResponse(res, 404, false, "Notice not found");
    }

    const updatedNotice = await prisma.notice.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(category && { category }),
        ...(attachment !== undefined && { attachment }),
        ...(isFeatured !== undefined && { isFeatured }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    sendResponse(res, 200, true, "Notice updated successfully", updatedNotice);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to update notice");
  }
});

// 5. DELETE Notice (Soft Delete)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const noticeExists = await prisma.notice.findFirst({
      where: { id, isDeleted: false },
    });

    if (!noticeExists) {
      return sendResponse(res, 404, false, "Notice not found");
    }

    await prisma.notice.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    sendResponse(res, 200, true, "Notice deleted successfully");
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to delete notice");
  }
});

export default router;

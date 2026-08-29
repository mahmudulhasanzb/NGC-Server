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

    if (!title || !content) {
      return sendResponse(res, 400, false, "Title and content are required");
    }

    // Resolve author (provided or find first active admin)
    let finalAuthorId = authorId;
    if (!finalAuthorId) {
      let admin = await prisma.user.findFirst({
        where: { isDeleted: false },
      });

      if (!admin) {
        // Create fallback admin record if none exists
        admin = await prisma.user.create({
          data: {
            name: "Principal / Administrator",
            email: "admin@ngc.edu.bd",
            password: "hashed_system_pw",
            role: "ADMIN",
          },
        });
      }
      finalAuthorId = admin.id;
    }

    // Generate unique slug
    const baseSlug = slug ? slugify(slug) : slugify(title);
    let finalSlug = baseSlug;
    const existingSlug = await prisma.notice.findUnique({ where: { slug: finalSlug } });
    if (existingSlug) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        slug: finalSlug,
        content,
        category: (category ? String(category).toUpperCase() : "GENERAL") as any,
        attachment: attachment || null,
        isFeatured: Boolean(isFeatured),
        authorId: finalAuthorId,
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
        ...(category && category !== "ALL"
          ? { category: String(category).toUpperCase() as any }
          : {}),
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
        ...(category && { category: String(category).toUpperCase() as any }),
        ...(attachment !== undefined && { attachment }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
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

import { Router } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../lib/response";

const router = Router();

const defaultAboutData = {
  heading: "40+ Years of Academic Excellence in Nabiganj",
  subheading: "Empowering generations through quality education, discipline, and integrity since 1984.",
  description1: "Nabiganj Government College stands as the premier public institution for higher secondary and undergraduate education in Habiganj district. Established with the visionary goal of bringing accessible, top-tier education to the students of Nabiganj and surrounding regions, the college has nurtured thousands of scholars, civil servants, doctors, engineers, and nation-builders.",
  description2: "Under the supervision of the Ministry of Education and National University, our campus provides modern science laboratories, an extensive computerized library, active extracurricular societies, and a dedicated cadre of government BCS educators committed to fostering academic brilliance and moral character.",
  videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  videoThumbnail: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  missionText: "To provide inclusive, high-caliber education that cultivates critical intellect, civic duty, and ethical leadership in every student.",
  visionText: "To stand as a leading center of educational distinction in Sylhet division, advancing digital literacy and academic excellence.",
  valuesText: "Integrity, Academic Discipline, Inclusivity, Scientific Curiosity, and Community Devotion.",
  establishedYear: "1984",
  eiinNumber: "129524",
  collegeCode: "1301",
  nuCode: "1706",
};

// 1. GET About Information
router.get("/", async (_req, res) => {
  try {
    let about = await prisma.collegeAbout.findFirst();

    if (!about) {
      about = await prisma.collegeAbout.create({
        data: defaultAboutData,
      });
    }

    sendResponse(res, 200, true, "College about information retrieved successfully", about);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to retrieve about info");
  }
});

// 2. UPDATE / UPSERT About Information
router.patch("/", async (req, res) => {
  try {
    const {
      heading,
      subheading,
      description1,
      description2,
      videoEmbedUrl,
      videoThumbnail,
      missionText,
      visionText,
      valuesText,
      establishedYear,
      eiinNumber,
      collegeCode,
      nuCode,
    } = req.body;

    let about = await prisma.collegeAbout.findFirst();

    const dataToSave = {
      ...(heading && { heading }),
      ...(subheading && { subheading }),
      ...(description1 && { description1 }),
      ...(description2 && { description2 }),
      ...(videoEmbedUrl !== undefined && { videoEmbedUrl }),
      ...(videoThumbnail !== undefined && { videoThumbnail }),
      ...(missionText !== undefined && { missionText }),
      ...(visionText !== undefined && { visionText }),
      ...(valuesText !== undefined && { valuesText }),
      ...(establishedYear !== undefined && { establishedYear }),
      ...(eiinNumber !== undefined && { eiinNumber }),
      ...(collegeCode !== undefined && { collegeCode }),
      ...(nuCode !== undefined && { nuCode }),
    };

    if (!about) {
      about = await prisma.collegeAbout.create({
        data: {
          ...defaultAboutData,
          ...dataToSave,
        },
      });
    } else {
      about = await prisma.collegeAbout.update({
        where: { id: about.id },
        data: dataToSave,
      });
    }

    sendResponse(res, 200, true, "College about information updated successfully", about);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message || "Failed to update about info");
  }
});

export default router;

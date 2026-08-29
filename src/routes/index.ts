import { Router } from "express";
import users from "../services/users";
import notices from "../services/notices";
import teachers from "../services/teachers";
import gallery from "../services/gallery";
import stats from "../services/stats";
import about from "../services/about";

const router = Router();

// Register services
router.use("/users", users);
router.use("/notices", notices);
router.use("/teachers", teachers);
router.use("/gallery", gallery);
router.use("/stats", stats);
router.use("/about", about);

export default router;

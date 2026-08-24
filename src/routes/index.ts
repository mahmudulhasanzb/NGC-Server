import { Router } from "express";
import users from "../services/users";
import notices from "../services/notices";

const router = Router();

// Register services
router.use("/users", users);
router.use("/notices", notices);

export default router;

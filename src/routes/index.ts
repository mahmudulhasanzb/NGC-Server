import { Router } from "express";
import users from "../services/users";

const router = Router();

// Register services
router.use("/users", users);

export default router;

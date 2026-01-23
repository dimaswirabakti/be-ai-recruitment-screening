import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { createJobHandler } from "../controllers/jobController";

const router = Router();

router.post("/", authenticate, createJobHandler);

export default router;

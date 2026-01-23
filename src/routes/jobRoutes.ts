import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { createJobHandler } from "../controllers/jobController";

const router = Router();

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new Job and start AI screening
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobInput'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/JobResponse'
 *       401:
 *         description: Unauthorized (Missing/Invalid Token)
 *       500:
 *         description: Internal Server Error
 */
router.post("/", authenticate, createJobHandler);

export default router;

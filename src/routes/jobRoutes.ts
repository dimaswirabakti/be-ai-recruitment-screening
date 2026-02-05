import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import {
  createJobHandler,
  getAllJobsHandler,
  getJobByIdHandler,
} from "../controllers/jobController";
import { aiTriggerLimiter, generalLimiter } from "../middlewares/rateLimiter";

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
 *   get:
 *     summary: Get all jobs for the authenticated user
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/", authenticate, aiTriggerLimiter, createJobHandler);
router.get("/", authenticate, generalLimiter, getAllJobsHandler);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get job details and candidate list (sorted by score)
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The job ID
 *     responses:
 *       200:
 *         description: Job details and candidates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     job:
 *                       $ref: '#/components/schemas/JobResponse'
 *                     candidates:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           score:
 *                             type: integer
 *                           skills:
 *                             type: array
 *                             items:
 *                               type: string
 *                           summary:
 *                             type: string
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", authenticate, generalLimiter, getJobByIdHandler);

export default router;

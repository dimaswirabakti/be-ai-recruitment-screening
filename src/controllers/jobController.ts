import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import * as jobService from "../services/jobService";

export const createJobHandler = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user || !req.user.uid) {
      res.status(401).json({ error: "Unauthorized: User ID not found" });
      return;
    }

    const { title, quota, requiredSkills, cvUrls } = req.body;

    if (!title || !quota || !requiredSkills || !cvUrls) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const result = await jobService.createNewJob(
      req.user.uid,
      { title, quota, requiredSkills },
      cvUrls,
    );

    res.status(201).json({
      message: "Job created & processing started",
      data: result,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

export const getAllJobsHandler = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user || !req.user.uid) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const jobs = await jobService.getJobsByUser(req.user.uid);
    res.status(200).json({ data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getJobByIdHandler = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const result = await jobService.getJobDetails(id);
    if (!result) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

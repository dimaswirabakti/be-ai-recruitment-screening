import * as jobRepository from "../repositories/jobRepository";
import * as aiService from "./aiService";
import { Job, Candidate, AnalysisResult } from "../types";

export const processCandidates = async (
  jobId: string,
  jobContext: string,
  cvUrls: string[],
): Promise<void> => {
  console.log(`Starting AI processing for Job ${jobId}`);

  let processedCount = 0;

  for (const url of cvUrls) {
    try {
      const result: AnalysisResult | null = await aiService.analyzeCandidate(
        url,
        jobContext,
      );

      if (result) {
        const candidateData: Omit<Candidate, "id" | "analyzedAt"> = {
          jobId,
          cvUrl: url,
          name: result.name,
          score: result.score,
          summary: result.summary,
          explanation: result.explanation,
          skills: result.skills,
        };

        await jobRepository.saveCandidateResult(candidateData);
      }
      processedCount++;
      console.log(`Job ${jobId}: Processed ${processedCount}/${cvUrls.length}`);
    } catch (error) {
      console.error(
        `Error processing candidate for Job ${jobId}, URL: ${url}`,
        error,
      );
      // Continue to next candidate
    }
  }

  await jobRepository.updateJobStatus(jobId, "COMPLETED");
  console.log(`Job ${jobId} processing completed`);
};

export const createNewJob = async (
  userId: string,
  jobInput: { title: string; quota: number; requiredSkills: string[] },
  cvUrls: string[],
): Promise<Job> => {
  const jobData = {
    ownerId: userId,
    title: jobInput.title,
    quota: jobInput.quota,
    requiredSkills: jobInput.requiredSkills,
    status: "PROCESSING" as const,
    totalCandidates: cvUrls.length,
  };

  const job = await jobRepository.createJob(jobData);

  const jobContext = `Job Title: ${
    jobInput.title
  }. Required Skills: ${jobInput.requiredSkills.join(", ")}`;

  // Concept "fire-and-forget" background processing
  processCandidates(job.id, jobContext, cvUrls).catch((err) => {
    console.error(`Background processing failed for job ${job.id}`, err);
  });

  return job;
};

export const getJobsByUser = async (userId: string): Promise<Job[]> => {
  return jobRepository.getJobsByOwner(userId);
};

export const getJobDetails = async (
  jobId: string,
): Promise<{ job: Job; candidates: Candidate[] } | null> => {
  const job = await jobRepository.getJobById(jobId);
  if (!job) {
    return null;
  }

  const candidates = await jobRepository.getCandidatesByJobId(jobId);
  return { job, candidates };
};

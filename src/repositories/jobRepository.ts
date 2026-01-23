import { db } from "../config/firebase";
import * as admin from "firebase-admin";
import { Job, Candidate } from "../types";

type CreateJobInput = Omit<Job, "id" | "createdAt">;
type SaveCandidateInput = Omit<Candidate, "analyzedAt" | "id">;

export const createJob = async (jobData: CreateJobInput): Promise<Job> => {
  const docRef = db.collection("jobs").doc();
  const jobWithTimestamp: Job = {
    ...jobData,
    id: docRef.id,
    createdAt: admin.firestore.Timestamp.now(),
  };

  await docRef.set(jobWithTimestamp);
  return jobWithTimestamp;
};

export const saveCandidateResult = async (
  candidateData: SaveCandidateInput
): Promise<Candidate> => {
  const docRef = await db.collection("candidates").add({
    ...candidateData,
    analyzedAt: admin.firestore.Timestamp.now(),
  });

  return { id: docRef.id, ...candidateData };
};

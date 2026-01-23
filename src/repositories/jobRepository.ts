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
  candidateData: SaveCandidateInput,
): Promise<Candidate> => {
  const docRef = await db.collection("candidates").add({
    ...candidateData,
    analyzedAt: admin.firestore.Timestamp.now(),
  });

  return { id: docRef.id, ...candidateData };
};

export const getJobsByOwner = async (ownerId: string): Promise<Job[]> => {
  const snapshot = await db
    .collection("jobs")
    .where("ownerId", "==", ownerId)
    .get();

  return snapshot.docs.map((doc) => doc.data() as Job);
};

export const getJobById = async (jobId: string): Promise<Job | null> => {
  const doc = await db.collection("jobs").doc(jobId).get();
  if (!doc.exists) {
    return null;
  }
  return doc.data() as Job;
};

export const getCandidatesByJobId = async (
  jobId: string,
): Promise<Candidate[]> => {
  const snapshot = await db
    .collection("candidates")
    .where("jobId", "==", jobId)
    .orderBy("score", "desc")
    .get();

  return snapshot.docs.map((doc) => doc.data() as Candidate);
};

export const updateJobStatus = async (
  jobId: string,
  status: "PROCESSING" | "COMPLETED",
): Promise<void> => {
  await db.collection("jobs").doc(jobId).update({ status });
};

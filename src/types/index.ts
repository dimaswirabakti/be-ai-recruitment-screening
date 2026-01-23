import * as admin from "firebase-admin";

export interface Job {
  id: string;
  ownerId: string;
  title: string;
  quota: number;
  requiredSkills: string[];
  status: "PROCESSING" | "COMPLETED";
  totalCandidates: number;
  createdAt?: admin.firestore.Timestamp;
}

export interface Candidate {
  id?: string;
  jobId: string;
  cvUrl: string;
  name: string;
  score: number;
  summary: string;
  explanation: string;
  skills: string[];
  analyzedAt?: admin.firestore.Timestamp;
}

export interface AnalysisResult {
  name: string;
  score: number;
  summary: string;
  explanation: string;
  skills: string[];
}

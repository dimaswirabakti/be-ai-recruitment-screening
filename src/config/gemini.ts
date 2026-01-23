import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../utils/env";

export const aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
export const AI_MODEL = "gemini-2.5-flash-lite";

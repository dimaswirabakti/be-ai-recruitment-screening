import dotenv from "dotenv";

dotenv.config();

export const PORT: number = Number(process.env.PORT) || 3000;
export const GOOGLE_APPLICATION_CREDENTIALS: string =
  process.env.GOOGLE_APPLICATION_CREDENTIALS || "";
export const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY || "";
export const NODE_ENV: string = process.env.NODE_ENV || "";

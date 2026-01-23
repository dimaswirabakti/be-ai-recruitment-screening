import { aiClient, AI_MODEL } from "../config/gemini";
import { AnalysisResult } from "../types";

const downloadPdf = async (url: string): Promise<Buffer> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download PDF: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

export const analyzeCandidate = async (
  cvUrl: string,
  jobContext: string
): Promise<AnalysisResult | null> => {
  try {
    const pdfBuffer = await downloadPdf(cvUrl);
    const base64Pdf = pdfBuffer.toString("base64");

    const prompt = `You are an HR Recruiter. Analyze this CV against these requirements: ${jobContext}. Return a JSON object with: name, skills (array), score (0-100), summary, and explanation.`;

    const response = await aiClient.models.generateContent({
      model: AI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64Pdf,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      return null;
    }

    const result = JSON.parse(responseText) as AnalysisResult;
    return result;
  } catch (error) {
    console.error("Error analyzing candidate:", error);
    return null;
  }
};

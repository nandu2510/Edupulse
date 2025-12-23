
import { GoogleGenAI, Type } from "@google/genai";
import { Announcement, Task } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDigest = async (announcements: Announcement[], tasks: Task[]): Promise<string> => {
  const ai = getAI();
  const prompt = `
    Acts as an institutional intelligence officer. 
    Summarize the following announcements and pending tasks for a student. 
    Be concise, professional, and highlight critical deadlines.
    
    Announcements: ${JSON.stringify(announcements.map(a => ({ title: a.title, priority: a.priority })))}
    Tasks: ${JSON.stringify(tasks.filter(t => t.status === 'Pending').map(t => ({ title: t.title, due: t.dueDate })))}
    
    Format the output as a clean, structured summary with bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Unable to generate summary at this time.";
  } catch (error) {
    console.error("Gemini Digest Error:", error);
    return "Intelligence sync failed. Please check manually.";
  }
};

export const extractDeadlines = async (content: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract the primary deadline from this announcement. If multiple, pick the most important one.
      Text: "${content}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Short title for the task" },
            date: { type: Type.STRING, description: "ISO date string YYYY-MM-DD" },
            type: { type: Type.STRING, description: "Category like Assignment, Exam, or Submission" }
          },
          required: ["title", "date", "type"]
        }
      }
    });
    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    return null;
  }
};

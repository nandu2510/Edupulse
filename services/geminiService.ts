
import { GoogleGenAI, Type } from "@google/genai";
import { Announcement } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * Extracts deadlines and events from announcement text to sync with a calendar.
 */
export async function extractDeadlines(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract deadlines or event dates from the following announcement. Return a JSON object with 'title', 'date', and 'type'. Announcement: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            date: { type: Type.STRING, description: "YYYY-MM-DD format" },
            type: { type: Type.STRING, description: "Assignment, Exam, Registration, or Event" }
          },
          required: ["title", "date", "type"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

/**
 * Generates a summary digest for the student of missed updates.
 */
export async function generateDigest(announcements: Announcement[], tasks: any[]) {
  try {
    const content = `
      Announcements: ${JSON.stringify(announcements.map(a => ({ title: a.title, priority: a.priority })))}
      Pending Tasks: ${JSON.stringify(tasks)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a concise and encouraging student digest summary based on these recent institutional updates and pending tasks. Highlight urgent items first. Use bullet points. Data: ${content}`,
      config: {
        systemInstruction: "You are an intelligent campus assistant for VITB university."
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating digest. Please check your dashboard manually.";
  }
}

/**
 * General assistant chat for user queries about campus life and the EduPulse platform.
 */
export async function chatWithAssistant(history: { role: string, parts: { text: string }[] }[], message: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `You are EduPulse AI, the official virtual assistant for the EduPulse Institutional Platform at VITB University. 
        Your primary goal is to help users navigate and understand the platform.
        
        Platform Features Guide:
        - 'Overview' (Dashboard): View your attendance, CGPA, daily schedule, performance trends, and urgent deadlines. You can also generate an 'AI Briefing' here.
        - 'Announcements': Official notices from faculty. You can 'Sync Deadline' from an announcement directly to your 'Objectives'.
        - 'Calendar': A unified view of all your deadlines and campus events.
        - 'Materials': Access read-only PDFs, notes, and slides uploaded by your professors.
        - 'Timetable': Your weekly class schedule with room numbers and links for online sessions.
        - 'Academics': Deep dive into your performance metrics and assessment scores.
        - 'Events': Discover campus events and register for them.
        - 'Library': Track your issued books, return dates, and pending fines.
        - 'Objectives': Manage your tasks and assignments. You can toggle them as completed.
        
        Common User Questions:
        - How do I see my marks? Go to the 'Academics' tab.
        - Where are my notes? Check the 'Materials' tab.
        - How do I sync a deadline? In 'Announcements', click 'Sync Deadline' on any notice with a date.
        
        Keep your responses concise, helpful, and professional. If you don't know something about the university, offer to help them find the right tab on the platform.`
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
}

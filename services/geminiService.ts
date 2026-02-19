
import { GoogleGenAI, Type } from "@google/genai";
import { StudyPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (tone: string) => {
  switch(tone) {
    case 'creative': return "Use vivid analogies, creative metaphors, and visual language. Structure with storytelling elements where appropriate.";
    case 'simplified': return "Use the Feynman Technique. Explain like the user is 5. Focus on first principles and core logic. Avoid jargon.";
    case 'academic':
    default: return "Use formal academic terminology, precise definitions, and comprehensive detail suitable for higher education.";
  }
};

export const generateStudyPlan = async (subjects: string, examDate: string, hours: number): Promise<StudyPlan> => {
  const prompt = `You are an expert AI study planner. Create a detailed, realistic, and balanced study plan for the following subjects: ${subjects}. 
  The exam date is ${examDate}. The student can study ${hours} hours per day.
  
  Instructions:
  1. Distribute subjects evenly across available days starting from today until the day before the exam.
  2. Each day should have 2-4 specific tasks.
  3. Include time for revision and active recall.
  4. Break topics into small, achievable goals.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subjects: { type: Type.ARRAY, items: { type: Type.STRING } },
          examDate: { type: Type.STRING },
          dailyHours: { type: Type.NUMBER },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayNumber: { type: Type.INTEGER },
                date: { type: Type.STRING },
                focusArea: { type: Type.STRING },
                tasks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      title: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      description: { type: Type.STRING }
                    },
                    required: ["id", "title", "duration"]
                  }
                }
              },
              required: ["dayNumber", "date", "focusArea", "tasks"]
            }
          }
        },
        required: ["subjects", "examDate", "dailyHours", "days"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  try {
    const data = JSON.parse(text);
    return {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      days: data.days.map((day: any) => ({
        ...day,
        tasks: day.tasks.map((task: any) => ({ ...task, completed: false }))
      }))
    };
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Invalid study plan format received from AI.");
  }
};

export const generateEducationalContent = async (topic: string, format: 'notes' | 'quiz' | 'explanation', tone: string = 'academic'): Promise<string> => {
  let prompt = "";
  const toneInstruction = getSystemInstruction(tone);
  
  if (format === 'notes') {
    prompt = `${toneInstruction}\nGenerate structured study notes for the topic: ${topic}. Use Markdown with clear headings, bullet points, and bold terms.`;
  } else if (format === 'quiz') {
    prompt = `Generate a 5-question practice quiz for the topic: ${topic}. Include a mix of MCQs and short answers. Provide answers at the end.`;
  } else {
    prompt = `${toneInstruction}\nExplain the concept of ${topic} in depth.`;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  
  return response.text || "";
};

export const generateEducationalImage = async (topic: string): Promise<string | null> => {
  const prompt = `A clean, educational diagram explaining ${topic}. Simple labels, white background, scientific style. Visual clarity.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
    });
    
    const candidate = response.candidates?.[0];
    if (!candidate) return null;

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};

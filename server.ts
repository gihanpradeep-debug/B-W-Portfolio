import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the GoogleGenAI instance. Set the User-Agent parameter.
// Use process.env.GEMINI_API_KEY confidentially on the backend.
const geminiApiKey = process.env.GEMINI_API_KEY || "";
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", aiEnabled: !!ai });
  });

  // API Route: AI-Assisted Proposal Brief and Cost / Tech Blueprint builder
  app.post("/api/generate-brief", async (req, res) => {
    try {
      const { services, timeline, budget, name, email, description } = req.body;

      if (!description) {
        return res.status(400).json({ error: "Project description is required" });
      }

      if (!ai) {
        // Fallback if API key is not configured yet (provides safe, beautiful mock output)
        return res.json({
          estimatedTimeline: timeline || "4-6 weeks",
          estimatedCost: budget || "£10,000 - £15,000",
          visualDirections: [
            "Pure Minimalist layout utilizing luxurious whitespace and bold avant-garde typography.",
            "Subtle glassmorphic elevations with tactile interactions.",
            "High-contrast light interface backed by slow smooth enter transitions."
          ],
          engineeringApproach: "Built with React 19, TypeScript, and Tailwind CSS. Leveraging custom component modules and hardware-accelerated Framer Motion interactions to guarantee 60fps scrolling.",
          recommendedMilestones: [
            "Milestone 1: Dynamic Wireframing & Responsive Prototypes (Week 1-2)",
            "Milestone 2: Immersive 3D/Texture Art Directions & Asset Prep (Week 3)",
            "Milestone 3: High-Fidelity Front-end Engineering and API Bridges (Week 4)",
            "Milestone 4: Deployment, Performance Fine-tuning & Handover (Week 5)"
          ],
          conceptSummary: `Hello ${name || "Visionary Client"}, your concept for "${description.substring(0, 40)}..." is outstanding. Gihan is ready to collaborate. We recommend focusing on clean structural foundations and beautiful micro-interactions, positioning it for higher user retention and emotional engagement.`
        });
      }

      const promptRecipe = `
        You are Gihan, an elite British creative UI/UX Designer and Front-End Developer based in London.
        Generate a professional custom website/app proposal brief and estimated cost/timeline framework for a user who sent a project inquiry.
        Elevate their idea into a premium digital experience description.
        
        Client Name: ${name || "Prospect Client"}
        Client Email: ${email || "Not specified"}
        Services Desired: ${Array.isArray(services) ? services.join(", ") : "Digital Design & Front-End Engineering"}
        User Preferred Timeline: ${timeline || "Flexible"}
        User Budget Context: ${budget || "To be discussed"}
        User Project Idea: ${description}

        Generate a beautifully worded concept proposal that reflects high-end visual design details, precision front-end development, and London-studio-grade execution guidelines. Be concise, luxurious, and highly professional.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptRecipe,
        config: {
          systemInstruction: "You are Gihan, a premium UI/UX portfolio co-pilot helping potential clients specify high-end digital products. Speak in a confident, professional, and elegant tone with London-studio precision.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              estimatedTimeline: {
                type: Type.STRING,
                description: "Realistic estimated timeline based on project size, e.g. '5-7 weeks'."
              },
              estimatedCost: {
                type: Type.STRING,
                description: "Realistic premium creative agency / freelance cost estimate in GBP, e.g. '£14,500 - £19,000'."
              },
              visualDirections: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List exactly 3 highly inspiring aesthetic guidelines tailored to this project's vision."
              },
              engineeringApproach: {
                type: Type.STRING,
                description: "Tailored highly specific front-end tech stack advice incorporating React, Vite, Framer Motion, and Tailwind."
              },
              recommendedMilestones: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List exactly 4 key steps of development and design delivery."
              },
              conceptSummary: {
                type: Type.STRING,
                description: "A highly personal, premium summary addressed to the client, elevating their prompt idea into a luxury vision."
              }
            },
            required: [
              "estimatedTimeline",
              "estimatedCost",
              "visualDirections",
              "engineeringApproach",
              "recommendedMilestones",
              "conceptSummary"
            ]
          }
        }
      });

      const responseText = response.text || "{}";
      const data = JSON.parse(responseText);
      res.json(data);

    } catch (error: any) {
      console.error("Gemini brief creation failed:", error);
      res.status(500).json({
        error: "Failed to generate AI proposal brief",
        details: error?.message || ""
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

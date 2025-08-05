import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Некорректный формат сообщения." });
  }

  try {
    const result = await model.generateContent(message);
    const reply = result.response.text();
    res.json({ reply });
  } catch (error) {
    console.error("Ошибка при обращении к Gemini:", error);
    res.status(500).json({ error: "Ошибка при обращении к Gemini API" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${port}`);
});

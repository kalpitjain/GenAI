const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

let groq;

async function initializeGroq() {
  const groqModule = await import("groq-sdk");
  groq = new groqModule.default({ apiKey: process.env.API_KEY });
}

app.post("/api", async (req, res) => {
  try {
    const { question } = req.body;
    const chatCompletion = await getGroqChatCompletion(question);
    const responseMessage = chatCompletion.choices[0]?.message?.content || "";
    res.json({ message: responseMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getGroqChatCompletion(content) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
  });
}

initializeGroq()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize Groq SDK:", error);
  });

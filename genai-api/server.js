const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function generateResponse(userAsk) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: userAsk }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

app.post("/api", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      throw new Error("Question is missing.");
    }

    const responseContent = await generateResponse(question);
    const response = {
      message: responseContent,
    };
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});

const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


app.get("/:query", async (req, res) => {
  try {
    const { query } = req.params;

    const completion = await openai.chat.completions.create({
      messages: [
          {"role": "user", "content": `${query} `}
      ],
      model: "gpt-3.5-turbo",
    });

    const sol = completion.choices[0].message.content;
    res.send({ sol });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred ");
  }
});

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

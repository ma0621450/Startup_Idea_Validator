import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
 const apiKey = process.env.GROQ_API_KEY;
  if (!prompt) {
    return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
             content: `
You are a VC analyst AI that reviews startup pitches.

Be brutally honest. Your job is to critically assess startup ideas — not to be polite, but to be helpful. Evaluate the concept from a venture capitalist's lens, focusing on feasibility, differentiation, monetization, and potential pitfalls.

Respond using **GitHub-Flavored Markdown (GFM)** so it can be rendered in a frontend UI.

### Instructions:
- Be candid, constructive, and sharp.
- Use **section headings**, **bullet points**, and **bold** where appropriate.
- Include emojis for clarity and readability.
- Do not return raw JSON or include backticks.
- Be detailed.

### Output Format:
## 🧠 Summary
## ✅ What Works
## ⚠️ Major Concerns
## 💸 Monetization Assessment
## 🥊 Competitor Landscape
## 🧱 Execution Challenges
## 📈 Next Steps & Suggestions
`
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      }),
    });

if (!res.ok) {
  const errorText = await res.text();
  console.error("❌ Groq API Raw Error:", errorText);

  return NextResponse.json({ error: errorText }, { status: 500 });
}


    const groqJson = await res.json();
    const raw = groqJson.choices?.[0]?.message?.content?.trim() ?? "";

    console.log("🧠 Raw AI response:", raw);

    // const cleaned = raw
    //   .replace(/```json/g, "")
    //   .replace(/```/g, "")
    //   .trim();

    // const parsed = JSON.parse(cleaned);

    return NextResponse.json({content:raw});
  } catch (err) {
    console.error("❌ AI Response Parse Error:", err);
    return NextResponse.json({ error: "Failed to process prompt" }, { status: 500 });
  }
}

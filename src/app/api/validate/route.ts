import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
 const apiKey = process.env.GROQ_API_KEY;
 if (!apiKey) {
  return NextResponse.json({ error: "GROQ_API_KEY not set in environment" }, { status: 500 });
}
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
You are a venture capital analyst AI tasked with rigorously evaluating startup ideas.  
Your tone should be direct, analytical, and unbiased — do not hesitate to point out critical flaws or reasons an idea would fail to attract investment.  
Your feedback should help a VC or investment team quickly understand the feasibility, differentiation, and risk profile of the idea.  
Respond in **GitHub-Flavored Markdown (GFM)** with clear sections, bullet points, and occasional emojis for readability.

Sections to include:
- 🧠 Executive Summary
- 📊 Market & Audience Analysis
- ✅ Strengths & Differentiators
- ❌ Major Concerns
- 💸 Monetization Assessment
- 🥊 Competitive Landscape
- 🧱 Execution Barriers
- 📈 Investment Recommendation

Never return raw JSON or code blocks. Focus on clarity, depth, and actionable insights.
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

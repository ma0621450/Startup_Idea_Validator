import { useEffect, useState } from "react";
import { formFields } from "@/lib/formFields";
import { ideaFormSchema, IdeaFormType } from "@/lib/formSchema";


export const useIdeaForm = () => {
  const resetForm = () => {
  const initial = Object.fromEntries(
    formFields.map((f) => [f.name, ""])
  ) as IdeaFormType;

  setForm(initial);
  setErrors({});
  setResult(null);
  localStorage.removeItem("idea-form");
};

  const [form, setForm] = useState<IdeaFormType>(
    Object.fromEntries(formFields.map((f) => [f.name, ""])) as IdeaFormType
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof IdeaFormType, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("idea-form");
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("idea-form", JSON.stringify(form));
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof IdeaFormType]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof IdeaFormType];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setErrors({});

    const validation = ideaFormSchema.safeParse(form);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const formatted = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, value]) => [
          key,
          value?.[0] || "",
        ])
      );
      setErrors(formatted);
      return;
    }

const prompt = `
You are an expert startup advisor AI.  
Your job is to provide clear, actionable, and honest feedback on startup ideas submitted by users.  
Communicate in a friendly, encouraging tone, but do not sugarcoat weaknesses or risks.  
Structure your feedback using **section headings** and **bullet points** in GitHub-Flavored Markdown (GFM), so it renders well in a frontend UI.  
Include relevant emojis for clarity and engagement.  
Be concise, practical, and focus on helping the user improve their idea or pitch.

Sections to include:
- 📝 Summary
- ✅ Key Strengths
- ⚠️ Weaknesses & Risks
- 💡 Suggestions for Improvement
- 💰 Monetization Ideas
- 🏁 Notable Competitors
- 📈 Next Steps

Do not return raw JSON or wrap your response in code blocks.

Startup:
- Name: ${form.name}
- One-liner: ${form.oneliner}
- Problem: ${form.problem}
- Audience: ${form.audience}
- Solution: ${form.solution}
- Monetization: ${form.monetization}
- Competitors: ${form.competitors}
- Tech: ${form.tech}
`;



    setLoading(true);

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.content);
    } catch (err) {
      console.error(err);
      setResult("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    result,
    handleChange,
    handleSubmit,
    setResult,
    resetForm
  };
};


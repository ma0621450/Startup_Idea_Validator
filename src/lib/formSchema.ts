import { z } from "zod";

export const ideaFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  oneliner: z.string().min(1, "One-liner is required"),
  problem: z.string().min(1, "Please describe the problem"),
  audience: z.string().min(1, "Audience is required"),
  solution: z.string().min(1, "Describe your solution"),
  monetization: z.string().min(1, "Monetization strategy is required"),
  competitors: z.string().optional(),
  tech: z.string().optional(),
});

export type IdeaFormType = z.infer<typeof ideaFormSchema>;

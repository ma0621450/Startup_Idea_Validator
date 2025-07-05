export type FieldType = "input" | "textarea";

export const formFields: {
  name: string;
  label: string;
  placeholder: string;
  type: FieldType;
}[] = [
  {
    name: "name",
    label: "Startup Name",
    placeholder: "Enter your startup name",
    type: "input",
  },
  {
    name: "oneliner",
    label: "One-liner",
    placeholder: "e.g., Uber for groceries",
    type: "input",
  },
  {
    name: "problem",
    label: "Problem",
    placeholder: "What problem are you solving?",
    type: "textarea",
  },
  {
    name: "audience",
    label: "Target Audience",
    placeholder: "e.g., remote workers, college students",
    type: "input",
  },
  {
    name: "solution",
    label: "Solution",
    placeholder: "How does your product solve the problem?",
    type: "textarea",
  },
  {
    name: "monetization",
    label: "Monetization Plan",
    placeholder: "How will you make money?",
    type: "textarea",
  },
  {
    name: "competitors",
    label: "Competitors",
    placeholder: "Known competitors (optional)",
    type: "textarea",
  },
  {
    name: "tech",
    label: "Tech Stack",
    placeholder: "e.g., React, Node.js, Firebase",
    type: "input",
  },
];
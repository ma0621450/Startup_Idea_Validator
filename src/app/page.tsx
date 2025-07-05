"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { IdeaForm } from "@/components/IdeaForm";
import { ResultCard } from "@/components/ResultCard";
import { useIdeaForm } from "@/hooks/useIdeaForm";

export default function Home() {
const { form, errors, loading, result, handleChange, handleSubmit, setResult, resetForm } = useIdeaForm();



  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-4 right-4 z-50"
      >
        <ThemeToggle />
      </motion.div>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen px-4 py-10 bg-background text-foreground flex flex-col items-center"
      >
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Startup Idea Validator</h1>
          <p className="text-muted-foreground">
            Fill out a few details about your idea and get feedback powered by AI.
          </p>
        </div>

        <IdeaForm
          form={form}
          loading={loading}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        {result && (
  <ResultCard
    result={result}
    onClose={() => {
      setResult(null);
      resetForm();
    }}
  />
)}
      </motion.main>
    </>
  );
}

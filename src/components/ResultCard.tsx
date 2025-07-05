/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ResultCard = ({
  result,
  onClose,
}: {
  result: string;
  onClose?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (result) setOpen(true);
  }, [result]);

  return (
    <Sheet open={open} onOpenChange={(value) => {setOpen(value);
      if(!value && onClose) onClose();
    }}>
      <SheetContent
        side="bottom"
        className="h-[100dvh] w-full overflow-y-auto rounded-t-xl border-t bg-background px-6 py-8"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">AI Validation Result</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Here&apos;s what we think about your startup idea.
          </SheetDescription>
        </SheetHeader>

        <div className="prose dark:prose-invert max-w-3xl mx-auto text-[0.95rem] leading-relaxed">
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h2: ({ node, ...props }) => (
      <h2 className="mt-10 mb-4 text-xl font-bold border-b border-muted pb-1 tracking-tight" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="mt-8 mb-2 text-lg font-semibold tracking-tight" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc list-inside space-y-1 pl-1" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="text-sm leading-relaxed" {...props} />
    ),
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    em: ({ node, ...props }) => (
      <em className="italic text-muted-foreground" {...props} />
    ),
  }}
>
  {result}
</ReactMarkdown>

</div>

      </SheetContent>
    </Sheet>
  );
};

"use client";

import { useState } from "react";
import api from "../lib/api";
import { Machine } from "@/types";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function AISection({ machines = [] }: { machines: Machine[] }) {
  const [running, setRunning] = useState(false);
  const [htmlText, setHtmlText] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const renderFormattedText = async (markdown: string) => {
    const html = await marked.parse(markdown, { breaks: true });
    return DOMPurify.sanitize(html || "");
  };

  const runAI = async () => {
    if (!input.trim()) {
      setHtmlText("<i>Please type a question.</i>");
      return;
    }

    try {
      setRunning(true);
      setHtmlText("<i>Thinking...</i>");

      const response = await api.post("/ai/chat", {
        question: input,
        machines,
      });

      const aiText =
        response?.data?.response ||
        response?.data?.result ||
        response?.data?.message ||
        "No response from AI.";

      const html = await renderFormattedText(aiText);
      setHtmlText(html);
    } catch (error) {
      console.error("AI error:", error);
      setHtmlText("<b>AI failed</b> to generate suggestions. Try again.");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="p-4 bg-white/80 backdrop-blur rounded-2xl shadow">
      <h4 className="font-semibold text-gray-800 mb-3">AI Suggestions</h4>

      {/* User Input */}
      <div className="flex items-center gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your machines..."
          className="flex-1 px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#8B5CF6] outline-none"
        />

        <button
          onClick={runAI}
          disabled={running}
          className={`px-4 py-2 rounded-md text-white transition ${
            running
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#8B5CF6] hover:bg-[#7C4AF1]"
          }`}
        >
          {running ? "Running..." : "Ask"}
        </button>
      </div>

      {/* AI Output */}
      <div
        className="min-h-[140px] max-h-[350px] overflow-y-auto p-3 rounded-md border bg-gray-50 text-gray-700"
        dangerouslySetInnerHTML={{ __html: htmlText || "Ask a question…" }}
      />
    </div>
  );
}

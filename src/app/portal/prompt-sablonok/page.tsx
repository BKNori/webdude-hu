import { Metadata } from "next";
import PromptTemplatesClient from "./PromptTemplatesClient";

export const metadata: Metadata = {
  title: "AI Prompt Sablonok | Ügyfélportál | WebDude",
  description: "Professzionális AI prompt sablonok gyűjteménye az ügyfélportálon.",
};

export default function PromptTemplatesPage() {
  return (
    <div className="min-h-screen bg-transparent text-text-primary pt-24">
      <PromptTemplatesClient />
    </div>
  );
}

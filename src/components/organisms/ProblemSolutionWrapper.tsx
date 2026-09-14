// src/components/organisms/ProblemSolutionWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically load the ProblemSolution client component without SSR
const ProblemSolution = dynamic(() => import("./ProblemSolution"), {
  ssr: false,
});

export default function ProblemSolutionWrapper() {
  return <ProblemSolution />;
}

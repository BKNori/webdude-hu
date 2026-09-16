"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { getPublishedCaseStudiesAction } from "@/actions/case-study";
import { CaseStudy } from "@/types/case-study";

export default function CaseStudyCarousel() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const res = await getPublishedCaseStudiesAction();
        if (res.success && res.caseStudies) {
          setStudies(res.caseStudies);
        }
      } catch (error) {
        console.error("Case studies fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  if (loading) {
    return null;
  }

  if (studies.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-bg-base">
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="text-3xl font-bold text-white font-mono">
          Legutóbbi Stratégiai Sikerek
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {studies.map((study) => (
          <div
            key={study.id}
            className="bg-bg-card p-6 rounded-xl border border-sky-500/20 hover:border-sky-500 transition-all duration-300 shadow-xl cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 group-hover:bg-sky-500/20 transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                {study.workflowType}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-2 line-clamp-2">
              {study.title}
            </h3>
            <p className="text-slate-400 mt-3 text-sm line-clamp-3 leading-relaxed">
              {study.summary}
            </p>
            <div className="mt-4 flex gap-4">
              {study.impactMetrics.efficiencyGain && (
                <div className="text-center">
                  <p className="text-sky-500 font-bold">
                    {study.impactMetrics.efficiencyGain}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase">
                    Hatékonyság
                  </p>
                </div>
              )}
              {study.impactMetrics.timeSaved && (
                <div className="text-center">
                  <p className="text-sky-500 font-bold">
                    {study.impactMetrics.timeSaved}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase">
                    Időmegtakarítás
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

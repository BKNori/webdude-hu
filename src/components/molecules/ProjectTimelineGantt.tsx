"use client";

import { motion } from "motion/react";
import { CheckCircle2, Clock, Calendar } from "lucide-react";

export interface TimelineMilestone {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  date: string;
}

export default function ProjectTimelineGantt({
  milestones,
}: {
  milestones: TimelineMilestone[];
}) {
  return (
    <div className="w-full rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 md:p-8 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-white">
            Projekt Idővonal & Mérföldkövek
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Valós idejű státuszkövetés és szállítási fázisok
          </p>
        </div>
      </div>

      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-8">
        {milestones.map((milestone, idx) => {
          const isCompleted = milestone.status === "completed";
          const isInProgress = milestone.status === "in_progress";

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-6 md:pl-8 group"
            >
              {/* Dot Icon */}
              <div
                className={`absolute -left-4.25 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted
                    ? "bg-amber-500 border-amber-400 text-slate-950"
                    : isInProgress
                      ? "bg-slate-900 border-amber-500 text-amber-400 animate-pulse"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isInProgress ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Calendar className="w-4 h-4" />
                )}
              </div>

              {/* Tartalom kártya */}
              <div className="p-4 md:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 group-hover:border-amber-500/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm md:text-base font-bold text-white tracking-tight">
                    {milestone.title}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-900 text-slate-400 border border-slate-800">
                    {milestone.date}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

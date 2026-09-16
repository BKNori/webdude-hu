"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function LighthousePerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const score = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const unsubscribe = score.on("change", (latest) => {
      setDisplayScore(Math.round(latest));
    });
    return unsubscribe;
  }, [score]);

  return (
    <section
      id="lighthouse-performance"
      ref={sectionRef}
      className="bg-bg-base py-24 border-t border-brand-primary/20"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text side */}
          <div className="w-full md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl text-white font-bold mb-6"
            >
              Technikai felsőbbrendűség
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-primary mb-8"
            >
              26 év tapasztalatával garantáljuk a gyorsaságot. A görgetés közben
              induló animáció mutatja, hol tartana a weboldalad a mi
              optimalizációnkkal.
            </motion.p>
          </div>

          {/* Animation side */}
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="w-64 h-64 border-8 border-brand-primary rounded-full flex items-center justify-center bg-bg-elevated/50">
                <span className="text-6xl text-white font-mono font-bold">
                  {displayScore}+
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-center"
              >
                <span className="text-sm text-brand-primary font-bold uppercase tracking-wider">
                  Lighthouse Score
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

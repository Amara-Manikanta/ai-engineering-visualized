import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function RagAdvanced() {
  const toc = [];

  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps = [
    { show: [], desc: "Click Play to see Advanced RAG optimization." },
    { show: ["q"], desc: "1. A vague user query arrives." },
    { show: ["q", "arr1", "rewrite"], desc: "2. Pre-retrieval: An LLM rewrites the query to be highly specific." },
    { show: ["q", "arr1", "rewrite", "arr2", "vdb"], desc: "3. The DB searches for the optimal query, pulling a large net of 100 documents." },
    { show: ["q", "arr1", "rewrite", "arr2", "vdb", "arr3", "rerank"], desc: "4. Post-retrieval: A Cross-Encoder heavily scrutinizes and scores all 100 documents." },
    { show: ["q", "arr1", "rewrite", "arr2", "vdb", "arr3", "rerank", "arr4", "top3"], desc: "5. Only the absolute Top 3 most relevant documents survive the filter." },
    { show: ["q", "arr1", "rewrite", "arr2", "vdb", "arr3", "rerank", "arr4", "top3", "arr5", "llm"], desc: "6. The highly precise context is sent to the LLM for generation." }
  ];

  useEffect(() => {
    let timeout;
    if (playing && step < steps.length - 1) {
      timeout = setTimeout(() => {
        setStep((s) => s + 1);
      }, 1800);
    } else if (step === steps.length - 1) {
      setPlaying(false);
    }
    return () => clearTimeout(timeout);
  }, [playing, step, steps.length]);

  const handlePlay = () => {
    if (playing) return;
    if (step >= steps.length - 1) {
      setStep(0);
      setTimeout(() => {
        setStep(1);
        setPlaying(true);
      }, 300);
    } else {
      if (step === 0) setStep(1);
      setPlaying(true);
    }
  };

  const handleReset = () => {
    setPlaying(false);
    setStep(0);
  };

  const isVisible = (id) => steps[step].show.includes(id);

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.9, y: "-50%" },
    visible: { opacity: 1, scale: 1, y: "-50%", transition: { type: "spring", stiffness: 60 } },
  };
  
  const vdbVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 60 } },
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -10, y: "-50%" },
    visible: { opacity: 1, x: 0, y: "-50%", transition: { duration: 0.4 } },
  };
  
  const arrowDownVariants = {
    hidden: { opacity: 0, y: -10, rotate: 90 },
    visible: { opacity: 1, y: 0, rotate: 90, transition: { duration: 0.4 } },
  };

  return (
    <GuideLayout
      title="Advanced RAG"
      intro="Fixes Naive RAG by optimizing the query before search, and re-ranking the results after search."
      toc={toc}
    >
      <section className="space-y-6">
        <div className="relative h-[500px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-6 hidden md:block">
          
          <motion.div
            variants={nodeVariants}
            initial="hidden"
            animate={isVisible("q") ? "visible" : "hidden"}
            className="absolute left-[5%] top-1/2 w-[100px] p-2.5 bg-white/5 border-2 border-blue-500 text-center rounded-lg text-white font-medium"
          >
            Bad Query
          </motion.div>

          <motion.div
            variants={arrowVariants}
            initial="hidden"
            animate={isVisible("arr1") ? "visible" : "hidden"}
            className="absolute left-[21%] top-1/2 text-white/50 text-xl"
          >
            ➔
          </motion.div>

          <motion.div
            variants={nodeVariants}
            initial="hidden"
            animate={isVisible("rewrite") ? "visible" : "hidden"}
            className="absolute left-[25%] top-1/2 w-[120px] p-2.5 bg-purple-600 text-white text-center rounded-lg shadow-lg shadow-purple-500/20"
          >
            <div className="font-semibold">LLM</div>
            <div className="text-xs text-purple-200 mt-1">Query Rewrite</div>
          </motion.div>

          <motion.div
            variants={arrowVariants}
            initial="hidden"
            animate={isVisible("arr2") ? "visible" : "hidden"}
            className="absolute left-[44%] top-1/2 text-white/50 text-xl"
          >
            ➔
          </motion.div>

          <motion.div
            variants={vdbVariants}
            initial="hidden"
            animate={isVisible("vdb") ? "visible" : "hidden"}
            className="absolute left-[48%] top-[20%] w-[120px] p-2.5 bg-cyan-600 text-white text-center rounded-lg shadow-lg shadow-cyan-500/20"
          >
            <div className="font-semibold">Vector DB</div>
            <div className="text-xs text-cyan-200 mt-1">Retrieve Top 100</div>
          </motion.div>

          <motion.div
            variants={arrowDownVariants}
            initial="hidden"
            animate={isVisible("arr3") ? "visible" : "hidden"}
            className="absolute left-[53%] top-[37%] text-white/50 text-xl"
          >
            ➔
          </motion.div>

          <motion.div
            variants={nodeVariants}
            initial="hidden"
            animate={isVisible("rerank") ? "visible" : "hidden"}
            className="absolute left-[48%] top-1/2 w-[120px] p-2.5 bg-orange-600 text-white text-center rounded-lg shadow-lg shadow-orange-500/20"
          >
            <div className="font-semibold text-sm">Cross-Encoder</div>
            <div className="text-xs text-orange-200 mt-1">Re-ranker</div>
          </motion.div>

          <motion.div
            variants={arrowVariants}
            initial="hidden"
            animate={isVisible("arr4") ? "visible" : "hidden"}
            className="absolute left-[67%] top-1/2 text-white/50 text-xl"
          >
            ➔
          </motion.div>

          <motion.div
            variants={nodeVariants}
            initial="hidden"
            animate={isVisible("top3") ? "visible" : "hidden"}
            className="absolute left-[71%] top-1/2 w-[100px] p-2.5 bg-white/5 border-2 border-dashed border-orange-500 text-center rounded-lg text-white"
          >
            <div className="font-semibold">Top 3</div>
            <div className="text-xs text-gray-400 mt-1">Filtered</div>
          </motion.div>

          <motion.div
            variants={arrowVariants}
            initial="hidden"
            animate={isVisible("arr5") ? "visible" : "hidden"}
            className="absolute left-[87%] top-1/2 text-white/50 text-xl"
          >
            ➔
          </motion.div>

          <motion.div
            variants={nodeVariants}
            initial="hidden"
            animate={isVisible("llm") ? "visible" : "hidden"}
            className="absolute left-[91%] top-1/2 w-[70px] p-2.5 bg-green-600 text-white text-center rounded-lg font-semibold shadow-lg shadow-green-500/20"
          >
            LLM
          </motion.div>

          <div className="absolute bottom-6 left-6 right-6 text-center text-gray-400 text-sm h-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {steps[step].desc}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Fallback for small screens */}
        <div className="md:hidden text-gray-300 text-sm bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="mb-2 font-semibold text-white">Advanced RAG Workflow:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>A vague user query arrives.</li>
            <li><strong>Pre-retrieval:</strong> An LLM rewrites the query to be highly specific.</li>
            <li>The DB searches for the optimal query, pulling a large net of 100 documents.</li>
            <li><strong>Post-retrieval:</strong> A Cross-Encoder heavily scrutinizes and scores all 100 documents.</li>
            <li>Only the absolute Top 3 most relevant documents survive the filter.</li>
            <li>The highly precise context is sent to the LLM for generation.</li>
          </ol>
        </div>

        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={handlePlay}
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            {playing ? "Playing..." : step >= steps.length - 1 ? "▶ Replay" : "▶ Play Animation"}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/10"
          >
            ↺ Reset
          </button>
        </div>
      </section>
    </GuideLayout>
  );
}

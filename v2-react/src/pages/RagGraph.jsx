import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagGraph() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const toc = [];

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    let currentStep = step >= 4 ? 0 : step;
    
    const interval = setInterval(() => {
      currentStep++;
      setStep(currentStep);
      if (currentStep >= 4) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 2000);
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <GuideLayout
      title="Graph RAG"
      intro="Retrieves connected entities (nodes and edges) from a Knowledge Graph rather than disjointed chunks."
      toc={toc}
    >
      <div className="space-y-12">
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="guide-section px-5">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Architecture Type
          </div>
          <div className="relative h-[450px] bg-[#111] border border-gray-800 rounded-2xl overflow-hidden mb-6">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0 }}
              className="absolute left-[20%] top-[30%] w-[80px] h-[80px] rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs text-center z-10"
            >
              Company X
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0 }}
              className="absolute left-[50%] top-[30%] w-[80px] h-[80px] rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs text-center z-10"
            >
              Holding Corp
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: step >= 3 ? 1 : 0, scale: step >= 3 ? 1 : 0 }}
              className="absolute left-[80%] top-[50%] w-[80px] h-[80px] rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs text-center z-10"
            >
              Person Y
            </motion.div>

            {/* Edges */}
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: step >= 2 ? 1 : 0, width: step >= 2 ? '15%' : 0 }}
              className="absolute left-[35%] top-[38%] h-[2px] bg-gray-500"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 2 ? 1 : 0 }}
              className="absolute left-[38%] top-[33%] text-xs text-gray-400"
            >
              [Owned By]
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: step >= 3 ? 1 : 0, width: step >= 3 ? '15%' : 0 }}
              className="absolute left-[65%] top-[45%] h-[2px] bg-gray-500 origin-left rotate-20"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 3 ? 1 : 0 }}
              className="absolute left-[68%] top-[47%] text-xs text-gray-400"
            >
              [Owned By]
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 20 }}
              className="absolute left-[50%] top-[80%] -translate-x-1/2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-bold"
            >
              LLM: "Person Y owns Company X"
            </motion.div>

            <div className="absolute bottom-5 left-5 right-5 text-center text-gray-400 text-sm h-10">
              {step === 0 && "Click Play to traverse the Knowledge Graph."}
              {step === 1 && '1. Query: "Who ultimately owns Company X?" Node identified.'}
              {step === 2 && '2. The Graph DB traverses the relationship to find it is owned by Holding Corp.'}
              {step === 3 && '3. Traversing further, it finds Holding Corp is owned by Person Y.'}
              {step >= 4 && '4. The LLM connects the dots across multiple documents to answer the question perfectly.'}
            </div>
          </div>
          
          <div className="flex gap-3 justify-center mb-10">
            <button 
              onClick={handlePlay}
              disabled={isPlaying}
              className="px-6 py-2.5 rounded-full font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {step >= 4 ? '▶ Replay' : '▶ Play Animation'}
            </button>
            <button 
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full font-semibold bg-[#222] border border-gray-700 text-gray-300 hover:bg-[#333]"
            >
              ↺ Reset
            </button>
          </div>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

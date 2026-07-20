import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagCrag() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const toc = [];

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    let currentStep = step >= 5 ? 0 : step;
    
    const interval = setInterval(() => {
      currentStep++;
      setStep(currentStep);
      if (currentStep >= 5) {
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
      title="Corrective RAG (CRAG)"
      intro="Evaluates its own retrieval. If the DB lacks the answer, it triggers a web search fallback."
      toc={toc}
    >
      <section className="guide-section px-5">
        <div className="relative h-[450px] bg-[#111] border border-gray-800 rounded-2xl overflow-hidden mb-6">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[60px] p-2.5 bg-indigo-600 text-white text-center rounded-lg"
          >
            Query
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="absolute left-[16%] top-1/2 -translate-y-1/2 text-gray-400"
          >➔</motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[80px] p-2.5 bg-cyan-600 text-white text-center rounded-lg"
          >
            Vector DB
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            className="absolute left-[33%] top-1/2 -translate-y-1/2 text-gray-400"
          >➔</motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.8 }}
            className="absolute left-[37%] top-1/2 -translate-y-1/2 w-[100px] p-2.5 bg-orange-500 text-white text-center rounded-lg"
          >
            Evaluator<br/><span className="text-xs">Relevant?</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 3 ? 1 : 0 }}
            className="absolute left-[52%] top-[35%] -rotate-30 text-rose-500 font-bold"
          >➔ No</motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            className="absolute left-[52%] top-[65%] rotate-30 text-emerald-500 font-bold hidden" // Hiding "Yes" path for this animation flow
          >➔ Yes</motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step >= 4 ? 1 : 0, scale: step >= 4 ? 1 : 0.8 }}
            className="absolute left-[65%] top-[20%] w-[100px] p-2.5 bg-blue-600 text-white text-center rounded-lg"
          >
            Web Search<br/><span className="text-xs">Tavily / Google</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? 1 : 0 }}
            className="absolute left-[80%] top-[35%] rotate-30 text-gray-400"
          >➔</motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? 1 : 0 }}
            className="absolute left-[85%] top-1/2 -translate-y-1/2 w-[60px] p-2.5 bg-emerald-600 text-white text-center rounded-lg"
          >
            LLM
          </motion.div>

          <div className="absolute bottom-5 left-5 right-5 text-center text-gray-400 text-sm h-10">
            {step === 0 && "Click Play to see CRAG evaluating its own data."}
            {step === 1 && "1. Standard vector retrieval occurs."}
            {step === 2 && "2. An Evaluator model scores the retrieved documents. Are they relevant?"}
            {step === 3 && "3. Result: Red (Not relevant). The internal database does not have the answer."}
            {step === 4 && "4. CORRECTIVE ACTION: The system triggers an external Web Search to find the missing facts."}
            {step >= 5 && "5. The web results are used to generate the final accurate answer."}
          </div>
        </div>
        
        <div className="flex gap-3 justify-center mb-10">
          <button 
            onClick={handlePlay}
            disabled={isPlaying}
            className="px-6 py-2.5 rounded-full font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {step >= 5 ? '▶ Replay' : '▶ Play Animation'}
          </button>
          <button 
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full font-semibold bg-[#222] border border-gray-700 text-gray-300 hover:bg-[#333]"
          >
            ↺ Reset
          </button>
        </div>
      </section>
    </GuideLayout>
  );
}

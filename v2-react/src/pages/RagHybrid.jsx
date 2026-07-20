import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagHybrid() {
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
      title="Hybrid RAG"
      intro="Combines semantic Vector search with exact keyword BM25 search to get the best of both worlds."
      toc={toc}
    >
      <section className="guide-section px-5">
        <div className="relative h-[450px] bg-[#111] border border-gray-800 rounded-2xl overflow-hidden mb-6 flex flex-col items-center justify-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -20 }}
            className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[100px] p-2.5 bg-[#222] border-2 border-indigo-500 text-center rounded-lg text-gray-200"
          >
            Query<br/><span className="text-xs">"UUID-54A error"</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            className="absolute left-[21%] top-[35%] -rotate-30 text-gray-400"
          >➔</motion.div>
          
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: step >= 2 ? 1 : 0 }}
            className="absolute left-[21%] top-[65%] rotate-30 text-gray-400"
          >➔</motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.8 }}
            className="absolute left-[25%] top-[20%] w-[120px] p-2.5 bg-blue-600 text-white text-center rounded-lg"
          >
            BM25<br/><span className="text-xs">Keyword Match</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.8 }}
            className="absolute left-[25%] top-[70%] w-[120px] p-2.5 bg-cyan-600 text-white text-center rounded-lg"
          >
            Vector DB<br/><span className="text-xs">Semantic Match</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 3 ? 1 : 0 }}
            className="absolute left-[48%] top-[20%] w-[80px] p-2 border border-blue-500 text-center rounded-lg text-gray-200"
          >Results A</motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 3 ? 1 : 0 }}
            className="absolute left-[48%] top-[70%] w-[80px] p-2 border border-cyan-500 text-center rounded-lg text-gray-200"
          >Results B</motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: step >= 4 ? 1 : 0 }}
            className="absolute left-[62%] top-[35%] rotate-30 text-gray-400"
          >➔</motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: step >= 4 ? 1 : 0 }}
            className="absolute left-[62%] top-[65%] -rotate-30 text-gray-400"
          >➔</motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step >= 4 ? 1 : 0, scale: step >= 4 ? 1 : 0.8 }}
            className="absolute left-[65%] top-1/2 -translate-y-1/2 w-[120px] p-2.5 bg-purple-600 text-white text-center rounded-lg"
          >
            RRF<br/><span className="text-xs">Reciprocal Rank Fusion</span>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: step >= 5 ? 1 : 0 }}
            className="absolute left-[84%] top-1/2 -translate-y-1/2 text-gray-400"
          >➔</motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: step >= 5 ? 1 : 0, x: step >= 5 ? 0 : 20 }}
            className="absolute left-[88%] top-1/2 -translate-y-1/2 w-[60px] p-2.5 bg-emerald-600 text-white text-center rounded-lg"
          >
            LLM
          </motion.div>

          <div className="absolute bottom-5 left-5 right-5 text-center text-gray-400 text-sm h-10">
            {step === 0 && "Click Play to see Hybrid Search in action."}
            {step === 1 && "1. User asks a query containing a specific exact ID or code."}
            {step === 2 && "2. The query is sent to BOTH a Keyword index (BM25) and a Semantic Vector index."}
            {step === 3 && "3. BM25 finds the exact ID. Vector DB finds documents with similar meanings."}
            {step === 4 && "4. Reciprocal Rank Fusion combines both lists into a single ranked list."}
            {step >= 5 && "5. The perfectly balanced context is sent to the LLM."}
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

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagAgentic() {
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
    }, 2200);
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <GuideLayout
      title="Agentic RAG"
      intro="An autonomous LLM agent uses Vector Search as a Tool, deciding when and how to search iteratively."
      toc={toc}
    >
      <section className="guide-section px-5">
        <div className="relative h-[500px] bg-[#111] border border-gray-800 rounded-2xl overflow-hidden mb-6">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[60px] p-2.5 bg-[#222] border-2 border-indigo-500 text-center rounded-lg text-gray-200"
          >
            Task
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="absolute left-[16%] top-1/2 -translate-y-1/2 text-gray-400"
          >➔</motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
                opacity: step >= 1 ? 1 : 0, 
                scale: step >= 1 ? (step === 4 ? [1, 1.1, 1] : 1) : 0.8,
                y: '-50%'
            }}
            transition={step === 4 ? { duration: 0.4 } : { duration: 0.5 }}
            className="absolute left-[20%] top-1/2 w-[100px] py-5 px-2.5 bg-purple-600 text-white text-center rounded-full font-bold z-10"
          >
            AGENT
          </motion.div>
          
          {/* Loops */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: (step === 2 || step === 4) ? 1 : 0 }}
            className="absolute left-[25%] top-[15%] w-[40%] h-[100px] border-t-2 border-r-2 border-dashed border-purple-500 rounded-tr-[20px] z-0"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: (step === 3 || step === 4) ? 1 : 0 }}
            className="absolute left-[25%] top-[65%] w-[40%] h-[100px] border-b-2 border-r-2 border-dashed border-purple-500 rounded-br-[20px] z-0"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: (step >= 2 && step <= 4) ? 1 : 0, scale: (step >= 2 && step <= 4) ? 1 : 0.8 }}
            className="absolute left-[60%] top-1/2 -translate-y-1/2 w-[100px] p-2.5 bg-cyan-600 text-white text-center rounded-lg z-10"
          >
            Vector DB<br/><span className="text-xs">Tool Call</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: (step === 2 || step === 4) ? 1 : 0 }}
            className="absolute left-[40%] top-[30%] p-1.5 bg-orange-500 text-white text-xs rounded z-20"
          >
            {step === 4 ? '3. "Still need X"' : '1. "I need more info"'}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: (step === 3 || step === 4) ? 1 : 0 }}
            className="absolute left-[40%] top-[60%] p-1.5 bg-emerald-500 text-white text-xs rounded z-20"
          >
            {step === 4 ? '4. Returns X' : '2. Returns Context'}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? 1 : 0 }}
            className="absolute left-[33%] top-1/2 -translate-y-1/2 text-gray-400"
          >➔</motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= 5 ? 1 : 0, x: step >= 5 ? 0 : -20 }}
            className="absolute left-[38%] top-1/2 -translate-y-1/2 w-[80px] p-2.5 bg-emerald-600 text-white text-center rounded-lg"
          >
            Final Answer
          </motion.div>

          <div className="absolute bottom-5 left-5 right-5 text-center text-gray-400 text-sm h-10">
            {step === 0 && "Click Play to watch the Agent loop."}
            {step === 1 && "1. A complex task is given to the Agent."}
            {step === 2 && "2. The Agent reasons it lacks info, and calls the Vector DB tool."}
            {step === 3 && "3. The DB returns context. The Agent reads it and evaluates if it is enough."}
            {step === 4 && "4. (Looping) The Agent realizes it needs one more piece of data, and calls the tool again."}
            {step >= 5 && "5. Having collected all necessary context over multiple loops, it generates the Final Answer."}
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

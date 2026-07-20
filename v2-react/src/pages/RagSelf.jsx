import React, { useState, useEffect } from 'react';
import GuideLayout from '../components/GuideLayout';
import { motion, AnimatePresence } from 'framer-motion';

const toc = [];

const RagSelf = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps = [
    { show: ['s-tok1'], desc: '1. The model starts generating, but outputs a [Retrieve=Yes] token, triggering a search.' },
    { show: ['s-tok2'], desc: '2. After reading context, it outputs [Is_Relevant=Yes], confirming the data is useful.' },
    { show: ['s-tok3'], desc: '3. While generating the answer, it outputs [Is_Supported=Fully], confirming no hallucinations.' },
    { show: ['s-arr', 's-ans'], desc: '4. The final, fully-verified answer is delivered.' }
  ];

  useEffect(() => {
    let timeout;
    if (playing && step < steps.length) {
      timeout = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 2200);
    } else if (step >= steps.length) {
      setPlaying(false);
    }
    return () => clearTimeout(timeout);
  }, [playing, step, steps.length]);

  const handlePlay = () => {
    if (playing) return;
    if (step >= steps.length) {
      setStep(0);
    }
    setPlaying(true);
    setStep(1);
  };

  const handleReset = () => {
    setPlaying(false);
    setStep(0);
  };

  const visibleNodes = steps.slice(0, step).flatMap(s => s.show);
  const currentDesc = step > 0 && step <= steps.length ? steps[step - 1].desc : 'Click Play to see Self-RAG generate reflection tokens.';

  return (
    <GuideLayout
      title="Self-RAG"
      intro="The model uses special reflection tokens to critique its own retrieval and generation."
      toc={toc}
    >
      <section className="mb-12">
        <div className="relative h-[450px] bg-[#111] border border-[#333] rounded-2xl overflow-hidden mb-6">
          
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[100px] py-5 px-2 bg-blue-600 text-white text-center rounded-lg font-bold z-10 shadow-lg shadow-blue-500/20">
            Self-RAG LLM
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: visibleNodes.includes('s-tok1') ? 1 : 0, scale: visibleNodes.includes('s-tok1') ? 1 : 0.8 }}
            className="absolute left-[35%] top-[30%] p-2 bg-[#1a1a1a] border-2 border-purple-500 text-purple-400 rounded-full font-bold text-xs"
          >
            [Retrieve]
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: '-50%' }}
            animate={{ opacity: visibleNodes.includes('s-tok2') ? 1 : 0, scale: visibleNodes.includes('s-tok2') ? 1 : 0.8 }}
            className="absolute left-[50%] top-1/2 p-2 bg-[#1a1a1a] border-2 border-cyan-500 text-cyan-400 rounded-full font-bold text-xs"
          >
            [Is_Relevant]
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: visibleNodes.includes('s-tok3') ? 1 : 0, scale: visibleNodes.includes('s-tok3') ? 1 : 0.8 }}
            className="absolute left-[65%] top-[70%] p-2 bg-[#1a1a1a] border-2 border-green-500 text-green-400 rounded-full font-bold text-xs"
          >
            [Is_Supported]
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -10, y: '-50%' }}
            animate={{ opacity: visibleNodes.includes('s-arr') ? 1 : 0, x: visibleNodes.includes('s-arr') ? 0 : -10 }}
            className="absolute left-[80%] top-1/2 text-gray-400 text-xl font-bold"
          >
            ➔
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: '-50%' }}
            animate={{ opacity: visibleNodes.includes('s-ans') ? 1 : 0, scale: visibleNodes.includes('s-ans') ? 1 : 0.8 }}
            className="absolute left-[85%] top-1/2 w-[60px] p-3 bg-green-600 text-white text-center rounded-lg shadow-lg shadow-green-500/20"
          >
            Answer
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentDesc}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-5 left-5 right-5 text-center text-gray-300 text-sm h-10 font-medium"
            >
              {currentDesc}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={handlePlay}
            className="px-6 py-2 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            {step >= steps.length ? '▶ Replay' : '▶ Play Animation'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-full font-semibold bg-[#222] border border-[#444] text-gray-300 hover:bg-[#333] transition-colors"
          >
            ↺ Reset
          </button>
        </div>
      </section>
    </GuideLayout>
  );
};

export default RagSelf;

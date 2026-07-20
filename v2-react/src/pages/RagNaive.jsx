import React, { useState, useEffect } from 'react';
import GuideLayout from '../components/GuideLayout';
import { motion, AnimatePresence } from 'framer-motion';

const toc = [];

const RagNaive = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps = [
    { show: ['n-query'], desc: '1. The user asks a question.' },
    { show: ['n-arrow1', 'n-embed'], desc: '2. The text is passed to an Embedding Model.' },
    { show: ['n-arrow2', 'n-vdb'], desc: '3. A similarity search is run against the Vector Database.' },
    { show: ['n-arrow3', 'n-prompt'], desc: '4. The top results (context) are injected into the Prompt.' },
    { show: ['n-arrow4', 'n-llm'], desc: '5. The LLM generates an answer grounded in the context.' }
  ];

  useEffect(() => {
    let timeout;
    if (playing && step < steps.length) {
      timeout = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1500);
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
  const currentDesc = step > 0 && step <= steps.length ? steps[step - 1].desc : 'Click Play to see the Naive RAG pipeline in action.';

  return (
    <GuideLayout
      title="Naive RAG"
      intro="The baseline Retrieve-Read-Generate loop. Simple, but prone to failure on complex queries."
      toc={toc}
    >
      <section className="mb-12">
        <div className="relative h-[450px] bg-[#111] border border-[#333] rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: '-50%' }}
            animate={{ 
              opacity: visibleNodes.includes('n-query') ? 1 : 0, 
              scale: visibleNodes.includes('n-query') ? 1 : 0.8,
            }}
            className="absolute left-[5%] top-1/2 w-[120px] text-center p-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20"
          >
            User Query
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: '-50%', x: -10 }}
            animate={{ opacity: visibleNodes.includes('n-arrow1') ? 1 : 0, x: visibleNodes.includes('n-arrow1') ? 0 : -10 }}
            className="absolute left-[23%] top-1/2 text-gray-400 font-bold text-xl"
          >
            ➔
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: '-50%' }}
            animate={{ 
              opacity: visibleNodes.includes('n-embed') ? 1 : 0, 
              scale: visibleNodes.includes('n-embed') ? 1 : 0.8,
            }}
            className="absolute left-[30%] top-1/2 w-[120px] text-center p-3 bg-purple-600 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/20"
          >
            Embed Model
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: '-50%', x: -10 }}
            animate={{ opacity: visibleNodes.includes('n-arrow2') ? 1 : 0, x: visibleNodes.includes('n-arrow2') ? 0 : -10 }}
            className="absolute left-[48%] top-1/2 text-gray-400 font-bold text-xl"
          >
            ➔
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: visibleNodes.includes('n-vdb') ? 1 : 0, 
              scale: visibleNodes.includes('n-vdb') ? 1 : 0.8,
            }}
            className="absolute left-[55%] top-[20%] w-[120px] text-center p-3 bg-cyan-600 text-white rounded-lg font-semibold shadow-lg shadow-cyan-500/20"
          >
            Vector DB<br/><span className="text-xs font-normal">Top-K Search</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: visibleNodes.includes('n-arrow3') ? 1 : 0, y: visibleNodes.includes('n-arrow3') ? 0 : -10 }}
            className="absolute left-[62%] top-[38%] text-gray-400 font-bold text-xl rotate-90"
          >
            ➔
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: '-50%' }}
            animate={{ 
              opacity: visibleNodes.includes('n-prompt') ? 1 : 0, 
              scale: visibleNodes.includes('n-prompt') ? 1 : 0.8,
            }}
            className="absolute left-[55%] top-1/2 w-[120px] text-center p-3 bg-orange-600 text-white rounded-lg font-semibold shadow-lg shadow-orange-500/20"
          >
            Prompt Builder<br/><span className="text-xs font-normal">Context + Query</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: '-50%', x: -10 }}
            animate={{ opacity: visibleNodes.includes('n-arrow4') ? 1 : 0, x: visibleNodes.includes('n-arrow4') ? 0 : -10 }}
            className="absolute left-[73%] top-1/2 text-gray-400 font-bold text-xl"
          >
            ➔
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: '-50%' }}
            animate={{ 
              opacity: visibleNodes.includes('n-llm') ? 1 : 0, 
              scale: visibleNodes.includes('n-llm') ? 1 : 0.8,
            }}
            className="absolute left-[80%] top-1/2 w-[120px] text-center p-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg shadow-green-500/20"
          >
            LLM<br/><span className="text-xs font-normal">Generation</span>
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

export default RagNaive;

import React, { useState, useEffect } from 'react';
import GuideLayout from '../components/GuideLayout';
import { motion, AnimatePresence } from 'framer-motion';

const toc = [];

const RagMultimodal = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps = [
    { show: ['m-img', 'm-txt'], desc: '1. User uploads a photo of a part and asks "How do I fix this?"' },
    { show: ['m-arr1', 'm-arr2', 'm-clip'], desc: '2. A multimodal embedder (like CLIP) embeds both into the same vector space.' },
    { show: ['m-arr3', 'm-db'], desc: '3. DB searches for similar images (diagrams) AND matching text (manuals).' },
    { show: ['m-arr4', 'm-vlm'], desc: '4. The retrieved diagrams and text are fed into a Vision-Language Model to generate the answer.' }
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
  const currentDesc = step > 0 && step <= steps.length ? steps[step - 1].desc : 'Click Play to see Multi-modal retrieval.';

  return (
    <GuideLayout
      title="Multi-modal RAG"
      intro="Retrieves images, video frames, and text simultaneously into a Vision-Language Model."
      toc={toc}
    >
      <section className="mb-12">
        <div className="relative h-[450px] bg-[#111] border border-[#333] rounded-2xl overflow-hidden mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: visibleNodes.includes('m-img') ? 1 : 0, scale: visibleNodes.includes('m-img') ? 1 : 0.8 }}
            className="absolute left-[5%] top-[30%] p-3 border-2 border-dashed border-gray-500 text-center rounded-lg text-white"
          >
            🖼️<br/><span className="text-xs text-gray-400">Image Upload</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: visibleNodes.includes('m-txt') ? 1 : 0, scale: visibleNodes.includes('m-txt') ? 1 : 0.8 }}
            className="absolute left-[5%] top-[60%] p-3 border-2 border-gray-500 text-center rounded-lg text-white"
          >
            📝<br/><span className="text-xs text-gray-400">Text Query</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: visibleNodes.includes('m-arr1') ? 1 : 0, x: visibleNodes.includes('m-arr1') ? 0 : -10 }}
            className="absolute left-[18%] top-[45%] rotate-[15deg] text-gray-400 text-xl font-bold"
          >
            ➔
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: visibleNodes.includes('m-arr2') ? 1 : 0, x: visibleNodes.includes('m-arr2') ? 0 : -10 }}
            className="absolute left-[18%] top-[55%] -rotate-[15deg] text-gray-400 text-xl font-bold"
          >
            ➔
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: '-50%', scale: 0.8 }}
            animate={{ opacity: visibleNodes.includes('m-clip') ? 1 : 0, scale: visibleNodes.includes('m-clip') ? 1 : 0.8 }}
            className="absolute left-[25%] top-1/2 w-[100px] p-3 bg-cyan-600 text-white text-center rounded-lg shadow-lg shadow-cyan-500/20"
          >
            CLIP Embedder<br/><span className="text-xs text-cyan-200">Shared Space</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: '-50%', x: -10 }}
            animate={{ opacity: visibleNodes.includes('m-arr3') ? 1 : 0, x: visibleNodes.includes('m-arr3') ? 0 : -10 }}
            className="absolute left-[42%] top-1/2 text-gray-400 text-xl font-bold"
          >
            ➔
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: '-50%', scale: 0.8 }}
            animate={{ opacity: visibleNodes.includes('m-db') ? 1 : 0, scale: visibleNodes.includes('m-db') ? 1 : 0.8 }}
            className="absolute left-[48%] top-1/2 w-[100px] p-3 bg-blue-600 text-white text-center rounded-lg shadow-lg shadow-blue-500/20"
          >
            Vector DB<br/><span className="text-xs text-blue-200">Find Images & Text</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: '-50%', x: -10 }}
            animate={{ opacity: visibleNodes.includes('m-arr4') ? 1 : 0, x: visibleNodes.includes('m-arr4') ? 0 : -10 }}
            className="absolute left-[65%] top-1/2 text-gray-400 text-xl font-bold"
          >
            ➔
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: '-50%', scale: 0.8 }}
            animate={{ opacity: visibleNodes.includes('m-vlm') ? 1 : 0, scale: visibleNodes.includes('m-vlm') ? 1 : 0.8 }}
            className="absolute left-[75%] top-1/2 w-[80px] p-3 bg-purple-600 text-white text-center rounded-lg font-bold shadow-lg shadow-purple-500/20"
          >
            VLM<br/><span className="text-xs text-purple-200">(GPT-4o)</span>
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

export default RagMultimodal;

import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function MlDeepLearning() {
  return (
    <GuideLayout title="Deep Learning" intro="Explore the depths of neural networks and sophisticated models." toc={[]}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 rounded-2xl border border-white/10 bg-[#111111]/50 backdrop-blur-sm"
      >
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-6xl mb-6"
        >
          🚧
        </motion.div>
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/15 text-indigo-400 text-sm font-bold border border-indigo-500/30 mb-6">
          Machine Learning
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-br from-white to-indigo-300 bg-clip-text text-transparent">
          Deep Learning
        </h2>
        <p className="text-gray-400 max-w-lg leading-relaxed mb-8 text-lg">
          This section is under construction. Comprehensive content and interactive visualizations are coming soon!
        </p>
      </motion.div>
    </GuideLayout>
  );
}

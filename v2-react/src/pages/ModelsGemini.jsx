import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GuideLayout from '../components/GuideLayout';

export default function ModelsGemini() {
  const toc = [];

  return (
    <GuideLayout
      title="Gemini (Google)"
      intro="This section is under construction. Comprehensive content and interactive visualizations are coming soon!"
      toc={toc}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 gap-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-6xl"
        >
          🚧
        </motion.div>
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/15 text-indigo-400 text-sm font-bold border border-indigo-500/30">
          Models
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-indigo-300 bg-clip-text text-transparent">
          Gemini (Google)
        </h2>
        <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
          This section is under construction. Comprehensive content and interactive visualizations are coming soon!
        </p>
        <Link to="/" className="mt-4 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
          ← Back to Home
        </Link>
      </motion.div>
    </GuideLayout>
  );
}

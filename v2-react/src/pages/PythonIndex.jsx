import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GuideLayout from '../components/GuideLayout';

export default function PythonIndex() {
  const toc = [
    { label: "Under Construction", hash: "#under-construction" }
  ];

  return (
    <GuideLayout
      title="Python for ML"
      intro="Comprehensive content and interactive visualizations are coming soon!"
      toc={toc}
    >
      <section id="under-construction">
        <motion.div
          className="flex flex-col items-center justify-center min-h-[50vh] text-center p-10 gap-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <motion.div 
            className="text-7xl"
            animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            🚧
          </motion.div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/15 text-indigo-400 text-sm font-bold border border-indigo-500/30">
            Machine Learning
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-indigo-300 bg-clip-text text-transparent">
            Python for ML
          </h2>
          <p className="text-gray-400 max-w-md leading-relaxed text-lg">
            This section is under construction. Comprehensive content and interactive visualizations are coming soon!
          </p>
          <Link 
            to="/"
            className="mt-4 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-500/25"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </section>
    </GuideLayout>
  );
}

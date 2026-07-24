import React from 'react';
import { motion } from 'framer-motion';

export default function ResourcesIndex() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white text-center px-5 py-10 gap-6">
      <motion.div 
        className="text-6xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        🚧
      </motion.div>
      <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/15 text-indigo-400 text-sm font-bold border border-indigo-500/30">
        Resources
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-indigo-300 bg-clip-text text-transparent">
        Resources & Reading
      </h1>
      <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
        This section is under construction. Comprehensive content and interactive visualizations are coming soon!
      </p>
      <motion.a 
        href="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
      >
        ← Back to Home
      </motion.a>
    </div>
  );
}

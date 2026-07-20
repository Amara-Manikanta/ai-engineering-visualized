import React from 'react';
import GuideLayout from "../components/GuideLayout";
import { motion } from "framer-motion";

const AgentsMultiAgent = () => {
  return (
    <GuideLayout
      title="Multi-Agent Systems"
      intro="This section is under construction. Comprehensive content and interactive visualizations are coming soon!"
      toc={[]}
    >
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-6xl mb-6"
        >
          🚧
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/15 text-indigo-400 text-sm font-bold border border-indigo-500/30 mb-4">
            Agentic AI
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-indigo-300 bg-clip-text text-transparent mb-6">
            Multi-Agent Systems
          </h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            This section is under construction. Comprehensive content and interactive visualizations are coming soon!
          </p>
        </motion.div>
      </div>
    </GuideLayout>
  );
};

export default AgentsMultiAgent;

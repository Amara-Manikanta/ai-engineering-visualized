import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagIndex() {
  const toc = [
    { label: "Overview", hash: "overview" },
    { label: "Demo", hash: "demo" }
  ];

  return (
    <GuideLayout
      title="RAG from Scratch"
      intro="Indexing → Retrieval → Augmented → Generation"
      toc={toc}
    >
      <section id="hero" className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-gray-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
          />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur text-sm font-medium"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            Interactive Learning Guide
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white"
          >
            RAG <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">from Scratch</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            A deep-dive, step-by-step animated explainer of <strong className="text-gray-200">Retrieval-Augmented Generation</strong> —
            the architecture that lets LLMs answer questions with your own data, accurately and with context.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a href="#overview" className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors w-full sm:w-auto">
              Start Learning ↓
            </a>
            <a href="#demo" className="px-8 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 text-white font-medium transition-colors w-full sm:w-auto">
              Live Demo →
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-8 border-t border-gray-800 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">4</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Core Stages</div>
            </div>
            <div className="text-center border-l border-r border-gray-800">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">12+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Concepts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Animated</div>
            </div>
          </motion.div>
        </div>

        {/* Floating Cards */}
        {[
          { text: "📄 PDF", delay: 0, top: "20%", left: "10%" },
          { text: "🔍 Query", delay: 1, top: "30%", right: "15%" },
          { text: "🧠 LLM", delay: 0.5, bottom: "25%", left: "15%" },
          { text: "💬 Response", delay: 1.5, bottom: "20%", right: "10%" },
          { text: "📊 Vectors", delay: 2, top: "15%", right: "30%" }
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              y: [-10, 10, -10],
            }}
            transition={{
              opacity: { duration: 3, repeat: Infinity, delay: card.delay },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay }
            }}
            style={{
              position: 'absolute',
              top: card.top,
              left: card.left,
              right: card.right,
              bottom: card.bottom
            }}
            className="hidden lg:flex px-4 py-2 rounded-lg bg-gray-800/80 backdrop-blur border border-gray-700 text-sm font-medium text-gray-300 shadow-xl"
          >
            {card.text}
          </motion.div>
        ))}
      </section>
    </GuideLayout>
  );
}

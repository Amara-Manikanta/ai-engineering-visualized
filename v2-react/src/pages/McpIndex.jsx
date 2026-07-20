import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function McpIndex() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => setStep((s) => (s < totalSteps ? s + 1 : 1));
  const handlePrev = () => setStep((s) => (s > 1 ? s - 1 : totalSteps));
  const handleReset = () => setStep(1);

  const toc = [
    { label: 'Model Context Protocol', hash: '#mcp' }
  ];

  return (
    <GuideLayout
      title="MCP Pipeline"
      intro="Connecting LLMs to the Real World"
      toc={toc}
    >
      <section id="mcp" className="mb-12">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-green-400 uppercase bg-green-500/10 rounded-full border border-green-500/20">
            Model Context Protocol
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Connecting LLMs to the Real World</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            An open standard that enables AI models to securely interact with local and remote data sources, tools, and services.
          </p>
        </div>

        <div className="mb-12 p-8 bg-black/40 border border-white/10 rounded-2xl relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={handlePrev} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">‹ Prev</button>
            <span className="text-sm font-medium text-gray-400">Step {step} of {totalSteps}</span>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">Next ›</button>
            <button onClick={handleReset} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors ml-auto">↺ Reset</button>
          </div>

          <div className="flex items-center justify-between min-h-[200px] relative">
            <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-2xl mb-3">👤</div>
              <span className="text-sm font-mono text-gray-300">User Prompt</span>
            </motion.div>

            {step > 1 && <motion.div initial={{ width: 0 }} animate={{ width: '60px' }} className="h-0.5 bg-gray-600 relative mx-2"><div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" /></motion.div>}

            <motion.div animate={{ opacity: step >= 2 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/50 border border-purple-500 flex items-center justify-center text-sm font-bold text-purple-300 mb-3">LLM</div>
              <span className="text-sm font-mono text-gray-300">Claude</span>
            </motion.div>

            {step > 2 && <motion.div initial={{ width: 0 }} animate={{ width: '60px' }} className="h-0.5 bg-gray-600 relative mx-2"><div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" /></motion.div>}

            <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-blue-900/50 border border-blue-500 flex items-center justify-center text-2xl mb-3">🔌</div>
              <span className="text-sm font-mono text-gray-300">MCP Client</span>
            </motion.div>

            {step > 3 && <motion.div initial={{ width: 0 }} animate={{ width: '60px' }} className="h-0.5 bg-gray-600 relative mx-2"><div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" /></motion.div>}

            <motion.div animate={{ opacity: step >= 4 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-green-900/50 border border-green-500 flex items-center justify-center text-2xl mb-3">🖥️</div>
              <span className="text-sm font-mono text-gray-300">MCP Server</span>
            </motion.div>

            {step > 4 && <motion.div initial={{ width: 0 }} animate={{ width: '60px' }} className="h-0.5 bg-gray-600 relative mx-2"><div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" /></motion.div>}

            <motion.div animate={{ opacity: step >= 5 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-orange-900/50 border border-orange-500 flex items-center justify-center text-2xl mb-3">🗄️</div>
              <span className="text-sm font-mono text-gray-300">Data / API</span>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
            <h4 className="text-lg font-bold text-white mb-2">
              {step === 1 && "User Request"}
              {step === 2 && "Claude"}
              {step === 3 && "MCP Client"}
              {step === 4 && "MCP Server"}
              {step === 5 && "Database / API"}
            </h4>
            <p className="text-gray-400">
              {step === 1 && "The user asks Claude a question that requires external information."}
              {step === 2 && "Claude receives the prompt and decides to call a tool."}
              {step === 3 && "The application acts as an MCP Client."}
              {step === 4 && "The MCP Server receives JSON-RPC commands and executes them securely."}
              {step === 5 && "The server accesses local files, databases, or external APIs."}
            </p>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

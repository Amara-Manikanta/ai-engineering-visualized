import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function LangGraphPatterns() {
  const toc = [
    { label: 'Advanced Patterns', hash: '#advanced-patterns' },
    { label: '1. ReAct Agent', hash: '#react-agent' },
    { label: '2. Supervisor', hash: '#supervisor' },
    { label: '3. Parallel (Map-Reduce)', hash: '#parallel' },
    { label: '4. Reflection', hash: '#reflection' }
  ];

  return (
    <GuideLayout
      title="LangGraph Patterns"
      intro="Common LangGraph patterns including ReAct, Supervisor, Parallel Map-Reduce, and Reflection."
      toc={toc}
    >
      <section id="advanced-patterns" className="mb-12">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/10 rounded-full border border-purple-500/20">
            Architecture
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-4">🚀 Advanced LangGraph Patterns</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Once you understand the basic node-and-edge structure, you can compose graphs into powerful multi-agent architectures. Here are the four most common patterns.
          </p>
        </div>

        <div className="space-y-12">
          {/* Pattern 1 */}
          <motion.div id="react-agent" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🎯</span>
              <h3 className="text-2xl font-bold text-white">1. The ReAct Agent (Tool-Calling Loop)</h3>
            </div>
            <p className="text-gray-400 mb-6">
              The foundation of agentic AI. The agent receives a task, <strong>Reasons</strong> about what to do, takes an <strong>Action</strong> (calls a tool), and <strong>Observes</strong> the result. It repeats this cycle until the task is complete.
            </p>
            <div className="bg-black/50 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700">User Input</div>
              <div className="text-gray-500 my-2">↓</div>
              <div className="p-6 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center">
                <div className="px-4 py-2 bg-blue-900/50 text-blue-300 rounded-lg border border-blue-700 mb-4">LLM Node (Reasoning)</div>
                <div className="flex gap-12">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">Has tool call</span>
                    <div className="text-gray-500 mb-2">↓</div>
                    <div className="px-4 py-2 bg-orange-900/50 text-orange-300 rounded-lg border border-orange-700">Tool Node (Action)</div>
                    <div className="mt-4 text-xs text-orange-400">↺ Loop back</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">Final Answer</span>
                    <div className="text-gray-500 mb-2">↓</div>
                    <div className="px-4 py-2 bg-green-900/50 text-green-300 rounded-lg border border-green-700">Output</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pattern 2 */}
          <motion.div id="supervisor" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">👔</span>
              <h3 className="text-2xl font-bold text-white">2. Supervisor (Hierarchical Routing)</h3>
            </div>
            <p className="text-gray-400 mb-6">
              A central "Supervisor" LLM orchestrates multiple specialized worker agents. It looks at the task, decides which worker should handle it, passes the state to them, and collects the response.
            </p>
            <div className="bg-black/50 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="px-4 py-2 bg-purple-900/50 text-purple-300 rounded-lg border border-purple-700 mb-4">Supervisor LLM</div>
              <div className="flex gap-8 mb-4">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">Needs Code</span>
                  <div className="text-gray-500 my-1">↙</div>
                  <div className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700">Coder Agent</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">Needs Search</span>
                  <div className="text-gray-500 my-1">↓</div>
                  <div className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700">Research Agent</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">Needs Math</span>
                  <div className="text-gray-500 my-1">↘</div>
                  <div className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700">Math Agent</div>
                </div>
              </div>
              <div className="text-xs text-purple-400 mt-2 border-t border-dashed border-gray-600 pt-4 w-full">↑ Return to Supervisor ↑</div>
            </div>
          </motion.div>

          {/* Pattern 3 */}
          <motion.div id="parallel" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🌐</span>
              <h3 className="text-2xl font-bold text-white">3. Parallel Execution (Map-Reduce)</h3>
            </div>
            <p className="text-gray-400 mb-6">
              When a task can be broken into independent sub-tasks (e.g., reviewing 5 different documents), the graph fans out to process them simultaneously, then fans in to aggregate the results. Massively speeds up workflows.
            </p>
          </motion.div>

          {/* Pattern 4 */}
          <motion.div id="reflection" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🔍</span>
              <h3 className="text-2xl font-bold text-white">4. Reflection (Self-Correction)</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Two distinct roles: A <strong>Generator</strong> creates the output (code, text, translation), and a <strong>Critic</strong> evaluates it against a rubric. If it fails, the Critic provides feedback and loops it back to the Generator to try again.
            </p>
          </motion.div>
        </div>
      </section>
    </GuideLayout>
  );
}

import React from 'react';
import GuideLayout from "../components/GuideLayout";
import { motion } from "framer-motion";

const toc = [
  { label: "Why Agents Need Memory", hash: "overview" },
  { label: "The Memory Hierarchy", hash: "hierarchy" },
  { label: "Context Window Management", hash: "context-window" },
  { label: "Long-Term Memory Patterns", hash: "long-term" },
  { label: "Comparison Table", hash: "comparison" },
];

const memoryTypes = [
  { icon: '💬', title: 'Short-Term (Context Window)', color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400', desc: "The current conversation's raw token buffer. Fast and free to access, but bounded — everything older than the window limit is gone unless saved elsewhere." },
  { icon: '📝', title: 'Working Memory (Scratchpad)', color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400', desc: 'A running notes file or todo list the agent writes to during a task — plans, intermediate results, progress tracking that survives context compaction.' },
  { icon: '📚', title: 'Episodic Memory', color: 'border-purple-500/30 bg-purple-500/10 text-purple-400', desc: 'A record of past sessions or conversations, usually stored as summaries. Lets an agent recall "what we decided last time" across sessions.' },
  { icon: '🧠', title: 'Semantic Memory', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400', desc: 'Structured facts and knowledge — typically a vector database or knowledge graph — retrieved on demand via similarity search (this is RAG applied to memory).' },
  { icon: '⚙️', title: 'Procedural Memory', color: 'border-amber-500/30 bg-amber-500/10 text-amber-400', desc: 'Learned "how to do things" — reusable skills, tool-use patterns, or instructions distilled from past experience, often stored as prompts or code the agent invokes.' },
];

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };

export default function AgentsMemory() {
  return (
    <GuideLayout
      title="Memory & State"
      intro="Context windows are finite. Real agents need a strategy for what to remember, what to forget, and where to put the rest."
      toc={toc}
    >
      <section id="overview" className="mb-14 scroll-mt-24">
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          An LLM call is stateless — it only knows what's in its current context window. "Memory" is the
          engineering layer built around that stateless call to make an agent feel like it remembers: what was
          discussed, what it already tried, and what it knows about the world. Getting this wrong causes agents to
          repeat mistakes, forget instructions mid-task, or hallucinate details from a conversation that never happened.
        </p>
      </section>

      <section id="hierarchy" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">The Memory Hierarchy</h2>
        <motion.div className="space-y-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {memoryTypes.map((m, i) => (
            <motion.div key={i} variants={fadeUp} className={`p-5 rounded-xl border ${m.color.split(' ')[0]} ${m.color.split(' ')[1]} flex gap-4 items-start`}>
              <span className="text-3xl shrink-0">{m.icon}</span>
              <div>
                <h3 className={`font-bold mb-1 ${m.color.split(' ')[2]}`}>{m.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="context-window" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Managing the Context Window</h2>
        <p className="text-gray-300 mb-6 max-w-3xl">
          Even with a 200K+ token window, long-running agents eventually fill it. Three techniques keep sessions alive:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Sliding Window', desc: 'Drop the oldest messages once a token budget is hit, keeping only the most recent N turns.' },
            { title: 'Summarization / Compaction', desc: 'Periodically compress older turns into a dense summary, freeing space while preserving key facts.' },
            { title: 'Retrieval on Demand', desc: "Store everything externally and only pull back the relevant slice via search when it's needed." },
          ].map((t, i) => (
            <div key={i} className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <h3 className="font-bold text-gray-200 mb-2">{t.title}</h3>
              <p className="text-sm text-gray-400">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="long-term" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Long-Term Memory Patterns</h2>
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-mono text-gray-300">
            <span className="bg-white/10 px-3 py-1.5 rounded-lg">New Fact</span>
            <span className="text-indigo-400">→</span>
            <span className="bg-indigo-600/30 border border-indigo-500/50 px-3 py-1.5 rounded-lg text-indigo-300">Embed</span>
            <span className="text-indigo-400">→</span>
            <span className="bg-emerald-600/30 border border-emerald-500/50 px-3 py-1.5 rounded-lg text-emerald-300">Vector Store</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-mono text-gray-300 mt-4">
            <span className="bg-white/10 px-3 py-1.5 rounded-lg">New Query</span>
            <span className="text-purple-400">→</span>
            <span className="bg-purple-600/30 border border-purple-500/50 px-3 py-1.5 rounded-lg text-purple-300">Similarity Search</span>
            <span className="text-purple-400">→</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg">Inject into Context</span>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">This is exactly the RAG pattern, applied to the agent's own memory instead of a document corpus.</p>
        </div>
      </section>

      <section id="comparison" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Type</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Lifespan</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Storage</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Access Pattern</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Short-term</td><td className="px-4 py-2.5 border-b border-gray-900">Single turn/session</td><td className="px-4 py-2.5 border-b border-gray-900">In-context tokens</td><td className="px-4 py-2.5 border-b border-gray-900">Always visible</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Working</td><td className="px-4 py-2.5 border-b border-gray-900">Single task</td><td className="px-4 py-2.5 border-b border-gray-900">Scratchpad file</td><td className="px-4 py-2.5 border-b border-gray-900">Read/write by agent</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Episodic</td><td className="px-4 py-2.5 border-b border-gray-900">Across sessions</td><td className="px-4 py-2.5 border-b border-gray-900">Summary log / DB</td><td className="px-4 py-2.5 border-b border-gray-900">Loaded at session start</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Semantic</td><td className="px-4 py-2.5 border-b border-gray-900">Indefinite</td><td className="px-4 py-2.5 border-b border-gray-900">Vector DB / knowledge graph</td><td className="px-4 py-2.5 border-b border-gray-900">Retrieved via search</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Procedural</td><td className="px-4 py-2.5 border-b border-gray-900">Indefinite</td><td className="px-4 py-2.5 border-b border-gray-900">Prompt / skill files</td><td className="px-4 py-2.5 border-b border-gray-900">Loaded when task matches</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </GuideLayout>
  );
}

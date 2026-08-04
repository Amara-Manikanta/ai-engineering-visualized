import React, { useState } from 'react';
import GuideLayout from "../components/GuideLayout";
import { motion, AnimatePresence } from "framer-motion";

const toc = [
  { label: "Why Multiple Agents?", hash: "overview" },
  { label: "Coordination Patterns", hash: "patterns" },
  { label: "Communication Protocols", hash: "comms" },
  { label: "Failure Modes", hash: "failure-modes" },
];

const patterns = [
  {
    id: 1, label: '➡️ Sequential', name: 'Sequential Pipeline',
    desc: 'Agents run one after another, each consuming the previous one\'s output. Like a Unix pipe — Researcher → Writer → Editor.',
    pros: ['Simple to reason about and debug', 'Each agent has a narrow, well-tested job', 'Easy to insert human review between stages'],
    cons: ['Total latency is the sum of every stage', 'A failure anywhere blocks the whole pipeline'],
  },
  {
    id: 2, label: '🔀 Parallel', name: 'Parallel Fan-Out / Fan-In',
    desc: 'Independent agents run simultaneously on different sub-tasks, then a final step merges their results — e.g. 3 research agents covering different sources, aggregated by a summarizer.',
    pros: ['Much faster wall-clock time for independent work', 'Isolated failures don\'t block unrelated branches'],
    cons: ['Merge/aggregation logic adds complexity', 'Harder to keep agents from duplicating work'],
  },
  {
    id: 3, label: '🏗️ Hierarchical', name: 'Orchestrator–Worker',
    desc: 'A manager agent breaks a goal into sub-tasks and delegates each to a specialized worker subagent, then reviews and combines their results.',
    pros: ['Scales to complex, open-ended goals', 'Workers can use different models/tools/permissions'],
    cons: ['Orchestrator becomes a single point of failure', 'Context has to be carefully passed down and back up'],
  },
  {
    id: 4, label: '⚖️ Debate', name: 'Debate / Consensus',
    desc: 'Multiple agents independently answer the same question, then critique each other\'s reasoning before a final vote or judge model picks (or synthesizes) the best answer.',
    pros: ['Catches individual model mistakes and hallucinations', 'Higher-confidence answers on ambiguous questions'],
    cons: ['Most expensive pattern — multiplies token cost', 'Can converge on a confidently wrong shared answer'],
  },
];

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };

function PatternDiagram({ id }) {
  if (id === 1) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-mono">
        {['Researcher', 'Writer', 'Editor'].map((s, i, arr) => (
          <React.Fragment key={s}>
            <span className="bg-indigo-600/30 border border-indigo-500/50 px-3 py-2 rounded-lg text-indigo-300">{s}</span>
            {i < arr.length - 1 && <span className="text-indigo-400">→</span>}
          </React.Fragment>
        ))}
      </div>
    );
  }
  if (id === 2) {
    return (
      <div className="flex flex-col items-center gap-3 text-sm font-mono">
        <span className="bg-white/10 px-3 py-1.5 rounded-lg">Task</span>
        <div className="flex gap-2">
          {['Agent A', 'Agent B', 'Agent C'].map((s) => (
            <span key={s} className="bg-emerald-600/30 border border-emerald-500/50 px-3 py-1.5 rounded-lg text-emerald-300">{s}</span>
          ))}
        </div>
        <span className="text-emerald-400">↓ merge ↓</span>
        <span className="bg-white/10 px-3 py-1.5 rounded-lg">Aggregator</span>
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className="flex flex-col items-center gap-3 text-sm font-mono">
        <span className="bg-purple-600/30 border border-purple-500/50 px-3 py-1.5 rounded-lg text-purple-300">Orchestrator</span>
        <span className="text-purple-400">↓ delegates ↓</span>
        <div className="flex gap-2">
          {['Worker 1', 'Worker 2', 'Worker 3'].map((s) => (
            <span key={s} className="bg-white/10 px-3 py-1.5 rounded-lg">{s}</span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-3 text-sm font-mono">
      <div className="flex gap-2">
        {['Agent A', 'Agent B', 'Agent C'].map((s) => (
          <span key={s} className="bg-amber-600/30 border border-amber-500/50 px-3 py-1.5 rounded-lg text-amber-300">{s}</span>
        ))}
      </div>
      <span className="text-amber-400">↓ critique each other ↓</span>
      <span className="bg-white/10 px-3 py-1.5 rounded-lg">Judge / Vote → Final Answer</span>
    </div>
  );
}

export default function AgentsMultiAgent() {
  const [active, setActive] = useState(1);
  const current = patterns.find((p) => p.id === active);

  return (
    <GuideLayout
      title="Multi-Agent Systems"
      intro="When one agent isn't enough: splitting work across specialized agents that coordinate to solve a bigger problem."
      toc={toc}
    >
      <section id="overview" className="mb-14 scroll-mt-24">
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          A single agent with a huge prompt and every tool attached tends to get confused about which instructions
          apply when. Multi-agent systems solve this by giving each agent a narrow role, its own context window, and
          only the tools it needs — trading orchestration complexity for focus and parallelism.
        </p>
      </section>

      <section id="patterns" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Coordination Patterns</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {patterns.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`p-3 rounded-lg border font-semibold text-sm transition-all ${
                active === p.id
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_4px_14px_rgba(99,102,241,0.4)]'
                  : 'bg-[#111] border-gray-800 text-gray-400 hover:bg-[#222] hover:border-indigo-500 hover:text-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <h3 className="text-xl font-bold text-gray-100 mb-2">{current.name}</h3>
            <p className="text-gray-300 mb-5">{current.desc}</p>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-8 mb-6 flex items-center justify-center min-h-[140px]">
              <PatternDiagram id={active} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-lg">
                <h4 className="text-emerald-400 font-semibold mb-2 mt-0">Advantages</h4>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                  {current.pros.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="bg-rose-900/10 border border-rose-500/20 p-4 rounded-lg">
                <h4 className="text-rose-400 font-semibold mb-2 mt-0">Tradeoffs</h4>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                  {current.cons.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="comms" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Communication Protocols</h2>
        <p className="text-gray-300 mb-6 max-w-3xl">
          How do separate agents actually pass information? Three common approaches, from simplest to most structured:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Shared State Object', desc: 'All agents read/write a common state (e.g. a LangGraph state dict). Simple, but risks agents overwriting each other\'s work.' },
            { title: 'Message Passing', desc: 'Agents send explicit messages to each other\'s queues or context, like actors — clearer boundaries, more setup.' },
            { title: 'Structured Protocols (A2A, MCP)', desc: 'Standardized schemas for agent-to-agent and agent-to-tool communication, enabling agents from different frameworks to interoperate.' },
          ].map((c, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-gray-200 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="failure-modes" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Common Failure Modes</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {[
            { title: 'Context Loss Across Handoffs', desc: 'A worker agent doesn\'t receive enough of the original task context and solves the wrong problem.' },
            { title: 'Duplicated Work', desc: 'Parallel agents unknowingly research or produce the same thing, wasting tokens and time.' },
            { title: 'Infinite Delegation Loops', desc: 'An orchestrator keeps re-delegating a failing task without a retry limit or escalation path.' },
            { title: 'Cost Explosion', desc: 'Every added agent multiplies token spend — debate/consensus patterns are especially expensive at scale.' },
          ].map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-rose-900/10 border border-rose-500/20 rounded-lg p-4">
              <h4 className="text-rose-400 font-semibold mb-1">{f.title}</h4>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

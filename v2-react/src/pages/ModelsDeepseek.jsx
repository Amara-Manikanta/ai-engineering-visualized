import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function ModelsDeepseek() {
  const toc = [
    { label: 'Overview', hash: 'overview' },
    { label: 'Model Lineup', hash: 'lineup' },
    { label: 'Architecture', hash: 'architecture' },
    { label: 'Strengths & Weaknesses', hash: 'strengths' },
    { label: 'Ideal Use Cases', hash: 'use-cases' },
  ];

  return (
    <GuideLayout title="DeepSeek (DeepSeek AI)" intro="Proved that frontier-level reasoning could be trained far more cheaply than assumed, via aggressive Mixture-of-Experts efficiency and reinforcement-learning-based reasoning." toc={toc}>
      <section id="overview" className="mb-14 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🐋</span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold border border-cyan-500/30">DeepSeek AI · Open Weights</span>
        </div>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          DeepSeek's V-series and R-series models showed the industry that near-frontier reasoning quality didn't
          require frontier-scale training budgets. Its R1 "reasoning" line popularized visible chain-of-thought
          tokens and reinforcement-learning-trained reasoning as an open, reproducible technique.
        </p>
      </section>

      <section id="lineup" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Model Lineup</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Line</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Best For</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">V-series (chat)</td><td className="px-4 py-2.5 border-b border-gray-900">General-purpose assistant, coding</td><td className="px-4 py-2.5 border-b border-gray-900">Sparse MoE, low cost per token</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">R-series (reasoning)</td><td className="px-4 py-2.5 border-b border-gray-900">Math, logic, multi-step problem solving</td><td className="px-4 py-2.5 border-b border-gray-900">RL-trained chain-of-thought, visible reasoning tokens</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Distilled variants</td><td className="px-4 py-2.5 border-b border-gray-900">Running reasoning quality on smaller hardware</td><td className="px-4 py-2.5 border-b border-gray-900">Reasoning traces distilled into 7B–70B dense models</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="architecture" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Architecture Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🧩', title: 'Aggressive MoE Sparsity', desc: 'Activates a very small fraction of total parameters per token, drastically cutting training and inference compute.' },
            { icon: '🎯', title: 'RL-Trained Reasoning', desc: 'The R-series is trained with reinforcement learning to produce long, self-checking chains of thought before answering.' },
            { icon: '💰', title: 'Training Efficiency', desc: 'Demonstrated competitive quality at a fraction of the reported training cost of comparable closed frontier models.' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-200 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="strengths" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Strengths & Weaknesses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-5">
            <h4 className="text-emerald-400 font-semibold mb-2">Strengths</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>Exceptional price-to-performance — among the cheapest frontier-adjacent inference available.</li>
              <li>Open weights with permissive commercial licensing.</li>
              <li>R-series reasoning is transparent — you can inspect the chain-of-thought.</li>
              <li>Distilled variants bring reasoning gains to small, cheap-to-run models.</li>
            </ul>
          </div>
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>Reasoning models produce long outputs — higher token cost and latency per answer.</li>
              <li>Smaller ecosystem of managed hosting options than Llama or Qwen.</li>
              <li>Data governance and jurisdiction questions matter more for regulated industries.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="use-cases" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Ideal Use Cases</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {['Math/logic-heavy reasoning tasks', 'Budget-constrained high-volume inference', 'Research needing inspectable reasoning traces'].map((u, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-300 text-center">{u}</motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

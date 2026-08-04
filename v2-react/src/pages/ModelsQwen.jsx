import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function ModelsQwen() {
  const toc = [
    { label: 'Overview', hash: 'overview' },
    { label: 'Model Lineup', hash: 'lineup' },
    { label: 'Architecture', hash: 'architecture' },
    { label: 'Strengths & Weaknesses', hash: 'strengths' },
    { label: 'Ideal Use Cases', hash: 'use-cases' },
  ];

  return (
    <GuideLayout title="Qwen (Alibaba)" intro="One of the largest and most actively updated open-weight families, with unusually strong multilingual and small-model coding performance." toc={toc}>
      <section id="overview" className="mb-14 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🐉</span>
          <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-bold border border-rose-500/30">Alibaba · Open Weights</span>
        </div>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Qwen ships an unusually wide range of sizes — from sub-1B edge models to frontier-scale MoE — all open
          weight, updated on a rapid release cadence. It's particularly strong at Chinese/English bilingual tasks and
          punches above its weight on coding and math benchmarks at small parameter counts.
        </p>
      </section>

      <section id="lineup" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Model Lineup</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Size Class</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Best For</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Flagship MoE (200B+ total)</td><td className="px-4 py-2.5 border-b border-gray-900">Frontier-competitive reasoning</td><td className="px-4 py-2.5 border-b border-gray-900">Sparse activation keeps inference cheap</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Mid (14B–32B)</td><td className="px-4 py-2.5 border-b border-gray-900">Self-hosted assistants</td><td className="px-4 py-2.5 border-b border-gray-900">Strong coding variants (Qwen-Coder)</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Small (0.5B–7B)</td><td className="px-4 py-2.5 border-b border-gray-900">Mobile & embedded devices</td><td className="px-4 py-2.5 border-b border-gray-900">Surprisingly capable for size</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="architecture" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Architecture Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🌐', title: 'Strong Bilingual Training', desc: 'Trained on massive Chinese and English corpora, giving it an edge on cross-lingual and translation-heavy tasks.' },
            { icon: '🧩', title: 'Mixture-of-Experts at Scale', desc: 'Flagship tiers use sparse routing to reach frontier parameter counts without frontier inference costs.' },
            { icon: '👨‍💻', title: 'Dedicated Coder Variants', desc: 'Qwen-Coder checkpoints are fine-tuned specifically for code completion and repository-level tasks.' },
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
              <li>Widest range of open sizes — a model for nearly any hardware budget.</li>
              <li>Best-in-class multilingual quality, especially Chinese/English.</li>
              <li>Small coding variants rival much larger closed models.</li>
              <li>Very active, frequent open releases.</li>
            </ul>
          </div>
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>You self-host — no first-party managed API in every region.</li>
              <li>Fewer English-language fine-tuning guides than Llama.</li>
              <li>Licensing terms vary by model size/version — check before commercial use.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="use-cases" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Ideal Use Cases</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {['Multilingual products (esp. Chinese/English)', 'Lightweight self-hosted coding assistants', 'Edge & mobile on-device inference'].map((u, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-300 text-center">{u}</motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

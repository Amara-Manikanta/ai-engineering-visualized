import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function ModelsLlama() {
  const toc = [
    { label: 'Overview', hash: 'overview' },
    { label: 'Model Lineup', hash: 'lineup' },
    { label: 'Architecture', hash: 'architecture' },
    { label: 'Training & Uniqueness', hash: 'training' },
    { label: 'Strengths & Weaknesses', hash: 'strengths' },
    { label: 'Ideal Use Cases', hash: 'use-cases' },
  ];

  return (
    <GuideLayout title="Llama (Meta)" intro="The open-weights model that kickstarted the self-hosted LLM ecosystem — download it, fine-tune it, and run it on your own hardware." toc={toc}>
      <section id="overview" className="mb-14 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🦙</span>
          <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-bold border border-indigo-500/30">Meta · Open Weights</span>
        </div>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Llama's weights are freely downloadable under a permissive community license, which made it the default
          starting point for teams that want to fine-tune a model on private data, run inference on their own GPUs,
          or avoid sending sensitive data to a third-party API at all.
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
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Hardware</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Large (400B+, MoE)</td><td className="px-4 py-2.5 border-b border-gray-900">Frontier-level reasoning, self-hosted at scale</td><td className="px-4 py-2.5 border-b border-gray-900">Multi-GPU cluster</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Mid (70B–100B)</td><td className="px-4 py-2.5 border-b border-gray-900">General assistant, RAG backends</td><td className="px-4 py-2.5 border-b border-gray-900">Single high-VRAM GPU / A100</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Small (7B–8B)</td><td className="px-4 py-2.5 border-b border-gray-900">Edge devices, cheap fine-tuning</td><td className="px-4 py-2.5 border-b border-gray-900">Consumer GPU</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="architecture" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Architecture Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📦', title: 'Downloadable Weights', desc: 'Full model checkpoints are published for local or cloud self-hosting — no API dependency required.' },
            { icon: '🧩', title: 'Mixture-of-Experts (large tiers)', desc: 'Newer Llama generations use sparse expert routing to scale total parameters without scaling inference cost linearly.' },
            { icon: '🛠️', title: 'Fine-Tuning Friendly', desc: 'The most battle-tested target for LoRA/QLoRA tooling — nearly every fine-tuning library supports Llama first.' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-200 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="training" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Training Methodology & Unique Differentiator</h2>
        <div className="space-y-4">
          <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">How It's Trained (Massive Pre-training & Synthetic Data)</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Meta trains the Llama family on massive corpuses (Llama 3 was pre-trained on over 15 Trillion tokens). For alignment, they use <strong>DPO (Direct Preference Optimization)</strong> and PPO. A key part of their strategy is heavy use of <strong>Synthetic Data Generation</strong>: they use their massive 405B flagship model to generate exceptionally high-quality reasoning and coding outputs, which they then use to train and distill intelligence down into the smaller 8B and 70B models, making them punch far above their weight.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">What Makes It Unique</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong>The Open Foundation Bedrock:</strong> Llama is the de facto standard of the open-source AI community. Meta's open-weights strategy enables offline, air-gapped inference and custom LoRA (Low-Rank Adaptation) fine-tuning for enterprises that cannot send their proprietary data to OpenAI. If a new AI startup builds an agentic tool or fine-tunes a model, 9 times out of 10, they start with Llama as the base architecture.
            </p>
          </div>
        </div>
      </section>

      <section id="strengths" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Strengths & Weaknesses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-5">
            <h4 className="text-emerald-400 font-semibold mb-2">Strengths</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>Full control over deployment — on-prem, air-gapped, or any cloud.</li>
              <li>No per-token vendor cost once hosted; only your own compute.</li>
              <li>Largest open fine-tuning community and tooling ecosystem.</li>
              <li>No risk of API deprecation pulling the model out from under you.</li>
            </ul>
          </div>
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>You own the infrastructure — GPUs, scaling, and uptime.</li>
              <li>Trails closed frontier models on the hardest reasoning benchmarks.</li>
              <li>No built-in hosted tool-use ecosystem; you wire that up yourself.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="use-cases" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Ideal Use Cases</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {['Regulated industries needing on-prem AI', 'Custom fine-tuned domain assistants', 'Cost-sensitive high-volume inference'].map((u, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-300 text-center">{u}</motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function ModelsGrok() {
  const toc = [
    { label: 'Overview', hash: 'overview' },
    { label: 'Model Lineup', hash: 'lineup' },
    { label: 'Architecture', hash: 'architecture' },
    { label: 'Training & Uniqueness', hash: 'training' },
    { label: 'Strengths & Weaknesses', hash: 'strengths' },
    { label: 'Ideal Use Cases', hash: 'use-cases' },
  ];

  return (
    <GuideLayout title="Grok (xAI)" intro="Developed by xAI, Grok is an AI model natively integrated into the X (formerly Twitter) platform, designed with real-time knowledge and a uniquely unfiltered personality." toc={toc}>
      <section id="overview" className="mb-14 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">✖️</span>
          <span className="px-3 py-1 rounded-full bg-slate-500/15 text-slate-300 text-xs font-bold border border-slate-500/30">xAI · Closed Weights / Open Weights (Early versions)</span>
        </div>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Grok stands out in the AI ecosystem due to its direct integration with X (Twitter), allowing it to access real-time streams of global conversations, news, and events. Built by Elon Musk's xAI, Grok is positioned as an "anti-woke" or less censored alternative to other major models, often featuring a "Fun Mode" that allows for more edgy or humorous responses. While early versions like Grok-1 were open-sourced, frontier models like Grok-2 and Grok-3 are accessed primarily via X Premium or the xAI console.
        </p>
      </section>

      <section id="lineup" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Model Lineup</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Model</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Best For</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Access</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Grok-3 / Grok-2</td><td className="px-4 py-2.5 border-b border-gray-900">Frontier intelligence, real-time social data, reasoning</td><td className="px-4 py-2.5 border-b border-gray-900">Hosted API / X Premium</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Grok-2 mini</td><td className="px-4 py-2.5 border-b border-gray-900">Fast, cost-efficient chat and general assistance</td><td className="px-4 py-2.5 border-b border-gray-900">Hosted API</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Grok-1.5V</td><td className="px-4 py-2.5 border-b border-gray-900">Multimodal vision tasks (reading diagrams, documents)</td><td className="px-4 py-2.5 border-b border-gray-900">Hosted API</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Grok-1 (314B)</td><td className="px-4 py-2.5 border-b border-gray-900">Self-hosted research and massive MoE exploration</td><td className="px-4 py-2.5 border-b border-gray-900">Open Weights</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="architecture" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Architecture Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🐦', title: 'Real-Time X Integration', desc: 'Unique access to the X firehose gives Grok an unparalleled understanding of breaking news and live cultural trends.' },
            { icon: '🎭', title: 'Unfiltered Personality', desc: 'Designed to answer "spicy" questions that other models might refuse, featuring a toggleable "Fun Mode" for sarcasm and humor.' },
            { icon: '🧩', title: 'Massive MoE Roots', desc: 'Grok-1 was released as a 314-billion parameter Mixture-of-Experts model, one of the largest open-source models ever dropped.' },
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
            <h3 className="text-lg font-bold text-emerald-400 mb-2">How It's Trained (Colossus & Live X Data)</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Grok is pre-trained on xAI's custom tech stack, utilizing massive GPU clusters (such as "Colossus," which features 100,000+ Nvidia H100 GPUs). Beyond standard web scraping, Grok's primary training advantage is its heavy fine-tuning on real-time data streams directly from X (formerly Twitter). This continuous training loop allows it to rapidly incorporate breaking news, cultural shifts, and live social sentiment into its weights much faster than traditional model training cycles.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">What Makes It Unique</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong>Real-Time Social Knowledge and "Fun Mode":</strong> Grok's definitive differentiator is its native integration with the X firehose, allowing it to instantly search and synthesize live tweets. Additionally, xAI has deliberately aligned Grok to be "anti-woke" or less heavily filtered than competitors, featuring a specific "Fun Mode" that allows the model to respond with sarcasm, edgy humor, and a distinctly rebellious personality.
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
              <li>Immediate, real-time knowledge of world events via X data.</li>
              <li>Willingness to tackle controversial or edgy topics without excessive guardrails.</li>
              <li>Strong coding and reasoning capabilities in Grok-2 and newer models.</li>
              <li>Integrated image generation (via Flux integration on X).</li>
            </ul>
          </div>
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>API ecosystem and developer tooling are less mature than OpenAI/Anthropic.</li>
              <li>Frontier models are closed-weight and tied heavily to the X ecosystem.</li>
              <li>Real-time social data can occasionally introduce hallucinations or unverified rumors.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="use-cases" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Ideal Use Cases</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {['Monitoring breaking news and social trends', 'Generating less-restricted or humorous content', 'Integrated workflow for heavy X (Twitter) users'].map((u, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-300 text-center">{u}</motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

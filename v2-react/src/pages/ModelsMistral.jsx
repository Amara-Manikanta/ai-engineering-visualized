import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function ModelsMistral() {
  const toc = [
    { label: 'Overview', hash: 'overview' },
    { label: 'Model Lineup', hash: 'lineup' },
    { label: 'Architecture', hash: 'architecture' },
    { label: 'Training & Uniqueness', hash: 'training' },
    { label: 'Strengths & Weaknesses', hash: 'strengths' },
    { label: 'Ideal Use Cases', hash: 'use-cases' },
  ];

  return (
    <GuideLayout title="Mistral (Mistral AI)" intro="A lean, efficiency-obsessed European lab shipping some of the best quality-per-parameter models available, both open and hosted." toc={toc}>
      <section id="overview" className="mb-14 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🌬️</span>
          <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/30">Mistral AI · Open + Closed</span>
        </div>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Mistral's defining trait is efficiency: small dense and Mixture-of-Experts models (like Mixtral) that punch
          above their parameter count. It ships both freely downloadable open-weight models and a hosted API, giving
          teams a middle path between "fully open" Llama and "fully closed" GPT/Claude.
        </p>
      </section>

      <section id="lineup" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Model Lineup</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Tier</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Best For</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Access</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Large</td><td className="px-4 py-2.5 border-b border-gray-900">Enterprise reasoning & coding</td><td className="px-4 py-2.5 border-b border-gray-900">Hosted API</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Mixtral (8x7B / 8x22B)</td><td className="px-4 py-2.5 border-b border-gray-900">Cost-efficient general use</td><td className="px-4 py-2.5 border-b border-gray-900">Open weights</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Small (7B)</td><td className="px-4 py-2.5 border-b border-gray-900">Edge & on-device inference</td><td className="px-4 py-2.5 border-b border-gray-900">Open weights</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="architecture" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Architecture Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '⚡', title: 'Sparse Mixture-of-Experts', desc: 'Mixtral routes each token to 2 of 8 experts, matching much larger dense models while running noticeably cheaper.' },
            { icon: '📏', title: 'Sliding Window Attention', desc: 'Early Mistral models pioneered efficient attention windows that keep long-context inference fast on modest hardware.' },
            { icon: '🌍', title: 'Dual Distribution', desc: 'Ships both open-weight checkpoints and a hosted La Plateforme API — pick self-hosted or managed per use case.' },
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
            <h3 className="text-lg font-bold text-emerald-400 mb-2">How It's Trained (Lean Training & Data Quality)</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Mistral AI is famous for its "lean training" philosophy. Rather than simply brute-forcing model size, they focus obsessively on <strong>curating ultra-high-quality training datasets</strong>. This allows them to train much smaller models (like the original 7B) that outperform models 5x their size. They also heavily utilize custom architectural tricks during training, such as Sliding Window Attention, to allow the model to handle larger context windows without memory exploding.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">What Makes It Unique</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong>Quality-to-Parameter Ratio and EU Sovereignty:</strong> Mistral's primary differentiator is efficiency. Their open-weight Mixtral models popularized the Mixture-of-Experts (MoE) architecture for the open-source community, proving you can get GPT-3.5/GPT-4 level performance running locally on consumer hardware. Additionally, as a French company, Mistral is the European champion of AI, offering strong data privacy guarantees and EU-hosted endpoints (La Plateforme) that appeal heavily to GDPR-sensitive enterprises.
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
              <li>Excellent quality-per-parameter — cheap to run relative to output quality.</li>
              <li>Flexibility to self-host or use a managed API depending on the model.</li>
              <li>EU-based hosting option, useful for GDPR-sensitive workloads.</li>
              <li>Fast inference, especially on the MoE tiers.</li>
            </ul>
          </div>
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>Smaller model catalog and community than Llama or Qwen.</li>
              <li>Frontier "Large" tier still trails GPT/Claude/Gemini on the hardest tasks.</li>
              <li>Smaller ecosystem of pre-built agent integrations.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="use-cases" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Ideal Use Cases</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {['Cost-sensitive production workloads', 'EU-hosted / data-residency requirements', 'Fast small-model deployments at the edge'].map((u, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-300 text-center">{u}</motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

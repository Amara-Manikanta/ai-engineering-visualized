import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function ModelsGpt() {
  const toc = [
    { label: 'Overview', hash: 'overview' },
    { label: 'Model Lineup', hash: 'lineup' },
    { label: 'Architecture', hash: 'architecture' },
    { label: 'Training & Uniqueness', hash: 'training' },
    { label: 'Strengths & Weaknesses', hash: 'strengths' },
    { label: 'Ideal Use Cases', hash: 'use-cases' },
  ];

  return (
    <GuideLayout title="GPT (OpenAI)" intro="The model family that popularized the chat-assistant interface and the modern function-calling / tool-use pattern." toc={toc}>
      <section id="overview" className="mb-14 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🌀</span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30">OpenAI · Closed Weights</span>
        </div>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          GPT (Generative Pre-trained Transformer) is OpenAI's flagship line. It's the model that put LLMs on the map via
          ChatGPT, and it now anchors the widest third-party integration ecosystem of any provider — most agent
          frameworks, IDE plugins, and SaaS "AI features" were built against the GPT API first.
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
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Tradeoff</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Flagship (e.g. GPT-5)</td><td className="px-4 py-2.5 border-b border-gray-900">Complex reasoning, agentic tool use, coding</td><td className="px-4 py-2.5 border-b border-gray-900">Highest cost & latency</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Mini / Small</td><td className="px-4 py-2.5 border-b border-gray-900">High-volume chat, summarization</td><td className="px-4 py-2.5 border-b border-gray-900">Weaker multi-step reasoning</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Nano / Turbo</td><td className="px-4 py-2.5 border-b border-gray-900">Classification, extraction, latency-critical</td><td className="px-4 py-2.5 border-b border-gray-900">Limited reasoning depth</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Reasoning (o-series)</td><td className="px-4 py-2.5 border-b border-gray-900">Math, science, deep chain-of-thought</td><td className="px-4 py-2.5 border-b border-gray-900">Slower, thinks before answering</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="architecture" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Architecture Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🧩', title: 'Mixture-of-Experts', desc: 'Flagship tiers route each token through a subset of specialized expert networks, cutting inference cost versus a dense model of equal quality.' },
            { icon: '🛠️', title: 'Native Function Calling', desc: 'Structured JSON tool schemas were standardized here first — most agent SDKs still model their tool-call format on this API.' },
            { icon: '🖼️', title: 'Multimodal Input', desc: 'Accepts text, images, and audio in a single context; output can include generated images and voice.' },
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
            <h3 className="text-lg font-bold text-emerald-400 mb-2">How It's Trained (RLHF & Test-Time Compute)</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              OpenAI pioneered the widespread use of <strong>RLHF (Reinforcement Learning from Human Feedback)</strong> using PPO (Proximal Policy Optimization) to align base models with human intent, which led to the massive success of ChatGPT. For the newer <code>o1</code> and <code>o3</code> reasoning models, OpenAI uses massive Reinforcement Learning to teach the model how to "think" via internal Chain-of-Thought before it outputs a single token, dynamically allocating more "test-time compute" to harder problems.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">What Makes It Unique</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong>The Enterprise Standard and System 2 Reasoning:</strong> OpenAI's API ecosystem is the gold standard that every other provider mimics. Currently, their primary differentiator is leading the industry transition from fast "System 1" generation (GPT-4o) to deliberate "System 2" reasoning (o1/o3), paired with the most mature ecosystem for tool calling, structured outputs, and real-time voice APIs.
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
              <li>Largest third-party ecosystem — most frameworks default to this API shape.</li>
              <li>Strong general-purpose reasoning across coding, writing, and analysis.</li>
              <li>Mature multimodal support (vision, voice, image generation).</li>
              <li>Extensive fine-tuning and Assistants/Agents tooling.</li>
            </ul>
          </div>
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>Closed weights — no self-hosting or on-prem deployment.</li>
              <li>Pricing and rate limits are entirely vendor-controlled.</li>
              <li>Frontier tier is expensive for high-volume production use.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="use-cases" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Ideal Use Cases</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {['General-purpose chat products', 'Multimodal apps (vision + voice)', 'Teams already on the OpenAI SDK ecosystem'].map((u, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-300 text-center">{u}</motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

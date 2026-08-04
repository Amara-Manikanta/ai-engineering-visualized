import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function ModelsGemini() {
  const toc = [
    { label: 'Overview', hash: 'overview' },
    { label: 'Model Lineup', hash: 'lineup' },
    { label: 'Architecture', hash: 'architecture' },
    { label: 'Training & Uniqueness', hash: 'training' },
    { label: 'Strengths & Weaknesses', hash: 'strengths' },
    { label: 'Ideal Use Cases', hash: 'use-cases' },
  ];

  return (
    <GuideLayout title="Gemini (Google DeepMind)" intro="Built natively multimodal from the ground up, with the largest production context windows of any frontier model." toc={toc}>
      <section id="overview" className="mb-14 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">♊</span>
          <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-bold border border-blue-500/30">Google DeepMind · Closed Weights</span>
        </div>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Unlike models that bolt vision onto a text-trained network, Gemini was trained jointly on text, images,
          audio, and video from the start. Combined with context windows that scale into the millions of tokens, it's
          the model of choice when the input itself is huge or multimodal — an hour of video, a full monorepo, or a
          stack of PDFs in one call.
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
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Pro</td><td className="px-4 py-2.5 border-b border-gray-900">Deep reasoning, huge-context analysis</td><td className="px-4 py-2.5 border-b border-gray-900">Higher cost per token</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Flash</td><td className="px-4 py-2.5 border-b border-gray-900">Low-latency, high-volume production</td><td className="px-4 py-2.5 border-b border-gray-900">Less depth on hard reasoning</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Flash-Lite / Nano</td><td className="px-4 py-2.5 border-b border-gray-900">On-device & edge inference</td><td className="px-4 py-2.5 border-b border-gray-900">Smallest capability ceiling</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="architecture" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Architecture Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🎞️', title: 'Native Multimodality', desc: 'Text, images, audio, and video share a single trained representation — no separate vision adapter bolted on afterward.' },
            { icon: '📚', title: 'Massive Context Window', desc: 'Scales into the millions of tokens, enough to fit entire codebases, hour-long videos, or hundreds of documents in one prompt.' },
            { icon: '🔗', title: 'Google Ecosystem Integration', desc: 'First-class hooks into Search, Workspace, and Cloud — retrieval-augmented answers can pull live grounded data.' },
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
            <h3 className="text-lg font-bold text-emerald-400 mb-2">How It's Trained (Native Multimodality)</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Unlike early multimodal models that stitched together separate vision and text models post-training, Gemini was designed from the ground up to be <strong>natively multimodal</strong>. During pre-training, Gemini is jointly trained across text, images, audio, and video simultaneously. This allows it to understand deeply interleaved modalities—like reading a math problem from a photo and listening to a student's audio recording at the same time—without relying on lossy speech-to-text or image-to-text converters.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">What Makes It Unique</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong>Massive Context and Native Video/Audio:</strong> Gemini's primary differentiator is its <strong>2M+ token context window</strong> (enabled by Ring Attention variations). You can drop an entire 1-hour video or a 1,500-page PDF into Gemini 1.5 Pro and it will parse the raw visual and audio frames directly. It dominates use cases requiring "needle-in-a-haystack" retrieval across massive, unstructured document and media libraries.
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
              <li>Largest usable context window of any mainstream frontier model.</li>
              <li>Genuinely native video and audio understanding, not just image captioning.</li>
              <li>Flash tier is very fast and cheap for its capability level.</li>
              <li>Deep, grounded integration with live Google Search results.</li>
            </ul>
          </div>
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>Closed weights — API-only, no self-hosting.</li>
              <li>Very long contexts can still suffer "lost in the middle" recall issues.</li>
              <li>Smaller third-party agent-framework ecosystem than GPT.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="use-cases" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Ideal Use Cases</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {['Video/audio understanding pipelines', 'Whole-codebase or whole-document-set analysis', 'Products already on Google Cloud / Workspace'].map((u, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-300 text-center">{u}</motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

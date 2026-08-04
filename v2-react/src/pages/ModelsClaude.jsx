import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GuideLayout from '../components/GuideLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function ModelsClaude() {
  const toc = [
    { label: 'Overview', hash: 'overview' },
    { label: 'How Claude Is Trained', hash: 'training' },
    { label: 'Model Lineup', hash: 'lineup' },
    { label: 'Architecture', hash: 'architecture' },
    { label: 'Strengths & Weaknesses', hash: 'strengths' },
    { label: 'Ideal Use Cases', hash: 'use-cases' },
  ];

  return (
    <GuideLayout title="Claude (Anthropic)" intro="The model line built around Constitutional AI — training a model to critique and revise its own outputs against a written set of principles." toc={toc}>
      <section id="overview" className="mb-14 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🧠</span>
          <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs font-bold border border-orange-500/30">Anthropic · Closed Weights</span>
        </div>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Claude is Anthropic's flagship model line, built by the team that co-authored the original InstructGPT/RLHF
          research at OpenAI before founding Anthropic to focus explicitly on AI safety. That focus shows up directly
          in training method (Constitutional AI, below) and in product behavior — long-context reasoning, careful tool
          use, and being purpose-built for agentic coding workflows like Claude Code.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Looking for Claude Code (the CLI coding assistant) instead of the underlying model? See <Link to="/claude" className="text-indigo-300 underline">Claude Code Features</Link>.
        </p>
      </section>

      <section id="training" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">How Claude Is Trained</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl mb-6">
          Claude follows pretrain → SFT → alignment like the rest of the field. Its alignment stage is where it
          diverges: instead of relying purely on large volumes of human-ranked comparisons, Anthropic pioneered
          <strong className="text-white"> Constitutional AI (CAI)</strong> — teaching the model to police itself against a written
          set of principles.
        </p>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Constitutional AI Loop</h3>
          <div className="flex flex-col items-center gap-3">
            <div className="px-4 py-2 bg-black/40 border border-gray-700 rounded-lg text-gray-300 text-sm font-mono">SFT Model generates a response</div>
            <div className="text-gray-500">↓</div>
            <motion.div
              animate={{ boxShadow: ['0 0 0px rgba(251,146,60,0)', '0 0 16px rgba(251,146,60,0.4)', '0 0 0px rgba(251,146,60,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="px-4 py-2 bg-orange-900/20 border border-orange-500/40 rounded-lg text-orange-300 text-sm font-bold"
            >
              📜 Model critiques its own response against the "constitution"
            </motion.div>
            <div className="text-gray-500">↓</div>
            <div className="px-4 py-2 bg-black/40 border border-gray-700 rounded-lg text-gray-300 text-sm font-mono">Model revises its own response to better fit the principles</div>
            <div className="text-gray-500">↓ repeat, then fine-tune on the revised examples (SL-CAI) ↓</div>
            <div className="px-4 py-2 bg-emerald-900/20 border border-emerald-500/40 rounded-lg text-emerald-300 text-sm font-bold">AI-generated preference data trains a reward model → RLAIF (RL from AI Feedback)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-orange-900/10 border border-orange-500/20 rounded-xl p-5">
            <h3 className="text-orange-400 font-semibold mb-2 text-sm">📜 The "Constitution"</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              A written set of principles (drawing on sources like human rights frameworks and platform guidelines)
              instructing the model to prefer responses that are more helpful, honest, and harmless. Humans write the
              constitution once; the model applies it to itself at scale.
            </p>
          </div>
          <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-5">
            <h3 className="text-emerald-400 font-semibold mb-2 text-sm">🤖 RLAIF vs RLHF</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Classic RLHF needs humans to rank huge numbers of response pairs. RLAIF has the model itself (guided by
              the constitution) generate much of that preference data instead — humans define the values once, AI
              feedback scales the labeling.
            </p>
          </div>
        </div>

        <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-6">
          <h3 className="text-indigo-400 font-semibold mb-3">🔑 The Key Differentiator: Self-Critique Instead of Human-Only Judging</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Where standard RLHF makes "what's a good response?" entirely a matter of what human raters happen to
            prefer in the moment, Constitutional AI makes the underlying values <strong className="text-gray-100">explicit and
            written down</strong> — and has the model reason about and apply those values to its own outputs before any
            reinforcement learning happens. This is also what Claude's "harmlessness" tuning is built on: the model
            learns to recognize and revise problematic outputs itself, rather than only being told after the fact by a
            human rater which of two responses was worse.
          </p>
        </div>
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
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Opus</td><td className="px-4 py-2.5 border-b border-gray-900">Deepest reasoning, hardest agentic/coding tasks</td><td className="px-4 py-2.5 border-b border-gray-900">Highest cost & latency</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Sonnet</td><td className="px-4 py-2.5 border-b border-gray-900">Balanced default for most production workloads</td><td className="px-4 py-2.5 border-b border-gray-900">Less headroom than Opus on the hardest tasks</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Haiku</td><td className="px-4 py-2.5 border-b border-gray-900">High-volume, latency-sensitive, classification</td><td className="px-4 py-2.5 border-b border-gray-900">Weaker multi-step reasoning</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="architecture" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Architecture Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📚', title: 'Long-Context Reasoning', desc: 'Context windows large enough to hold entire codebases or document sets, with strong recall across the whole window rather than just the ends.' },
            { icon: '🛠️', title: 'Agentic Tool Use', desc: 'Purpose-tuned for long tool-use chains — reading files, running commands, calling APIs across many sequential steps without losing the thread.' },
            { icon: '🖥️', title: 'Computer Use', desc: 'Can perceive a screen and control a mouse/keyboard directly, extending tool use beyond APIs to any GUI application.' },
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
              <li>Leading agentic coding performance — long tool-use chains, large codebases.</li>
              <li>Careful, well-calibrated behavior on sensitive or ambiguous requests.</li>
              <li>Strong long-document and long-context recall.</li>
              <li>Purpose-built developer tooling (Claude Code, Agent SDK).</li>
            </ul>
          </div>
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>Closed weights — no self-hosting or on-prem deployment.</li>
              <li>Smaller multimodal generation surface than GPT (no native image generation).</li>
              <li>Frontier tier pricing is a real cost factor at high volume.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="use-cases" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Ideal Use Cases</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {['Agentic coding assistants', 'Long-document analysis & summarization', 'Safety-sensitive customer-facing products'].map((u, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-300 text-center">{u}</motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

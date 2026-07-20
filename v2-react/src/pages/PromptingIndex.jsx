import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function PromptingIndex() {
  const toc = [
    { label: 'Prompt Engineering', hash: '#prompt-engineering' },
    { label: 'Techniques', hash: '#techniques' },
    { label: 'Best Practices', hash: '#best-practices' }
  ];

  return (
    <GuideLayout
      title="Prompt Engineering"
      intro="The Art of Talking to AI."
      toc={toc}
    >
      <section id="prompt-engineering" className="mb-12">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-400 uppercase bg-pink-500/10 rounded-full border border-pink-500/20">
            Prompt Engineering
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-4">✍️ The Art of Talking to AI</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Prompt engineering is the skill of designing inputs to get the best outputs from LLMs. A better prompt = dramatically better results — no training required.
          </p>
        </div>

        <div id="techniques" className="grid grid-cols-1 gap-8 mb-12">
          {/* 1. Zero-Shot */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2"><span className="text-gray-500 mr-2">01</span>Zero-Shot Prompting</h3>
            <p className="text-gray-400 mb-4">Directly instruct the model with no examples. Relies entirely on the model's pre-trained knowledge.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                <div className="text-red-400 font-bold mb-2">❌ Weak</div>
                <div className="font-mono text-sm text-gray-300">"Translate this."</div>
              </div>
              <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
                <div className="text-green-400 font-bold mb-2">✅ Strong</div>
                <div className="font-mono text-sm text-gray-300">"Translate the following English text to French. Preserve the formal tone.\n\nText: 'The meeting has been rescheduled.'"</div>
              </div>
            </div>
          </motion.div>

          {/* 2. Few-Shot */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2"><span className="text-gray-500 mr-2">02</span>Few-Shot Prompting</h3>
            <p className="text-gray-400 mb-4">Provide 2-5 input→output examples before your actual question. The model learns the pattern from your examples.</p>
            <div className="p-4 bg-black/40 rounded-xl font-mono text-sm text-gray-300 border border-gray-700 space-y-2">
              <div><span className="text-gray-500">Example 1:</span> Sentiment("I love it!") → Positive</div>
              <div><span className="text-gray-500">Example 2:</span> Sentiment("Terrible service") → Negative</div>
              <div className="text-blue-300"><span className="text-gray-500">Query:</span> Sentiment("It was okay, I guess") → ?</div>
            </div>
          </motion.div>

          {/* 3. Chain of Thought */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2"><span className="text-gray-500 mr-2">03</span>Chain-of-Thought (CoT)</h3>
            <p className="text-gray-400 mb-4">Ask the model to reason step-by-step before giving the final answer. Dramatically improves accuracy on complex tasks.</p>
            <div className="flex flex-col items-center gap-2 p-4 bg-black/40 rounded-xl border border-gray-700">
              <div className="px-3 py-1 bg-gray-800 rounded text-sm text-gray-300">🤔 Think step by step...</div>
              <div className="text-gray-600">↓</div>
              <div className="px-3 py-1 bg-gray-800 rounded text-sm text-gray-300">📝 Step 1: Identify known values</div>
              <div className="text-gray-600">↓</div>
              <div className="px-3 py-1 bg-green-900/50 border border-green-700 text-green-300 rounded text-sm font-bold">✅ Final Answer</div>
            </div>
          </motion.div>
        </div>

        <div id="best-practices" className="p-8 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">⚡ Golden Rules of Prompt Engineering</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="p-3 bg-green-500/10 text-green-400 rounded-lg text-sm">✅ Be specific and unambiguous</div>
              <div className="p-3 bg-green-500/10 text-green-400 rounded-lg text-sm">✅ Give context and background</div>
              <div className="p-3 bg-green-500/10 text-green-400 rounded-lg text-sm">✅ Specify output format</div>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-red-500/10 text-red-400 rounded-lg text-sm">❌ Assume the model knows context</div>
              <div className="p-3 bg-red-500/10 text-red-400 rounded-lg text-sm">❌ Use vague instructions</div>
              <div className="p-3 bg-red-500/10 text-red-400 rounded-lg text-sm">❌ Ask too many things at once</div>
            </div>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

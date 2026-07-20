import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function LlmLcm() {
  const toc = [
    { label: "How it Works", hash: "how-it-works" },
  ];

  return (
    <GuideLayout
      title="Large Concept Model (LCM)"
      intro="Models that operate on abstract concepts rather than individual tokens."
      toc={toc}
    >
      <motion.section 
        id="how-it-works"
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">How it Works</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Unlike LLMs that predict word-by-word, LCMs embed entire sentences or concepts into a latent space (e.g. SONAR embeddings) and use diffusion processes to generate outputs. This makes them inherently language-agnostic, capable of reasoning purely in concepts.
        </p>
        <motion.div 
          className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-medium text-white mb-2">Example</h3>
          <p className="text-gray-400">
            <strong className="text-indigo-400">Meta LCM:</strong> Translating a complex idea directly from English to Swahili without needing token-level alignment.
          </p>
        </motion.div>
      </motion.section>
    </GuideLayout>
  );
}

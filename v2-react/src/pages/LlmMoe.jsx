import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function LlmMoe() {
  const toc = [
    { label: "How it Works", hash: "how-it-works" },
  ];

  return (
    <GuideLayout
      title="Mixture of Experts (MoE)"
      intro="A sparse architecture that routes tokens to specific expert sub-networks."
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
          Instead of passing data through every single parameter (dense), an MoE uses a Router mechanism to send a token to only 2 or 3 "Experts" out of many. This allows the model to have massive total parameters (e.g., 8x7B = 47B total) but only use a small fraction (e.g., 14B) during inference, making it highly efficient.
        </p>
        <motion.div 
          className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-medium text-white mb-2">Example</h3>
          <p className="text-gray-400">
            <strong className="text-indigo-400">Mixtral 8x7B:</strong> A very popular open-source model that outperforms Llama 2 70B while running much faster.
          </p>
        </motion.div>
      </motion.section>
    </GuideLayout>
  );
}

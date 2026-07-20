import React from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function LlmType() {
  const toc = [
    { label: "How it Works", hash: "#how-it-works" },
    { label: "Example", hash: "#example" }
  ];

  return (
    <GuideLayout
      title="Large Language Model (LLM)"
      intro="Massive neural networks trained to understand and generate human-like text."
      toc={toc}
    >
      <div className="space-y-12 mt-8">
        <motion.section
          id="how-it-works"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl font-semibold text-white m-0">How it Works</h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <p className="text-gray-300 leading-relaxed text-lg">
              LLMs are typically decoder-only Transformer models with tens to hundreds of billions of parameters. They are trained via next-token prediction on massive internet-scale datasets.
            </p>
          </div>
        </motion.section>

        <motion.section
          id="example"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌟</span>
            <h2 className="text-2xl font-semibold text-white m-0">Example</h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]"
          >
            <h3 className="text-xl font-bold text-white mb-2">GPT-4</h3>
            <p className="text-gray-300">
              Used for advanced reasoning, coding, and complex text generation.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

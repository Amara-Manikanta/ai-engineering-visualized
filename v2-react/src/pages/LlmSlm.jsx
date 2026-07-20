import React from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function LlmSlm() {
  const toc = [
    { label: "How it Works", hash: "#how-it-works" },
    { label: "Example", hash: "#example" }
  ];

  return (
    <GuideLayout
      title="Small Language Model (SLM)"
      intro="Highly optimized models designed to run locally on consumer hardware."
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
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl font-semibold text-white m-0">How it Works</h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <p className="text-gray-300 leading-relaxed text-lg">
              SLMs (usually under 10B parameters) trade massive world knowledge for efficiency. They rely heavily on extremely high-quality training data (like textbook data) to punch above their weight class.
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
            <span className="text-3xl">📱</span>
            <h2 className="text-2xl font-semibold text-white m-0">Example</h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.2)]"
          >
            <h3 className="text-xl font-bold text-white mb-2">Microsoft Phi-3</h3>
            <p className="text-gray-300">
              A tiny model that can run locally on a smartphone but rivals older large models in coding and reasoning tasks.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

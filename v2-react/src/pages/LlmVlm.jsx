import React from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function LlmVlm() {
  const toc = [
    { label: "How it Works", hash: "#how-it-works" },
    { label: "Example", hash: "#example" }
  ];

  return (
    <GuideLayout
      title="Vision Language Model (VLM)"
      intro="Multimodal models that inherently understand both text and images."
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
            <span className="text-3xl">👁️</span>
            <h2 className="text-2xl font-semibold text-white m-0">How it Works</h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <p className="text-gray-300 leading-relaxed text-lg">
              VLMs typically fuse a Vision Encoder (like ViT) with a Language Model. The vision encoder breaks an image into patches, turns them into embeddings, and projects them into the same space as the text tokens so the LLM can "read" the image.
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
            <span className="text-3xl">🖼️</span>
            <h2 className="text-2xl font-semibold text-white m-0">Example</h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500/20 to-teal-600/20 border border-green-500/30 rounded-xl p-6 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.2)]"
          >
            <h3 className="text-xl font-bold text-white mb-2">GPT-4o</h3>
            <p className="text-gray-300">
              Can natively ingest images, charts, and video frames to answer questions or describe scenes.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

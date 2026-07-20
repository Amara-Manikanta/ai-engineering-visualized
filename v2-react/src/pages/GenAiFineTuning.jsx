import React from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";
import { Link } from "react-router-dom";

export default function GenAiFineTuning() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <GuideLayout
      title="Fine-tuning LLMs"
      intro="Learn about methods like LoRA and QLoRA for efficiently adapting models."
      toc={[]}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <motion.div variants={itemVariants} className="text-6xl mb-6">🚧</motion.div>
        <motion.div variants={itemVariants} className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 font-semibold text-sm mb-4">
          Generative AI
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
          Fine-tuning LLMs
        </motion.h2>
        <motion.p variants={itemVariants} className="text-gray-400 max-w-md mx-auto mb-8">
          This section is under construction. Comprehensive content and interactive visualizations are coming soon!
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </GuideLayout>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function LlmLam() {
  const toc = [
    { label: "How it Works", hash: "how-it-works" },
  ];

  return (
    <GuideLayout
      title="Large Action Model (LAM)"
      intro="Models built specifically to take actions across software interfaces."
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
          LAMs translate natural language into actionable sequences, such as API calls, web browsing interactions, or UI clicks. They are trained on demonstrations of users navigating interfaces.
        </p>
        <motion.div 
          className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-medium text-white mb-2">Example</h3>
          <p className="text-gray-400">
            <strong className="text-indigo-400">Claude Computer Use:</strong> Giving the model the ability to move a mouse, type on a keyboard, and visually parse a desktop screen to automate tasks.
          </p>
        </motion.div>
      </motion.section>
    </GuideLayout>
  );
}

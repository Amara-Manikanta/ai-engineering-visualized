import React from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function MlLinear() {
  return (
    <GuideLayout
      title="Linear Regression"
      intro="Finding the best-fit straight line through a set of data points to predict a continuous variable."
      toc={[]}
    >
      <section className="guide-section text-center p-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold mb-2">Interactive Animations Coming Soon</h2>
          <p className="text-gray-400">This section is under construction.</p>
        </motion.div>
      </section>
    </GuideLayout>
  );
}

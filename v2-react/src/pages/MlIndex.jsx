import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const toc = [
  { label: 'Key Python Libraries', hash: '#key-python-libraries' },
  { label: 'Supervised vs Unsupervised Learning', hash: '#supervised-vs-unsupervised-learning' },
  { label: 'Typical ML Workflow', hash: '#typical-ml-workflow' },
  { label: 'Common Challenges', hash: '#common-challenges' },
];

export default function MlIndex() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <GuideLayout title="Introduction to Machine Learning" intro="The foundation of modern AI. Learn the key concepts, libraries, workflows, and challenges in ML." toc={toc}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
        
        <motion.section variants={itemVariants} id="key-python-libraries">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Key Python Libraries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "NumPy", desc: "The fundamental package for scientific computing with Python. Provides support for large, multi-dimensional arrays and matrices." },
              { title: "Pandas", desc: "Provides high-performance, easy-to-use data structures (DataFrames) and data analysis tools." },
              { title: "Scikit-learn", desc: "Simple and efficient tools for predictive data analysis. Features various classification, regression, and clustering algorithms." },
              { title: "Matplotlib & SciPy", desc: "Matplotlib is for plotting and visualization, while SciPy provides algorithms for optimization, integration, and statistics." }
            ].map((lib, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-white">{lib.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{lib.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} id="supervised-vs-unsupervised-learning">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Supervised vs Unsupervised Learning</h2>
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-indigo-500/15 text-white">
                  <th className="p-4 border-b border-white/10">Feature</th>
                  <th className="p-4 border-b border-white/10">Supervised Learning</th>
                  <th className="p-4 border-b border-white/10">Unsupervised Learning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="p-4 font-bold text-gray-200">Data</td>
                  <td className="p-4 text-gray-400">Requires labeled data</td>
                  <td className="p-4 text-gray-400">No labels required</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-200">Goal</td>
                  <td className="p-4 text-gray-400">Predict outputs</td>
                  <td className="p-4 text-gray-400">Discover hidden patterns</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-200">Methods</td>
                  <td className="p-4 text-gray-400">Classification, Regression</td>
                  <td className="p-4 text-gray-400">Clustering, Dimensionality Reduction</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-200">Applications</td>
                  <td className="p-4 text-gray-400">Spam detection, trend prediction</td>
                  <td className="p-4 text-gray-400">Market basket analysis, anomaly detection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} id="typical-ml-workflow">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Typical ML Workflow</h2>
          <ul className="space-y-3 text-gray-300">
            {[
              "1. Data Collection: Gather relevant and clean data from various sources.",
              "2. Preprocessing: Handle missing values, encode variables, normalize/scale features.",
              "3. Feature Engineering: Identify important attributes, create new features.",
              "4. Model Selection: Choose algorithm (regression, classification, clustering).",
              "5. Model Training: Fit the model to the training data.",
              "6. Evaluation: Assess performance using validation strategies and metrics.",
              "7. Hyperparameter Tuning: Adjust parameters for better generalization.",
              "8. Deployment: Integrate into production systems."
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} id="common-challenges">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Common Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Overfitting", desc: "Model performs exceptionally well on training data but poorly on unseen test data because it memorized noise." },
              { title: "Underfitting", desc: "Model is too simple to capture the underlying patterns in the data." },
              { title: "Data Leakage", desc: "When information from outside the training dataset is accidentally used to create the model." },
              { title: "Imbalanced Data", desc: "Unequal class distribution (e.g. 99% non-fraud, 1% fraud) severely skewing classification performance." }
            ].map((challenge, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-red-400/50 transition-all">
                <h3 className="text-xl font-semibold mb-3 text-red-400">{challenge.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{challenge.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </motion.div>
    </GuideLayout>
  );
}

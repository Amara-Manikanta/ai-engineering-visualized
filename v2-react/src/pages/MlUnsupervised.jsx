import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const toc = [
  { label: 'Primary Types', hash: '#primary-types' },
  { label: 'Common Applications', hash: '#common-applications' }
];

export default function MlUnsupervised() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <GuideLayout title="Unsupervised Learning" intro="Models trained on unlabeled data, designed to infer natural structure and hidden patterns within the data." toc={toc}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
        
        <motion.section variants={itemVariants} id="primary-types">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Primary Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-white">Clustering</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Groups similar objects together based on their features without any prior labels.</p>
              <div className="text-sm text-gray-400">
                <strong className="text-gray-300">Algorithms:</strong>
                <ul className="mt-2 ml-5 list-disc marker:text-indigo-500 space-y-1">
                  <li>k-Means</li>
                  <li>Hierarchical Clustering</li>
                  <li>DBSCAN (Density-Based Spatial Clustering of Applications with Noise)</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-white">Dimensionality Reduction</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Reduces data complexity by decreasing the number of features while retaining the most important information.</p>
              <div className="text-sm text-gray-400">
                <strong className="text-gray-300">Algorithms:</strong>
                <ul className="mt-2 ml-5 list-disc marker:text-indigo-500 space-y-1">
                  <li>PCA (Principal Component Analysis)</li>
                  <li>t-SNE (t-Distributed Stochastic Neighbor Embedding)</li>
                  <li>SVD (Singular Value Decomposition)</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} id="common-applications">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Common Applications</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start">
              <span className="text-indigo-400 mr-3 mt-1">✦</span>
              <div>
                <strong className="text-white block mb-1">Market Basket Analysis:</strong>
                <span className="text-gray-400">Discovering associations between products frequently bought together (e.g., Apriori algorithm).</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-3 mt-1">✦</span>
              <div>
                <strong className="text-white block mb-1">Customer Segmentation:</strong>
                <span className="text-gray-400">Grouping customers based on purchasing behavior for targeted marketing.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-3 mt-1">✦</span>
              <div>
                <strong className="text-white block mb-1">Anomaly / Fraud Detection:</strong>
                <span className="text-gray-400">Identifying unusual data points that don't fit into any standard cluster.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-3 mt-1">✦</span>
              <div>
                <strong className="text-white block mb-1">Data Visualization:</strong>
                <span className="text-gray-400">Using t-SNE or PCA to plot high-dimensional datasets into 2D or 3D space.</span>
              </div>
            </li>
          </ul>
        </motion.section>

      </motion.div>
    </GuideLayout>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function EmbeddingsIndex() {
  const [similarityScore, setSimilarityScore] = useState(null);

  const calculateSimilarity = () => {
    // Fake calculation for demo purposes
    setSimilarityScore(Math.floor(Math.random() * 40) + 60); 
  };

  const toc = [
    { label: 'Vector Embeddings', hash: '#what' },
    { label: 'Measuring Similarity', hash: '#math' },
    { label: 'Interactive Demo', hash: '#interactive' },
    { label: 'Top Models', hash: '#models' }
  ];

  return (
    <GuideLayout
      title="Embeddings Deep Dive"
      intro="Understand Vector Embeddings, similarity metrics, and compare top embedding models."
      toc={toc}
    >
      <section id="what" className="mb-16">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
            Deep Dive
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Vector Embeddings</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Embeddings are how AI models understand the meaning of words. They convert text into high-dimensional arrays of numbers where semantic similarity equals mathematical closeness.
          </p>
        </div>

        <div className="p-12 bg-black/40 border border-white/10 rounded-2xl flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-white mb-8">How meaning becomes math</h2>
          
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="px-6 py-3 bg-gray-800 border border-gray-600 rounded-xl text-xl text-white mb-6">
            "Apple"
          </motion.div>
          <div className="text-gray-500 mb-6 text-xl">↓</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="px-8 py-4 bg-purple-900/30 border border-purple-500/50 rounded-xl text-purple-300 font-bold mb-6">
            Embedding Model
          </motion.div>
          <div className="text-gray-500 mb-6 text-xl">↓</div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} className="px-6 py-3 bg-green-900/30 border border-green-500/50 rounded-xl font-mono text-green-400">
            [0.34, -0.12, 0.88, ... 1536 dims]
          </motion.div>
        </div>
      </section>

      <section id="math" className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">Measuring Similarity</h2>
        <p className="text-gray-400 mb-8">Once text is converted to vectors, we need a mathematical way to determine how "close" two concepts are in multi-dimensional space.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-2">📐 Cosine Similarity</h3>
            <p className="text-sm text-gray-400 mb-4">Measures the angle between two vectors. It ignores magnitude. Industry standard for text embeddings.</p>
            <div className="text-xs font-mono bg-black/50 p-2 rounded text-gray-300">Range: -1 to 1</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-2">📏 Euclidean Distance</h3>
            <p className="text-sm text-gray-400 mb-4">Measures straight-line distance. Highly sensitive to magnitude.</p>
            <div className="text-xs font-mono bg-black/50 p-2 rounded text-gray-300">Range: 0 to ∞</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-2">✖️ Dot Product</h3>
            <p className="text-sm text-gray-400 mb-4">Measures both angle and magnitude. Faster to compute.</p>
            <div className="text-xs font-mono bg-black/50 p-2 rounded text-gray-300">Range: -∞ to ∞</div>
          </div>
        </div>
      </section>

      <section id="interactive" className="mb-16 p-8 bg-[#111] border border-white/10 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Similarity Calculator</h2>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Sentence A</label>
            <textarea className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-gray-200" rows={3} defaultValue="The quick brown fox jumps over the lazy dog." />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Sentence B</label>
            <textarea className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-gray-200" rows={3} defaultValue="A fast auburn canine leaps across a sleepy hound." />
          </div>
        </div>
        <button onClick={calculateSimilarity} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors mb-8">
          Calculate Similarity
        </button>
        {similarityScore && (
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
            <div className="text-4xl font-bold text-white mb-2">{similarityScore}%</div>
            <div className="text-sm text-gray-400 mb-4">Semantic Overlap</div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${similarityScore}%` }} className="h-full bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
          </div>
        )}
      </section>

      <section id="models">
        <h2 className="text-3xl font-bold text-white mb-4">Top Embedding Models</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10 text-gray-300 text-sm">
                <th className="p-4 border-b border-white/10">Provider</th>
                <th className="p-4 border-b border-white/10">Model</th>
                <th className="p-4 border-b border-white/10">Dims</th>
                <th className="p-4 border-b border-white/10">Context</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-400">
              <tr>
                <td className="p-4 border-b border-white/5 text-white font-medium">OpenAI</td>
                <td className="p-4 border-b border-white/5 font-mono">text-embedding-3-large</td>
                <td className="p-4 border-b border-white/5">3072</td>
                <td className="p-4 border-b border-white/5">8191</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-white/5 text-white font-medium">BAAI</td>
                <td className="p-4 border-b border-white/5 font-mono">bge-large-en-v1.5</td>
                <td className="p-4 border-b border-white/5">1024</td>
                <td className="p-4 border-b border-white/5">512</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-medium">Nomic AI</td>
                <td className="p-4 font-mono">nomic-embed-text-v1.5</td>
                <td className="p-4">768</td>
                <td className="p-4">8192</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </GuideLayout>
  );
}

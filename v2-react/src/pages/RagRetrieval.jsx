import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagRetrieval() {
  const [step, setStep] = useState(1);

  const toc = [
    { label: "Retrieval Stage", hash: "retrieval" },
    { label: "Query Embedding & Similarity Search", hash: "similarity-search" },
    { label: "Metadata Filtering", hash: "filtering" },
    { label: "Query Optimization", hash: "query-optimization" },
    { label: "Re-ranking", hash: "reranking" }
  ];

  const steps = [
    {
      title: "User Query",
      desc: "A user types a natural language question. This is the query that will drive the entire retrieval process.",
      icon: "👤"
    },
    {
      title: "Query Encoding",
      desc: "The query is run through the same embedding model used during indexing. This creates a query vector.",
      icon: "🔢"
    },
    {
      title: "Semantic Search",
      desc: "The query vector is compared to all stored chunk vectors using cosine similarity or dot product.",
      icon: "🎯"
    },
    {
      title: "Top-K Relevant Chunks",
      desc: "Milvus returns the top-K most similar chunks (typically K=3 to 10).",
      icon: "📦"
    }
  ];

  return (
    <GuideLayout
      title="Retrieval & Reranking"
      intro="Finding the most relevant context for the LLM."
      toc={toc}
    >
      <div className="space-y-16">
        <section id="retrieval" className="scroll-mt-24">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8 mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Stage 2: Retrieval
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Interactive Retrieval Pipeline</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between py-12">
              {steps.map((s, i) => (
                <div key={i} className="relative flex-1 w-full text-center">
                  <motion.div
                    className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4 border-2 transition-colors cursor-pointer ${
                      step >= i + 1 ? 'border-blue-500 bg-blue-500/20 text-blue-300' : 'border-gray-700 bg-gray-800 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      y: step === i + 1 ? [-5, 5, -5] : 0
                    }}
                    transition={{
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    onClick={() => setStep(i + 1)}
                  >
                    {s.icon}
                  </motion.div>
                  <h3 className={`font-semibold ${step >= i + 1 ? 'text-white' : 'text-gray-500'}`}>
                    {s.title}
                  </h3>
                  
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gray-800 -z-10">
                      <motion.div 
                        className="h-full bg-blue-500"
                        initial={{ width: "0%" }}
                        animate={{ width: step > i + 1 ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-800/80 rounded-xl p-6 border border-gray-700 min-h-[140px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center max-w-2xl"
                >
                  <h4 className="text-xl font-bold text-white mb-2">{steps[step-1].title}</h4>
                  <p className="text-gray-400">{steps[step-1].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button 
                onClick={() => setStep(Math.min(steps.length, step + 1))}
                disabled={step === steps.length}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="similarity-search" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Query Embedding & Similarity Search</h2>
          <p className="text-gray-300 leading-relaxed">
            When a user asks a question, the text is immediately embedded into a query vector using the <em className="text-white">exact same embedding model</em> used during indexing. A Top-K similarity search is performed to return the closest chunks.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="filtering" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Metadata Filtering & Score Thresholds</h2>
          <p className="text-gray-300 leading-relaxed">
            Before executing the vector search, pre-filtering metadata (e.g. <code className="text-blue-300 bg-gray-800 px-1 py-0.5 rounded">department='HR'</code>) drastically improves accuracy and speed. Score thresholds reject chunks that fall below a certain similarity percentage to prevent hallucinating answers from irrelevant data.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="query-optimization" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Query Optimization</h2>
          <p className="text-gray-300 leading-relaxed mb-4">Users ask terrible questions. RAG systems optimize queries before searching:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
            <li><strong className="text-white">Query Rewriting / Expansion:</strong> LLM rewrites the query to add synonyms or fix grammar.</li>
            <li><strong className="text-white">Multi-Query:</strong> LLM generates 5 different variations of the question and searches all of them.</li>
            <li><strong className="text-white">HyDE:</strong> LLM writes a hypothetical "fake" answer to the query, and that fake answer is embedded and searched instead of the short question.</li>
          </ul>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="reranking" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Re-ranking</h2>
          <p className="text-gray-300 leading-relaxed">
            Vector search is fast but mathematically shallow. Re-ranking solves this by taking the top 50 results from the Vector DB and passing them to a <strong className="text-white">Cross-Encoder</strong> (like Cohere Rerank). The Cross-Encoder reads the query and the chunk together and assigns an absolute relevance score, bubbling the true best answers to the Top-3.
          </p>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

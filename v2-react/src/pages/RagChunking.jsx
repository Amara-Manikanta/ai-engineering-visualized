import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagChunking() {
  const [activeTab, setActiveTab] = useState(1);

  const toc = [
    { label: "What is Chunking?", hash: "what-is-chunking" },
    { label: "Basic Chunking Methods", hash: "basic-chunking" },
    { label: "Advanced Chunking Methods", hash: "advanced-chunking" },
    { label: "Best Practices", hash: "best-practices" }
  ];

  const tabs = [
    { id: 1, label: "📁 Fixed-Size" },
    { id: 2, label: "↔️ Sliding Window" },
    { id: 3, label: "🧠 Semantic" },
    { id: 4, label: "🌲 Hierarchical" },
    { id: 5, label: "🔁 Recursive" },
    { id: 6, label: "📄 Doc-Aware" }
  ];

  return (
    <GuideLayout
      title="Chunking Strategies"
      intro="Breaking large documents into optimal semantic pieces."
      toc={toc}
    >
      <section className="px-5">
        <h2 id="what-is-chunking" className="text-2xl font-bold mb-4 text-gray-100">What is Chunking?</h2>
        <p className="mb-6 text-gray-300">
          Embedding models have token limits (e.g. 8192 tokens). Therefore, a 100-page PDF must be split into smaller "chunks". The goal of chunking is to keep related context together without capturing irrelevant noise.
        </p>
        
        <h2 id="basic-chunking" className="text-2xl font-bold mb-4 text-gray-100">Basic Chunking Methods</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2">
          <li><strong className="text-gray-100">Fixed-size:</strong> Splitting text blindly every N characters. (Fast, but breaks sentences).</li>
          <li><strong className="text-gray-100">Recursive Character:</strong> Tries to split on paragraphs, then sentences, then words, only falling back to characters if necessary. (The industry standard baseline).</li>
          <li><strong className="text-gray-100">Token Chunking:</strong> Splitting based on the exact token counts used by the LLM (using tiktoken).</li>
        </ul>

        <h2 id="advanced-chunking" className="text-2xl font-bold mb-4 text-gray-100">Advanced Chunking Methods</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2">
          <li><strong className="text-gray-100">Semantic Chunking:</strong> Uses embeddings during the chunking phase to group sentences that are mathematically similar, breaking the chunk when the topic shifts.</li>
          <li><strong className="text-gray-100">Markdown / Code Chunking:</strong> Uses AST parsers or regex to split code by functions/classes, or markdown by headers (H1, H2), ensuring structural integrity.</li>
          <li><strong className="text-gray-100">Hierarchical / Parent-Child:</strong> Documents are split into large Parent chunks, which are further split into small Child chunks. The small chunks are embedded for precise retrieval, but the LLM is fed the entire Parent chunk for maximum context.</li>
        </ul>

        <h2 id="best-practices" className="text-2xl font-bold mb-4 text-gray-100">Chunk Size & Overlap Best Practices</h2>
        <p className="mb-8 text-gray-300">
          Generally, a chunk size of 512-1024 tokens is optimal. You must include a <strong className="text-gray-100">Chunk Overlap</strong> (e.g. 10-20%) to ensure concepts aren't abruptly cut in half across the boundary of two chunks.
        </p>
      </section>

      <div className="max-w-5xl mx-auto p-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 rounded-lg border font-semibold text-sm flex items-center justify-center transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_4px_14px_rgba(99,102,241,0.4)]'
                  : 'bg-[#111] border-gray-800 text-gray-400 hover:bg-[#222] hover:border-indigo-500 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 1 && (
              <motion.div
                key="tab1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-100">1. Fixed-Size Chunking</h2>
                <p className="mb-6 text-gray-300">
                  Splits documents into equal segments of characters or tokens regardless of word limits, sentence endings, or paragraphs. Simple, fast, but highly disruptive to sentence structure.
                </p>
                
                <div className="h-64 bg-[#111] border border-gray-800 rounded-xl relative overflow-hidden mb-6 flex items-center justify-center">
                  <div className="flex gap-1 text-lg font-bold font-mono text-gray-400">
                    <span>Artifi</span><span className="text-red-500">|</span>
                    <span>cialIn</span><span className="text-red-500">|</span>
                    <span>tellige</span><span className="text-red-500">|</span>
                    <span>nce</span>
                  </div>
                  
                  <motion.div 
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 opacity-0"
                    style={{ left: '31%', backgroundImage: 'repeating-linear-gradient(0deg, red, red 5px, transparent 5px, transparent 10px)' }}
                    animate={{ y: [-50, 0, 0, -50], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
                  />
                  <motion.div 
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 opacity-0"
                    style={{ left: '54%', backgroundImage: 'repeating-linear-gradient(0deg, red, red 5px, transparent 5px, transparent 10px)' }}
                    animate={{ y: [-50, 0, 0, -50], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2, times: [0, 0.3, 0.7, 1] }}
                  />
                  <motion.div 
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 opacity-0"
                    style={{ left: '77%', backgroundImage: 'repeating-linear-gradient(0deg, red, red 5px, transparent 5px, transparent 10px)' }}
                    animate={{ y: [-50, 0, 0, -50], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4, times: [0, 0.3, 0.7, 1] }}
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Python Template</h3>
                <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-gray-300 whitespace-pre">
{`from langchain_text_splitters import CharacterTextSplitter

splitter = CharacterTextSplitter(
    separator="",
    chunk_size=100,
    chunk_overlap=0
)
chunks = splitter.split_text(text)`}</div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Examples</h3>
                <p className="text-gray-300 mb-1"><strong className="text-gray-100">Input:</strong> <code className="bg-gray-800 px-1 rounded text-pink-400">"Artificial Intelligence is transforming our world rapidly."</code></p>
                <p className="text-gray-300 mb-6"><strong className="text-gray-100">Output (chunk_size=12):</strong> <code className="bg-gray-800 px-1 rounded text-pink-400">["Artificial I", "ntelligence ", "is transform", "ing our worl", "d rapidly."]</code></p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-lg">
                    <h4 className="text-emerald-400 font-semibold mb-2 mt-0">Advantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Predictable output chunk sizing.</li>
                      <li>Extremely fast to compute.</li>
                      <li>Very simple to configure and write.</li>
                    </ul>
                  </div>
                  <div className="bg-rose-900/10 border border-rose-500/20 p-4 rounded-lg">
                    <h4 className="text-rose-400 font-semibold mb-2 mt-0">Disadvantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Splits words and sentences mid-word.</li>
                      <li>Severely degrades semantic meaning.</li>
                      <li>Causes information fragmentation.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                key="tab2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-100">2. Sliding Window Chunking</h2>
                <p className="mb-6 text-gray-300">
                  Extends Fixed-Size chunking by adding a **Chunk Overlap**. Part of the text from the end of the previous chunk is carried over to the start of the next chunk. This protects data boundaries from losing their context.
                </p>
                
                <div className="h-64 bg-[#111] border border-gray-800 rounded-xl relative overflow-hidden mb-6 flex items-center justify-center">
                  <div className="w-4/5 flex justify-between font-mono text-sm">
                    <span className="text-gray-300">Chunk 1: [RAG holds search]</span>
                    <span className="text-purple-400">[search and model]</span>
                    <span className="text-gray-300">[model answers query]</span>
                  </div>
                  <motion.div 
                    className="absolute h-[60px] border-2 border-emerald-500 rounded-lg"
                    style={{ left: '8%', width: '50%', top: '35%' }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute h-[60px] border-2 border-purple-500 rounded-lg"
                    style={{ left: '33%', width: '50%', top: '50%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Python Template</h3>
                <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-gray-300 whitespace-pre">
{`from langchain_text_splitters import CharacterTextSplitter

# LangChain uses separator + size + overlap
splitter = CharacterTextSplitter(
    separator=" ",
    chunk_size=100,
    chunk_overlap=20
)
chunks = splitter.split_text(text)`}</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 mt-6">
                  <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-lg">
                    <h4 className="text-emerald-400 font-semibold mb-2 mt-0">Advantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Preserves context that drops off at normal boundaries.</li>
                      <li>Configurable overlap percentage.</li>
                      <li>Very effective for sequential reading.</li>
                    </ul>
                  </div>
                  <div className="bg-rose-900/10 border border-rose-500/20 p-4 rounded-lg">
                    <h4 className="text-rose-400 font-semibold mb-2 mt-0">Disadvantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Produces redundant tokens.</li>
                      <li>Higher database load.</li>
                      <li>Increases input tokens fed to the LLM.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 3 && (
              <motion.div
                key="tab3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                 <h2 className="text-2xl font-bold mb-4 text-gray-100">3. Semantic Chunking</h2>
                 {/* Content similar to original, use framer motion for particles if possible */}
                 <p className="mb-6 text-gray-300">
                  Computes vector embeddings for adjacent sentences and determines their mathematical similarity (cosine distance). If similarity between sentence A and B drops below a threshold, it marks a topic transition and cuts the chunk.
                </p>
                <div className="h-64 bg-[#0a0a0a] border border-gray-800 rounded-xl relative overflow-hidden mb-6 flex items-center justify-center">
                    <motion.div className="w-3 h-3 rounded-full bg-blue-500 absolute" style={{left: '20%', top: '30%'}} animate={{scale: [1,1.2,1]}} transition={{duration: 2, repeat: Infinity}} />
                    <motion.div className="w-3 h-3 rounded-full bg-blue-500 absolute" style={{left: '25%', top: '40%'}} animate={{scale: [1,1.2,1], delay: 0.2}} transition={{duration: 2, repeat: Infinity}} />
                    <motion.div className="w-3 h-3 rounded-full bg-blue-500 absolute" style={{left: '18%', top: '55%'}} animate={{scale: [1,1.2,1], delay: 0.4}} transition={{duration: 2, repeat: Infinity}} />
                    
                    <div className="absolute left-[45%] top-[20%] bottom-[20%] w-[2px] border-l-2 border-dashed border-red-500/50"></div>
                    
                    <motion.div className="w-3 h-3 rounded-full bg-emerald-500 absolute" style={{left: '70%', top: '40%'}} animate={{scale: [1,1.2,1]}} transition={{duration: 2, repeat: Infinity}}/>
                    <motion.div className="w-3 h-3 rounded-full bg-emerald-500 absolute" style={{left: '75%', top: '55%'}} animate={{scale: [1,1.2,1], delay: 0.2}} transition={{duration: 2, repeat: Infinity}}/>
                    <motion.div className="w-3 h-3 rounded-full bg-emerald-500 absolute" style={{left: '68%', top: '30%'}} animate={{scale: [1,1.2,1], delay: 0.4}} transition={{duration: 2, repeat: Infinity}}/>
                    <div className="absolute bottom-5 text-sm text-gray-500">Sentence embeddings clustered by topic similarity</div>
                </div>
              </motion.div>
            )}

            {activeTab === 4 && (
              <motion.div
                key="tab4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-100">4. Hierarchical Chunking (Parent-Child)</h2>
                {/* Content similar to original */}
              </motion.div>
            )}
            
            {activeTab === 5 && (
              <motion.div
                key="tab5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-100">5. Recursive Chunking</h2>
                {/* Content similar to original */}
              </motion.div>
            )}

            {activeTab === 6 && (
              <motion.div
                key="tab6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-100">6. Document-Aware Chunking</h2>
                {/* Content similar to original */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </GuideLayout>
  );
}

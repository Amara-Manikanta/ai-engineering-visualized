import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

/* Interactive Sliding Window animation */
function SlidingWindowDemo() {
  const words = ["RAG", "holds", "search", "and", "model", "answers", "query", "with", "context"];
  const [activeChunk, setActiveChunk] = useState(0);
  
  // 3 chunks with overlap: [0-3], [2-5], [4-7]
  const chunks = [
    { start: 0, end: 3, label: "Chunk 1" },
    { start: 2, end: 5, label: "Chunk 2" },
    { start: 4, end: 7, label: "Chunk 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChunk(prev => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = chunks[activeChunk];
  const prev = activeChunk > 0 ? chunks[activeChunk - 1] : null;

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-indigo-400">{current.label}</span>
        <div className="flex gap-1.5">
          {chunks.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveChunk(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeChunk ? 'bg-indigo-500' : 'bg-gray-700'}`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {words.map((word, i) => {
          const inCurrent = i >= current.start && i <= current.end;
          const isOverlap = prev && i >= current.start && i <= prev.end;
          
          let bg = 'bg-gray-800/50 text-gray-600';
          if (isOverlap) bg = 'bg-purple-600/40 border-purple-500/60 text-purple-300';
          else if (inCurrent) bg = 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300';

          return (
            <motion.span
              key={`${i}-${activeChunk}`}
              className={`px-3 py-2 rounded-lg text-sm font-mono border border-transparent transition-all duration-300 ${bg}`}
              animate={{ scale: inCurrent ? 1 : 0.9, opacity: inCurrent ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              {word}
            </motion.span>
          );
        })}
      </div>
      <div className="flex gap-4 mt-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-indigo-600/40 border border-indigo-500/50 inline-block"></span> Current chunk</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-600/40 border border-purple-500/60 inline-block"></span> Overlap (shared context)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-800/50 inline-block"></span> Not in window</span>
      </div>
    </div>
  );
}

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
                
                <div className="h-64 bg-[#111] border border-gray-800 rounded-xl relative overflow-hidden mb-6 flex flex-col items-center justify-center gap-4 px-6">
                  <p className="text-xs text-gray-500 mb-2">Text split every 12 characters — breaks words mid-way</p>
                  <div className="flex flex-wrap gap-0 text-base sm:text-lg font-mono">
                    <motion.span className="bg-indigo-600/30 border border-indigo-500/50 px-2 py-1 rounded-l-md text-indigo-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Artificial I</motion.span>
                    <motion.span className="bg-emerald-600/30 border border-emerald-500/50 px-2 py-1 text-emerald-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>ntelligence </motion.span>
                    <motion.span className="bg-amber-600/30 border border-amber-500/50 px-2 py-1 text-amber-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>is transform</motion.span>
                    <motion.span className="bg-rose-600/30 border border-rose-500/50 px-2 py-1 text-rose-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>ing our worl</motion.span>
                    <motion.span className="bg-cyan-600/30 border border-cyan-500/50 px-2 py-1 rounded-r-md text-cyan-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>d rapidly.</motion.span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">⚠️ "Artificial" split into 2 chunks</span>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">⚠️ "world" split into 2 chunks</span>
                  </div>
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
                  Extends Fixed-Size chunking by adding a <strong className="text-white">Chunk Overlap</strong>. Part of the text from the end of the previous chunk is carried over to the start of the next chunk. This protects data boundaries from losing their context.
                </p>
                
                <SlidingWindowDemo />

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

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Python Template</h3>
                <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-gray-300 whitespace-pre">
{`from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai import OpenAIEmbeddings

# Splitter automatically measures distance threshold
splitter = SemanticChunker(OpenAIEmbeddings())
docs = splitter.create_documents([text])`}</div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Examples</h3>
                <p className="text-gray-300 mb-1"><strong className="text-gray-100">Input:</strong> <code className="bg-gray-800 px-1 rounded text-pink-400">"Apples are high in fiber. Bananas offer potassium. Linear regression is an ML method."</code></p>
                <p className="text-gray-300 mb-6"><strong className="text-gray-100">Output:</strong><br />
                Chunk 1 (Nutrition): <code className="bg-gray-800 px-1 rounded text-pink-400">["Apples are high in fiber. Bananas offer potassium."]</code><br />
                Chunk 2 (Math/ML): <code className="bg-gray-800 px-1 rounded text-pink-400">["Linear regression is an ML method."]</code></p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 mt-6">
                  <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-lg">
                    <h4 className="text-emerald-400 font-semibold mb-2 mt-0">Advantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Ensures all content inside a chunk is semantically unified.</li>
                      <li>Highly coherent for complex QA.</li>
                      <li>No arbitrary word slicing.</li>
                    </ul>
                  </div>
                  <div className="bg-rose-900/10 border border-rose-500/20 p-4 rounded-lg">
                    <h4 className="text-rose-400 font-semibold mb-2 mt-0">Disadvantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Very slow and computationally heavy.</li>
                      <li>Requires active API calls to generate sentence vectors.</li>
                      <li>Heavily dependent on the embedding model quality.</li>
                    </ul>
                  </div>
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
                <p className="mb-6 text-gray-300">
                  Processes text into large **Parent Chunks** (for broad context) and splits them further into small **Child Chunks** (for search indexing). The child chunks are searched, but if a match is found, the larger Parent is loaded and sent to the LLM to give the generation full context.
                </p>
                
                <div className="h-64 bg-[#111] border border-gray-800 rounded-xl relative overflow-hidden mb-6 flex items-center justify-center">
                  <div className="bg-[#1a1a1a] border border-indigo-500 px-3 py-2 rounded-md text-xs font-semibold absolute left-[40%] top-[15%]">Parent Chunk (1000 Tokens)</div>
                  <div className="absolute left-[50%] top-[28%] w-[2px] h-[35px] bg-gray-700"></div>
                  
                  <div className="bg-[#1a1a1a] border border-emerald-500 px-3 py-2 rounded-md text-xs font-semibold absolute left-[15%] top-[50%]">Child A (200 T)</div>
                  <div className="bg-[#1a1a1a] border border-emerald-500 px-3 py-2 rounded-md text-xs font-semibold absolute left-[42%] top-[50%]">Child B (200 T)</div>
                  <div className="bg-[#1a1a1a] border border-emerald-500 px-3 py-2 rounded-md text-xs font-semibold absolute left-[68%] top-[50%]">Child C (200 T)</div>
                  
                  <div className="absolute left-[25%] top-[40%] w-[20%] h-[2px] bg-gray-700"></div>
                  <div className="absolute left-[55%] top-[40%] w-[20%] h-[2px] bg-gray-700"></div>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Python Template</h3>
                <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-gray-300 whitespace-pre">
{`from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore
from langchain_text_splitters import RecursiveCharacterTextSplitter

parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000)
child_splitter = RecursiveCharacterTextSplitter(chunk_size=400)

# Links parent store to child vectors
retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=InMemoryStore(),
    child_splitter=child_splitter,
    parent_splitter=parent_splitter,
)`}</div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Examples</h3>
                <p className="text-gray-300 mb-6"><strong className="text-gray-100">System Workflow:</strong> Child chunk matching <code className="bg-gray-800 px-1 rounded text-pink-400">"financial losses in Q2"</code> retrieves. But the retriever loads the **entire Parent document** containing all 4 quarterly tables to ensure the LLM has complete context.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 mt-6">
                  <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-lg">
                    <h4 className="text-emerald-400 font-semibold mb-2 mt-0">Advantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Small chunks give precise embedding lookup.</li>
                      <li>Large chunks provide the LLM with full context, avoiding hallucination.</li>
                      <li>Highly effective for reports and technical manuals.</li>
                    </ul>
                  </div>
                  <div className="bg-rose-900/10 border border-rose-500/20 p-4 rounded-lg">
                    <h4 className="text-rose-400 font-semibold mb-2 mt-0">Disadvantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>More complex database architecture.</li>
                      <li>Needs synchronization between Vector DB and Document DB.</li>
                      <li>Higher memory footprint.</li>
                    </ul>
                  </div>
                </div>
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
                <p className="mb-6 text-gray-300">
                  Attempts to split text using a hierarchical list of separators (e.g. paragraphs <code className="bg-gray-800 px-1 rounded">\n\n</code>, then lines <code className="bg-gray-800 px-1 rounded">\n</code>, then words <code className="bg-gray-800 px-1 rounded">" "</code>, then characters <code className="bg-gray-800 px-1 rounded">""</code>). It only falls back to smaller separators if a chunk remains larger than target size.
                </p>
                
                <div className="h-64 bg-[#111] border border-gray-800 rounded-xl relative overflow-hidden mb-6 flex flex-col items-start pl-[20%] justify-center gap-3">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span>1. Try splitting by Paragraph (<code className="text-pink-400 bg-gray-800 px-1 rounded">\n\n</code>) ➔</span>
                    <span className="text-rose-500 font-bold">Too Big</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span>2. Try splitting by Sentence (<code className="text-pink-400 bg-gray-800 px-1 rounded">. </code>) ➔</span>
                    <span className="text-emerald-500 font-bold">Split Success</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span>3. Try splitting by Word (<code className="text-pink-400 bg-gray-800 px-1 rounded">" "</code>) ➔</span>
                    <span className="text-gray-500">Skip (Already under size)</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Python Template</h3>
                <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-gray-300 whitespace-pre">
{`from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", ". ", " ", ""]
)
chunks = splitter.split_text(text)`}</div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Examples</h3>
                <p className="text-gray-300 mb-1"><strong className="text-gray-100">Input:</strong> A 1500-character document with 3 paragraphs of 500 characters each.</p>
                <p className="text-gray-300 mb-6"><strong className="text-gray-100">Output (chunk_size=600):</strong> Splits cleanly at the <code className="bg-gray-800 px-1 rounded text-pink-400">"\\n\\n"</code> boundaries, returning 3 perfect paragraphs as 3 chunks.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 mt-6">
                  <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-lg">
                    <h4 className="text-emerald-400 font-semibold mb-2 mt-0">Advantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>The industry standard baseline splitter.</li>
                      <li>Keeps paragraphs and sentences intact.</li>
                      <li>Highly adaptive and predictable performance.</li>
                    </ul>
                  </div>
                  <div className="bg-rose-900/10 border border-rose-500/20 p-4 rounded-lg">
                    <h4 className="text-rose-400 font-semibold mb-2 mt-0">Disadvantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Still relies on heuristics (size/overlap margins).</li>
                      <li>Does not evaluate semantic meaning.</li>
                    </ul>
                  </div>
                </div>
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
                <p className="mb-6 text-gray-300">
                  Uses structural parses (like Markdown, HTML, or PDF-layout engines) to chunk text based on logical document boundaries. It ensures that elements like **Tables**, **Lists**, and **Code Blocks** are kept whole inside a single chunk.
                </p>
                
                <div className="h-64 bg-[#111] border border-gray-800 rounded-xl relative overflow-hidden mb-6 flex items-center justify-center">
                  <div className="w-[80%] h-[80%] border-2 border-gray-700 bg-[#0a0a0a] rounded-lg p-3 flex flex-col gap-2">
                    <div className="h-[25%] bg-indigo-900/20 border border-indigo-500 rounded flex items-center justify-center text-xs font-bold text-indigo-400">H1 Header</div>
                    <div className="h-[40%] bg-emerald-900/20 border border-emerald-500 rounded flex items-center justify-center text-xs font-bold text-emerald-400">Code Block (Kept Intact)</div>
                    <div className="h-[25%] bg-amber-900/20 border border-amber-500 rounded flex items-center justify-center text-xs font-bold text-amber-400">Table (Kept Intact)</div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Python Template</h3>
                <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-gray-300 whitespace-pre">
{`from langchain_text_splitters import MarkdownHeaderTextSplitter

headers_to_split_on = [
    ("#", "Header 1"),
    ("##", "Header 2"),
]
splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers_to_split_on)
chunks = splitter.split_text(markdown_text)`}</div>

                <h3 className="text-lg font-semibold mb-2 text-gray-200">Examples</h3>
                <p className="text-gray-300 mb-6"><strong className="text-gray-100">Markdown Splitting:</strong> If the text contains <code className="bg-gray-800 px-1 rounded text-pink-400">"# Architecture\\nSome text...\\n# API Docs"</code>, the splitter slices it at <code className="bg-gray-800 px-1 rounded text-pink-400">"# API Docs"</code> and appends <code className="bg-gray-800 px-1 rounded text-pink-400">{`{"Header 1": "Architecture"}`}</code> to the first chunk's metadata.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 mt-6">
                  <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-lg">
                    <h4 className="text-emerald-400 font-semibold mb-2 mt-0">Advantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Protects semantic blocks (never cuts tables or code in half).</li>
                      <li>Appends layout hierarchy paths directly to metadata.</li>
                      <li>Extremely rich context matching.</li>
                    </ul>
                  </div>
                  <div className="bg-rose-900/10 border border-rose-500/20 p-4 rounded-lg">
                    <h4 className="text-rose-400 font-semibold mb-2 mt-0">Disadvantages</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                      <li>Requires structural files (Markdown, HTML, XML).</li>
                      <li>Parser logic is fragile on bad/messy source files.</li>
                      <li>Computational parser overhead.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </GuideLayout>
  );
}

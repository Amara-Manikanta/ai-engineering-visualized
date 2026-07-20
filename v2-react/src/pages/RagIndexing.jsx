import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagIndexing() {
  const [step, setStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const toc = [
    { label: "What is Indexing?", hash: "what-is-indexing" },
    { label: "Embedding Generation", hash: "embedding-gen" },
    { label: "Vector Indexing", hash: "vector-indexing" },
    { label: "Incremental Indexing", hash: "incremental" }
  ];

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleReset = () => { setStep(1); setIsPlaying(false); };
  
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if(step >= 6) setStep(1);
      // Let a useEffect handle the loop, or simulate simple interval
    }
  };
  
  React.useEffect(() => {
    let interval;
    if(isPlaying) {
        interval = setInterval(() => {
            setStep(s => {
                if(s >= 6) {
                    setIsPlaying(false);
                    return s;
                }
                return s + 1;
            })
        }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <GuideLayout
      title="Indexing"
      intro="Transforming prepared text into searchable vectors."
      toc={toc}
    >
      <section id="indexing" className="px-5 mb-10">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-700/50">Stage 1</div>
          <h2 className="text-3xl font-extrabold text-white mb-2">📁 Indexing</h2>
          <p className="text-gray-400 max-w-2xl">
            Preparing your knowledge base — documents are parsed, chunked, embedded into vectors, and stored in a vector database.
          </p>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-8 pb-4 border-b border-gray-800">
            <div className="flex gap-2 items-center">
              <button onClick={handlePrev} className="px-4 py-2 bg-[#222] hover:bg-[#333] text-gray-300 rounded-lg text-sm font-semibold transition-colors">‹ Prev</button>
              <span className="text-gray-400 text-sm font-mono px-2">Step {step} of 6</span>
              <button onClick={handleNext} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors">Next ›</button>
            </div>
            <div className="flex gap-2">
              <button onClick={handleReset} className="px-4 py-2 border border-gray-700 text-gray-400 hover:text-gray-200 rounded-lg text-sm font-semibold transition-colors">↺ Reset</button>
              <button onClick={togglePlay} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isPlaying ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-8 justify-center">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i <= step ? 'bg-indigo-500' : 'bg-gray-700'}`} />
            ))}
          </div>

          {/* Simple placeholder for complex animation - focus on layout and state tracking */}
          <div className="relative h-[400px] bg-[#0a0a0a] border border-gray-800 rounded-xl mb-8 flex flex-col justify-center items-center overflow-hidden">
             
             {/* PDF Node */}
             <motion.div className="absolute left-[10%] top-[30%] flex flex-col items-center" animate={{opacity: step >= 1 ? 1 : 0.3}}>
                <div className="w-16 h-20 bg-red-900/40 border-2 border-red-500 rounded flex items-center justify-center font-bold text-red-400">PDF</div>
                <div className="mt-2 text-sm text-gray-400">Document</div>
             </motion.div>

             <motion.div className="absolute left-[20%] top-[38%] w-[10%] h-[2px] bg-indigo-500" animate={{opacity: step >= 2 ? 1 : 0}} />
             
             {/* TXT Node */}
             <motion.div className="absolute left-[30%] top-[30%] flex flex-col items-center" animate={{opacity: step >= 2 ? 1 : 0.3}}>
                <div className="w-16 h-20 bg-gray-800/80 border-2 border-gray-500 rounded flex items-center justify-center font-bold text-gray-300">TXT</div>
                <div className="mt-2 text-sm text-gray-400">Text</div>
             </motion.div>

             <motion.div className="absolute left-[40%] top-[38%] w-[10%] h-[2px] bg-indigo-500" animate={{opacity: step >= 3 ? 1 : 0}} />

             {/* Chunks Node */}
             <motion.div className="absolute left-[50%] top-[30%] flex flex-col items-center" animate={{opacity: step >= 3 ? 1 : 0.3}}>
                <div className="w-20 h-20 grid grid-cols-2 gap-1 bg-transparent">
                    <div className="bg-indigo-500/50 border border-indigo-400 rounded"></div>
                    <div className="bg-indigo-500/50 border border-indigo-400 rounded"></div>
                    <div className="bg-indigo-500/50 border border-indigo-400 rounded"></div>
                    <div className="bg-indigo-500/50 border border-indigo-400 rounded"></div>
                </div>
                <div className="mt-2 text-sm text-gray-400">Chunks</div>
             </motion.div>

             {/* Up arrow */}
             <motion.div className="absolute left-[55%] top-[15%] w-[2px] h-[15%] bg-indigo-500" animate={{opacity: step >= 4 ? 1 : 0}} />

             {/* Embedding Model */}
             <motion.div className="absolute left-[47%] top-[5%] flex flex-col items-center" animate={{opacity: step >= 4 ? 1 : 0.3}}>
                <div className="w-24 h-12 bg-purple-900/40 border-2 border-purple-500 rounded flex items-center justify-center text-xs text-purple-300 font-mono">Model</div>
             </motion.div>

             {/* Down arrow */}
             <motion.div className="absolute left-[65%] top-[15%] w-[2px] h-[35%] bg-indigo-500" animate={{opacity: step >= 5 ? 1 : 0}} />

             {/* Embeddings */}
             <motion.div className="absolute left-[60%] top-[50%] flex flex-col items-center" animate={{opacity: step >= 5 ? 1 : 0.3}}>
                <div className="flex gap-1">
                    <div className="w-4 h-12 bg-emerald-500/50 rounded-sm"></div>
                    <div className="w-4 h-12 bg-emerald-500/50 rounded-sm"></div>
                    <div className="w-4 h-12 bg-emerald-500/50 rounded-sm"></div>
                </div>
                <div className="mt-2 text-sm text-gray-400">Embeddings</div>
             </motion.div>

             {/* Right arrow */}
             <motion.div className="absolute left-[70%] top-[58%] w-[10%] h-[2px] bg-indigo-500" animate={{opacity: step >= 6 ? 1 : 0}} />

             {/* DB */}
             <motion.div className="absolute left-[80%] top-[50%] flex flex-col items-center" animate={{opacity: step >= 6 ? 1 : 0.3}}>
                <div className="w-16 h-16 rounded-full bg-cyan-900/40 border-4 border-cyan-500 flex items-center justify-center text-2xl">👁️</div>
                <div className="mt-2 text-sm text-gray-400">Milvus</div>
             </motion.div>
          </div>

          <div className="bg-[#1a1a1a] p-5 rounded-xl border-l-4 border-indigo-500">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="1" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                  <div className="text-indigo-400 text-sm font-bold mb-1">Step 1</div>
                  <h4 className="text-xl text-white font-semibold mb-2">Document Input</h4>
                  <p className="text-gray-400 text-sm mb-3">Start with any document — PDFs, Word files, web pages, or text files. These are your knowledge sources that you want the AI to be able to query and reason over.</p>
                  <div className="bg-indigo-900/20 text-indigo-300 text-xs p-2 rounded"><strong>Key insight:</strong> The quality and structure of your source documents directly impacts the quality of RAG responses.</div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                   <div className="text-indigo-400 text-sm font-bold mb-1">Step 2</div>
                  <h4 className="text-xl text-white font-semibold mb-2">Text Parsing</h4>
                  <p className="text-gray-400 text-sm mb-3">Extract plain text from the document format.</p>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="3" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                   <div className="text-indigo-400 text-sm font-bold mb-1">Step 3</div>
                  <h4 className="text-xl text-white font-semibold mb-2">Chunking</h4>
                  <p className="text-gray-400 text-sm mb-3">Split text into manageable chunks.</p>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div key="4" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                   <div className="text-indigo-400 text-sm font-bold mb-1">Step 4</div>
                  <h4 className="text-xl text-white font-semibold mb-2">Embedding Model</h4>
                  <p className="text-gray-400 text-sm mb-3">Send chunks to an embedding model.</p>
                </motion.div>
              )}
              {step === 5 && (
                <motion.div key="5" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                   <div className="text-indigo-400 text-sm font-bold mb-1">Step 5</div>
                  <h4 className="text-xl text-white font-semibold mb-2">Vector Embeddings</h4>
                  <p className="text-gray-400 text-sm mb-3">Receive dense numerical vectors back.</p>
                </motion.div>
              )}
              {step === 6 && (
                <motion.div key="6" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                   <div className="text-indigo-400 text-sm font-bold mb-1">Step 6</div>
                  <h4 className="text-xl text-white font-semibold mb-2">Vector Database</h4>
                  <p className="text-gray-400 text-sm mb-3">Store vectors and metadata for fast retrieval.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="px-5 mb-12">
        <h3 className="text-xl font-bold text-gray-200 mb-6">📝 Indexing — Detailed Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111] p-5 rounded-xl border border-gray-800">
            <div className="text-2xl mb-3">📄</div>
            <h4 className="text-lg text-white font-semibold mb-2">1. Document Parsing</h4>
            <p className="text-sm text-gray-400 mb-4">Raw documents (PDF, DOCX, HTML, etc.) are loaded and converted into plain text. Libraries like <code>PyMuPDF</code>, <code>pdfplumber</code>, or <code>LangChain loaders</code> handle this. The goal is clean, extractable text.</p>
            <div className="text-xs bg-[#222] p-2 rounded text-gray-300"><span className="text-gray-500 mr-2">Tools:</span><code>PyMuPDF · pdfplumber · unstructured · LangChain</code></div>
          </div>
          <div className="bg-[#111] p-5 rounded-xl border border-gray-800">
            <div className="text-2xl mb-3">✂️</div>
            <h4 className="text-lg text-white font-semibold mb-2">2. Text Chunking</h4>
            <p className="text-sm text-gray-400 mb-4">Long documents are split into smaller <strong>overlapping chunks</strong> (typically 256–1024 tokens with 20–50 token overlap). This ensures no context is lost at boundaries and each chunk is small enough to be semantically focused.</p>
            <div className="text-xs bg-[#222] p-2 rounded text-gray-300"><span className="text-gray-500 mr-2">Strategy:</span><code>Fixed-size · Sentence · Semantic · Recursive</code></div>
          </div>
          <div className="bg-[#111] p-5 rounded-xl border border-gray-800">
            <div className="text-2xl mb-3">🔢</div>
            <h4 className="text-lg text-white font-semibold mb-2">3. Embedding Generation</h4>
            <p className="text-sm text-gray-400 mb-4">Each chunk is passed through an <strong>Embedding Model</strong> which converts text into a dense numerical vector (e.g. 1536 dimensions for OpenAI). Semantically similar texts produce numerically similar vectors.</p>
            <div className="text-xs bg-[#222] p-2 rounded text-gray-300"><span className="text-gray-500 mr-2">Models:</span><code>text-embedding-ada-002 · BAAI/bge · Cohere · E5</code></div>
          </div>
          <div className="bg-[#111] p-5 rounded-xl border border-gray-800">
            <div className="text-2xl mb-3">💾</div>
            <h4 className="text-lg text-white font-semibold mb-2">4. Vector Storage (Milvus)</h4>
            <p className="text-sm text-gray-400 mb-4">The embedding vectors (along with the original chunk text as metadata) are stored in a <strong>vector database</strong> like Milvus. These databases are optimized for fast Approximate Nearest Neighbor (ANN) search.</p>
            <div className="text-xs bg-[#222] p-2 rounded text-gray-300"><span className="text-gray-500 mr-2">Options:</span><code>Milvus · Pinecone · Weaviate · Chroma · FAISS</code></div>
          </div>
        </div>
      </section>

      <section className="px-5">
          <h2 id="what-is-indexing" className="text-2xl font-bold mb-4 text-gray-100">What is Indexing?</h2>
          <p className="text-gray-300 mb-6">Indexing is the offline process of taking clean, chunked documents, passing them through an embedding model to generate numerical vectors, and loading those vectors into a database for fast querying.</p>
          
          <h2 id="embedding-gen" className="text-2xl font-bold mb-4 text-gray-100">Embedding Generation</h2>
          <p className="text-gray-300 mb-6">An embedding model (like OpenAI's <code className="bg-[#222] px-1 rounded text-pink-400">text-embedding-3-small</code>) processes each text chunk and outputs a high-dimensional vector (e.g. an array of 1536 floating-point numbers) that mathematically represents the chunk's semantic meaning.</p>

          <h2 id="vector-indexing" className="text-2xl font-bold mb-4 text-gray-100">Vector Indexing</h2>
          <p className="text-gray-300 mb-6">Vector databases don't just store arrays; they build specialized mathematical indices (like HNSW or IVF) over the vectors so that similarity searches can be executed in milliseconds over billions of records.</p>

          <h2 id="incremental" className="text-2xl font-bold mb-4 text-gray-100">Incremental Indexing</h2>
          <p className="text-gray-300 mb-6">In production, you rarely re-index the entire knowledge base. Incremental indexing uses Record Managers to track document hashes, updating or deleting only the chunks of files that have actually changed.</p>
        </section>
    </GuideLayout>
  );
}

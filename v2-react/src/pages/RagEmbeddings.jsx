import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, FileText, Search, ArrowRight, Zap, RefreshCw, Layers } from 'lucide-react';
import GuideLayout from '../components/GuideLayout';

const toc = [
  { label: '1. What are Embeddings?', hash: '#what-are' },
  { label: '2. Why do we need them?', hash: '#why-need' },
  { label: '3. Simple Analogy', hash: '#simple-analogy' },
  { label: '4. How Embeddings work in RAG', hash: '#how-work-rag' },
  { label: '5. Text to Vector', hash: '#text-to-vector' },
  { label: '6. High-dimensional Space', hash: '#high-dim' },
  { label: '7. Similarity Search', hash: '#sim-search' },
  { label: '8. Cosine Similarity', hash: '#cosine' },
  { label: '9. Dot Product', hash: '#dot-product' },
  { label: '10. Dense vs Sparse', hash: '#dense-sparse' },
  { label: '11. Embedding Models', hash: '#models' },
  { label: '12. Creating in Python', hash: '#python' },
  { label: '13. Visualizing Embeddings', hash: '#visualizing' },
  { label: '14. Real-world Examples', hash: '#examples' },
  { label: '15. Common Mistakes', hash: '#mistakes' }
];

const AnalogyMap = () => {
  const [isSemantic, setIsSemantic] = useState(false);

  const nodes = {
    geographic: [
      { id: 'hyd', label: 'Hyderabad', color: 'bg-emerald-500', x: '30%', y: '50%' },
      { id: 'blr', label: 'Bengaluru', color: 'bg-emerald-500', x: '35%', y: '65%' },
      { id: 'ny', label: 'New York', color: 'bg-rose-500', x: '80%', y: '20%' },
    ],
    semantic: [
      { id: 'rag', label: '"RAG"', color: 'bg-indigo-500', x: '25%', y: '40%' },
      { id: 'rag2', label: '"retrieval augmented generation"', color: 'bg-indigo-500', x: '20%', y: '60%' },
      { id: 'vdb', label: '"vector database"', color: 'bg-indigo-500', x: '35%', y: '50%' },
      { id: 'pizza', label: '"pizza recipe"', color: 'bg-amber-500', x: '75%', y: '20%' },
      { id: 'cricket', label: '"cricket score"', color: 'bg-amber-500', x: '80%', y: '80%' },
    ]
  };

  const currentNodes = isSemantic ? nodes.semantic : nodes.geographic;

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-6 my-6">
      <div className="flex gap-4 justify-center mb-6">
        <button 
          onClick={() => setIsSemantic(false)} 
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${!isSemantic ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          📍 Geographic Map
        </button>
        <button 
          onClick={() => setIsSemantic(true)} 
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${isSemantic ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          🧠 Semantic Map
        </button>
      </div>

      <div className="relative w-full h-[300px] border border-gray-700/50 bg-[#0a0a0a] rounded-lg overflow-hidden">
        <AnimatePresence>
          {currentNodes.map(node => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, left: node.x, top: node.y }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${node.color} whitespace-nowrap z-10`}
            >
              {node.label}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Distance lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          {!isSemantic && (
            <>
              <motion.line x1="30%" y1="50%" x2="35%" y2="65%" stroke="#10b981" strokeWidth="2" strokeDasharray="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} />
              <motion.line x1="30%" y1="50%" x2="80%" y2="20%" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} />
            </>
          )}
          {isSemantic && (
            <>
              <motion.line x1="25%" y1="40%" x2="20%" y2="60%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} />
              <motion.line x1="25%" y1="40%" x2="35%" y2="50%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

const RagEmbeddingFlow = () => {
  const [stage, setStage] = useState('indexing'); // indexing, query

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mt-8 mb-4">
      <div className="flex gap-4 justify-center mb-8">
        <button 
          onClick={() => setStage('indexing')} 
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 ${stage === 'indexing' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          <Database size={16} /> 1. Indexing Time
        </button>
        <button 
          onClick={() => setStage('query')} 
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 ${stage === 'query' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          <Search size={16} /> 2. Query Time
        </button>
      </div>

      <div className="relative w-full h-[250px] flex items-center justify-between px-10">
        <AnimatePresence mode="wait">
          {stage === 'indexing' ? (
            <motion.div key="idx-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-800 border-2 border-gray-600 rounded-xl flex items-center justify-center text-gray-300 mb-2">
                <FileText size={32} />
              </div>
              <span className="text-xs font-semibold text-gray-400">Raw Docs</span>
            </motion.div>
          ) : (
            <motion.div key="qry-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-900/30 border-2 border-emerald-500/50 rounded-xl flex items-center justify-center text-emerald-400 mb-2">
                <Search size={32} />
              </div>
              <span className="text-xs font-semibold text-emerald-400">User Query</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-gray-500 absolute -translate-x-16">
            <ArrowRight size={24} />
          </motion.div>
          <div className="w-24 h-24 bg-purple-900/30 border-2 border-purple-500/50 rounded-full flex flex-col items-center justify-center text-purple-400 z-10 bg-[#111]">
            <Zap size={28} className="mb-1" />
            <span className="text-[10px] font-bold text-center leading-tight">Embedding<br/>Model</span>
          </div>
          <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} className="text-gray-500 absolute translate-x-16">
            <ArrowRight size={24} />
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {stage === 'indexing' ? (
            <motion.div key="idx-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center">
              <div className="w-20 h-24 bg-indigo-900/30 border-2 border-indigo-500/50 rounded-xl flex flex-col items-center justify-center text-indigo-400 mb-2 relative overflow-hidden">
                 <Database size={32} />
                 <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-1 w-full flex justify-center">
                   <div className="w-12 h-1 bg-indigo-500/50 rounded-full"></div>
                 </motion.div>
              </div>
              <span className="text-xs font-semibold text-indigo-400">Vector DB (Store)</span>
            </motion.div>
          ) : (
            <motion.div key="qry-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center">
              <div className="w-20 h-24 bg-emerald-900/30 border-2 border-emerald-500/50 rounded-xl flex flex-col items-center justify-center text-emerald-400 mb-2 relative">
                 <RefreshCw size={32} className="mb-2" />
                 <div className="text-[10px] text-center font-bold">Top-K<br/>Matches</div>
              </div>
              <span className="text-xs font-semibold text-emerald-400">Vector DB (Search)</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-center text-xs text-gray-500 mt-2">
        {stage === 'indexing' ? 'Documents are processed and stored as vectors.' : 'The query is embedded to find the closest matching vectors.'}
      </p>
    </div>
  );
};

const RagEmbeddings = () => {
  return (
    <GuideLayout
      title="Embeddings"
      intro="The mathematical foundation of semantic search."
      toc={toc}
    >
      <section id="what-are" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">1. What are Embeddings?</h2>
        <p className="text-gray-300">Embeddings are <strong className="text-white">dense numerical vectors</strong> (lists of floating-point numbers) that capture the semantic meaning of text, images, or audio. They act as a universal language for AI models, translating human concepts into math. In this space, words with similar meanings are mapped to points that are geometrically close to each other.</p>
      </section>

      <section id="why-need" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">2. Why do we need embeddings?</h2>
        <p className="text-gray-300 mb-4">Computers do not naturally understand this:</p>
        
        <div className="bg-[#111] p-3 rounded-lg border border-gray-800 mb-4 font-mono text-sm text-gray-300">
          "What is RAG?"
        </div>

        <p className="text-gray-300 mb-4">A computer sees characters, not meaning.</p>
        <p className="text-gray-300 mb-4">But after embedding, the text becomes something like:</p>

        <div className="bg-[#111] p-3 rounded-lg border border-gray-800 mb-4 font-mono text-sm text-gray-300">
          [0.12, -0.45, 0.88, 0.31, ...]
        </div>

        <p className="text-gray-300 mb-4">Now the computer can compare it with other vectors.</p>
        <p className="text-gray-300 mb-4">For example:</p>

        <div className="bg-[#111] p-4 rounded-lg border border-gray-800 mb-4 font-mono text-sm space-y-2">
          <div className="text-indigo-400">Text A: "What is RAG?"</div>
          <div className="text-emerald-400">Text B: "Explain Retrieval-Augmented Generation"</div>
          <div className="text-rose-400">Text C: "How to cook biryani?"</div>
        </div>

        <p className="text-gray-300 mb-4">A good embedding model should place <strong className="text-indigo-400">A</strong> and <strong className="text-emerald-400">B</strong> close together because they mean almost the same thing.</p>
        <p className="text-gray-300 mb-6">But <strong className="text-rose-400">C</strong> should be far away because it is about a different topic.</p>

        <p className="text-gray-300 mb-4">That is the core idea:</p>
        
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 mb-6 font-mono text-sm">
          <div className="text-gray-300">Similar meaning → nearby vectors</div>
          <div className="text-gray-300 mt-2">Different meaning → faraway vectors</div>
        </div>

        <p className="text-gray-300">Semantic search works this way: it searches dense vectors to find records that are closest in meaning and context to the query.</p>
      </section>

      <section id="simple-analogy" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">3. Simple analogy</h2>
        <p className="text-gray-300 mb-4">Think of embeddings like a <strong className="text-white">map of meaning</strong>.</p>
        
        <p className="text-gray-300 mb-2">On a normal map:</p>
        <div className="bg-[#111] p-4 rounded-lg border border-gray-800 mb-6 font-mono text-sm space-y-2">
          <div className="text-gray-300">Hyderabad and Bengaluru → <span className="text-emerald-400">relatively close</span></div>
          <div className="text-gray-300">Hyderabad and New York → <span className="text-rose-400">far</span></div>
        </div>

        <p className="text-gray-300 mb-2">In embedding space:</p>
        <div className="bg-[#111] p-4 rounded-lg border border-gray-800 mb-2 font-mono text-sm space-y-1">
          <div className="text-indigo-300">"RAG"</div>
          <div className="text-indigo-300">"retrieval augmented generation"</div>
          <div className="text-indigo-300">"vector database"</div>
        </div>
        <p className="text-gray-300 mb-6">These concepts should be <span className="text-emerald-400 font-semibold">close</span>.</p>

        <p className="text-gray-300 mb-2">But:</p>
        <div className="bg-[#111] p-4 rounded-lg border border-gray-800 mb-2 font-mono text-sm space-y-1">
          <div className="text-amber-300">"RAG"</div>
          <div className="text-amber-300">"pizza recipe"</div>
          <div className="text-amber-300">"cricket score"</div>
        </div>
        <p className="text-gray-300 mb-6">These should be <span className="text-rose-400 font-semibold">far apart</span>.</p>

        <p className="text-gray-300">So embeddings create a <strong className="text-white">semantic map</strong> where related ideas live near each other.</p>

        <AnalogyMap />
      </section>

      <section id="how-work-rag" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">4. How embeddings work in RAG</h2>
        <p className="text-gray-300 mb-6">In RAG, embeddings act as the bridge between your documents and the user's question. They are used mainly during two distinct stages:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-indigo-500/30 rounded-xl p-5">
            <h3 className="text-lg font-bold text-indigo-400 mb-3 flex items-center gap-2">
              <span>1. Indexing Time</span>
              <span className="text-xs bg-indigo-900/50 border border-indigo-500/50 px-2 py-0.5 rounded-full text-indigo-300">Data Prep</span>
            </h3>
            <p className="text-gray-300 text-sm mb-3">Before a user ever asks a question, your raw data must be processed:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
              <li>Documents (PDFs, text) are broken down into smaller chunks.</li>
              <li>Each chunk is passed through an <strong className="text-gray-200">Embedding Model</strong>.</li>
              <li>The model outputs a high-dimensional vector (e.g., an array of 768 numbers) for each chunk.</li>
              <li>These vectors are saved into a <strong className="text-gray-200">Vector Database</strong> (like Pinecone, Milvus, or Chroma) alongside the original text.</li>
            </ul>
          </div>

          <div className="bg-[#111] border border-emerald-500/30 rounded-xl p-5">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <span>2. Query Time</span>
              <span className="text-xs bg-emerald-900/50 border border-emerald-500/50 px-2 py-0.5 rounded-full text-emerald-300">Retrieval</span>
            </h3>
            <p className="text-gray-300 text-sm mb-3">When a user interacts with your application:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
              <li>The user types a natural language question.</li>
              <li>The question is passed through the <strong className="text-emerald-200">exact same Embedding Model</strong> used during indexing.</li>
              <li>The model outputs a <strong className="text-gray-200">query vector</strong>.</li>
              <li>The Vector Database rapidly compares this query vector against all document vectors using a distance metric (like Cosine Similarity) to fetch the top closest matches.</li>
            </ul>
          </div>
        </div>

        <RagEmbeddingFlow />
      </section>

      <section id="text-to-vector" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">5. Text to Vector</h2>
        <p className="text-gray-300 mb-4">The journey from text to vector involves tokenization, followed by a forward pass through a neural network encoder (like BERT or GPT).</p>
        <p className="text-gray-300 mb-6">A vector is just a list of floating numbers. Embedding models convert meaning into numbers so that computers can compare text by semantic meaning, not only exact keywords.</p>
        <div className="bg-[#111] border border-[#333] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="p-3 bg-[#222] border-2 border-blue-500 rounded-lg text-center font-semibold text-white">"The puppy played."</div>
            <div className="text-2xl text-gray-500">➔</div>
            <div className="p-3 bg-[#222] border-2 border-purple-500 rounded-lg text-center font-semibold text-white">Tokens:<br/>[464, 15309, 3624, 13]</div>
            <div className="text-2xl text-gray-500">➔</div>
            <div className="p-3 bg-[#222] border-2 border-green-500 rounded-lg text-center font-mono text-sm max-w-[250px] text-gray-300">
              [0.012, -0.834, 0.442,<br/> 0.119, -0.003, ... ]<br/><span className="text-gray-500">(384 dimensions)</span>
            </div>
          </div>
        </div>
      </section>

      <section id="high-dim" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">6. High-dimensional Space</h2>
        <p className="text-gray-300 mb-6">While humans can only visualize 2D or 3D space, embedding models project concepts into hundreds or thousands of dimensions (e.g., 384, 768, 1536). Each dimension represents a highly abstract, latent feature (like "royalty", "gender", "positivity", or "plurality").</p>
        
        <div className="bg-[#111] border border-[#333] rounded-xl p-6 mb-4 h-[200px] relative">
          <div className="w-full h-full relative">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] left-[20%] top-[30%]">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold bg-[#222] px-1.5 py-0.5 rounded border border-[#444] text-white whitespace-nowrap">King</span>
            </div>
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] left-[35%] top-[20%]">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold bg-[#222] px-1.5 py-0.5 rounded border border-[#444] text-white whitespace-nowrap">Queen</span>
            </div>
            
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] left-[70%] top-[70%]">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold bg-[#222] px-1.5 py-0.5 rounded border border-[#444] text-white whitespace-nowrap">Car</span>
            </div>
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] left-[80%] top-[60%]">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold bg-[#222] px-1.5 py-0.5 rounded border border-[#444] text-white whitespace-nowrap">Truck</span>
            </div>
            
            <svg width="100%" height="100%" className="absolute top-0 left-0 pointer-events-none">
              <line x1="20%" y1="30%" x2="35%" y2="20%" stroke="#3b82f6" strokeDasharray="4" strokeWidth="2"/>
              <line x1="70%" y1="70%" x2="80%" y2="60%" stroke="#22c55e" strokeDasharray="4" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400">Notice how concepts group together based on semantic relationships.</p>
      </section>

      <section id="sim-search" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">7. Similarity Search</h2>
        <p className="text-gray-300">Once your documents are converted to vectors and stored in a Vector Database (like Pinecone, Milvus, or Chroma), how do you search them? You embed the user's query into a vector using the exact same model, and ask the database to find the vectors that are closest to it mathematically. This process is known as <strong className="text-white">K-Nearest Neighbors (KNN)</strong>.</p>
      </section>

      <section id="cosine" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">8. Cosine Similarity</h2>
        <p className="text-gray-300 mb-4">This is the most common metric used for text embeddings. It calculates the cosine of the angle θ between two vectors, completely ignoring their magnitude (length). </p>
        <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-6 my-6">
          <div className="font-mono text-xl text-center mb-4 text-indigo-400">Cosine Similarity = (A • B) / (||A|| × ||B||)</div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><strong className="text-white">1.0</strong>: Vectors point in the exact same direction (identical meaning).</li>
            <li><strong className="text-white">0.0</strong>: Vectors are orthogonal (unrelated).</li>
            <li><strong className="text-white">-1.0</strong>: Vectors point in opposite directions (opposite meaning).</li>
          </ul>
        </div>
      </section>

      <section id="dot-product" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">9. Dot Product</h2>
        <p className="text-gray-300 mb-4">Calculates the sum of the products of the corresponding entries of the two sequences of numbers. Unlike Cosine Similarity, it accounts for both the <strong className="text-white">angle</strong> and the <strong className="text-white">magnitude</strong>.</p>
        <p className="text-gray-400 italic text-sm">Note: If your vectors are <strong>normalized</strong> (scaled so their length = 1), the Dot Product is mathematically identical to Cosine Similarity, but it computes much faster on modern CPUs/GPUs.</p>
      </section>

      <section id="dense-sparse" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">10. Dense vs Sparse Embeddings</h2>
        <p className="text-gray-300 mb-6">Hybrid search systems combine two different types of embeddings to get the best of both semantic and keyword search.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-gray-300">
            <thead>
              <tr>
                <th className="bg-[#1a1a1a] p-3 border border-[#333] font-semibold text-left text-white">Feature</th>
                <th className="bg-[#1a1a1a] p-3 border border-[#333] font-semibold text-left text-white">Dense (OpenAI, Cohere)</th>
                <th className="bg-[#1a1a1a] p-3 border border-[#333] font-semibold text-left text-white">Sparse (SPLADE, BM25)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-[#333] font-semibold text-white">Array Focus</td>
                <td className="p-3 border border-[#333]">Semantic meaning (Intent)</td>
                <td className="p-3 border border-[#333]">Exact keyword matching</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#333] font-semibold text-white">Array Composition</td>
                <td className="p-3 border border-[#333]">Most values are non-zero floating points</td>
                <td className="p-3 border border-[#333]">99% of values are zero</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#333] font-semibold text-white">Dimensionality</td>
                <td className="p-3 border border-[#333]">Low (384 - 3072)</td>
                <td className="p-3 border border-[#333]">Extremely High (Vocabulary size, e.g. 30,000+)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="models" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">11. Popular Embedding Models</h2>
        <p className="text-gray-300 mb-6">Choosing the right model dictates your database cost and retrieval quality.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4">
            <div className="font-bold text-blue-500 mb-1">OpenAI text-embedding-3-large</div>
            <div className="font-mono text-xs text-gray-400 mb-2">Dimensions: up to 3072</div>
            <div className="text-sm text-gray-300">State of the art proprietary model. Very high quality but requires API calls and costs money.</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4">
            <div className="font-bold text-blue-500 mb-1">all-MiniLM-L6-v2 (HuggingFace)</div>
            <div className="font-mono text-xs text-gray-400 mb-2">Dimensions: 384</div>
            <div className="text-sm text-gray-300">Extremely fast, open-source model. Runs locally. Great for smaller projects and low-latency.</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4">
            <div className="font-bold text-blue-500 mb-1">Cohere embed-english-v3.0</div>
            <div className="font-mono text-xs text-gray-400 mb-2">Dimensions: 1024</div>
            <div className="text-sm text-gray-300">Excellent proprietary model specifically optimized for enterprise RAG pipelines and search.</div>
          </div>
        </div>
      </section>

      <section id="python" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">12. Creating Embeddings in Python</h2>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-white">Using OpenAI (Cloud)</h3>
        <pre className="bg-[#111] border border-[#333] rounded-xl p-4 font-mono text-sm overflow-x-auto text-gray-300 mb-6">
          <code>{`from langchain_openai import OpenAIEmbeddings

embeddings_model = OpenAIEmbeddings(model="text-embedding-3-small")
vector = embeddings_model.embed_query("Hello world")
print(f"Dimensions: {len(vector)}") # Output: 1536`}</code>
        </pre>

        <h3 className="text-lg font-semibold mb-3 text-white">Using HuggingFace (Local CPU/GPU)</h3>
        <pre className="bg-[#111] border border-[#333] rounded-xl p-4 font-mono text-sm overflow-x-auto text-gray-300">
          <code>{`from langchain_community.embeddings import HuggingFaceEmbeddings

# Downloads the model to your machine and runs locally
embeddings_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector = embeddings_model.embed_query("Hello world")
print(f"Dimensions: {len(vector)}") # Output: 384`}</code>
        </pre>
      </section>

      <section id="visualizing" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">13. Visualizing Embeddings</h2>
        <p className="text-gray-300">Because humans cannot see in 1536 dimensions, data scientists use dimensionality reduction algorithms like <strong className="text-white">t-SNE</strong> or <strong className="text-white">UMAP</strong> to squash the vectors down into 2D or 3D space while preserving the local distances between points. This allows us to plot them on a standard graph to look for semantic clusters and outlier data points.</p>
      </section>

      <section id="examples" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">14. Real-world Examples</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li><strong className="text-white">Semantic Search (RAG):</strong> Finding paragraphs in a company handbook that answer a user's question, even if they use entirely different vocabulary.</li>
          <li><strong className="text-white">Recommendation Systems:</strong> Embedding user profiles and movies into the same vector space. If a user vector is near a movie vector, the system recommends that movie.</li>
          <li><strong className="text-white">Anomaly Detection:</strong> Finding log entries or financial transactions whose vectors sit far outside the standard cluster norms.</li>
        </ul>
      </section>

      <section id="mistakes" className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-white">15. Common Mistakes</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
            <h4 className="text-red-400 font-bold mb-2">⚠️ Not Normalizing Before Dot Product</h4>
            <p className="text-sm text-gray-300">If your database uses Dot Product but your vectors are not normalized to a length of 1, longer texts will unfairly score higher simply because they have larger magnitude vectors. <em>Always normalize if using Dot Product for text similarity.</em></p>
          </div>
          <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
            <h4 className="text-red-400 font-bold mb-2">⚠️ Dimension Mismatch</h4>
            <p className="text-sm text-gray-300">You cannot compare a 384-dimensional vector to a 1536-dimensional vector. Furthermore, you cannot compare two 1536-dimensional vectors created by different models! All data in a single vector index must be created by the <strong className="text-white">exact same embedding model version</strong>.</p>
          </div>
          <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
            <h4 className="text-red-400 font-bold mb-2">⚠️ Asymmetric Search Ignorance</h4>
            <p className="text-sm text-gray-300">If your queries are short (e.g., "Python error") but your documents are long paragraphs, you have an asymmetric search problem. You must use embedding models trained specifically for asymmetric QA, not just general semantic similarity.</p>
          </div>
        </div>
      </section>

    </GuideLayout>
  );
};

export default RagEmbeddings;

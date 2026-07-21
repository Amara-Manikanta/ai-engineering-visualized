import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GuideLayout from '../components/GuideLayout';

/* ── Reusable Pipeline Animation Component ── */
function PipelineAnimation({ nodes, steps, descriptions }) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timeout;
    if (isPlaying && step < steps.length) {
      timeout = setTimeout(() => setStep(s => s + 1), 1800);
    } else if (step >= steps.length) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, step, steps.length]);

  const handlePlay = () => {
    if (step >= steps.length) setStep(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  // Determine which nodes are visible at the current step
  const visibleNodes = new Set();
  for (let i = 0; i < step; i++) {
    if (steps[i]) steps[i].forEach(id => visibleNodes.add(id));
  }

  return (
    <div>
      <div className="relative h-[200px] sm:h-[280px] bg-[#111] border border-gray-800 rounded-2xl overflow-hidden mb-3">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute text-center rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-medium"
            style={{
              left: node.left,
              top: node.top,
              transform: node.transform || 'none',
              background: node.bg,
              color: 'white',
              minWidth: node.minWidth || 'auto',
            }}
            animate={{ opacity: visibleNodes.has(node.id) ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {node.label}
            {node.sublabel && <><br/><span className="text-[8px] sm:text-[10px] opacity-70">{node.sublabel}</span></>}
          </motion.div>
        ))}
        <div className="absolute bottom-3 left-3 right-3 text-center text-gray-400 text-xs sm:text-sm h-[36px]">
          {step === 0 && "▶ Click Play to watch the pipeline."}
          {descriptions[step - 1] && descriptions[step - 1]}
        </div>
      </div>
      <div className="flex gap-2 justify-center mb-2">
        <button onClick={handlePlay} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
          {step >= steps.length ? '▶ Replay' : '▶ Play'}
        </button>
        <button onClick={handleReset} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#222] border border-gray-700 text-gray-300 hover:bg-[#333]">
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

/* ── Section Card Component ── */
function RagTypeCard({ title, subtitle, description, strengths, weaknesses, useCases, path, children, index }) {
  return (
    <motion.section
      className="bg-[#111] border border-gray-800 rounded-2xl p-5 sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{title}</h2>
          <p className="text-indigo-300/80 text-sm">{subtitle}</p>
        </div>
        <Link to={path} className="text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-full px-3 py-1 hover:bg-indigo-500/10 transition-colors shrink-0 ml-4">
          Deep Dive →
        </Link>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

      {/* Animation */}
      {children}

      {/* Strengths / Weaknesses / Use Cases */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
          <h4 className="text-emerald-400 font-semibold text-sm mb-2">✅ Strengths</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            {strengths.map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </div>
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
          <h4 className="text-red-400 font-semibold text-sm mb-2">⚠️ Weaknesses</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            {weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
          </ul>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
          <h4 className="text-blue-400 font-semibold text-sm mb-2">🎯 Use Cases</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            {useCases.map((u, i) => <li key={i}>• {u}</li>)}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

/* ── Main Page ── */
export default function RagTypes() {
  const toc = [
    { label: "Overview", hash: "overview" },
    { label: "Naive RAG", hash: "naive" },
    { label: "Advanced RAG", hash: "advanced" },
    { label: "Hybrid RAG", hash: "hybrid" },
    { label: "Agentic RAG", hash: "agentic" },
    { label: "Graph RAG", hash: "graph" },
    { label: "Multimodal RAG", hash: "multimodal" },
    { label: "Corrective RAG", hash: "crag" },
    { label: "Self-RAG", hash: "self" },
    { label: "Comparison", hash: "comparison" },
  ];

  return (
    <GuideLayout
      title="Types of RAG"
      intro="Beyond Naive RAG: Architectural patterns for complex reasoning, each designed to overcome specific limitations."
      toc={toc}
    >
      <div className="space-y-10">
        {/* ── Overview ── */}
        <motion.section id="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            RAG (Retrieval-Augmented Generation) has evolved far beyond the basic "retrieve and generate" pattern. 
            As real-world applications revealed the limitations of simple retrieval — missed context, irrelevant results, 
            inability to handle multi-hop reasoning — the community developed specialized architectures to address each weakness.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Below are <strong className="text-white">8 major RAG architectures</strong>, each with an interactive pipeline animation, 
            strengths, weaknesses, and ideal use cases. Click <strong className="text-indigo-400">"Deep Dive →"</strong> on any card to see the full explanation.
          </p>
        </motion.section>

        {/* ── 1. Naive RAG ── */}
        <div id="naive">
          <RagTypeCard
            title="1. Naive RAG"
            subtitle="The baseline Retrieve-Read-Generate loop"
            description="The simplest RAG architecture. A user query is embedded, similar chunks are retrieved from a vector database, and an LLM generates an answer using those chunks as context. Simple but prone to failure on complex queries that require multi-step reasoning."
            strengths={["Simple to implement", "Low latency", "Works well for factual lookups", "Easy to debug"]}
            weaknesses={["No query optimization", "Irrelevant chunks dilute context", "Fails on ambiguous queries", "No self-correction"]}
            useCases={["FAQ bots", "Documentation search", "Simple Q&A over a single knowledge base"]}
            path="/rag/naive-rag"
            index={0}
          >
            <PipelineAnimation
              nodes={[
                { id: 'q', left: '3%', top: '40%', bg: '#6366f1', label: '❓ Query' },
                { id: 'a1', left: '16%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'emb', left: '22%', top: '35%', bg: '#8b5cf6', label: 'Embed', minWidth: '55px' },
                { id: 'a2', left: '38%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'vdb', left: '44%', top: '35%', bg: '#06b6d4', label: 'Vector DB', minWidth: '65px' },
                { id: 'a3', left: '62%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'llm', left: '70%', top: '35%', bg: '#10b981', label: '🤖 LLM', minWidth: '60px' },
                { id: 'a4', left: '84%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'ans', left: '89%', top: '35%', bg: '#f59e0b', label: '💬 Answer', minWidth: '55px' },
              ]}
              steps={[['q', 'a1', 'emb'], ['a2', 'vdb'], ['a3', 'llm'], ['a4', 'ans']]}
              descriptions={[
                "1. The user query is converted into an embedding vector.",
                "2. Similar chunks are retrieved from the Vector Database via similarity search.",
                "3. Retrieved chunks + query are sent to the LLM as context.",
                "4. The LLM generates the final answer. Done!",
              ]}
            />
          </RagTypeCard>
        </div>

        {/* ── 2. Advanced RAG ── */}
        <div id="advanced">
          <RagTypeCard
            title="2. Advanced RAG"
            subtitle="Pre-retrieval optimization + post-retrieval reranking"
            description="Fixes Naive RAG's biggest flaw: retrieving irrelevant chunks. Before searching, the query is rewritten or expanded for better recall. After retrieval, a Cross-Encoder reranker scores each chunk for relevance, keeping only the best."
            strengths={["Much higher retrieval precision", "Query rewriting handles vague questions", "Reranking filters noise", "Production-proven pattern"]}
            weaknesses={["Higher latency (2 extra steps)", "Reranker adds compute cost", "Still single-hop reasoning", "Needs tuning for each domain"]}
            useCases={["Enterprise search", "Legal/medical Q&A", "Any domain with noisy data"]}
            path="/rag/advanced-rag"
            index={1}
          >
            <PipelineAnimation
              nodes={[
                { id: 'q', left: '2%', top: '40%', bg: '#6366f1', label: '❓ Query' },
                { id: 'a1', left: '13%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'rw', left: '17%', top: '30%', bg: '#f97316', label: 'Rewrite', sublabel: 'HyDE / Expansion', minWidth: '65px' },
                { id: 'a2', left: '32%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'vdb', left: '36%', top: '35%', bg: '#06b6d4', label: 'Vector DB', minWidth: '60px' },
                { id: 'a3', left: '51%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'rr', left: '55%', top: '30%', bg: '#ec4899', label: 'Reranker', sublabel: 'Cross-Encoder', minWidth: '65px' },
                { id: 'a4', left: '70%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'llm', left: '75%', top: '35%', bg: '#10b981', label: '🤖 LLM', minWidth: '50px' },
                { id: 'a5', left: '87%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'ans', left: '91%', top: '35%', bg: '#f59e0b', label: '💬', minWidth: '30px' },
              ]}
              steps={[['q', 'a1', 'rw'], ['a2', 'vdb'], ['a3', 'rr'], ['a4', 'llm'], ['a5', 'ans']]}
              descriptions={[
                "1. Query is rewritten using HyDE or query expansion for better retrieval.",
                "2. Optimized query retrieves chunks from the Vector DB.",
                "3. A Cross-Encoder reranker scores and filters the retrieved chunks.",
                "4. Only the top-ranked, most relevant chunks go to the LLM.",
                "5. High-quality answer generated from precisely relevant context.",
              ]}
            />
          </RagTypeCard>
        </div>

        {/* ── 3. Hybrid RAG ── */}
        <div id="hybrid">
          <RagTypeCard
            title="3. Hybrid RAG"
            subtitle="Semantic search + keyword search combined"
            description="Combines the semantic understanding of vector search with the precision of keyword-based BM25 search. Results from both are merged using Reciprocal Rank Fusion (RRF), giving you the best of both worlds — understanding meaning AND matching exact terms."
            strengths={["Catches both semantic and exact matches", "RRF merges results elegantly", "More robust across query types", "Handles acronyms and proper nouns well"]}
            weaknesses={["Needs two search indexes", "Slightly higher latency", "RRF weights need tuning", "More infrastructure to manage"]}
            useCases={["Technical docs with code terms", "Legal contracts", "Medical records with exact drug names"]}
            path="/rag/hybrid-rag"
            index={2}
          >
            <PipelineAnimation
              nodes={[
                { id: 'q', left: '3%', top: '40%', bg: '#6366f1', label: '❓ Query' },
                { id: 'a1', left: '15%', top: '25%', bg: 'transparent', label: '↗' },
                { id: 'a2', left: '15%', top: '55%', bg: 'transparent', label: '↘' },
                { id: 'vec', left: '22%', top: '15%', bg: '#06b6d4', label: '🔢 Vector', sublabel: 'Semantic', minWidth: '60px' },
                { id: 'bm25', left: '22%', top: '58%', bg: '#f97316', label: '📝 BM25', sublabel: 'Keyword', minWidth: '60px' },
                { id: 'a3', left: '42%', top: '25%', bg: 'transparent', label: '↘' },
                { id: 'a4', left: '42%', top: '55%', bg: 'transparent', label: '↗' },
                { id: 'rrf', left: '48%', top: '32%', bg: '#ec4899', label: 'RRF Fusion', minWidth: '70px' },
                { id: 'a5', left: '66%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'llm', left: '72%', top: '35%', bg: '#10b981', label: '🤖 LLM', minWidth: '50px' },
                { id: 'a6', left: '85%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'ans', left: '90%', top: '35%', bg: '#f59e0b', label: '💬', minWidth: '30px' },
              ]}
              steps={[['q'], ['a1', 'a2', 'vec', 'bm25'], ['a3', 'a4', 'rrf'], ['a5', 'llm'], ['a6', 'ans']]}
              descriptions={[
                "1. User query enters the dual-search pipeline.",
                "2. Query goes to BOTH vector search (semantic) and BM25 (keyword) simultaneously.",
                "3. Reciprocal Rank Fusion merges and re-orders both result sets.",
                "4. Fused, high-quality chunks are sent to the LLM.",
                "5. Answer benefits from both semantic understanding and exact term matching.",
              ]}
            />
          </RagTypeCard>
        </div>

        {/* ── 4. Agentic RAG ── */}
        <div id="agentic">
          <RagTypeCard
            title="4. Agentic RAG"
            subtitle="An autonomous agent uses RAG as a tool"
            description="Instead of a fixed pipeline, an LLM agent decides when, what, and how to search. It can reformulate queries, search multiple sources, and iterate until it's satisfied — like a researcher who keeps digging until they find the answer."
            strengths={["Multi-step reasoning", "Can use multiple tools/sources", "Self-correcting search loops", "Handles complex, open-ended queries"]}
            weaknesses={["Unpredictable latency", "Higher token costs", "Harder to debug", "Risk of infinite loops"]}
            useCases={["Research assistants", "Complex multi-hop questions", "Tasks requiring multiple data sources"]}
            path="/rag/agentic-rag"
            index={3}
          >
            <PipelineAnimation
              nodes={[
                { id: 'q', left: '3%', top: '40%', bg: '#6366f1', label: '❓ Query' },
                { id: 'a1', left: '14%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'agent', left: '19%', top: '28%', bg: '#8b5cf6', label: '🤖 Agent', sublabel: 'Think → Act', minWidth: '70px' },
                { id: 'a2', left: '36%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'tool', left: '42%', top: '28%', bg: '#06b6d4', label: '🔧 Tool', sublabel: 'Vector Search', minWidth: '65px' },
                { id: 'a3', left: '58%', top: '55%', bg: 'transparent', label: '↩ Loop?' },
                { id: 'check', left: '42%', top: '65%', bg: '#f97316', label: 'Enough?', minWidth: '55px' },
                { id: 'a4', left: '70%', top: '42%', bg: 'transparent', label: '✓ Yes ➔' },
                { id: 'ans', left: '80%', top: '35%', bg: '#10b981', label: '💬 Answer', minWidth: '60px' },
              ]}
              steps={[['q', 'a1', 'agent'], ['a2', 'tool'], ['a3', 'check'], ['a4', 'ans']]}
              descriptions={[
                "1. The Agent receives the query and reasons about what information it needs.",
                "2. It decides to use a Tool (vector search) to retrieve relevant chunks.",
                "3. It evaluates: Is this enough? If not, it loops back to search again with a refined query.",
                "4. Once satisfied, the Agent generates the final comprehensive answer.",
              ]}
            />
          </RagTypeCard>
        </div>

        {/* ── 5. Graph RAG ── */}
        <div id="graph">
          <RagTypeCard
            title="5. Graph RAG"
            subtitle="Retrieval over Knowledge Graphs instead of chunks"
            description="Instead of retrieving text chunks, Graph RAG retrieves connected entities and relationships from a Knowledge Graph. Perfect for 'connect the dots' questions like 'How is company A related to person B through project C?'"
            strengths={["Captures entity relationships", "Multi-hop traversal", "Structured reasoning", "Great for 'connect the dots' queries"]}
            weaknesses={["Requires building a knowledge graph", "Graph construction is expensive", "Schema design is complex", "Not ideal for unstructured text"]}
            useCases={["Fraud detection", "Supply chain analysis", "Biomedical research", "Organizational knowledge"]}
            path="/rag/graph-rag"
            index={4}
          >
            <PipelineAnimation
              nodes={[
                { id: 'q', left: '3%', top: '40%', bg: '#6366f1', label: '❓ Query' },
                { id: 'a1', left: '14%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'ext', left: '19%', top: '32%', bg: '#f97316', label: 'Entity', sublabel: 'Extraction', minWidth: '55px' },
                { id: 'a2', left: '34%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'kg', left: '39%', top: '25%', bg: '#06b6d4', label: '🕸️ Knowledge', sublabel: 'Graph', minWidth: '70px' },
                { id: 'a3', left: '57%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'sub', left: '62%', top: '32%', bg: '#ec4899', label: 'Subgraph', sublabel: 'Extracted', minWidth: '60px' },
                { id: 'a4', left: '77%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'llm', left: '82%', top: '35%', bg: '#10b981', label: '🤖 LLM', minWidth: '50px' },
              ]}
              steps={[['q', 'a1', 'ext'], ['a2', 'kg'], ['a3', 'sub'], ['a4', 'llm']]}
              descriptions={[
                "1. Entities are extracted from the user query (e.g., person names, companies).",
                "2. These entities are looked up in the Knowledge Graph to find connected nodes.",
                "3. A relevant subgraph (entities + relationships) is extracted as context.",
                "4. The LLM reasons over the structured subgraph to generate a relationship-aware answer.",
              ]}
            />
          </RagTypeCard>
        </div>

        {/* ── 6. Multimodal RAG ── */}
        <div id="multimodal">
          <RagTypeCard
            title="6. Multimodal RAG"
            subtitle="Retrieves images, audio, and text simultaneously"
            description="Extends RAG beyond text by embedding and retrieving images, charts, video frames, and audio alongside text. Uses CLIP-style models to create a shared embedding space where a text query can find a relevant image."
            strengths={["Handles images, charts, video", "Shared embedding space", "Richer context for VLMs", "Essential for visual domains"]}
            weaknesses={["CLIP embeddings are coarse", "Multimodal models are expensive", "Indexing media is slow", "Complex pipeline"]}
            useCases={["Medical imaging + reports", "Product catalog search", "Video Q&A", "Architecture/design review"]}
            path="/rag/multimodal-rag"
            index={5}
          >
            <PipelineAnimation
              nodes={[
                { id: 'q', left: '3%', top: '40%', bg: '#6366f1', label: '❓ Query' },
                { id: 'a1', left: '14%', top: '25%', bg: 'transparent', label: '↗' },
                { id: 'a2', left: '14%', top: '55%', bg: 'transparent', label: '↘' },
                { id: 'txt', left: '22%', top: '15%', bg: '#06b6d4', label: '📝 Text', sublabel: 'Chunks', minWidth: '55px' },
                { id: 'img', left: '22%', top: '58%', bg: '#f97316', label: '🖼️ Images', sublabel: 'CLIP', minWidth: '55px' },
                { id: 'a3', left: '42%', top: '25%', bg: 'transparent', label: '↘' },
                { id: 'a4', left: '42%', top: '55%', bg: 'transparent', label: '↗' },
                { id: 'merge', left: '48%', top: '32%', bg: '#ec4899', label: 'Merge', minWidth: '50px' },
                { id: 'a5', left: '62%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'vlm', left: '68%', top: '30%', bg: '#10b981', label: '👁️ VLM', sublabel: 'Vision LLM', minWidth: '55px' },
                { id: 'a6', left: '83%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'ans', left: '88%', top: '35%', bg: '#f59e0b', label: '💬', minWidth: '30px' },
              ]}
              steps={[['q'], ['a1', 'a2', 'txt', 'img'], ['a3', 'a4', 'merge'], ['a5', 'vlm'], ['a6', 'ans']]}
              descriptions={[
                "1. The text query enters the multimodal pipeline.",
                "2. Text chunks AND images are retrieved in parallel using CLIP-style embeddings.",
                "3. Text and image results are merged into a unified context.",
                "4. A Vision-Language Model processes both text and images together.",
                "5. The answer can reference specific images and visual details.",
              ]}
            />
          </RagTypeCard>
        </div>

        {/* ── 7. Corrective RAG (CRAG) ── */}
        <div id="crag">
          <RagTypeCard
            title="7. Corrective RAG (CRAG)"
            subtitle="Self-evaluating retrieval with web search fallback"
            description="CRAG adds a critical evaluation step after retrieval. An evaluator model scores whether the retrieved documents actually answer the question. If they don't (score too low), it automatically triggers a web search as a fallback to find the missing information."
            strengths={["Self-correcting retrieval", "Web search fallback", "Reduces hallucination", "Adapts to knowledge gaps"]}
            weaknesses={["Evaluator model adds latency", "Web search is unpredictable", "Needs a good relevance scorer", "More complex error handling"]}
            useCases={["Customer support with evolving info", "News/current events Q&A", "Any domain with knowledge gaps"]}
            path="/rag/crag"
            index={6}
          >
            <PipelineAnimation
              nodes={[
                { id: 'q', left: '3%', top: '40%', bg: '#6366f1', label: '❓ Query' },
                { id: 'a1', left: '14%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'vdb', left: '19%', top: '35%', bg: '#06b6d4', label: 'Vector DB', minWidth: '60px' },
                { id: 'a2', left: '35%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'eval', left: '40%', top: '28%', bg: '#f97316', label: 'Evaluator', sublabel: 'Relevant?', minWidth: '65px' },
                { id: 'no', left: '56%', top: '20%', bg: 'transparent', label: '❌ No ↗' },
                { id: 'web', left: '65%', top: '12%', bg: '#3b82f6', label: '🌐 Web Search', minWidth: '75px' },
                { id: 'yes', left: '56%', top: '55%', bg: 'transparent', label: '✅ Yes ↘' },
                { id: 'a3', left: '75%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'llm', left: '82%', top: '35%', bg: '#10b981', label: '🤖 LLM', minWidth: '50px' },
              ]}
              steps={[['q', 'a1', 'vdb'], ['a2', 'eval'], ['no', 'web'], ['yes', 'a3', 'llm']]}
              descriptions={[
                "1. Standard vector retrieval fetches candidate chunks.",
                "2. An Evaluator model scores: Are these chunks actually relevant?",
                "3. ❌ Not relevant → CORRECTIVE ACTION: Web search fills the knowledge gap.",
                "4. ✅ Relevant chunks (or web results) go to the LLM for final answer generation.",
              ]}
            />
          </RagTypeCard>
        </div>

        {/* ── 8. Self-RAG ── */}
        <div id="self">
          <RagTypeCard
            title="8. Self-RAG"
            subtitle="The model critiques its own retrieval and generation"
            description="Self-RAG goes further than CRAG by adding reflection tokens throughout the generation process. The model asks itself: 'Do I need retrieval?', 'Is this chunk relevant?', 'Is my output supported?', 'Is my output useful?' — and can loop back at any point."
            strengths={["Deep self-reflection", "Critiques its own output", "Reduces hallucination significantly", "Decides IF retrieval is needed"]}
            weaknesses={["Requires specially fine-tuned model", "Multiple generation passes", "High computational cost", "Complex to train"]}
            useCases={["High-stakes Q&A (medical, legal)", "Fact-verification systems", "Research where accuracy is critical"]}
            path="/rag/self-rag"
            index={7}
          >
            <PipelineAnimation
              nodes={[
                { id: 'q', left: '2%', top: '40%', bg: '#6366f1', label: '❓ Query' },
                { id: 'a1', left: '12%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 't1', left: '16%', top: '28%', bg: '#8b5cf6', label: 'Need', sublabel: 'Retrieval?', minWidth: '50px' },
                { id: 'a2', left: '29%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'vdb', left: '33%', top: '35%', bg: '#06b6d4', label: 'Retrieve', minWidth: '55px' },
                { id: 'a3', left: '46%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 't2', left: '50%', top: '28%', bg: '#f97316', label: 'Relevant?', sublabel: 'ISREL', minWidth: '55px' },
                { id: 'a4', left: '63%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'gen', left: '67%', top: '28%', bg: '#10b981', label: 'Generate', sublabel: 'ISSUP?', minWidth: '55px' },
                { id: 'a5', left: '80%', top: '42%', bg: 'transparent', label: '➔' },
                { id: 'out', left: '84%', top: '28%', bg: '#f59e0b', label: 'Output', sublabel: 'ISUSE?', minWidth: '50px' },
              ]}
              steps={[['q', 'a1', 't1'], ['a2', 'vdb'], ['a3', 't2'], ['a4', 'gen'], ['a5', 'out']]}
              descriptions={[
                "1. Reflection: Does this query need retrieval, or can I answer directly?",
                "2. If yes, retrieve relevant chunks from the knowledge base.",
                "3. Reflection: ISREL — Is this chunk actually relevant to the query?",
                "4. Generate answer, then reflect: ISSUP — Is my answer supported by the evidence?",
                "5. Final reflection: ISUSE — Is this output actually useful? If not, loop back.",
              ]}
            />
          </RagTypeCard>
        </div>

        {/* ── Comparison Table ── */}
        <motion.section 
          id="comparison"
          className="bg-[#111] border border-gray-800 rounded-2xl p-5 sm:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Comparison Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="py-3 pr-4 font-semibold">Architecture</th>
                  <th className="py-3 pr-4 font-semibold">Retrieval Quality</th>
                  <th className="py-3 pr-4 font-semibold">Complexity</th>
                  <th className="py-3 pr-4 font-semibold">Latency</th>
                  <th className="py-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800"><td className="py-2.5 pr-4 text-white font-medium">Naive RAG</td><td className="py-2.5 pr-4">⭐⭐</td><td className="py-2.5 pr-4">Low</td><td className="py-2.5 pr-4">⚡ Fast</td><td className="py-2.5">Simple Q&A</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2.5 pr-4 text-white font-medium">Advanced RAG</td><td className="py-2.5 pr-4">⭐⭐⭐⭐</td><td className="py-2.5 pr-4">Medium</td><td className="py-2.5 pr-4">Medium</td><td className="py-2.5">Production apps</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2.5 pr-4 text-white font-medium">Hybrid RAG</td><td className="py-2.5 pr-4">⭐⭐⭐⭐</td><td className="py-2.5 pr-4">Medium</td><td className="py-2.5 pr-4">Medium</td><td className="py-2.5">Mixed query types</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2.5 pr-4 text-white font-medium">Agentic RAG</td><td className="py-2.5 pr-4">⭐⭐⭐⭐⭐</td><td className="py-2.5 pr-4">High</td><td className="py-2.5 pr-4">Variable</td><td className="py-2.5">Complex research</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2.5 pr-4 text-white font-medium">Graph RAG</td><td className="py-2.5 pr-4">⭐⭐⭐⭐</td><td className="py-2.5 pr-4">High</td><td className="py-2.5 pr-4">Medium</td><td className="py-2.5">Relationship queries</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2.5 pr-4 text-white font-medium">Multimodal</td><td className="py-2.5 pr-4">⭐⭐⭐</td><td className="py-2.5 pr-4">High</td><td className="py-2.5 pr-4">🐢 Slow</td><td className="py-2.5">Images + text</td></tr>
                <tr className="border-b border-gray-800"><td className="py-2.5 pr-4 text-white font-medium">CRAG</td><td className="py-2.5 pr-4">⭐⭐⭐⭐</td><td className="py-2.5 pr-4">Medium</td><td className="py-2.5 pr-4">Medium</td><td className="py-2.5">Evolving knowledge</td></tr>
                <tr><td className="py-2.5 pr-4 text-white font-medium">Self-RAG</td><td className="py-2.5 pr-4">⭐⭐⭐⭐⭐</td><td className="py-2.5 pr-4">Very High</td><td className="py-2.5 pr-4">🐢 Slow</td><td className="py-2.5">High-stakes accuracy</td></tr>
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';
import AdvancedFlowchart from '../components/AdvancedFlowchart';
import * as charts from '../data/flowcharts';

export default function RagTypes() {
  const toc = [
    { label: "Vector vs Vectorless", hash: "vector-vs-vectorless" },
    { label: "Vectorless RAG", hash: "vectorless-rag" },
    { label: "Naive RAG", hash: "naive-rag" },
    { label: "Advanced RAG", hash: "advanced-rag" },
    { label: "Hybrid RAG", hash: "hybrid-rag" },
    { label: "Agentic RAG", hash: "agentic-rag" },
    { label: "GraphRAG", hash: "graph-rag" },
    { label: "Corrective RAG (CRAG)", hash: "crag" },
    { label: "Multimodal RAG", hash: "multimodal-rag" },
    { label: "Self-RAG", hash: "self-rag" },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <GuideLayout
      title="Types of RAG"
      intro="The 10 most important RAG architectures visualized."
      toc={toc}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="space-y-16"
      >
        <motion.section variants={itemVariants} id="vector-vs-vectorless">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">1. Vector vs Vectorless RAG</h3>
          <p className="text-sm text-gray-300 mb-4">A direct comparison. Vector RAG uses Embedding Models to find semantic meaning (e.g. "dogs" matches "puppies"). Vectorless RAG skips embeddings entirely and uses exact keyword matching (BM25) or SQL queries, which is cheaper and faster but misses semantic context.</p>
          <AdvancedFlowchart nodes={charts.vectorVsVectorless.nodes} edges={charts.vectorVsVectorless.edges} currentStep={10} />
        </motion.section>

        <motion.section variants={itemVariants} id="vectorless-rag">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">2. Vectorless RAG</h3>
          <p className="text-sm text-gray-300 mb-4">Skips the embedding model entirely. Queries an exact-match index (like Elasticsearch/BM25) to retrieve documents before passing them to the LLM.</p>
          <AdvancedFlowchart nodes={charts.vectorlessRag.nodes} edges={charts.vectorlessRag.edges} currentStep={10} />
        </motion.section>

        <motion.section variants={itemVariants} id="naive-rag">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">3. Naive RAG</h3>
          <p className="text-sm text-gray-300 mb-4">The baseline pattern. The user query is embedded and used to search a vector database via cosine similarity.</p>
          <AdvancedFlowchart nodes={charts.naiveRag.nodes} edges={charts.naiveRag.edges} currentStep={10} />
        </motion.section>

        <motion.section variants={itemVariants} id="advanced-rag">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">4. Advanced RAG</h3>
          <p className="text-sm text-gray-300 mb-4">Adds Pre-Retrieval (Query Rewriting) and Post-Retrieval (Reranking) to ensure only the highest quality chunks reach the LLM.</p>
          <AdvancedFlowchart nodes={charts.advancedRag.nodes} edges={charts.advancedRag.edges} currentStep={10} />
        </motion.section>

        <motion.section variants={itemVariants} id="hybrid-rag">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">5. Hybrid RAG</h3>
          <p className="text-sm text-gray-300 mb-4">Dense vectors meet sparse keywords. Performs two searches simultaneously and merges the results using Reciprocal Rank Fusion.</p>
          <AdvancedFlowchart nodes={charts.hybridRag.nodes} edges={charts.hybridRag.edges} currentStep={10} />
        </motion.section>
        
        <motion.section variants={itemVariants} id="agentic-rag">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">6. Agentic RAG</h3>
          <p className="text-sm text-gray-300 mb-4">Retrieval becomes a plan, not a step. An agent determines which databases (Vector, Web, SQL) to search, evaluates the results, and loops until confident.</p>
          <AdvancedFlowchart nodes={charts.agenticRag.nodes} edges={charts.agenticRag.edges} currentStep={10} />
        </motion.section>

        <motion.section variants={itemVariants} id="graph-rag">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">7. GraphRAG</h3>
          <p className="text-sm text-gray-300 mb-4">Answers live in the relationships. Extracts entities to build a Knowledge Graph, then retrieves subgraphs to formulate comprehensive answers.</p>
          <AdvancedFlowchart nodes={charts.graphRag.nodes} edges={charts.graphRag.edges} currentStep={10} />
        </motion.section>
        
        <motion.section variants={itemVariants} id="crag">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">8. Corrective RAG (CRAG)</h3>
          <p className="text-sm text-gray-300 mb-4">Grade the retrieval before you trust it. Uses a Grader to branch execution based on whether the retrieved docs are Correct, Ambiguous, or Incorrect.</p>
          <AdvancedFlowchart nodes={charts.crag.nodes} edges={charts.crag.edges} currentStep={10} />
        </motion.section>
        
        <motion.section variants={itemVariants} id="multimodal-rag">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">9. Multimodal RAG</h3>
          <p className="text-sm text-gray-300 mb-4">One index across text, images, and tables. Uses models like CLIP/ColPali to map different data modalities into a single shared vector space.</p>
          <AdvancedFlowchart nodes={charts.multimodalRag.nodes} edges={charts.multimodalRag.edges} currentStep={10} />
        </motion.section>

        <motion.section variants={itemVariants} id="self-rag">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">10. Self-RAG</h3>
          <p className="text-sm text-gray-300 mb-4">The LLM self-reflects during generation, emitting tokens like [ISUSE] to critique its own retrieval and potentially re-query if dissatisfied.</p>
          <AdvancedFlowchart nodes={charts.selfRag.nodes} edges={charts.selfRag.edges} currentStep={10} />
        </motion.section>

      </motion.div>
    </GuideLayout>
  );
}

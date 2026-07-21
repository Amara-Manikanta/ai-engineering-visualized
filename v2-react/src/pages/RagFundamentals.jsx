import React from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";
import AdvancedFlowchart from "../components/AdvancedFlowchart";
import * as charts from "../data/flowcharts";

export default function RagFundamentals() {
  const toc = [
    { label: "What is RAG?", hash: "what-is-rag" },
    { label: "Why RAG?", hash: "why-rag" },
    { label: "Architecture", hash: "architecture" },
    { label: "Advantages", hash: "advantages" },
    { label: "Limitations", hash: "limitations" },
    { label: "vs Fine-tuning", hash: "vs-finetuning" },
    { label: "vs Long Context", hash: "vs-longcontext" },
    { label: "Use Cases", hash: "use-cases" },
    { label: "10 RAG Architectures", hash: "rag-architectures" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 },
    },
  };

  return (
    <GuideLayout
      title="RAG Fundamentals"
      intro="Core concepts behind Retrieval-Augmented Generation."
      toc={toc}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.section variants={itemVariants}>
          <h2 id="what-is-rag" className="text-2xl font-semibold mb-4 text-white">What is RAG?</h2>
          <p className="text-gray-300 leading-relaxed">
            Retrieval-Augmented Generation (RAG) is an architecture that provides Large Language Models (LLMs) with external, factual data retrieved from a custom knowledge base before they generate a response. This grounds the AI in reality rather than relying solely on its pre-trained weights.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 id="why-rag" className="text-2xl font-semibold mb-4 text-white">Why RAG?</h2>
          <p className="text-gray-300 leading-relaxed">
            LLMs have two major flaws: they hallucinate facts and their knowledge is frozen in time. RAG solves both by forcing the model to cite retrieved documents, allowing for real-time updates without retraining.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 id="architecture" className="text-2xl font-semibold mb-4 text-white">RAG Architecture & Pipeline</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A standard RAG pipeline operates in two distinct phases:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><strong className="text-white">Phase 1 (Indexing):</strong> Documents are loaded, chunked, converted into vector embeddings, and stored in a vector database.</li>
            <li><strong className="text-white">Phase 2 (Retrieval & Generation):</strong> A user's query is converted to a vector, the DB finds the most semantically similar chunks, and these chunks are injected into the LLM's prompt to answer the query.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 id="advantages" className="text-2xl font-semibold mb-4 text-white">Advantages of RAG</h2>
          <p className="text-gray-300 leading-relaxed">
            RAG offers high accuracy, verifiable citations, the ability to restrict access via metadata filtering, and vastly lower costs compared to fine-tuning.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 id="limitations" className="text-2xl font-semibold mb-4 text-white">Limitations of RAG</h2>
          <p className="text-gray-300 leading-relaxed">
            RAG struggles with tasks requiring a holistic understanding of a massive document (e.g. "summarize this entire book"), heavily relies on chunking strategies, and introduces latency during the retrieval step.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 id="vs-finetuning" className="text-2xl font-semibold mb-4 text-white">RAG vs Fine-tuning</h2>
          <p className="text-gray-300 leading-relaxed">
            Fine-tuning is for changing <em className="italic text-gray-200">behavior, tone, or format</em>. RAG is for updating <em className="italic text-gray-200">knowledge and facts</em>. They are often used together.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 id="vs-longcontext" className="text-2xl font-semibold mb-4 text-white">RAG vs Long Context Models</h2>
          <p className="text-gray-300 leading-relaxed">
            While models now support 1M+ tokens, stuffing everything into context is expensive, slow, and suffers from "lost in the middle" degradation. RAG remains cheaper, faster, and more precise for factual retrieval.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 id="use-cases" className="text-2xl font-semibold mb-4 text-white">Ideal Use Cases</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Internal Knowledge Bases:</strong> Q&A over company wikis or technical docs.</li>
            <li><strong>Customer Support:</strong> AI agents that search support tickets to solve issues.</li>
            <li><strong>Legal/Medical Analysis:</strong> Summarizing or querying massive regulatory/case law documents.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="mt-16 pt-8 border-t border-gray-800">
          <h2 id="rag-architectures" className="text-3xl font-bold mb-4 text-white">RAG Architectures In Detail</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            While basic RAG is a straight line, real-world systems use complex, branching architectures to improve accuracy and handle diverse data. Below are the 10 most important patterns you must know.
          </p>
          
          <div className="space-y-16">
            
            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">1. Vector vs Vectorless RAG</h3>
              <p className="text-sm text-gray-400 mb-4">A direct comparison. Vector RAG uses Embedding Models to find semantic meaning (e.g. "dogs" matches "puppies"). Vectorless RAG skips embeddings entirely and uses exact keyword matching (BM25) or SQL queries, which is cheaper and faster but misses semantic context.</p>
              <AdvancedFlowchart nodes={charts.vectorVsVectorless.nodes} edges={charts.vectorVsVectorless.edges} currentStep={10} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">2. Vectorless RAG</h3>
              <p className="text-sm text-gray-400 mb-4">Skips the embedding model entirely. Queries an exact-match index (like Elasticsearch/BM25) to retrieve documents before passing them to the LLM.</p>
              <AdvancedFlowchart nodes={charts.vectorlessRag.nodes} edges={charts.vectorlessRag.edges} currentStep={10} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">3. Naive RAG</h3>
              <p className="text-sm text-gray-400 mb-4">The baseline pattern. The user query is embedded and used to search a vector database via cosine similarity.</p>
              <AdvancedFlowchart nodes={charts.naiveRag.nodes} edges={charts.naiveRag.edges} currentStep={10} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">4. Advanced RAG</h3>
              <p className="text-sm text-gray-400 mb-4">Adds Pre-Retrieval (Query Rewriting) and Post-Retrieval (Reranking) to ensure only the highest quality chunks reach the LLM.</p>
              <AdvancedFlowchart nodes={charts.advancedRag.nodes} edges={charts.advancedRag.edges} currentStep={10} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">5. Hybrid RAG</h3>
              <p className="text-sm text-gray-400 mb-4">Dense vectors meet sparse keywords. Performs two searches simultaneously and merges the results using Reciprocal Rank Fusion.</p>
              <AdvancedFlowchart nodes={charts.hybridRag.nodes} edges={charts.hybridRag.edges} currentStep={10} />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">6. Agentic RAG</h3>
              <p className="text-sm text-gray-400 mb-4">Retrieval becomes a plan, not a step. An agent determines which databases (Vector, Web, SQL) to search, evaluates the results, and loops until confident.</p>
              <AdvancedFlowchart nodes={charts.agenticRag.nodes} edges={charts.agenticRag.edges} currentStep={10} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">7. GraphRAG</h3>
              <p className="text-sm text-gray-400 mb-4">Answers live in the relationships. Extracts entities to build a Knowledge Graph, then retrieves subgraphs to formulate comprehensive answers.</p>
              <AdvancedFlowchart nodes={charts.graphRag.nodes} edges={charts.graphRag.edges} currentStep={10} />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">8. Corrective RAG (CRAG)</h3>
              <p className="text-sm text-gray-400 mb-4">Grade the retrieval before you trust it. Uses a Grader to branch execution based on whether the retrieved docs are Correct, Ambiguous, or Incorrect.</p>
              <AdvancedFlowchart nodes={charts.crag.nodes} edges={charts.crag.edges} currentStep={10} />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">9. Multimodal RAG</h3>
              <p className="text-sm text-gray-400 mb-4">One index across text, images, and tables. Uses models like CLIP/ColPali to map different data modalities into a single shared vector space.</p>
              <AdvancedFlowchart nodes={charts.multimodalRag.nodes} edges={charts.multimodalRag.edges} currentStep={10} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">10. Self-RAG</h3>
              <p className="text-sm text-gray-400 mb-4">The LLM self-reflects during generation, emitting tokens like [ISUSE] to critique its own retrieval and potentially re-query if dissatisfied.</p>
              <AdvancedFlowchart nodes={charts.selfRag.nodes} edges={charts.selfRag.edges} currentStep={10} />
            </div>

          </div>
        </motion.section>
      </motion.div>
    </GuideLayout>
  );
}

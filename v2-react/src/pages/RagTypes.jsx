import React from 'react';
import GuideLayout from '../components/GuideLayout';
import { motion } from 'framer-motion';

const toc = [
  { label: 'Architectures', hash: '#architectures' }
];

const RagTypes = () => {
  return (
    <GuideLayout
      title="Types of RAG"
      intro="Beyond Naive RAG: Architectural patterns for complex reasoning."
      toc={toc}
    >
      <div className="space-y-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          id="architectures" 
          className="scroll-mt-24"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Part 11
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Architectures</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-3">
            <li><strong className="text-white">Standard (Naive) RAG:</strong> The baseline Retrieve-Read-Generate loop.</li>
            <li><strong className="text-white">Advanced RAG:</strong> Includes pre-retrieval query rewriting and post-retrieval reranking.</li>
            <li><strong className="text-white">Conversational RAG:</strong> Adds memory to the pipeline. The LLM condenses the chat history and the new question into a standalone query before searching.</li>
            <li><strong className="text-white">Adaptive RAG:</strong> A router decides if a query needs RAG, a web search, or just a direct LLM response.</li>
            <li><strong className="text-white">Corrective RAG (CRAG):</strong> Evaluates retrieval. If bad, it falls back to a web search.</li>
            <li><strong className="text-white">Self-RAG:</strong> The model generates reflection tokens to critique its own retrieval and output, looping if necessary.</li>
            <li><strong className="text-white">Fusion RAG (RAG-Fusion):</strong> Generates multiple queries, retrieves for all, and uses Reciprocal Rank Fusion to re-order the results.</li>
            <li><strong className="text-white">GraphRAG:</strong> Uses Knowledge Graphs to retrieve entities and relationships, perfect for "connect the dots" questions.</li>
            <li><strong className="text-white">Agentic RAG:</strong> An autonomous agent uses RAG as a tool, deciding when and what to search for in a loop.</li>
            <li><strong className="text-white">Multimodal RAG:</strong> Embeds and retrieves images, audio, and text simultaneously using CLIP models.</li>
            <li><strong className="text-white">Hierarchical RAG:</strong> Summarizes documents. Searches the summaries first, then dives into the full text of the best matching summary.</li>
          </ul>
        </motion.section>
      </div>
    </GuideLayout>
  );
};

export default RagTypes;

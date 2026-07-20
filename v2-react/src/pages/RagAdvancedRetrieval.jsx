import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagAdvancedRetrieval() {
  const toc = [
    { label: "Retrieval Optimization", hash: "techniques" }
  ];

  return (
    <GuideLayout
      title="Advanced Retrieval Techniques"
      intro="Optimizing the search step for maximum precision."
      toc={toc}
    >
      <div className="space-y-12">
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="techniques" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Retrieval Optimization</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            If the retrieval step fails, the generation step fails. These techniques fix retrieval:
          </p>
          <ul className="list-disc list-inside space-y-3 text-gray-300 ml-4">
            <li><strong className="text-white">Hybrid Search:</strong> Combining Vector Search (semantics) with BM25 (keywords) to catch both meaning and exact IDs.</li>
            <li><strong className="text-white">Query Rewriting & Expansion:</strong> Using an LLM to fix typos, add synonyms, or expand a vague user query into a highly descriptive search query.</li>
            <li><strong className="text-white">Query Decomposition:</strong> Breaking a complex question ("Did company A or B have higher revenue?") into sub-queries, retrieving for both separately.</li>
            <li><strong className="text-white">HyDE (Hypothetical Document Embeddings):</strong> Generating a fake answer, embedding it, and searching for vectors similar to the fake answer rather than the question.</li>
            <li><strong className="text-white">Parent-Child Retrieval:</strong> Indexing tiny chunks for accurate search, but returning the large parent chunk to the LLM to preserve surrounding context.</li>
            <li><strong className="text-white">Contextual Retrieval:</strong> Appending a summary of the parent document to every single child chunk so the chunk never loses its global meaning when embedded.</li>
            <li><strong className="text-white">Re-ranking:</strong> Using a Cross-Encoder to re-score and re-sort the Top 100 results from the vector DB based on true relevance.</li>
          </ul>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

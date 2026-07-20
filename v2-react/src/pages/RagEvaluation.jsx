import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagEvaluation() {
  const toc = [
    { label: "Evaluation Metrics", hash: "metrics" },
    { label: "Precision vs Recall vs MRR vs NDCG", hash: "precision-recall" },
    { label: "Human vs Automated Evaluation", hash: "human-vs-auto" },
    { label: "RAG Failure Modes", hash: "failure-modes" }
  ];

  return (
    <GuideLayout
      title="Evaluation"
      intro="Measuring the success of your RAG pipeline."
      toc={toc}
    >
      <div className="space-y-12">
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="metrics" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Evaluation Metrics</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            You cannot improve what you cannot measure. RAG systems are typically evaluated using frameworks like RAGAS or TruLens across several dimensions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
            <li><strong className="text-white">Faithfulness (Groundedness):</strong> Is the generated answer entirely derived from the retrieved context? (Measures Hallucination).</li>
            <li><strong className="text-white">Answer Relevancy:</strong> Does the generated answer actually address the user's question?</li>
            <li><strong className="text-white">Context Precision:</strong> Did the retriever find the relevant documents, and were they ranked at the top?</li>
            <li><strong className="text-white">Context Recall:</strong> Did the retriever find ALL the necessary information required to answer the question?</li>
          </ul>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="precision-recall" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Precision vs Recall vs MRR vs NDCG</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Traditional search metrics apply to the retrieval phase:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
            <li><strong className="text-white">Precision:</strong> Out of the chunks retrieved, how many were relevant?</li>
            <li><strong className="text-white">Recall:</strong> Out of all relevant chunks in the database, how many did we retrieve?</li>
            <li><strong className="text-white">MRR (Mean Reciprocal Rank):</strong> How far down the list was the first relevant chunk?</li>
            <li><strong className="text-white">NDCG:</strong> Measures the quality of the ranking order.</li>
          </ul>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="human-vs-auto" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Human vs Automated Evaluation</h2>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Human Evaluation</strong> is the gold standard but slow and expensive. <strong className="text-white">Automated Evaluation (LLM-as-a-Judge)</strong> uses a powerful model (like GPT-4) to grade the outputs of your RAG pipeline against a golden dataset.
          </p>
        </motion.section>
        
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="failure-modes" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">RAG Failure Modes</h2>
          <p className="text-gray-300 leading-relaxed">
            The "Seven Failure Points of RAG" include: Missing content in the DB, missing the top-K cutoff, context not fitting in the prompt, extraction errors, incorrect formatting, lack of specificity, and flat-out hallucination.
          </p>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

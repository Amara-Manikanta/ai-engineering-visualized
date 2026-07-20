import React from 'react';
import GuideLayout from '../components/GuideLayout';

const toc = [
  { label: 'Frameworks', hash: '#frameworks' },
  { label: 'Building a RAG Pipeline', hash: '#building' },
  { label: 'Production Best Practices', hash: '#production' }
];

const RagDevelopment = () => {
  return (
    <GuideLayout
      title="Development & Frameworks"
      intro="Building and deploying RAG in the real world."
      toc={toc}
    >
      <section className="mb-12" id="frameworks">
        <h2 className="text-2xl font-bold mb-4 text-white">Frameworks</h2>
        <p className="text-gray-300 mb-4">You don't need to write vector math from scratch. The Python ecosystem is dominated by powerful orchestrators:</p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li><strong className="text-white">LangChain:</strong> The most popular, highly modular framework for chaining components.</li>
          <li><strong className="text-white">LlamaIndex:</strong> Heavily specialized in data ingestion, indexing, and complex retrieval strategies.</li>
          <li><strong className="text-white">Haystack:</strong> A robust framework by deepset, excellent for production search systems.</li>
          <li><strong className="text-white">DSPy:</strong> A newer framework that compiles and optimizes prompts automatically.</li>
          <li><strong className="text-white">Semantic Kernel:</strong> Microsoft's C#/Python SDK for enterprise integration.</li>
        </ul>
      </section>

      <section className="mb-12" id="building">
        <h2 className="text-2xl font-bold mb-4 text-white">Building a RAG Pipeline (Python)</h2>
        <p className="text-gray-300 mb-4">A basic pipeline involves initializing a <code className="bg-[#222] px-1 rounded text-sm text-pink-400">DocumentLoader</code>, a <code className="bg-[#222] px-1 rounded text-sm text-pink-400">TextSplitter</code>, an <code className="bg-[#222] px-1 rounded text-sm text-pink-400">Embeddings</code> model, a <code className="bg-[#222] px-1 rounded text-sm text-pink-400">VectorStore</code>, and an <code className="bg-[#222] px-1 rounded text-sm text-pink-400">LLM</code>, then chaining them together into a <code className="bg-[#222] px-1 rounded text-sm text-pink-400">RetrievalQA</code> chain.</p>
      </section>

      <section className="mb-12" id="production">
        <h2 className="text-2xl font-bold mb-4 text-white">Production Best Practices</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li><strong className="text-white">Deployment:</strong> Containerize with Docker, use managed Vector DBs, and deploy via FastAPI or Ray Serve.</li>
          <li><strong className="text-white">Monitoring:</strong> Log every query, retrieved chunks, and generated answer using tools like LangSmith or Phoenix to track token usage and latency.</li>
          <li><strong className="text-white">Security:</strong> Prevent Prompt Injection. Ensure the LLM cannot access documents the user doesn't have permissions for by strictly enforcing Metadata filtering on the Vector DB query.</li>
        </ul>
      </section>
    </GuideLayout>
  );
};

export default RagDevelopment;

import React from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function RagVectorDbs() {
  const toc = [
    { label: "What is a Vector Database?", hash: "what-is-vdb" },
    { label: "Popular Vector Databases", hash: "popular-vdbs" },
    { label: "Vector Index Types", hash: "index-types" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
      title="Vector Databases"
      intro="Specialized databases designed to store and query high-dimensional embeddings."
      toc={toc}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.section variants={itemVariants}>
          <h2 id="what-is-vdb" className="text-2xl font-semibold mb-4 text-white">What is a Vector Database?</h2>
          <p className="text-gray-300 leading-relaxed">
            Traditional SQL databases are built for exact matches (<code className="bg-white/10 px-1 py-0.5 rounded text-sm text-pink-300">WHERE id = 5</code>). Vector DBs are built for approximate similarity search. They use specialized indexing algorithms (like HNSW) to find the "nearest neighbors" to a query vector in milliseconds.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 id="popular-vdbs" className="text-2xl font-semibold mb-4 text-white">Popular Vector Databases</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-300">
            <li><strong className="text-white">Pinecone / Weaviate / Milvus:</strong> Purpose-built, highly scalable distributed vector databases.</li>
            <li><strong className="text-white">Chroma / Qdrant:</strong> Excellent open-source options (Qdrant is written in Rust and highly performant).</li>
            <li><strong className="text-white">pgvector:</strong> A PostgreSQL extension that turns a traditional relational DB into a vector DB, simplifying architecture.</li>
            <li><strong className="text-white">Elasticsearch / OpenSearch:</strong> Traditional search engines that have added robust dense vector support alongside their BM25 capabilities.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 id="index-types" className="text-2xl font-semibold mb-4 text-white">Vector Index Types</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            To avoid scanning every single vector (Flat/Brute-force search), DBs use indexes:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-300">
            <li><strong className="text-white">HNSW (Hierarchical Navigable Small World):</strong> A multi-layered graph algorithm. Highly accurate and fast, but uses a lot of RAM.</li>
            <li><strong className="text-white">IVF (Inverted File Index):</strong> Clusters vectors into groups. Searches only the clusters closest to the query.</li>
          </ul>
        </motion.section>
      </motion.div>
    </GuideLayout>
  );
}

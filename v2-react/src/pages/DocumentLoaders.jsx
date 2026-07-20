import GuideLayout from "../components/GuideLayout";
import { motion } from "framer-motion";

export default function DocumentLoaders() {
  const toc = [
    { label: "1. What is a Loader?", hash: "#what-is" },
    { label: "2. Why are they needed?", hash: "#why-loaders" },
    { label: "3. The Document Object", hash: "#doc-object" },
    { label: "3.1 page_content", hash: "#page-content", indent: true },
    { label: "3.2 metadata", hash: "#metadata", indent: true },
    { label: "4. Loading Pipeline", hash: "#pipeline" },
  ];

  return (
    <GuideLayout 
      title="Document Loaders"
      intro="The foundational entry point for injecting proprietary data into the LangChain and RAG ecosystems."
      toc={toc}
    >
      <section id="what-is" className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">1. What is a Document Loader?</h2>
        <p className="text-gray-400 leading-relaxed">
          A Document Loader is a class in LangChain responsible for ingesting data from a source (a file, a database, a web page, an S3 bucket) and converting it into a standardized <code className="bg-white/5 px-1.5 py-0.5 rounded text-indigo-300">Document</code> format that the rest of the LangChain ecosystem can understand.
        </p>
      </section>

      <section id="pipeline" className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">4. Loading Pipeline</h2>
        <p className="text-gray-400 leading-relaxed mb-6">Here is an enhanced visual representation of how raw files are ingested:</p>
        
        <div className="bg-[#141414] border border-white/10 rounded-xl p-8 flex items-center justify-center gap-6 overflow-hidden">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a1a] border-2 border-orange-500/50 rounded-xl p-6 text-center font-bold relative z-10"
            >
              <span className="block text-3xl mb-2">📄</span>
              Raw PDF
            </motion.div>

            <div className="relative w-20 h-1 bg-white/10">
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-indigo-500 rounded-sm"
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1a1a1a] border-2 border-blue-500/50 rounded-xl p-6 text-center font-bold relative z-10"
            >
              <span className="block text-3xl mb-2">⚙️</span>
              PyPDFLoader
            </motion.div>

            <div className="relative w-20 h-1 bg-white/10">
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-indigo-500 rounded-sm"
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-[#1a1a1a] border-2 border-green-500/50 rounded-xl p-6 text-center font-bold relative z-10"
            >
              <span className="block text-3xl mb-2">📦</span>
              Document
            </motion.div>
        </div>
      </section>

    </GuideLayout>
  );
}

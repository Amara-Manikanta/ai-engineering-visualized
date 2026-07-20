import GuideLayout from "../components/GuideLayout";
import { motion } from "framer-motion";

export default function Langchain() {
  const toc = [
    { label: "1. What is LangChain?", hash: "#what-is" },
    { label: "2. Why LangChain?", hash: "#why-langchain" },
    { label: "3. Architecture", hash: "#architecture" },
    { label: "4. Installation", hash: "#installation" },
    { label: "5. Project Structure", hash: "#structure" },
    { label: "6. LCEL", hash: "#lcel" },
    { label: "6.1 What is LCEL?", hash: "#lcel-what", indent: true },
    { label: "6.2 Why LCEL?", hash: "#lcel-why", indent: true },
    { label: "6.3 Pipe Operator (|)", hash: "#pipe", indent: true },
    { label: "6.4 Runnable Interface", hash: "#runnable", indent: true },
    { label: "7. LangSmith", hash: "#langsmith" },
  ];

  return (
    <GuideLayout 
      title="LangChain Guide"
      intro="The framework for developing applications powered by large language models."
      toc={toc}
    >
      <section id="lcel" className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">6. LCEL (LangChain Expression Language)</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          LCEL provides a standardized, declarative way to compose different components (Runnables) into chains.
        </p>

        <h3 id="pipe" className="text-xl font-bold text-indigo-400 mt-8 mb-4">6.3 Pipe Operator (|)</h3>
        <p className="text-gray-400 leading-relaxed mb-6">The pipe operator automatically passes the output of the left component directly into the input of the right component.</p>
        
        {/* Enhanced Framer Motion Pipeline Animation */}
        <div className="bg-[#141414] border border-white/10 rounded-xl p-8 flex flex-col lg:flex-row items-center justify-center gap-4 overflow-hidden min-h-[200px]">
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1a1a1a] border-2 border-orange-500/50 rounded-xl p-4 text-center z-10 w-32"
            >
              <div className="text-orange-400 font-bold mb-1">Dict</div>
              <div className="text-xs text-gray-500 font-mono">{'{"topic": "cats"}'}</div>
            </motion.div>

            <div className="relative w-16 h-1 bg-white/10 hidden lg:block">
              <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full" animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
            </div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a1a] border-2 border-blue-500/50 rounded-xl p-4 text-center z-10 w-32"
            >
              <div className="text-blue-400 font-bold">Prompt</div>
            </motion.div>

            <div className="relative w-16 h-1 bg-white/10 hidden lg:block">
              <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full" animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }} />
            </div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1a1a1a] border-2 border-green-500/50 rounded-xl p-4 text-center z-10 w-32"
            >
              <div className="text-green-400 font-bold mb-1">LLM</div>
              <div className="text-xs text-gray-500 font-mono">Ollama</div>
            </motion.div>

            <div className="relative w-16 h-1 bg-white/10 hidden lg:block">
              <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full" animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1 }} />
            </div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-[#1a1a1a] border-2 border-purple-500/50 rounded-xl p-4 text-center z-10 w-32"
            >
              <div className="text-purple-400 font-bold">StrParser</div>
            </motion.div>

        </div>
      </section>

      <section id="runnable" className="border-b border-white/10 pb-8 mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">6.4 Runnable Interface</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Every element in LCEL implements the <code className="bg-white/5 px-1.5 py-0.5 rounded text-indigo-300">Runnable</code> protocol. This means they all share the exact same methods:
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
          <li><code className="text-indigo-300">invoke()</code>: Call the chain on a single input.</li>
          <li><code className="text-indigo-300">batch()</code>: Call the chain on a list of inputs.</li>
          <li><code className="text-indigo-300">stream()</code>: Stream back chunks of the response.</li>
        </ul>
      </section>

    </GuideLayout>
  );
}

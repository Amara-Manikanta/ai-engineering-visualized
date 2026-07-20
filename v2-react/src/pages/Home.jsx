import GlobalHeader from "../components/GlobalHeader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Brain, Sparkles, Database, Cpu, Bot, ArrowRight } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const features = [
    { title: "Python Basics", desc: "The foundation of AI", path: "/python", icon: <Code size={24} className="text-blue-400" />, color: "from-blue-500/20 to-blue-600/5" },
    { title: "Machine Learning", desc: "Models that learn from data", path: "/ml", icon: <Brain size={24} className="text-emerald-400" />, color: "from-emerald-500/20 to-emerald-600/5" },
    { title: "Generative AI", desc: "Creating new content", path: "/genai", icon: <Sparkles size={24} className="text-purple-400" />, color: "from-purple-500/20 to-purple-600/5" },
    { title: "RAG Architecture", desc: "Retrieval-Augmented Gen", path: "/rag/fundamentals", icon: <Database size={24} className="text-amber-400" />, color: "from-amber-500/20 to-amber-600/5" },
    { title: "LLMs Deep Dive", desc: "Large Language Models", path: "/llms", icon: <Cpu size={24} className="text-rose-400" />, color: "from-rose-500/20 to-rose-600/5" },
    { title: "Agentic AI", desc: "Autonomous AI Agents", path: "/agents", icon: <Bot size={24} className="text-cyan-400" />, color: "from-cyan-500/20 to-cyan-600/5" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans relative overflow-hidden flex flex-col">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/30 blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-purple-900/20 blur-[100px] mix-blend-screen"></div>
      </div>

      <GlobalHeader />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-6xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md">
              <span className="text-sm font-semibold text-indigo-300 tracking-wider uppercase">Interactive Learning Platform</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              Master AI Engineering. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Visually.
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Explore step-by-step, animated explainers covering everything from basic Python to advanced autonomous Agentic AI architectures.
            </motion.p>
          </div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to={feature.path} className={`block h-full p-8 rounded-2xl border border-white/5 bg-gradient-to-br ${feature.color} backdrop-blur-xl hover:border-white/20 transition-colors group relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="text-white/50" />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 font-medium">{feature.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

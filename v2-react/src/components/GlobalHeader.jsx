import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import CommandPalette from "./CommandPalette";

const NAV_LINKS = [
  { 
    name: "🐍 Python", 
    path: "/python",
    subLinks: [
      { name: "Python Overview", path: "/python" },
      { name: "1. Python Foundations", path: "/python/foundations" },
      { name: "2. Data Structures & Functions", path: "/python/data-structures" },
      { name: "3. OOP & Advanced Python", path: "/python/advanced" },
      { name: "4. System, Tooling & Async", path: "/python/tooling-async" },
      { name: "5. Data Science & ML", path: "/python/data-science" },
      { name: "6. Regular Expressions", path: "/python/regex" },
    ],
  },
  {
    name: "🤖 ML",
    path: "/ml",
    subLinks: [
      { name: "Introduction", path: "/ml" },
      { name: "Foundations", isHeader: true },
      { name: "Supervised", path: "/ml/supervised" },
      { name: "Unsupervised", path: "/ml/unsupervised" },
      { name: "Classical", isHeader: true },
      { name: "Linear Reg", path: "/ml/linear-regression" },
      { name: "Multi Reg", path: "/ml/multiple-regression" },
      { name: "Logistic Reg", path: "/ml/logistic-regression" },
      { name: "Decision Trees", path: "/ml/decision-trees" },
      { name: "KNN", path: "/ml/knn" },
      { name: "SVM", path: "/ml/svm" },
      { name: "Ensembles", isHeader: true },
      { name: "Random Forests", path: "/ml/random-forests" },
      { name: "XGBoost", path: "/ml/xgboost" },
      { name: "Deep Learning", isHeader: true },
      { name: "Neural Networks", path: "/ml/deep-learning" },
      { name: "CNNs", path: "/ml/cnn" },
      { name: "RNNs & LSTMs", path: "/ml/rnn" },
      { name: "GANs", path: "/ml/gans" },
      { name: "NLP", path: "/ml/nlp" },
      { name: "Transformers", path: "/ml/transformers" },
      { name: "Mamba / SSM", path: "/ml/mamba" },
      { name: "RWKV", path: "/ml/rwkv" },
    ],
  },
  {
    name: "✨ GenAI",
    path: "/genai",
    subLinks: [
      { name: "AI Models", path: "/llms" },
      { name: "Model Types", isHeader: true },
      { name: "LLM", path: "/llms/llm-type" },
      { name: "VLM — Vision", path: "/llms/vlm-type" },
      { name: "SLM — Small", path: "/llms/slm-type" },
      { name: "MoE — Experts", path: "/llms/moe-type" },
      { name: "LCM — Concept", path: "/llms/lcm-type" },
      { name: "LAM — Action", path: "/llms/lam-type" },
      { name: "Core", isHeader: true },
      { name: "LLM Inference", path: "/llm-inference" },
      { name: "Efficient Inference", path: "/efficiency" },
      { name: "Prompt Engineering", path: "/prompting" },
      { name: "Tokenization", path: "/genai/tokenization" },
      { name: "Embeddings", path: "/rag/embeddings" },
      { name: "Adapting Models", isHeader: true },
      { name: "Fine-tuning", path: "/genai/fine-tuning" },
      { name: "PEFT & LoRA", path: "/genai/peft" },
      { name: "Distillation", path: "/genai/distillation" },
      { name: "Quantization", path: "/genai/quantization" },
      { name: "More", isHeader: true },
      { name: "AGI & GPT-6 Astra", path: "/genai/agi" },
      { name: "Safety & Alignment", path: "/safety" },
    ],
  },
  {
    name: "🔍 RAG",
    path: "/rag",
    subLinks: [
      { name: "Fundamentals", path: "/rag/fundamentals" },
      { name: "Types of RAG", path: "/rag/types-of-rag" },
      { name: "Data Prep", path: "/rag/data-prep" },
      { name: "Indexing", path: "/rag/indexing" },
      { name: "Chunking", path: "/rag/chunking" },
      { name: "Embeddings", path: "/rag/embeddings" },
      { name: "Vector DBs", path: "/rag/vector-dbs" },
      { name: "Retrieval", path: "/rag/retrieval" },
      { name: "Adv Retrieval", path: "/rag/advanced-retrieval" },
      { name: "Compression", path: "/rag/compression" },
      { name: "Generation", path: "/rag/generation" },
      { name: "Evaluation", path: "/rag/evaluation" },
      { name: "Development", path: "/rag/development" },
      { name: "RAG vs Fine-tuning", path: "/rag/vs-fine-tuning" },
    ],
  },
  {
    name: "🕸️ Agents",
    path: "/agents",
    subLinks: [
      { name: "AI Agents", path: "/agents" },
      { name: "Tool Calling", path: "/agents/tool-calling" },
      { name: "Memory", path: "/agents/memory" },
      { name: "Document Loaders", path: "/agents/document-loaders" },
      { name: "Protocols", isHeader: true },
      { name: "MCP", path: "/mcp" },
      { name: "A2A Protocol", path: "/agents/a2a" },
      { name: "Orchestration", isHeader: true },
      { name: "Multi-Agent", path: "/agents/multi-agent" },
      { name: "Frameworks Compared", path: "/agents/frameworks" },
      { name: "LangChain + LangGraph", path: "/agents/langchain" },
      { name: "Debugging Agents", path: "/agents/debugging" },
    ],
  },
  {
    name: "🧩 Models",
    path: "/models",
    subLinks: [
      { name: "Claude", path: "/models/claude" },
      { name: "GPT", path: "/models/gpt" },
      { name: "Gemini", path: "/models/gemini" },
      { name: "Llama", path: "/models/llama" },
      { name: "Qwen", path: "/models/qwen" },
      { name: "DeepSeek", path: "/models/deepseek" },
      { name: "Mistral", path: "/models/mistral" },
      { name: "Grok", path: "/models/grok" },
      { name: "Gemma", path: "/models/gemma" },
      { name: "Command R+", path: "/models/command-r" },
      { name: "Phi-4", path: "/models/phi" },
      { name: "Claude Code Features", path: "/models/claude#claude-code" },
    ],
  },
  {
    name: "☁️ Cloud",
    path: "/azure",
    subLinks: [
      { name: "Azure", path: "/azure" },
      { name: "AWS", path: "/aws" }
    ],
  },
  {
    name: "🎓 Learn",
    path: "/roadmaps",
    subLinks: [
      { name: "Learning Paths", path: "/roadmaps" },
      { name: "Topic Map", path: "/graph" },
      { name: "Knowledge Checks", path: "/quizzes" },
      { name: "Interactive", path: "/interactive" },
      { name: "Glossary", path: "/glossary" },
    ],
  },
  {
    name: "🏗️ Build",
    path: "/system-design",
    subLinks: [
      { name: "System Design", path: "/system-design" },
      { name: "Projects", path: "/projects" },
      { name: "Resources", path: "/resources" },
    ],
  },
];

export default function GlobalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ====== HEADER BAR ====== */}
      <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold hover:opacity-80 transition-opacity shrink-0">
            <span className="text-2xl">🧠</span>
            <span>Mani <span className="text-indigo-400">Notes</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5">
            {NAV_LINKS.map((nav, i) => (
              <div 
                key={i} 
                className="relative group"
                onMouseEnter={() => setOpenDropdown(i)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {nav.subLinks ? (
                  <div className="flex items-center gap-1 cursor-pointer py-4 text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                    <Link to={nav.path}>{nav.name}</Link>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </div>
                ) : (
                  <Link to={nav.path} className="block py-4 text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                    {nav.name}
                  </Link>
                )}

                {nav.subLinks && openDropdown === i && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-y-auto max-h-[80vh] py-2 custom-scrollbar">
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 mb-2 sticky top-0 bg-[#1a1a1a] z-10">
                      {nav.name}
                    </div>
                    {nav.subLinks.map((sub, j) => (
                      sub.isHeader ? (
                        <div key={j} className="px-4 py-2 mt-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/5 bg-black/20">
                          {sub.name}
                        </div>
                      ) : (
                        <Link 
                          key={j} 
                          to={sub.path}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Global search — Cmd+K */}
          <div className="ml-auto lg:ml-4 mr-2">
            <CommandPalette />
          </div>

          {/* Mobile Toggle */}
          <button 
            className="xl:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* ====== MOBILE MENU — RENDERED OUTSIDE <header> TO AVOID backdrop-filter STACKING BUG ====== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] xl:hidden">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          
          {/* Slide-in panel */}
          <nav className="absolute top-0 left-0 right-0 bottom-0 bg-[#0e0e0e] overflow-y-auto flex flex-col">
            {/* Mobile header inside panel */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-white/10 shrink-0">
              <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="text-2xl">🧠</span>
                <span>AI Engineering <span className="text-indigo-400">Visualized</span></span>
              </Link>
              <button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                onClick={() => setMobileOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map((nav, i) => (
                <div key={i}>
                  {nav.subLinks ? (
                    <>
                      {/* Accordion header */}
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-gray-200 hover:bg-white/5 transition-colors"
                      >
                        <span>{nav.name}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${mobileExpanded === i ? "rotate-180" : ""}`} />
                      </button>
                      
                      {/* Accordion body */}
                      {mobileExpanded === i && (
                        <div className="ml-4 pl-4 border-l border-indigo-500/30 space-y-0.5 pb-2">
                          {nav.subLinks.map((sub, j) => (
                            sub.isHeader ? (
                              <div key={j} className="px-3 py-2 mt-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/5">
                                {sub.name}
                              </div>
                            ) : (
                              <Link
                                key={j}
                                to={sub.path}
                                className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                  location.pathname === sub.path 
                                    ? "text-indigo-400 bg-indigo-500/10 font-semibold" 
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {sub.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={nav.path}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        location.pathname === nav.path
                          ? "text-indigo-400 bg-indigo-500/10"
                          : "text-gray-200 hover:bg-white/5"
                      }`}
                    >
                      {nav.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-white/5 shrink-0">
              <p className="text-xs text-gray-600 text-center">AI Engineering Visualized © 2026</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

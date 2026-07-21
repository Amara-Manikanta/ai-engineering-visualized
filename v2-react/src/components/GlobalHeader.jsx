import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "🏠 Home", path: "/" },
  { name: "🐍 Python", path: "/python" },
  {
    name: "🤖 Machine Learning",
    path: "/ml",
    subLinks: [
      { name: "Introduction", path: "/ml" },
      { name: "Supervised", path: "/ml/supervised" },
      { name: "Unsupervised", path: "/ml/unsupervised" },
      { name: "Deep Learning", path: "/ml/deep-learning" },
      { name: "NLP", path: "/ml/nlp" },
      { name: "Decision Trees", path: "/ml/decision-trees" },
      { name: "KNN", path: "/ml/knn" },
      { name: "Logistic Reg", path: "/ml/logistic-regression" },
      { name: "Linear Reg", path: "/ml/linear-regression" },
      { name: "Multi Reg", path: "/ml/multiple-regression" },
    ],
  },
  {
    name: "✨ Generative AI",
    path: "/genai",
    subLinks: [
      { name: "AI Models", path: "/llms" },
      { name: "LLM Inference", path: "/llm-inference" },
      { name: "Prompt Engineering", path: "/prompting" },
      { name: "Embeddings", path: "/embeddings" },
      { name: "Fine-tuning", path: "/genai/fine-tuning" },
      { name: "Quantization", path: "/genai/quantization" },
    ],
  },
  {
    name: "🔍 RAG",
    path: "/rag",
    subLinks: [
      { name: "Fundamentals", path: "/rag/fundamentals" },
      { name: "Data Prep", path: "/rag/data-prep" },
      { name: "Indexing", path: "/rag/indexing" },
      { name: "Chunking", path: "/rag/chunking" },
      { name: "Embeddings", path: "/rag/embeddings" },
      { name: "Vector DBs", path: "/rag/vector-dbs" },
      { name: "Retrieval", path: "/rag/retrieval" },
      { name: "Generation", path: "/rag/generation" },
      { name: "Evaluation", path: "/rag/evaluation" },
      { name: "Development", path: "/rag/development" },
      { name: "Types of RAG", path: "/rag/types-of-rag" },
      { name: "Adv Retrieval", path: "/rag/advanced-retrieval" },
    ],
  },
  {
    name: "🕸️ Agentic AI",
    path: "/agents",
    subLinks: [
      { name: "AI Agents", path: "/agents" },
      { name: "MCP", path: "/mcp" },
      { name: "LangGraph", path: "/langgraph" },
      { name: "LangChain", path: "/agents/langchain" },
      { name: "Document Loaders", path: "/agents/document-loaders" },
      { name: "Tool Calling", path: "/agents/tool-calling" },
      { name: "Memory", path: "/agents/memory" },
      { name: "Multi-Agent", path: "/agents/multi-agent" },
    ],
  },
  {
    name: "🧩 Models",
    path: "/models",
    subLinks: [
      { name: "Claude", path: "/claude" },
      { name: "GPT", path: "/models/gpt" },
      { name: "Gemini", path: "/models/gemini" },
      { name: "Llama", path: "/models/llama" },
      { name: "Qwen", path: "/models/qwen" },
      { name: "DeepSeek", path: "/models/deepseek" },
      { name: "Mistral", path: "/models/mistral" },
    ],
  },
  { name: "🚀 Projects", path: "/projects" },
  { name: "📚 Resources", path: "/resources" },
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
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold hover:opacity-80 transition-opacity shrink-0">
          <span className="text-2xl">🧠</span>
          <span>AI Engineering <span className="text-indigo-400">Visualized</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((nav, i) => (
            <div 
              key={i} 
              className="relative group"
              onMouseEnter={() => setOpenDropdown(i)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {nav.subLinks ? (
                <div className="flex items-center gap-1 cursor-pointer py-4 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  <Link to={nav.path}>{nav.name}</Link>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </div>
              ) : (
                <Link to={nav.path} className="block py-4 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {nav.name}
                </Link>
              )}

              {/* Mega Dropdown */}
              {nav.subLinks && openDropdown === i && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 mb-2">
                    {nav.name}
                  </div>
                  {nav.subLinks.map((sub, j) => (
                    <Link 
                      key={j} 
                      to={sub.path}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ====== MOBILE MENU PANEL ====== */}
      {mobileOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 top-16 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          
          {/* Slide-in panel */}
          <nav className="fixed top-16 left-0 right-0 bottom-0 z-50 lg:hidden bg-[#0e0e0e] overflow-y-auto border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
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

            {/* Footer in mobile menu */}
            <div className="px-8 py-6 mt-4 border-t border-white/5">
              <p className="text-xs text-gray-600 text-center">AI Engineering Visualized © 2026</p>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

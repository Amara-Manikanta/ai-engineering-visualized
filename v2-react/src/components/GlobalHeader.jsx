import { useState } from "react";
import { Link } from "react-router-dom";
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
    ],
  },
  {
    name: "🔍 RAG",
    path: "/rag",
    subLinks: [
      { name: "Fundamentals", path: "/rag/fundamentals" },
      { name: "Data Prep", path: "/rag/data-prep" },
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
    ],
  },
];

export default function GlobalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity">
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
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

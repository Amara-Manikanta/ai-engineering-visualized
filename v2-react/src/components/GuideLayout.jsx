import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import GlobalHeader from "./GlobalHeader";
import Footer from "./Footer";
import { AZURE_LINKS, AWS_LINKS } from "../config/navigation";
import { PYTHON_LINKS } from "../config/pythonNavigation";

export default function GuideLayout({ title, intro, toc, children }) {
  const [activeHash, setActiveHash] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  let sidebarLinks = null;
  let sectionTitle = "";

  if (location.pathname.startsWith("/azure")) {
    sidebarLinks = AZURE_LINKS;
    sectionTitle = "Azure Pages";
  } else if (location.pathname.startsWith("/aws")) {
    sidebarLinks = AWS_LINKS;
    sectionTitle = "AWS Pages";
  } else if (location.pathname.startsWith("/python")) {
    sidebarLinks = PYTHON_LINKS;
    sectionTitle = "Python Modules";
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-300 font-sans">
      <GlobalHeader />
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6 max-w-[1200px] mx-auto px-4 sm:px-5 pb-20 w-full">
        
        {/* Sidebar TOC — collapsible on mobile, sticky on desktop */}
        <aside className="lg:w-[250px] shrink-0 lg:sticky lg:top-[90px] h-fit bg-[#141414] border border-white/10 rounded-xl overflow-hidden">
          
          {/* Mobile toggle header */}
          <button 
            className="lg:hidden w-full flex items-center justify-between p-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">{title}</h3>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Desktop header (always visible) */}
          <h3 className="hidden lg:block font-bold p-5 pb-0 text-sm text-white uppercase tracking-wider">{title}</h3>

          {/* Navigation & TOC — always visible on desktop, toggle on mobile */}
          <div className={`${sidebarOpen ? "block" : "hidden"} lg:block overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-120px)] custom-scrollbar`}>
            
            {/* Render Section Navigation if available */}
            {sidebarLinks && (
              <div className="p-4 lg:p-5 border-b border-white/10 mb-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{sectionTitle}</h4>
                <div className="flex flex-col gap-1">
                  {sidebarLinks.map((link, i) => (
                    <Link
                      key={i}
                      to={link.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`block py-1.5 text-[0.9em] transition-colors ${
                        location.pathname === link.path
                          ? "text-indigo-400 font-semibold border-l-2 border-indigo-400 pl-2 -ml-[10px]"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Render Local TOC */}
            <div className="p-4 lg:p-5 lg:pt-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">On this page</h4>
              <div className="flex flex-col gap-1">
              {toc.map((item, i) => {
                const href = item.hash.startsWith("#") ? item.hash : `#${item.hash}`;
                return (
                  <a 
                    key={i} 
                    href={href} 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveHash(item.hash);
                      setSidebarOpen(false); // Close sidebar on mobile after clicking
                      const id = href.replace("#", "");
                      const el = document.getElementById(id);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`block py-2 lg:py-1.5 text-[0.85em] transition-colors ${item.indent ? "ml-4 text-xs" : ""} ${activeHash === item.hash ? "text-indigo-400 font-semibold" : "text-gray-400 hover:text-indigo-400"}`}
                  >
                    {item.label}
                  </a>
                );
              })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="mb-8 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">{title}</h1>
            <p className="text-base sm:text-lg text-indigo-200/80 leading-relaxed font-light">{intro}</p>
          </div>
          
          <div className="space-y-8 lg:space-y-12">
            {children}
          </div>
        </main>

      </div>
      <Footer />
    </div>
  );
}

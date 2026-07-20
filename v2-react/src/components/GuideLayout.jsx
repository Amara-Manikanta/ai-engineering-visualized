import { useState } from "react";
import GlobalHeader from "./GlobalHeader";

export default function GuideLayout({ title, intro, toc, children }) {
  const [activeHash, setActiveHash] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      <GlobalHeader />
      
      <div className="flex flex-col lg:flex-row gap-8 mt-6 max-w-[1200px] mx-auto px-5 pb-20">
        
        {/* Sticky Sidebar TOC */}
        <aside className="lg:w-[250px] shrink-0 lg:sticky lg:top-[90px] h-fit bg-[#141414] border border-white/10 rounded-xl p-5 overflow-y-auto max-h-[calc(100vh-120px)]">
          <h3 className="font-bold mb-4 text-sm text-white uppercase tracking-wider">{title}</h3>
          <div className="flex flex-col gap-1">
            {toc.map((item, i) => (
              <a 
                key={i} 
                href={item.hash} 
                onClick={() => setActiveHash(item.hash)}
                className={`block py-1.5 text-[0.85em] transition-colors ${item.indent ? "ml-4 text-xs" : ""} ${activeHash === item.hash ? "text-indigo-400 font-semibold" : "text-gray-400 hover:text-indigo-400"}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">{title}</h1>
            <p className="text-lg text-indigo-200/80 leading-relaxed font-light">{intro}</p>
          </div>
          
          <div className="space-y-12">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { 
  Code2, Terminal, CheckCircle2, FileCode, Layers, 
  Box, Database, Sliders, Type, Repeat
} from 'lucide-react';

export default function PythonDataStructures() {
  const toc = [
    { label: "5. Functions & Scope", hash: "#functions" },
    { label: "6. Data Structures", hash: "#data-structures" },
    { label: "7. Strings & Manipulation", hash: "#strings" },
    { label: "8. List & Dict Comprehensions", hash: "#comprehensions" }
  ];

  return (
    <GuideLayout
      title="Module 2: Data Structures & Core Logic"
      intro="Master Python functions, scope, data structures (lists, tuples, dicts, sets), string operations, and powerful comprehensions."
      toc={toc}
    >
      {/* 5. FUNCTIONS & SCOPE */}
      <section id="functions" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Sliders size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">5. Functions & Scope</h2>
            <p className="text-sm text-gray-400">Parameters, `*args`, `**kwargs`, LEGB scope, and `lambda`</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black/40 p-5 rounded-xl border border-white/5 space-y-3 text-xs text-gray-300">
            <h4 className="font-bold text-blue-300 uppercase tracking-wider">LEGB Scope Resolution</h4>
            <div><strong>L</strong>ocal ➔ Variables inside function</div>
            <div><strong>E</strong>nclosing ➔ Outer function in nested functions</div>
            <div><strong>G</strong>lobal ➔ Module level variables</div>
            <div><strong>B</strong>uilt-in ➔ Predefined Python names (`len`, `print`)</div>
          </div>

          <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
              <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> functions_demo.py</span>
              <span>Python 3.11</span>
            </div>
            <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`def build_model(model_name: str, *layers, **config):
    learning_rate = config.get("lr", 0.001)
    print(f"Model: {model_name}, Layers: {len(layers)}, LR: {learning_rate}")

build_model("ResNet", "Conv2D", "Dense", lr=0.01)`}</pre>
            <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
              <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
              <code>Model: ResNet, Layers: 2, LR: 0.01</code>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DATA STRUCTURES */}
      <section id="data-structures" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">6. Data Structures</h2>
            <p className="text-sm text-gray-400">Lists, Tuples, Dictionaries, Sets, and `collections` module</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs mb-6">
          <div className="bg-black/40 p-3 rounded-lg border border-purple-500/30">
            <span className="font-bold text-purple-300 block mb-1">List `[]`</span>
            <span className="text-[10px] text-gray-400">Ordered, mutable array</span>
          </div>
          <div className="bg-black/40 p-3 rounded-lg border border-purple-500/30">
            <span className="font-bold text-purple-300 block mb-1">Tuple `()`</span>
            <span className="text-[10px] text-gray-400">Ordered, immutable</span>
          </div>
          <div className="bg-black/40 p-3 rounded-lg border border-purple-500/30">
            <span className="font-bold text-purple-300 block mb-1">Dict `{}`</span>
            <span className="text-[10px] text-gray-400">Key-value pair map ($O(1)$)</span>
          </div>
          <div className="bg-black/40 p-3 rounded-lg border border-purple-500/30">
            <span className="font-bold text-purple-300 block mb-1">Set `{}`</span>
            <span className="text-[10px] text-gray-400">Unique elements ($O(1)$)</span>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> collections_demo.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`from collections import Counter, defaultdict

words = ["vector", "embedding", "vector", "search", "embedding", "vector"]
counts = Counter(words)

print("Top 2 words:", counts.most_common(2))`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Top 2 words: [('vector', 3), ('embedding', 2)]</code>
          </div>
        </div>
      </section>

      {/* 7. STRINGS */}
      <section id="strings" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Type size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">7. Strings & Manipulation</h2>
            <p className="text-sm text-gray-400">Slicing `[::]`, `f-strings`, string methods, regex (`re`)</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> string_regex.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`import re

text = "User email: dev@ai.org, support: help@llm.io"
emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', text)

print("Extracted Emails:", emails)`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Extracted Emails: ['dev@ai.org', 'help@llm.io']</code>
          </div>
        </div>
      </section>

      {/* 8. COMPREHENSIONS */}
      <section id="comprehensions" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Repeat size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">8. List & Dict Comprehensions</h2>
            <p className="text-sm text-gray-400">Concise, fast, Pythonic list, set, and dict processing</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> comprehensions_demo.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`docs = [" doc 1 ", "doc 2", "   "]

# Filter empty strings and strip whitespace in one line
clean_docs = [d.strip() for d in docs if d.strip()]

print("Clean Docs:", clean_docs)`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Clean Docs: ['doc 1', 'doc 2']</code>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

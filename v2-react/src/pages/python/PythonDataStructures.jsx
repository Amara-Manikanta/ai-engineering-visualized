import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { 
  Code2, Terminal, CheckCircle2, FileCode, Layers, 
  Box, Database, Sliders, Type, Repeat, Hash, Search, ArrowRight
} from 'lucide-react';

export default function PythonDataStructures() {
  const toc = [
    { label: "15. Functions & Default Parameters", hash: "#functions-params" },
    { label: "16. *args & **kwargs Arguments", hash: "#args-kwargs" },
    { label: "17. LEGB Scope Resolution", hash: "#legb-scope" },
    { label: "18. Lambda & Higher-Order Functions", hash: "#lambda-functions" },
    { label: "19. Lists & List Methods", hash: "#lists" },
    { label: "20. Tuples & Tuple Unpacking", hash: "#tuples" },
    { label: "21. Dictionaries & Dict Methods", hash: "#dictionaries" },
    { label: "22. Sets & Set Operations", hash: "#sets" },
    { label: "23. collections Module", hash: "#collections-module" },
    { label: "24. Strings & Slicing", hash: "#strings-slicing" },
    { label: "25. Regular Expressions (re)", hash: "#regex" },
    { label: "26. List & Dict Comprehensions", hash: "#comprehensions" }
  ];

  return (
    <GuideLayout
      title="Module 2: Data Structures & Core Logic"
      intro="Step-by-step deep dive into functions, scope, built-in data structures, string operations, regex, and Pythonic comprehensions."
      toc={toc}
    >
      {/* 15. FUNCTIONS & DEFAULT PARAMS */}
      <section id="functions-params" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Sliders size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">15. Functions & Default Parameters</h2>
            <p className="text-xs text-gray-400">Defining functions, positional/keyword arguments, mutable default parameter traps</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> 15_functions.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-blue-300 mb-3 whitespace-pre-wrap">{`# Avoid mutable default arguments (use None instead)
def add_embedding(vec: list, store: list = None) -> list:
    if store is None:
        store = []
    store.append(vec)
    return store

print(add_embedding([0.1, 0.2]))`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>[[0.1, 0.2]]</code>
          </div>
        </div>
      </section>

      {/* 16. ARGS AND KWARGS */}
      <section id="args-kwargs" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Sliders size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">16. Variable Arguments (`*args` & `**kwargs`)</h2>
            <p className="text-xs text-gray-400">Packing variable positional arguments into tuples and keyword arguments into dictionaries</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> 16_args_kwargs.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-purple-300 mb-3 whitespace-pre-wrap">{`def configure_agent(agent_name, *tools, **hyperparams):
    print(f"Agent: {agent_name}")
    print(f"Tools ({len(tools)}): {tools}")
    print(f"Hyperparams: {hyperparams}")

configure_agent("RAGBot", "search", "calculator", temp=0.2, top_p=0.9)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Agent: RAGBot<br/>Tools (2): ('search', 'calculator')<br/>Hyperparams: {"{'temp': 0.2, 'top_p': 0.9}"}</code>
          </div>
        </div>
      </section>

      {/* 17. LEGB SCOPE */}
      <section id="legb-scope" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">17. LEGB Scope Resolution</h2>
            <p className="text-xs text-gray-400">Local, Enclosing, Global, Built-in scopes and `global`/`nonlocal` keywords</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 17_legb_scope.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`global_count = 0

def outer():
    enclosing_val = 10
    def inner():
        nonlocal enclosing_val
        enclosing_val += 5
        return enclosing_val
    return inner()

print("Nested result:", outer())`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Nested result: 15</code>
          </div>
        </div>
      </section>

      {/* 18. LAMBDA */}
      <section id="lambda-functions" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Code2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">18. Lambda & Higher-Order Functions</h2>
            <p className="text-xs text-gray-400">Anonymous functions (`lambda`), `map()`, `filter()`, and custom sorting keys</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> 18_lambda.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`docs = [{"score": 0.85}, {"score": 0.99}, {"score": 0.92}]

# Sort list of dicts by score descending using lambda
docs.sort(key=lambda d: d["score"], reverse=True)
print("Top Document Score:", docs[0]["score"])`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Top Document Score: 0.99</code>
          </div>
        </div>
      </section>

      {/* 19. LISTS */}
      <section id="lists" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">19. Lists & List Methods</h2>
            <p className="text-xs text-gray-400">Mutable dynamic arrays (`append`, `extend`, `pop`, `insert`, `sort`)</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><FileCode size={12} /> 19_lists.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-amber-300 mb-3 whitespace-pre-wrap">{`tokens = ["AI", "Model"]
tokens.append("Agent")
tokens.extend(["RAG", "LLM"])
last_token = tokens.pop()

print("Tokens:", tokens)
print("Popped Token:", last_token)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Tokens: ['AI', 'Model', 'Agent', 'RAG']<br/>Popped Token: LLM</code>
          </div>
        </div>
      </section>

      {/* 20. TUPLES */}
      <section id="tuples" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">20. Tuples & Tuple Unpacking</h2>
            <p className="text-xs text-gray-400">Immutable sequences, sequence unpacking `a, *rest, b = tuple`</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-teal-400"><FileCode size={12} /> 20_tuples.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-teal-300 mb-3 whitespace-pre-wrap">{`dimensions = (1, 512, 1536)
batch, *middle, embed_dim = dimensions

print(f"Batch: {batch}, Embed Dim: {embed_dim}")`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Batch: 1, Embed Dim: 1536</code>
          </div>
        </div>
      </section>

      {/* 21. DICTIONARIES */}
      <section id="dictionaries" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Database size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">21. Dictionaries & Dict Methods</h2>
            <p className="text-xs text-gray-400">Hash maps, $O(1)$ lookups, `get()`, `setdefault()`, `update()`, views</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-rose-400"><FileCode size={12} /> 21_dicts.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-rose-300 mb-3 whitespace-pre-wrap">{`config = {"model": "gpt-4o"}

# Safe retrieval with fallback default
temp = config.get("temperature", 0.7)
config.setdefault("top_p", 1.0)

print(config)
print("Temperature:", temp)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>{'{\n  "model": "gpt-4o",\n  "top_p": 1.0\n}'}<br/>Temperature: 0.7</code>
          </div>
        </div>
      </section>

      {/* 22. SETS */}
      <section id="sets" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Hash size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">22. Sets & Set Operations</h2>
            <p className="text-xs text-gray-400">Unordered collections of unique elements (`union`, `intersection`, `difference`)</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-pink-400"><FileCode size={12} /> 22_sets.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-pink-300 mb-3 whitespace-pre-wrap">{`set_a = {"python", "rag", "ai"}
set_b = {"ai", "ml", "dl"}

print("Intersection:", set_a & set_b)
print("Difference (A - B):", set_a - set_b)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Intersection: {'{\n  "ai"\n}'}<br/>Difference (A - B): {'{\n  "python", "rag"\n}'}</code>
          </div>
        </div>
      </section>

      {/* 23. COLLECTIONS MODULE */}
      <section id="collections-module" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">23. `collections` Module (`Counter`, `defaultdict`, `deque`, `namedtuple`)</h2>
            <p className="text-xs text-gray-400">High-performance specialized container datatypes</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> 23_collections.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-blue-300 mb-3 whitespace-pre-wrap">{`from collections import defaultdict, deque

# defaultdict avoids KeyErrors automatically
graph = defaultdict(list)
graph["node_a"].append("node_b")

# Double-ended queue for O(1) pops from left
queue = deque(["task_1", "task_2"])
queue.appendleft("priority_task")

print(dict(graph))
print(list(queue))`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>{'{\n  "node_a": ["node_b"]\n}'}<br/>['priority_task', 'task_1', 'task_2']</code>
          </div>
        </div>
      </section>

      {/* 24. STRINGS & SLICING */}
      <section id="strings-slicing" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Type size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">24. Strings & Slicing `[start:stop:step]`</h2>
            <p className="text-xs text-gray-400">String immutability, `f-strings`, slicing, `split()`, `join()`, `strip()`</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> 24_strings.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-purple-300 mb-3 whitespace-pre-wrap">{`text = "Artificial Intelligence"

# Slicing: [start:stop:step]
print("Reversed:", text[::-1])
print("First 10 chars:", text[:10])

# Join list of words back into string
words = ["Vector", "Search"]
print("Joined:", " -> ".join(words))`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Reversed: ecnegilletnI laicifitrA<br/>First 10 chars: Artificial<br/>Joined: Vector -&gt; Search</code>
          </div>
        </div>
      </section>

      {/* 25. REGEX */}
      <section id="regex" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Search size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">25. Regular Expressions (`re` Module)</h2>
            <p className="text-xs text-gray-400">Pattern matching, extraction with `re.findall`, replacement with `re.sub`</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 25_regex.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`import re

log = "ERROR 2026-08-04: Connection timeout in module X"
date = re.search(r'\\d{4}-\\d{2}-\\d{2}', log).group()

print("Extracted Date:", date)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Extracted Date: 2026-08-04</code>
          </div>
        </div>
      </section>

      {/* 26. COMPREHENSIONS */}
      <section id="comprehensions" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Repeat size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">26. List, Dict & Set Comprehensions</h2>
            <p className="text-xs text-gray-400">Processing sequences with conditional filtering `[x for x in list if condition]`</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> 26_comprehensions.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`scores = {"doc1": 0.82, "doc2": 0.95, "doc3": 0.40}

# Filter dict elements above threshold 0.8
top_docs = {k: v for k, v in scores.items() if v >= 0.8}

print("Top Docs Dict:", top_docs)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Top Docs Dict: {'{\n  "doc1": 0.82,\n  "doc2": 0.95\n}'}</code>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

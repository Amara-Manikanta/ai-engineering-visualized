import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';
import { 
  Code2, Database, Globe, LineChart, Cpu, Sigma, Search, Box, 
  Terminal, ShieldAlert, Zap, Layers, RefreshCw, CpuIcon, CheckCircle2,
  Code, Play, Sparkles, Server, FileCode
} from 'lucide-react';

// Section 1: Core Fundamentals Data
const coreTopics = [
  {
    id: 'collections',
    title: 'Data Structures & Memory Mutability',
    badge: 'Basics',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    desc: 'Understanding Python data structures, memory performance, and mutability is essential for handling AI payloads efficiently.',
    points: [
      { term: 'List vs Tuple', detail: 'Lists are mutable (dynamic array); Tuples are immutable (fixed memory footprint, faster allocation).' },
      { term: 'Dict & Set (Hash Maps)', detail: 'Provides O(1) average lookup time. Crucial for fast metadata filtering and token lookups.' },
      { term: 'Memory Views', detail: 'Immutable objects can be safely passed across threads without lock mechanisms.' }
    ],
    code: `# Fast O(1) lookup vs O(n) list lookup
valid_token_ids = {101, 102, 2045, 8892}  # Set: O(1)
if token_id in valid_token_ids:
    process_token(token_id)

# Tuple immutability for fixed coordinates / metadata
embedding_dim = (1, 1536)  # Immutable tuple`
  },
  {
    id: 'comprehensions',
    title: 'Comprehensions & Expressions',
    badge: 'Syntax',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    desc: 'Pythonic list, dict, and set comprehensions process datasets cleanly and perform up to 20-30% faster than standard for-loops in CPython.',
    points: [
      { term: 'List Comprehension', detail: '`[transform(x) for x in data if condition(x)]`' },
      { term: 'Dict Comprehension', detail: '`{doc.id: doc.text for doc in documents}` for rapid indexing.' },
      { term: 'Set Comprehension', detail: '`{word.lower() for word in text.split()}` for unique vocabulary building.' }
    ],
    code: `documents = [{"id": "doc_1", "text": "  Hello World  "}, {"id": "doc_2", "text": "AI Engineering"}]

# Dict comprehension for fast lookup table creation
doc_map = {d["id"]: d["text"].strip() for d in documents}

# Filtered list comprehension for tokens
clean_tokens = [tok.lower() for tok in text.split() if len(tok) > 2]`
  },
  {
    id: 'functions-scope',
    title: 'Functions, *args, **kwargs & Scope',
    badge: 'Functions',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    desc: 'Dynamic argument passing allows building flexible LLM wrapper interfaces and tool call parameters.',
    points: [
      { term: '*args', detail: 'Packs positional arguments into a tuple.' },
      { term: '**kwargs', detail: 'Packs keyword arguments into a dictionary (ideal for model hyperparameters like temperature, top_p).' },
      { term: 'LEGB Rule', detail: 'Scope resolution order: Local ➔ Enclosing ➔ Global ➔ Built-in.' }
    ],
    code: `def call_llm(prompt: str, *tools, **model_params):
    temperature = model_params.get("temperature", 0.7)
    print(f"Executing prompt with temp={temperature}, tools={len(tools)}")

call_llm("Summarize paper", search_tool, code_tool, temperature=0.2, top_p=0.9)`
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming (OOP)',
    badge: 'Architecture',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    desc: 'Encapsulate model drivers, vector store clients, and agent state using classes, inheritance, and static methods.',
    points: [
      { term: '__init__ & __repr__', detail: 'Constructor and developer-friendly string representation.' },
      { term: '@classmethod', detail: 'Factory constructors for initializing clients from config dicts or env vars.' },
      { term: '@staticmethod', detail: 'Utility functions bound to a class namespace without accessing `self`.' }
    ],
    code: `class VectorStoreClient:
    def __init__(self, collection_name: str, dimension: int = 1536):
        self.collection_name = collection_name
        self.dimension = dimension

    @classmethod
    from_env(cls):
        import os
        return cls(collection_name=os.getenv("COLLECTION_NAME", "default"))

    def __repr__(self):
        return f"<VectorStoreClient collection={self.collection_name} dim={self.dimension}>"`
  },
  {
    id: 'exceptions',
    title: 'Error & Exception Handling',
    badge: 'Reliability',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    desc: 'Build resilient AI systems by catching specific API rate limits, network timeouts, and context window overflows.',
    points: [
      { term: 'try...except...else...finally', detail: 'Clean execution block for handling errors gracefully.' },
      { term: 'Custom Exceptions', detail: 'Inherit from `Exception` to build domain-specific AI error classes.' },
      { term: 'Reraising Exceptions', detail: '`raise NewError() from err` preserves underlying stack traces.' }
    ],
    code: `class RateLimitException(Exception):
    """Raised when LLM API rate limit (429) is hit."""
    pass

try:
    response = api_client.generate(prompt)
except RateLimitError as err:
    raise RateLimitException("Quota exceeded. Triggering backoff.") from err
finally:
    log_request_telemetry()`
  }
];

// Section 2: Advanced Data
const advancedTopics = [
  {
    id: 'generators',
    title: 'Generators & Streaming (yield)',
    badge: 'Memory Efficiency',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    desc: 'Generators generate items one at a time using `yield`. Essential for streaming LLM response tokens and processing terabyte-scale datasets without Out-Of-Memory (OOM) errors.',
    icon: <Zap className="text-indigo-400" size={20} />,
    points: [
      { term: 'Lazy Evaluation', detail: 'Computes values on-the-fly instead of storing entire arrays in RAM.' },
      { term: 'LLM Streaming Response', detail: 'Yields text chunks immediately as they arrive from HTTP SSE streams.' },
      { term: 'Generator Pipelines', detail: 'Chain multiple generators (Read ➔ Chunk ➔ Embed ➔ Store).' }
    ],
    code: `# Streaming LLM Tokens with Generator
def stream_llm_response(prompt: str):
    raw_chunks = ["AI ", "Engineering ", "Visualized ", "is ", "awesome!"]
    for chunk in raw_chunks:
        # Simulate API chunk arrival
        yield chunk

for token in stream_llm_response("Explain AI"):
    print(token, end="", flush=True)`
  },
  {
    id: 'decorators',
    title: 'Decorators & Function Wrappers',
    badge: 'Meta-Programming',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    desc: 'Decorators wrap functions to extend behavior dynamically without modifying core source code. Perfect for logging, caching LLM queries, and retry mechanisms.',
    icon: <Layers className="text-purple-400" size={20} />,
    points: [
      { term: '@lru_cache', detail: 'Caches recent function outputs in memory to save duplicate API costs.' },
      { term: 'Custom Retries', detail: 'Wrap LLM calls with exponential backoff on network failures.' },
      { term: '@property', detail: 'Turns methods into read-only or validated attributes.' }
    ],
    code: `import time
from functools import wraps, lru_cache

# Custom latency logging decorator
def log_latency(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[{func.__name__}] executed in {duration:.4f}s")
        return result
    return wrapper

@lru_cache(maxsize=128)
@log_latency
def get_embedding(text: str):
    return [0.12, 0.45, 0.89] # Simulated heavy operation`
  },
  {
    id: 'context-managers',
    title: 'Context Managers (with Statement)',
    badge: 'Resource Management',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    desc: 'Guarantees automatic resource cleanup (closing DB sessions, releasing GPU memory locks, or managing temporary file sandboxes) even if exceptions occur.',
    icon: <RefreshCw className="text-emerald-400" size={20} />,
    points: [
      { term: '__enter__ & __exit__', detail: 'Class methods defined to initialize and clean up resources.' },
      { term: '@contextmanager', detail: 'Generator decorator from `contextlib` for lightweight context managers.' },
      { term: 'GPU Memory Safety', detail: 'Ensure `torch.cuda.empty_cache()` is called safely after inference.' }
    ],
    code: `from contextlib import contextmanager

@contextmanager
def timer_block(label: str):
    print(f"--- Starting: {label} ---")
    try:
        yield
    finally:
        print(f"--- Finished: {label} ---")

with timer_block("LLM Inference Pass"):
    # Perform model call
    res = "Output Generated"`
  },
  {
    id: 'asyncio',
    title: 'AsyncIO & Parallel Execution',
    badge: 'High Throughput',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    desc: 'LLM API calls are I/O bound. Using `async`/`await` and `asyncio.gather()` allows firing hundreds of concurrent prompts in parallel without blocking thread execution.',
    icon: <Zap className="text-amber-400" size={20} />,
    points: [
      { term: 'Event Loop', detail: 'Single-threaded non-blocking I/O loop for high-frequency API calls.' },
      { term: 'asyncio.gather()', detail: 'Executes multiple asynchronous coroutines concurrently.' },
      { term: 'I/O vs CPU Bound', detail: 'Use AsyncIO for HTTP/DB calls; use `multiprocessing` for heavy CPU matrix math.' }
    ],
    code: `import asyncio

async def fetch_llm_summary(doc_id: int):
    await asyncio.sleep(0.5)  # Simulate non-blocking async network call
    return f"Summary for Doc {doc_id}"

async def batch_process():
    tasks = [fetch_llm_summary(i) for i in range(5)]
    results = await asyncio.gather(*tasks)
    return results

# Output: Run all 5 summaries in parallel (~0.5s total instead of 2.5s)`
  },
  {
    id: 'pydantic-typing',
    title: 'Type Hinting & Pydantic Validation',
    badge: 'Structured Outputs',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    desc: 'Pydantic models strictly validate JSON responses returned by LLMs, guaranteeing type safety and automated schema generation for Tool Calling.',
    icon: <FileCode className="text-cyan-400" size={20} />,
    points: [
      { term: 'Type Annotations', detail: 'Provides autocompletion and static linting (`mypy`) in IDEs.' },
      { term: 'Pydantic BaseModel', detail: 'Parses raw JSON strings directly into typed Python objects with automatic type coercions.' },
      { term: 'JSON Schema Generation', detail: '`Model.model_json_schema()` converts classes directly into OpenAI Function / Tool definitions.' }
    ],
    code: `from pydantic import BaseModel, Field
from typing import List

class UserQueryAnalysis(BaseModel):
    intent: str = Field(description="User primary intent")
    keywords: List[str] = Field(description="Extracted entities")
    confidence: float = Field(ge=0.0, le=1.0)

# Parsing raw JSON response from LLM
raw_json = '{"intent": "search", "keywords": ["python", "rag"], "confidence": 0.95}'
structured_data = UserQueryAnalysis.model_validate_json(raw_json)
print(structured_data.intent)  # "search"`
  },
  {
    id: 'dunder-operators',
    title: 'Operator Overloading & Dunder Methods',
    badge: 'Framework Internals',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    desc: 'Understanding `__call__` and operator overloading explains how modern frameworks like LangChain construct execution chains using the pipe operator (`|`).',
    icon: <Sparkles className="text-pink-400" size={20} />,
    points: [
      { term: '__call__', detail: 'Allows object instances to be invoked like standard functions.' },
      { term: '__or__ (|)', detail: 'Overloads the bitwise OR operator to chain components together sequentially.' },
      { term: 'LCEL Syntax', detail: '`chain = prompt | model | parser` is powered entirely by Python operator overloading.' }
    ],
    code: `class ChainableStep:
    def __init__(self, name):
        self.name = name

    def __or__(self, next_step):
        return Pipeline([self, next_step])

class Pipeline:
    def __init__(self, steps):
        self.steps = steps

    def run(self, data):
        for step in self.steps:
            data = f"{step.name}({data})"
        return data

# Using pipe operator overloading
prompt = ChainableStep("Prompt")
model = ChainableStep("LLM")
chain = prompt | model
print(chain.run("input"))  # "LLM(Prompt(input))"`
  }
];

const PythonLibrariesCheatSheet = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredLib, setHoveredLib] = useState(null);

  const rings = [
    {
      id: 'inner-top',
      name: 'Database Operations',
      icon: <Database size={14} />,
      radius: 140,
      color: 'border-blue-500 text-blue-400 bg-blue-500/10',
      nodes: ['Kafka', 'Ray', 'Hadoop', 'Dask', 'Koalas'],
      angleStart: 160,
      angleEnd: 20
    },
    {
      id: 'inner-bottom',
      name: 'Web Scraping',
      icon: <Globe size={14} />,
      radius: 140,
      color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
      nodes: ['Beautiful Soup', 'Scrapy', 'Octoparse', 'Selenium'],
      angleStart: 200,
      angleEnd: 340
    },
    {
      id: 'mid-top',
      name: 'Data Visualization',
      icon: <LineChart size={14} />,
      radius: 230,
      color: 'border-teal-500 text-teal-400 bg-teal-500/10',
      nodes: ['Pygal', 'Altair', 'Bokeh', 'Seaborn', 'Matplotlib', 'Geoplotlib', 'Folium'],
      angleStart: 170,
      angleEnd: 10
    },
    {
      id: 'mid-bottom',
      name: 'Data Manipulation',
      icon: <Box size={14} />,
      radius: 230,
      color: 'border-sky-500 text-sky-400 bg-sky-500/10',
      nodes: ['Vaex', 'NumPy', 'Pandas', 'Datatable', 'Polars', 'CuPy'],
      angleStart: 190,
      angleEnd: 350
    },
    {
      id: 'outer-top',
      name: 'Machine Learning',
      icon: <Cpu size={14} />,
      radius: 320,
      color: 'border-indigo-500 text-indigo-400 bg-indigo-500/10',
      nodes: ['Tensorflow', 'Pytorch', 'Keras', 'Theano', 'XGBoost', 'Scikit-learn', 'JAX'],
      angleStart: 175,
      angleEnd: 5
    },
    {
      id: 'outer-bottom',
      name: 'Statistical Analysis',
      icon: <Sigma size={14} />,
      radius: 320,
      color: 'border-purple-500 text-purple-400 bg-purple-500/10',
      nodes: ['PyStan', 'Lifelines', 'SciPy', 'PyMC3', 'Pingouin', 'Statsmodels'],
      angleStart: 185,
      angleEnd: 355
    }
  ];

  const getCoordinates = (radius, angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: -radius * Math.sin(rad)
    };
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center py-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white">Python Libraries Landscape</h2>
        <p className="text-gray-400 text-sm mt-1">Interactive overview of core libraries for Data, ML, Scraping, and Stats</p>
      </div>

      <div className="relative flex items-center justify-center w-full max-w-[750px] aspect-square rounded-full border border-gray-800/50 bg-[#0a0a0a]">
        <div className="absolute w-[280px] h-[280px] rounded-full border border-gray-800/60 z-0"></div>
        <div className="absolute w-[460px] h-[460px] rounded-full border border-gray-800/60 z-0"></div>
        <div className="absolute w-[640px] h-[640px] rounded-full border border-gray-800/60 z-0"></div>

        <motion.div 
          className="absolute z-50 w-20 h-20 bg-[#111] rounded-full border-4 border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Code2 size={36} className="text-indigo-400" />
        </motion.div>

        {rings.map((ring, rIdx) => {
          const isTop = ring.angleEnd < 180;
          return (
            <div key={ring.id} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <motion.div 
                className={`absolute px-3 py-1 rounded-full border ${ring.color} flex items-center gap-2 backdrop-blur-md font-bold text-[11px] pointer-events-auto shadow-lg transition-all z-20 cursor-default`}
                style={{
                  top: isTop ? `calc(50% - ${ring.radius}px - 14px)` : `calc(50% + ${ring.radius}px - 14px)`,
                }}
                onMouseEnter={() => setHoveredCategory(ring.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                animate={{
                  scale: hoveredCategory === ring.id ? 1.1 : 1,
                  opacity: (hoveredCategory && hoveredCategory !== ring.id) ? 0.4 : 1
                }}
              >
                {ring.icon} {ring.name}
              </motion.div>

              {ring.nodes.map((node, i) => {
                const totalNodes = ring.nodes.length;
                const angleStep = totalNodes > 1 ? (ring.angleEnd - ring.angleStart) / (totalNodes - 1) : 0;
                const currentAngle = ring.angleStart + (angleStep * i);
                const pos = getCoordinates(ring.radius, currentAngle);

                const isHovered = hoveredLib === node;
                const categoryHovered = hoveredCategory === ring.id;
                const anyHovered = hoveredLib !== null || hoveredCategory !== null;
                const isActive = isHovered || categoryHovered;
                const opacity = (!anyHovered || isActive) ? 1 : 0.3;

                return (
                  <motion.div
                    key={node}
                    className="absolute flex flex-col items-center justify-center gap-1 pointer-events-auto cursor-pointer z-30"
                    style={{ x: pos.x, y: pos.y }}
                    onMouseEnter={() => { setHoveredLib(node); setHoveredCategory(ring.id); }}
                    onMouseLeave={() => { setHoveredLib(null); setHoveredCategory(null); }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity, scale: isHovered ? 1.2 : 1 }}
                    transition={{ delay: rIdx * 0.1 + i * 0.02, type: 'spring' }}
                  >
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center shadow-lg transition-colors bg-[#1a1a1a] ${isActive ? ring.color : 'border-gray-700 text-gray-400'}`}>
                       <Search size={12} className={isActive ? 'opacity-100' : 'opacity-0'} />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${isActive ? 'bg-[#222] text-white border border-[#444]' : 'text-gray-400 drop-shadow-md'}`}>
                      {node}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function PythonIndex() {
  const [activeTab, setActiveTab] = useState('core');

  const toc = [
    { label: "1. Core Python Fundamentals", hash: "#core-fundamentals" },
    { label: "2. Advanced Python for AI", hash: "#advanced-python" },
    { label: "3. Libraries CheatSheet", hash: "#libraries" }
  ];

  return (
    <GuideLayout
      title="Python for AI Engineering"
      intro="Master essential Python fundamentals, memory management, AsyncIO, Pydantic, and advanced patterns designed for AI & Machine Learning systems."
      toc={toc}
    >
      {/* SECTION 1: CORE PYTHON FUNDAMENTALS */}
      <section id="core-fundamentals" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Code2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">1. Core Python Fundamentals</h2>
            <p className="text-sm text-gray-400">Essential building blocks for high-performance Python code</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-6">
          {coreTopics.map((topic) => (
            <motion.div 
              key={topic.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-400 shrink-0" />
                  {topic.title}
                </h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${topic.badgeColor}`}>
                  {topic.badge}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4 leading-relaxed">{topic.desc}</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bullet Points */}
                <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Concepts</div>
                  {topic.points.map((p, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-bold text-indigo-300">{p.term}: </span>
                      <span className="text-gray-400">{p.detail}</span>
                    </div>
                  ))}
                </div>

                {/* Code Block */}
                <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs overflow-x-auto relative">
                  <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
                    <span className="flex items-center gap-1 text-indigo-400"><FileCode size={12} /> snippet.py</span>
                    <span>Python 3.11+</span>
                  </div>
                  <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">{topic.code}</pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 2: ADVANCED PYTHON FOR AI */}
      <section id="advanced-python" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">2. Advanced Python for AI Engineers</h2>
            <p className="text-sm text-gray-400">Generators, Decorators, AsyncIO, Pydantic, and Operator Overloading</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {advancedTopics.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="font-bold text-white text-base">{item.title}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">{item.desc}</p>

                <div className="space-y-2 mb-4 bg-black/40 p-3 rounded-xl border border-white/5">
                  {item.points.map((pt, i) => (
                    <div key={i} className="text-[11px] text-gray-400">
                      <strong className="text-gray-200">{pt.term}: </strong> {pt.detail}
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet */}
              <div className="bg-[#0e1117] rounded-xl border border-gray-800 p-3 font-mono text-[11px] overflow-x-auto">
                <pre className="text-cyan-300 whitespace-pre-wrap">{item.code}</pre>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: LIBRARIES CHEATSHEET */}
      <section id="libraries" className="scroll-mt-24">
        <PythonLibrariesCheatSheet />
      </section>
    </GuideLayout>
  );
}

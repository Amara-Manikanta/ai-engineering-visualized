import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { 
  Code2, Terminal, CheckCircle2, FileCode, Layers, 
  ShieldAlert, Cpu, Sparkles, RefreshCw, Zap, FileText
} from 'lucide-react';

export default function PythonAdvanced() {
  const toc = [
    { label: "9. Error & Exception Handling", hash: "#errors" },
    { label: "10. Object-Oriented Programming", hash: "#oop" },
    { label: "11. Type Hints & Pydantic", hash: "#type-hints" },
    { label: "12. Iterators & Generators", hash: "#generators" },
    { label: "13. Decorators", hash: "#decorators" }
  ];

  return (
    <GuideLayout
      title="Module 3: OOP & Advanced Python"
      intro="Master custom error handling, Object-Oriented design, Pydantic type validation, memory-efficient generators, and decorators."
      toc={toc}
    >
      {/* 9. ERROR HANDLING */}
      <section id="errors" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">9. Error & Exception Handling</h2>
            <p className="text-sm text-gray-400">`try-except-else-finally`, custom exceptions, stack trace chaining</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-red-400"><FileCode size={12} /> custom_exception.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`class ModelRateLimitError(Exception):
    """Raised when LLM API rate limit is exceeded."""
    pass

try:
    raise ModelRateLimitError("Quota limit hit (429). Retrying in 5s...")
except ModelRateLimitError as err:
    print(f"Handled Error: {err}")`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Handled Error: Quota limit hit (429). Retrying in 5s...</code>
          </div>
        </div>
      </section>

      {/* 10. OOP */}
      <section id="oop" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Cpu size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">10. Object-Oriented Programming (OOP)</h2>
            <p className="text-sm text-gray-400">Classes, inheritance, `@classmethod`, `@staticmethod`, dunder methods</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> oop_dunder.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-purple-300 mb-3 whitespace-pre-wrap">{`class EmbeddingStore:
    def __init__(self, name: str):
        self.name = name
        self.data = []

    def __len__(self):
        return len(self.data)

    def __call__(self, item):
        self.data.append(item)
        return f"Stored into {self.name}"

store = EmbeddingStore("Pinecone")
print(store("vec_001"))
print("Store Count:", len(store))`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Stored into Pinecone<br/>Store Count: 1</code>
          </div>
        </div>
      </section>

      {/* 11. TYPE HINTS & PYDANTIC */}
      <section id="type-hints" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">11. Type Hints & Pydantic</h2>
            <p className="text-sm text-gray-400">Type annotations, static analysis, Pydantic data validation</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> pydantic_schema.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`from pydantic import BaseModel, Field

class LLMOutputSchema(BaseModel):
    summary: str = Field(description="Summary text")
    score: float = Field(ge=0.0, le=1.0)

# Automatic validation & parsing from JSON
raw_json = '{"summary": "RAG is powerful", "score": 0.98}'
data = LLMOutputSchema.model_validate_json(raw_json)

print(f"Score: {data.score}")`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Score: 0.98</code>
          </div>
        </div>
      </section>

      {/* 12. GENERATORS */}
      <section id="generators" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <RefreshCw size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">12. Iterators & Generators</h2>
            <p className="text-sm text-gray-400">Lazy evaluation, `yield` keyword, streaming tokens without OOM</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> stream_generator.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`def token_stream():
    for word in ["Generating", "response", "token", "by", "token..."]:
        yield word + " "

for chunk in token_stream():
    print(chunk, end="", flush=True)`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Generating response token by token... </code>
          </div>
        </div>
      </section>

      {/* 13. DECORATORS */}
      <section id="decorators" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">13. Decorators</h2>
            <p className="text-sm text-gray-400">Wrappers, `@wraps`, `@lru_cache`, timing & retry logic</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><FileCode size={12} /> decorator_timer.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-amber-300 mb-3 whitespace-pre-wrap">{`import time
from functools import wraps

def time_it(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        res = func(*args, **kwargs)
        t1 = time.perf_counter()
        print(f"[{func.__name__}] took {t1 - t0:.4f}s")
        return res
    return wrapper

@time_it
def compute():
    time.sleep(0.1)
    return "Done"

compute()`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>[compute] took 0.1002s</code>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

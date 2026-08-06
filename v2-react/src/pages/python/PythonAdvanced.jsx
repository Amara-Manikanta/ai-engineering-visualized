import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { CodeSnippet } from '../../components/CodeBlock';
import { 
  Code2, Terminal, CheckCircle2, FileCode, Layers, 
  ShieldAlert, Cpu, Sparkles, RefreshCw, Zap, FileText, Settings, ArrowRight, Box
} from 'lucide-react';

export default function PythonAdvanced() {
  const toc = [
    { label: "27. Production AI Error Handling", hash: "#try-except" },
    { label: "28. Custom Exceptions & Chaining", hash: "#custom-exceptions" },
    { label: "29. Classes & __init__ Constructor", hash: "#classes-init" },
    { label: "30. OOP & RAG Abstractions", hash: "#inheritance-composition" },
    { label: "31. Python Dataclasses (@dataclass)", hash: "#dataclasses" },
    { label: "32. @classmethod vs @staticmethod", hash: "#class-static-methods" },
    { label: "33. Dunder Magic Methods", hash: "#dunder-methods" },
    { label: "34. Type Hints & FastAPI Integration", hash: "#type-hints" },
    { label: "35. Pydantic Data Validation", hash: "#pydantic-validation" },
    { label: "36. Iterables & Iterators", hash: "#iterators" },
    { label: "37. Generators & yield", hash: "#generators" },
    { label: "38. Function Decorators (@wraps)", hash: "#decorators" },
    { label: "39. Caching & @property", hash: "#caching-property" }
  ];

  return (
    <GuideLayout
      title="Module 3: OOP & Advanced Python"
      intro="Comprehensive technical guide for production AI error handling, OOP RAG abstractions, dataclasses, modern type hints for FastAPI, Pydantic type validation, lazy generators, and custom decorators."
      toc={toc}
    >
      {/* 27. TRY EXCEPT ELSE FINALLY */}
      <section id="try-except" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">27. Production AI Error Handling (`try-except-finally`)</h2>
            <p className="text-xs text-gray-400">Handling API rate limits, vector DB timeouts, and file parsing failures</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          <strong>Why is this critical for Production AI Applications?</strong> In real-world AI systems, network calls to LLM APIs (OpenAI, Anthropic), vector database queries (Pinecone, Qdrant), PDF document parsing, and network socket calls can fail due to rate limits, timeouts, or invalid keys. Robust error handling intercepts runtime exceptions cleanly, allowing applications to log errors, trigger fallback models, or retry failed calls gracefully.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-red-400"><FileCode size={12} /> 27_production_ai_error.py</span>
            <span>Production AI Pattern</span>
          </div>
          <CodeSnippet className="text-emerald-300 mb-3 whitespace-pre-wrap">{`def call_llm(prompt: str):
    # Simulated API Call
    raise TimeoutError("OpenAI API rate limit exceeded (429)")

try:
    response = call_llm("Explain RAG")
except Exception as e:
    print("LLM call failed:", e)
finally:
    print("Log telemetry & cleanup active API sessions.")`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>LLM call failed: OpenAI API rate limit exceeded (429)<br/>Log telemetry & cleanup active API sessions.</code>
          </div>
        </div>
      </section>

      {/* 28. CUSTOM EXCEPTIONS */}
      <section id="custom-exceptions" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">28. Custom Exceptions & Exception Chaining (`from`)</h2>
            <p className="text-xs text-gray-400">Inheriting from `Exception` and preserving stack traces with `raise NewError() from err`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Domain-specific exception classes inherit directly from Python's base `Exception` class, enabling clear error categorization across application layers. Exception chaining syntax (`raise CustomError(...) from original_err`) preserves the original cause and stack trace of low-level errors. This technique allows high-level callers to catch clean domain exceptions while maintaining full diagnostic traces for debugging.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> 28_custom_exception.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-purple-300 mb-3 whitespace-pre-wrap">{`class APIQuotaError(Exception):
    """Raised when LLM API rate limit is exceeded."""
    pass

try:
    raise KeyError("Missing API Key")
except KeyError as err:
    raise APIQuotaError("Authentication failed") from err`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>APIQuotaError: Authentication failed (The above exception was the direct cause)</code>
          </div>
        </div>
      </section>

      {/* 29. CLASSES AND INIT */}
      <section id="classes-init" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Cpu size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">29. Classes, Attributes & `__init__` Constructor</h2>
            <p className="text-xs text-gray-400">Encapsulation, instance attributes, and method definitions</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Object-Oriented Programming (OOP) bundles data attributes and behavior methods into reusable classes. The `__init__` constructor method initializes instance attributes when an object is instantiated, binding instance variables to `self`. Encapsulating state and behavior within classes promotes modular system design and maintainable software architecture.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 29_class_init.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-cyan-300 mb-3 whitespace-pre-wrap">{`class Agent:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role

    def execute(self, task: str):
        return f"{self.name} ({self.role}) is executing: {task}"

bot = Agent("Devin", "Code Engineer")
print(bot.execute("Refactor API"))`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Devin (Code Engineer) is executing: Refactor API</code>
          </div>
        </div>
      </section>

      {/* 30. OOP FOR RAG ABSTRACTIONS */}
      <section id="inheritance-composition" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">30. OOP & Core AI / RAG Abstractions</h2>
            <p className="text-xs text-gray-400">Modeling Retriever, Generator, Agent, Tool, Memory, VectorStore, and DocumentLoader</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          <strong>Why OOP is essential for AI Frameworks:</strong> Modern AI tools (LangChain, LlamaIndex) use OOP classes to model every core framework abstraction. OOP allows developers to define clean contracts for the 7 core AI abstractions:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs font-mono">
          <div className="bg-black/40 p-2 rounded border border-white/5 text-emerald-300 text-center font-bold">1. Retriever</div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-emerald-300 text-center font-bold">2. Generator</div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-emerald-300 text-center font-bold">3. Agent</div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-emerald-300 text-center font-bold">4. Tool</div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-purple-300 text-center font-bold">5. Memory</div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-purple-300 text-center font-bold">6. VectorStore</div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-purple-300 text-center font-bold">7. DocumentLoader</div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> 30_rag_retriever.py</span>
            <span>SimpleRetriever Class Example</span>
          </div>
          <CodeSnippet className="text-emerald-300 mb-3 whitespace-pre-wrap">{`class SimpleRetriever:
    def __init__(self, vector_db):
        self.vector_db = vector_db

    def retrieve(self, query: str):
        return self.vector_db.search(query)

# Mock Vector DB search interface
class MockVectorDB:
    def search(self, q): return ["Matched Doc Chunk"]

retriever = SimpleRetriever(MockVectorDB())
print("Retrieved Docs:", retriever.retrieve("What is RAG?"))`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Retrieved Docs: ['Matched Doc Chunk']</code>
          </div>
        </div>
      </section>

      {/* 31. DATACLASSES */}
      <section id="dataclasses" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">31. Python Dataclasses (`@dataclass`)</h2>
            <p className="text-xs text-gray-400">Auto-generating `__init__`, `__repr__`, and `__eq__` for clean data containers (Python 3.7+)</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Introduced in Python 3.7, the `@dataclass` decorator automatically generates boilerplate dunder methods like `__init__()`, `__repr__()`, and `__eq__()` based on type annotations. Dataclasses eliminate repetitive initializer code, making them the ideal choice for structured data models like document chunks, embedding vectors, and LLM response objects.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-pink-400"><FileCode size={12} /> 31_dataclass_rag.py</span>
            <span>Python 3.7+</span>
          </div>
          <CodeSnippet className="text-pink-300 mb-3 whitespace-pre-wrap">{`from dataclasses import dataclass, field
from typing import List

@dataclass
class DocumentChunk:
    doc_id: str
    content: str
    embedding: List[float] = field(default_factory=list)
    score: float = 0.0

chunk = DocumentChunk(doc_id="chunk_01", content="RAG Architecture", score=0.95)
print(chunk)`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>DocumentChunk(doc_id='chunk_01', content='RAG Architecture', embedding=[], score=0.95)</code>
          </div>
        </div>
      </section>

      {/* 32. CLASSMETHOD VS STATICKMETHOD */}
      <section id="class-static-methods" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Settings size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">32. `@classmethod` vs `@staticmethod`</h2>
            <p className="text-xs text-gray-400">Factory constructors (`cls`) vs utility functions bound to class namespace</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Standard instance methods receive `self` as their first parameter to access instance state. Methods decorated with `@classmethod` receive the class object (`cls`) as their first parameter, making them ideal for alternative factory constructors (`from_dict`, `from_json`). `@staticmethod` receives neither `self` nor `cls`, serving as an isolated utility function grouped logically inside the class namespace.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><FileCode size={12} /> 32_class_static.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-amber-300 mb-3 whitespace-pre-wrap">{`class ModelConfig:
    def __init__(self, model_id: str):
        self.model_id = model_id

    @classmethod
    def from_dict(cls, data: dict):
        return cls(model_id=data["model_id"])

    @staticmethod
    def validate_id(model_id: str) -> bool:
        return model_id.startswith("gpt")

cfg = ModelConfig.from_dict({"model_id": "gpt-4o"})
print("Model ID:", cfg.model_id)
print("Valid:", ModelConfig.validate_id(cfg.model_id))`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Model ID: gpt-4o<br/>Valid: True</code>
          </div>
        </div>
      </section>

      {/* 33. DUNDER METHODS */}
      <section id="dunder-methods" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">33. Dunder Magic Methods</h2>
            <p className="text-xs text-gray-400">`__str__`, `__repr__`, `__len__`, `__getitem__`, `__call__`, `__or__`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Special "dunder" (double underscore) methods allow custom user-defined classes to integrate seamlessly with native Python syntax. Overriding `__str__` or `__repr__` customizes string representations, `__len__` dictates `len(obj)` output, `__getitem__` allows bracket indexing (`obj[key]`), and `__call__` enables instances to be invoked like functions (`obj(arg)`).
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-rose-400"><FileCode size={12} /> 33_dunder.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-rose-300 mb-3 whitespace-pre-wrap">{`class PipelineStep:
    def __init__(self, name):
        self.name = name

    def __call__(self, input_text):
        return f"[{self.name}] ➔ {input_text}"

step = PipelineStep("Embedder")
print(step("User Query"))`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>[Embedder] ➔ User Query</code>
          </div>
        </div>
      </section>

      {/* 34. TYPE HINTS */}
      <section id="type-hints" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">34. Type Hints & FastAPI Integration</h2>
            <p className="text-xs text-gray-400">`str`, `int`, `float`, `bool`, `list[str]`, `dict[str, str]`, `Optional`, `Union`, `TypedDict`, `Pydantic models`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          <strong>Why type hints are essential for modern AI Engineering:</strong> AI tools, APIs, and microservice frameworks (such as <strong>FastAPI</strong>, LangChain, and LlamaIndex) rely on structured type annotations for request/response serialization, input validation, and IDE autocompletion. FastAPI itself is built directly on top of standard Python type hints.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4 text-xs font-mono">
          <div className="bg-black/40 p-2 rounded border border-white/5 text-center"><span className="text-teal-300 font-bold block">str</span><span className="text-[10px] text-gray-400">Text</span></div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-center"><span className="text-teal-300 font-bold block">int / float</span><span className="text-[10px] text-gray-400">Numbers</span></div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-center"><span className="text-teal-300 font-bold block">list[float]</span><span className="text-[10px] text-gray-400">Embeddings</span></div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-center"><span className="text-teal-300 font-bold block">dict[str, str]</span><span className="text-[10px] text-gray-400">Payloads</span></div>
          <div className="bg-black/40 p-2 rounded border border-white/5 text-center"><span className="text-teal-300 font-bold block">Optional[T]</span><span className="text-[10px] text-gray-400">Nullable</span></div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-teal-400"><FileCode size={12} /> 34_type_hints_ai.py</span>
            <span>FastAPI & AI Pattern</span>
          </div>
          <CodeSnippet className="text-teal-300 mb-3 whitespace-pre-wrap">{`from typing import List, Dict, Optional, Union

def embed_text(text: str) -> List[float]:
    # Returns embedding vector float list
    return [0.12, 0.45, 0.98]

print("Embedding Vector:", embed_text("What is RAG?"))`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Embedding Vector: [0.12, 0.45, 0.98]</code>
          </div>
        </div>
      </section>

      {/* 35. PYDANTIC */}
      <section id="pydantic-validation" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">35. Pydantic Data Validation</h2>
            <p className="text-xs text-gray-400">Runtime type enforcement, `BaseModel`, `Field`, and JSON schema generation</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Pydantic enforces runtime data validation powered by standard Python type annotations. By defining data models with `BaseModel` and field constraints using `Field()`, Pydantic parses, coerces, and validates untrusted API payloads automatically. If data violates defined schema contracts, Pydantic raises clear, structured validation errors.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 35_pydantic.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-cyan-300 mb-3 whitespace-pre-wrap">{`from pydantic import BaseModel, Field

class SearchQuery(BaseModel):
    query: str = Field(min_length=2)
    top_k: int = Field(default=5, ge=1, le=100)

raw_input = {"query": "RAG architecture", "top_k": 10}
parsed = SearchQuery.model_validate(raw_input)
print(f"Validated Query: '{parsed.query}' with top_k={parsed.top_k}")`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Validated Query: 'RAG architecture' with top_k=10</code>
          </div>
        </div>
      </section>

      {/* 36. ITERATORS */}
      <section id="iterators" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <RefreshCw size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">36. Iterables & Iterators</h2>
            <p className="text-xs text-gray-400">`__iter__` and `__next__` methods, `iter()`, `next()`, `StopIteration`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          An **iterable** is any object implementing `__iter__()` that produces an iterator. An **iterator** is a stateful stream object implementing `__next__()` that yields elements one at a time, raising `StopIteration` when depleted. Calling `iter(obj)` fetches the iterator, while `next(it)` retrieves subsequent items during iteration.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> 36_iterators.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-emerald-300 mb-3 whitespace-pre-wrap">{`data = ["chunk1", "chunk2"]
it = iter(data)

print(next(it))
print(next(it))`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>chunk1<br/>chunk2</code>
          </div>
        </div>
      </section>

      {/* 37. GENERATORS */}
      <section id="generators" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">37. Generators & `yield`</h2>
            <p className="text-xs text-gray-400">Lazy evaluation, state preservation, generator expressions `(x for x in list)`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Generators are specialized functions that suspend execution state and return values lazily using the `yield` keyword. Unlike standard functions that construct complete result lists in RAM before returning, generators produce items one by one on-demand. This memory-efficient architecture allows applications to process multi-gigabyte text datasets or infinite token streams without incurring Out-Of-Memory (OOM) failures.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><FileCode size={12} /> 37_generators.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-amber-300 mb-3 whitespace-pre-wrap">{`def stream_embeddings(n: int):
    for i in range(n):
        yield f"vec_{i}"

for vec in stream_embeddings(3):
    print("Streamed:", vec)`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Streamed: vec_0<br/>Streamed: vec_1<br/>Streamed: vec_2</code>
          </div>
        </div>
      </section>

      {/* 38. DECORATORS */}
      <section id="decorators" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">38. Function Decorators & `@wraps`</h2>
            <p className="text-xs text-gray-400">Extending function behavior and preserving metadata with `functools.wraps`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Decorators are higher-order functions that accept a function as input and return an augmented wrapper function, extending behavior without altering underlying code. Using `@functools.wraps(func)` on inner wrapper functions copies original function names and docstrings, maintaining accurate debugging metadata across error stack traces.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-pink-400"><FileCode size={12} /> 38_decorators.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-pink-300 mb-3 whitespace-pre-wrap">{`from functools import wraps

def log_call(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_call
def query_index():
    return "Results"

query_index()`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Calling: query_index</code>
          </div>
        </div>
      </section>

      {/* 39. CACHING AND PROPERTY */}
      <section id="caching-property" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">39. Caching (`@lru_cache`) & `@property`</h2>
            <p className="text-xs text-gray-400">Memoizing expensive calculations and defining getter/setter properties</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          The `@functools.lru_cache` decorator memoizes function outputs based on input arguments, skipping expensive recalculations or database queries when called repeatedly with identical parameters. The `@property` decorator transforms class methods into read-only attributes, enabling clean attribute access syntax while keeping internal data validation intact.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> 39_cache_property.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-blue-300 mb-3 whitespace-pre-wrap">{`from functools import lru_cache

@lru_cache(maxsize=32)
def get_embedding(text: str):
    print("Computing embedding...")
    return [0.1, 0.2, 0.3]

# First call computes; second call uses cached result
get_embedding("hello")
get_embedding("hello")`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Computing embedding...</code>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

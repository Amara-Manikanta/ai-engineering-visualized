import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { CodeSnippet } from '../../components/CodeBlock';
import { 
  Code2, Terminal, CheckCircle2, FileCode, Layers, 
  Folder, Box, Globe, FileJson, Zap, TestTube, Settings, ArrowRight, ShieldCheck
} from 'lucide-react';

export default function PythonToolingAsync() {
  const toc = [
    { label: "40. pathlib.Path Object Methods", hash: "#pathlib" },
    { label: "41. File I/O & Context Managers", hash: "#file-io" },
    { label: "42. Modules & Imports", hash: "#modules" },
    { label: "43. Project Structure & Relative Imports", hash: "#project-structure" },
    { label: "44. Virtual Envs, pip, .env & Requirements", hash: "#virtualenvs" },
    { label: "45. Working with APIs (httpx)", hash: "#apis" },
    { label: "46. JSON Parsing & Serialization", hash: "#json" },
    { label: "47. YAML Parsing & Config", hash: "#yaml" },
    { label: "48. Async Basics (async / await)", hash: "#async-basics" },
    { label: "49. asyncio.gather() Concurrency", hash: "#async-gather" },
    { label: "50. Pytest Fixtures & Assertions", hash: "#pytest-fixtures" },
    { label: "51. Pytest Parameterization & Mocks", hash: "#pytest-mocks" }
  ];

  return (
    <GuideLayout
      title="Module 4: System, Tooling & Async Python"
      intro="Comprehensive technical guide for modern file I/O, production AI project structures, virtual environments, API integration, JSON/YAML parsing, AsyncIO concurrency, and Pytest."
      toc={toc}
    >
      {/* 40. PATHLIB */}
      <section id="pathlib" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Folder size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">40. Modern Filesystem Paths (`pathlib.Path`)</h2>
            <p className="text-xs text-gray-400">Object-oriented path manipulation (`/` operator, `mkdir`, `exists`, `glob`)</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          The `pathlib` module provides an object-oriented interface for manipulating filesystem paths across operating systems. Overloaded `/` operators combine path segments cleanly regardless of OS-specific slash conventions. Methods like `.mkdir()`, `.exists()`, `.read_text()`, `.write_text()`, and `.glob()` handle file operations intuitively without legacy `os.path` string manipulation.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> 39_pathlib.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-emerald-300 mb-3 whitespace-pre-wrap">{`from pathlib import Path

base_dir = Path("./storage")
file_path = base_dir / "data.json"

base_dir.mkdir(exist_ok=True)
file_path.write_text('{"status": "ready"}')

print("Path Exists:", file_path.exists())`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Path Exists: True</code>
          </div>
        </div>
      </section>

      {/* 41. FILE IO */}
      <section id="file-io" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Folder size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">41. File I/O Modes & `with` Context Managers</h2>
            <p className="text-xs text-gray-400">Reading, writing, appending, binary mode (`rb`, `wb`), automatic file closure</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          File operations use `open(filename, mode)` to manage stream pointers across read (`'r'`), write (`'w'`), append (`'a'`), and binary (`'b'`) modes. Wrapping file operations inside `with open(...) as f:` context managers guarantees automatic resource cleanup and file handle closure even if runtime exceptions occur during reading or writing.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> 40_file_io.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-purple-300 mb-3 whitespace-pre-wrap">{`# Context manager ensures file is closed automatically
with open("log.txt", "w", encoding="utf-8") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")

with open("log.txt", "r") as f:
    lines = f.readlines()

print("Line Count:", len(lines))`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Line Count: 2</code>
          </div>
        </div>
      </section>

      {/* 42. MODULES */}
      <section id="modules" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">42. Modules & Import Mechanics</h2>
            <p className="text-xs text-gray-400">`import`, `from ... import`, aliasing `as`, `sys.path` lookup resolution</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          A Python module is a single `.py` file containing functions, classes, and executable statements. The `import` statement resolves modules using paths listed in `sys.path`, compiling them to bytecode on first load. Alias imports (`import math as m`) keep call syntax concise, while selective imports (`from module import symbol`) import specific definitions into the local namespace.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 41_imports.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-cyan-300 mb-3 whitespace-pre-wrap">{`import math as m
from datetime import datetime

now = datetime.now()
val = m.sqrt(16)

print(f"Sqrt: {val}, Date: {now.strftime('%Y-%m-%d')}")`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Sqrt: 4.0, Date: 2026-08-04</code>
          </div>
        </div>
      </section>

      {/* 43. PROJECT STRUCTURE */}
      <section id="project-structure" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Folder size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">43. AI App Project Structure & Relative Imports</h2>
            <p className="text-xs text-gray-400">Moving from one-file scripts to real modular production projects (`__init__.py`)</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          <strong>Moving from single-file scripts to production projects:</strong> Real AI applications are structured into modular packages. Directories containing <code>__init__.py</code> allow Python to recognize subfolders as packages. Developers use <strong>Absolute Imports</strong> (<code>from ai_app.rag.loader import LoadPdf</code>) or <strong>Relative Imports</strong> (<code>from .chunker import split_text</code>) to cleanly organize RAG components.
        </p>

        {/* Directory Structure Diagram */}
        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs mb-4">
          <div className="text-emerald-400 font-bold mb-2">📁 Production AI Application Directory Layout</div>
          <CodeSnippet className="text-gray-300 whitespace-pre-wrap">{`ai_app/
  ├── main.py             # Entrypoint script
  ├── rag/
  │   ├── __init__.py     # Package marker
  │   ├── loader.py       # Document Loaders (PDF, Web, DB)
  │   ├── chunker.py      # Text Splitters & Chunking
  │   ├── retriever.py    # Vector Store & Search
  │   └── generator.py    # LLM Prompt Generator
  └── utils/
      ├── __init__.py
      └── config.py       # API Keys & Settings`}</CodeSnippet>
        </div>
      </section>

      {/* 44. VIRTUAL ENVS AND PIP */}
      <section id="virtualenvs" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">44. Virtual Environments (`venv`), `pip`, `.env` & Requirements</h2>
            <p className="text-xs text-gray-400">Dependency isolation, `requirements.txt`, and API key protection with `python-dotenv`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Virtual environments create isolated Python environments for each project, avoiding package version conflicts across system Python installations. Developers install packages via <code>pip</code>, save snapshot locks to <code>requirements.txt</code>, and keep API secrets secure in <code>.env</code> files loaded using <code>python-dotenv</code>.
        </p>

        {/* Visual Isolation Model */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 text-center text-xs"
        >
          <div className="font-bold text-amber-300 mb-3 uppercase tracking-wider">🔒 Environment Isolation Architecture</div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <div className="bg-amber-900/30 border border-amber-500/40 px-3 py-2 rounded-lg">AI Project</div>
            <ArrowRight className="text-amber-400 hidden sm:block" size={16} />
            <div className="bg-purple-900/30 border border-purple-500/40 px-3 py-2 rounded-lg">Virtual Environment (`.venv`)</div>
            <ArrowRight className="text-purple-400 hidden sm:block" size={16} />
            <div className="bg-cyan-900/30 border border-cyan-500/40 px-3 py-2 rounded-lg">Installed Packages (`pip`)</div>
            <ArrowRight className="text-cyan-400 hidden sm:block" size={16} />
            <div className="bg-emerald-900/30 border border-emerald-500/40 px-3 py-2 rounded-lg">Isolated AI App</div>
          </div>
        </motion.div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><Terminal size={12} /> Terminal Commands</span>
            <span>Virtual Environment Setup</span>
          </div>
          <CodeSnippet className="text-amber-300 mb-3 whitespace-pre-wrap">{`# 1. Create Virtual Environment
$ python -m venv .venv

# 2. Activate Environment (macOS/Linux vs Windows)
$ source .venv/bin/activate        # macOS/Linux
> .venv\\Scripts\\activate          # Windows

# 3. Install AI Dependencies & Secure Secrets
$ pip install openai langchain python-dotenv
$ pip freeze > requirements.txt`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Successfully installed openai-1.12.0 langchain-0.1.0 python-dotenv-1.0.0</code>
          </div>
        </div>
      </section>

      {/* 45. APIS */}
      <section id="apis" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">45. Working with APIs (`requests` & `httpx`)</h2>
            <p className="text-xs text-gray-400">HTTP `GET`/`POST` requests, custom headers, bearer tokens, JSON responses</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          HTTP client libraries enable applications to interact with web APIs and microservices. The `requests` library provides intuitive synchronous `GET`/`POST` methods, header injection, payload encoding, and status code handling, while `httpx` adds full asynchronous `async`/`await` support for high-concurrency integrations.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-teal-400"><FileCode size={12} /> 44_api_requests.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-teal-300 mb-3 whitespace-pre-wrap">{`import requests

url = "https://httpbin.org/post"
headers = {"Authorization": "Bearer token_abc123"}
payload = {"prompt": "Explain RAG"}

res = requests.post(url, json=payload, headers=headers, timeout=5)
print("Status Code:", res.status_code)`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Status Code: 200</code>
          </div>
        </div>
      </section>

      {/* 46. JSON */}
      <section id="json" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <FileJson size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">46. JSON Parsing & Serialization</h2>
            <p className="text-xs text-gray-400">Converting string to dict (`loads`) and dict to string (`dumps`)</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          JSON (JavaScript Object Notation) is the standard data interchange format for REST APIs and configuration files. Python's built-in `json` module provides `json.loads()` to deserialize JSON strings into native dictionaries or lists, and `json.dumps()` to serialize Python objects into formatted JSON strings.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-pink-400"><FileCode size={12} /> 45_json.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-pink-300 mb-3 whitespace-pre-wrap">{`import json

json_text = '{"name": "GPT-4o", "tokens": 128000}'
data = json.loads(json_text)

print("Parsed Name:", data["name"])`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Parsed Name: GPT-4o</code>
          </div>
        </div>
      </section>

      {/* 47. YAML */}
      <section id="yaml" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <FileJson size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">47. YAML Parsing & Configuration</h2>
            <p className="text-xs text-gray-400">Loading structured YAML configuration files safely with `pyyaml`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          YAML is a human-readable data serialization language widely used for system configurations, Docker Compose definitions, and LLM framework settings. Using `pyyaml`'s `yaml.safe_load()` parses structured YAML text into nested Python dictionaries while preventing arbitrary code execution vulnerabilities associated with unsafe YAML loaders.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> 46_yaml.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-blue-300 mb-3 whitespace-pre-wrap">{`import yaml

yaml_text = """
version: '3.8'
services:
  app:
    image: python:3.11
"""

cfg = yaml.safe_load(yaml_text)
print("Image:", cfg["services"]["app"]["image"])`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Image: python:3.11</code>
          </div>
        </div>
      </section>

      {/* 48. ASYNC BASICS */}
      <section id="async-basics" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">48. Async Python Basics (`async` / `await`)</h2>
            <p className="text-xs text-gray-400">Event loops, coroutine functions, non-blocking asynchronous execution</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Asynchronous programming enables single-threaded concurrent execution of I/O-bound tasks without multi-threading overhead. Declaring functions with `async def` creates coroutines, and `await` suspends execution back to the event loop while waiting for non-blocking network or file operations to resolve.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> 47_async_basics.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-purple-300 mb-3 whitespace-pre-wrap">{`import asyncio

async def fetch_token():
    await asyncio.sleep(0.05)
    return "token_sec_99"

async def main():
    token = await fetch_token()
    print("Received:", token)

asyncio.run(main())`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Received: token_sec_99</code>
          </div>
        </div>
      </section>

      {/* 49. ASYNC GATHER */}
      <section id="async-gather" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">49. `asyncio.gather()` Parallel Concurrency</h2>
            <p className="text-xs text-gray-400">Executing multiple coroutines concurrently without multi-threading overhead</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          The `asyncio.gather(*coroutines)` function executes multiple coroutines concurrently on a single event loop. Instead of sequentially waiting for independent API calls one by one, `gather()` dispatches them simultaneously, collecting all results into a single list once every coroutine finishes.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 48_async_gather.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-cyan-300 mb-3 whitespace-pre-wrap">{`import asyncio

async def call_llm(prompt_id):
    await asyncio.sleep(0.1)
    return f"Response {prompt_id}"

async def main():
    prompts = [call_llm(i) for i in range(3)]
    results = await asyncio.gather(*prompts)
    print("Parallel Batch:", results)

asyncio.run(main())`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Parallel Batch: ['Response 0', 'Response 1', 'Response 2']</code>
          </div>
        </div>
      </section>

      {/* 50. PYTEST FIXTURES */}
      <section id="pytest-fixtures" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <TestTube size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">50. Pytest Fixtures & Assertions</h2>
            <p className="text-xs text-gray-400">Reusable test setups with `@pytest.fixture` and plain `assert` statements</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Pytest is Python's premier testing framework, replacing verbose `unittest` boilerplate with clean Python `assert` expressions. The `@pytest.fixture` decorator defines reusable setup/teardown logic, injecting dependencies directly into test functions as named arguments.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> test_fixtures.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-emerald-300 mb-3 whitespace-pre-wrap">{`import pytest

@pytest.fixture
def sample_vector():
    return [0.1, 0.5, 0.9]

def test_vector_dim(sample_vector):
    assert len(sample_vector) == 3
    assert sample_vector[0] == 0.1`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>test_fixtures.py . [100%] PASSED</code>
          </div>
        </div>
      </section>

      {/* 51. PYTEST PARAMETRIZE & MOCKS */}
      <section id="pytest-mocks" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <TestTube size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">51. Pytest Parameterization & Mocks</h2>
            <p className="text-xs text-gray-400">Data-driven testing (`@pytest.mark.parametrize`) and API mocking (`unittest.mock`)</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          The `@pytest.mark.parametrize` decorator runs a single test function repeatedly across multiple sets of input parameters and expected outcomes. When testing external APIs, `unittest.mock.MagicMock` replaces network dependencies with controlled mock objects, ensuring unit test suites execute fast and deterministically.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><FileCode size={12} /> test_parametrize.py</span>
            <span>Python 3.11</span>
          </div>
          <CodeSnippet className="text-amber-300 mb-3 whitespace-pre-wrap">{`import pytest
from unittest.mock import MagicMock

@pytest.mark.parametrize("val, expected", [(2, 4), (3, 9), (4, 16)])
def test_squares(val, expected):
    assert val ** 2 == expected

def test_mock_api():
    mock_client = MagicMock()
    mock_client.generate.return_value = "Mocked Response"
    assert mock_client.generate("prompt") == "Mocked Response"`}</CodeSnippet>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>test_parametrize.py .... [100%] PASSED</code>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

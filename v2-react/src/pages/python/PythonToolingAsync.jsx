import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { 
  Code2, Terminal, CheckCircle2, FileCode, Layers, 
  Folder, Box, Globe, FileJson, Zap, TestTube, Settings, ArrowRight
} from 'lucide-react';

export default function PythonToolingAsync() {
  const toc = [
    { label: "39. pathlib.Path Object Methods", hash: "#pathlib" },
    { label: "40. File I/O & Context Managers", hash: "#file-io" },
    { label: "41. Modules & Import System", hash: "#modules" },
    { label: "42. Packages & __init__.py", hash: "#packages" },
    { label: "43. Virtual Envs (venv, uv, poetry)", hash: "#virtualenvs" },
    { label: "44. Working with APIs (httpx)", hash: "#apis" },
    { label: "45. JSON Parsing & Serialization", hash: "#json" },
    { label: "46. YAML Parsing & Config", hash: "#yaml" },
    { label: "47. Async Basics (async / await)", hash: "#async-basics" },
    { label: "48. asyncio.gather() Concurrency", hash: "#async-gather" },
    { label: "49. Pytest Fixtures & Assertions", hash: "#pytest-fixtures" },
    { label: "50. Pytest Parameterization & Mocks", hash: "#pytest-mocks" }
  ];

  return (
    <GuideLayout
      title="Module 4: System, Tooling & Async Python"
      intro="Granular breakdown of modern file I/O, virtual environments, API integration, JSON/YAML parsing, AsyncIO concurrency, and Pytest."
      toc={toc}
    >
      {/* 39. PATHLIB */}
      <section id="pathlib" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Folder size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">39. Modern Filesystem Paths (`pathlib.Path`)</h2>
            <p className="text-xs text-gray-400">Object-oriented path manipulation (`/` operator, `mkdir`, `exists`, `glob`)</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> 39_pathlib.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`from pathlib import Path

base_dir = Path("./storage")
file_path = base_dir / "data.json"

base_dir.mkdir(exist_ok=True)
file_path.write_text('{"status": "ready"}')

print("Path Exists:", file_path.exists())`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Path Exists: True</code>
          </div>
        </div>
      </section>

      {/* 40. FILE IO */}
      <section id="file-io" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Folder size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">40. File I/O Modes & `with` Context Managers</h2>
            <p className="text-xs text-gray-400">Reading, writing, appending, binary mode (`rb`, `wb`), automatic file closure</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> 40_file_io.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-purple-300 mb-3 whitespace-pre-wrap">{`# Context manager ensures file is closed automatically
with open("log.txt", "w", encoding="utf-8") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")

with open("log.txt", "r") as f:
    lines = f.readlines()

print("Line Count:", len(lines))`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Line Count: 2</code>
          </div>
        </div>
      </section>

      {/* 41. MODULES */}
      <section id="modules" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">41. Modules & Import Mechanics</h2>
            <p className="text-xs text-gray-400">`import`, `from ... import`, aliasing `as`, `sys.path` lookup resolution</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 41_imports.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`import math as m
from datetime import datetime

now = datetime.now()
val = m.sqrt(16)

print(f"Sqrt: {val}, Date: {now.strftime('%Y-%m-%d')}")`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Sqrt: 4.0, Date: 2026-08-04</code>
          </div>
        </div>
      </section>

      {/* 42. PACKAGES */}
      <section id="packages" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">42. Packages, `__init__.py` & `__main__`</h2>
            <p className="text-xs text-gray-400">Directory packages, `__all__` exports, and entrypoint execution guards</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> 42_main_guard.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`def main():
    print("Application entrypoint executed.")

if __name__ == "__main__":
    main()`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Application entrypoint executed.</code>
          </div>
        </div>
      </section>

      {/* 43. VIRTUAL ENVS */}
      <section id="virtualenvs" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">43. Virtual Environments (`venv`, `uv`, `poetry`)</h2>
            <p className="text-xs text-gray-400">Isolated dependencies, reproducible environments, locking dependencies</p>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-xs space-y-2 text-amber-300">
          <div># Create environment with stdlib venv</div>
          <div className="text-gray-400">python -m venv .venv</div>
          <div># Ultra-fast resolution & installation with uv</div>
          <div className="text-gray-400">uv pip install httpx pydantic pytest</div>
        </div>
      </section>

      {/* 44. APIS */}
      <section id="apis" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">44. Working with APIs (`requests` & `httpx`)</h2>
            <p className="text-xs text-gray-400">HTTP `GET`/`POST` requests, custom headers, bearer tokens, JSON responses</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-teal-400"><FileCode size={12} /> 44_api_requests.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-teal-300 mb-3 whitespace-pre-wrap">{`import requests

url = "https://httpbin.org/post"
headers = {"Authorization": "Bearer token_abc123"}
payload = {"prompt": "Explain RAG"}

res = requests.post(url, json=payload, headers=headers, timeout=5)
print("Status Code:", res.status_code)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Status Code: 200</code>
          </div>
        </div>
      </section>

      {/* 45. JSON */}
      <section id="json" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <FileJson size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">45. JSON Parsing & Serialization</h2>
            <p className="text-xs text-gray-400">Converting string to dict (`loads`) and dict to string (`dumps`)</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-pink-400"><FileCode size={12} /> 45_json.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-pink-300 mb-3 whitespace-pre-wrap">{`import json

json_text = '{"name": "GPT-4o", "tokens": 128000}'
data = json.loads(json_text)

print("Parsed Name:", data["name"])`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Parsed Name: GPT-4o</code>
          </div>
        </div>
      </section>

      {/* 46. YAML */}
      <section id="yaml" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <FileJson size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">46. YAML Parsing & Configuration</h2>
            <p className="text-xs text-gray-400">Loading structured YAML configuration files safely with `pyyaml`</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> 46_yaml.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-blue-300 mb-3 whitespace-pre-wrap">{`import yaml

yaml_text = """
version: '3.8'
services:
  app:
    image: python:3.11
"""

cfg = yaml.safe_load(yaml_text)
print("Image:", cfg["services"]["app"]["image"])`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Image: python:3.11</code>
          </div>
        </div>
      </section>

      {/* 47. ASYNC BASICS */}
      <section id="async-basics" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">47. Async Python Basics (`async` / `await`)</h2>
            <p className="text-xs text-gray-400">Event loops, coroutine functions, non-blocking asynchronous execution</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> 47_async_basics.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-purple-300 mb-3 whitespace-pre-wrap">{`import asyncio

async def fetch_token():
    await asyncio.sleep(0.05)
    return "token_sec_99"

async def main():
    token = await fetch_token()
    print("Received:", token)

asyncio.run(main())`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Received: token_sec_99</code>
          </div>
        </div>
      </section>

      {/* 48. ASYNC GATHER */}
      <section id="async-gather" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">48. `asyncio.gather()` Parallel Concurrency</h2>
            <p className="text-xs text-gray-400">Executing multiple coroutines concurrently without multi-threading overhead</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 48_async_gather.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`import asyncio

async def call_llm(prompt_id):
    await asyncio.sleep(0.1)
    return f"Response {prompt_id}"

async def main():
    prompts = [call_llm(i) for i in range(3)]
    results = await asyncio.gather(*prompts)
    print("Parallel Batch:", results)

asyncio.run(main())`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Parallel Batch: ['Response 0', 'Response 1', 'Response 2']</code>
          </div>
        </div>
      </section>

      {/* 49. PYTEST FIXTURES */}
      <section id="pytest-fixtures" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <TestTube size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">49. Pytest Fixtures & Assertions</h2>
            <p className="text-xs text-gray-400">Reusable test setups with `@pytest.fixture` and plain `assert` statements</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> test_fixtures.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`import pytest

@pytest.fixture
def sample_vector():
    return [0.1, 0.5, 0.9]

def test_vector_dim(sample_vector):
    assert len(sample_vector) == 3
    assert sample_vector[0] == 0.1`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>test_fixtures.py . [100%] PASSED</code>
          </div>
        </div>
      </section>

      {/* 50. PYTEST PARAMETRIZE & MOCKS */}
      <section id="pytest-mocks" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <TestTube size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">50. Pytest Parameterization & Mocks</h2>
            <p className="text-xs text-gray-400">Data-driven testing (`@pytest.mark.parametrize`) and API mocking (`unittest.mock`)</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><FileCode size={12} /> test_parametrize.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-amber-300 mb-3 whitespace-pre-wrap">{`import pytest
from unittest.mock import MagicMock

@pytest.mark.parametrize("val, expected", [(2, 4), (3, 9), (4, 16)])
def test_squares(val, expected):
    assert val ** 2 == expected

def test_mock_api():
    mock_client = MagicMock()
    mock_client.generate.return_value = "Mocked Response"
    assert mock_client.generate("prompt") == "Mocked Response"`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>test_parametrize.py .... [100%] PASSED</code>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

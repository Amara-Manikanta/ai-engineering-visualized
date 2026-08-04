import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { 
  Code2, Terminal, CheckCircle2, FileCode, Layers, 
  Folder, Box, Globe, FileJson, Zap, TestTube
} from 'lucide-react';

export default function PythonToolingAsync() {
  const toc = [
    { label: "14. Files & Paths (pathlib)", hash: "#files-paths" },
    { label: "15. Modules & Packages", hash: "#modules-packages" },
    { label: "16. Virtual Environments", hash: "#virtual-environments" },
    { label: "17. Working with APIs", hash: "#apis" },
    { label: "18. JSON & YAML Parsing", hash: "#json-yaml" },
    { label: "19. Async Python (asyncio)", hash: "#async-python" },
    { label: "20. Testing with Pytest", hash: "#pytest" }
  ];

  return (
    <GuideLayout
      title="Module 4: System, Tooling & Async Python"
      intro="Master modern file paths (`pathlib`), package management, API calls, JSON/YAML serialization, AsyncIO, and Pytest."
      toc={toc}
    >
      {/* 14. FILES & PATHS */}
      <section id="files-paths" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Folder size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">14. Files & Paths (pathlib)</h2>
            <p className="text-sm text-gray-400">Object-oriented filesystem paths with `pathlib.Path`</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> pathlib_demo.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`from pathlib import Path

data_dir = Path("./data/documents")
data_dir.mkdir(parents=True, exist_ok=True)

file_path = data_dir / "embeddings.txt"
file_path.write_text("1536 dimension vector data")

print(f"File Size: {file_path.stat().st_size} bytes")`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>File Size: 26 bytes</code>
          </div>
        </div>
      </section>

      {/* 15. MODULES & PACKAGES */}
      <section id="modules-packages" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">15. Modules & Packages</h2>
            <p className="text-sm text-gray-400">Import system, `__init__.py`, `__main__`, package distribution</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> main_block.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-purple-300 mb-3 whitespace-pre-wrap">{`def run_pipeline():
    print("Executing RAG Pipeline...")

if __name__ == "__main__":
    # Runs only when script is executed directly, not when imported
    run_pipeline()`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Executing RAG Pipeline...</code>
          </div>
        </div>
      </section>

      {/* 16. VIRTUAL ENVIRONMENTS */}
      <section id="virtual-environments" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">16. Virtual Environments</h2>
            <p className="text-sm text-gray-400">Isolated dependencies with `venv`, `poetry`, and ultra-fast `uv`</p>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-xs space-y-2 text-cyan-300">
          <div># Create virtual environment</div>
          <div className="text-gray-400">python -m venv .venv</div>
          <div># Activate environment (Mac/Linux)</div>
          <div className="text-gray-400">source .venv/bin/activate</div>
          <div># Ultra-fast modern package management with uv</div>
          <div className="text-gray-400">uv pip install langchain openai pydantic</div>
        </div>
      </section>

      {/* 17. WORKING WITH APIS */}
      <section id="apis" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">17. Working with APIs</h2>
            <p className="text-sm text-gray-400">HTTP requests, headers, payload delivery with `requests` & `httpx`</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> api_call.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`import requests

url = "https://api.github.com/zen"
response = requests.get(url, timeout=5)

if response.status_code == 200:
    print(f"GitHub Zen: '{response.text}'")`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>GitHub Zen: 'Practicality beats purity.'</code>
          </div>
        </div>
      </section>

      {/* 18. JSON & YAML */}
      <section id="json-yaml" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <FileJson size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">18. JSON & YAML Parsing</h2>
            <p className="text-sm text-gray-400">Serialization & deserialization with `json` and `pyyaml`</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><FileCode size={12} /> json_demo.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-amber-300 mb-3 whitespace-pre-wrap">{`import json

data = {"model": "gpt-4o", "temperature": 0.2, "max_tokens": 1000}
json_str = json.dumps(data, indent=2)

print(json_str)`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>{`{\n  "model": "gpt-4o",\n  "temperature": 0.2,\n  "max_tokens": 1000\n}`}</code>
          </div>
        </div>
      </section>

      {/* 19. ASYNC PYTHON */}
      <section id="async-python" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">19. Async Python (asyncio)</h2>
            <p className="text-sm text-gray-400">Non-blocking `async`/`await` and parallel coroutine gathering</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-indigo-400"><FileCode size={12} /> asyncio_demo.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-indigo-300 mb-3 whitespace-pre-wrap">{`import asyncio

async def fetch_data(id: int):
    await asyncio.sleep(0.1)
    return f"Data {id}"

async def main():
    results = await asyncio.gather(*(fetch_data(i) for i in range(3)))
    print("Parallel Results:", results)

asyncio.run(main())`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Parallel Results: ['Data 0', 'Data 1', 'Data 2']</code>
          </div>
        </div>
      </section>

      {/* 20. PYTEST */}
      <section id="pytest" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30">
            <TestTube size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">20. Testing with Pytest</h2>
            <p className="text-sm text-gray-400">Assertions, fixtures, `@pytest.mark.parametrize`</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-green-400"><FileCode size={12} /> test_tokenizer.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-green-300 mb-3 whitespace-pre-wrap">{`import pytest

def clean_text(text: str) -> str:
    return text.strip().lower()

@pytest.mark.parametrize("input_str, expected", [
    ("  Hello  ", "hello"),
    ("WORLD", "world")
])
def test_clean_text(input_str, expected):
    assert clean_text(input_str) == expected`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>test_tokenizer.py .. [100%] PASSED</code>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

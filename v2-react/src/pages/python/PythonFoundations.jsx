import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { 
  Code2, Terminal, Play, Sparkles, CheckCircle2, FileCode, Cpu, Layers, 
  ArrowRight, ShieldCheck, Zap, HelpCircle, Variable, GitBranch
} from 'lucide-react';

export default function PythonFoundations() {
  const toc = [
    { label: "1. What is Python & Basics", hash: "#what-is-python" },
    { label: "2. Variables & Data Types", hash: "#variables-datatypes" },
    { label: "3. Operators & Expressions", hash: "#operators" },
    { label: "4. Control Flow", hash: "#control-flow" }
  ];

  return (
    <GuideLayout
      title="Module 1: Python Foundations"
      intro="Master Python syntax, execution mechanics, dynamic typing, memory references, operators, and control flow structures."
      toc={toc}
    >
      {/* 1. WHAT IS PYTHON */}
      <section id="what-is-python" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Code2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">1. What is Python & Syntax Basics</h2>
            <p className="text-sm text-gray-400">Interpreted, dynamically typed, multi-paradigm language</p>
          </div>
        </div>

        {/* Animated Visual Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
            <Cpu className="text-blue-400" size={20} /> Execution Pipeline: Code ➔ Bytecode ➔ PVM
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center my-4">
            <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-xl">
              <span className="text-xs font-mono text-blue-300 block">script.py</span>
              <span className="text-[10px] text-gray-400">Source Code</span>
            </div>
            <div className="flex items-center justify-center text-blue-400 font-bold">➔ CPython ➔</div>
            <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded-xl">
              <span className="text-xs font-mono text-purple-300 block">script.pyc</span>
              <span className="text-[10px] text-gray-400">Bytecode</span>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-xl">
              <span className="text-xs font-mono text-emerald-300 block">PVM</span>
              <span className="text-[10px] text-gray-400">CPU Execution</span>
            </div>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Python code is compiled into bytecode (`.pyc`) by CPython, which is then executed line-by-line inside the Python Virtual Machine (PVM). Python uses indentation (4 spaces) for block scoping instead of curly braces.
          </p>
        </motion.div>

        {/* Syntax Box & Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black/40 p-5 rounded-xl border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Syntax & Rules</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <span><strong>Indentation:</strong> 4 spaces define code blocks (functions, loops, conditionals).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <span><strong>Comments:</strong> Use `#` for single-line comments and `"""` for docstrings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <span><strong>Global Interpreter Lock (GIL):</strong> Allows only one thread to execute Python bytecode at a time.</span>
              </li>
            </ul>
          </div>

          {/* Sample Code & Output */}
          <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
              <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> hello.py</span>
              <span>Python 3.11</span>
            </div>
            <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`# First Python Script
def greet(name: str) -> str:
    """Returns a personalized greeting."""
    return f"Hello, {name}! Welcome to AI Engineering."

message = greet("Engineer")
print(message)`}</pre>
            <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
              <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
              <code>Hello, Engineer! Welcome to AI Engineering.</code>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VARIABLES & DATATYPES */}
      <section id="variables-datatypes" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Variable size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">2. Variables & Data Types</h2>
            <p className="text-sm text-gray-400">Dynamic typing, memory references (`id`), immutability</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-purple-300 mb-2">Memory Allocation & Immutability</h3>
          <p className="text-xs text-gray-300 leading-relaxed mb-4">
            In Python, variables are <em>labels pointing to objects in heap memory</em>, not memory boxes. Reassigning a variable changes its pointer, not the underlying object value.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-black/40 p-3 rounded-lg border border-purple-500/30">
              <span className="font-bold text-purple-300 block mb-1">int / float</span>
              <span className="text-[10px] text-gray-400">Immutable numbers (`42`, `3.14159`)</span>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-purple-500/30">
              <span className="font-bold text-purple-300 block mb-1">str / bytes</span>
              <span className="text-[10px] text-gray-400">Immutable text & raw binary data</span>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-purple-500/30">
              <span className="font-bold text-purple-300 block mb-1">bool / None</span>
              <span className="text-[10px] text-gray-400">`True`, `False`, `NoneType`</span>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-purple-500/30">
              <span className="font-bold text-purple-300 block mb-1">list / dict / set</span>
              <span className="text-[10px] text-gray-400">Mutable data containers</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black/40 p-5 rounded-xl border border-white/5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Syntax & Type Checking</h4>
            <div className="space-y-2 font-mono text-xs text-gray-300">
              <div><span className="text-purple-400">x</span> = 10 <span className="text-gray-500"># int</span></div>
              <div><span className="text-purple-400">y</span> = 3.14 <span className="text-gray-500"># float</span></div>
              <div><span className="text-purple-400">name</span> = "Py" <span className="text-gray-500"># str</span></div>
              <div><span className="text-purple-400">type(x)</span> ➔ &lt;class 'int'&gt;</div>
              <div><span className="text-purple-400">id(x)</span> ➔ Unique Memory Address</div>
            </div>
          </div>

          <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
              <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> memory_demo.py</span>
              <span>Python 3.11</span>
            </div>
            <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`a = [1, 2, 3]
b = a          # Same memory pointer
b.append(4)    # Mutates object shared by a and b

print(f"a: {a}")
print(f"Same Memory Address? {a is b}")`}</pre>
            <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
              <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
              <code>a: [1, 2, 3, 4]<br/>Same Memory Address? True</code>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPERATORS & EXPRESSIONS */}
      <section id="operators" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">3. Operators & Expressions</h2>
            <p className="text-sm text-gray-400">Arithmetic, Logical, Bitwise, Identity (`is`), Membership (`in`)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-xs">
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <h4 className="font-bold text-cyan-300 mb-2">Arithmetic & Division</h4>
            <div className="font-mono text-gray-300 space-y-1">
              <div>10 / 3 ➔ 3.3333 (Float Div)</div>
              <div>10 // 3 ➔ 3 (Floor Div)</div>
              <div>10 % 3 ➔ 1 (Modulo)</div>
              <div>2 ** 8 ➔ 256 (Exponent)</div>
            </div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <h4 className="font-bold text-cyan-300 mb-2">Identity vs Equality</h4>
            <div className="font-mono text-gray-300 space-y-1">
              <div>== ➔ Compares values</div>
              <div>is ➔ Compares memory address</div>
              <div>[1] == [1] ➔ True</div>
              <div>[1] is [1] ➔ False</div>
            </div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <h4 className="font-bold text-cyan-300 mb-2">Membership & Logical</h4>
            <div className="font-mono text-gray-300 space-y-1">
              <div>"py" in "python" ➔ True</div>
              <div>and / or / not</div>
              <div>Walrus: (n := len(x)) &gt; 5</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> operators_demo.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`# Walrus Operator := (Assignment Expression)
text = "Artificial Intelligence"
if (length := len(text)) > 10:
    print(f"Long string with {length} characters.")`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Long string with 23 characters.</code>
          </div>
        </div>
      </section>

      {/* 4. CONTROL FLOW */}
      <section id="control-flow" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <GitBranch size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">4. Control Flow</h2>
            <p className="text-sm text-gray-400">`if-elif-else`, `for`, `while`, `enumerate`, and `match-case`</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black/40 p-5 rounded-xl border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Control Constructs</h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div><strong>for...else:</strong> The `else` block runs if loop finishes without hitting a `break`.</div>
              <div><strong>enumerate():</strong> Yields `(index, item)` pairs for clean index tracking.</div>
              <div><strong>match...case:</strong> Structural pattern matching introduced in Python 3.10.</div>
            </div>
          </div>

          <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
              <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> pattern_matching.py</span>
              <span>Python 3.10+</span>
            </div>
            <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`command = {"action": "search", "query": "RAG"}

match command:
    case {"action": "search", "query": q}:
        print(f"Searching for: {q}")
    case {"action": "quit"}:
        print("Exiting...")
    case _:
        print("Unknown command")`}</pre>
            <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
              <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
              <code>Searching for: RAG</code>
            </div>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

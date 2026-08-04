import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { 
  Code2, Terminal, CheckCircle2, FileCode, Cpu, Layers, 
  ArrowRight, ShieldCheck, Zap, Variable, GitBranch, Equal, Hash, HelpCircle
} from 'lucide-react';

export default function PythonFoundations() {
  const toc = [
    { label: "1. What is Python?", hash: "#what-is-python" },
    { label: "2. Compilation & Bytecode", hash: "#compilation" },
    { label: "3. Indentation & Block Scoping", hash: "#indentation" },
    { label: "4. Variables & Memory References", hash: "#variables" },
    { label: "5. Data Types & Immutability", hash: "#data-types" },
    { label: "6. Arithmetic & Bitwise Operators", hash: "#arithmetic-ops" },
    { label: "7. Logical & Comparison Operators", hash: "#logical-ops" },
    { label: "8. Identity (is) vs Equality (==)", hash: "#identity-vs-equality" },
    { label: "9. Walrus Operator (:=)", hash: "#walrus-operator" },
    { label: "10. if-elif-else & Ternary Operator", hash: "#if-else" },
    { label: "11. for Loops & for...else", hash: "#for-loops" },
    { label: "12. while Loops, break, continue & pass", hash: "#while-loops" },
    { label: "13. enumerate() & zip() Functions", hash: "#enumerate-zip" },
    { label: "14. Structural Pattern Matching (match-case)", hash: "#match-case" }
  ];

  return (
    <GuideLayout
      title="Module 1: Python Foundations"
      intro="Comprehensive technical reference explaining every fundamental Python concept with multi-sentence breakdowns, syntax blocks, executable code, and verified terminal outputs."
      toc={toc}
    >
      {/* 1. WHAT IS PYTHON */}
      <section id="what-is-python" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Code2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">1. What is Python?</h2>
            <p className="text-xs text-gray-400">High-level, interpreted, general-purpose programming language</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Python is an interpreted, high-level, dynamically typed programming language created by Guido van Rossum in 1991. It emphasizes developer velocity and clean code readability through minimalist syntax and an extensive standard library often referred to as "batteries included". In modern AI engineering, Python acts as the universal glue language that seamlessly interfaces developer APIs with high-performance C/C++ engines and CUDA GPU accelerators.
        </p>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-4 text-xs">
          <div className="font-bold text-blue-300 uppercase tracking-wider mb-2">⚡ Syntax Definition</div>
          <code className="text-gray-300 font-mono">print("object", ..., sep=' ', end='\n', file=sys.stdout, flush=False)</code>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> 01_hello_world.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`import sys

print("Hello, Python!")
print("Python Version:", sys.version.split()[0])`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Hello, Python!<br/>Python Version: 3.11.5</code>
          </div>
        </div>
      </section>

      {/* 2. COMPILATION & BYTECODE */}
      <section id="compilation" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Cpu size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">2. Compilation Pipeline & Bytecode</h2>
            <p className="text-xs text-gray-400">How CPython translates source code into `.pyc` and executes inside PVM</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Python source code (`.py`) is not executed directly by CPU hardware; it is first compiled by CPython into platform-independent intermediate bytecode (`.pyc`). This compiled bytecode is cached in the `__pycache__` directory to accelerate startup times on subsequent script runs. The Python Virtual Machine (PVM) then reads this bytecode instruction by instruction, executing the corresponding C library calls that allocate memory and perform computation.
        </p>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-4 text-xs">
          <div className="font-bold text-indigo-300 uppercase tracking-wider mb-2">⚡ Inspecting Bytecode Syntax</div>
          <code className="text-gray-300 font-mono">import dis; dis.dis(function_name)</code>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-indigo-400"><FileCode size={12} /> 02_disassemble.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-indigo-300 mb-3 whitespace-pre-wrap">{`import dis

def add(a, b):
    return a + b

# Inspect bytecode disassembly generated by CPython
dis.dis(add)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>{`  2           0 LOAD_FAST                0 (a)\n              2 LOAD_FAST                1 (b)\n              4 BINARY_OP                0 (+)\n              8 RETURN_VALUE`}</code>
          </div>
        </div>
      </section>

      {/* 3. INDENTATION */}
      <section id="indentation" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">3. Indentation & Block Scoping</h2>
            <p className="text-xs text-gray-400">PEP 8 standards, 4-space indentation, `IndentationError` prevention</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Unlike languages like C++, Java, or JavaScript that use curly braces `{}` to define code blocks, Python enforces block structure using uniform whitespace indentation. According to official PEP 8 guidelines, developers must use exactly 4 spaces per indentation level rather than mixing tabs and spaces. Mixing tabs and spaces results in an explicit `IndentationError` or `TabError` at compile time, guaranteeing uniform readability across codebases.
        </p>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-4 text-xs">
          <div className="font-bold text-purple-300 uppercase tracking-wider mb-2">⚡ Syntax Rule</div>
          <code className="text-gray-300 font-mono">header_statement:<br/>&nbsp;&nbsp;&nbsp;&nbsp;indented_block_statement_1<br/>&nbsp;&nbsp;&nbsp;&nbsp;indented_block_statement_2</code>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> 03_indentation.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-purple-300 mb-3 whitespace-pre-wrap">{`def check_value(val):
    if val > 0:
        print("Positive")
        if val > 100:
            print("Large Positive")
    else:
        print("Non-positive")

check_value(150)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Positive<br/>Large Positive</code>
          </div>
        </div>
      </section>

      {/* 4. VARIABLES */}
      <section id="variables" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Variable size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">4. Variables & Memory References</h2>
            <p className="text-xs text-gray-400">Dynamic typing, memory addresses (`id()`), variable pointers</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Variables in Python do not act as fixed memory containers storing raw values; rather, they serve as dynamic pointer labels that reference underlying objects in heap memory. When assigning `y = x`, both `y` and `x` point to the exact same object in memory until one of the variables is reassigned. You can inspect an object's unique memory address at runtime using Python's built-in `id()` function.
        </p>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-4 text-xs">
          <div className="font-bold text-cyan-300 uppercase tracking-wider mb-2">⚡ Memory Address Function</div>
          <code className="text-gray-300 font-mono">id(object) -&gt; int (Returns unique integer memory address)</code>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 04_memory_ref.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`x = [10, 20]
y = x

print("x memory address:", id(x))
print("y memory address:", id(y))
print("Are references identical?", id(x) == id(y))`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>x memory address: 140705892100416<br/>y memory address: 140705892100416<br/>Are references identical? True</code>
          </div>
        </div>
      </section>

      {/* 5. DATA TYPES */}
      <section id="data-types" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Hash size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">5. Built-in Data Types & Immutability</h2>
            <p className="text-xs text-gray-400">`int`, `float`, `str`, `bool`, `bytes`, `NoneType` vs mutable containers</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Every value in Python is an instance of an object class. Data types are strictly divided into **immutable** types (`int`, `float`, `str`, `tuple`, `bytes`) whose values cannot be modified after instantiation, and **mutable** types (`list`, `dict`, `set`) that allow elements to be modified in-place. Attempting to mutate an immutable object creates an entirely new object at a different memory address.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> 05_datatypes.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`a = 42
b = 3.14159
c = "AI"
d = True
e = None
f = b"raw_bytes"

print(type(a), type(b), type(c), type(d), type(e), type(f))`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>&lt;class 'int'&gt; &lt;class 'float'&gt; &lt;class 'str'&gt; &lt;class 'bool'&gt; &lt;class 'NoneType'&gt; &lt;class 'bytes'&gt;</code>
          </div>
        </div>
      </section>

      {/* 6. ARITHMETIC OPERATORS */}
      <section id="arithmetic-ops" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">6. Arithmetic & Bitwise Operators</h2>
            <p className="text-xs text-gray-400">`+`, `-`, `*`, `/`, `//` (floor div), `%` (modulo), `**` (power), `&`, `|`, `^`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Python provides comprehensive mathematical operators, including standard arithmetic and advanced operations like floor division (`//`) and exponentiation (`**`). Floor division always rounds down the quotient to the nearest integer, whereas modulo (`%`) returns the remainder. Bitwise operators (`&`, `|`, `^`, `~`, `&lt;&lt;`, `&gt;&gt;`) operate directly on individual bits of integers, enabling high-performance binary flags and bitmask calculations.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><FileCode size={12} /> 06_operators.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-amber-300 mb-3 whitespace-pre-wrap">{`a, b = 17, 5

print("Float Division (a / b):", a / b)
print("Floor Division (a // b):", a // b)
print("Modulo (a % b):", a % b)
print("Power (a ** b):", a ** b)
print("Bitwise AND (a & b):", a & b)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Float Division (a / b): 3.4<br/>Floor Division (a // b): 3<br/>Modulo (a % b): 2<br/>Power (a ** b): 1419857<br/>Bitwise AND (a & b): 1</code>
          </div>
        </div>
      </section>

      {/* 7. LOGICAL OPERATORS */}
      <section id="logical-ops" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">7. Logical & Comparison Operators</h2>
            <p className="text-xs text-gray-400"><code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>and</code>, <code>or</code>, <code>not</code> (Short-circuit evaluation)</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Comparison operators evaluate relative values and return boolean results (`True` or `False`). Logical operators (`and`, `or`, `not`) perform short-circuit evaluation. This means in an expression like `A and B`, if `A` evaluates to `False`, Python immediately skips evaluating `B`, which prevents unexpected errors like division by zero or null pointer dereferences.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-teal-400"><FileCode size={12} /> 07_logical_ops.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-teal-300 mb-3 whitespace-pre-wrap">{`score = 85
is_passing = score >= 50 and score <= 100
has_honors = score > 80 or not is_passing

print("Is Passing:", is_passing)
print("Has Honors:", has_honors)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Is Passing: True<br/>Has Honors: True</code>
          </div>
        </div>
      </section>

      {/* 8. IDENTITY VS EQUALITY */}
      <section id="identity-vs-equality" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Equal size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">8. Identity (`is`) vs Equality (`==`) & Membership (`in`)</h2>
            <p className="text-xs text-gray-400">Value comparison (`==`) vs memory identity (`is`), substring & collection checking (`in`)</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          The equality operator `==` compares the actual data values contained within two objects, whereas the identity operator `is` checks whether both variables point to the exact same memory address. Utilizing `is` for value comparisons can cause unexpected bugs due to CPython's internal integer caching mechanism. The `in` operator provides convenient membership testing across strings, lists, sets, and dictionary keys.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-rose-400"><FileCode size={12} /> 08_identity.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-rose-300 mb-3 whitespace-pre-wrap">{`list_a = [1, 2, 3]
list_b = [1, 2, 3]

print("list_a == list_b (Value):", list_a == list_b)
print("list_a is list_b (Address):", list_a is list_b)

print("'vector' in 'vector_search':", 'vector' in 'vector_search')`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>list_a == list_b (Value): True<br/>list_a is list_b (Address): False<br/>'vector' in 'vector_search': True</code>
          </div>
        </div>
      </section>

      {/* 9. WALRUS OPERATOR */}
      <section id="walrus-operator" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">9. Assignment Expressions (The Walrus Operator `:=`)</h2>
            <p className="text-xs text-gray-400">Assigning values to variables inside expressions (Python 3.8+)</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Introduced in Python 3.8, the walrus operator `:=` assigns values to variables directly inside an expression. This feature eliminates code duplication when checking string lengths in conditional headers, reading input streams in `while` loops, or capturing regex match groups. By assigning and testing values simultaneously, runtime performance improves without sacrificing code clarity.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-pink-400"><FileCode size={12} /> 09_walrus.py</span>
            <span>Python 3.8+</span>
          </div>
          <pre className="text-pink-300 mb-3 whitespace-pre-wrap">{`query = "Retrieval Augmented Generation"

# Evaluate length and assign to var 'n' inside the if expression
if (n := len(query.split())) > 2:
    print(f"Query has {n} words.")`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Query has 3 words.</code>
          </div>
        </div>
      </section>

      {/* 10. IF-ELIF-ELSE */}
      <section id="if-else" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <GitBranch size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">10. `if-elif-else` Conditionals & Ternary Operator</h2>
            <p className="text-xs text-gray-400">Branching logic and single-line ternary expressions `A if C else B`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Conditional branching allows programs to make decisions at runtime by executing specific code blocks based on expression truthiness. The `elif` statement chains multiple exclusive conditions sequentially, stopping at the first `True` condition. Python also supports single-line ternary operators (`value_if_true if condition else value_if_false`) for concise conditional variable assignment.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-blue-400"><FileCode size={12} /> 10_conditionals.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-blue-300 mb-3 whitespace-pre-wrap">{`status_code = 200

# Standard branching
if status_code == 200:
    msg = "OK"
elif status_code == 404:
    msg = "Not Found"
else:
    msg = "Error"

# Single-line Ternary Expression
status_label = "Success" if status_code == 200 else "Failure"

print(f"Msg: {msg}, Label: {status_label}")`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Msg: OK, Label: Success</code>
          </div>
        </div>
      </section>

      {/* 11. FOR LOOPS */}
      <section id="for-loops" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Code2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">11. `for` Loops & `for...else` Construct</h2>
            <p className="text-xs text-gray-400">Iterating over sequences and executing `else` when loop completes without `break`</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Python `for` loops iterate over sequence items (lists, tuples, strings, generators) using the internal iterator protocol. Uniquely, Python features a `for...else` construct where the `else` block executes only if the loop finishes iterating naturally without hitting a `break` statement. This pattern provides an elegant way to handle search fallbacks without maintaining manual boolean flag variables.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> 11_for_else.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-purple-300 mb-3 whitespace-pre-wrap">{`items = ["chunk_1", "chunk_2", "target_chunk"]

for item in items:
    if item == "target_chunk":
        print("Found target!")
        break
else:
    print("Loop completed without break.")`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Found target!</code>
          </div>
        </div>
      </section>

      {/* 12. WHILE LOOPS */}
      <section id="while-loops" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">12. `while` Loops, `break`, `continue` & `pass`</h2>
            <p className="text-xs text-gray-400">Indefinite iteration control and loop modifier statements</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          A `while` loop continues executing as long as its condition remains `True`, making it ideal for polling services, stream processing, or event loops. The `break` statement immediately terminates the loop, `continue` skips the remainder of the current iteration, and `pass` serves as a syntactical no-op placeholder for unimplemented branches.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> 12_while_loop.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`attempts = 0

while attempts < 5:
    attempts += 1
    if attempts == 2:
        continue  # Skip iteration 2
    if attempts == 4:
        break     # Exit loop at 4
    print("Attempt:", attempts)`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Attempt: 1<br/>Attempt: 3</code>
          </div>
        </div>
      </section>

      {/* 13. ENUMERATE & ZIP */}
      <section id="enumerate-zip" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">13. `enumerate()` & `zip()` Functions</h2>
            <p className="text-xs text-gray-400">Indexed iteration and multi-sequence parallel iteration</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          The `enumerate()` built-in function wraps an iterable sequence to yield `(index, item)` tuples during iteration, eliminating manual counter management. The `zip()` function aggregates elements from multiple iterables into paired tuples, stopping automatically when the shortest input sequence is exhausted. Combining `enumerate(zip(...))` offers clean, Pythonic parallel iteration over synchronized collections.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> 13_enumerate_zip.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`models = ["GPT-4o", "Claude 3.5"]
scores = [0.95, 0.98]

# Parallel iteration with zip and index tracking with enumerate
for idx, (m, s) in enumerate(zip(models, scores), start=1):
    print(f"#{idx} {m}: {s}")`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>#1 GPT-4o: 0.95<br/>#2 Claude 3.5: 0.98</code>
          </div>
        </div>
      </section>

      {/* 14. MATCH-CASE */}
      <section id="match-case" className="mb-16 scroll-mt-24 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <GitBranch size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">14. Structural Pattern Matching (`match-case`)</h2>
            <p className="text-xs text-gray-400">Pattern matching on data structures and values (Python 3.10+)</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Introduced in Python 3.10, structural pattern matching (`match-case`) enables powerful matching over values, sequence shapes, and dictionary keys. Unlike basic `switch` statements in C/Java, `match-case` deconstructs data structures and binds inner variables automatically. This makes it invaluable for parsing complex API payloads, abstract syntax trees, and state machine transitions.
        </p>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-amber-400"><FileCode size={12} /> 14_match_case.py</span>
            <span>Python 3.10+</span>
          </div>
          <pre className="text-amber-300 mb-3 whitespace-pre-wrap">{`response = {"status": 200, "data": {"text": "Success"}}

match response:
    case {"status": 200, "data": {"text": txt}}:
        print(f"Received Text: {txt}")
    case {"status": err_code}:
        print(f"Error Code: {err_code}")
    case _:
        print("Unknown payload")`}</pre>
          <div className="bg-black/60 p-2.5 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Received Text: Success</code>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

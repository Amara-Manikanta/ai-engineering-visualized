import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function LangGraphIndex() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => setStep((s) => (s < totalSteps ? s + 1 : 1));
  const handlePrev = () => setStep((s) => (s > 1 ? s - 1 : totalSteps));
  const handleReset = () => setStep(1);

  const toc = [
    { label: 'Building Stateful AI Agents', hash: '#building-stateful-ai-agents' },
    { label: 'Key Concepts', hash: '#key-concepts' },
    { label: 'Interactive Demo', hash: '#interactive-demo' },
    { label: 'Code Example', hash: '#code-example' }
  ];

  return (
    <GuideLayout
      title="LangGraph Concepts"
      intro="A detailed interactive animated explainer of Retrieval-Augmented Generation (RAG) covering Indexing, Retrieval, Augmentation, and Generation stages."
      toc={toc}
    >
      <section id="building-stateful-ai-agents" className="mb-12">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
            LangGraph
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-4">🔗 Building Stateful AI Agents</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            LangGraph is a library for building stateful, multi-actor applications with LLMs, modeled as graphs. Think of it as the <strong className="text-gray-200">orchestration layer</strong> for complex AI agent workflows that need cycles, branching, and persistent memory.
          </p>
        </div>

        <div id="key-concepts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '🔵', title: 'Nodes', desc: 'Individual processing units — an LLM call, a tool execution, or any Python function. Each node receives state and returns updated state.' },
            { icon: '➡️', title: 'Edges', desc: 'Connections between nodes. Normal edges always go from A→B. Conditional edges route dynamically based on state (if/else branching).' },
            { icon: '📦', title: 'State', desc: 'A shared TypedDict object passed through every node. Each node can read and update the state. This is how information flows through the graph.' },
            { icon: '🔄', title: 'Cycles', desc: 'Unlike basic pipelines, LangGraph supports loops. An agent can think → act → observe → think again in a repeating cycle until it decides to stop.' },
            { icon: '💾', title: 'Checkpointing', desc: 'Built-in persistence. Save graph state to memory or a database. Resume execution from any checkpoint — perfect for long-running or interrupted tasks.' },
            { icon: '🎭', title: 'Multi-Actor', desc: 'Multiple agents can run as separate nodes in the same graph. Use for supervisor patterns, debating agents, or parallel task execution.' },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <div id="interactive-demo" className="mb-12 p-8 bg-black/40 border border-white/10 rounded-2xl relative overflow-hidden">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/10 rounded-full border border-purple-500/20">
              Interactive Demo
            </div>
            <h3 className="text-2xl font-bold text-gray-100">ReAct Agent Graph — Step by Step</h3>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <button onClick={handlePrev} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">‹ Prev</button>
            <span className="text-sm font-medium text-gray-400">Step {step} of {totalSteps}</span>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">Next ›</button>
            <button onClick={handleReset} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors ml-auto">↺ Reset</button>
          </div>

          <div className="flex items-center justify-between min-h-[200px] relative">
            <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3, scale: step === 1 ? 1.1 : 1 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-2xl mb-3">🟢</div>
              <span className="text-sm font-mono text-gray-300">__start__</span>
            </motion.div>

            {step > 1 && (
              <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} className="h-0.5 bg-gray-600 relative mx-4">
                <motion.div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" />
              </motion.div>
            )}

            <motion.div animate={{ opacity: step >= 2 ? 1 : 0.3, scale: step === 2 ? 1.1 : 1 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-500 flex items-center justify-center text-xs font-mono text-blue-300 mb-3">{'{state}'}</div>
              <span className="text-sm font-mono text-gray-300">Init State</span>
            </motion.div>

            {step > 2 && (
              <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} className="h-0.5 bg-gray-600 relative mx-4">
                <motion.div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" />
              </motion.div>
            )}

            <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3, scale: step === 3 ? 1.1 : 1 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-xl bg-purple-500/20 border border-purple-500 flex items-center justify-center text-2xl mb-3">🧠</div>
              <span className="text-sm font-mono text-gray-300">Agent Node</span>
            </motion.div>

            {step > 3 && (
              <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} className="h-0.5 bg-gray-600 relative mx-4">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">conditional</span>
                <motion.div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" />
              </motion.div>
            )}

            <motion.div animate={{ opacity: step >= 4 ? 1 : 0.3, scale: step === 4 ? 1.1 : 1 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-xl bg-orange-500/20 border border-orange-500 flex items-center justify-center text-2xl mb-3">🔧</div>
              <span className="text-sm font-mono text-gray-300">Tool Node</span>
            </motion.div>

            {step > 4 && (
              <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} className="h-0.5 bg-gray-600 relative mx-4">
                <motion.div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" />
              </motion.div>
            )}

            <motion.div animate={{ opacity: step >= 5 ? 1 : 0.3, scale: step === 5 ? 1.1 : 1 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-2xl mb-3">🔴</div>
              <span className="text-sm font-mono text-gray-300">__end__</span>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
            <h4 className="text-lg font-bold text-white mb-2">
              {step === 1 && "Graph Starts"}
              {step === 2 && "Initialize State"}
              {step === 3 && "Agent (LLM) Node"}
              {step === 4 && "Tool Node (Action)"}
              {step === 5 && "End Execution"}
            </h4>
            <p className="text-gray-400">
              {step === 1 && "The LangGraph runtime starts execution at the __start__ entrypoint. The initial user message is passed in."}
              {step === 2 && "State object is initialized and passed down."}
              {step === 3 && "The agent receives state, reasons, and decides what to do next."}
              {step === 4 && "If tools are needed, this node executes them and passes result back to Agent."}
              {step === 5 && "The graph finishes when the conditional edge says to stop."}
            </p>
          </div>
        </div>

        <div id="code-example" className="mb-12">
          <h3 className="text-xl font-bold text-gray-200 mb-4">📄 Minimal LangGraph Agent — Code</h3>
          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10">
            <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-mono text-gray-400">agent.py</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300">
              <code className="language-python">
{`# 1. Define State
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]

# 2. Define Nodes
def call_llm(state: AgentState):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

def should_continue(state: AgentState):
    last = state["messages"][-1]
    if last.tool_calls: return "tools"
    return END

# 3. Build Graph
graph = StateGraph(AgentState)
graph.add_node("agent", call_llm)
graph.add_node("tools", tool_executor)
graph.set_entry_point("agent")
graph.add_conditional_edges("agent", should_continue)
graph.add_edge("tools", "agent")  # Loop back!

app = graph.compile()`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

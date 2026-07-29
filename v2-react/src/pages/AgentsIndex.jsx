import React from 'react';
import GuideLayout from "../components/GuideLayout";
import { motion } from "framer-motion";

const toc = [
  { label: "Overview", hash: "overview" },
  { label: "Evolution of Agents", hash: "evolution" },
  { label: "Core Agent Loop", hash: "core-loop" },
  { label: "Skills", hash: "skills" },
  { label: "Subagents", hash: "subagents" },
  { label: "Hooks", hash: "hooks" },
  { label: "Extension Stack", hash: "stack" },
  { label: "Real-World Example", hash: "realworld" }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const AgentsIndex = () => {
  return (
    <GuideLayout
      title="AI Agent Architecture"
      intro="Agents are AI systems that can perceive, reason, act, and observe in a loop — using tools, memory, and sub-agents to complete complex tasks autonomously."
      toc={toc}
    >
      <section id="overview" className="mb-20">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[
            { icon: "📘", label: "Skills", value: "= KNOWLEDGE (what to do)", color: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/30" },
            { icon: "🔌", label: "MCP", value: "= ABILITY (connect to world)", color: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/30" },
            { icon: "👥", label: "Subagents", value: "= DELEGATION (parallel work)", color: "from-green-500/20 to-green-600/10", border: "border-green-500/30" },
            { icon: "⚡", label: "Hooks", value: "= AUTOMATION (runs outside loop)", color: "from-yellow-500/20 to-yellow-600/10", border: "border-yellow-500/30" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              className={`p-6 rounded-xl bg-gradient-to-br ${item.color} border ${item.border} backdrop-blur-sm flex flex-col items-center text-center group hover:-translate-y-1 transition-transform`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">{item.label}</h3>
              <p className="text-sm text-gray-400 font-mono">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="evolution" className="mb-20 scroll-mt-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">The Evolution of <span className="text-indigo-400">AI Agents</span></h2>
          <p className="text-gray-400 text-lg">From model calls to governed agentic systems.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stage 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-indigo-500/30 relative overflow-hidden flex flex-col justify-center"
          >
            <div className="absolute top-0 left-0 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-br-lg">1. LLM Call</div>
            <div className="flex items-center justify-center gap-4 mt-6 text-gray-300 font-medium">
              <div className="bg-white/10 px-4 py-2 rounded-lg text-sm">💬 Input</div>
              <div className="text-indigo-400">➔</div>
              <div className="bg-indigo-500/20 border border-indigo-500/50 px-4 py-2 rounded-lg flex flex-col items-center">
                <span>🧠 Model</span>
                <span className="text-[10px] text-gray-400">Generates</span>
              </div>
              <div className="text-indigo-400">➔</div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-sm">✅ Output</div>
            </div>
          </motion.div>

          {/* Stage 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-purple-500/30 relative overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 left-0 bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-br-lg">2. Agent Loop</div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-gray-300 font-medium w-full">
              <div className="bg-white/10 px-3 py-2 rounded-lg text-xs">🧠 Model</div>
              <div className="text-purple-400">➔</div>
              <div className="bg-white/10 px-3 py-2 rounded-lg text-xs">⚖️ Decide</div>
              <div className="text-purple-400">➔</div>
              <div className="bg-white/10 px-3 py-2 rounded-lg text-xs">🔧 Tool Call</div>
              <div className="text-purple-400">➔</div>
              <div className="bg-purple-500/20 border border-purple-500/50 px-3 py-2 rounded-lg text-xs">👁️ Observe</div>
            </div>
            <div className="flex gap-2 mt-4 text-xs text-gray-400">
              <span className="px-2 py-1 rounded bg-black/40 border border-white/5">🔍 Search</span>
              <span className="px-2 py-1 rounded bg-black/40 border border-white/5">☁️ API</span>
              <span className="px-2 py-1 rounded bg-black/40 border border-white/5">🛢️ DB</span>
              <span className="px-2 py-1 rounded bg-black/40 border border-white/5">&lt;/&gt; Code</span>
            </div>
            <div className="text-xs text-gray-400 mt-2 font-mono">Reason. Act. Observe.</div>
          </motion.div>

          {/* Stage 3 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-cyan-500/30 relative overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 left-0 bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-br-lg">3. Agent Framework</div>
            <div className="w-full flex flex-col items-center mt-6">
               <div className="bg-white/10 px-4 py-2 rounded-lg text-sm text-gray-200 border border-white/10 mb-2">&lt;/&gt; Your Agent Code</div>
               <div className="flex gap-8 border-t border-cyan-500/30 pt-2 w-full justify-center text-xs text-gray-300 relative">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 border-t border-cyan-500/50 bg-[#161b22] rotate-45"></div>
                  <div className="bg-white/5 px-2 py-1 rounded border border-white/10">Nodes</div>
                  <div className="bg-cyan-500/20 px-2 py-1 rounded border border-cyan-500/30 text-cyan-400">🔧 Tools</div>
                  <div className="bg-white/5 px-2 py-1 rounded border border-white/10">🛢️ State</div>
               </div>
               <div className="w-64 border border-gray-600 rounded-full mt-3 py-1 text-center text-xs text-gray-400 bg-black/40">Workflow / Graph</div>
               <div className="text-[10px] text-gray-500 mt-2">LangGraph • ADK • Agents SDK</div>
               <div className="text-xs font-mono text-cyan-400 mt-2">You define the workflow.</div>
            </div>
          </motion.div>

          {/* Stage 4 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-red-500/30 relative overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 left-0 bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-br-lg">4. Agent Harness</div>
            <div className="flex items-center justify-center gap-2 mt-4 w-full">
               <div className="flex flex-col items-center shrink-0">
                 <div className="text-2xl">🎯</div>
                 <span className="text-[10px] text-gray-300 font-bold">Goal</span>
               </div>
               <div className="text-red-400 mx-1">➔</div>
               <div className="flex-1 max-w-[160px] bg-red-900/10 border border-red-500/30 rounded-lg p-2 flex flex-col relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500/20 px-2 rounded text-[8px] font-bold text-red-400 uppercase whitespace-nowrap">AGENT HARNESS</div>
                  <ul className="text-[9px] text-gray-300 space-y-0.5 mt-2 ml-1">
                    <li>📄 Instructions</li>
                    <li>👤 Context</li>
                    <li>🔄 Tool Loop</li>
                    <li>🗂️ Memory</li>
                    <li>📁 Filesystem</li>
                    <li>⭐ Skills</li>
                    <li>👥 Subagents</li>
                    <li>🛑 Stop Conditions</li>
                  </ul>
               </div>
               <div className="text-red-400 mx-1">➔</div>
               <div className="bg-white/10 p-2 rounded-lg border border-white/10 text-center shrink-0">
                  <div className="text-2xl">🧠</div>
                  <span className="text-[10px] text-gray-300 font-bold">Model</span>
               </div>
            </div>
            <div className="text-[10px] font-bold text-gray-300 mt-3 text-center leading-tight">
               MODEL ≠ AGENT<br/>
               <span className="text-red-400">MODEL + HARNESS ➔ AGENT</span>
            </div>
            <div className="text-[10px] text-gray-400 font-mono mt-1 text-center">The layer that makes the model work like an agent.</div>
          </motion.div>

          {/* Stage 5 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-emerald-500/30 relative overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 left-0 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-br-lg">5. Long-Running Agent</div>
            
            <div className="flex flex-col items-center justify-center gap-1 mt-6 w-full relative h-28">
               
               <div className="flex gap-2 w-full justify-center absolute top-0">
                 <div className="bg-white/10 p-1.5 rounded text-[9px] border border-white/10 text-center w-12">📋<br/>Task</div>
                 <div className="text-emerald-400 mt-2 text-xs">➔</div>
                 <div className="bg-emerald-900/20 p-1.5 rounded text-[9px] border border-emerald-500/30 text-center w-12 text-emerald-400">🛡️<br/>Harness</div>
                 <div className="text-emerald-400 mt-2 text-xs">➔</div>
                 <div className="bg-white/10 p-1.5 rounded text-[9px] border border-white/10 text-center w-12">📝<br/>Plan</div>
                 <div className="text-emerald-400 mt-2 text-xs">➔</div>
                 <div className="bg-white/10 p-1 rounded text-[9px] border border-white/10 text-center w-16 leading-tight">📁<br/>Use Browser/Terminal</div>
               </div>

               <div className="flex gap-2 w-full justify-center absolute bottom-0">
                 <div className="bg-white/10 p-1.5 rounded text-[9px] border border-white/10 text-center w-12 leading-tight">🗜️<br/>Compress<br/>Context</div>
                 <div className="text-emerald-400 mt-3 rotate-180 text-xs">➔</div>
                 <div className="bg-white/10 p-1.5 rounded text-[9px] border border-white/10 text-center w-12 leading-tight">📈<br/>Check<br/>Progress</div>
                 <div className="text-emerald-400 mt-3 rotate-180 text-xs">➔</div>
                 <div className="bg-emerald-900/20 p-1.5 rounded text-[9px] border border-emerald-500/30 text-center w-14 text-emerald-400 leading-tight">👥<br/>Spawn<br/>Subagent</div>
               </div>
               
               {/* Loop connection lines */}
               <div className="absolute right-4 md:right-8 top-[30px] w-4 h-10 border-r border-b border-emerald-500/50 rounded-br"></div>
               <div className="absolute left-4 md:left-8 top-[30px] w-4 h-10 border-l border-t border-emerald-500/50 rounded-tl mt-1"></div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 text-[9px] text-gray-400 w-full justify-center">
              <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5">🌐 Browser</span>
              <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5">📁 Files</span>
              <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5">💻 Shell</span>
              <span className="px-1.5 py-0.5 rounded border border-dashed border-emerald-500/50 text-emerald-400">📦 Sandbox</span>
            </div>
            <div className="text-[10px] text-gray-400 font-mono mt-3 text-center">Works across many steps, not one turn.</div>
          </motion.div>

          {/* Stage 6 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-blue-500/30 relative overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 left-0 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-br-lg">6. Governed Agentic System</div>
            
            <div className="flex items-center gap-2 mt-6 w-full justify-center">
               <div className="bg-white/10 p-1.5 rounded-lg text-[9px] text-center border border-white/10 w-12">
                 👤<br/>User /<br/>Event
               </div>
               <div className="text-blue-400 text-xs">➔</div>
               <div className="bg-blue-900/20 p-1.5 rounded-lg text-[9px] text-center border border-blue-500/30 w-14 text-blue-400 font-bold">
                 🔄<br/>Agent<br/>Runtime
               </div>
               <div className="text-blue-400 text-xs">➔</div>
               <div className="bg-white/10 p-1.5 rounded-lg text-[9px] text-center border border-white/10 w-14">
                 🛡️<br/>Agent<br/>Harness
               </div>
            </div>

            <div className="flex justify-center gap-3 mt-4 w-full relative">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1/2 h-3 border-t border-l border-r border-blue-500/30 rounded-t"></div>
               <div className="bg-white/10 p-1 rounded text-[9px] text-center border border-white/10 z-10 w-16">🔧 Tools/MCP</div>
               <div className="bg-white/10 p-1 rounded text-[9px] text-center border border-white/10 z-10 w-16">👥 Agents/A2A</div>
               <div className="bg-white/10 p-1 rounded text-[9px] text-center border border-white/10 z-10 w-16">💻 Computer Use</div>
            </div>

            <div className="w-full bg-blue-950/30 border border-blue-500/30 rounded-lg p-2 mt-4 flex flex-col text-center">
               <div className="text-[10px] font-bold text-blue-400 mb-1">Control Plane</div>
               <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[8px] text-gray-300">
                 <span className="flex items-center gap-1">👤 Identity</span>
                 <span className="flex items-center gap-1">🛡️ Policy</span>
                 <span className="flex items-center gap-1">🔐 Permissions</span>
                 <span className="flex items-center gap-1">👍 Approvals</span>
                 <span className="flex items-center gap-1">🔍 Tracing</span>
                 <span className="flex items-center gap-1">📊 Evaluations</span>
                 <span className="flex items-center gap-1">📋 Audit</span>
                 <span className="flex items-center gap-1">💰 Cost Limits</span>
               </div>
            </div>
            
            <div className="text-[10px] text-gray-400 font-mono mt-3 text-center">Capable enough to act. Controlled enough to trust.</div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-white/5 border border-gray-700 p-6 rounded-xl text-center flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <div className="text-5xl opacity-80 shrink-0">🧠</div>
          <div className="text-lg md:text-xl font-medium text-gray-300 text-left leading-relaxed">
            <div>The <strong className="text-white">model</strong> thinks. The <strong className="text-red-400">harness</strong> makes it work.</div>
            <div>The <strong className="text-emerald-400">runtime</strong> keeps it alive. The <strong className="text-blue-400">control plane</strong> keeps it accountable.</div>
          </div>
        </motion.div>
      </section>

      <section id="core-loop" className="mb-20 scroll-mt-24">
        <div className="mb-8">
          <div className="text-indigo-400 font-bold text-sm tracking-widest uppercase mb-2">Step 1</div>
          <h2 className="text-3xl font-bold mb-4">🔄 The Core Agent Loop</h2>
          <p className="text-gray-400 text-lg">The heart of every AI agent is an infinite loop that cycles between four phases. This is also known as the <strong className="text-gray-200">ReAct pattern</strong> (Reason + Act).</p>
        </div>

        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Animated ReAct Loop Placeholder (Simulated with Framer Motion) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 border-4 border-dashed border-indigo-500/30 rounded-full flex items-center justify-center relative shrink-0"
          >
            <div className="absolute top-0 -translate-y-1/2 bg-[#0a0a0a] border border-indigo-500/50 text-indigo-300 px-3 py-1 rounded-full text-sm font-bold">👁️ PERCEIVE</div>
            <div className="absolute right-0 translate-x-1/2 bg-[#0a0a0a] border border-indigo-500/50 text-indigo-300 px-3 py-1 rounded-full text-sm font-bold">💭 REASON</div>
            <div className="absolute bottom-0 translate-y-1/2 bg-[#0a0a0a] border border-indigo-500/50 text-indigo-300 px-3 py-1 rounded-full text-sm font-bold">⚡ ACT</div>
            <div className="absolute left-0 -translate-x-1/2 bg-[#0a0a0a] border border-indigo-500/50 text-indigo-300 px-3 py-1 rounded-full text-sm font-bold">📊 OBSERVE</div>
            
            <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center text-3xl blur-[2px]">
              🧠
            </div>
          </motion.div>
          
          <div className="flex-1 space-y-4">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <h4 className="font-bold text-gray-200 flex items-center gap-2"><span className="text-xl">👁️</span> PERCEIVE</h4>
              <p className="text-sm text-gray-400 mt-1">Read input: user message, tool outputs, context files</p>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <h4 className="font-bold text-gray-200 flex items-center gap-2"><span className="text-xl">💭</span> REASON</h4>
              <p className="text-sm text-gray-400 mt-1">LLM thinks: what is the goal? What tool do I need next?</p>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <h4 className="font-bold text-gray-200 flex items-center gap-2"><span className="text-xl">⚡</span> ACT</h4>
              <p className="text-sm text-gray-400 mt-1">Execute: call a tool, write code, read a file, make an API call</p>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <h4 className="font-bold text-gray-200 flex items-center gap-2"><span className="text-xl">📊</span> OBSERVE</h4>
              <p className="text-sm text-gray-400 mt-1">Get the result back. Add it to context. Repeat.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="mb-20 scroll-mt-24">
        <div className="mb-8">
          <div className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-2">Component 1</div>
          <h2 className="text-3xl font-bold mb-4">📘 Skills — The Agent's Knowledge</h2>
          <p className="text-gray-400 text-lg">Skills are reusable instruction modules that teach the agent <em>what to do</em> and <em>how to behave</em> in specific scenarios.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f172a] rounded-2xl p-6 font-mono text-sm border border-slate-700/50"
          >
            <div className="text-blue-400 mb-4 font-bold">📁 .claude/skills/</div>
            <div className="pl-4 text-gray-300 mb-2 border-l border-slate-700 ml-2">📄 deploy/SKILL.md</div>
            <div className="pl-4 text-gray-300 mb-2 border-l border-slate-700 ml-2">📄 code-review/SKILL.md</div>
            <div className="pl-4 text-gray-300 mb-2 border-l border-slate-700 ml-2">📄 testing/SKILL.md</div>
            <div className="pl-4 text-gray-300 mb-6 border-l border-slate-700 ml-2">📄 security/SKILL.md</div>
            
            <div className="mt-8 space-y-2 text-green-400/80">
              <div>✅ Reusable instruction modules</div>
              <div>✅ Loaded on-demand (saves tokens)</div>
              <div>✅ Scoped to a task or domain</div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { num: "01", title: "Specificity", desc: "Each skill covers one domain (e.g. deploy rules)." },
              { num: "02", title: "On-Demand", desc: "Skills aren't loaded until needed to save context." },
              { num: "03", title: "Composable", desc: "Skills can reference other skills." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4"
              >
                <div className="text-blue-500/50 font-black text-2xl">{s.num}</div>
                <div>
                  <h4 className="font-bold text-gray-200 mb-1">{s.title}</h4>
                  <p className="text-sm text-gray-400">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="subagents" className="mb-20 scroll-mt-24">
        <div className="mb-8">
          <div className="text-green-400 font-bold text-sm tracking-widest uppercase mb-2">Component 2</div>
          <h2 className="text-3xl font-bold mb-4">👥 Subagents — Delegation & Parallelism</h2>
          <p className="text-gray-400 text-lg">Subagents are independent workers with their own context, model, and permissions.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 flex flex-col items-center"
        >
          <div className="bg-green-500/20 border border-green-500/50 text-white rounded-2xl p-4 w-64 text-center mb-8 relative z-10 backdrop-blur-sm">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-bold">Orchestrator Agent</div>
            <div className="text-xs text-green-200/70 mt-1">Delegates & aggregates</div>
          </div>
          
          <div className="flex gap-4 md:gap-12 relative w-full justify-center">
            {/* Connection lines */}
            <div className="absolute top-[-32px] left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 h-8 border-t border-l border-r border-green-500/30 rounded-t-xl" />
            
            {[
              { icon: "💻", title: "Code Reviewer", tools: "Read, Analyze" },
              { icon: "🔍", title: "Researcher", tools: "Search, Fetch" },
              { icon: "🚀", title: "Deployer", tools: "Bash, SSH" }
            ].map((sa, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-black/60 border border-white/10 rounded-xl p-4 w-1/3 max-w-[150px] text-center flex flex-col items-center"
              >
                <div className="text-2xl mb-2">{sa.icon}</div>
                <div className="font-bold text-sm text-gray-200 mb-2">{sa.title}</div>
                <div className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded w-full">{sa.tools}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="hooks" className="mb-20 scroll-mt-24">
        <div className="mb-8">
          <div className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-2">Component 3</div>
          <h2 className="text-3xl font-bold mb-4">⚡ Hooks — Deterministic Automation</h2>
          <p className="text-gray-400 text-lg">Hooks are event-driven scripts that run <em className="text-gray-300">outside</em> the agent's control.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { type: "PRE-TOOL", title: "Before Execution", desc: "Runs before any tool call. Use for validation or security checks.", color: "text-red-400 bg-red-400/10 border-red-400/20" },
            { type: "POST-TOOL", title: "After Execution", desc: "Runs after a tool completes. Use for post-processing.", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
            { type: "ON-EDIT", title: "On File Change", desc: "Fires whenever a file is modified. Run linters automatically.", color: "text-green-400 bg-green-400/10 border-green-400/20" },
            { type: "ON-NOTIFY", title: "Alerts & Logging", desc: "Fires when the agent sends a notification. (e.g. Slack).", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" }
          ].map((hook, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col"
            >
              <div className={`text-xs font-bold px-2 py-1 rounded inline-block self-start border mb-3 ${hook.color}`}>
                {hook.type}
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-200">{hook.title}</h4>
              <p className="text-sm text-gray-400">{hook.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="stack" className="mb-20 scroll-mt-24">
        <div className="mb-8">
          <div className="text-indigo-400 font-bold text-sm tracking-widest uppercase mb-2">Architecture</div>
          <h2 className="text-3xl font-bold mb-4">🏗️ The Agent Extension Stack</h2>
          <p className="text-gray-400 text-lg">All the components stack together in a layered architecture.</p>
        </div>

        <div className="flex flex-col gap-2 max-w-2xl mx-auto">
          {[
            { icon: "🧩", label: "PLUGINS", sub: "Extend platform capabilities", bg: "bg-indigo-900/40 border-indigo-500/30" },
            { icon: "📘", label: "SKILLS", sub: "Teach the agent what to do", bg: "bg-blue-900/40 border-blue-500/30" },
            { icon: "🔌", label: "MCP ↔ TOOLS", sub: "Connect to external world", bg: "bg-purple-900/40 border-purple-500/30" },
            { icon: "👥", label: "SUBAGENTS", sub: "Delegate complex parallel work", bg: "bg-green-900/40 border-green-500/30" },
            { icon: "⚡", label: "HOOKS", sub: "Automate responses to events", bg: "bg-yellow-900/40 border-yellow-500/30" },
            { icon: "📝", label: "CLAUDE.md", sub: "Foundation & Context", bg: "bg-[#2d2d2d] border-gray-600" },
          ].map((layer, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-lg border flex items-center gap-4 ${layer.bg}`}
            >
              <div className="text-2xl">{layer.icon}</div>
              <div>
                <div className="font-bold tracking-wide">{layer.label}</div>
                <div className="text-xs opacity-70">{layer.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="realworld" className="mb-20 scroll-mt-24">
        <div className="mb-8">
          <div className="text-pink-400 font-bold text-sm tracking-widest uppercase mb-2">Example</div>
          <h2 className="text-3xl font-bold mb-4">🌍 Real-World Example</h2>
          <p className="text-gray-400 text-lg">How all the pieces come together in a competitive-analysis workflow.</p>
        </div>

        <div className="space-y-6">
          {[
            "CLAUDE.md Loads Project Context",
            "Skill Activates — Competitive Analysis Framework",
            "MCP Searches Google Drive",
            "Subagent: Market Researcher Gathers Web Data",
            "Subagent: Technical Analyst Reviews Repos",
            "Hook Auto-Formats Output & Runs Linter"
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/10"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <div className="font-medium text-gray-200">{step}</div>
            </motion.div>
          ))}
        </div>
      </section>

    </GuideLayout>
  );
};

export default AgentsIndex;

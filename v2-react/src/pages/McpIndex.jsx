import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };

export default function McpIndex() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => setStep((s) => (s < totalSteps ? s + 1 : 1));
  const handlePrev = () => setStep((s) => (s > 1 ? s - 1 : totalSteps));
  const handleReset = () => setStep(1);

  const toc = [
    { label: 'What is MCP?', hash: 'mcp' },
    { label: 'Why MCP? The N×M Problem', hash: 'why-mcp' },
    { label: 'Core Architecture', hash: 'architecture' },
    { label: 'Core Primitives', hash: 'primitives' },
    { label: 'Transport Layers', hash: 'transports' },
    { label: 'Handshake & Message Format', hash: 'handshake' },
    { label: 'Security & Permissions', hash: 'security' },
    { label: 'Building a Minimal Server', hash: 'building' },
    { label: 'MCP vs Function Calling', hash: 'vs-function-calling' },
    { label: 'Ecosystem', hash: 'ecosystem' },
    { label: 'Best Practices', hash: 'best-practices' },
  ];

  return (
    <GuideLayout
      title="Model Context Protocol (MCP)"
      intro="An open standard that lets any AI model plug into any external tool, file, or API — the same way USB-C standardized device connectors."
      toc={toc}
    >
      <section id="mcp" className="mb-16 scroll-mt-24">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-green-400 uppercase bg-green-500/10 rounded-full border border-green-500/20">
            Model Context Protocol
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Connecting LLMs to the Real World</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            MCP is an open protocol (created by Anthropic, now widely adopted) that standardizes how AI applications
            connect to external context — tools, files, databases, and live services. Instead of every AI app writing
            a custom integration for every service, both sides just speak MCP.
          </p>
        </div>
      </section>

      <section id="why-mcp" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Why MCP? The N×M Integration Problem</h2>
        <p className="text-gray-300 mb-6 max-w-3xl">
          Before a shared protocol, every AI app (Claude, a custom agent, an IDE plugin) needed a bespoke integration
          for every tool (GitHub, Slack, Postgres, your internal API) — an <code className="text-pink-400 bg-gray-800 px-1 rounded">N × M</code> combinatorial
          explosion of one-off connectors. MCP flattens that into <code className="text-emerald-400 bg-gray-800 px-1 rounded">N + M</code>: each
          app implements MCP once, each tool ships one MCP server once, and every combination works automatically.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h3 className="text-rose-400 font-semibold mb-3">❌ Before: N × M Custom Integrations</h3>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {['Claude↔GitHub', 'Claude↔Slack', 'IDE↔GitHub', 'IDE↔Slack', 'Agent↔GitHub', 'Agent↔Slack'].map((s) => (
                <span key={s} className="bg-rose-900/30 border border-rose-500/30 px-2 py-1 rounded text-rose-300">{s}</span>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-3">Every new app or every new tool multiplies the integration work.</p>
          </div>
          <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-5">
            <h3 className="text-emerald-400 font-semibold mb-3">✅ After: N + M via MCP</h3>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {['Claude→MCP', 'IDE→MCP', 'Agent→MCP', 'MCP→GitHub', 'MCP→Slack'].map((s) => (
                <span key={s} className="bg-emerald-900/30 border border-emerald-500/30 px-2 py-1 rounded text-emerald-300">{s}</span>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-3">Any MCP-speaking app works with any MCP-speaking tool, immediately.</p>
          </div>
        </div>
      </section>

      <section id="architecture" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Core Architecture</h2>
        <p className="text-gray-300 mb-6 max-w-3xl">MCP defines three roles in every connection:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: '🖥️', title: 'Host', color: 'border-purple-500/30 bg-purple-500/10 text-purple-300', desc: 'The AI application the user interacts with — Claude Desktop, an IDE, a custom agent. Manages one or more clients.' },
            { icon: '🔌', title: 'Client', color: 'border-blue-500/30 bg-blue-500/10 text-blue-300', desc: 'Lives inside the Host, maintains a 1:1 connection to exactly one server, and handles the protocol handshake.' },
            { icon: '🗄️', title: 'Server', color: 'border-green-500/30 bg-green-500/10 text-green-300', desc: 'Exposes tools, resources, and prompts for a specific system — a database, a filesystem, a SaaS API.' },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-xl border p-5 ${r.color.split(' ')[0]} ${r.color.split(' ')[1]}`}>
              <div className="text-3xl mb-2">{r.icon}</div>
              <h3 className={`font-bold mb-2 ${r.color.split(' ')[2]}`}>{r.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-gray-100 mb-4">Interactive: Request Flow, Step by Step</h3>
        <div className="mb-12 p-8 bg-black/40 border border-white/10 rounded-2xl relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={handlePrev} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">‹ Prev</button>
            <span className="text-sm font-medium text-gray-400">Step {step} of {totalSteps}</span>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">Next ›</button>
            <button onClick={handleReset} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors ml-auto">↺ Reset</button>
          </div>

          <div className="flex items-center justify-between min-h-[200px] relative">
            <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-2xl mb-3">👤</div>
              <span className="text-sm font-mono text-gray-300">User Prompt</span>
            </motion.div>

            {step > 1 && <motion.div initial={{ width: 0 }} animate={{ width: '60px' }} className="h-0.5 bg-gray-600 relative mx-2"><div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" /></motion.div>}

            <motion.div animate={{ opacity: step >= 2 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/50 border border-purple-500 flex items-center justify-center text-sm font-bold text-purple-300 mb-3">LLM</div>
              <span className="text-sm font-mono text-gray-300">Host</span>
            </motion.div>

            {step > 2 && <motion.div initial={{ width: 0 }} animate={{ width: '60px' }} className="h-0.5 bg-gray-600 relative mx-2"><div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" /></motion.div>}

            <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-blue-900/50 border border-blue-500 flex items-center justify-center text-2xl mb-3">🔌</div>
              <span className="text-sm font-mono text-gray-300">MCP Client</span>
            </motion.div>

            {step > 3 && <motion.div initial={{ width: 0 }} animate={{ width: '60px' }} className="h-0.5 bg-gray-600 relative mx-2"><div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" /></motion.div>}

            <motion.div animate={{ opacity: step >= 4 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-green-900/50 border border-green-500 flex items-center justify-center text-2xl mb-3">🖥️</div>
              <span className="text-sm font-mono text-gray-300">MCP Server</span>
            </motion.div>

            {step > 4 && <motion.div initial={{ width: 0 }} animate={{ width: '60px' }} className="h-0.5 bg-gray-600 relative mx-2"><div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45" /></motion.div>}

            <motion.div animate={{ opacity: step >= 5 ? 1 : 0.3 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-orange-900/50 border border-orange-500 flex items-center justify-center text-2xl mb-3">🗄️</div>
              <span className="text-sm font-mono text-gray-300">Data / API</span>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
            <h4 className="text-lg font-bold text-white mb-2">
              {step === 1 && "User Request"}
              {step === 2 && "Host (Claude, IDE, agent...)"}
              {step === 3 && "MCP Client"}
              {step === 4 && "MCP Server"}
              {step === 5 && "Database / API"}
            </h4>
            <p className="text-gray-400">
              {step === 1 && "The user asks a question that requires external information the model doesn't have."}
              {step === 2 && "The Host's LLM decides it needs a tool and picks one from the list the client advertised."}
              {step === 3 && "The Host's embedded MCP Client sends a JSON-RPC tools/call request over the transport."}
              {step === 4 && "The MCP Server receives the call, validates it, and executes the underlying action."}
              {step === 5 && "The server accesses local files, databases, or external APIs, then returns a structured result back up the chain."}
            </p>
          </div>
        </div>
      </section>

      <section id="primitives" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Core Primitives</h2>
        <p className="text-gray-300 mb-6 max-w-3xl">Every MCP server exposes some combination of four primitive types:</p>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {[
            { icon: '🔧', title: 'Tools', color: 'text-indigo-400', desc: 'Executable functions the model can call — "run this query", "create this file". Model-controlled: the LLM decides when to invoke them.' },
            { icon: '📄', title: 'Resources', color: 'text-emerald-400', desc: 'Read-only data the Host can attach to context — a file, a database schema, a webpage. Application-controlled: the user or app decides what to expose.' },
            { icon: '💬', title: 'Prompts', color: 'text-amber-400', desc: 'Reusable prompt templates the server provides — e.g. a "summarize this PR" template with placeholder slots. User-controlled: surfaced as slash-command-like shortcuts.' },
            { icon: '🎲', title: 'Sampling', color: 'text-rose-400', desc: "A server can ask the Host's LLM to generate a completion on its behalf — letting a lightweight server borrow the Host's model instead of calling its own." },
          ].map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4">
              <span className="text-3xl shrink-0">{p.icon}</span>
              <div>
                <h3 className={`font-bold mb-1 ${p.color}`}>{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="transports" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Transport Layers</h2>
        <p className="text-gray-300 mb-6 max-w-3xl">MCP separates the message format (JSON-RPC 2.0) from how bytes actually move between client and server. Two transports cover almost every use case:</p>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Transport</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">How it works</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Best for</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">stdio</td><td className="px-4 py-2.5 border-b border-gray-900">Server runs as a local subprocess; messages flow over stdin/stdout</td><td className="px-4 py-2.5 border-b border-gray-900">Local tools — filesystem access, local scripts, desktop apps</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Streamable HTTP</td><td className="px-4 py-2.5 border-b border-gray-900">Server runs remotely; client POSTs requests, server streams responses (optionally via SSE)</td><td className="px-4 py-2.5 border-b border-gray-900">Remote/hosted servers — SaaS integrations, shared team tools</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="handshake" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Handshake & Message Format</h2>
        <p className="text-gray-300 mb-4 max-w-3xl">
          Every message is <a className="text-indigo-300 underline" href="https://www.jsonrpc.org/specification" target="_blank" rel="noopener noreferrer">JSON-RPC 2.0</a>.
          A connection starts with a capability-negotiation handshake before any tools can be called:
        </p>
        <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4 text-gray-300 whitespace-pre">
{`// 1. Client → Server: initialize
{
  "jsonrpc": "2.0", "id": 1, "method": "initialize",
  "params": {
    "protocolVersion": "2025-06-18",
    "capabilities": { "roots": {}, "sampling": {} },
    "clientInfo": { "name": "my-host-app", "version": "1.0.0" }
  }
}

// 2. Server → Client: capabilities it supports
{
  "jsonrpc": "2.0", "id": 1,
  "result": {
    "protocolVersion": "2025-06-18",
    "capabilities": { "tools": {}, "resources": {}, "prompts": {} },
    "serverInfo": { "name": "github-mcp-server", "version": "0.4.0" }
  }
}

// 3. Client calls a tool once the handshake completes
{
  "jsonrpc": "2.0", "id": 2, "method": "tools/call",
  "params": { "name": "create_issue", "arguments": { "repo": "acme/app", "title": "Bug: ..." } }
}`}
        </div>
        <p className="text-gray-400 text-sm">Only capabilities both sides agree on during the handshake are usable for the rest of the session — a server can't suddenly start calling <code className="text-pink-400 bg-gray-800 px-1 rounded">sampling</code> if the client never advertised support for it.</p>
      </section>

      <section id="security" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Security & Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: '✋', title: 'User Consent', desc: 'Hosts are expected to get explicit user approval before a tool executes, especially for destructive actions (deleting files, sending messages).' },
            { icon: '📦', title: 'Sandboxed Execution', desc: 'Servers should run with the least privilege needed — a filesystem server scoped to one directory, not the whole disk.' },
            { icon: '🔑', title: 'Credential Isolation', desc: "The model never sees raw API keys or passwords — the server holds credentials and the LLM only sees tool names and results." },
            { icon: '📝', title: 'Auditability', desc: 'Every tool call is a discrete, loggable JSON-RPC message — making it straightforward to build approval flows and audit trails on top.' },
          ].map((s, i) => (
            <div key={i} className="bg-amber-900/10 border border-amber-500/20 rounded-lg p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <h3 className="font-bold text-amber-300 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="building" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Building a Minimal Server</h2>
        <p className="text-gray-300 mb-4 max-w-3xl">Using the official Python SDK, a working MCP server exposing one tool is only a few lines:</p>
        <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto text-gray-300 whitespace-pre">
{`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("weather-server")

@mcp.tool()
def get_weather(city: str) -> str:
    """Get the current weather for a given city."""
    # ... call a real weather API here ...
    return f"It's sunny in {city}."

if __name__ == "__main__":
    mcp.run(transport="stdio")`}
        </div>
        <p className="text-gray-400 text-sm mt-3">That's it — the SDK handles the JSON-RPC handshake, capability advertisement, and schema generation from the function signature and docstring automatically.</p>
      </section>

      <section id="vs-function-calling" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">MCP vs Traditional Function Calling</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">&nbsp;</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Native Function Calling</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">MCP</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Scope</td><td className="px-4 py-2.5 border-b border-gray-900">Tool schema defined per-app, in your own code</td><td className="px-4 py-2.5 border-b border-gray-900">Tool schema owned by a reusable, standalone server</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Reuse</td><td className="px-4 py-2.5 border-b border-gray-900">Rewritten for every app/framework that wants it</td><td className="px-4 py-2.5 border-b border-gray-900">Write once, any MCP-compatible Host can use it</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Discovery</td><td className="px-4 py-2.5 border-b border-gray-900">Tools hardcoded into the prompt/request</td><td className="px-4 py-2.5 border-b border-gray-900">Tools discovered dynamically via <code className="text-pink-400">tools/list</code></td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Relationship</td><td className="px-4 py-2.5 border-b border-gray-900">—</td><td className="px-4 py-2.5 border-b border-gray-900">Complementary: MCP tools are still exposed to the model as function calls under the hood</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="ecosystem" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Ecosystem</h2>
        <p className="text-gray-300 mb-4 max-w-3xl">A large and growing set of pre-built servers already exist, so most teams don't write one from scratch:</p>
        <div className="flex flex-wrap gap-2">
          {['Filesystem', 'GitHub', 'GitLab', 'Slack', 'Google Drive', 'PostgreSQL', 'SQLite', 'Puppeteer / Browser', 'Sentry', 'Notion', 'Linear', 'Stripe'].map((s) => (
            <span key={s} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">{s}</span>
          ))}
        </div>
      </section>

      <section id="best-practices" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li><strong className="text-white">Scope servers narrowly.</strong> A "GitHub server" that only touches one org's repos is safer and easier to reason about than one with blanket access.</li>
          <li><strong className="text-white">Write clear tool descriptions.</strong> The model chooses tools based on the description text — vague descriptions cause wrong or missed tool calls.</li>
          <li><strong className="text-white">Prefer Resources over stuffing data into Tool results.</strong> Large read-only context belongs in a Resource, not repeated in every tool response.</li>
          <li><strong className="text-white">Always gate destructive tools behind confirmation.</strong> Don't let the model silently delete, send, or pay for something.</li>
        </ul>
      </section>
    </GuideLayout>
  );
}

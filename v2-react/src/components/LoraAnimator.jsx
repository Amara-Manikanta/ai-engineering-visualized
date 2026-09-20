import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RefreshCw, Zap, Cpu, HardDrive, ShieldCheck, Layers } from "lucide-react";

export default function LoraAnimator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [rank, setRank] = useState(8);
  const [dDim, setDDim] = useState(4096);
  const [kDim, setKDim] = useState(4096);
  const [alpha, setAlpha] = useState(16);
  const [activeTab, setActiveTab] = useState("architecture");

  // Parameter math calculations
  const fullParams = dDim * kDim;
  const loraAParams = dDim * rank;
  const loraBParams = rank * kDim;
  const totalLoraParams = loraAParams + loraBParams;
  const reductionPercent = ((1 - totalLoraParams / fullParams) * 100).toFixed(1);

  return (
    <div className="my-8 border border-white/10 bg-[#0d0d11] rounded-2xl p-6 text-white shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-500/20 text-indigo-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
              Interactive Visual Architecture
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {reductionPercent}% Parameter Savings
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">LoRA (Low-Rank Adaptation) Matrix Decomposition</h3>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "architecture" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            Diagram & Signal Flow
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "calculator" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            Rank Math Calculator
          </button>
        </div>
      </div>

      {activeTab === "architecture" && (
        <div className="space-y-6">
          {/* Animated Architecture Diagram */}
          <div className="relative bg-[#070709] border border-white/10 rounded-xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Forward Pass Signal Flow: <code className="text-indigo-300">h = W₀x + (B·A)x</code>
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition-colors"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? "Pause Flow" : "Play Signal Flow"}
              </button>
            </div>

            {/* SVG Visual Flow Graph */}
            <div className="relative min-h-[320px] flex flex-col justify-center items-center py-4">
              {/* Input Vector x */}
              <div className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-3 py-2 rounded-xl text-xs font-mono font-bold shadow-lg shadow-emerald-500/10">
                  Input x
                  <span className="block text-[10px] text-emerald-400/80 font-normal">({dDim} × 1)</span>
                </div>
              </div>

              {/* Main Split Paths */}
              <div className="w-full max-w-2xl px-16 flex flex-col gap-12 relative">
                {/* SVG Animated Connector Paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
                  <defs>
                    <linearGradient id="frozenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="adapterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Path to Frozen W0 */}
                  <path d="M 60 160 C 120 160, 120 60, 200 60" fill="none" stroke="url(#frozenGrad)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 380 60 C 440 60, 440 160, 520 160" fill="none" stroke="url(#frozenGrad)" strokeWidth="2" />

                  {/* Path to LoRA Adapter A -> B */}
                  <path d="M 60 160 C 120 160, 120 260, 180 260" fill="none" stroke="url(#adapterGrad)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 280 260 L 320 260" fill="none" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 420 260 C 470 260, 470 160, 520 160" fill="none" stroke="url(#adapterGrad)" strokeWidth="2" />

                  {/* Animated Signal Packets */}
                  {isPlaying && (
                    <>
                      {/* Packet through W0 */}
                      <motion.circle
                        r="5"
                        fill="#10b981"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        style={{ offsetPath: "path('M 60 160 C 120 160, 120 60, 200 60')" }}
                      />
                      <motion.circle
                        r="5"
                        fill="#6366f1"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                        style={{ offsetPath: "path('M 380 60 C 440 60, 440 160, 520 160')" }}
                      />

                      {/* Packet through Adapter A -> B */}
                      <motion.circle
                        r="5"
                        fill="#a855f7"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        style={{ offsetPath: "path('M 60 160 C 120 160, 120 260, 180 260')" }}
                      />
                      <motion.circle
                        r="5"
                        fill="#ec4899"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.25 }}
                        style={{ offsetPath: "path('M 320 260 C 470 260, 470 160, 520 160')" }}
                      />
                    </>
                  )}
                </svg>

                {/* Top Path: Frozen Base Weight W0 */}
                <div className="flex justify-center z-10">
                  <div className="bg-[#141824] border-2 border-blue-500/40 rounded-xl p-4 w-72 text-center shadow-xl relative group hover:border-blue-400 transition-colors">
                    <div className="absolute -top-3 right-4 bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>❄️</span> FROZEN (No Gradients)
                    </div>
                    <div className="text-sm font-bold text-gray-200 font-mono mb-1">
                      Original Weight Matrix W₀
                    </div>
                    <div className="text-xs text-blue-400 font-mono">
                      ({dDim} × {kDim}) = {fullParams.toLocaleString()} params
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2">
                      Kept 100% untouched in memory. Zero optimizer overhead during training.
                    </p>
                  </div>
                </div>

                {/* Bottom Path: LoRA Adapters A & B */}
                <div className="flex items-center justify-center gap-6 z-10">
                  {/* Matrix A */}
                  <div className="bg-[#1e1329] border-2 border-purple-500/50 rounded-xl p-3.5 w-44 text-center shadow-xl relative hover:border-purple-400 transition-colors">
                    <div className="absolute -top-2.5 left-3 bg-purple-500/30 text-purple-300 border border-purple-500/40 text-[9px] font-bold px-2 py-0.5 rounded-full">
                      🔥 Trained
                    </div>
                    <div className="text-xs font-bold text-purple-300 font-mono">
                      Matrix A (Down-projection)
                    </div>
                    <div className="text-xs text-purple-400 font-mono mt-0.5">
                      ({dDim} × <span className="text-white font-bold">{rank}</span>) = {loraAParams.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">Initial: Gaussian</div>
                  </div>

                  {/* Multiplier Signal */}
                  <div className="text-purple-400 font-mono text-sm font-bold bg-purple-950/50 w-7 h-7 rounded-full flex items-center justify-center border border-purple-500/30">
                    ×
                  </div>

                  {/* Matrix B */}
                  <div className="bg-[#28152e] border-2 border-pink-500/50 rounded-xl p-3.5 w-44 text-center shadow-xl relative hover:border-pink-400 transition-colors">
                    <div className="absolute -top-2.5 left-3 bg-pink-500/30 text-pink-300 border border-pink-500/40 text-[9px] font-bold px-2 py-0.5 rounded-full">
                      🔥 Trained
                    </div>
                    <div className="text-xs font-bold text-pink-300 font-mono">
                      Matrix B (Up-projection)
                    </div>
                    <div className="text-xs text-pink-400 font-mono mt-0.5">
                      (<span className="text-white font-bold">{rank}</span> × {kDim}) = {loraBParams.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">Initial: Zero (0)</div>
                  </div>
                </div>
              </div>

              {/* Addition (+) Node and Final Output h */}
              <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex items-center gap-4 z-10">
                <div className="w-9 h-9 rounded-full bg-indigo-600 border-2 border-indigo-400 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-indigo-500/30">
                  +
                </div>
                <div className="bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 px-3 py-2 rounded-xl text-xs font-mono font-bold shadow-lg shadow-indigo-500/10">
                  Output h
                  <span className="block text-[10px] text-indigo-400/80 font-normal">h = W₀x + (α/r)BAx</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Rank Controls */}
          <div className="bg-[#111118] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-300">Try Rank (r):</span>
              <div className="flex items-center gap-1.5">
                {[4, 8, 16, 32, 64].map((rVal) => (
                  <button
                    key={rVal}
                    onClick={() => setRank(rVal)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      rank === rVal
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    r = {rVal}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-mono text-gray-400 flex items-center gap-4">
              <div>
                Full Params: <span className="text-rose-400 font-bold">{fullParams.toLocaleString()}</span>
              </div>
              <div>
                LoRA Params: <span className="text-emerald-400 font-bold">{totalLoraParams.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "calculator" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="bg-[#111118] border border-white/10 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <Layers size={16} /> Matrix Dimensions
              </h4>

              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Rank (r): <span className="text-indigo-400 font-bold">{rank}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="64"
                  value={rank}
                  onChange={(e) => setRank(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-gray-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Input Dimension (d): <span className="text-indigo-400 font-bold">{dDim}</span>
                </label>
                <select
                  value={dDim}
                  onChange={(e) => setDDim(Number(e.target.value))}
                  className="w-full bg-[#181824] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                >
                  <option value={1024}>1,024 (Small LLM)</option>
                  <option value={2048}>2,048 (7B Layer)</option>
                  <option value={4096}>4,096 (13B / Llama 8B Layer)</option>
                  <option value={8192}>8,192 (70B Flagship Layer)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Output Dimension (k): <span className="text-indigo-400 font-bold">{kDim}</span>
                </label>
                <select
                  value={kDim}
                  onChange={(e) => setKDim(Number(e.target.value))}
                  className="w-full bg-[#181824] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                >
                  <option value={1024}>1,024</option>
                  <option value={2048}>2,048</option>
                  <option value={4096}>4,096</option>
                  <option value={8192}>8,192</option>
                </select>
              </div>
            </div>

            {/* Comparison Display */}
            <div className="md:col-span-2 bg-[#111118] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <Zap size={16} /> Parameter Efficiency Comparison
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Full Fine-tuning Card */}
                  <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4">
                    <span className="text-xs text-rose-400 font-semibold block mb-1">Full Weight Matrix (W₀)</span>
                    <div className="text-2xl font-mono font-bold text-white mb-1">{fullParams.toLocaleString()}</div>
                    <p className="text-[11px] text-gray-400">
                      Formula: {dDim} × {kDim}
                    </p>
                    <div className="mt-3 text-[11px] text-rose-300 bg-rose-900/30 px-2 py-1 rounded">
                      Requires 100% VRAM & full checkpoint savings.
                    </div>
                  </div>

                  {/* LoRA Decomposition Card */}
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4">
                    <span className="text-xs text-emerald-400 font-semibold block mb-1">LoRA Adapter (A + B)</span>
                    <div className="text-2xl font-mono font-bold text-emerald-400 mb-1">{totalLoraParams.toLocaleString()}</div>
                    <p className="text-[11px] text-gray-400">
                      Formula: ({dDim} × {rank}) + ({rank} × {kDim})
                    </p>
                    <div className="mt-3 text-[11px] text-emerald-300 bg-emerald-900/30 px-2 py-1 rounded">
                      Trained parameters reduced by <span className="font-bold">{reductionPercent}%</span>!
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar Visualizer */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Trainable Footprint Comparison</span>
                  <span className="text-emerald-400 font-mono font-bold">{(100 - Number(reductionPercent)).toFixed(2)}% of full size</span>
                </div>
                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden flex">
                  <div style={{ width: `${100 - Number(reductionPercent)}%` }} className="bg-emerald-400 h-full"></div>
                  <div style={{ width: `${reductionPercent}%` }} className="bg-rose-900/50 h-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

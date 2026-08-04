import React from 'react';

const intelligenceData = [
  { name: 'Claude Opus 5 (max)', value: 61, color: 'bg-purple-500' },
  { name: 'Claude Fable 5', value: 60, color: 'bg-orange-400' },
  { name: 'GPT-5.6 Sol (max)', value: 59, color: 'bg-emerald-500' },
  { name: 'Kimi K3 (max)', value: 57, color: 'bg-gray-400' },
  { name: 'Grok 4.5 (high)', value: 54, color: 'bg-slate-400' },
  { name: 'GLM-5.2 (max)', value: 51, color: 'bg-blue-400' },
  { name: 'Muse Spark 1.1 (xhigh)', value: 51, color: 'bg-indigo-400' },
  { name: 'Gemini 3.6 Flash', value: 50, color: 'bg-blue-500' },
  { name: 'DeepSeek V4 Flash', value: 50, color: 'bg-cyan-500' },
  { name: 'MiniMax-M3', value: 44, color: 'bg-pink-400' },
  { name: 'Nemotron 3 Ultra', value: 38, color: 'bg-green-500' },
  { name: 'gpt-oss-120b (high)', value: 24, color: 'bg-gray-600' },
];

const speedData = [
  { name: 'Gemini 3.6 Flash', value: 215, color: 'bg-blue-500' },
  { name: 'Muse Spark 1.1 (xhigh)', value: 212, color: 'bg-indigo-400' },
  { name: 'gpt-oss-120b (high)', value: 199, color: 'bg-gray-600' },
  { name: 'GLM-5.2 (max)', value: 189, color: 'bg-blue-400' },
  { name: 'Nemotron 3 Ultra', value: 131, color: 'bg-green-500' },
  { name: 'DeepSeek V4 Flash', value: 113, color: 'bg-cyan-500' },
  { name: 'MiniMax-M3', value: 84, color: 'bg-pink-400' },
  { name: 'Claude Fable 5', value: 74, color: 'bg-orange-400' },
  { name: 'GPT-5.6 Sol (max)', value: 71, color: 'bg-emerald-500' },
  { name: 'Grok 4.5 (high)', value: 61, color: 'bg-slate-400' },
  { name: 'Claude Opus 5 (max)', value: 56, color: 'bg-purple-500' },
  { name: 'Kimi K3 (max)', value: 36, color: 'bg-gray-400' },
];

const costData = [
  { name: 'DeepSeek V4 Flash', value: 0.03, color: 'bg-cyan-500' },
  { name: 'gpt-oss-120b (high)', value: 0.08, color: 'bg-gray-600' },
  { name: 'MiniMax-M3', value: 0.14, color: 'bg-pink-400' },
  { name: 'Muse Spark 1.1 (xhigh)', value: 0.29, color: 'bg-indigo-400' },
  { name: 'Grok 4.5 (high)', value: 0.36, color: 'bg-slate-400' },
  { name: 'Nemotron 3 Ultra', value: 0.38, color: 'bg-green-500' },
  { name: 'Gemini 3.6 Flash', value: 0.56, color: 'bg-blue-500' },
  { name: 'GLM-5.2 (max)', value: 0.57, color: 'bg-blue-400' },
  { name: 'Kimi K3 (max)', value: 0.86, color: 'bg-gray-400' },
  { name: 'GPT-5.6 Sol (max)', value: 1.23, color: 'bg-emerald-500' },
  { name: 'Claude Opus 5 (max)', value: 2.34, color: 'bg-purple-500' },
  { name: 'Claude Fable 5', value: 3.15, color: 'bg-orange-400' },
];

export default function ModelBenchmarks() {
  const maxInt = Math.max(...intelligenceData.map(d => d.value));
  const maxSpeed = Math.max(...speedData.map(d => d.value));
  const maxCost = Math.max(...costData.map(d => d.value));

  return (
    <div className="mt-8 border border-white/10 bg-[#111111] p-6 rounded-xl text-white">
      <h3 className="text-xl font-bold mb-6">Performance Benchmarks</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Intelligence Chart */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-1"><span className="w-3 h-3 bg-purple-500 inline-block"></span>Intelligence</h4>
          <p className="text-[10px] text-gray-400 mb-4">Artificial Analysis Intelligence Index · Higher is better</p>
          <div className="flex items-end gap-2 h-48 border-b border-gray-700 pb-2">
            {intelligenceData.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group relative">
                <div 
                  className={`w-full ${d.color} rounded-t-sm transition-all`} 
                  style={{ height: `${(d.value / maxInt) * 100}%` }}
                ></div>
                <div className="absolute -bottom-28 transform -rotate-45 origin-top-left text-[9px] text-gray-300 whitespace-nowrap w-24 overflow-hidden text-ellipsis">
                  {d.name}
                </div>
                <div className="absolute top-0 transform -translate-y-full pb-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speed Chart */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-1"><span className="w-3 h-3 bg-yellow-400 inline-block"></span>Speed</h4>
          <p className="text-[10px] text-gray-400 mb-4">Output tokens per second · Higher is better</p>
          <div className="flex items-end gap-2 h-48 border-b border-gray-700 pb-2">
            {speedData.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group relative">
                <div 
                  className={`w-full ${d.color} rounded-t-sm transition-all`} 
                  style={{ height: `${(d.value / maxSpeed) * 100}%` }}
                ></div>
                <div className="absolute -bottom-28 transform -rotate-45 origin-top-left text-[9px] text-gray-300 whitespace-nowrap w-24 overflow-hidden text-ellipsis">
                  {d.name}
                </div>
                <div className="absolute top-0 transform -translate-y-full pb-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Chart */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-1"><span className="w-3 h-3 bg-orange-500 inline-block"></span>Cost per Task</h4>
          <p className="text-[10px] text-gray-400 mb-4">Weighted average cost (USD) · Lower is better</p>
          <div className="flex items-end gap-2 h-48 border-b border-gray-700 pb-2">
            {costData.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group relative">
                <div 
                  className={`w-full ${d.color} rounded-t-sm transition-all`} 
                  style={{ height: `${(d.value / maxCost) * 100}%` }}
                ></div>
                <div className="absolute -bottom-28 transform -rotate-45 origin-top-left text-[9px] text-gray-300 whitespace-nowrap w-24 overflow-hidden text-ellipsis">
                  {d.name}
                </div>
                <div className="absolute top-0 transform -translate-y-full pb-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  \${d.value.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-32 border-t border-gray-800 pt-3">
        <p className="text-xs text-gray-400 text-right">
          Source & Latest Updates: <a href="https://artificialanalysis.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">artificialanalysis.ai</a>
        </p>
      </div>
    </div>
  );
}

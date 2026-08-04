import React from 'react';

const intelligenceData = [
  { name: 'Claude Opus 5 (max)', value: 61, hex: '#c85a32' },
  { name: 'Claude Fable 5', value: 60, hex: '#c85a32' },
  { name: 'GPT-5.6 Sol (max)', value: 59, hex: '#1e1e24' },
  { name: 'Kimi K3 (max)', value: 57, hex: '#6366f1' },
  { name: 'Grok 4.5 (high)', value: 54, hex: '#8b5cf6' },
  { name: 'GLM-5.2 (max)', value: 51, hex: '#3b82f6' },
  { name: 'Muse Spark 1.1 (xhigh)', value: 51, hex: '#0284c7' },
  { name: 'Gemini 3.6 Flash', value: 50, hex: '#10b981' },
  { name: 'DeepSeek V4 Flash', value: 50, hex: '#06b6d4' },
  { name: 'MiniMax-M3', value: 44, hex: '#ec4899' },
  { name: 'Nemotron 3 Ultra', value: 38, hex: '#84cc16' },
  { name: 'gpt-oss-120b (high)', value: 24, hex: '#334155' },
];

const speedData = [
  { name: 'Gemini 3.6 Flash', value: 215, hex: '#10b981' },
  { name: 'Muse Spark 1.1 (xhigh)', value: 212, hex: '#0284c7' },
  { name: 'gpt-oss-120b (high)', value: 199, hex: '#1e1e24' },
  { name: 'GLM-5.2 (max)', value: 189, hex: '#3b82f6' },
  { name: 'Nemotron 3 Ultra', value: 131, hex: '#84cc16' },
  { name: 'DeepSeek V4 Flash', value: 113, hex: '#06b6d4' },
  { name: 'MiniMax-M3', value: 84, hex: '#ec4899' },
  { name: 'Claude Fable 5', value: 74, hex: '#c85a32' },
  { name: 'GPT-5.6 Sol (max)', value: 71, hex: '#1e1e24' },
  { name: 'Grok 4.5 (high)', value: 61, hex: '#8b5cf6' },
  { name: 'Claude Opus 5 (max)', value: 56, hex: '#c85a32' },
  { name: 'Kimi K3 (max)', value: 36, hex: '#6366f1' },
];

const costData = [
  { name: 'DeepSeek V4 Flash', value: 0.03, hex: '#06b6d4' },
  { name: 'gpt-oss-120b (high)', value: 0.08, hex: '#1e1e24' },
  { name: 'MiniMax-M3', value: 0.14, hex: '#ec4899' },
  { name: 'Muse Spark 1.1 (xhigh)', value: 0.29, hex: '#0284c7' },
  { name: 'Grok 4.5 (high)', value: 0.36, hex: '#8b5cf6' },
  { name: 'Nemotron 3 Ultra', value: 0.38, hex: '#84cc16' },
  { name: 'Gemini 3.6 Flash', value: 0.56, hex: '#10b981' },
  { name: 'GLM-5.2 (max)', value: 0.57, hex: '#3b82f6' },
  { name: 'Kimi K3 (max)', value: 0.86, hex: '#6366f1' },
  { name: 'GPT-5.6 Sol (max)', value: 1.23, hex: '#1e1e24' },
  { name: 'Claude Opus 5 (max)', value: 2.34, hex: '#c85a32' },
  { name: 'Claude Fable 5', value: 3.15, hex: '#c85a32' },
];

export default function ModelBenchmarks() {
  const maxInt = Math.max(...intelligenceData.map(d => d.value));
  const maxSpeed = Math.max(...speedData.map(d => d.value));
  const maxCost = Math.max(...costData.map(d => d.value));

  const renderChart = (title, subtitle, badgeColor, data, maxVal, isCost = false) => (
    <div className="flex flex-col">
      <h4 className="flex items-center gap-2 text-lg font-bold mb-1 text-white">
        <span className={`w-3 h-3 ${badgeColor} inline-block rounded-xs`}></span>
        {title}
      </h4>
      <p className="text-[11px] text-gray-400 mb-6">{subtitle}</p>
      
      <div className="h-60 flex items-end gap-1.5 border-b border-gray-800 pb-1 relative pt-6">
        {data.map((d, i) => {
          const heightPercent = Math.max((d.value / maxVal) * 100, 3);
          return (
            <div key={i} className="flex-1 h-full flex flex-col justify-end items-center relative group">
              <span className="text-[9px] font-semibold text-gray-300 mb-1 select-none whitespace-nowrap">
                {isCost ? `$${d.value.toFixed(2)}` : d.value}
              </span>
              <div 
                className="w-full rounded-t-xs transition-all duration-300 hover:brightness-125 min-h-[4px]"
                style={{ 
                  height: `${heightPercent}%`,
                  backgroundColor: d.hex
                }}
              />
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 rotate-[-45deg] origin-top-left text-[9px] text-gray-400 whitespace-nowrap w-24 overflow-hidden text-ellipsis pointer-events-none">
                {d.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="mt-8 border border-white/10 bg-[#111111] p-6 rounded-xl text-white">
      <h3 className="text-xl font-bold mb-6 text-white">Performance Benchmarks</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {renderChart(
          'Intelligence', 
          'Artificial Analysis Intelligence Index · Higher is better', 
          'bg-purple-500', 
          intelligenceData, 
          maxInt
        )}
        
        {renderChart(
          'Speed', 
          'Output tokens per second · Higher is better', 
          'bg-amber-400', 
          speedData, 
          maxSpeed
        )}
        
        {renderChart(
          'Cost per Task', 
          'Weighted average cost (USD) · Lower is better', 
          'bg-orange-500', 
          costData, 
          maxCost, 
          true
        )}
      </div>

      <div className="mt-36 border-t border-gray-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <span>Interactive Model Performance & Pricing Benchmark Data</span>
        <span>
          Source & Latest Updates:{' '}
          <a 
            href="https://artificialanalysis.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-400 hover:text-indigo-300 underline font-medium"
          >
            artificialanalysis.ai
          </a>
        </span>
      </div>
    </div>
  );
}

import LoraAnimator from "../components/LoraAnimator";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

const toc = [
  { label: "What is Fine-tuning?", hash: "overview" },
  { label: "Full Fine-tuning vs PEFT", hash: "full-vs-peft" },
  { label: "How LoRA Works", hash: "lora" },
  { label: "QLoRA", hash: "qlora" },
  { label: "When to Fine-tune vs RAG", hash: "when" },
];

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };

export default function GenAiFineTuning() {
  return (
    <GuideLayout
      title="Fine-tuning LLMs"
      intro="Adapting a pre-trained model's behavior, tone, or format to a specific task — without retraining it from scratch."
      toc={toc}
    >
      <section id="overview" className="mb-14 scroll-mt-24">
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Fine-tuning continues training an already-pretrained model on a smaller, task-specific dataset. It doesn't
          teach the model new facts efficiently (that's what RAG is for) — it teaches the model <em className="text-gray-200">how
          to respond</em>: a consistent tone, a strict output format, a specialized skill like SQL generation, or
          faithfully following a company's writing style.
        </p>
      </section>

      <section id="full-vs-peft" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Full Fine-tuning vs PEFT</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-rose-400 font-semibold mb-2">Full Fine-tuning</h3>
            <p className="text-sm text-gray-300 mb-3">Updates every single weight in the model. Most expressive, but requires storing a full copy of gradients and optimizer states for every parameter.</p>
            <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
              <li>Needs multiple high-VRAM GPUs even for mid-size models</li>
              <li>Produces a full new model checkpoint (same size as original)</li>
              <li>Highest risk of "catastrophic forgetting" of general skills</li>
            </ul>
          </div>
          <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-emerald-400 font-semibold mb-2">PEFT (Parameter-Efficient Fine-Tuning)</h3>
            <p className="text-sm text-gray-300 mb-3">Freezes the original model and trains only a small number of new parameters injected into it. LoRA is the dominant PEFT technique.</p>
            <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
              <li>Trains &lt;1% of total parameters — runs on a single consumer GPU</li>
              <li>Produces a tiny "adapter" file (megabytes, not gigabytes)</li>
              <li>Original model weights stay untouched — easy to swap adapters</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="lora" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">How LoRA (Low-Rank Adaptation) Works</h2>
        <p className="text-gray-300 mb-6 max-w-3xl leading-relaxed">
          LoRA is a parameter-efficient fine-tuning technique that adapts pre-trained language models by keeping the base model's billions of weights completely frozen while learning a low-rank correction matrix <code className="text-indigo-300">ΔW = B × A</code> on the side.
        </p>

        {/* 1. Core Problem Solved */}
        <div className="bg-[#111118] border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-rose-400 mb-3">1. The Core Problem LoRA Solves</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Standard <strong>Full Fine-Tuning</strong> updates 100% of an LLM's parameters during backpropagation. This introduces massive operational bottlenecks:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
              <span className="text-rose-300 font-bold block mb-1">100% Weight Updates</span>
              <span className="text-gray-400">Must track gradients and optimizer states for all 8B to 70B+ parameters.</span>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
              <span className="text-rose-300 font-bold block mb-1">Huge VRAM Memory Overhead</span>
              <span className="text-gray-400">Requires massive GPU clusters (hundreds of GBs of VRAM) for intermediate states.</span>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
              <span className="text-rose-300 font-bold block mb-1">Storage Nightmare</span>
              <span className="text-gray-400">Every fine-tuned checkpoint produces a new 140 GB file for a 70B model.</span>
            </div>
          </div>
        </div>

        {/* 2. Mathematical Concept & Interactive Animator */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-indigo-300 mb-2">2. Low-Rank Decomposition & Signal Flow</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Weight updates during fine-tuning have a low <em className="text-white">intrinsic rank</em>. Instead of modifying <code className="text-blue-300">W₀</code> directly, LoRA adds a parallel path with two small matrices <code className="text-purple-300">A (d × r)</code> and <code className="text-pink-300">B (r × k)</code>, where <code className="text-indigo-300">r « min(d, k)</code>:
          </p>

          {/* Embedded Interactive LoraAnimator Component */}
          <LoraAnimator />
        </div>

        {/* 3. Parameter Reduction Math */}
        <div className="bg-[#0e111a] border border-indigo-500/20 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-emerald-400 mb-3">3. Parameter Reduction Math (Why It Saves &gt;99%)</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Suppose a Transformer projection layer has a weight matrix size of <code className="text-white">4,096 × 4,096</code>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono mb-4">
            <div className="bg-black/40 border border-white/10 p-4 rounded-lg">
              <span className="text-rose-400 font-bold block mb-1">Full Weight Matrix (W₀):</span>
              4,096 × 4,096 = <span className="text-white font-bold">16,777,216 parameters</span>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-lg">
              <span className="text-emerald-400 font-bold block mb-1">LoRA Adapter (r = 8):</span>
              (4,096 × 8) + (8 × 4,096) = <span className="text-emerald-300 font-bold">65,536 parameters</span>
            </div>
          </div>
          <p className="text-xs text-emerald-300/90 bg-emerald-900/20 border border-emerald-500/20 px-3 py-2 rounded-lg">
            By setting rank <code className="text-white">r = 8</code>, the trainable parameter footprint for that layer is reduced by <strong>99.6%</strong>!
          </p>
        </div>

        {/* 4. Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#111118] border border-white/10 rounded-xl p-5">
            <h4 className="text-indigo-400 font-bold text-sm mb-2">⚡ Drastic VRAM Reduction</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Tracking gradients for &lt;1% of parameters enables fine-tuning 8B models on a single consumer GPU (e.g. RTX 4090 or Mac Unified Memory).
            </p>
          </div>
          <div className="bg-[#111118] border border-white/10 rounded-xl p-5">
            <h4 className="text-indigo-400 font-bold text-sm mb-2">💾 Tiny Adapter File Sizes</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Adapter checkpoints are just <strong>10 MB to 100 MB</strong> instead of multi-gigabyte full model weights.
            </p>
          </div>
          <div className="bg-[#111118] border border-white/10 rounded-xl p-5">
            <h4 className="text-indigo-400 font-bold text-sm mb-2">🚀 Zero Inference Latency Overhead</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              At deployment time, compute <code className="text-indigo-300">W_final = W₀ + (B × A)</code> to permanently merge weights. Inference runs at 100% full original speed!
            </p>
          </div>
          <div className="bg-[#111118] border border-white/10 rounded-xl p-5">
            <h4 className="text-indigo-400 font-bold text-sm mb-2">🔄 Dynamic Adapter Swapping</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Keep 1 base model in VRAM and dynamically swap LoRA adapters on the fly (e.g., Coding LoRA vs Support LoRA vs Legal LoRA).
            </p>
          </div>
        </div>

        {/* 5. Key Hyperparameters */}
        <div className="bg-[#111118] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-purple-300 mb-3">5. Important LoRA Hyperparameters</h3>
          <div className="space-y-3 text-xs">
            <div className="border-b border-white/5 pb-2">
              <span className="text-indigo-400 font-bold font-mono">Rank (r):</span>
              <span className="text-gray-300 ml-2">Controls the inner bottleneck dimension (e.g. 8, 16, 32, 64). Higher rank provides higher capacity for complex tasks.</span>
            </div>
            <div className="border-b border-white/5 pb-2">
              <span className="text-indigo-400 font-bold font-mono">Alpha (α):</span>
              <span className="text-gray-300 ml-2">Scaling factor applied to LoRA output: <code className="text-white">(α / r) · ΔW</code>. Controls adapter weighting over base weights.</span>
            </div>
            <div>
              <span className="text-indigo-400 font-bold font-mono">Target Modules:</span>
              <span className="text-gray-300 ml-2">Projection layers where adapters attach (typically attention layers: <code className="text-indigo-300">q_proj</code>, <code className="text-indigo-300">v_proj</code>, <code className="text-indigo-300">k_proj</code>, <code className="text-indigo-300">o_proj</code>).</span>
            </div>
          </div>
        </div>
      </section>

      <section id="qlora" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">QLoRA — Quantized LoRA</h2>
        <p className="text-gray-300 mb-4 max-w-3xl">
          QLoRA combines LoRA with quantization: the frozen base model is loaded in 4-bit precision (cutting memory
          ~4x versus 16-bit), while the small LoRA adapter matrices are still trained in higher precision. This is
          what lets a 70B-parameter model be fine-tuned on a single consumer GPU.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Method</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">~VRAM for a 7B model</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Quality</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Full fine-tuning</td><td className="px-4 py-2.5 border-b border-gray-900">~60–80 GB</td><td className="px-4 py-2.5 border-b border-gray-900">Highest ceiling</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">LoRA (16-bit base)</td><td className="px-4 py-2.5 border-b border-gray-900">~16–20 GB</td><td className="px-4 py-2.5 border-b border-gray-900">Very close to full fine-tuning</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">QLoRA (4-bit base)</td><td className="px-4 py-2.5 border-b border-gray-900">~6–10 GB</td><td className="px-4 py-2.5 border-b border-gray-900">Minor quality tradeoff, huge memory win</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="when" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Fine-tuning vs RAG</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="bg-indigo-900/10 border border-indigo-500/20 rounded-lg p-5">
            <h4 className="text-indigo-400 font-semibold mb-2">Reach for Fine-tuning when...</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
              <li>You need a consistent tone, persona, or strict output format.</li>
              <li>You're teaching a narrow skill (e.g. converting English to a proprietary DSL).</li>
              <li>Latency matters and you can't afford a retrieval step.</li>
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-amber-900/10 border border-amber-500/20 rounded-lg p-5">
            <h4 className="text-amber-400 font-semibold mb-2">Reach for RAG when...</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
              <li>The knowledge changes frequently (docs, prices, live data).</li>
              <li>You need citations back to source documents.</li>
              <li>You want to avoid the cost and complexity of a training run.</li>
            </ul>
          </motion.div>
        </motion.div>
      </section>
    </GuideLayout>
  );
}

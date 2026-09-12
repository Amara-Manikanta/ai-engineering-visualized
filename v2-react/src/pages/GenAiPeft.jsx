import React, { useMemo, useState } from "react";
import GuideLayout from "../components/GuideLayout";
import KnowledgeCheck from "../components/KnowledgeCheck";
import { questionsFor } from "../data/quizBank";
import CodeBlock from "../components/CodeBlock";

/* --------------------------------------------------------------------------
   LoRA's whole argument is an arithmetic one, so the page does the arithmetic.

   A weight matrix W is d_out x d_in. LoRA freezes it and learns B·A instead,
   where A is r x d_in and B is d_out x r. Trainable parameters per matrix drop
   from d_out·d_in to r·(d_out + d_in). Everything below is that formula
   applied to real model shapes.
-------------------------------------------------------------------------- */

const MODELS = {
  "7B (Llama-class)": { layers: 32, d: 4096, dFf: 11008, total: 6.74e9 },
  "13B": { layers: 40, d: 5120, dFf: 13824, total: 13.0e9 },
  "70B": { layers: 80, d: 8192, dFf: 28672, total: 70.6e9 },
};

// Which projections the adapter is attached to.
const TARGETS = {
  "q, v only": (m) => 2 * m.d * m.d,
  "all attention (q,k,v,o)": (m) => 4 * m.d * m.d,
  "attention + MLP": (m) => 4 * m.d * m.d + 3 * m.d * m.dFf,
};
const TARGET_SHAPES = {
  "q, v only": (m) => [
    [m.d, m.d],
    [m.d, m.d],
  ],
  "all attention (q,k,v,o)": (m) => Array(4).fill([m.d, m.d]),
  "attention + MLP": (m) => [...Array(4).fill([m.d, m.d]), ...Array(3).fill([m.dFf, m.d])],
};

const fmt = (n) => {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(Math.round(n));
};

function LoraCalculator() {
  const [modelName, setModelName] = useState("7B (Llama-class)");
  const [targetName, setTargetName] = useState("all attention (q,k,v,o)");
  const [rank, setRank] = useState(16);

  const m = MODELS[modelName];

  const stats = useMemo(() => {
    const shapes = TARGET_SHAPES[targetName](m);
    const perLayerFull = shapes.reduce((a, [o, i]) => a + o * i, 0);
    const perLayerLora = shapes.reduce((a, [o, i]) => a + rank * (o + i), 0);
    const full = perLayerFull * m.layers;
    const lora = perLayerLora * m.layers;
    return {
      full,
      lora,
      pctOfTargeted: (lora / full) * 100,
      pctOfModel: (lora / m.total) * 100,
      // fp16 optimiser state for Adam is roughly 2 bytes weights + 4+4 moments.
      adapterMB: (lora * 2) / 1e6,
      optimiserMB: (lora * 8) / 1e6,
      fullTuneGB: (m.total * (2 + 4 + 4 + 4)) / 1e9,
    };
  }, [m, targetName, rank]);

  return (
    <div className="rounded-2xl border border-indigo-500/25 bg-indigo-500/[0.07] p-6">
      <h3 className="text-indigo-400 font-bold mb-1">What LoRA actually saves</h3>
      <p className="text-sm text-gray-400 mb-5 leading-relaxed">
        Trainable parameters per matrix go from{" "}
        <span className="font-mono text-indigo-300">d_out × d_in</span> to{" "}
        <span className="font-mono text-indigo-300">r × (d_out + d_in)</span>. Every number below is that formula
        applied to real layer shapes — nothing is rounded off a blog post.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-gray-500">Base model</span>
          <select
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full mt-2 bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-sm text-gray-200"
          >
            {Object.keys(MODELS).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-gray-500">Target modules</span>
          <select
            value={targetName}
            onChange={(e) => setTargetName(e.target.value)}
            className="w-full mt-2 bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-sm text-gray-200"
          >
            {Object.keys(TARGETS).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-gray-500">Rank r</span>
          <input
            type="range"
            min="1"
            max="128"
            step="1"
            value={rank}
            onChange={(e) => setRank(Number(e.target.value))}
            className="w-full mt-3 accent-indigo-500"
          />
          <span className="font-mono text-indigo-300 text-sm">{rank}</span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-4 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Full fine-tune of these</div>
          <div className="text-2xl font-bold font-mono text-gray-300">{fmt(stats.full)}</div>
          <div className="text-[11px] text-gray-600 mt-1">trainable parameters</div>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-indigo-500/30">
          <div className="text-[10px] uppercase tracking-wide text-indigo-400 mb-1">With LoRA</div>
          <div className="text-2xl font-bold font-mono text-indigo-300">{fmt(stats.lora)}</div>
          <div className="text-[11px] text-gray-600 mt-1">{stats.pctOfTargeted.toFixed(2)}% of the above</div>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Of the whole model</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{stats.pctOfModel.toFixed(3)}%</div>
          <div className="text-[11px] text-gray-600 mt-1">{fmt(m.total)} total parameters</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-4 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Adapter file size</div>
          <div className="text-xl font-bold font-mono text-gray-300">{stats.adapterMB.toFixed(1)} MB</div>
          <div className="text-[11px] text-gray-600 mt-1">fp16 weights only</div>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Optimiser state</div>
          <div className="text-xl font-bold font-mono text-gray-300">{stats.optimiserMB.toFixed(0)} MB</div>
          <div className="text-[11px] text-gray-600 mt-1">Adam moments for the adapter</div>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-rose-500/25">
          <div className="text-[10px] uppercase tracking-wide text-rose-400 mb-1">Full fine-tune would need</div>
          <div className="text-xl font-bold font-mono text-rose-300">~{stats.fullTuneGB.toFixed(0)} GB</div>
          <div className="text-[11px] text-gray-600 mt-1">weights + gradients + Adam state</div>
        </div>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        The memory column is the part that decides projects. The adapter itself being small is convenient; the
        optimiser state being small is what moves a 70B fine-tune from a cluster onto a couple of GPUs. Gradients and
        Adam moments only exist for trainable parameters, and there are barely any.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const METHODS = [
  {
    n: "LoRA",
    tag: "The default",
    d: "Learns a low-rank update B·A alongside each frozen weight matrix. Merges back into the base weights at inference, so there is no added latency at all.",
    box: "border-indigo-500/25 bg-indigo-500/[0.07]",
    label: "text-indigo-400",
  },
  {
    n: "QLoRA",
    tag: "LoRA on a budget",
    d: "Quantises the frozen base to 4-bit and trains LoRA adapters in 16-bit on top. Puts a 70B fine-tune on a single 48GB card. Slower per step, but the alternative is often no step at all.",
    box: "border-emerald-500/25 bg-emerald-500/[0.07]",
    label: "text-emerald-400",
  },
  {
    n: "DoRA",
    tag: "LoRA, refined",
    d: "Splits each weight into magnitude and direction and applies the low-rank update only to the direction. Closes much of the remaining gap to full fine-tuning at low rank.",
    box: "border-purple-500/25 bg-purple-500/[0.07]",
    label: "text-purple-400",
  },
  {
    n: "Prefix / P-tuning",
    tag: "Train the input",
    d: "Prepends learned vectors to the key and value sequences at every layer, leaving all weights frozen. Very few parameters, but it consumes context window and usually trails LoRA.",
    box: "border-amber-500/25 bg-amber-500/[0.07]",
    label: "text-amber-400",
  },
  {
    n: "(IA)³",
    tag: "Scale, don't add",
    d: "Learns one scaling vector per activation stream. Even smaller than LoRA and merges cleanly, but with less capacity to change behaviour.",
    box: "border-blue-500/25 bg-blue-500/[0.07]",
    label: "text-blue-400",
  },
  {
    n: "Adapter layers",
    tag: "The original",
    d: "Inserts small bottleneck MLPs between transformer sublayers. Historically important, now largely displaced because the extra layers cannot be merged away and cost inference latency.",
    box: "border-gray-500/25 bg-white/[0.04]",
    label: "text-gray-300",
  },
];

export default function GenAiPeft() {
  const toc = [
    { label: "The Problem", hash: "problem" },
    { label: "The Low-Rank Idea", hash: "idea" },
    { label: "Do the Arithmetic", hash: "calc" },
    { label: "Choosing r and alpha", hash: "rank" },
    { label: "The PEFT Family", hash: "family" },
    { label: "Serving Many Adapters", hash: "serving" },
    { label: "In Code", hash: "code" },
    { label: "When PEFT Is Not Enough", hash: "limits" },
  ];

  return (
    <GuideLayout
      title="PEFT & LoRA"
      intro="Fine-tune a 70B model by training 0.1% of it. Parameter-efficient fine-tuning is what made customising large models something a small team can do."
      toc={toc}
    >
      <section id="problem" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl mb-5">
          Full fine-tuning updates every weight. That means holding, for each parameter, the weight itself, its
          gradient, and two Adam moment estimates. In mixed precision that is roughly 14 to 16 bytes per parameter, so
          a 7B model needs on the order of 100GB before you have loaded a single training example.
        </p>
        <p className="text-gray-300 leading-relaxed max-w-3xl mb-6">
          There is a second problem that costs more in the long run. Each fully fine-tuned variant is a complete copy
          of the model. Ten customers means ten times 14GB of weights and ten separate deployments.
        </p>
        <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/[0.07]">
          <p className="text-sm text-amber-200 leading-relaxed m-0">
            <strong>The observation PEFT is built on:</strong> adapting a pretrained model to a new task does not
            require large changes to its weights. The update matrix has low intrinsic rank — most of its information
            fits in a handful of directions. So learn those directions directly instead of the whole matrix.
          </p>
        </div>
      </section>

      <section id="idea" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">The Low-Rank Idea</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl mb-6">
          Freeze W. Represent the update as a product of two thin matrices and train only those.
        </p>
        <div className="p-5 rounded-xl border border-indigo-500/25 bg-indigo-500/[0.07] mb-5">
          <div className="font-mono text-base text-indigo-200 mb-3 text-center">h = Wx + (α / r) · B·A·x</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-300">
            <div>
              <div className="font-semibold text-white mb-1">W — frozen</div>
              d_out × d_in. Never updated, never stored twice.
            </div>
            <div>
              <div className="font-semibold text-white mb-1">A — r × d_in</div>
              Initialised from a small random distribution.
            </div>
            <div>
              <div className="font-semibold text-white mb-1">B — d_out × r</div>
              Initialised to zero, so the adapter starts as a no-op and training begins from the base model exactly.
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-sm text-gray-400 leading-relaxed m-0">
            Because B starts at zero, the product B·A is zero at step one and the model is bit-for-bit the base model.
            That is not a detail — it is why LoRA training is stable without a warmup phase that repairs damage from
            random initialisation.
          </p>
        </div>
      </section>

      <section id="calc" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Do the Arithmetic</h2>
        <LoraCalculator />
      </section>

      <section id="rank" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Choosing r and α</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="text-sm font-semibold text-white mb-2">Rank r — how much capacity</div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              r = 8 to 16 handles style, tone, and format adaptation, which is most of what people actually want.
              r = 32 to 64 is for teaching genuinely new task behaviour. Beyond 64 the returns are usually not there,
              and you should question whether the problem is a fine-tuning problem at all.
            </p>
            <div className="text-[11px] text-gray-500 font-mono">start at 16, move only with evidence</div>
          </div>
          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="text-sm font-semibold text-white mb-2">α — how strongly it applies</div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              The update is scaled by α/r, so α controls the adapter's influence independently of its size. The common
              convention is α = 2r, which keeps the effective scale constant as you change rank. Treat α/r as the real
              knob, not α alone.
            </p>
            <div className="text-[11px] text-gray-500 font-mono">alpha = 32 with r = 16</div>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/[0.07]">
          <p className="text-sm text-amber-200 leading-relaxed m-0">
            <strong>Target breadth matters more than rank.</strong> Published ablations consistently find that
            attaching a low-rank adapter to more modules beats raising the rank on fewer. If quality is short, add the
            MLP projections before you double r.
          </p>
        </div>
      </section>

      <section id="family" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">The PEFT Family</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {METHODS.map((x) => (
            <div key={x.n} className={`p-5 rounded-xl border ${x.box}`}>
              <div className="flex items-baseline justify-between gap-2 mb-1.5">
                <div className={`font-bold ${x.label}`}>{x.n}</div>
                <div className="text-[10px] uppercase tracking-wide text-gray-500">{x.tag}</div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed m-0">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="serving" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Serving Many Adapters</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl mb-6">
          This is the operational payoff, and it is easy to miss. Adapters are tiny and separable, so one base model
          in memory can serve many customised variants at once.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="p-5 rounded-xl border border-rose-500/25 bg-rose-500/[0.07]">
            <div className="font-semibold text-rose-400 mb-2">Full fine-tunes</div>
            <p className="text-xs text-gray-300 leading-relaxed m-0">
              Ten customers, ten complete 14GB models, ten deployments. GPU memory scales linearly with the number of
              variants and most of it is duplicate weights.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07]">
            <div className="font-semibold text-emerald-400 mb-2">LoRA adapters</div>
            <p className="text-xs text-gray-300 leading-relaxed m-0">
              One base model in memory plus ten adapters of tens of megabytes each. Servers like vLLM can batch
              requests for different adapters together in a single forward pass.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-sm text-gray-400 leading-relaxed m-0">
            You can also merge an adapter permanently into the base weights before deploying. That gives exactly zero
            inference overhead but gives up the multi-tenant trick. Merge when you serve one variant; keep adapters
            separate when you serve many.
          </p>
        </div>
      </section>

      <section id="code" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">In Code</h2>
        <CodeBlock
          language="python"
          code={`from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
import torch

# QLoRA: load the frozen base in 4-bit, train adapters in bf16 on top.
bnb = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",          # normal-float 4, not plain int4
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,     # quantise the quantisation constants too
)

base = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B", quantization_config=bnb, device_map="auto"
)
base = prepare_model_for_kbit_training(base)

config = LoraConfig(
    r=16,
    lora_alpha=32,            # alpha = 2r keeps the effective scale steady
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
    # Breadth beats depth: more modules at low rank > fewer at high rank.
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj",
    ],
)

model = get_peft_model(base, config)
model.print_trainable_parameters()
# trainable params: 41,943,040 || all params: 8,072,204,288 || trainable%: 0.5196

# ... train ...

model.save_pretrained("./adapter")   # tens of MB, not tens of GB

# Later, for single-variant serving, fold it in and pay no inference cost:
# merged = model.merge_and_unload()`}
        />
      </section>

      <section id="limits" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">When PEFT Is Not Enough</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl mb-5">
          PEFT changes how a model behaves. It is a poor way to change what a model knows.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-5">
            <h4 className="text-emerald-400 font-semibold mb-2">PEFT is the right tool for</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>Output format, tone, and house style.</li>
              <li>Domain vocabulary and phrasing conventions.</li>
              <li>Reliable structured output and tool-call formats.</li>
              <li>Task specialisation from a few thousand examples.</li>
            </ul>
          </div>
          <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2">Reach for something else when</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
              <li>You need current or frequently changing facts — use retrieval.</li>
              <li>You need a capability the base model lacks entirely.</li>
              <li>The knowledge must be auditable and citable.</li>
              <li>You have fewer than a few hundred examples — try prompting first.</li>
            </ul>
          </div>
        </div>
        <div className="mt-5 p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-sm text-gray-400 leading-relaxed m-0">
            The decision is common enough to deserve its own walkthrough — see{" "}
            <a href="#/rag/vs-fine-tuning" className="text-blue-400 hover:underline">RAG vs Fine-tuning</a>. Related
            reading: <a href="#/genai/quantization" className="text-blue-400 hover:underline">Quantization</a> and{" "}
            <a href="#/genai/distillation" className="text-blue-400 hover:underline">Distillation</a>.
          </p>
        </div>
      </section>
      <KnowledgeCheck questions={questionsFor("genai-peft")} />
    </GuideLayout>
  );
}

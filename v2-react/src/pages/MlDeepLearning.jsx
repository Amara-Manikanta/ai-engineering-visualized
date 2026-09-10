import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';
import CodeBlock from '../components/CodeBlock';

const toc = [
  { label: "From Neuron to Network", hash: "overview" },
  { label: "What One Neuron Computes", hash: "neuron" },
  { label: "Anatomy of a Neural Network", hash: "anatomy" },
  { label: "Activation Functions", hash: "activations" },
  { label: "Forward Pass → Loss → Backprop", hash: "training-loop" },
  { label: "Common Architectures", hash: "architectures" },
];

function SingleNeuron() {
  const inputs = [
    { label: 'x₁', w: 'w₁', y: 40 },
    { label: 'x₂', w: 'w₂', y: 90 },
    { label: 'x₃', w: 'w₃', y: 140 },
  ];
  return (
    <svg viewBox="0 0 460 180" className="w-full max-w-xl mx-auto">
      {/* input nodes + weighted edges into the sum */}
      {inputs.map((inp, i) => (
        <g key={i}>
          <line x1="60" y1={inp.y} x2="210" y2="90" stroke="#4b5563" strokeWidth="1.2" />
          <circle cx="45" cy={inp.y} r="15" fill="#0891b2" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="45" y={inp.y + 4} textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="monospace">{inp.label}</text>
          <text x="130" y={(inp.y + 90) / 2 - 4} textAnchor="middle" fill="#818cf8" fontSize="9" fontFamily="monospace">{inp.w}</text>
        </g>
      ))}
      {/* sum + bias node */}
      <circle cx="230" cy="90" r="28" fill="#4c1d95" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1.5" />
      <text x="230" y="86" textAnchor="middle" fill="#e9d5ff" fontSize="14">Σ</text>
      <text x="230" y="102" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontFamily="monospace">+ b</text>
      {/* activation */}
      <line x1="258" y1="90" x2="315" y2="90" stroke="#4b5563" strokeWidth="1.2" />
      <rect x="315" y="68" width="60" height="44" rx="8" fill="#065f46" fillOpacity="0.3" stroke="#34d399" strokeWidth="1.2" />
      <text x="345" y="86" textAnchor="middle" fill="#a7f3d0" fontSize="10">activation</text>
      <text x="345" y="100" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontFamily="monospace">f( )</text>
      {/* output */}
      <line x1="375" y1="90" x2="420" y2="90" stroke="#4b5563" strokeWidth="1.2" />
      <circle cx="435" cy="90" r="15" fill="#065f46" fillOpacity="0.3" stroke="#34d399" strokeWidth="1.2" />
      <text x="435" y="94" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontFamily="monospace">ŷ</text>
    </svg>
  );
}

const LAYERS = [3, 5, 5, 2];

function NeuralNetDiagram() {
  const width = 560, height = 260;
  const layerX = (i) => 60 + i * ((width - 120) / (LAYERS.length - 1));
  const nodeY = (count, j) => (height / (count + 1)) * (j + 1);

  return (
    <svg width={width} height={height} className="max-w-full mx-auto">
      {/* edges */}
      {LAYERS.slice(0, -1).map((count, i) =>
        Array.from({ length: count }).map((_, j) =>
          Array.from({ length: LAYERS[i + 1] }).map((_, k) => (
            <motion.line
              key={`${i}-${j}-${k}`}
              x1={layerX(i)} y1={nodeY(count, j)}
              x2={layerX(i + 1)} y2={nodeY(LAYERS[i + 1], k)}
              stroke="#374151" strokeWidth={1}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ delay: (i + j * 0.05) * 0.15 }}
            />
          ))
        )
      )}
      {/* nodes */}
      {LAYERS.map((count, i) =>
        Array.from({ length: count }).map((_, j) => (
          <motion.circle
            key={`n-${i}-${j}`}
            cx={layerX(i)} cy={nodeY(count, j)} r={9}
            fill={i === 0 ? '#38BDF8' : i === LAYERS.length - 1 ? '#34D399' : '#818CF8'}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, type: 'spring' }}
          />
        ))
      )}
      <text x={layerX(0)} y={height - 10} textAnchor="middle" fill="#9CA3AF" fontSize="11">Input</text>
      <text x={layerX(1)} y={height - 10} textAnchor="middle" fill="#9CA3AF" fontSize="11">Hidden 1</text>
      <text x={layerX(2)} y={height - 10} textAnchor="middle" fill="#9CA3AF" fontSize="11">Hidden 2</text>
      <text x={layerX(3)} y={height - 10} textAnchor="middle" fill="#9CA3AF" fontSize="11">Output</text>
    </svg>
  );
}

export default function MlDeepLearning() {
  return (
    <GuideLayout
      title="Deep Learning"
      intro="Stacking layers of simple weighted sums and non-linear functions to approximate arbitrarily complex patterns — the foundation under every modern LLM."
      toc={toc}
    >
      <section id="overview" className="mb-14 scroll-mt-24">
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          A single "neuron" just computes a weighted sum of its inputs, adds a bias, and passes the result through a
          non-linear activation function. Deep learning is the discovery that stacking millions of these simple units
          into layers — and training the weights with backpropagation — lets a network approximate almost any
          function, from image classifiers to the transformer stacks inside modern LLMs.
        </p>
      </section>

      <section id="neuron" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">What One Neuron Computes</h2>
        <p className="text-gray-300 mb-6 max-w-3xl">
          Before the network, the neuron. Every node does the same three things: multiply each input by a learned
          weight, add them up with a bias, and pass the result through an activation function. That is the entire
          operation — a whole neural network is just millions of these, wired together.
        </p>
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <SingleNeuron />
          <div className="mt-4 bg-[#0f0f11] border border-gray-800 rounded-lg p-3 font-mono text-sm text-gray-200 text-center">
            ŷ = f( w₁x₁ + w₂x₂ + w₃x₃ + b )
          </div>
          <p className="text-[11px] text-gray-500 mt-3 text-center max-w-lg mx-auto leading-relaxed">
            Notice the inside is exactly linear/logistic regression. The activation <code className="text-emerald-300">f</code>{' '}
            is what adds non-linearity — and stacking these is what lets networks model curves no single line can.
          </p>
        </div>
      </section>

      <section id="anatomy" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Anatomy of a Neural Network</h2>
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <NeuralNetDiagram />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { color: 'text-cyan-400', title: 'Input Layer', desc: 'One node per feature — raw pixel values, token embeddings, tabular columns.' },
            { color: 'text-indigo-400', title: 'Hidden Layers', desc: 'Each node computes weighted sum → bias → activation. More layers = deeper, more expressive network.' },
            { color: 'text-emerald-400', title: 'Output Layer', desc: 'Shape matches the task — 1 node for regression, N nodes + softmax for N-class classification.' },
          ].map((l, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className={`font-bold mb-1 ${l.color}`}>{l.title}</h3>
              <p className="text-sm text-gray-400">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="activations" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Activation Functions</h2>
        <p className="text-gray-300 mb-4 max-w-3xl">
          Without a non-linear activation between layers, stacking any number of layers collapses mathematically into
          one linear layer — the network couldn't learn curves, only straight lines.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Function</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Formula</th>
                <th className="px-4 py-3 text-left text-gray-300 border-b border-gray-800">Used In</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">ReLU</td><td className="px-4 py-2.5 border-b border-gray-900 font-mono">max(0, x)</td><td className="px-4 py-2.5 border-b border-gray-900">Default for most hidden layers — fast, avoids vanishing gradients</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">GELU / SiLU</td><td className="px-4 py-2.5 border-b border-gray-900 font-mono">x · Φ(x)</td><td className="px-4 py-2.5 border-b border-gray-900">Transformers (GPT, Llama, Claude-style stacks)</td></tr>
              <tr><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Sigmoid</td><td className="px-4 py-2.5 border-b border-gray-900 font-mono">1 / (1 + e⁻ˣ)</td><td className="px-4 py-2.5 border-b border-gray-900">Binary classification output, gates in LSTMs</td></tr>
              <tr className="bg-gray-900/30"><td className="px-4 py-2.5 border-b border-gray-900 text-gray-200 font-semibold">Softmax</td><td className="px-4 py-2.5 border-b border-gray-900 font-mono">eˣⁱ / Σeˣʲ</td><td className="px-4 py-2.5 border-b border-gray-900">Multi-class output layer, attention weights</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="training-loop" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Forward Pass → Loss → Backprop</h2>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-mono bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 mb-4">
          <span className="bg-cyan-600/30 border border-cyan-500/50 px-3 py-2 rounded-lg text-cyan-300">Input</span>
          <span className="text-gray-500">→</span>
          <span className="bg-indigo-600/30 border border-indigo-500/50 px-3 py-2 rounded-lg text-indigo-300">Forward Pass</span>
          <span className="text-gray-500">→</span>
          <span className="bg-white/10 px-3 py-2 rounded-lg text-gray-300">Prediction</span>
          <span className="text-gray-500">→</span>
          <span className="bg-rose-600/30 border border-rose-500/50 px-3 py-2 rounded-lg text-rose-300">Loss Function</span>
          <span className="text-gray-500">→</span>
          <span className="bg-amber-600/30 border border-amber-500/50 px-3 py-2 rounded-lg text-amber-300">Backpropagation</span>
          <span className="text-gray-500">→</span>
          <span className="bg-emerald-600/30 border border-emerald-500/50 px-3 py-2 rounded-lg text-emerald-300">Update Weights</span>
        </div>
        <p className="text-gray-300 mb-4 max-w-3xl">
          Backpropagation is just the chain rule applied layer by layer: it computes how much each weight contributed
          to the final error, then nudges every weight slightly in the direction that reduces that error.
        </p>
        <CodeBlock language="python" maxHeight="300px" code={`for epoch in range(epochs):
    y_pred = model.forward(X)          # forward pass
    loss = loss_fn(y_pred, y_true)     # e.g. cross-entropy, MSE

    loss.backward()                    # compute gradients via chain rule
    optimizer.step()                   # w -= learning_rate * gradient
    optimizer.zero_grad()              # reset for the next batch`} />
      </section>

      <section id="architectures" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Common Architectures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: '🖼️', title: 'CNN (Convolutional)', desc: 'Sliding filters detect local patterns like edges and textures — the classic architecture for images.' },
            { icon: '🔁', title: 'RNN / LSTM', desc: 'Processes sequences step by step, carrying a hidden state forward — largely superseded by Transformers for language.' },
            { icon: '🧠', title: 'Transformer', desc: 'Uses self-attention to weigh every token against every other token in parallel — the architecture behind GPT, Claude, Gemini, and Llama.' },
            { icon: '🎨', title: 'Diffusion Models', desc: 'Learns to reverse a noise-adding process step by step — the backbone of modern image and video generation.' },
          ].map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4">
              <span className="text-3xl shrink-0">{a.icon}</span>
              <div>
                <h3 className="font-bold text-gray-200 mb-1">{a.title}</h3>
                <p className="text-sm text-gray-400">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-sm text-gray-400 leading-relaxed m-0">
            The Transformer is the architecture behind every modern LLM. For a full visual walkthrough of attention,
            positional encoding, and the end-to-end stack, see the{' '}
            <a href="/ai-engineering-visualized/ml/transformers" className="text-blue-400 hover:underline">
              Transformers deep-dive
            </a>
            .
          </p>
        </div>
      </section>
    </GuideLayout>
  );
}

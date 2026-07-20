import React, { useState } from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function MlTransformers() {
  const [archStep, setArchStep] = useState(1);
  const [tokText, setTokText] = useState("The Transformer model is a deep learning architecture.");
  const [tokens, setTokens] = useState([]);

  const handleTokenize = () => {
    // Dummy subword tokenization simulation
    const rawWords = tokText.split(' ').filter(w => w.trim());
    const result = [];
    rawWords.forEach(w => {
      if (w.length > 6) {
        result.push(w.substring(0, 4));
        result.push(w.substring(4));
      } else {
        result.push(w);
      }
    });
    setTokens(result);
  };

  const nextArchStep = () => setArchStep(s => (s < 5 ? s + 1 : s));
  const prevArchStep = () => setArchStep(s => (s > 1 ? s - 1 : s));

  return (
    <GuideLayout
      title="Transformers & Gen AI"
      intro="Interactive visual explainer of Generative AI, Transformer architecture, Tokenization, Embeddings and Attention mechanism."
      toc={[]}
    >
      <section className="text-center py-20 bg-gradient-to-b from-[#0a0a0a] to-[#111] rounded-2xl mb-16 border border-gray-800 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ backgroundImage: 'radial-gradient(circle at center, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold mb-6">Interactive Visual Explainer</div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Transformers &amp; <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">Generative AI</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">From raw text to intelligent generation — understand how Transformers work, step by step, with live animations.</p>
        </div>
      </section>

      <section className="guide-section mb-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">1. What is Generative AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#111] p-8 rounded-xl border border-gray-800">
          <div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Generative AI models are trained to <strong>understand patterns</strong> in data and produce outputs that look and feel like the real thing. Unlike traditional AI that classifies or predicts, Gen AI creates.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The key breakthrough was the <strong>Transformer architecture</strong> (2017), which allowed models to process entire sequences in parallel and understand long-range dependencies.
            </p>
            <div className="space-y-3">
              <div className="bg-black/40 p-3 rounded-lg border border-gray-800 text-gray-300"><span className="mr-2">📝</span> <strong>Text</strong> (ChatGPT, Gemini, Claude)</div>
              <div className="bg-black/40 p-3 rounded-lg border border-gray-800 text-gray-300"><span className="mr-2">🖼️</span> <strong>Images</strong> (DALL·E, Stable Diffusion)</div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-indigo-900/40 border border-indigo-500/50 rounded-2xl p-8 text-center"
            >
              <div className="text-xl font-bold text-indigo-300 mb-4">Transformer</div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg animate-pulse" />
                <div className="w-12 h-12 bg-white/10 rounded-lg animate-pulse delay-75" />
                <div className="w-12 h-12 bg-white/10 rounded-lg animate-pulse delay-150" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="guide-section mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">2. Transformer Architecture</h2>
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gray-300">Step {archStep} / 5</h3>
            <div className="flex gap-3">
              <button onClick={prevArchStep} disabled={archStep === 1} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white rounded-lg transition-colors">Previous</button>
              <button onClick={nextArchStep} disabled={archStep === 5} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg transition-colors">Next Step</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
            <motion.div animate={{ opacity: archStep >= 1 ? 1 : 0.3 }} className="bg-[#111] p-6 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">📄</div>
              <div className="font-bold text-white mb-2">Input Document</div>
            </motion.div>
            
            <div className="flex flex-col gap-4">
              <motion.div animate={{ opacity: archStep >= 2 ? 1 : 0.3, scale: archStep === 2 ? 1.05 : 1 }} className="bg-indigo-900/30 border border-indigo-500/40 p-4 rounded-xl flex-1 flex flex-col justify-center">
                <div className="font-bold text-indigo-300">Encoder</div>
                <div className="text-xs text-gray-400 mt-1">Tokenize → Embed → Attend</div>
              </motion.div>
              <motion.div animate={{ opacity: archStep >= 3 ? 1 : 0.3, scale: archStep === 3 ? 1.05 : 1 }} className="bg-purple-900/30 border border-purple-500/40 p-4 rounded-xl flex-1 flex flex-col justify-center">
                <div className="font-bold text-purple-300">Embeddings</div>
                <div className="text-xs text-gray-400 mt-1">[10, 3, 2]</div>
              </motion.div>
              <motion.div animate={{ opacity: archStep >= 4 ? 1 : 0.3, scale: archStep === 4 ? 1.05 : 1 }} className="bg-pink-900/30 border border-pink-500/40 p-4 rounded-xl flex-1 flex flex-col justify-center">
                <div className="font-bold text-pink-300">Decoder</div>
                <div className="text-xs text-gray-400 mt-1">Cross-attend → Generate</div>
              </motion.div>
            </div>

            <motion.div animate={{ opacity: archStep >= 5 ? 1 : 0.3, scale: archStep === 5 ? 1.05 : 1 }} className="bg-[#111] p-6 rounded-xl border border-gray-800 flex flex-col justify-center">
              <div className="text-4xl mb-4">💬</div>
              <div className="font-bold text-white mb-2">Output Text</div>
              {archStep === 5 && <div className="text-emerald-400 font-mono mt-2 animate-pulse">a puppy</div>}
            </motion.div>
          </div>
          
          <div className="bg-[#111] border border-gray-800 rounded-lg p-5">
            {archStep === 1 && <p className="text-gray-300"><strong>Step 1: Document Ingestion.</strong> The model is trained with a large volume of natural language text — from the internet, books, and code. This corpus teaches the model patterns in language.</p>}
            {archStep === 2 && <p className="text-gray-300"><strong>Step 2: Encoder.</strong> The encoder takes input token sequences and uses the self-attention mechanism to determine relationships between tokens.</p>}
            {archStep === 3 && <p className="text-gray-300"><strong>Step 3: Embeddings.</strong> The encoder's output is a collection of vectors where each element represents a semantic attribute of a token.</p>}
            {archStep === 4 && <p className="text-gray-300"><strong>Step 4: Decoder.</strong> The decoder works on a new sequence of tokens and uses the embeddings generated by the encoder to produce an appropriate natural language output.</p>}
            {archStep === 5 && <p className="text-gray-300"><strong>Step 5: Generation.</strong> Given input context, the model uses attention over the input tokens to predict the most probable next token iteratively.</p>}
          </div>
        </div>
      </section>

      <section className="guide-section mb-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">3. Tokenization</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Tokenization is the process of breaking text into smaller units called tokens — the atomic units a language model processes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#111] border border-gray-800 p-8 rounded-xl">
          <div>
            <textarea 
              value={tokText}
              onChange={(e) => setTokText(e.target.value)}
              className="w-full h-32 bg-black border border-gray-700 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-indigo-500 mb-4"
            />
            <button onClick={handleTokenize} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium">Tokenize ✂️</button>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-3">Output Tokens:</div>
            <div className="flex flex-wrap gap-2">
              {tokens.length === 0 ? (
                <div className="text-gray-500 italic">Click Tokenize to see output</div>
              ) : (
                tokens.map((t, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1 bg-indigo-900/40 text-indigo-300 border border-indigo-500/30 rounded font-mono text-sm"
                  >
                    {t}
                  </motion.span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

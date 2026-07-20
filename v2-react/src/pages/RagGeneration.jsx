import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function RagGeneration() {
  const [step, setStep] = useState(1);

  const toc = [
    { label: "Augmented Stage", hash: "augmented" },
    { label: "Prompt Construction", hash: "prompt-construction" },
    { label: "System Prompt", hash: "system-prompt" },
    { label: "Citations", hash: "citations" },
    { label: "Hallucination Prevention", hash: "hallucination" }
  ];

  const steps = [
    {
      title: "Retrieved Chunks",
      desc: "The relevant chunks retrieved from the vector database are now available.",
      icon: "📦"
    },
    {
      title: "Context Assembly",
      desc: "The retrieved chunks are assembled into a structured context block.",
      icon: "📋"
    },
    {
      title: "Final Prompt",
      desc: "A structured prompt containing both the retrieved context and the user's original question.",
      icon: "📝"
    }
  ];

  return (
    <GuideLayout
      title="Generation"
      intro="Synthesizing the retrieved context into a final answer."
      toc={toc}
    >
      <div className="space-y-16">
        <section id="augmented" className="scroll-mt-24">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8 mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              Stage 3: Augmented
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Interactive Augmentation Pipeline</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between py-12">
              {steps.map((s, i) => (
                <div key={i} className="relative flex-1 w-full text-center">
                  <motion.div
                    className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4 border-2 transition-colors cursor-pointer ${
                      step >= i + 1 ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-700 bg-gray-800 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      y: step === i + 1 ? [-5, 5, -5] : 0
                    }}
                    transition={{
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    onClick={() => setStep(i + 1)}
                  >
                    {s.icon}
                  </motion.div>
                  <h3 className={`font-semibold ${step >= i + 1 ? 'text-white' : 'text-gray-500'}`}>
                    {s.title}
                  </h3>
                  
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gray-800 -z-10">
                      <motion.div 
                        className="h-full bg-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: step > i + 1 ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-800/80 rounded-xl p-6 border border-gray-700 min-h-[140px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center max-w-2xl"
                >
                  <h4 className="text-xl font-bold text-white mb-2">{steps[step-1].title}</h4>
                  <p className="text-gray-400">{steps[step-1].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button 
                onClick={() => setStep(Math.min(steps.length, step + 1))}
                disabled={step === steps.length}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="prompt-construction" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Prompt Construction & Context Injection</h2>
          <p className="text-gray-300 leading-relaxed">
            The generation step is entirely reliant on the System Prompt. The retrieved chunks are formatted and injected directly into the prompt template alongside the user's query.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="system-prompt" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">The System Prompt</h2>
          <p className="text-gray-300 leading-relaxed mb-4">A strong RAG prompt usually looks like this:</p>
          <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-gray-300 font-mono text-sm overflow-x-auto">
{`You are a helpful assistant. Use ONLY the provided context to answer the question.
If the answer is not in the context, say "I don't know". Do not make up facts.

Context:
{context}

Question:
{query}`}
          </pre>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="citations" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Citation Generation & Formatting</h2>
          <p className="text-gray-300 leading-relaxed">
            Advanced RAG systems force the LLM to output citations (e.g., <code className="text-blue-300 bg-gray-800 px-1 py-0.5 rounded">[Doc 1]</code>). This is done by injecting the metadata source alongside the chunk text in the prompt. The UI then parses these brackets and creates clickable footnotes.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="hallucination" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-4">Hallucination Prevention</h2>
          <p className="text-gray-300 leading-relaxed">
            RAG prevents hallucinations fundamentally by grounding the model, but LLMs can still hallucinate if the context is contradictory or confusing. Setting <code className="text-blue-300 bg-gray-800 px-1 py-0.5 rounded">temperature=0</code>, explicitly forbidding outside knowledge in the prompt, and using strict JSON schemas for outputs are standard prevention techniques.
          </p>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

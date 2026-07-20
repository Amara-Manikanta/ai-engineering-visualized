import React, { useState } from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export default function MlNlp() {
  const [lexStep, setLexStep] = useState(0);
  const [spamStep, setSpamStep] = useState(0);
  const [synStep, setSynStep] = useState(0);
  const [spellStep, setSpellStep] = useState(0);

  const playLexical = async () => {
    setLexStep(0);
    await sleep(100);
    setLexStep(1); // row 1
    await sleep(800);
    setLexStep(2); // arrow 1
    await sleep(400);
    setLexStep(3); // tokens
    await sleep(800);
    setLexStep(4); // fade stopwords
    await sleep(600);
    setLexStep(5); // arrow 2
    await sleep(400);
    setLexStep(6); // stems
  };

  const playSpam = async () => {
    setSpamStep(0);
    await sleep(100);
    setSpamStep(1);
    await sleep(800);
    setSpamStep(2);
    await sleep(400);
    setSpamStep(3);
    await sleep(800);
    setSpamStep(4);
    await sleep(400);
    setSpamStep(5);
    await sleep(1000);
    setSpamStep(6);
    await sleep(400);
    setSpamStep(7);
  };

  const playSyn = async () => {
    setSynStep(0);
    await sleep(100);
    setSynStep(1); // The + DET
    await sleep(1200);
    setSynStep(2); // ->
    await sleep(400);
    setSynStep(3); // fox + NOUN
    await sleep(1200);
    setSynStep(4); // ->
    await sleep(400);
    setSynStep(5); // jumps + VERB
  };

  const playSpell = async () => {
    setSpellStep(0);
    await sleep(100);
    setSpellStep(1);
    await sleep(800);
    setSpellStep(2);
    await sleep(400);
    setSpellStep(3);
    await sleep(600);
    setSpellStep(4);
    await sleep(800);
    setSpellStep(5);
    await sleep(400);
    setSpellStep(6);
    await sleep(1000);
    setSpellStep(7);
    await sleep(400);
    setSpellStep(8);
  };

  const toc = [
    { label: "Tokenization & TF-IDF", hash: "lexical" },
    { label: "Spam Detection", hash: "spam" },
    { label: "Syntactic Processing", hash: "syntactic" },
    { label: "Spell Corrector", hash: "spell" }
  ];

  const Node = ({ children, visible, highlight, danger, faded, className="" }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20, scale: highlight ? 1.05 : 1 }}
      className={`px-6 py-3 bg-[#111] border-2 rounded-lg font-mono text-[0.95rem] font-semibold text-center relative transition-colors duration-300 ${
        highlight ? 'border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 
        danger ? 'border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 
        'border-gray-800 text-gray-300'
      } ${faded ? 'opacity-20' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );

  const Arrow = ({ visible }) => (
    <motion.div 
      animate={{ opacity: visible ? 1 : 0 }}
      className="text-gray-500 text-2xl mx-2"
    >
      ↓
    </motion.div>
  );
  
  const ArrowRight = ({ visible }) => (
    <motion.div 
      animate={{ opacity: visible ? 1 : 0 }}
      className="text-gray-500 text-2xl mx-2"
    >
      →
    </motion.div>
  );

  const PosTag = ({ children, visible }) => (
    <motion.div 
      animate={{ opacity: visible ? 1 : 0 }}
      className="absolute -top-6 left-1/2 -translate-x-1/2 text-[0.7rem] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded"
    >
      {children}
    </motion.div>
  );

  return (
    <GuideLayout
      title="Natural Language Processing"
      intro="Interactive explorations of the algorithms that allow machines to understand, process, and generate human language."
      toc={toc}
    >
      <section className="guide-section mb-16" id="lexical">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Tokenization & TF-IDF</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Before a machine learning model can understand text, it must be broken down into chunks (tokens) and converted into numerical formats. This process removes noise like stopwords and standardizes words through stemming.
        </p>
        
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-8 flex flex-col items-center min-h-[250px]">
          <div className="flex gap-4 flex-wrap justify-center mb-5">
            <Node visible={lexStep >= 1}>"The quick brown fox is running!"</Node>
          </div>
          <Arrow visible={lexStep >= 2} />
          <div className="flex gap-4 flex-wrap justify-center mb-5 mt-2">
            <Node visible={lexStep >= 3} faded={lexStep >= 4}>The</Node>
            <Node visible={lexStep >= 3}>quick</Node>
            <Node visible={lexStep >= 3}>brown</Node>
            <Node visible={lexStep >= 3}>fox</Node>
            <Node visible={lexStep >= 3} faded={lexStep >= 4}>is</Node>
            <Node visible={lexStep >= 3}>running</Node>
          </div>
          <Arrow visible={lexStep >= 5} />
          <div className="flex gap-4 flex-wrap justify-center mb-5 mt-2">
            <Node visible={lexStep >= 6}>quick</Node>
            <Node visible={lexStep >= 6}>brown</Node>
            <Node visible={lexStep >= 6}>fox</Node>
            <Node visible={lexStep >= 6} highlight={lexStep >= 6}>run</Node>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors" onClick={playLexical}>Play Animation</button>
            <button className="px-4 py-2 border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium rounded-lg transition-colors" onClick={() => setLexStep(0)}>Reset</button>
          </div>
        </div>
      </section>

      <section className="guide-section mb-16" id="spam">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Spam Detection Pipeline</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Using a Naive Bayes Classifier on Bag-of-Words representations allows us to determine if a message is Ham (normal) or Spam based on term probabilities.
        </p>
        
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-8 flex flex-col items-center min-h-[250px]">
          <div className="flex items-center flex-wrap justify-center gap-2">
            <Node visible={spamStep >= 1}>"WINNER!! Claim prize now!"</Node>
            <ArrowRight visible={spamStep >= 2} />
            <Node visible={spamStep >= 3}>[0, 1, 0, 1, 1...]</Node>
            <ArrowRight visible={spamStep >= 4} />
            <Node visible={spamStep >= 5} highlight={spamStep >= 5}>
              <div>Naive Bayes</div>
              <div className="text-xs opacity-70">P(Spam|Text)</div>
            </Node>
            <ArrowRight visible={spamStep >= 6} />
            <Node visible={spamStep >= 7} danger={spamStep >= 7}>SPAM</Node>
          </div>
          <div className="flex gap-3 mt-10">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors" onClick={playSpam}>Play Animation</button>
            <button className="px-4 py-2 border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium rounded-lg transition-colors" onClick={() => setSpamStep(0)}>Reset</button>
          </div>
        </div>
      </section>

      <section className="guide-section mb-16" id="syntactic">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Syntactic Processing (POS Tagging)</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Understanding grammatical structure is crucial. Hidden Markov Models (HMM) and the Viterbi Algorithm calculate the most probable sequence of tags for a given sentence.
        </p>
        
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-8 flex flex-col items-center min-h-[250px]">
          <div className="flex items-center flex-wrap justify-center gap-4 mt-8">
            <Node visible={synStep >= 1}>
              The
              <PosTag visible={synStep >= 1}>DET</PosTag>
            </Node>
            <ArrowRight visible={synStep >= 2} />
            <Node visible={synStep >= 3}>
              fox
              <PosTag visible={synStep >= 3}>NOUN</PosTag>
            </Node>
            <ArrowRight visible={synStep >= 4} />
            <Node visible={synStep >= 5}>
              jumps
              <PosTag visible={synStep >= 5}>VERB</PosTag>
            </Node>
          </div>
          <div className="flex gap-3 mt-12">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors" onClick={playSyn}>Play Animation</button>
            <button className="px-4 py-2 border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium rounded-lg transition-colors" onClick={() => setSynStep(0)}>Reset</button>
          </div>
        </div>
      </section>

      <section className="guide-section" id="spell">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Spell Corrector (Edit Distance)</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Calculating the Levenshtein Distance (minimum insertions, deletions, substitutions) allows models to generate candidate corrections, which are then scored by a Language Model.
        </p>
        
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-8 flex flex-col items-center min-h-[250px]">
          <div className="flex items-center flex-wrap justify-center gap-2">
            <Node visible={spellStep >= 1} danger={spellStep >= 1}>"speling"</Node>
            <ArrowRight visible={spellStep >= 2} />
            <Node visible={spellStep >= 3} className="text-left">
              <div>Candidates:</div>
              <div className={`text-xs mt-1 transition-colors ${spellStep >= 4 ? 'text-emerald-400' : 'text-gray-400'}`}>spelling (Dist: 1)</div>
              <div className="text-xs text-gray-400">peeling (Dist: 2)</div>
            </Node>
            <ArrowRight visible={spellStep >= 5} />
            <Node visible={spellStep >= 6}>
              <div>LM Prob:</div>
              <div className="text-xs opacity-70">P(spelling) &gt; P(peeling)</div>
            </Node>
            <ArrowRight visible={spellStep >= 7} />
            <Node visible={spellStep >= 8} highlight={spellStep >= 8}>"spelling"</Node>
          </div>
          <div className="flex gap-3 mt-10">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors" onClick={playSpell}>Play Animation</button>
            <button className="px-4 py-2 border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium rounded-lg transition-colors" onClick={() => setSpellStep(0)}>Reset</button>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

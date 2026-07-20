import React, { useState } from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function MlDecisionTrees() {
  const [splitState, setSplitState] = useState(0); // 0 = root, 1 = left split, 2 = all split

  const handleSplit1 = () => setSplitState(1);
  const handleSplit2 = () => setSplitState(2);
  const handleReset = () => setSplitState(0);

  const lineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: (custom) => ({ height: custom, opacity: 1, transition: { duration: 0.5 } })
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.3 } }
  };

  const labelVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5 } }
  };

  return (
    <GuideLayout
      title="Decision Trees"
      intro="A supervised machine learning algorithm used for both classification and regression tasks."
      toc={[]}
    >
      <section className="guide-section mb-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Interactive Decision Tree Animation</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          A Decision Tree splits data based on the most significant features. At each node, the algorithm asks a yes/no question, branching based on the answer until a final decision (leaf node) is reached.
        </p>
        
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl py-10 px-5 flex flex-col items-center relative overflow-hidden min-h-[450px]">
          
          {/* Root Node */}
          <div className="absolute top-[20px] left-1/2 -translate-x-1/2 z-10 bg-gradient-to-br from-indigo-500 to-pink-500 px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-indigo-500/20 whitespace-nowrap">
            Is Age &lt; 30?
          </div>

          {/* Level 1 Lines */}
          <motion.div 
            className="absolute top-[60px] left-1/2 w-0.5 bg-white/20 origin-top" 
            style={{ rotate: "58deg" }}
            variants={lineVariants}
            custom={150}
            initial="hidden"
            animate={splitState >= 1 ? "visible" : "hidden"}
          />
          <motion.div 
            className="absolute top-[60px] left-1/2 w-0.5 bg-white/20 origin-top" 
            style={{ rotate: "-58deg" }}
            variants={lineVariants}
            custom={150}
            initial="hidden"
            animate={splitState >= 1 ? "visible" : "hidden"}
          />

          {/* Level 1 Labels */}
          <motion.div variants={labelVariants} initial="hidden" animate={splitState >= 1 ? "visible" : "hidden"} className="absolute top-[90px] left-[35%] bg-[#0a0a0a] px-2 py-0.5 rounded text-xs text-gray-400 z-10">Yes</motion.div>
          <motion.div variants={labelVariants} initial="hidden" animate={splitState >= 1 ? "visible" : "hidden"} className="absolute top-[90px] left-[60%] bg-[#0a0a0a] px-2 py-0.5 rounded text-xs text-gray-400 z-10">No</motion.div>

          {/* Level 1 Nodes */}
          <motion.div 
            variants={nodeVariants}
            initial="hidden"
            animate={splitState >= 1 ? "visible" : "hidden"}
            className="absolute top-[140px] left-[25%] -translate-x-1/2 z-10 bg-gradient-to-br from-indigo-500 to-pink-500 px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-indigo-500/20 whitespace-nowrap"
          >
            Eats Pizza?
          </motion.div>
          
          <motion.div 
            variants={nodeVariants}
            initial="hidden"
            animate={splitState >= 1 ? "visible" : "hidden"}
            className="absolute top-[140px] left-[75%] -translate-x-1/2 z-10 bg-rose-500/20 border border-rose-500 px-6 py-3 rounded-xl text-rose-300 font-bold shadow-lg shadow-rose-500/10 whitespace-nowrap"
          >
            Prediction: Unfit
          </motion.div>

          {/* Level 2 Lines */}
          <motion.div 
            className="absolute top-[180px] left-[25%] w-0.5 bg-white/20 origin-top" 
            style={{ rotate: "45deg" }}
            variants={lineVariants}
            custom={110}
            initial="hidden"
            animate={splitState >= 2 ? "visible" : "hidden"}
          />
          <motion.div 
            className="absolute top-[180px] left-[25%] w-0.5 bg-white/20 origin-top" 
            style={{ rotate: "-45deg" }}
            variants={lineVariants}
            custom={110}
            initial="hidden"
            animate={splitState >= 2 ? "visible" : "hidden"}
          />

          {/* Level 2 Labels */}
          <motion.div variants={labelVariants} initial="hidden" animate={splitState >= 2 ? "visible" : "hidden"} className="absolute top-[210px] left-[16%] bg-[#0a0a0a] px-2 py-0.5 rounded text-xs text-gray-400 z-10">Yes</motion.div>
          <motion.div variants={labelVariants} initial="hidden" animate={splitState >= 2 ? "visible" : "hidden"} className="absolute top-[210px] left-[29%] bg-[#0a0a0a] px-2 py-0.5 rounded text-xs text-gray-400 z-10">No</motion.div>

          {/* Level 2 Nodes */}
          <motion.div 
            variants={nodeVariants}
            initial="hidden"
            animate={splitState >= 2 ? "visible" : "hidden"}
            className="absolute top-[260px] left-[12.5%] -translate-x-1/2 z-10 bg-rose-500/20 border border-rose-500 px-6 py-3 rounded-xl text-rose-300 font-bold shadow-lg shadow-rose-500/10 whitespace-nowrap"
          >
            Prediction: Unfit
          </motion.div>
          
          <motion.div 
            variants={nodeVariants}
            initial="hidden"
            animate={splitState >= 2 ? "visible" : "hidden"}
            className="absolute top-[260px] left-[37.5%] -translate-x-1/2 z-10 bg-emerald-500/20 border border-emerald-500 px-6 py-3 rounded-xl text-emerald-300 font-bold shadow-lg shadow-emerald-500/10 whitespace-nowrap"
          >
            Prediction: Fit
          </motion.div>
          
          <div className="flex-grow"></div>
          
          <div className="flex gap-4 mt-auto pt-72 z-20">
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${splitState === 0 ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'border border-gray-700 text-gray-500 cursor-not-allowed'}`}
              onClick={handleSplit1}
              disabled={splitState !== 0}
            >
              Split Root Node
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${splitState === 1 ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'border border-gray-700 text-gray-500 cursor-not-allowed'}`}
              onClick={handleSplit2}
              disabled={splitState !== 1}
            >
              Split Left Node
            </button>
            <button 
              className="px-4 py-2 border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium rounded-lg transition-colors"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="guide-section mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Structure of a Decision Tree</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Root Node</h3>
            <p className="text-gray-400 text-sm">Represents the entire dataset and the initial decision to be made.</p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Internal Nodes</h3>
            <p className="text-gray-400 text-sm">Represent decisions or tests on attributes. Each internal node has one or more branches.</p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Branches</h3>
            <p className="text-gray-400 text-sm">Represent the outcome of a decision or test, leading to another node.</p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Leaf Nodes</h3>
            <p className="text-gray-400 text-sm">Represent the final decision or prediction. No further splits occur at these nodes.</p>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Metrics for Splitting</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          When constructing decision trees, different metrics are used to determine the best way to split the dataset.
        </p>
        
        <div className="space-y-6">
          <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-6">
            <div className="font-bold text-indigo-300 mb-2">1. Gini Impurity (Classification)</div>
            <p className="text-gray-300 text-sm mb-3">Measures the likelihood of incorrectly classifying a randomly chosen element if it was randomly labeled according to the distribution of labels in the subset.</p>
            <div className="font-mono bg-black/40 p-3 rounded-lg text-sm text-gray-200">Gini = 1 - Σ(p_i²)</div>
            <p className="mt-3 text-sm text-gray-400"><strong className="text-gray-300">Goal:</strong> Minimize Gini impurity. <strong className="text-gray-300">Range:</strong> 0 (pure) to 0.5 (impure).</p>
          </div>

          <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-6">
            <div className="font-bold text-indigo-300 mb-2">2. Entropy & Information Gain (Classification)</div>
            <p className="text-gray-300 text-sm mb-3">Entropy measures randomness or disorder. Information gain is the reduction in entropy after a split.</p>
            <div className="font-mono bg-black/40 p-3 rounded-lg text-sm text-gray-200">
              Entropy = -Σ(p_i * log₂(p_i))<br/>
              Information Gain = Entropy(parent) - Σ( (n_k/n) * Entropy(k) )
            </div>
            <p className="mt-3 text-sm text-gray-400"><strong className="text-gray-300">Goal:</strong> Maximize information gain. <strong className="text-gray-300">Range:</strong> 0 (pure) to log(n) (impure).</p>
          </div>
          
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6">
            <div className="font-bold text-purple-300 mb-2">3. Variance Reduction / MSE (Regression)</div>
            <p className="text-gray-300 text-sm mb-3">Used to minimize the variance of the target variable in each split.</p>
            <div className="font-mono bg-black/40 p-3 rounded-lg text-sm text-gray-200">Variance = (1/n) * Σ(y_i - μ)²</div>
            <p className="mt-3 text-sm text-gray-400"><strong className="text-gray-300">Goal:</strong> Minimize the variance of target values within child nodes.</p>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6">
            <div className="font-bold text-purple-300 mb-2">4. Mean Absolute Error / MAE (Regression)</div>
            <p className="text-gray-300 text-sm mb-3">Measures the average of the absolute differences between predicted values and actual values.</p>
            <div className="font-mono bg-black/40 p-3 rounded-lg text-sm text-gray-200">MAE = (1/n) * Σ|y_i - ŷ_i|</div>
            <p className="mt-3 text-sm text-gray-400"><strong className="text-gray-300">Goal:</strong> Minimize the absolute difference.</p>
          </div>
        </div>
      </section>

    </GuideLayout>
  );
}

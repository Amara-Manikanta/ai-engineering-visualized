import React from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function MlLogistic() {
  const toc = [
    { label: "Overview & Use Cases", hash: "overview" },
    { label: "Core Mathematical Concepts", hash: "math" },
    { label: "Training & Loss Function", hash: "training" },
    { label: "Model Interpretation", hash: "interpretation" },
    { label: "Advantages vs Disadvantages", hash: "pros-cons" },
  ];

  return (
    <GuideLayout
      title="Logistic Regression"
      intro="A supervised machine learning algorithm used primarily for binary classification problems by predicting probabilities."
      toc={toc}
    >
      <section className="guide-section" id="overview">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">1. Overview & Use Cases</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Unlike linear regression which predicts continuous values, logistic regression predicts the <strong className="text-white">probability</strong> that an example belongs to a particular class (usually binary: 0 or 1). It generalizes to multiclass problems via extensions like multinomial logistic regression.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#111111] border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-indigo-400 mb-3">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
              <li>Spam vs Not Spam emails</li>
              <li>Success or Failure of a product</li>
              <li>Medical diagnosis (Disease present/absent)</li>
              <li>Credit risk assessment (Default/No default)</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="guide-section mt-12" id="math">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">2. Core Mathematical Concepts</h2>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6 mb-6"
        >
          <div className="font-bold text-indigo-300 mb-2">The Sigmoid Function</div>
          <p className="text-gray-300 text-sm mb-4">The logistic function transforms any real-valued number into an output between 0 and 1.</p>
          <div className="font-mono bg-black/40 p-4 rounded-lg text-center text-gray-200">
            S(x) = 1 / (1 + e<sup>-x</sup>)
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 mb-6"
        >
          <div className="font-bold text-purple-300 mb-2">Model Equation</div>
          <p className="text-gray-300 text-sm mb-4">We apply the Sigmoid function to a linear equation:</p>
          <div className="font-mono bg-black/40 p-4 rounded-lg text-center text-gray-200">
            P(y=1 | X) = 1 / (1 + e<sup>-(β₀ + β₁X₁ + ... + βₙXₙ)</sup>)
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Where <strong className="text-gray-300">β₀</strong> is the intercept (bias) and <strong className="text-gray-300">β₁...βₙ</strong> are the coefficients. To predict a class, we typically apply a threshold (predict 1 if P ≥ 0.5, else 0).
          </p>
        </motion.div>
      </section>

      <section className="guide-section mt-12" id="training">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">3. Training & Loss Function</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Logistic regression parameters are found by maximizing the likelihood of observed data. More commonly, we optimize the log-likelihood (sum of logs for numerical stability), which is equivalent to minimizing the <strong className="text-white">Binary Cross-Entropy Loss (Log Loss)</strong>.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#111111] border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">Log Loss Formula</h3>
            <div className="font-mono text-sm text-indigo-300 bg-black/30 p-3 rounded text-center">
              Loss = - (1/N) Σ [ yᵢ log(pᵢ) + (1-yᵢ) log(1-pᵢ) ]
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#111111] border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">Optimization</h3>
            <p className="text-gray-400 text-sm">
              Typically trained using Maximum Likelihood Estimation via Gradient Descent (or variants like SGD/Batch GD).
            </p>
          </motion.div>
        </div>
      </section>

      <section className="guide-section mt-12" id="interpretation">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">4. Model Interpretation & Assumptions</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li><strong className="text-white">Coefficients (β):</strong> Represent the log-odds change in the outcome for a unit increase in the feature. Exponentiating a coefficient yields the <em className="text-indigo-300">odds ratio</em>.</li>
          <li><strong className="text-white">Intercept (β₀):</strong> The log-odds of the outcome when all features are 0.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-200">Key Assumptions</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>The log-odds of the outcome is a linear combination of features.</li>
          <li>Observations are independent.</li>
          <li>No exact multicollinearity among features.</li>
          <li>Requires large sample sizes for stable estimates.</li>
        </ul>
      </section>

      <section className="guide-section mt-12" id="pros-cons">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">5. Advantages vs Disadvantages</h2>
        <div className="overflow-hidden border border-gray-800 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-900/30 text-gray-200">
                <th className="p-4 border-b border-gray-800 w-1/2">Advantages</th>
                <th className="p-4 border-b border-gray-800 w-1/2">Disadvantages</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-400 bg-[#0a0a0a]">
              <tr>
                <td className="p-4 border-b border-gray-800">Simple, interpretable, and fast to train.</td>
                <td className="p-4 border-b border-gray-800">Assumes linear relationship in log-odds.</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-800">Outputs calibrated probabilities, not just classes.</td>
                <td className="p-4 border-b border-gray-800">Can struggle with complex, highly non-linear data.</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-800">Works very well for linearly separable data.</td>
                <td className="p-4 border-b border-gray-800">Sensitive to outliers and multicollinearity.</td>
              </tr>
              <tr>
                <td className="p-4">Serves as a foundation for neural networks.</td>
                <td className="p-4">Requires careful feature engineering.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </GuideLayout>
  );
}

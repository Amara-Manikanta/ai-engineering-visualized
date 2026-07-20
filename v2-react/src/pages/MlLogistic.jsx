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
        
        <div className="guide-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-6" style={{ marginTop: "20px" }}>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="guide-card bg-[#111111] border border-gray-800 rounded-xl p-6"
          >
            <h3 className="gc-title text-lg font-semibold text-indigo-400 mb-3">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm" style={{ marginTop: "10px", marginLeft: "20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
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
          className="guide-callout bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6 mb-6"
          style={{ marginBottom: "20px" }}
        >
          <div className="guide-callout-title font-bold text-indigo-300 mb-2">The Sigmoid Function</div>
          <p className="text-gray-300 text-sm mb-4">The logistic function transforms any real-valued number into an output between 0 and 1.</p>
          <div className="font-mono bg-black/40 p-4 rounded-lg text-center text-gray-200" style={{ fontFamily: "var(--mono)", background: "rgba(0,0,0,0.3)", padding: "15px", borderRadius: "8px", marginTop: "10px", fontSize: "1rem", textAlign: "center" }}>
            S(x) = 1 / (1 + e<sup>-x</sup>)
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="guide-callout bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 mb-6"
          style={{ marginBottom: "20px" }}
        >
          <div className="guide-callout-title font-bold text-purple-300 mb-2">Model Equation</div>
          <p className="text-gray-300 text-sm mb-4">We apply the Sigmoid function to a linear equation:</p>
          <div className="font-mono bg-black/40 p-4 rounded-lg text-center text-gray-200" style={{ fontFamily: "var(--mono)", background: "rgba(0,0,0,0.3)", padding: "15px", borderRadius: "8px", marginTop: "10px", fontSize: "1rem", textAlign: "center" }}>
            P(y=1 | X) = 1 / (1 + e<sup>-(β₀ + β₁X₁ + ... + βₙXₙ)</sup>)
          </div>
          <p className="mt-4 text-sm text-gray-400" style={{ marginTop: "10px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Where <strong className="text-gray-300">β₀</strong> is the intercept (bias) and <strong className="text-gray-300">β₁...βₙ</strong> are the coefficients. To predict a class, we typically apply a threshold (predict 1 if P ≥ 0.5, else 0).
          </p>
        </motion.div>
      </section>

      <section className="guide-section mt-12" id="training">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">3. Training & Loss Function</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Logistic regression parameters are found by maximizing the likelihood of observed data. More commonly, we optimize the log-likelihood (sum of logs for numerical stability), which is equivalent to minimizing the <strong className="text-white">Binary Cross-Entropy Loss (Log Loss)</strong>.
        </p>
        
        <div className="guide-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-6" style={{ marginTop: "20px" }}>
          <motion.div 
            whileHover={{ y: -5 }}
            className="guide-card bg-[#111111] border border-gray-800 rounded-xl p-6"
          >
            <h3 className="gc-title text-lg font-semibold text-emerald-400 mb-3">Log Loss Formula</h3>
            <div className="font-mono text-sm text-indigo-300 bg-black/30 p-3 rounded text-center" style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", color: "#a5b4fc", marginTop: "10px" }}>
              Loss = - (1/N) Σ [ yᵢ log(pᵢ) + (1-yᵢ) log(1-pᵢ) ]
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="guide-card bg-[#111111] border border-gray-800 rounded-xl p-6"
          >
            <h3 className="gc-title text-lg font-semibold text-emerald-400 mb-3">Optimization</h3>
            <p className="gc-desc text-gray-400 text-sm" style={{ marginTop: "10px" }}>
              Typically trained using Maximum Likelihood Estimation via Gradient Descent (or variants like SGD/Batch GD).
            </p>
          </motion.div>
        </div>
      </section>

      <section className="guide-section mt-12" id="interpretation">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">4. Model Interpretation & Assumptions</h2>
        <ul className="gc-list list-disc list-inside space-y-3 text-gray-300" style={{ fontSize: "1rem" }}>
          <li><strong className="text-white">Coefficients (β):</strong> Represent the log-odds change in the outcome for a unit increase in the feature. Exponentiating a coefficient yields the <em className="text-indigo-300">odds ratio</em>.</li>
          <li><strong className="text-white">Intercept (β₀):</strong> The log-odds of the outcome when all features are 0.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-200" style={{ marginTop: "30px" }}>Key Assumptions</h3>
        <ul className="gc-list list-disc list-inside space-y-2 text-gray-400" style={{ fontSize: "1rem" }}>
          <li>The log-odds of the outcome is a linear combination of features.</li>
          <li>Observations are independent.</li>
          <li>No exact multicollinearity among features.</li>
          <li>Requires large sample sizes for stable estimates.</li>
        </ul>
      </section>

      <section className="guide-section mt-12" id="pros-cons">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">5. Advantages vs Disadvantages</h2>
        <div className="guide-card overflow-hidden border border-gray-800 rounded-xl" style={{ padding: 0, overflow: "hidden" }}>
          <table className="w-full text-left border-collapse" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
            <thead>
              <tr className="bg-indigo-900/30 text-gray-200" style={{ background: "rgba(99,102,241,0.15)", color: "#fff" }}>
                <th className="p-4 border-b border-gray-800 w-1/2" style={{ padding: "16px", borderBottom: "1px solid var(--border)", width: "50%" }}>Advantages</th>
                <th className="p-4 border-b border-gray-800 w-1/2" style={{ padding: "16px", borderBottom: "1px solid var(--border)", width: "50%" }}>Disadvantages</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-400 bg-[#0a0a0a]">
              <tr>
                <td className="p-4 border-b border-gray-800" style={{ padding: "16px", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>Simple, interpretable, and fast to train.</td>
                <td className="p-4 border-b border-gray-800" style={{ padding: "16px", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>Assumes linear relationship in log-odds.</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-800" style={{ padding: "16px", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>Outputs calibrated probabilities, not just classes.</td>
                <td className="p-4 border-b border-gray-800" style={{ padding: "16px", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>Can struggle with complex, highly non-linear data.</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-800" style={{ padding: "16px", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>Works very well for linearly separable data.</td>
                <td className="p-4 border-b border-gray-800" style={{ padding: "16px", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>Sensitive to outliers and multicollinearity.</td>
              </tr>
              <tr>
                <td className="p-4" style={{ padding: "16px", color: "var(--text-muted)" }}>Serves as a foundation for neural networks.</td>
                <td className="p-4" style={{ padding: "16px", color: "var(--text-muted)" }}>Requires careful feature engineering.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </GuideLayout>
  );
}

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";
import CodeBlock from "../components/CodeBlock";

const toc = [
  { label: "From One Feature to Many", hash: "overview" },
  { label: "Live Prediction Calculator", hash: "interactive" },
  { label: "The Normal Equation", hash: "normal-equation" },
  { label: "Multicollinearity", hash: "multicollinearity" },
  { label: "Feature Scaling", hash: "scaling" },
];

export default function MlMultiple() {
  const [sqft, setSqft] = useState(1500);
  const [bedrooms, setBedrooms] = useState(3);
  const [age, setAge] = useState(10);

  // Illustrative fixed coefficients for a toy house-price model
  const b0 = 25000, bSqft = 120, bBed = 8000, bAge = -450;

  const prediction = useMemo(() => {
    return b0 + bSqft * sqft + bBed * bedrooms + bAge * age;
  }, [sqft, bedrooms, age]);

  return (
    <GuideLayout
      title="Multiple Regression"
      intro="Predicting a value from several input features at once — the workhorse model behind pricing, forecasting, and scoring systems."
      toc={toc}
    >
      <section id="overview" className="mb-14 scroll-mt-24">
        <p className="text-gray-300 leading-relaxed max-w-3xl mb-4">
          Simple linear regression predicts <code className="text-pink-400 bg-gray-800 px-1 rounded">y</code> from one
          feature. Multiple regression extends the same idea to <code className="text-pink-400 bg-gray-800 px-1 rounded">n</code> features,
          each with its own learned weight:
        </p>
        <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-200">
          ŷ = b₀ + b₁x₁ + b₂x₂ + ... + bₙxₙ
        </div>
      </section>

      <section id="interactive" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Live Prediction Calculator</h2>
        <p className="text-gray-300 mb-6 max-w-3xl">
          A toy house-price model with 3 features. Adjust the sliders and watch each coefficient's contribution to the
          final predicted price update in real time.
        </p>
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-sm text-gray-300 font-semibold block mb-1">Square Feet = {sqft}</label>
              <input type="range" min="500" max="4000" step="50" value={sqft} onChange={(e) => setSqft(parseInt(e.target.value))} className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="text-sm text-gray-300 font-semibold block mb-1">Bedrooms = {bedrooms}</label>
              <input type="range" min="1" max="6" step="1" value={bedrooms} onChange={(e) => setBedrooms(parseInt(e.target.value))} className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="text-sm text-gray-300 font-semibold block mb-1">Age (years) = {age}</label>
              <input type="range" min="0" max="80" step="1" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="w-full accent-indigo-500" />
            </div>
          </div>

          <div className="font-mono text-sm text-gray-300 bg-black/30 rounded-lg p-4 space-y-1 mb-4">
            <div>ŷ = {b0.toLocaleString()} + ({bSqft} × {sqft}) + ({bBed.toLocaleString()} × {bedrooms}) + ({bAge} × {age})</div>
            <div className="text-gray-500">= {b0.toLocaleString()} + {(bSqft * sqft).toLocaleString()} + {(bBed * bedrooms).toLocaleString()} + {(bAge * age).toLocaleString()}</div>
          </div>

          {/* Contribution bars — each feature's push on the prediction */}
          <div className="mb-4">
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Each feature's contribution</div>
            <div className="space-y-2">
              {[
                { label: 'Base (b₀)', val: b0, color: 'bg-gray-500' },
                { label: 'Square feet', val: bSqft * sqft, color: 'bg-indigo-500' },
                { label: 'Bedrooms', val: bBed * bedrooms, color: 'bg-blue-500' },
                { label: 'Age', val: bAge * age, color: 'bg-rose-500' },
              ].map((c) => {
                const maxAbs = Math.max(b0, bSqft * sqft, bBed * bedrooms, Math.abs(bAge * age), 1);
                const pct = Math.min(100, (Math.abs(c.val) / maxAbs) * 100);
                return (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-24 shrink-0">{c.label}</span>
                    <div className="flex-1 h-4 rounded bg-white/5 overflow-hidden">
                      <motion.div className={`h-full ${c.color}`} animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
                    </div>
                    <span className={`text-xs font-mono w-24 text-right shrink-0 ${c.val < 0 ? 'text-rose-400' : 'text-gray-300'}`}>
                      {c.val < 0 ? '−' : '+'}${Math.abs(c.val).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <motion.div key={prediction} initial={{ scale: 0.95, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4 text-center">
            <span className="text-sm text-gray-400 block mb-1">Predicted Price</span>
            <span className="text-3xl font-black text-emerald-300">${Math.max(0, prediction).toLocaleString()}</span>
          </motion.div>
        </div>
      </section>

      <section id="normal-equation" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">The Normal Equation</h2>
        <p className="text-gray-300 mb-4 max-w-3xl">
          With multiple features, the coefficients are found in matrix form. Instead of iterating with gradient
          descent, the exact solution can be computed directly:
        </p>
        <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-200">
          β = (XᵀX)⁻¹ Xᵀy
        </div>
        <p className="text-gray-400 text-sm mt-3">
          Where <code className="text-indigo-300">X</code> is the feature matrix (one row per sample, one column per
          feature) and <code className="text-indigo-300">y</code> is the target vector. This is fast for a small number
          of features, but the matrix inversion becomes expensive as features grow into the thousands — that's when
          gradient descent takes over again.
        </p>
      </section>

      <section id="multicollinearity" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Multicollinearity</h2>
        <p className="text-gray-300 mb-4 max-w-3xl">
          Problems arise when two features are highly correlated with each other (e.g. "square feet" and "number of
          rooms"). The model can't tell which one deserves credit for the outcome, so coefficients become unstable
          and hard to interpret — even though predictions may still look fine.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-rose-900/10 border border-rose-500/20 p-4 rounded-lg">
            <h4 className="text-rose-400 font-semibold mb-2 mt-0">Symptoms</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
              <li>Coefficients flip sign or swing wildly with small data changes.</li>
              <li>High R² overall, but individual coefficients look nonsensical.</li>
            </ul>
          </div>
          <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-lg">
            <h4 className="text-emerald-400 font-semibold mb-2 mt-0">Fixes</h4>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
              <li>Check Variance Inflation Factor (VIF); drop or combine features above ~5–10.</li>
              <li>Use regularization (Ridge/Lasso) to stabilize coefficients.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="scaling" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">Feature Scaling & Regularization</h2>
        <p className="text-gray-300 max-w-3xl mb-4">
          Features on very different scales (square feet in the thousands vs. bedroom count 1–6) make gradient
          descent converge slowly and skew regularization penalties. Standardizing features
          (<code className="text-indigo-300">z = (x − mean) / std</code>) before training is standard practice for
          any multi-feature linear model.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-blue-500/25 bg-blue-500/10">
            <div className="text-sm font-semibold text-blue-300 mb-1">Ridge (L2)</div>
            <p className="text-xs text-gray-300 leading-relaxed m-0">
              Adds a penalty on the sum of squared coefficients. Shrinks them toward zero (but never exactly zero),
              which tames multicollinearity and stabilizes the model.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-purple-500/25 bg-purple-500/10">
            <div className="text-sm font-semibold text-purple-300 mb-1">Lasso (L1)</div>
            <p className="text-xs text-gray-300 leading-relaxed m-0">
              Penalizes the sum of absolute coefficients. Can drive some to exactly zero — performing automatic
              feature selection by dropping useless inputs entirely.
            </p>
          </div>
        </div>

        <CodeBlock language="python" maxHeight="320px" code={`from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge, Lasso

# Scaling belongs INSIDE the pipeline so test data is scaled
# using only the training statistics (no leakage).
model = make_pipeline(
    StandardScaler(),
    Ridge(alpha=1.0),        # or LinearRegression() / Lasso(alpha=0.1)
)
model.fit(X_train, y_train)

print("R² on test:", model.score(X_test, y_test))
print("coefficients:", model[-1].coef_)`} />
      </section>
    </GuideLayout>
  );
}

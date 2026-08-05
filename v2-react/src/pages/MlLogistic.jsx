import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";
import CodeBlock from "../components/CodeBlock";

const sigmoid = (z) => 1 / (1 + Math.exp(-z));

/* ---------------------------------------------------------------------------
   Interactive sigmoid: slide the linear score z, watch the probability
--------------------------------------------------------------------------- */

function SigmoidPlayground() {
  const [z, setZ] = useState(0);
  const p = sigmoid(z);
  const predicted = p >= 0.5 ? 1 : 0;

  const W = 320, H = 180, padX = 30, padY = 20;
  const zMin = -8, zMax = 8;
  const toX = (zz) => padX + ((zz - zMin) / (zMax - zMin)) * (W - padX * 2);
  const toY = (pp) => H - padY - pp * (H - padY * 2);

  // sigmoid path
  const path = useMemo(() => {
    let d = '';
    for (let i = 0; i <= 80; i++) {
      const zz = zMin + (i / 80) * (zMax - zMin);
      const x = toX(zz), y = toY(sigmoid(zz));
      d += (i === 0 ? 'M' : 'L') + ` ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d;
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg mx-auto block">
        {/* axes */}
        <line x1={padX} y1={toY(0)} x2={W - padX} y2={toY(0)} stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
        <line x1={toX(0)} y1={padY} x2={toX(0)} y2={H - padY} stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        {/* 0.5 threshold */}
        <line x1={padX} y1={toY(0.5)} x2={W - padX} y2={toY(0.5)} stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3,2" />
        <text x={W - padX} y={toY(0.5) - 3} textAnchor="end" fill="#f59e0b" fontSize="7">threshold 0.5</text>
        {/* labels */}
        <text x={padX} y={toY(1) - 3} fill="#6b7280" fontSize="7">P = 1</text>
        <text x={padX} y={toY(0) + 9} fill="#6b7280" fontSize="7">P = 0</text>
        {/* curve */}
        <path d={path} fill="none" stroke="#818cf8" strokeWidth="2" />
        {/* current point */}
        <line x1={toX(z)} y1={toY(0)} x2={toX(z)} y2={toY(p)} stroke="#34d399" strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={toX(z)} y1={toY(p)} x2={padX} y2={toY(p)} stroke="#34d399" strokeWidth="0.8" strokeDasharray="2,2" />
        <circle cx={toX(z)} cy={toY(p)} r="4" fill="#34d399" />
      </svg>

      <div className="max-w-md mx-auto mt-4">
        <label className="text-sm text-gray-300 font-semibold flex justify-between">
          <span>Linear score z = β₀ + β·x</span>
          <span className="font-mono text-indigo-300">{z.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="-8"
          max="8"
          step="0.1"
          value={z}
          onChange={(e) => setZ(parseFloat(e.target.value))}
          className="w-full accent-indigo-500 mt-1"
        />
        <div className="flex flex-wrap items-center gap-3 mt-4 justify-center">
          <div className="px-4 py-2 rounded-lg bg-indigo-500/15 border border-indigo-500/40 text-sm">
            Probability: <strong className="text-indigo-200 font-mono">{p.toFixed(3)}</strong>
          </div>
          <div className={`px-4 py-2 rounded-lg text-sm border ${predicted === 1 ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200' : 'bg-rose-500/15 border-rose-500/40 text-rose-200'}`}>
            Predicted class: <strong className="font-mono">{predicted}</strong>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-gray-500 mt-4 leading-relaxed text-center max-w-md mx-auto mb-0">
        The linear part produces any number from −∞ to +∞. The sigmoid squashes it into a valid probability (0–1). A
        threshold (default 0.5) then turns that probability into a class.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Why not linear regression for classification
--------------------------------------------------------------------------- */

function WhyNotLinear() {
  const pts0 = [12, 20, 28, 36];
  const pts1 = [64, 72, 80, 88];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-rose-500/30 bg-black/40 p-4">
        <div className="text-sm font-semibold text-rose-400 mb-2">Linear regression on 0/1 labels</div>
        <svg viewBox="0 0 100 70" className="w-full">
          <line x1="6" y1="60" x2="96" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <line x1="14" y1="66" x2="92" y2="8" stroke="#f43f5e" strokeWidth="1.2" />
          {pts0.map((x, i) => <circle key={`z${i}`} cx={x} cy="60" r="2.4" fill="#9ca3af" />)}
          {pts1.map((x, i) => <circle key={`o${i}`} cx={x} cy="14" r="2.4" fill="#9ca3af" />)}
        </svg>
        <div className="text-[11px] text-gray-500 mt-1 leading-relaxed">
          The line shoots below 0 and above 1 — nonsensical as a probability, and outliers drag the boundary around.
        </div>
      </div>
      <div className="rounded-xl border border-emerald-500/30 bg-black/40 p-4">
        <div className="text-sm font-semibold text-emerald-400 mb-2">Logistic regression (sigmoid)</div>
        <svg viewBox="0 0 100 70" className="w-full">
          <line x1="6" y1="60" x2="96" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <path d="M 14 60 C 40 60, 45 14, 92 14" fill="none" stroke="#34d399" strokeWidth="1.5" />
          {pts0.map((x, i) => <circle key={`z${i}`} cx={x} cy="60" r="2.4" fill="#9ca3af" />)}
          {pts1.map((x, i) => <circle key={`o${i}`} cx={x} cy="14" r="2.4" fill="#9ca3af" />)}
        </svg>
        <div className="text-[11px] text-gray-500 mt-1 leading-relaxed">
          The S-curve stays inside 0–1, saturates at the extremes, and gives a smooth probability everywhere.
        </div>
      </div>
    </div>
  );
}

export default function MlLogistic() {
  const toc = [
    { label: "Overview & Use Cases", hash: "overview" },
    { label: "Why Not Linear Regression?", hash: "why-not-linear" },
    { label: "The Sigmoid (interactive)", hash: "sigmoid" },
    { label: "Training & Loss", hash: "training" },
    { label: "Interpreting Coefficients", hash: "interpretation" },
    { label: "Pros & Cons", hash: "pros-cons" },
  ];

  return (
    <GuideLayout
      title="Logistic Regression"
      intro="A supervised algorithm for classification — it predicts the probability that an example belongs to a class, then thresholds it into a decision."
      toc={toc}
    >
      <div className="space-y-16">
        {/* --------------------------------------------------------------- */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="overview" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Overview & Use Cases</h2>
          <p className="text-gray-300 mb-6 leading-relaxed max-w-3xl">
            Despite the name, logistic regression is a <strong className="text-white">classification</strong> algorithm.
            Where linear regression predicts a continuous number, logistic regression predicts the{' '}
            <strong className="text-white">probability</strong> that an example belongs to a class, then applies a
            threshold to decide. It is the simplest, most interpretable classifier — and the mathematical seed of a
            single neuron in a neural network.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ['📧', 'Spam detection', 'spam vs not-spam'],
              ['🏥', 'Medical diagnosis', 'disease present / absent'],
              ['💳', 'Credit risk', 'will default / won’t'],
              ['🛒', 'Churn prediction', 'will cancel / stay'],
            ].map(([icon, t, d]) => (
              <div key={t} className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-xl mb-1.5">{icon}</div>
                <div className="text-sm font-semibold text-white">{t}</div>
                <div className="text-[11px] text-gray-500">{d}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* --------------------------------------------------------------- */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="why-not-linear" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Why Not Just Use Linear Regression?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed max-w-3xl">
            If the labels are 0 and 1, why not fit a line? Because a line is unbounded — it predicts probabilities below
            0 and above 1, and a single outlier can swing the whole boundary. The sigmoid fixes both problems.
          </p>
          <WhyNotLinear />
        </motion.section>

        {/* --------------------------------------------------------------- */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="sigmoid" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">The Sigmoid Function</h2>
          <p className="text-gray-300 mb-4 leading-relaxed max-w-3xl">
            The engine of logistic regression. It takes the linear score{' '}
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-400">z = β₀ + β₁x₁ + … + βₙxₙ</code> and maps it
            to a probability between 0 and 1. Drag the slider to feel how the score becomes a probability and then a
            class.
          </p>
          <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-200 mb-6 text-center">
            σ(z) = 1 / (1 + e<sup>−z</sup>)
          </div>
          <SigmoidPlayground />
        </motion.section>

        {/* --------------------------------------------------------------- */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="training" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Training & Loss Function</h2>
          <p className="text-gray-300 mb-6 leading-relaxed max-w-3xl">
            Logistic regression is trained by minimising <strong className="text-white">Binary Cross-Entropy</strong>{' '}
            (log loss). Unlike squared error, log loss punishes confident wrong answers brutally — predicting 0.99 for a
            true label of 0 costs far more than predicting 0.6.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-emerald-400 mb-3">Log loss</h3>
              <div className="font-mono text-xs text-indigo-300 bg-black/30 p-3 rounded text-center">
                −(1/N) Σ [ yᵢ·log(pᵢ) + (1−yᵢ)·log(1−pᵢ) ]
              </div>
              <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
                For a positive example only the left term is active (reward high p); for a negative only the right
                (reward low p).
              </p>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-emerald-400 mb-3">Optimisation</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                There is no closed-form solution, so parameters are found by gradient descent (or variants like SGD).
                Conveniently, the gradient of log loss through the sigmoid simplifies to the same clean{' '}
                <code className="text-indigo-300">(pᵢ − yᵢ)·xᵢ</code> form as linear regression.
              </p>
            </div>
          </div>
          <CodeBlock language="python" maxHeight="300px" code={`from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

clf = LogisticRegression()
clf.fit(X_train, y_train)

proba = clf.predict_proba(X_test)[:, 1]   # probability of class 1
pred  = clf.predict(X_test)               # thresholded at 0.5
print("accuracy:", clf.score(X_test, y_test))`} />
        </motion.section>

        {/* --------------------------------------------------------------- */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="interpretation" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Interpreting Coefficients</h2>
          <p className="text-gray-300 mb-4 leading-relaxed max-w-3xl">
            A big reason to reach for logistic regression is that its coefficients <em>mean</em> something.
          </p>
          <ul className="space-y-2.5 text-sm text-gray-300 mb-6">
            <li className="flex gap-2"><span className="text-indigo-400 shrink-0">β</span><span><strong className="text-white">Coefficient:</strong> the change in log-odds per one-unit increase in the feature. Exponentiate it (e^β) to get the <em className="text-indigo-300">odds ratio</em> — e.g. e^β = 1.5 means the odds rise 50% per unit.</span></li>
            <li className="flex gap-2"><span className="text-indigo-400 shrink-0">β₀</span><span><strong className="text-white">Intercept:</strong> the log-odds when every feature is zero.</span></li>
            <li className="flex gap-2"><span className="text-indigo-400 shrink-0">±</span><span><strong className="text-white">Sign:</strong> a positive coefficient pushes toward class 1, negative toward class 0.</span></li>
          </ul>
          <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/10">
            <div className="text-xs font-semibold text-amber-300 mb-2">Key assumptions</div>
            <p className="text-xs text-gray-300 leading-relaxed m-0">
              The log-odds is linear in the features; observations are independent; no severe multicollinearity; and
              enough samples for stable estimates. When these break, reach for trees or neural networks.
            </p>
          </div>
        </motion.section>

        {/* --------------------------------------------------------------- */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="pros-cons" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-5">
              <h4 className="text-emerald-400 font-semibold mb-2">Advantages</h4>
              <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
                <li>Simple, fast, and highly interpretable.</li>
                <li>Outputs calibrated probabilities, not just labels.</li>
                <li>Strong baseline for any classification problem.</li>
                <li>Hard to overfit with regularisation (L1/L2).</li>
              </ul>
            </div>
            <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-5">
              <h4 className="text-rose-400 font-semibold mb-2">Disadvantages</h4>
              <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1.5">
                <li>Assumes a linear decision boundary (in log-odds).</li>
                <li>Struggles with complex non-linear patterns.</li>
                <li>Sensitive to outliers and correlated features.</li>
                <li>Needs good feature engineering to shine.</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </GuideLayout>
  );
}

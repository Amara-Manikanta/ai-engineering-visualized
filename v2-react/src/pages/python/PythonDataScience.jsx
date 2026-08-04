import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../../components/GuideLayout';
import { 
  Code2, Terminal, CheckCircle2, FileCode, Layers, 
  LineChart, Cpu, Database, BarChart2, Sparkles, Sigma, Box
} from 'lucide-react';

export default function PythonDataScience() {
  const toc = [
    { label: "21. Python for Data Science", hash: "#ds-overview" },
    { label: "22. NumPy & Matrix Math", hash: "#numpy" },
    { label: "23. Pandas & DataFrames", hash: "#pandas" },
    { label: "24. Matplotlib & Seaborn", hash: "#visualization" },
    { label: "25. Scikit-Learn & ML Pipelines", hash: "#scikit-learn" }
  ];

  return (
    <GuideLayout
      title="Module 5: Python for Data Science & ML"
      intro="Master NumPy array vectorization, Pandas DataFrame manipulation, Matplotlib/Seaborn data visualization, and Scikit-Learn Machine Learning pipelines."
      toc={toc}
    >
      {/* 21. DATA SCIENCE OVERVIEW */}
      <section id="ds-overview" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Sigma size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">21. Python for Data Science Overview</h2>
            <p className="text-sm text-gray-400">The scientific computing stack: NumPy, Pandas, SciPy, Matplotlib, Scikit-Learn</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-blue-300 mb-2">The AI & ML Data Pipeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center my-4 text-xs">
            <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-xl">
              <span className="font-bold text-blue-300 block mb-1">1. Ingestion</span>
              <span className="text-[10px] text-gray-400">Pandas, Requests, SQL</span>
            </div>
            <div className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded-xl">
              <span className="font-bold text-cyan-300 block mb-1">2. Processing</span>
              <span className="text-[10px] text-gray-400">NumPy, Vectorization</span>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded-xl">
              <span className="font-bold text-purple-300 block mb-1">3. Visualization</span>
              <span className="text-[10px] text-gray-400">Matplotlib, Seaborn</span>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-xl">
              <span className="font-bold text-emerald-300 block mb-1">4. Modeling</span>
              <span className="text-[10px] text-gray-400">Scikit-Learn, PyTorch</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 22. NUMPY */}
      <section id="numpy" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">22. NumPy & Matrix Math</h2>
            <p className="text-sm text-gray-400">N-dimensional `ndarray`, vectorization, broadcasting, dot products (`@`)</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-cyan-400"><FileCode size={12} /> numpy_matrix.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-cyan-300 mb-3 whitespace-pre-wrap">{`import numpy as np

# Vectorized Cosine Similarity
query_vec = np.array([0.2, 0.8, 0.5])
doc_vec   = np.array([0.1, 0.9, 0.4])

dot_product = np.dot(query_vec, doc_vec)
norm = np.linalg.norm(query_vec) * np.linalg.norm(doc_vec)
similarity = dot_product / norm

print(f"Cosine Similarity: {similarity:.4f}")`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Cosine Similarity: 0.9859</code>
          </div>
        </div>
      </section>

      {/* 23. PANDAS */}
      <section id="pandas" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Database size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">23. Pandas & DataFrames</h2>
            <p className="text-sm text-gray-400">Data cleaning, `groupby`, filtering, joining, indexing</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-400"><FileCode size={12} /> pandas_demo.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-purple-300 mb-3 whitespace-pre-wrap">{`import pandas as pd

df = pd.DataFrame({
    "model": ["GPT-4o", "Claude 3.5", "Gemini 1.5", "GPT-4o"],
    "latency_ms": [250, 210, 180, 240],
    "accuracy": [0.92, 0.94, 0.89, 0.93]
})

summary = df.groupby("model")["latency_ms"].mean().reset_index()
print(summary)`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>{`        model  latency_ms\n0  Claude 3.5       210.0\n1  GPT-4o           245.0\n2  Gemini 1.5       180.0`}</code>
          </div>
        </div>
      </section>

      {/* 24. MATPLOTLIB & SEABORN */}
      <section id="visualization" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <LineChart size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">24. Matplotlib & Seaborn</h2>
            <p className="text-sm text-gray-400">Scatter plots, line charts, heatmaps, subplots, visualization styling</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-teal-400"><FileCode size={12} /> matplotlib_plot.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-teal-300 mb-3 whitespace-pre-wrap">{`import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 9, 16, 25]

plt.plot(x, y, marker='o', color='indigo')
plt.title("Model Training Loss Curve")
plt.xlabel("Epochs")
plt.ylabel("Loss")
plt.savefig("loss_curve.png")
print("Saved loss_curve.png successfully.")`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Saved loss_curve.png successfully.</code>
          </div>
        </div>
      </section>

      {/* 25. SCIKIT-LEARN */}
      <section id="scikit-learn" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Cpu size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">25. Scikit-Learn & ML Pipelines</h2>
            <p className="text-sm text-gray-400">Preprocessing, `train_test_split`, `fit`/`predict`, evaluation metrics</p>
          </div>
        </div>

        <div className="bg-[#0e1117] rounded-xl border border-slate-700/60 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-emerald-400"><FileCode size={12} /> sklearn_pipeline.py</span>
            <span>Python 3.11</span>
          </div>
          <pre className="text-emerald-300 mb-3 whitespace-pre-wrap">{`from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np

# Synthetic Embeddings & Labels
X = np.random.rand(100, 10)
y = np.random.randint(0, 2, 100)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = LogisticRegression()
clf.fit(X_train, y_train)

preds = clf.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, preds):.2f}")`}</pre>
          <div className="bg-black/60 p-2 rounded border border-gray-800 text-[11px] text-gray-300">
            <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1"><Terminal size={10}/> Terminal Output:</div>
            <code>Accuracy: 0.55</code>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

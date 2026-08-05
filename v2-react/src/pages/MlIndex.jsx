import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GuideLayout from '../components/GuideLayout';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TOPICS = [
  { group: 'Foundations', tone: 'text-indigo-400', border: 'hover:border-indigo-500/50', items: [
    { t: 'Supervised Learning', d: 'Learn from labelled examples.', path: '/ml/supervised', icon: '🎯' },
    { t: 'Unsupervised Learning', d: 'Find structure with no labels.', path: '/ml/unsupervised', icon: '🧭' },
  ]},
  { group: 'Regression', tone: 'text-emerald-400', border: 'hover:border-emerald-500/50', items: [
    { t: 'Linear Regression', d: 'Fit a line to predict a number.', path: '/ml/linear-regression', icon: '📈' },
    { t: 'Multiple Regression', d: 'Many features, one prediction.', path: '/ml/multiple-regression', icon: '🧮' },
  ]},
  { group: 'Classification', tone: 'text-blue-400', border: 'hover:border-blue-500/50', items: [
    { t: 'Logistic Regression', d: 'Predict a probability, then a class.', path: '/ml/logistic-regression', icon: '🔀' },
    { t: 'Decision Trees', d: 'If/else splits you can read.', path: '/ml/decision-trees', icon: '🌳' },
    { t: 'k-Nearest Neighbours', d: 'Classify by closest examples.', path: '/ml/knn', icon: '📍' },
  ]},
  { group: 'Deep Learning', tone: 'text-purple-400', border: 'hover:border-purple-500/50', items: [
    { t: 'Deep Learning', d: 'Neurons, layers, backprop.', path: '/ml/deep-learning', icon: '🧠' },
    { t: 'NLP', d: 'Language: tokens to meaning.', path: '/ml/nlp', icon: '💬' },
    { t: 'Transformers', d: 'The architecture behind LLMs.', path: '/ml/transformers', icon: '⚡' },
  ]},
];

const WORKFLOW = [
  { n: 1, t: 'Collect', d: 'Gather relevant, representative data.' },
  { n: 2, t: 'Preprocess', d: 'Handle missing values, encode, scale.' },
  { n: 3, t: 'Feature engineer', d: 'Create and select informative inputs.' },
  { n: 4, t: 'Select model', d: 'Pick an algorithm for the task.' },
  { n: 5, t: 'Train', d: 'Fit the model to the training set.' },
  { n: 6, t: 'Evaluate', d: 'Score on held-out data.' },
  { n: 7, t: 'Tune', d: 'Adjust hyperparameters to generalise.' },
  { n: 8, t: 'Deploy', d: 'Ship it and monitor in production.' },
];

const toc = [
  { label: 'Topics in This Section', hash: '#topics' },
  { label: 'Key Python Libraries', hash: '#key-python-libraries' },
  { label: 'Supervised vs Unsupervised', hash: '#supervised-vs-unsupervised-learning' },
  { label: 'The ML Workflow', hash: '#typical-ml-workflow' },
  { label: 'Common Challenges', hash: '#common-challenges' },
];

export default function MlIndex() {
  return (
    <GuideLayout
      title="Introduction to Machine Learning"
      intro="The foundation of modern AI. Start here for the landscape, then dive into each algorithm — every topic has its own interactive guide."
      toc={toc}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
        {/* ------------------------------------------------------------- */}
        <motion.section variants={itemVariants} id="topics" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-2 text-gray-100">Topics in This Section</h2>
          <p className="text-gray-400 mb-6 max-w-3xl text-sm">
            The ML curriculum, grouped by what each model does. Foundations first, then the two problem shapes
            (regression and classification), then deep learning.
          </p>
          <div className="space-y-6">
            {TOPICS.map((group) => (
              <div key={group.group}>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className={`text-sm font-bold uppercase tracking-wide ${group.tone}`}>{group.group}</h3>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.items.map((it) => (
                    <motion.div key={it.path} whileHover={{ y: -3 }}>
                      <Link
                        to={it.path}
                        className={`group block h-full p-4 rounded-xl border border-white/10 bg-white/5 ${group.border} hover:bg-white/[0.07] transition-colors`}
                      >
                        <div className="flex items-center gap-2.5 mb-1">
                          <span className="text-xl">{it.icon}</span>
                          <h4 className="font-semibold text-white text-sm">{it.t}</h4>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed m-0">{it.d}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ------------------------------------------------------------- */}
        <motion.section variants={itemVariants} id="key-python-libraries" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Key Python Libraries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'NumPy', tag: 'arrays', desc: 'The foundation for scientific computing — fast n-dimensional arrays and the matrix math every other library builds on.' },
              { title: 'Pandas', tag: 'data', desc: 'DataFrames for loading, cleaning, joining, and reshaping tabular data before it ever reaches a model.' },
              { title: 'Scikit-learn', tag: 'models', desc: 'The classic ML toolkit — a consistent fit/predict API across regression, classification, clustering, and preprocessing.' },
              { title: 'Matplotlib & SciPy', tag: 'viz + math', desc: 'Matplotlib plots the data and results; SciPy supplies optimisation, statistics, and signal-processing routines.' },
            ].map((lib, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-white">{lib.title}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-gray-500">{lib.tag}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{lib.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ------------------------------------------------------------- */}
        <motion.section variants={itemVariants} id="supervised-vs-unsupervised-learning" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Supervised vs Unsupervised</h2>
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-indigo-500/15 text-white">
                  <th className="p-4 border-b border-white/10">Feature</th>
                  <th className="p-4 border-b border-white/10 text-blue-300">Supervised</th>
                  <th className="p-4 border-b border-white/10 text-indigo-300">Unsupervised</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ['Data', 'Requires labelled data', 'No labels required'],
                  ['Goal', 'Predict a known output', 'Discover hidden structure'],
                  ['Methods', 'Classification, Regression', 'Clustering, Dim. Reduction'],
                  ['Success', 'Accuracy vs known answers', 'Useful, actionable patterns'],
                  ['Applications', 'Spam detection, forecasting', 'Segmentation, anomaly detection'],
                ].map(([f, s, u]) => (
                  <tr key={f}>
                    <td className="p-4 font-bold text-gray-200">{f}</td>
                    <td className="p-4 text-gray-400">{s}</td>
                    <td className="p-4 text-gray-400">{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ------------------------------------------------------------- */}
        <motion.section variants={itemVariants} id="typical-ml-workflow" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">The ML Workflow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WORKFLOW.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative p-4 rounded-xl border border-white/10 bg-white/5"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                    {s.n}
                  </span>
                  <h3 className="font-semibold text-white text-sm">{s.t}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed m-0">{s.d}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Steps 5–7 are usually a loop, not a line — you train, evaluate, tune, and go back around many times before
            anything gets deployed.
          </p>
        </motion.section>

        {/* ------------------------------------------------------------- */}
        <motion.section variants={itemVariants} id="common-challenges" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Common Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Overfitting', desc: 'The model memorises training noise and fails on new data. Fix with more data, regularisation, or a simpler model.' },
              { title: 'Underfitting', desc: 'The model is too simple to capture the real pattern. Fix with more features, a richer model, or less regularisation.' },
              { title: 'Data Leakage', desc: 'Information from the future or the test set sneaks into training, giving fake-great scores that collapse in production.' },
              { title: 'Imbalanced Data', desc: '99% non-fraud vs 1% fraud makes accuracy meaningless. Use resampling, class weights, and precision/recall instead.' },
            ].map((challenge, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-red-400/50 transition-all">
                <h3 className="text-xl font-semibold mb-3 text-red-400">{challenge.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{challenge.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </GuideLayout>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

const toc = [
  { label: 'Primary Types', hash: '#primary-types' },
  { label: 'Classification Details', hash: '#classification-details' },
  { label: 'Regression Techniques', hash: '#regression-techniques' },
  { label: 'Model Evaluation Metrics', hash: '#model-evaluation-metrics' },
];

export default function MlSupervised() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <GuideLayout title="Supervised Learning" intro="Models trained on labeled datasets where the output is known, aimed at finding hidden patterns." toc={toc}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
        
        <motion.section variants={itemVariants} id="primary-types" className="guide-section">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Primary Types</h2>
          <div className="guide-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="guide-card bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
              <h3 className="gc-title text-xl font-semibold mb-3 text-white">Regression</h3>
              <p className="gc-desc text-gray-400 text-sm leading-relaxed mb-4">
                Predicts a continuous value. Examples: house prices, stock trends.<br/><br/>
                <strong>Algorithms:</strong> Linear Regression, Ridge, Lasso, Polynomial.
              </p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="guide-card bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
              <h3 className="gc-title text-xl font-semibold mb-3 text-white">Classification</h3>
              <p className="gc-desc text-gray-400 text-sm leading-relaxed mb-4">
                Predicts a category label. Examples: spam detection, image classification.<br/><br/>
                <strong>Algorithms:</strong> Logistic Regression, SVM, Decision Trees, Neural Networks.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} id="classification-details" className="guide-section">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Classification Details</h2>
          <p className="text-gray-400 mb-6">Classification assigns input data to one of a finite set of discrete categories.</p>
          
          <div className="guide-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" style={{ marginTop: '20px' }}>
            <motion.div whileHover={{ y: -5 }} className="guide-card bg-[#111111] border border-white/10 p-5 rounded-xl transition-all">
              <h3 className="gc-title text-lg font-semibold mb-2 text-white">Binary Classification</h3>
              <p className="gc-desc text-gray-400 text-sm mb-2">Involves two classes.<br/><em>Ex: Spam vs Not Spam, Disease vs No Disease.</em></p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="guide-card bg-[#111111] border border-white/10 p-5 rounded-xl transition-all">
              <h3 className="gc-title text-lg font-semibold mb-2 text-white">Multi-Class Classification</h3>
              <p className="gc-desc text-gray-400 text-sm mb-2">Involves more than two classes.<br/><em>Ex: Handwritten digits (0-9), Animal types.</em></p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="guide-card bg-[#111111] border border-white/10 p-5 rounded-xl transition-all">
              <h3 className="gc-title text-lg font-semibold mb-2 text-white">Multi-Label Classification</h3>
              <p className="gc-desc text-gray-400 text-sm mb-2">An instance can belong to multiple classes at once.<br/><em>Ex: Image tagging (e.g., "beach", "sunset").</em></p>
            </motion.div>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-200" style={{ marginTop: '30px' }}>Common Classification Algorithms</h3>
          <ul className="gc-list space-y-2 text-gray-300" style={{ fontSize: '1rem' }}>
            <li><strong>Logistic Regression:</strong> Linear model for binary classification.</li>
            <li><strong>Decision Trees:</strong> Tree-like model splitting on features.</li>
            <li><strong>Random Forest:</strong> Ensemble of decision trees.</li>
            <li><strong>SVM:</strong> Finds the best separating hyperplane.</li>
            <li><strong>Naive Bayes:</strong> Probabilistic model assuming feature independence.</li>
            <li><strong>K-Nearest Neighbors (KNN):</strong> Classifies based on majority class of nearest points.</li>
            <li><strong>Neural Networks:</strong> Deep learning for complex non-linear data.</li>
            <li><strong>Gradient Boosting (XGBoost):</strong> Sequential ensemble building to reduce errors.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} id="regression-techniques" className="guide-section">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Regression Techniques</h2>
          <div className="space-y-4 mb-6">
            <div className="guide-callout bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl">
              <div className="guide-callout-title font-semibold text-indigo-300 mb-2">Simple Linear Regression</div>
              <p className="mb-3">Equation: <code className="font-mono text-sm text-gray-300 bg-black/30 p-2 rounded inline-block">y = β0 + β1x + ε</code></p>
              <ul className="text-sm text-gray-400 space-y-1 ml-4 list-disc marker:text-indigo-500" style={{ marginLeft: '20px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                <li><strong>y:</strong> Dependent variable (target)</li>
                <li><strong>x:</strong> Independent variable (feature)</li>
                <li><strong>β0:</strong> Intercept</li>
                <li><strong>β1:</strong> Slope</li>
                <li><strong>ε:</strong> Error term</li>
              </ul>
            </div>
            <div className="guide-callout bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl">
              <div className="guide-callout-title font-semibold text-indigo-300 mb-2">Multiple Linear Regression</div>
              <p className="text-sm text-gray-400">Uses multiple independent variables to predict the dependent variable.</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            <strong>Advanced Regression Algorithms:</strong> Ordinal Regression, Poisson Regression, Bayesian Linear Regression, Boosted Decision Tree Regression, Neural Network Regression.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} id="model-evaluation-metrics" className="guide-section">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Model Evaluation Metrics</h2>
          
          <div className="guide-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <motion.div whileHover={{ scale: 1.02 }} className="guide-card bg-[#111111] border border-white/10 p-6 rounded-xl">
              <h3 className="gc-title text-xl font-semibold mb-4 text-white">Training vs Out-of-Sample Accuracy</h3>
              <p className="gc-desc text-gray-400 text-sm mb-3"><strong>Training Accuracy:</strong> Model's accuracy on training data. High accuracy may indicate overfitting.<br/><br/><strong>Out-of-Sample Accuracy:</strong> Accuracy on unseen data. Helps assess generalization capability.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="guide-card bg-[#111111] border border-white/10 p-6 rounded-xl">
              <h3 className="gc-title text-xl font-semibold mb-4 text-white">Error Metrics (Regression)</h3>
              <ul className="text-gray-400 text-sm space-y-2 ml-4 list-disc marker:text-indigo-500" style={{ marginLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <li><strong>R-Squared (R²):</strong> Proportion of variance explained by the model. Higher is better.</li>
                <li><strong>MAE:</strong> Average of absolute differences between predictions and actuals.</li>
                <li><strong>MSE:</strong> Average of squared differences. Penalizes large errors.</li>
                <li><strong>RMSE:</strong> Square root of MSE. Interpretable in original units.</li>
              </ul>
            </motion.div>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-200" style={{ marginTop: '30px' }}>K-Fold Cross-Validation</h3>
          <p className="text-gray-400 mb-4" style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '20px' }}>
            Splits data into <em className="text-gray-300">k</em> subsets, trains on <em className="text-gray-300">k-1</em> subsets, validates on the remaining subset. Benefits include better data utilization and reduced overfitting.
          </p>
          
          <div className="bg-[#0d1117] border border-white/10 p-4 rounded-xl overflow-x-auto text-sm font-mono" style={{ background: '#0d1117', padding: '20px', borderRadius: '12px', fontFamily: 'var(--mono)', fontSize: '0.85rem', color: '#e2e8f0', overflowX: 'auto', border: '1px solid var(--border)' }}>
            <pre className="text-gray-300" style={{ margin: 0 }}>
              <span className="text-pink-400" style={{ color: '#c678dd' }}>from</span> sklearn.model_selection <span className="text-pink-400" style={{ color: '#c678dd' }}>import</span> KFold, cross_val_score{'\n'}
              <span className="text-pink-400" style={{ color: '#c678dd' }}>from</span> sklearn.linear_model <span className="text-pink-400" style={{ color: '#c678dd' }}>import</span> LogisticRegression{'\n'}
              <span className="text-pink-400" style={{ color: '#c678dd' }}>from</span> sklearn.datasets <span className="text-pink-400" style={{ color: '#c678dd' }}>import</span> load_iris{'\n'}
              {'\n'}
              X, y = load_iris(return_X_y=<span className="text-orange-300" style={{ color: '#d19a66' }}>True</span>){'\n'}
              model = LogisticRegression(max_iter=<span className="text-orange-300" style={{ color: '#d19a66' }}>200</span>){'\n'}
              kf = KFold(n_splits=<span className="text-orange-300" style={{ color: '#d19a66' }}>5</span>, shuffle=<span className="text-orange-300" style={{ color: '#d19a66' }}>True</span>, random_state=<span className="text-orange-300" style={{ color: '#d19a66' }}>42</span>){'\n'}
              {'\n'}
              cv_scores = cross_val_score(model, X, y, cv=kf){'\n'}
              <span className="text-blue-400" style={{ color: '#56b6c2' }}>print</span>(<span className="text-green-300" style={{ color: '#98c379' }}>{`f"Mean CV Score: {cv_scores.mean():.2f}"`}</span>)
            </pre>
          </div>
        </motion.section>

      </motion.div>
    </GuideLayout>
  );
}


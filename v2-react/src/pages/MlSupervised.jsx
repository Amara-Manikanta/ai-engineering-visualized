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
        
        <motion.section variants={itemVariants} id="primary-types">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Primary Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-white">Regression</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Predicts a continuous value. Examples: house prices, stock trends.</p>
              <p className="text-gray-300 text-sm"><strong>Algorithms:</strong> Linear Regression, Ridge, Lasso, Polynomial.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-white">Classification</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Predicts a category label. Examples: spam detection, image classification.</p>
              <p className="text-gray-300 text-sm"><strong>Algorithms:</strong> Logistic Regression, SVM, Decision Trees, Neural Networks.</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} id="classification-details">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Classification Details</h2>
          <p className="text-gray-400 mb-6">Classification assigns input data to one of a finite set of discrete categories.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Binary Classification", desc: "Involves two classes.", ex: "Spam vs Not Spam, Disease vs No Disease." },
              { title: "Multi-Class Classification", desc: "Involves more than two classes.", ex: "Handwritten digits (0-9), Animal types." },
              { title: "Multi-Label Classification", desc: "An instance can belong to multiple classes at once.", ex: "Image tagging (e.g., 'beach', 'sunset')." }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-[#111111] border border-white/10 p-5 rounded-xl transition-all">
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{item.desc}</p>
                <p className="text-gray-500 text-xs italic">Ex: {item.ex}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-200">Common Classification Algorithms</h3>
          <ul className="space-y-2 text-gray-300">
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

        <motion.section variants={itemVariants} id="regression-techniques">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Regression Techniques</h2>
          <div className="space-y-4 mb-6">
            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">Simple Linear Regression</h3>
              <p className="font-mono text-sm text-gray-300 mb-3 bg-black/30 p-2 rounded inline-block">y = β0 + β1x + ε</p>
              <ul className="text-sm text-gray-400 space-y-1 ml-4 list-disc marker:text-indigo-500">
                <li><strong>y:</strong> Dependent variable (target)</li>
                <li><strong>x:</strong> Independent variable (feature)</li>
                <li><strong>β0:</strong> Intercept</li>
                <li><strong>β1:</strong> Slope</li>
                <li><strong>ε:</strong> Error term</li>
              </ul>
            </div>
            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">Multiple Linear Regression</h3>
              <p className="text-sm text-gray-400">Uses multiple independent variables to predict the dependent variable.</p>
            </div>
          </div>
          <p className="text-sm text-gray-500"><strong>Advanced Regression Algorithms:</strong> Ordinal Regression, Poisson Regression, Bayesian Linear Regression, Boosted Decision Tree Regression, Neural Network Regression.</p>
        </motion.section>

        <motion.section variants={itemVariants} id="model-evaluation-metrics">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Model Evaluation Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Training vs Out-of-Sample Accuracy</h3>
              <p className="text-gray-400 text-sm mb-3"><strong>Training Accuracy:</strong> Model's accuracy on training data. High accuracy may indicate overfitting.</p>
              <p className="text-gray-400 text-sm"><strong>Out-of-Sample Accuracy:</strong> Accuracy on unseen data. Helps assess generalization capability.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Error Metrics (Regression)</h3>
              <ul className="text-gray-400 text-sm space-y-2 ml-4 list-disc marker:text-indigo-500">
                <li><strong>R-Squared (R²):</strong> Proportion of variance explained by the model. Higher is better.</li>
                <li><strong>MAE:</strong> Average of absolute differences between predictions and actuals.</li>
                <li><strong>MSE:</strong> Average of squared differences. Penalizes large errors.</li>
                <li><strong>RMSE:</strong> Square root of MSE. Interpretable in original units.</li>
              </ul>
            </motion.div>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-200">K-Fold Cross-Validation</h3>
          <p className="text-gray-400 mb-4">Splits data into <em className="text-gray-300">k</em> subsets, trains on <em className="text-gray-300">k-1</em> subsets, validates on the remaining subset. Benefits include better data utilization and reduced overfitting.</p>
          
          <div className="bg-[#0d1117] border border-white/10 p-4 rounded-xl overflow-x-auto text-sm font-mono">
            <pre className="text-gray-300">
              <span className="text-pink-400">from</span> sklearn.model_selection <span className="text-pink-400">import</span> KFold, cross_val_score{'\n'}
              <span className="text-pink-400">from</span> sklearn.linear_model <span className="text-pink-400">import</span> LogisticRegression{'\n'}
              <span className="text-pink-400">from</span> sklearn.datasets <span className="text-pink-400">import</span> load_iris{'\n'}
              {'\n'}
              X, y = load_iris(return_X_y=<span className="text-orange-300">True</span>){'\n'}
              model = LogisticRegression(max_iter=<span className="text-orange-300">200</span>){'\n'}
              kf = KFold(n_splits=<span className="text-orange-300">5</span>, shuffle=<span className="text-orange-300">True</span>, random_state=<span className="text-orange-300">42</span>){'\n'}
              {'\n'}
              cv_scores = cross_val_score(model, X, y, cv=kf){'\n'}
              <span className="text-blue-400">print</span>(<span className="text-green-300">f"Mean CV Score: {'{cv_scores.mean():.2f}'}"</span>)
            </pre>
          </div>
        </motion.section>

      </motion.div>
    </GuideLayout>
  );
}

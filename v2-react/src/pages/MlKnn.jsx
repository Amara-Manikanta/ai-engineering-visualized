import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";

export default function MlKnn() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [k, setK] = useState(3);
  const [prediction, setPrediction] = useState({ text: "Click canvas", color: "text-gray-400" });
  
  const [points, setPoints] = useState([]);
  const [userPoint, setUserPoint] = useState(null);

  useEffect(() => {
    // Generate initial points
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    const count = 120;
    const newPoints = [];
    for (let i = 0; i < count; i++) {
      const isRed = i < count / 2;
      const cx = isRed ? width * 0.3 : width * 0.7;
      const cy = isRed ? height * 0.3 : height * 0.7;
      const rx = (Math.random() + Math.random() + Math.random() - 1.5) * (width * 0.4);
      const ry = (Math.random() + Math.random() + Math.random() - 1.5) * (height * 0.4);
      
      newPoints.push({
        x: Math.max(10, Math.min(width - 10, cx + rx)),
        y: Math.max(10, Math.min(height - 10, cy + ry)),
        class: isRed ? 'red' : 'blue'
      });
    }
    setPoints(newPoints);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || points.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    // Draw existing points
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = p.class === 'red' ? '#f43f5e' : '#3b82f6';
      ctx.fill();
    });

    if (userPoint) {
      // Calculate distances
      const distances = points.map(p => {
        const dx = p.x - userPoint.x;
        const dy = p.y - userPoint.y;
        return { p, dist: Math.sqrt(dx*dx + dy*dy) };
      });
      
      distances.sort((a, b) => a.dist - b.dist);
      const nearest = distances.slice(0, k);
      
      // Draw radius circle
      if (nearest.length > 0) {
        const radius = nearest[nearest.length - 1].dist;
        ctx.beginPath();
        ctx.arc(userPoint.x, userPoint.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw lines to nearest
      let redCount = 0;
      let blueCount = 0;

      nearest.forEach(n => {
        ctx.beginPath();
        ctx.moveTo(userPoint.x, userPoint.y);
        ctx.lineTo(n.p.x, n.p.y);
        ctx.strokeStyle = n.p.class === 'red' ? 'rgba(244,63,94,0.4)' : 'rgba(59,130,246,0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (n.p.class === 'red') redCount++;
        else blueCount++;
      });

      // Draw User Point (Star)
      drawStar(ctx, userPoint.x, userPoint.y, 5, 12, 6);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Update Prediction
      if (redCount > blueCount) {
        setPrediction({ text: `Red Class (${redCount} vs ${blueCount})`, color: 'text-rose-400' });
      } else if (blueCount > redCount) {
        setPrediction({ text: `Blue Class (${blueCount} vs ${redCount})`, color: 'text-blue-400' });
      } else {
        setPrediction({ text: `Tie (${redCount} vs ${blueCount})`, color: 'text-gray-400' });
      }
    } else {
      setPrediction({ text: 'Click canvas', color: 'text-gray-400' });
    }
  }, [points, userPoint, k]);

  const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y)
      rot += step
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y)
      rot += step
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setUserPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <GuideLayout
      title="K-Nearest Neighbors (KNN)"
      intro="An instance-based learning algorithm that memorizes training data and makes predictions by comparing new data points to stored instances."
      toc={[]}
    >
      <section className="guide-section mb-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Interactive KNN Animation</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Click anywhere on the canvas below to place a <strong>new data point</strong> (marked as a star). Use the slider to adjust <strong>K</strong> (the number of neighbors to consider). The algorithm calculates the Euclidean distance, draws a radius encompassing the K closest neighbors, and assigns a class based on majority voting!
        </p>
        
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 flex flex-col items-center">
          <div 
            ref={containerRef} 
            className="relative w-full max-w-[600px] aspect-square bg-[#0f111a] rounded-xl overflow-hidden cursor-crosshair border border-white/10"
          >
            <canvas 
              ref={canvasRef} 
              className="absolute top-0 left-0 w-full h-full"
              onClick={handleCanvasClick}
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6 w-full max-w-[600px] justify-between">
            <div className="flex items-center gap-4 flex-grow w-full">
              <label htmlFor="k-slider" className="font-bold text-gray-200 whitespace-nowrap">K = <span>{k}</span></label>
              <input 
                type="range" 
                id="k-slider" 
                min="1" 
                max="15" 
                step="2" 
                value={k} 
                onChange={(e) => setK(parseInt(e.target.value))}
                className="flex-grow accent-indigo-500"
              />
            </div>
            <div className="bg-indigo-900/20 border border-indigo-500/30 px-5 py-3 rounded-lg font-bold min-w-[200px] text-center text-gray-300 whitespace-nowrap">
              Prediction: <span className={prediction.color}>{prediction.text}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="guide-section mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Key Concepts of KNN</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300 text-lg">
          <li><strong className="text-white">Instance-Based Learning:</strong> KNN doesn't explicitly train a mathematical model. It simply stores the training dataset and performs computation at prediction time.</li>
          <li><strong className="text-white">Parameter K:</strong> The number of nearest neighbors to look at. A smaller K can be noisy and susceptible to outliers, while a larger K provides a smoother decision boundary.</li>
        </ul>

        <h3 className="text-xl font-bold mt-10 mb-4 text-gray-100">Distance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -5 }} className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Euclidean Distance</h3>
            <p className="text-gray-400 text-sm mb-3">Straight-line distance between two points.</p>
            <code className="text-indigo-300 text-sm bg-black/40 px-2 py-1 rounded">√[ Σ(xᵢ - yᵢ)² ]</code>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Manhattan Distance</h3>
            <p className="text-gray-400 text-sm mb-3">Sum of absolute differences across dimensions.</p>
            <code className="text-indigo-300 text-sm bg-black/40 px-2 py-1 rounded">Σ|xᵢ - yᵢ|</code>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Minkowski Distance</h3>
            <p className="text-gray-400 text-sm">A generalized form of Euclidean and Manhattan distances parameterized by p.</p>
          </motion.div>
        </div>
      </section>

      <section className="guide-section mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">How KNN Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-4">For Classification</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-400 text-sm">
              <li>Store training data.</li>
              <li>For a new point, calculate distance to all training points.</li>
              <li>Select the <strong className="text-white">K</strong> closest points.</li>
              <li>Assign the <strong className="text-white">most common class</strong> (majority vote) among those neighbors.</li>
            </ol>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">For Regression</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-400 text-sm">
              <li>Store training data.</li>
              <li>For a new point, calculate distance to all training points.</li>
              <li>Select the <strong className="text-white">K</strong> closest points.</li>
              <li>Predict the value as the <strong className="text-white">average</strong> of the values of those neighbors.</li>
            </ol>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}

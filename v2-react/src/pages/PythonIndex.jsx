import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';
import { Code2, Database, Globe, LineChart, Cpu, Sigma, Search, Box } from 'lucide-react';

const PythonLibrariesCheatSheet = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredLib, setHoveredLib] = useState(null);

  const rings = [
    {
      id: 'inner-top',
      name: 'Database Operations',
      icon: <Database size={14} />,
      radius: 140,
      color: 'border-blue-500 text-blue-400 bg-blue-500/10',
      nodes: ['Kafka', 'Ray', 'Hadoop', 'Dask', 'Koalas'],
      angleStart: 160,
      angleEnd: 20
    },
    {
      id: 'inner-bottom',
      name: 'Web Scraping',
      icon: <Globe size={14} />,
      radius: 140,
      color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
      nodes: ['Beautiful Soup', 'Scrapy', 'Octoparse', 'Selenium'],
      angleStart: 200,
      angleEnd: 340
    },
    {
      id: 'mid-top',
      name: 'Data Visualization',
      icon: <LineChart size={14} />,
      radius: 230,
      color: 'border-teal-500 text-teal-400 bg-teal-500/10',
      nodes: ['Pygal', 'Altair', 'Bokeh', 'Seaborn', 'Matplotlib', 'Geoplotlib', 'Folium'],
      angleStart: 170,
      angleEnd: 10
    },
    {
      id: 'mid-bottom',
      name: 'Data Manipulation',
      icon: <Box size={14} />,
      radius: 230,
      color: 'border-sky-500 text-sky-400 bg-sky-500/10',
      nodes: ['Vaex', 'NumPy', 'Pandas', 'Datatable', 'Polars', 'CuPy'],
      angleStart: 190,
      angleEnd: 350
    },
    {
      id: 'outer-top',
      name: 'Machine Learning',
      icon: <Cpu size={14} />,
      radius: 320,
      color: 'border-indigo-500 text-indigo-400 bg-indigo-500/10',
      nodes: ['Tensorflow', 'Pytorch', 'Keras', 'Theano', 'XGBoost', 'Scikit-learn', 'JAX'],
      angleStart: 175,
      angleEnd: 5
    },
    {
      id: 'outer-bottom',
      name: 'Statistical Analysis',
      icon: <Sigma size={14} />,
      radius: 320,
      color: 'border-purple-500 text-purple-400 bg-purple-500/10',
      nodes: ['PyStan', 'Lifelines', 'SciPy', 'PyMC3', 'Pingouin', 'Statsmodels'],
      angleStart: 185,
      angleEnd: 355
    }
  ];

  // Helper to calculate coordinates
  const getCoordinates = (radius, angleDeg) => {
    // Math.sin and Math.cos expect radians
    // 0 deg is right (3 o'clock). We map normally, but Y is flipped in SVG/CSS
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: -radius * Math.sin(rad) // negative because top is 0 in CSS
    };
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center py-10">
      <h2 className="text-4xl font-black mb-2 text-white text-center">Python Libraries</h2>
      <h3 className="text-2xl font-bold mb-10 text-indigo-400 text-center">CheatSheet</h3>

      <div className="relative flex items-center justify-center w-full max-w-[800px] aspect-square rounded-full border border-gray-800/50 bg-[#0a0a0a]">
        
        {/* Draw subtle concentric rings */}
        <div className="absolute w-[280px] h-[280px] rounded-full border border-gray-800/60 z-0"></div>
        <div className="absolute w-[460px] h-[460px] rounded-full border border-gray-800/60 z-0"></div>
        <div className="absolute w-[640px] h-[640px] rounded-full border border-gray-800/60 z-0"></div>

        {/* Center Logo */}
        <motion.div 
          className="absolute z-50 w-24 h-24 bg-[#111] rounded-full border-4 border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Code2 size={40} className="text-indigo-400" />
        </motion.div>

        {rings.map((ring, rIdx) => {
          const isTop = ring.angleEnd < 180;
          return (
            <div key={ring.id} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              
              {/* Category Label */}
              <motion.div 
                className={`absolute px-4 py-1.5 rounded-full border ${ring.color} flex items-center gap-2 backdrop-blur-md font-bold text-xs pointer-events-auto shadow-lg transition-all z-20 cursor-default`}
                style={{
                  top: isTop ? `calc(50% - ${ring.radius}px - 14px)` : `calc(50% + ${ring.radius}px - 14px)`,
                }}
                onMouseEnter={() => setHoveredCategory(ring.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                animate={{
                  scale: hoveredCategory === ring.id ? 1.1 : 1,
                  opacity: (hoveredCategory && hoveredCategory !== ring.id) ? 0.4 : 1
                }}
              >
                {ring.icon} {ring.name}
              </motion.div>

              {/* Nodes */}
              {ring.nodes.map((node, i) => {
                const totalNodes = ring.nodes.length;
                const angleStep = totalNodes > 1 ? (ring.angleEnd - ring.angleStart) / (totalNodes - 1) : 0;
                const currentAngle = ring.angleStart + (angleStep * i);
                const pos = getCoordinates(ring.radius, currentAngle);

                const isHovered = hoveredLib === node;
                const categoryHovered = hoveredCategory === ring.id;
                const anyHovered = hoveredLib !== null || hoveredCategory !== null;
                const isActive = isHovered || categoryHovered;
                const opacity = (!anyHovered || isActive) ? 1 : 0.3;

                return (
                  <motion.div
                    key={node}
                    className="absolute flex flex-col items-center justify-center gap-1 pointer-events-auto cursor-pointer z-30"
                    style={{ x: pos.x, y: pos.y }}
                    onMouseEnter={() => { setHoveredLib(node); setHoveredCategory(ring.id); }}
                    onMouseLeave={() => { setHoveredLib(null); setHoveredCategory(null); }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity, scale: isHovered ? 1.2 : 1 }}
                    transition={{ delay: rIdx * 0.1 + i * 0.02, type: 'spring' }}
                  >
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-lg transition-colors bg-[#1a1a1a] ${isActive ? ring.color : 'border-gray-700 text-gray-400'}`}>
                       <Search size={14} className={isActive ? 'opacity-100' : 'opacity-0'} />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${isActive ? 'bg-[#222] text-white border border-[#444]' : 'text-gray-400 drop-shadow-md'}`}>
                      {node}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function PythonIndex() {
  const toc = [
    { label: "Libraries CheatSheet", hash: "#libraries" }
  ];

  return (
    <GuideLayout
      title="Python for ML"
      intro="The ultimate ecosystem for AI engineering and data science."
      toc={toc}
    >
      <section id="libraries">
        <PythonLibrariesCheatSheet />
      </section>
    </GuideLayout>
  );
}

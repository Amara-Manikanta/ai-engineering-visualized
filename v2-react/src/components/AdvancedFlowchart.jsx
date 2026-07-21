import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AdvancedFlowchart
 * 
 * Renders complex node-and-edge diagrams using absolute positioned HTML nodes 
 * and an underlying SVG layer for connecting lines.
 * 
 * Props:
 * - nodes: Array of { id, label, x, y, width, height, type (default, diamond, circle, db), color, icon, content }
 * - edges: Array of { source, target, type (straight, curved, custom), path (for custom), color, animated (boolean), delay }
 * - step: Current step in the animation (nodes/edges can have `step` property to show only after a step)
 */
export default function AdvancedFlowchart({ nodes, edges, currentStep = 0 }) {
  
  // Calculate SVG bounding box based on nodes
  const maxX = Math.max(...nodes.map(n => (n.x || 0) + (n.width || 100)), 600);
  const maxY = Math.max(...nodes.map(n => (n.y || 0) + (n.height || 50)), 400);

  // Helper to find node coordinates
  const getNodeCenter = (id) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return { x: 0, y: 0 };
    return {
      x: (node.x || 0) + (node.width || 100) / 2,
      y: (node.y || 0) + (node.height || 50) / 2
    };
  };

  const getEdgePath = (edge) => {
    if (edge.path) return edge.path; // custom SVG path

    const source = getNodeCenter(edge.source);
    const target = getNodeCenter(edge.target);

    if (edge.type === 'straight') {
      return `M ${source.x} ${source.y} L ${target.x} ${target.y}`;
    }
    
    // Default: Curved (Bezier) horizontal
    const controlX = (source.x + target.x) / 2;
    return `M ${source.x} ${source.y} C ${controlX} ${source.y}, ${controlX} ${target.y}, ${target.x} ${target.y}`;
  };

  return (
    <div className="relative w-full overflow-x-auto bg-[#111] border border-gray-800 rounded-xl my-6 custom-scrollbar" style={{ minHeight: `${maxY + 40}px` }}>
      <div className="relative" style={{ width: `${maxX + 40}px`, height: `${maxY + 40}px` }}>
        
        {/* SVG Layer for Edges */}
        <svg className="absolute inset-0 pointer-events-none" width={maxX + 40} height={maxY + 40} style={{ zIndex: 0 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
            </marker>
            <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#818CF8" />
            </marker>
          </defs>
          
          {edges.map((edge, i) => {
            const isVisible = edge.step === undefined || currentStep >= edge.step;
            const pathData = getEdgePath(edge);
            const color = edge.color || (edge.animated && isVisible ? '#818CF8' : '#374151');
            const strokeWidth = edge.width || 2;
            const marker = (edge.animated && isVisible) ? 'url(#arrowhead-active)' : 'url(#arrowhead)';

            return (
              <g key={`edge-${i}`} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.4s' }}>
                <path
                  d={pathData}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={edge.dashed ? "5,5" : "none"}
                  markerEnd={marker}
                />
                
                {/* Animated Packet */}
                {edge.animated && isVisible && (
                  <motion.circle
                    r="4"
                    fill="#C7D2FE"
                    style={{ offsetPath: `path("${pathData}")`, offsetDistance: "0%" }}
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{
                      duration: edge.duration || 1.5,
                      delay: edge.delay || 0,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* HTML Layer for Nodes */}
        {nodes.map((node) => {
          const isVisible = node.step === undefined || currentStep >= node.step;
          const w = node.width || 100;
          const h = node.height || 50;
          
          let nodeClass = "absolute flex flex-col items-center justify-center text-center p-2 shadow-lg ";
          
          if (node.type === 'diamond') {
            nodeClass += "bg-yellow-900/30 border border-yellow-500/50 text-yellow-200 rotate-45";
          } else if (node.type === 'db') {
            nodeClass += "bg-emerald-900/40 border border-emerald-500/50 text-emerald-200 rounded-lg shadow-[0_8px_0_rgba(16,185,129,0.2)]";
          } else if (node.type === 'circle') {
            nodeClass += "bg-indigo-900/40 border border-indigo-500/50 text-indigo-200 rounded-full";
          } else if (node.type === 'agent') {
            nodeClass += "bg-purple-900/40 border border-purple-500/50 text-purple-200 rounded-xl";
          } else {
            // Default rectangle
            nodeClass += "bg-gray-800 border border-gray-600 text-gray-200 rounded-md";
          }

          if (node.className) nodeClass += ` ${node.className}`;

          return (
            <motion.div
              key={node.id}
              className={nodeClass}
              style={{
                left: node.x,
                top: node.y,
                width: w,
                height: h,
                zIndex: 10,
                color: node.color || undefined,
                background: node.bg || undefined,
                borderColor: node.borderColor || undefined,
              }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {/* If diamond, undo rotation for content */}
              <div className={node.type === 'diamond' ? '-rotate-45 flex flex-col items-center justify-center w-[141%] h-[141%]' : 'w-full h-full flex flex-col items-center justify-center'}>
                {node.icon && <span className="text-xl mb-1">{node.icon}</span>}
                <span className="text-xs sm:text-sm font-semibold whitespace-pre-line leading-tight">{node.label}</span>
                {node.content && <span className="text-[9px] text-gray-400 mt-1 leading-tight">{node.content}</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

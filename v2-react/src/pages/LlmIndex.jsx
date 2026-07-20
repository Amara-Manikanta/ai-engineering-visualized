import React from "react";
import { motion } from "framer-motion";
import GuideLayout from "../components/GuideLayout";
import { Link } from "react-router-dom";

export default function LlmIndex() {
  const models = [
    {
      id: "llm",
      tag: "LLM",
      name: "Large Language Model",
      desc: <>The foundation of modern AI. Trained on massive text datasets to predict the next token. Powers ChatGPT, Claude, Gemini, and Llama.</>,
      examples: ["GPT-4", "Claude", "Gemini", "Llama"],
      color: "from-indigo-500/20 to-indigo-900/20 border-indigo-500/30",
      tagColor: "bg-indigo-500/20 text-indigo-300",
      flow: ["📝 Input", "🔤 Tokenization", "🔢 Embedding", "⚙️ Transformer", "💬 Output"],
      link: "/llms/llm-type" // Adjust link as per router later
    },
    {
      id: "lcm",
      tag: "LCM",
      name: "Large Concept Model",
      desc: <>Meta's concept-level model. Operates on <strong>semantic concepts</strong> rather than tokens. Uses SONAR embeddings and a diffusion process — language-agnostic reasoning.</>,
      examples: ["Meta LCM", "SONAR"],
      color: "from-cyan-500/20 to-cyan-900/20 border-cyan-500/30",
      tagColor: "bg-cyan-500/20 text-cyan-300",
      flow: ["📝 Input", "✂️ Sentence Segmentation", "🔭 SONAR Embedding", "🌊 Diffusion", "💬 Output"],
      link: "/llms/lcm-type"
    },
    {
      id: "lam",
      tag: "LAM",
      name: "Large Action Model",
      desc: <>Designed to <strong>take actions</strong> in the world — browse the web, click buttons, run code. Built for agentic tasks, not just conversation. Powers computer-use AI.</>,
      examples: ["Rabbit R1", "Claude Computer Use"],
      color: "from-orange-500/20 to-orange-900/20 border-orange-500/30",
      tagColor: "bg-orange-500/20 text-orange-300",
      flow: ["📝 Input Processing", "👁️ Perception System", "🎯 Intent Recognition", "📋 Task Breakdown", "📅 Action Planning", "⚡ Feedback Integration"],
      link: "/llms/lam-type"
    },
    {
      id: "moe",
      tag: "MoE",
      name: "Mixture of Experts",
      desc: <>Uses a <strong>router</strong> to activate only a few specialist sub-networks per token. Massive model capacity with lower compute cost. Used in GPT-4, Mixtral, and Gemini.</>,
      examples: ["GPT-4", "Mixtral 8x7B", "Gemini"],
      color: "from-purple-500/20 to-purple-900/20 border-purple-500/30",
      tagColor: "bg-purple-500/20 text-purple-300",
      flow: ["📝 Input", "🔀 Router Mechanism", "🧑‍💼 Experts", "🔝 Top-K Selection", "⚖️ Weighted Combination", "💬 Output"],
      link: "/llms/moe-type"
    },
    {
      id: "vlm",
      tag: "VLM",
      name: "Vision Language Model",
      desc: <>Understands both <strong>images and text</strong> together. Can answer questions about images, generate captions, perform visual reasoning, and analyze charts.</>,
      examples: ["GPT-4o", "LLaVA", "Gemini Pro Vision"],
      color: "from-green-500/20 to-green-900/20 border-green-500/30",
      tagColor: "bg-green-500/20 text-green-300",
      flow: ["🖼️ Image & 📝 Text", "👁️ Vision & 🔤 Text Encoders", "🔗 Projection Interface", "🧠 Multimodal Processor", "💬 Output"],
      link: "/llms/vlm-type"
    },
    {
      id: "slm",
      tag: "SLM",
      name: "Small Language Model",
      desc: <>Compact, efficient LLMs that run <strong>on-device</strong> — phones, laptops, edge hardware. Sacrifices some capability for privacy, speed, and offline operation.</>,
      examples: ["Phi-3", "Gemma 2B", "Llama 3.2 1B"],
      color: "from-yellow-500/20 to-yellow-900/20 border-yellow-500/30",
      tagColor: "bg-yellow-500/20 text-yellow-300",
      flow: ["📝 Input Processing", "📦 Compact Tokenization", "⚡ Efficient Transformer", "📉 Quantization", "📱 Edge Deployment", "💬 Output"],
      link: "/llms/slm-type"
    },
    {
      id: "mlm",
      tag: "MLM",
      name: "Masked Language Model",
      desc: <>Trained by masking words and predicting them using <strong>both left and right context</strong>. Not for generation — for understanding. Powers NER, classification, and embeddings.</>,
      examples: ["BERT", "RoBERTa", "DeBERTa"],
      color: "from-pink-500/20 to-pink-900/20 border-pink-500/30",
      tagColor: "bg-pink-500/20 text-pink-300",
      flow: ["📝 Text Input", "🎭 Token Masking", "🔢 Embedding Layer", "⬅️ Context ➡️", "🔄 Bidirectional Attention", "🎯 Feature Representation"]
    },
    {
      id: "sam",
      tag: "SAM",
      name: "Segment Anything Model",
      desc: <>Meta's foundation model for <strong>image segmentation</strong>. Given any prompt (point, box, or text), it can precisely segment any object in any image — zero-shot.</>,
      examples: ["SAM 2", "Meta AI"],
      color: "from-red-500/20 to-red-900/20 border-red-500/30",
      tagColor: "bg-red-500/20 text-red-300",
      flow: ["💬 Prompt & 🖼️ Image", "🔤 Prompt & 👁️ Image Encoders", "🔗 Image Embedding", "🎭 Mask Decoder", "✂️ Segmentation Output"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <GuideLayout
      title="🧠 8 Specialized AI Model Architectures"
      intro="Not all AI models are the same. Each architecture is purpose-built for a specific task — from text generation to image segmentation to action planning."
      toc={[]}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
      >
        {models.map((model) => (
          <motion.div
            key={model.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`flex flex-col bg-gradient-to-br ${model.color} border rounded-xl p-6 shadow-lg backdrop-blur-sm`}
          >
            {model.link ? (
              <Link to={model.link} className="flex-1 flex flex-col no-underline text-gray-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${model.tagColor}`}>
                    {model.tag}
                  </span>
                  <h3 className="text-xl font-semibold m-0 text-white">{model.name}</h3>
                </div>
                
                <div className="flex flex-col gap-2 mb-6 bg-black/30 rounded-lg p-4 flex-1">
                  {model.flow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="text-sm font-medium text-center text-gray-200">
                        {step}
                      </div>
                      {idx < model.flow.length - 1 && (
                        <div className="text-center text-gray-500 text-xs">↓</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <p className="text-sm text-gray-400 mb-4">{model.desc}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {model.examples.map((ex, idx) => (
                    <span key={idx} className="bg-black/40 px-2 py-1 rounded text-xs text-gray-300">
                      {ex}
                    </span>
                  ))}
                </div>
              </Link>
            ) : (
              <div className="flex-1 flex flex-col text-gray-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${model.tagColor}`}>
                    {model.tag}
                  </span>
                  <h3 className="text-xl font-semibold m-0 text-white">{model.name}</h3>
                </div>
                
                <div className="flex flex-col gap-2 mb-6 bg-black/30 rounded-lg p-4 flex-1">
                  {model.flow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="text-sm font-medium text-center text-gray-200">
                        {step}
                      </div>
                      {idx < model.flow.length - 1 && (
                        <div className="text-center text-gray-500 text-xs">↓</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <p className="text-sm text-gray-400 mb-4">{model.desc}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {model.examples.map((ex, idx) => (
                    <span key={idx} className="bg-black/40 px-2 py-1 rounded text-xs text-gray-300">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </GuideLayout>
  );
}

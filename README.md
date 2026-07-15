# AI Engineering Visualized 🤖

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-6366f1?style=for-the-badge&logo=github)](https://Amara-Manikanta.github.io/ai-engineering-visualized)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A **beautiful, interactive, step-by-step animated explainer** for modern AI Engineering concepts. Built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies. 

Explore comprehensive guides on the full RAG pipeline, Model Context Protocol (MCP), AI Agents, LangGraph, Embeddings, LLM Inference, Prompting, and more!

## 🌟 Features

- 🎬 **Multi-page architecture** covering 9 distinct AI engineering pillars.
- 🔄 **Custom `StepAnimator` Engine** — step-by-step interactive animations for complex data flows (RAG, MCP, LangGraph cycles).
- 🧮 **Interactive Playgrounds** — like the real-time Cosine Similarity Calculator on the Embeddings page.
- 📝 **Detailed guides** explaining architecture, formulas, hyperparameters, and best practices.
- 🎨 **Dark mode glassmorphism** design with glowing effects, beautiful gradients, and sleek layouts.
- 📱 **Fully responsive** — works on mobile, tablet, and desktop.

## 🏗️ Deep Dives Included

### 🔍 RAG (Retrieval-Augmented Generation)
- **Indexing & Chunking**: Document parsing, semantic chunking strategies, and vector DB insertion.
- **Retrieval & Generation**: Semantic search, context augmentation, and grounded LLM responses.

### 🔌 Model Context Protocol (MCP)
- Visualizing how LLMs securely execute local tools (search, database queries, code running) via JSON-RPC.

### 🧠 Agents & LangGraph
- **AI Agents**: Tool use, reasoning, and planning.
- **LangGraph**: State management, Nodes, Edges, Conditional branches, and infinite execution cycles.

### 🧲 Embeddings & Vector Math
- What is an embedding?
- Similarity metrics: Cosine Similarity, Euclidean Distance, and Dot Product.
- Top embedding models comparison (Dimensions, Context length, Accuracy).

### 🚀 LLM Inference
- Pre-filling vs. Decoding.
- KV Caching optimizations and Tokenization.

### 🤖 LLMs, Prompting & Claude
- Comparison of top open-source and proprietary models (OpenAI, Anthropic, Llama, DeepSeek).
- Prompt engineering best practices.
- Claude Code specific features and workflows.

## 🚀 Deploy to GitHub Pages

1. Go to your repository settings on GitHub
2. Select **Pages** from the left sidebar
3. Under Build and deployment, set **Source** to "Deploy from a branch"
4. Select the **main** branch and **/ (root)** folder
5. Click **Save**. Your interactive guide is live!

## 📂 Project Structure

```
ai-engineering-visualized/
├── index.html              # Home Page (Global Navigation Hub)
├── script.js               # Global Animation engine & interactive logic
├── styles.css              # Global Design system and core UI classes
├── agents/                 # AI Agents Deep Dive
├── claude/                 # Claude Features & Workflows
├── embeddings/             # Embeddings & Semantic Search (+ Calculator)
├── langgraph/              # LangGraph Architecture & Patterns
├── llm-inference/          # Inference optimization (KV Cache, etc.)
├── llms/                   # Popular AI Models comparison
├── mcp/                    # Model Context Protocol Pipeline
├── prompting/              # Prompt Engineering Best Practices
├── rag/                    # Complete RAG Pipeline (Indexing, Retrieval, Gen)
└── README.md               # This file
```

---

Built with ❤️ by Amara Manikanta Dileep — © 2026 AI Engineering Visualized

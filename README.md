# AI Engineering Visualized 🤖

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-6366f1?style=for-the-badge&logo=github)](https://Amara-Manikanta.github.io/ai-engineering-visualized)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-f1356d?style=for-the-badge&logo=framer&logoColor=white)

A **beautiful, interactive, step-by-step animated educational platform** for modern AI Engineering, Machine Learning, and Cloud Architecture.

This repository hosts two versions:
1. 🌐 **Modern React SPA (v2)**: Located in the [`v2-react/`](file:///Users/manikantaamara/.gemini/antigravity/scratch/rag-explainer/v2-react) directory. Built with React 19, Vite 8, Tailwind CSS v4, Framer Motion animations, and React Router v7. This is the live production app.
2. 📄 **Legacy Static Web App**: Located in the root directory. Built with vanilla HTML5, CSS3, and JavaScript.

---

## 🌟 Key Features

- 🎬 **Custom `StepAnimator` & SVG Flowcharts**: Step-by-step interactive animations for complex data flows like RAG loops, MCP client-server negotiation, and LangGraph cycles.
- 🧮 **Interactive Math Playgrounds**: Real-time calculators (e.g., Cosine Similarity Calculator) and interactive chunk size estimators.
- 🎨 **Premium Glassmorphism Design**: Tailored CSS gradients, dark mode aesthetics, glow effects, responsive sidebar navigation, and elegant micro-animations.
- 📱 **Mobile Responsive Navigation**: A custom hamburger drawer and collapsible sidebar menu optimized for mobile and desktop screens.

---

## 🏗️ Deep Dives & Modules Covered

### 🔍 RAG (Retrieval-Augmented Generation)
- **RAG Fundamentals**: Naive RAG, Advanced RAG, Hybrid RAG, Agentic RAG, Self RAG, Graph RAG, Multimodal RAG, and more.
- **Data Prep & Chunking**: Document loaders, tokenization, slide window chunking, and semantic split strategies.
- **Vector Databases**: Dimension analysis, index types (Flat, HNSW, IVF), and cosine similarity calculators.

### 🐍 Python Master Guide (61 Granular Sub-Topics)
Comprehensive multi-sentence guides and visual diagrams covering:
1. **Python Foundations**: Execution flows, memory pointer visual model, and interpreter environment.
2. **Data Structures**: Lists, dicts, LLM API message format schemas (role, content, tool_calls), and prompt engineering string methods.
3. **Advanced AI Patterns**: Custom `SimpleRetriever` implementation, 7 core RAG OOP abstractions, FastAPI Type Hints, and Dataclasses.
4. **Tooling & Async**: Production directory structures, package imports, `venv` isolation, and `asyncio` task event loops.
5. **Data Science Core**: NumPy vectorization, Pandas DataFrames, and Scikit-Learn pipelines.

### 🔌 Model Context Protocol (MCP)
- Complete protocol explainer showing how LLMs securely connect to local or remote server tools (databases, filesystems, terminals) over JSON-RPC.

### 🤖 LLM Models Index (19 Critical Pillars)
- Foundation vs. Fine-tuned models, open vs. closed models, MoE (Mixture of Experts) vs. Dense architectures.
- Detailed guides for Model Selection (context windows, cost, latency), local setup (`ollama`), and evaluation benchmarks.
- Dedicated model cards for Mistral, Qwen, DeepSeek, GPT-4, Gemini, and Llama.

### 🧠 Agents & LangGraph
- **AI Agents**: Memory systems, tool-calling loops, planning, and execution strategies.
- **LangGraph**: Directed Acyclic Graphs (DAGs), state management, cyclic execution paths, and agent teamwork.

### ☁️ Cloud Services (AWS & Azure Navigation)
- Accessible through a unified top-level **Cloud** dropdown menu.
- **Azure Guide**: Identity (Entra ID), networking, load balancers, AKS (Kubernetes), App Services, and architecture blueprints.
- **AWS Guide**: IAM, VPC networking, EC2 computing, S3 storage, Route 53, and global infrastructure.

---

## 🚀 Local Development (React Version)

To run the modern React application locally:

```bash
# 1. Navigate to the React app directory
cd v2-react

# 2. Install dependencies
npm install

# 3. Start the Vite local development server
npm run dev

# 4. Build the static production bundle
npm run build
```

The production build output will compile into the static assets folder ready for fast hosting.

---

## 🛠️ Deployment to GitHub Pages

The repository uses automated deployment to GitHub Pages:
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment**, set **Source** to "Deploy from a branch".
3. Choose the **main** branch and set the folder path to `/` (root), then click **Save**.
4. The deployment pipeline will host the compiled static assets.

---

Built with ❤️ by Amara Manikanta Dileep — © 2026 AI Engineering Visualized

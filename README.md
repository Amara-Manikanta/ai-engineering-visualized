# AI Engineering Visualized 🤖

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-6366f1?style=for-the-badge&logo=github)](https://Amara-Manikanta.github.io/ai-engineering-visualized)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A **beautiful, interactive, step-by-step animated explainer** for modern AI Engineering concepts, including the full RAG (Retrieval-Augmented Generation) pipeline, the Model Context Protocol (MCP), and Claude Code features. Built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies.

## 🌟 Features

- 🎬 **Multi-tab architecture** separating key AI concepts
- 🔄 **Step-by-step animations** for all 4 RAG stages and MCP
- 📝 **Detailed notes** with code examples for every concept
- 🚀 **Live demo** — watch the full RAG pipeline run end-to-end
- 🎨 **Dark mode glassmorphism** design with glowing effects
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- ✂️ **Chunking Techniques** — Visual breakdown of 6 chunking strategies
- 🛠️ **Claude Features Grid** — 12 essential workflows for AI coding assistants

## 🏗️ Pipeline Stages Covered

### RAG Pipeline
| Stage | What Happens |
|-------|-------------|
| 📁 **Indexing** | Parse documents → Chunk text → Generate embeddings → Store in Milvus |
| 🔍 **Retrieval (R)** | Encode query → Semantic search → Return top-K relevant chunks |
| ⚙️ **Augmented (A)** | Combine chunks + query → Build structured prompt |
| 💬 **Generate (G)** | Feed prompt to LLM → Stream grounded response |

### MCP Pipeline
| Stage | What Happens |
|-------|-------------|
| 🗣️ **User Prompt** | User asks a question requiring external data |
| 🧠 **LLM Reasoning** | Claude generates a JSON tool call |
| 🔌 **MCP Client** | Host app routes the JSON-RPC call |
| 🖥️ **MCP Server** | Server executes the local tool securely |
| 💾 **Data Return** | Database/API results flow back to the LLM |

## 🚀 Deploy to GitHub Pages

1. Go to your repository settings on GitHub
2. Select **Pages** from the left sidebar
3. Under Build and deployment, set **Source** to "Deploy from a branch"
4. Select the **main** branch and **/ (root)** folder
5. Click **Save**. Your interactive guide is live!

## 📂 Project Structure

```
ai-engineering-visualized/
├── index.html      # Main HTML — multi-tab layout and all content
├── styles.css      # Full design system, animations, responsive grid
├── script.js       # Animation engine (StepAnimator), tab switching
└── README.md       # This file
```

---

Built with ❤️ — © 2026 AI Engineering Visualized

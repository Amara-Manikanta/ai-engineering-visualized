import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DocumentLoaders from "./pages/DocumentLoaders";
import Langchain from "./pages/Langchain";
import RagFundamentals from "./pages/RagFundamentals";
import RagVectorDbs from "./pages/RagVectorDbs";
import RagAdvanced from "./pages/RagAdvanced";
import LlmIndex from "./pages/LlmIndex";
import LlmType from "./pages/LlmType";
import LlmVlm from "./pages/LlmVlm";
import LlmSlm from "./pages/LlmSlm";
import GenAiIndex from "./pages/GenAiIndex";
import GenAiFineTuning from "./pages/GenAiFineTuning";
import GenAiQuantization from "./pages/GenAiQuantization";
import MlIndex from "./pages/MlIndex";
import MlSupervised from "./pages/MlSupervised";
import MlUnsupervised from "./pages/MlUnsupervised";
import MlDeepLearning from "./pages/MlDeepLearning";
import PythonIndex from "./pages/PythonIndex";
import ModelsIndex from "./pages/ModelsIndex";
import ModelsGemini from "./pages/ModelsGemini";
import ModelsGpt from "./pages/ModelsGpt";
import ModelsLlama from "./pages/ModelsLlama";
import ModelsMistral from "./pages/ModelsMistral";
import ModelsQwen from "./pages/ModelsQwen";
import ModelsDeepseek from "./pages/ModelsDeepseek";
import LangGraphIndex from "./pages/LangGraphIndex";
import LangGraphPatterns from "./pages/LangGraphPatterns";
import McpIndex from "./pages/McpIndex";
import PromptingIndex from "./pages/PromptingIndex";
import EmbeddingsIndex from "./pages/EmbeddingsIndex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents/document-loaders" element={<DocumentLoaders />} />
        <Route path="/agents/langchain" element={<Langchain />} />
        <Route path="/rag/fundamentals" element={<RagFundamentals />} />
        <Route path="/rag/vector-dbs" element={<RagVectorDbs />} />
        <Route path="/rag/advanced-rag" element={<RagAdvanced />} />
        <Route path="/llms" element={<LlmIndex />} />
        <Route path="/llms/llm-type" element={<LlmType />} />
        <Route path="/llms/vlm-type" element={<LlmVlm />} />
        <Route path="/llms/slm-type" element={<LlmSlm />} />
        <Route path="/genai" element={<GenAiIndex />} />
        <Route path="/genai/fine-tuning" element={<GenAiFineTuning />} />
        <Route path="/genai/quantization" element={<GenAiQuantization />} />
        <Route path="/ml" element={<MlIndex />} />
        <Route path="/ml/supervised" element={<MlSupervised />} />
        <Route path="/ml/unsupervised" element={<MlUnsupervised />} />
        <Route path="/ml/deep-learning" element={<MlDeepLearning />} />
        <Route path="/python" element={<PythonIndex />} />
        <Route path="/models" element={<ModelsIndex />} />
        <Route path="/models/gemini" element={<ModelsGemini />} />
        <Route path="/models/gpt" element={<ModelsGpt />} />
        <Route path="/models/llama" element={<ModelsLlama />} />
        <Route path="/models/mistral" element={<ModelsMistral />} />
        <Route path="/models/qwen" element={<ModelsQwen />} />
        <Route path="/models/deepseek" element={<ModelsDeepseek />} />
        <Route path="/langgraph" element={<LangGraphIndex />} />
        <Route path="/langgraph/patterns" element={<LangGraphPatterns />} />
        <Route path="/mcp" element={<McpIndex />} />
        <Route path="/prompting" element={<PromptingIndex />} />
        <Route path="/embeddings" element={<EmbeddingsIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

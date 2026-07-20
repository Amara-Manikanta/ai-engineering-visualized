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
import PythonIndex from "./pages/PythonIndex";
import AgentsIndex from "./pages/AgentsIndex";
import AgentsToolCalling from "./pages/AgentsToolCalling";
import AgentsMemory from "./pages/AgentsMemory";
import AgentsMultiAgent from "./pages/AgentsMultiAgent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<AgentsIndex />} />
        <Route path="/agents/tool-calling" element={<AgentsToolCalling />} />
        <Route path="/agents/memory" element={<AgentsMemory />} />
        <Route path="/agents/multi-agent" element={<AgentsMultiAgent />} />
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
        <Route path="/python" element={<PythonIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DocumentLoaders from "./pages/DocumentLoaders";
import Langchain from "./pages/Langchain";
import RagFundamentals from "./pages/RagFundamentals";
import RagVectorDbs from "./pages/RagVectorDbs";
import RagAdvanced from "./pages/RagAdvanced";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

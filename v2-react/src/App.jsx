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
import PythonFoundations from "./pages/python/PythonFoundations";
import PythonDataStructures from "./pages/python/PythonDataStructures";
import PythonAdvanced from "./pages/python/PythonAdvanced";
import PythonToolingAsync from "./pages/python/PythonToolingAsync";
import PythonDataScience from "./pages/python/PythonDataScience";
import AgentsIndex from "./pages/AgentsIndex";
import AgentsToolCalling from "./pages/AgentsToolCalling";
import AgentsMemory from "./pages/AgentsMemory";
import AgentsMultiAgent from "./pages/AgentsMultiAgent";
import MlIndex from "./pages/MlIndex";
import MlSupervised from "./pages/MlSupervised";
import MlUnsupervised from "./pages/MlUnsupervised";
import MlDeepLearning from "./pages/MlDeepLearning";
import ModelsIndex from "./pages/ModelsIndex";
import ModelsGemini from "./pages/ModelsGemini";
import ModelsGpt from "./pages/ModelsGpt";
import ModelsLlama from "./pages/ModelsLlama";
import ModelsMistral from "./pages/ModelsMistral";
import ModelsQwen from "./pages/ModelsQwen";
import ModelsDeepseek from "./pages/ModelsDeepseek";
import ModelsGrok from "./pages/ModelsGrok";
import LangGraphIndex from "./pages/LangGraphIndex";
import LangGraphPatterns from "./pages/LangGraphPatterns";
import McpIndex from "./pages/McpIndex";
import PromptingIndex from "./pages/PromptingIndex";
import EmbeddingsIndex from "./pages/EmbeddingsIndex";

// Part 4 Missing Imports
import RagIndex from "./pages/RagIndex";
import RagRetrieval from "./pages/RagRetrieval";
import RagEvaluation from "./pages/RagEvaluation";
import RagDataPrep from "./pages/RagDataPrep";
import RagAdvancedRetrieval from "./pages/RagAdvancedRetrieval";
import RagGeneration from "./pages/RagGeneration";
import RagChunking from "./pages/RagChunking";
import RagHybrid from "./pages/RagHybrid";
import RagGraph from "./pages/RagGraph";
import RagAgentic from "./pages/RagAgentic";
import RagIndexing from "./pages/RagIndexing";
import RagCrag from "./pages/RagCrag";
import RagDevelopment from "./pages/RagDevelopment";
import RagMultimodal from "./pages/RagMultimodal";
import RagTypes from "./pages/RagTypes";
import RagNaive from "./pages/RagNaive";
import RagSelf from "./pages/RagSelf";
import RagEmbeddings from "./pages/RagEmbeddings";
import MlNlp from "./pages/MlNlp";
import MlLogistic from "./pages/MlLogistic";
import MlDecisionTrees from "./pages/MlDecisionTrees";
import MlLinear from "./pages/MlLinear";
import MlKnn from "./pages/MlKnn";
import MlMultiple from "./pages/MlMultiple";
import MlTransformers from "./pages/MlTransformers";
import LlmMoe from "./pages/LlmMoe";
import LlmLcm from "./pages/LlmLcm";
import LlmLam from "./pages/LlmLam";
import ClaudeIndex from "./pages/ClaudeIndex";
import LlmInference from "./pages/LlmInference";
import ProjectsIndex from "./pages/ProjectsIndex";
import ResourcesIndex from "./pages/ResourcesIndex";
import AzureIndex from "./pages/AzureIndex";
import AzureBasics from "./pages/AzureBasics";
import AzureInfrastructure from "./pages/AzureInfrastructure";
import AzureIdentity from "./pages/AzureIdentity";
import AzureVms from "./pages/AzureVms";
import AzureStorage from "./pages/AzureStorage";
import AzureNetworking from "./pages/AzureNetworking";
import AzureLoadBalancer from "./pages/AzureLoadBalancer";
import AzureDns from "./pages/AzureDns";
import AzureAppService from "./pages/AzureAppService";
import AzureAks from "./pages/AzureAks";
import AzureMonitoring from "./pages/AzureMonitoring";
import AzureSecurity from "./pages/AzureSecurity";
import AzureBackup from "./pages/AzureBackup";
import AzureArchitecture from "./pages/AzureArchitecture";

import AwsIndex from "./pages/AwsIndex";
import AwsBasics from "./pages/AwsBasics";
import AwsInfrastructure from "./pages/AwsInfrastructure";
import AwsIam from "./pages/AwsIam";
import AwsEc2 from "./pages/AwsEc2";
import AwsStorage from "./pages/AwsStorage";
import AwsNetworking from "./pages/AwsNetworking";
import AwsLoadBalancer from "./pages/AwsLoadBalancer";
import AwsDns from "./pages/AwsDns";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<AgentsIndex />} />
        <Route path="/agents/tool-calling" element={<AgentsToolCalling />} />
        <Route path="/agents/memory" element={<AgentsMemory />} />
        <Route path="/agents/multi-agent" element={<AgentsMultiAgent />} />
        <Route path="/agents/document-loaders" element={<DocumentLoaders />} />
        <Route path="/agents/langchain" element={<Langchain />} />
        
        <Route path="/rag" element={<RagIndex />} />
        <Route path="/rag/fundamentals" element={<RagFundamentals />} />
        <Route path="/rag/vector-dbs" element={<RagVectorDbs />} />
        <Route path="/rag/advanced-rag" element={<RagAdvanced />} />
        <Route path="/rag/retrieval" element={<RagRetrieval />} />
        <Route path="/rag/evaluation" element={<RagEvaluation />} />
        <Route path="/rag/data-prep" element={<RagDataPrep />} />
        <Route path="/rag/advanced-retrieval" element={<RagAdvancedRetrieval />} />
        <Route path="/rag/generation" element={<RagGeneration />} />
        <Route path="/rag/chunking" element={<RagChunking />} />
        <Route path="/rag/hybrid-rag" element={<RagHybrid />} />
        <Route path="/rag/graph-rag" element={<RagGraph />} />
        <Route path="/rag/agentic-rag" element={<RagAgentic />} />
        <Route path="/rag/indexing" element={<RagIndexing />} />
        <Route path="/rag/crag" element={<RagCrag />} />
        <Route path="/rag/development" element={<RagDevelopment />} />
        <Route path="/rag/multimodal-rag" element={<RagMultimodal />} />
        <Route path="/rag/types-of-rag" element={<RagTypes />} />
        <Route path="/rag/naive-rag" element={<RagNaive />} />
        <Route path="/rag/self-rag" element={<RagSelf />} />
        <Route path="/rag/embeddings" element={<RagEmbeddings />} />

        <Route path="/llms" element={<LlmIndex />} />
        <Route path="/llms/llm-type" element={<LlmType />} />
        <Route path="/llms/vlm-type" element={<LlmVlm />} />
        <Route path="/llms/slm-type" element={<LlmSlm />} />
        <Route path="/llms/moe-type" element={<LlmMoe />} />
        <Route path="/llms/lcm-type" element={<LlmLcm />} />
        <Route path="/llms/lam-type" element={<LlmLam />} />

        <Route path="/genai" element={<GenAiIndex />} />
        <Route path="/genai/fine-tuning" element={<GenAiFineTuning />} />
        <Route path="/genai/quantization" element={<GenAiQuantization />} />
        
        <Route path="/python" element={<PythonIndex />} />
        <Route path="/python/foundations" element={<PythonFoundations />} />
        <Route path="/python/data-structures" element={<PythonDataStructures />} />
        <Route path="/python/advanced" element={<PythonAdvanced />} />
        <Route path="/python/tooling-async" element={<PythonToolingAsync />} />
        <Route path="/python/data-science" element={<PythonDataScience />} />
        
        <Route path="/ml" element={<MlIndex />} />
        <Route path="/ml/supervised" element={<MlSupervised />} />
        <Route path="/ml/unsupervised" element={<MlUnsupervised />} />
        <Route path="/ml/deep-learning" element={<MlDeepLearning />} />
        <Route path="/ml/nlp" element={<MlNlp />} />
        <Route path="/ml/logistic-regression" element={<MlLogistic />} />
        <Route path="/ml/decision-trees" element={<MlDecisionTrees />} />
        <Route path="/ml/linear-regression" element={<MlLinear />} />
        <Route path="/ml/knn" element={<MlKnn />} />
        <Route path="/ml/multiple-regression" element={<MlMultiple />} />
        <Route path="/ml/transformers" element={<MlTransformers />} />

        <Route path="/models" element={<ModelsIndex />} />
        <Route path="/models/gemini" element={<ModelsGemini />} />
        <Route path="/models/gpt" element={<ModelsGpt />} />
        <Route path="/models/llama" element={<ModelsLlama />} />
        <Route path="/models/mistral" element={<ModelsMistral />} />
        <Route path="/models/qwen" element={<ModelsQwen />} />
        <Route path="/models/deepseek" element={<ModelsDeepseek />} />
        <Route path="/models/grok" element={<ModelsGrok />} />

        <Route path="/langgraph" element={<LangGraphIndex />} />
        <Route path="/langgraph/patterns" element={<LangGraphPatterns />} />
        
        <Route path="/mcp" element={<McpIndex />} />
        <Route path="/prompting" element={<PromptingIndex />} />
        <Route path="/embeddings" element={<EmbeddingsIndex />} />
        
        <Route path="/claude" element={<ClaudeIndex />} />
        <Route path="/llm-inference" element={<LlmInference />} />
        
        <Route path="/azure" element={<AzureIndex />} />
        <Route path="/azure/basics" element={<AzureBasics />} />
        <Route path="/azure/infrastructure" element={<AzureInfrastructure />} />
        <Route path="/azure/identity" element={<AzureIdentity />} />
        <Route path="/azure/vms" element={<AzureVms />} />
        <Route path="/azure/storage" element={<AzureStorage />} />
        <Route path="/azure/networking" element={<AzureNetworking />} />
        <Route path="/azure/load-balancer" element={<AzureLoadBalancer />} />
        <Route path="/azure/dns" element={<AzureDns />} />
        <Route path="/azure/app-service" element={<AzureAppService />} />
        <Route path="/azure/aks" element={<AzureAks />} />
        <Route path="/azure/monitoring" element={<AzureMonitoring />} />
        <Route path="/azure/security" element={<AzureSecurity />} />
        <Route path="/azure/backup" element={<AzureBackup />} />
        <Route path="/azure/architecture" element={<AzureArchitecture />} />

        <Route path="/aws" element={<AwsIndex />} />
        <Route path="/aws/basics" element={<AwsBasics />} />
        <Route path="/aws/infrastructure" element={<AwsInfrastructure />} />
        <Route path="/aws/iam" element={<AwsIam />} />
        <Route path="/aws/ec2" element={<AwsEc2 />} />
        <Route path="/aws/storage" element={<AwsStorage />} />
        <Route path="/aws/networking" element={<AwsNetworking />} />
        <Route path="/aws/load-balancer" element={<AwsLoadBalancer />} />
        <Route path="/aws/dns" element={<AwsDns />} />

        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/resources" element={<ResourcesIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

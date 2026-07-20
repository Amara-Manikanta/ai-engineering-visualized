import React from 'react';
import GuideLayout from '../components/GuideLayout';

const toc = [
  { label: '1. What are Embeddings?', hash: '#what-are' },
  { label: '2. Why do we need them?', hash: '#why-need' },
  { label: '3. Text to Vector', hash: '#text-to-vector' },
  { label: '4. High-dimensional Space', hash: '#high-dim' },
  { label: '5. Similarity Search', hash: '#sim-search' },
  { label: '6. Cosine Similarity', hash: '#cosine' },
  { label: '7. Dot Product', hash: '#dot-product' },
  { label: '8. Dense vs Sparse', hash: '#dense-sparse' },
  { label: '9. Embedding Models', hash: '#models' },
  { label: '10. Creating in Python', hash: '#python' },
  { label: '11. Visualizing Embeddings', hash: '#visualizing' },
  { label: '12. Real-world Examples', hash: '#examples' },
  { label: '13. Common Mistakes', hash: '#mistakes' }
];

const RagEmbeddings = () => {
  return (
    <GuideLayout
      title="Embeddings"
      intro="The mathematical foundation of semantic search."
      toc={toc}
    >
      <section id="what-are" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">1. What are Embeddings?</h2>
        <p className="text-gray-300">Embeddings are <strong className="text-white">dense numerical vectors</strong> (lists of floating-point numbers) that capture the semantic meaning of text, images, or audio. They act as a universal language for AI models, translating human concepts into math. In this space, words with similar meanings are mapped to points that are geometrically close to each other.</p>
      </section>

      <section id="why-need" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">2. Why do we need Embeddings?</h2>
        <p className="text-gray-300 mb-4">Traditional keyword search (like BM25 or TF-IDF) relies on exact lexical matches. If a user searches for <em>"puppy"</em>, the search engine will completely miss documents containing only <em>"young dog"</em> because the raw characters do not match.</p>
        <p className="text-gray-300">Embeddings solve the <strong className="text-white">lexical gap</strong>. Because they encode <em>intent and meaning</em> rather than spelling, a query for "puppy" and a document about "young dog" will have nearly identical vector representations. This allows for true <strong className="text-white">Semantic Search</strong>.</p>
      </section>

      <section id="text-to-vector" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">3. Text to Vector</h2>
        <p className="text-gray-300 mb-6">The journey from text to vector involves tokenization, followed by a forward pass through a neural network encoder (like BERT or GPT).</p>
        <div className="bg-[#111] border border-[#333] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="p-3 bg-[#222] border-2 border-blue-500 rounded-lg text-center font-semibold text-white">"The puppy played."</div>
            <div className="text-2xl text-gray-500">➔</div>
            <div className="p-3 bg-[#222] border-2 border-purple-500 rounded-lg text-center font-semibold text-white">Tokens:<br/>[464, 15309, 3624, 13]</div>
            <div className="text-2xl text-gray-500">➔</div>
            <div className="p-3 bg-[#222] border-2 border-green-500 rounded-lg text-center font-mono text-sm max-w-[250px] text-gray-300">
              [0.012, -0.834, 0.442,<br/> 0.119, -0.003, ... ]<br/><span className="text-gray-500">(384 dimensions)</span>
            </div>
          </div>
        </div>
      </section>

      <section id="high-dim" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">4. High-dimensional Space</h2>
        <p className="text-gray-300 mb-6">While humans can only visualize 2D or 3D space, embedding models project concepts into hundreds or thousands of dimensions (e.g., 384, 768, 1536). Each dimension represents a highly abstract, latent feature (like "royalty", "gender", "positivity", or "plurality").</p>
        
        <div className="bg-[#111] border border-[#333] rounded-xl p-6 mb-4 h-[200px] relative">
          <div className="w-full h-full relative">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] left-[20%] top-[30%]">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold bg-[#222] px-1.5 py-0.5 rounded border border-[#444] text-white whitespace-nowrap">King</span>
            </div>
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] left-[35%] top-[20%]">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold bg-[#222] px-1.5 py-0.5 rounded border border-[#444] text-white whitespace-nowrap">Queen</span>
            </div>
            
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] left-[70%] top-[70%]">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold bg-[#222] px-1.5 py-0.5 rounded border border-[#444] text-white whitespace-nowrap">Car</span>
            </div>
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] left-[80%] top-[60%]">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold bg-[#222] px-1.5 py-0.5 rounded border border-[#444] text-white whitespace-nowrap">Truck</span>
            </div>
            
            <svg width="100%" height="100%" className="absolute top-0 left-0 pointer-events-none">
              <line x1="20%" y1="30%" x2="35%" y2="20%" stroke="#3b82f6" strokeDasharray="4" strokeWidth="2"/>
              <line x1="70%" y1="70%" x2="80%" y2="60%" stroke="#22c55e" strokeDasharray="4" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400">Notice how concepts group together based on semantic relationships.</p>
      </section>

      <section id="sim-search" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">5. Similarity Search</h2>
        <p className="text-gray-300">Once your documents are converted to vectors and stored in a Vector Database (like Pinecone, Milvus, or Chroma), how do you search them? You embed the user's query into a vector using the exact same model, and ask the database to find the vectors that are closest to it mathematically. This process is known as <strong className="text-white">K-Nearest Neighbors (KNN)</strong>.</p>
      </section>

      <section id="cosine" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">6. Cosine Similarity</h2>
        <p className="text-gray-300 mb-4">This is the most common metric used for text embeddings. It calculates the cosine of the angle θ between two vectors, completely ignoring their magnitude (length). </p>
        <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-6 my-6">
          <div className="font-mono text-xl text-center mb-4 text-indigo-400">Cosine Similarity = (A • B) / (||A|| × ||B||)</div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><strong className="text-white">1.0</strong>: Vectors point in the exact same direction (identical meaning).</li>
            <li><strong className="text-white">0.0</strong>: Vectors are orthogonal (unrelated).</li>
            <li><strong className="text-white">-1.0</strong>: Vectors point in opposite directions (opposite meaning).</li>
          </ul>
        </div>
      </section>

      <section id="dot-product" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">7. Dot Product</h2>
        <p className="text-gray-300 mb-4">Calculates the sum of the products of the corresponding entries of the two sequences of numbers. Unlike Cosine Similarity, it accounts for both the <strong className="text-white">angle</strong> and the <strong className="text-white">magnitude</strong>.</p>
        <p className="text-gray-400 italic text-sm">Note: If your vectors are <strong>normalized</strong> (scaled so their length = 1), the Dot Product is mathematically identical to Cosine Similarity, but it computes much faster on modern CPUs/GPUs.</p>
      </section>

      <section id="dense-sparse" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">8. Dense vs Sparse Embeddings</h2>
        <p className="text-gray-300 mb-6">Hybrid search systems combine two different types of embeddings to get the best of both semantic and keyword search.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-gray-300">
            <thead>
              <tr>
                <th className="bg-[#1a1a1a] p-3 border border-[#333] font-semibold text-left text-white">Feature</th>
                <th className="bg-[#1a1a1a] p-3 border border-[#333] font-semibold text-left text-white">Dense (OpenAI, Cohere)</th>
                <th className="bg-[#1a1a1a] p-3 border border-[#333] font-semibold text-left text-white">Sparse (SPLADE, BM25)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-[#333] font-semibold text-white">Array Focus</td>
                <td className="p-3 border border-[#333]">Semantic meaning (Intent)</td>
                <td className="p-3 border border-[#333]">Exact keyword matching</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#333] font-semibold text-white">Array Composition</td>
                <td className="p-3 border border-[#333]">Most values are non-zero floating points</td>
                <td className="p-3 border border-[#333]">99% of values are zero</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#333] font-semibold text-white">Dimensionality</td>
                <td className="p-3 border border-[#333]">Low (384 - 3072)</td>
                <td className="p-3 border border-[#333]">Extremely High (Vocabulary size, e.g. 30,000+)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="models" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">9. Embedding Models</h2>
        <p className="text-gray-300 mb-6">Choosing the right model dictates your database cost and retrieval quality.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4">
            <div className="font-bold text-blue-500 mb-1">OpenAI text-embedding-3-large</div>
            <div className="font-mono text-xs text-gray-400 mb-2">Dimensions: up to 3072</div>
            <div className="text-sm text-gray-300">State of the art proprietary model. Very high quality but requires API calls and costs money.</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4">
            <div className="font-bold text-blue-500 mb-1">all-MiniLM-L6-v2 (HuggingFace)</div>
            <div className="font-mono text-xs text-gray-400 mb-2">Dimensions: 384</div>
            <div className="text-sm text-gray-300">Extremely fast, open-source model. Runs locally. Great for smaller projects and low-latency.</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4">
            <div className="font-bold text-blue-500 mb-1">Cohere embed-english-v3.0</div>
            <div className="font-mono text-xs text-gray-400 mb-2">Dimensions: 1024</div>
            <div className="text-sm text-gray-300">Excellent proprietary model specifically optimized for enterprise RAG pipelines and search.</div>
          </div>
        </div>
      </section>

      <section id="python" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">10. Creating Embeddings in Python</h2>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-white">Using OpenAI (Cloud)</h3>
        <pre className="bg-[#111] border border-[#333] rounded-xl p-4 font-mono text-sm overflow-x-auto text-gray-300 mb-6">
          <code>{`from langchain_openai import OpenAIEmbeddings

embeddings_model = OpenAIEmbeddings(model="text-embedding-3-small")
vector = embeddings_model.embed_query("Hello world")
print(f"Dimensions: {len(vector)}") # Output: 1536`}</code>
        </pre>

        <h3 className="text-lg font-semibold mb-3 text-white">Using HuggingFace (Local CPU/GPU)</h3>
        <pre className="bg-[#111] border border-[#333] rounded-xl p-4 font-mono text-sm overflow-x-auto text-gray-300">
          <code>{`from langchain_community.embeddings import HuggingFaceEmbeddings

# Downloads the model to your machine and runs locally
embeddings_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector = embeddings_model.embed_query("Hello world")
print(f"Dimensions: {len(vector)}") # Output: 384`}</code>
        </pre>
      </section>

      <section id="visualizing" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">11. Visualizing Embeddings</h2>
        <p className="text-gray-300">Because humans cannot see in 1536 dimensions, data scientists use dimensionality reduction algorithms like <strong className="text-white">t-SNE</strong> or <strong className="text-white">UMAP</strong> to squash the vectors down into 2D or 3D space while preserving the local distances between points. This allows us to plot them on a standard graph to look for semantic clusters and outlier data points.</p>
      </section>

      <section id="examples" className="mb-12 border-b border-[#333] pb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">12. Real-world Examples</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li><strong className="text-white">Semantic Search (RAG):</strong> Finding paragraphs in a company handbook that answer a user's question, even if they use entirely different vocabulary.</li>
          <li><strong className="text-white">Recommendation Systems:</strong> Embedding user profiles and movies into the same vector space. If a user vector is near a movie vector, the system recommends that movie.</li>
          <li><strong className="text-white">Anomaly Detection:</strong> Finding log entries or financial transactions whose vectors sit far outside the standard cluster norms.</li>
        </ul>
      </section>

      <section id="mistakes" className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-white">13. Common Mistakes</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
            <h4 className="text-red-400 font-bold mb-2">⚠️ Not Normalizing Before Dot Product</h4>
            <p className="text-sm text-gray-300">If your database uses Dot Product but your vectors are not normalized to a length of 1, longer texts will unfairly score higher simply because they have larger magnitude vectors. <em>Always normalize if using Dot Product for text similarity.</em></p>
          </div>
          <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
            <h4 className="text-red-400 font-bold mb-2">⚠️ Dimension Mismatch</h4>
            <p className="text-sm text-gray-300">You cannot compare a 384-dimensional vector to a 1536-dimensional vector. Furthermore, you cannot compare two 1536-dimensional vectors created by different models! All data in a single vector index must be created by the <strong className="text-white">exact same embedding model version</strong>.</p>
          </div>
          <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
            <h4 className="text-red-400 font-bold mb-2">⚠️ Asymmetric Search Ignorance</h4>
            <p className="text-sm text-gray-300">If your queries are short (e.g., "Python error") but your documents are long paragraphs, you have an asymmetric search problem. You must use embedding models trained specifically for asymmetric QA, not just general semantic similarity.</p>
          </div>
        </div>
      </section>

    </GuideLayout>
  );
};

export default RagEmbeddings;

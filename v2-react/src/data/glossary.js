/**
 * AI / ML glossary. `see` values are real routes in this app so every term
 * can hand the reader somewhere deeper.
 */
export const GLOSSARY = [
  // ---------------------------------------------------------------- Core
  { t: "Token", c: "Core", d: "The unit a model actually reads and bills for — usually a subword fragment, not a word. Roughly 4 characters of English.", see: "/playgrounds" },
  { t: "Tokenizer", c: "Core", d: "Converts text to token IDs and back. Each model family has its own, so token counts differ between providers for identical text.", see: "/playgrounds" },
  { t: "Context window", c: "Core", d: "The maximum tokens a model can attend to at once, covering system prompt, history, retrieved documents and the answer.", see: "/animations" },
  { t: "Parameters", c: "Core", d: "The learned weights. More parameters usually means more capability and more memory, but architecture and data matter as much as count.", see: "/llms" },
  { t: "Inference", c: "Core", d: "Running a trained model to produce output, as opposed to training it. Dominated by memory bandwidth rather than raw compute.", see: "/llm-inference" },
  { t: "Logits", c: "Core", d: "Raw unnormalised scores the model assigns each possible next token, before softmax turns them into probabilities.", see: "/playgrounds" },
  { t: "Softmax", c: "Core", d: "Turns logits into a probability distribution summing to 1. Temperature divides the logits before this step.", see: "/playgrounds" },
  { t: "Temperature", c: "Core", d: "Scales logits before softmax. Low values sharpen toward the top token; high values flatten the distribution toward randomness.", see: "/playgrounds" },
  { t: "Top-p / nucleus sampling", c: "Core", d: "Keeps the smallest set of tokens whose probabilities sum to p, then renormalises. Adapts to how confident the model is.", see: "/playgrounds" },
  { t: "Greedy decoding", c: "Core", d: "Always picking the highest-probability token. Deterministic, and equivalent to temperature approaching zero.", see: "/playgrounds" },
  { t: "Perplexity", c: "Core", d: "How surprised a model is by text. Lower is better, but it correlates only loosely with usefulness on real tasks." },
  { t: "Hallucination", c: "Core", d: "A confident, fluent, false output. A consequence of optimising for plausibility rather than truth.", see: "/safety" },

  // ------------------------------------------------------- Architecture
  { t: "Transformer", c: "Architecture", d: "The architecture behind essentially every modern LLM. Built on self-attention rather than recurrence, so it parallelises across a sequence.", see: "/ml/transformers" },
  { t: "Self-attention", c: "Architecture", d: "Each token computes how much to weight every other token, via scaled dot-product of queries and keys.", see: "/playgrounds" },
  { t: "Q, K, V", c: "Architecture", d: "Query, Key and Value projections. Attention weight comes from Q·Kᵀ/√d; the output is the weighted sum of V.", see: "/ml/transformers" },
  { t: "Multi-head attention", c: "Architecture", d: "Several attention computations in parallel over different projections, letting the model track multiple relationships at once.", see: "/ml/transformers" },
  { t: "Positional encoding", c: "Architecture", d: "Injects order information, since attention itself is permutation-invariant. Sinusoidal originally; RoPE is common now.", see: "/ml/transformers" },
  { t: "Causal mask", c: "Architecture", d: "Prevents a token attending to later tokens, so a decoder cannot see the future it is meant to predict.", see: "/playgrounds" },
  { t: "Encoder / Decoder", c: "Architecture", d: "Encoders read bidirectionally (BERT), decoders generate left-to-right (GPT), encoder-decoders do both (T5).", see: "/ml/transformers" },
  { t: "Mixture of Experts (MoE)", c: "Architecture", d: "Routes each token to a few expert sub-networks, so total parameters can be huge while active parameters per token stay small.", see: "/llms" },
  { t: "KV cache", c: "Architecture", d: "Stores past keys and values so each new token needn't recompute them. Grows with batch × sequence length and dominates serving memory.", see: "/system-design" },
  { t: "Embedding", c: "Architecture", d: "A dense vector representing meaning, where distance corresponds to similarity. The basis of semantic search.", see: "/rag/embeddings" },
  { t: "Residual connection", c: "Architecture", d: "Adds a layer's input to its output, letting gradients flow through very deep stacks without vanishing.", see: "/ml/deep-learning" },
  { t: "LayerNorm", c: "Architecture", d: "Normalises activations within a layer to keep training stable. Modern stacks usually apply it before the sublayer (pre-norm)." },

  // -------------------------------------------------------------- Training
  { t: "Pretraining", c: "Training", d: "The expensive first stage: next-token prediction over a very large corpus. Produces knowledge and fluency but no instruction-following.", see: "/animations" },
  { t: "Fine-tuning", c: "Training", d: "Further training on a narrower dataset to adapt behaviour, tone or format for a specific task.", see: "/genai/fine-tuning" },
  { t: "SFT", c: "Training", d: "Supervised Fine-Tuning on curated prompt/response demonstrations. The step that turns a base model into an assistant.", see: "/safety" },
  { t: "RLHF", c: "Training", d: "Reinforcement Learning from Human Feedback: humans rank outputs, a reward model learns those preferences, RL optimises against it.", see: "/safety" },
  { t: "DPO", c: "Training", d: "Direct Preference Optimization. Reaches RLHF's objective with a single supervised loss on preference pairs — no reward model, no RL loop.", see: "/safety" },
  { t: "Constitutional AI", c: "Training", d: "Replaces most human labelling with model self-critique against explicit written principles, then AI-generated preference labels.", see: "/safety" },
  { t: "Reward hacking", c: "Training", d: "Optimising the measured proxy rather than the intent. Why RLHF needs a KL penalty anchoring the policy to the SFT model.", see: "/safety" },
  { t: "LoRA", c: "Training", d: "Low-Rank Adaptation. Freezes base weights and trains two small matrices whose product approximates the update — often under 1% of parameters.", see: "/animations" },
  { t: "QLoRA", c: "Training", d: "LoRA on top of a 4-bit quantised frozen base, cutting memory further at a small quality cost.", see: "/genai/quantization" },
  { t: "PEFT", c: "Training", d: "Parameter-Efficient Fine-Tuning — the family LoRA belongs to, including prefix tuning and adapters.", see: "/genai/fine-tuning" },
  { t: "Quantization", c: "Training", d: "Storing weights at lower precision (8-bit, 4-bit) to cut memory and increase speed, trading some accuracy.", see: "/genai/quantization" },
  { t: "Distillation", c: "Training", d: "Training a small student model to imitate a larger teacher, keeping much of the capability at a fraction of the cost." },
  { t: "Overfitting", c: "Training", d: "Memorising training noise instead of the pattern. Shows up as strong training scores and weak held-out scores.", see: "/ml/supervised" },
  { t: "Backpropagation", c: "Training", d: "The chain rule applied layer by layer to compute how much each weight contributed to the error.", see: "/ml/deep-learning" },
  { t: "Gradient descent", c: "Training", d: "Iteratively stepping parameters against the gradient to reduce loss. Step size is the learning rate.", see: "/ml/linear-regression" },

  // ------------------------------------------------------------------ RAG
  { t: "RAG", c: "RAG", d: "Retrieval-Augmented Generation. Look information up at question time and give it to the model, instead of relying on parametric memory.", see: "/rag" },
  { t: "Chunking", c: "RAG", d: "Splitting documents into retrievable pieces. The size/overlap tradeoff shapes everything downstream.", see: "/rag/chunking" },
  { t: "Vector database", c: "RAG", d: "Stores embeddings and answers nearest-neighbour queries quickly. Examples: Qdrant, Pinecone, pgvector.", see: "/rag/vector-dbs" },
  { t: "Cosine similarity", c: "RAG", d: "Measures the angle between two vectors, ignoring magnitude. The usual relevance metric for embeddings.", see: "/rag/embeddings" },
  { t: "HNSW", c: "RAG", d: "Hierarchical Navigable Small World — a graph index giving approximate nearest-neighbour search with a tunable speed/recall tradeoff.", see: "/rag/indexing" },
  { t: "BM25", c: "RAG", d: "A classical lexical ranking function. Strong on exact terms, IDs and codes, where dense vectors are weak.", see: "/rag/advanced-retrieval" },
  { t: "Hybrid search", c: "RAG", d: "Runs dense and sparse retrieval together and fuses the rankings. Usually the highest value-per-effort upgrade over naive RAG.", see: "/rag/advanced-retrieval" },
  { t: "RRF", c: "RAG", d: "Reciprocal Rank Fusion. Merges ranked lists using only rank position, so scores never need normalising.", see: "/rag/advanced-retrieval" },
  { t: "Re-ranking", c: "RAG", d: "Rescoring a broad candidate set with a cross-encoder that reads query and document together. Slower, much more accurate.", see: "/rag/advanced-retrieval" },
  { t: "Cross-encoder", c: "RAG", d: "Encodes query and document jointly for a precise relevance score — too slow for full-corpus search, ideal for re-ranking.", see: "/rag/advanced-retrieval" },
  { t: "Bi-encoder", c: "RAG", d: "Encodes query and document separately so document vectors can be precomputed. Fast, less precise than a cross-encoder.", see: "/rag/embeddings" },
  { t: "HyDE", c: "RAG", d: "Hypothetical Document Embeddings — generate a plausible answer first and search with its embedding, since answers resemble answers.", see: "/rag/advanced-retrieval" },
  { t: "Parent-child retrieval", c: "RAG", d: "Index small chunks for precise matching but return their larger parent for context. Breaks the chunk-size tradeoff.", see: "/rag/advanced-retrieval" },
  { t: "Contextual retrieval", c: "RAG", d: "Prepend a short description of each chunk's place in its document before embedding, so chunks stay meaningful alone.", see: "/rag/advanced-retrieval" },
  { t: "Faithfulness", c: "RAG", d: "Whether every claim in an answer is supported by the retrieved context. The direct hallucination metric.", see: "/rag/evaluation" },
  { t: "Context precision / recall", c: "RAG", d: "Precision: were retrieved chunks relevant and well-ranked. Recall: did retrieval find everything needed. Recall failures are unrecoverable.", see: "/rag/evaluation" },
  { t: "RAGAS", c: "RAG", d: "An evaluation framework scoring faithfulness, answer relevancy, context precision and recall using an LLM judge.", see: "/rag/evaluation" },

  // --------------------------------------------------------------- Agents
  { t: "Agent", c: "Agents", d: "An LLM in a loop with tools, deciding what to do next rather than answering once.", see: "/agents" },
  { t: "ReAct", c: "Agents", d: "Reason + Act. Interleaves a thought, one tool call and an observation, repeatedly. The default agent loop.", see: "/agents" },
  { t: "Plan-and-Execute", c: "Agents", d: "Writes a full plan upfront, executes it step by step, and replans when reality diverges. Stays on-goal over long horizons.", see: "/agents" },
  { t: "Reflexion", c: "Agents", d: "After a failure, the agent writes a self-critique into memory so the next attempt avoids the same mistake.", see: "/agents" },
  { t: "Tool calling", c: "Agents", d: "The model emits a structured request against a JSON schema; your code executes it and returns the result as a message.", see: "/agents/tool-calling" },
  { t: "MCP", c: "Agents", d: "Model Context Protocol. A standard for connecting models to tools, resources and prompts, replacing per-integration glue.", see: "/mcp" },
  { t: "Prompt injection", c: "Agents", d: "Instructions hidden in content the model reads. Indirect injection arrives through a tool and bypasses input filtering entirely.", see: "/safety" },
  { t: "Guardrails", c: "Agents", d: "Deterministic controls around a probabilistic core: permissions, schemas, loop limits, human approval.", see: "/agents" },
  { t: "Multi-agent system", c: "Agents", d: "Several specialised agents coordinating. Buys focus and parallelism at the cost of orchestration, latency and tokens.", see: "/agents/multi-agent" },
  { t: "Orchestrator-worker", c: "Agents", d: "A manager agent decomposes a goal and delegates to specialised workers, then combines their results.", see: "/agents/multi-agent" },
  { t: "Human in the loop", c: "Agents", d: "Requiring explicit approval before irreversible actions — sending, spending, deleting, deploying.", see: "/agents" },

  // ---------------------------------------------------------------- Serving
  { t: "Speculative decoding", c: "Serving", d: "A small draft model proposes several tokens; the large model verifies them in one batched pass. Same output, lower latency.", see: "/animations" },
  { t: "Continuous batching", c: "Serving", d: "Admits new requests as others finish rather than waiting for a whole batch. Often a large throughput win over static batching.", see: "/system-design" },
  { t: "PagedAttention", c: "Serving", d: "Manages the KV cache like virtual memory in pages, avoiding worst-case preallocation. The core idea behind vLLM.", see: "/system-design" },
  { t: "Prefix caching", c: "Serving", d: "Reuses computation for a shared prompt prefix across requests, so a long system prompt is processed once.", see: "/system-design" },
  { t: "Time to first token", c: "Serving", d: "Latency before streaming begins. Usually what users actually perceive as speed.", see: "/system-design" },
  { t: "Streaming", c: "Serving", d: "Emitting tokens as they are generated instead of waiting for the full response.", see: "/system-design" },

  // ------------------------------------------------------------------- ML
  { t: "Supervised learning", c: "ML", d: "Learning from labelled examples to predict a known target.", see: "/ml/supervised" },
  { t: "Unsupervised learning", c: "ML", d: "Finding structure in unlabelled data — clustering, dimensionality reduction.", see: "/ml/unsupervised" },
  { t: "Classification / Regression", c: "ML", d: "The two supervised shapes: predict a category, or predict a continuous number.", see: "/ml/supervised" },
  { t: "Precision / Recall", c: "ML", d: "Precision: of what you returned, how much was right. Recall: of what was right, how much did you return.", see: "/rag/evaluation" },
  { t: "Cross-validation", c: "ML", d: "Rotating the held-out fold across the dataset so every row is validated once. More reliable than one split.", see: "/ml/supervised" },
  { t: "Bias / Variance", c: "ML", d: "Bias is underfitting — too simple. Variance is overfitting — too sensitive to the training sample.", see: "/ml/supervised" },
  { t: "Feature engineering", c: "ML", d: "Hand-designing the inputs a model sees. Largely what deep learning automated away.", see: "/ml/nlp" },
  { t: "Gradient boosting", c: "ML", d: "Sequentially adds trees that correct the previous ensemble's errors. Still the strongest default for tabular data.", see: "/ml/decision-trees" },
  { t: "TF-IDF", c: "ML", d: "Weights terms by frequency in a document against rarity across the corpus. A strong pre-neural text baseline.", see: "/ml/nlp" },
  { t: "N-gram", c: "ML", d: "A contiguous run of N tokens. Bigrams are what let a bag-of-words model notice 'not good'.", see: "/ml/nlp" },
  { t: "NER", c: "ML", d: "Named Entity Recognition — tagging spans as people, organisations, dates or amounts. Turns text into structured records.", see: "/ml/nlp" },
];

export const CATEGORIES = ["Core", "Architecture", "Training", "RAG", "Agents", "Serving", "ML"];

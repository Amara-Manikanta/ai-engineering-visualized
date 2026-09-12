/**
 * Shared question bank.
 *
 * Each topic's questions are imported both by the dedicated /quizzes page and
 * by the individual guide pages, so a question is written once and appears in
 * both places. `path` is where the material lives.
 *
 * Style rule for questions here: test whether the reader understood *why*,
 * not whether they memorised a term. Every distractor should be something a
 * reasonable person might believe.
 */

export const QUIZZES = [
  {
    id: "ml-ensembles",
    topic: "Ensembles",
    label: "Random Forests & Boosting",
    path: "/ml/random-forests",
    icon: "🌲",
    tone: "amber",
    questions: [
      {
        q: "A random forest's trees are individually deep and overfit. Why is that the design rather than a flaw?",
        options: [
          "Deep trees train faster than shallow ones",
          "Averaging cancels variance but cannot fix bias, so each learner should be low-bias",
          "Deep trees are more interpretable when combined",
          "Shallow trees cannot handle categorical features",
        ],
        answer: 1,
        why: "Averaging independent errors drives variance down, and it leaves bias roughly where it was. So you want learners as flexible as possible, each overfitting in a different direction, and let the average cancel the noise. Boosting makes the opposite bet: weak, high-bias learners corrected sequentially.",
      },
      {
        q: "You raise a random forest from 100 to 1000 trees and accuracy barely moves. What does the ensemble variance formula say is happening?",
        options: [
          "The trees have become correlated with each other",
          "The variance floor is ρσ², which no number of trees removes",
          "The model has run out of training data",
          "n_estimators has a hard internal limit",
        ],
        answer: 1,
        why: "Variance of the average is ρσ² + (1−ρ)σ²/n. Only the second term shrinks with n. Past a few hundred trees it is already negligible and you are sitting on the floor set by ρ. Lowering ρ — which is exactly what random feature selection at each split does — is the only lever left.",
      },
      {
        q: "Which statement about adding more trees is true?",
        options: [
          "Both random forests and gradient boosting overfit with too many trees",
          "Neither overfits with more trees",
          "A random forest is mostly safe; a boosted model will overfit",
          "A boosted model is mostly safe; a random forest will overfit",
        ],
        answer: 2,
        why: "Bagged trees are averaged, so extra trees mainly cost time. Boosted trees are summed, each one fitting the previous residuals, so the model keeps growing in complexity and will eventually fit noise. That asymmetry is why boosting needs early stopping and bagging does not.",
      },
      {
        q: "What does out-of-bag scoring give you?",
        options: [
          "A faster training algorithm",
          "A validation estimate without holding out a separate set",
          "A way to handle missing values",
          "Better calibrated probabilities",
        ],
        answer: 1,
        why: "Each bootstrap sample leaves roughly a third of rows unused for that tree. Scoring each row using only the trees that never saw it produces an honest held-out estimate at no extra data cost. It is close to cross-validation for free.",
      },
    ],
  },
  {
    id: "ml-svm",
    topic: "SVM",
    label: "Support Vector Machines",
    path: "/ml/svm",
    icon: "📐",
    tone: "indigo",
    questions: [
      {
        q: "Two boundaries both classify every training point correctly. Why does an SVM prefer the one further from the data?",
        options: [
          "It trains faster",
          "A wider margin tolerates more perturbation before a new point is misclassified",
          "It uses fewer support vectors",
          "It guarantees a linearly separable dataset",
        ],
        answer: 1,
        why: "Training accuracy cannot distinguish them, so you need another criterion. Distance to the nearest point is a proxy for how much a test point can differ before crossing the boundary. Maximising it is a generalisation argument, not a fitting one.",
      },
      {
        q: "What does the kernel trick actually avoid doing?",
        options: [
          "Computing the coordinates in the high-dimensional space",
          "Storing the training data",
          "Solving an optimisation problem",
          "Scaling the input features",
        ],
        answer: 0,
        why: "The optimiser only ever needs dot products between points. A kernel returns the dot product in the lifted space directly, so the lift is never materialised. That is what makes an infinite-dimensional feature space affordable.",
      },
      {
        q: "You have very noisy, overlapping classes. Which way do you move C?",
        options: [
          "Up, to force correct classification of every point",
          "Down, to buy a wider margin by tolerating violations",
          "C has no effect on noisy data",
          "Set C to exactly 1 always",
        ],
        answer: 1,
        why: "Large C makes violations expensive, so the boundary contorts to fit noise. Small C buys a wider, smoother margin at the cost of some training errors — which is what you want when those errors are noise rather than signal.",
      },
    ],
  },
  {
    id: "dl-cnn",
    topic: "CNNs",
    label: "Convolutional Networks",
    path: "/ml/cnn",
    icon: "🖼️",
    tone: "blue",
    questions: [
      {
        q: "Weight sharing in a convolutional layer means the same kernel is applied everywhere. What is the main consequence?",
        options: [
          "Training converges in fewer epochs",
          "A feature learned at one position works at every position, and parameters stop scaling with image size",
          "The network becomes fully interpretable",
          "Pooling is no longer necessary",
        ],
        answer: 1,
        why: "Two things at once. Translation equivariance means an edge detector works anywhere without relearning, and the parameter count depends only on kernel size and channel count rather than on resolution. That is why a convolutional layer is tractable where a dense layer on pixels is not.",
      },
      {
        q: "Input 32×32, kernel 3, stride 1, padding 1. What is the output size?",
        options: ["30×30", "32×32", "34×34", "16×16"],
        answer: 1,
        why: "⌊(32 + 2·1 − 3) / 1⌋ + 1 = 32. Kernel 3 with padding 1 and stride 1 preserves spatial size exactly, which is why that combination — 'same' padding — is so common in modern architectures.",
      },
      {
        q: "Why do residual connections matter for deep CNNs?",
        options: [
          "They reduce the parameter count",
          "They give gradients a path that skips the block, making very deep networks trainable",
          "They replace the need for pooling",
          "They make the network translation invariant",
        ],
        answer: 1,
        why: "Writing a block as y = f(x) + x means the gradient reaches x through the identity term even when f's gradient is tiny. That is the same structural idea as an LSTM's cell state, and it is what took usable depth past about twenty layers.",
      },
    ],
  },
  {
    id: "dl-rnn",
    topic: "RNNs",
    label: "RNNs & LSTMs",
    path: "/ml/rnn",
    icon: "🔁",
    tone: "rose",
    questions: [
      {
        q: "Why does a vanilla RNN struggle to learn dependencies 50 steps apart?",
        options: [
          "The hidden state is too small to store them",
          "Backpropagation multiplies by the recurrent weight once per step, so the gradient decays or explodes exponentially",
          "The tanh activation saturates immediately",
          "Sequences that long exceed the batch size",
        ],
        answer: 1,
        why: "The gradient reaching step 1 from step t scales roughly as wᵗ. Anything below 1 vanishes exponentially, anything above explodes. At 50 steps with w = 0.9 the signal is about 0.005 of its original size — no learning reaches that far back.",
      },
      {
        q: "What specifically makes the LSTM cell state a better gradient path?",
        options: [
          "It is larger than the hidden state",
          "It is updated by gated addition, so the backward path is a multiplication by the forget gate alone",
          "It uses ReLU instead of tanh",
          "It is reset at every timestep",
        ],
        answer: 1,
        why: "c_t = f_t ⊙ c_(t−1) + i_t ⊙ c̃_t. The route from c_(t−1) to c_t involves no weight matrix — only the forget gate. If the network learns to hold that gate near 1, gradients pass through nearly unchanged.",
      },
      {
        q: "Gradient clipping is standard practice. Which problem does it solve?",
        options: [
          "Vanishing gradients",
          "Exploding gradients",
          "Both equally",
          "Neither; it speeds up training",
        ],
        answer: 1,
        why: "Clipping caps the norm of a gradient that has grown too large, which is cheap and effective. It does nothing for vanishing, because you cannot restore information from a signal already multiplied down to zero. That needed an architectural fix.",
      },
    ],
  },
  {
    id: "genai-peft",
    topic: "PEFT",
    label: "PEFT & LoRA",
    path: "/genai/peft",
    icon: "🎛️",
    tone: "indigo",
    questions: [
      {
        q: "LoRA initialises B to zero and A randomly. Why does B start at zero?",
        options: [
          "To save memory during the first epoch",
          "So the adapter is a no-op at step one and training begins from the unmodified base model",
          "Because zero is the optimal final value",
          "To prevent the rank from collapsing",
        ],
        answer: 1,
        why: "B·A is zero when B is zero, so the model at step one is exactly the pretrained model. Training starts from a known-good point rather than from randomly damaged weights, which is why LoRA needs no repair warmup.",
      },
      {
        q: "Which saving from LoRA most often decides whether a project is feasible?",
        options: [
          "The small adapter file size",
          "The reduced optimiser and gradient memory during training",
          "Faster inference",
          "Smaller training datasets",
        ],
        answer: 1,
        why: "Gradients and Adam moments exist only for trainable parameters. Cutting trainable parameters by three orders of magnitude removes most of the training-time memory, which is what moves a large fine-tune onto hardware you actually have. Inference speed is unchanged, and the file size is merely convenient.",
      },
      {
        q: "Quality is short. You can either double the rank or attach adapters to more modules. Which usually helps more?",
        options: [
          "Double the rank",
          "Attach to more modules at the same rank",
          "They are equivalent",
          "Neither; increase the learning rate",
        ],
        answer: 1,
        why: "Published ablations consistently favour breadth over depth here. Adding the MLP projections to an attention-only configuration typically beats doubling r on attention alone, for a similar parameter budget.",
      },
    ],
  },
  {
    id: "genai-tokens",
    topic: "Tokenization",
    label: "Tokenization",
    path: "/genai/tokenization",
    icon: "🔤",
    tone: "purple",
    questions: [
      {
        q: "Why can a subword tokenizer never produce an out-of-vocabulary token?",
        options: [
          "Its vocabulary contains every word in the language",
          "Unknown words decompose into smaller known pieces, down to single characters or bytes",
          "It replaces unknown words with the nearest known word",
          "It rejects inputs containing unknown words",
        ],
        answer: 1,
        why: "The vocabulary includes all the atomic units, so any string has at least one valid segmentation. A rare word simply costs more tokens. Byte-level BPE takes this further and can encode literally any byte sequence.",
      },
      {
        q: "BPE and WordPiece differ in one line. What is it?",
        options: [
          "BPE works on characters, WordPiece on words",
          "BPE merges the most frequent pair; WordPiece merges the pair that most increases likelihood",
          "BPE is greedy, WordPiece is exhaustive",
          "WordPiece cannot handle non-English text",
        ],
        answer: 1,
        why: "WordPiece scores candidates by freq(ab) / (freq(a)·freq(b)), which asks whether a pair co-occurs more than chance would predict. BPE just counts. The second question is better at distinguishing a real morpheme from two common pieces that happen to sit next to each other.",
      },
      {
        q: "A model struggles to count the letters in a word. What is the actual cause?",
        options: [
          "Insufficient training data on spelling",
          "The model never sees individual letters — the word arrives as two or three subword chunks",
          "The attention mechanism cannot count",
          "The tokenizer strips repeated letters",
        ],
        answer: 1,
        why: "It is a representation problem, not a reasoning one. You are asking about something that is not in the input the model receives. No amount of prompting fixes it; spelling the word out with spaces does, because that changes the tokenization.",
      },
    ],
  },
  {
    id: "rag-core",
    topic: "RAG",
    label: "RAG & Retrieval",
    path: "/rag/fundamentals",
    icon: "🔍",
    tone: "blue",
    questions: [
      {
        q: "When is fine-tuning the wrong tool for adding company knowledge to a model?",
        options: [
          "Whenever the company is small",
          "When the knowledge changes, or answers must cite a source",
          "When you have more than 1000 documents",
          "Fine-tuning is always wrong for knowledge",
        ],
        answer: 1,
        why: "Weights cannot be cited and cannot be updated without retraining. If the facts move or an answer has to point at its source, retrieval is the right mechanism. For a small, fixed, unattributed body of facts, fine-tuning is defensible.",
      },
      {
        q: "Your RAG answers are poor. What should you measure first?",
        options: [
          "End-to-end answer quality",
          "Retrieval quality on its own, such as recall at k",
          "Model latency",
          "Embedding dimension",
        ],
        answer: 1,
        why: "End-to-end quality cannot tell you whether retrieval missed the document or generation ignored it. Those have completely different fixes. Score the retriever separately and you know which half to work on.",
      },
      {
        q: "Contextual compression cuts context by 60%. Besides cost, what else usually improves?",
        options: [
          "Retrieval recall",
          "Answer accuracy, because models attend less reliably to the middle of a long context",
          "Embedding quality",
          "Index build time",
        ],
        answer: 1,
        why: "The lost-in-the-middle effect is well documented and does not go away with larger context windows. Less padding means less middle for the relevant material to get buried in, so accuracy often rises even where budget was never the constraint.",
      },
      {
        q: "You fine-tune a model on clean question/answer pairs, then deploy it in a RAG pipeline. What is the likely failure?",
        options: [
          "The model becomes slower",
          "The model answers from its weights and underuses the retrieved context",
          "Retrieval stops working",
          "Embeddings become incompatible",
        ],
        answer: 1,
        why: "You trained it on prompts with no context, so it learned to answer without one. Training examples must be shaped like production prompts — retrieved documents included — or tuning actively undermines the retrieval you built.",
      },
    ],
  },
  {
    id: "agents-core",
    topic: "Agents",
    label: "Agents & Reliability",
    path: "/agents",
    icon: "🕸️",
    tone: "emerald",
    questions: [
      {
        q: "Each step of your agent succeeds 95% of the time. It runs 10 steps. Roughly what is the end-to-end success rate?",
        options: ["95%", "85%", "60%", "50%"],
        answer: 2,
        why: "0.95¹⁰ ≈ 0.599. Errors compound multiplicatively, which is why agent engineering is mostly about shortening runs, verifying intermediate results, and making steps retryable rather than about finding a better prompt.",
      },
      {
        q: "What distinguishes A2A from MCP?",
        options: [
          "A2A is faster",
          "MCP connects an agent to its tools; A2A connects an agent to autonomous peer agents",
          "A2A replaces MCP",
          "MCP is for local use, A2A for cloud",
        ],
        answer: 1,
        why: "Different axes. MCP exposes tools that execute what they are told. A2A exposes skills belonging to an autonomous peer that decides how to do the work. A single system commonly uses both — A2A sideways, MCP downward.",
      },
      {
        q: "Which failure mode is most dangerous in production?",
        options: [
          "An infinite loop",
          "A tool call that raises an exception",
          "A run that completes successfully with a wrong answer",
          "Context window overflow",
        ],
        answer: 2,
        why: "The other three are visible: something hangs, errors, or truncates. A silently wrong answer looks identical to a correct one from the outside. That is why you assert on outputs rather than on completion.",
      },
      {
        q: "Why do conversational multi-agent frameworks need a hard turn cap more urgently than sequential ones?",
        options: [
          "Their models are more expensive",
          "Each agent typically sees the whole transcript, so cost grows roughly with the square of the turn count",
          "They cannot detect completion",
          "They use more memory on the client",
        ],
        answer: 1,
        why: "Turn 12 sends turns 1 through 11 as input. Summed over a run, input tokens grow quadratically in turns. An agent loop that does not terminate does not just hang — it bills the whole time.",
      },
    ],
  },
];

export const findQuiz = (id) => QUIZZES.find((q) => q.id === id);
export const questionsFor = (id) => findQuiz(id)?.questions ?? [];

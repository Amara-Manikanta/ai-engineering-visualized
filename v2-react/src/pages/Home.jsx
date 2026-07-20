import GlobalHeader from "../components/GlobalHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      <GlobalHeader />
      <div className="max-w-[1200px] mx-auto px-5 py-20 text-center">
        <h1 className="text-5xl font-black text-white mb-6">AI Engineering <span className="text-indigo-400">Visualized</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A beautiful, interactive, step-by-step animated explainer for modern AI Engineering concepts.
        </p>
      </div>
    </div>
  );
}

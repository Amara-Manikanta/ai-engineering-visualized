import React, { useState } from "react";
import { Link } from "react-router-dom";
import GuideLayout from "../components/GuideLayout";
import KnowledgeCheck from "../components/KnowledgeCheck";
import { QUIZZES } from "../data/quizBank";

const TONES = {
  amber: "border-amber-500/30 bg-amber-500/[0.08] hover:border-amber-500/60",
  indigo: "border-indigo-500/30 bg-indigo-500/[0.08] hover:border-indigo-500/60",
  blue: "border-blue-500/30 bg-blue-500/[0.08] hover:border-blue-500/60",
  rose: "border-rose-500/30 bg-rose-500/[0.08] hover:border-rose-500/60",
  purple: "border-purple-500/30 bg-purple-500/[0.08] hover:border-purple-500/60",
  emerald: "border-emerald-500/30 bg-emerald-500/[0.08] hover:border-emerald-500/60",
};

export default function QuizIndex() {
  const [active, setActive] = useState(null);
  const quiz = QUIZZES.find((q) => q.id === active);

  const total = QUIZZES.reduce((a, q) => a + q.questions.length, 0);

  const toc = [
    { label: "Pick a Topic", hash: "pick" },
    ...(quiz ? [{ label: quiz.label, hash: "quiz" }] : []),
    { label: "How to Use These", hash: "how" },
  ];

  return (
    <GuideLayout
      title="Knowledge Checks"
      intro={`${total} questions across ${QUIZZES.length} topics. Each one tests whether the reasoning landed, not whether you memorised a term.`}
      toc={toc}
    >
      <section id="pick" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-5">Pick a Topic</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUIZZES.map((q) => (
            <button
              key={q.id}
              onClick={() => {
                setActive(q.id === active ? null : q.id);
                if (q.id !== active) {
                  setTimeout(() => {
                    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 60);
                }
              }}
              className={`text-left p-5 rounded-xl border transition-colors ${
                TONES[q.tone] || TONES.indigo
              } ${active === q.id ? "ring-1 ring-white/30" : ""}`}
            >
              <div className="text-2xl mb-2">{q.icon}</div>
              <div className="font-semibold text-white text-sm mb-1">{q.label}</div>
              <div className="text-xs text-gray-400">
                {q.questions.length} question{q.questions.length === 1 ? "" : "s"}
              </div>
            </button>
          ))}
        </div>
      </section>

      {quiz && (
        <section id="quiz" className="mb-12 scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white m-0">{quiz.label}</h2>
            <Link
              to={quiz.path}
              className="text-xs font-semibold text-blue-400 hover:underline shrink-0"
            >
              Read the guide →
            </Link>
          </div>
          <KnowledgeCheck key={quiz.id} questions={quiz.questions} title={`${quiz.icon} ${quiz.topic}`} />
        </section>
      )}

      <section id="how" className="mb-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">How to Use These</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {[
            [
              "Answer before reading",
              "Try the questions for a topic before you read its guide. Getting one wrong first makes the explanation stick far better than reading it cold.",
            ],
            [
              "The explanation is the content",
              "Every answer carries a short argument for why it is right and why the near-misses are wrong. Several of them cover points the guides only touch in passing.",
            ],
            [
              "Nothing is scored",
              "No persistence, no account, no tracking. The count resets when you leave the page, because the point is the reasoning rather than a number.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="text-sm font-semibold text-white mb-2">{t}</div>
              <p className="text-xs text-gray-400 leading-relaxed m-0">{d}</p>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-sm text-gray-400 leading-relaxed m-0">
            The same checks appear at the foot of their own guide pages. For a structured route through the material
            see <a href="#/roadmaps" className="text-blue-400 hover:underline">Learning Paths</a>, or{" "}
            <a href="#/graph" className="text-blue-400 hover:underline">the topic map</a> for how everything connects.
          </p>
        </div>
      </section>
    </GuideLayout>
  );
}

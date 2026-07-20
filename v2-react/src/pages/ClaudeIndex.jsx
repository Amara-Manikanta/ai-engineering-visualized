import React from 'react';
import { motion } from 'framer-motion';
import GuideLayout from '../components/GuideLayout';

export default function ClaudeIndex() {
  const toc = [
    { label: "Features Grid", hash: "features-grid" }
  ];

  const features = [
    { num: "1", title: "CLAUDE.md", icon: "📄", color: "orange", desc: "Project memory file — custom rules, stack info, and commands Claude reads every session." },
    { num: "2", title: "Permissions", icon: "🔒", color: "cyan", desc: "Control what Claude can and can't touch — whitelist or block tools per session." },
    { num: "3", title: "Plan Mode", icon: "📝", color: "purple", desc: "Review the plan before Claude acts — approve, edit, or reject each step first." },
    { num: "4", title: "Checkpoints", icon: "⏱️", color: "green", desc: "Revert to any point in time — automatic git snapshots let you undo any mistake." },
    { num: "5", title: "Skills", icon: "🛠️", color: "orange", desc: "Reusable instructions Claude follows automatically — store in .claude/skills/." },
    { num: "6", title: "Hooks", icon: "⚡", color: "cyan", desc: "Run custom logic at key moments — shell scripts on PreToolUse, PostToolUse events." },
    { num: "7", title: "MCP", icon: "🔌", color: "green", desc: "Connect Claude to any external tool — databases, APIs, and services via Model Context Protocol." },
    { num: "8", title: "Plugins", icon: "🧩", color: "pink", desc: "Extend Claude with third-party integrations — add tools without writing custom code." },
    { num: "9", title: "Context", icon: "🧠", color: "green", desc: "Feed Claude what it needs and manage the current context — files, history, and rules." },
    { num: "10", title: "Slash Commands", icon: "⌨️", color: "purple", desc: "Trigger actions with a single command — store templates in .claude/commands/." },
    { num: "11", title: "Compaction", icon: "🗜️", color: "cyan", desc: "Compress long conversations to save tokens — keep context fresh without losing key info." },
    { num: "12", title: "Subagents", icon: "🤖", color: "purple", desc: "Spawn parallel agents for complex tasks — divide and conquer multi-step workflows." }
  ];

  const getColorClass = (color) => {
    const colors = {
      orange: "border-orange-500/50 bg-orange-500/10 text-orange-400",
      cyan: "border-cyan-500/50 bg-cyan-500/10 text-cyan-400",
      purple: "border-purple-500/50 bg-purple-500/10 text-purple-400",
      green: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
      pink: "border-pink-500/50 bg-pink-500/10 text-pink-400"
    };
    return colors[color] || colors.orange;
  };

  const getHeaderColorClass = (color) => {
    const colors = {
      orange: "bg-orange-500/20 text-orange-200 border-b border-orange-500/30",
      cyan: "bg-cyan-500/20 text-cyan-200 border-b border-cyan-500/30",
      purple: "bg-purple-500/20 text-purple-200 border-b border-purple-500/30",
      green: "bg-emerald-500/20 text-emerald-200 border-b border-emerald-500/30",
      pink: "bg-pink-500/20 text-pink-200 border-b border-pink-500/30"
    };
    return colors[color] || colors.orange;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <GuideLayout
      title="12 Features Every Engineer Must Know"
      intro="Master your AI coding assistant with these powerful workflows and configuration options."
      toc={toc}
    >
      <section id="features-grid" className="mb-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`rounded-xl border backdrop-blur-sm overflow-hidden flex flex-col ${getColorClass(f.color).split(' ')[0]} bg-[#0a0a0a]/80`}
            >
              <div className={`px-4 py-2 font-bold flex items-center gap-3 ${getHeaderColorClass(f.color)}`}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/30 text-sm">
                  {f.num}
                </span>
                {f.title}
              </div>
              <div className="p-5 flex-1 flex flex-col items-start gap-3">
                <div className={`text-4xl ${getColorClass(f.color).split(' ')[2]}`}>
                  {f.icon}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </GuideLayout>
  );
}

import React, { useState } from 'react';
import { Mic2, Sparkles, Play, FileText, Zap, Send } from 'lucide-react';

interface StudioToolsProps {
  onCustomGenerate: (topic: string, niche: string, tone: string) => void;
  onOpenTeleprompter: (text: string) => void;
  isGenerating: boolean;
}

export const StudioTools: React.FC<StudioToolsProps> = ({
  onCustomGenerate,
  onOpenTeleprompter,
  isGenerating,
}) => {
  const [customTopic, setCustomTopic] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('Tech & AI');
  const [selectedTone, setSelectedTone] = useState('High Energy');
  const [pasteScriptText, setPasteScriptText] = useState('');

  const niches = [
    'Tech & AI',
    'Gaming & Esports',
    'Finance & Crypto',
    'Vlogging & Lifestyle',
    'Coding & Career',
    'Mystery & Historical Facts',
    'Motivation & Self Improvement',
  ];

  const tones = [
    'High Energy & Hype',
    'Informative & Step-by-Step',
    'Storytelling & Suspenseful',
    'Controversial & Debate',
  ];

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) {
      alert('Please enter a video topic or headline.');
      return;
    }
    onCustomGenerate(customTopic.trim(), selectedNiche, selectedTone);
  };

  return (
    <div className="space-y-5 pb-24 text-gray-100">
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-[#1a1a22] via-[#121216] to-[#0d0d10] p-4 rounded-2xl border border-amber-500/30">
        <div className="flex items-center space-x-1.5 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
          <Mic2 className="w-4 h-4 text-amber-400" />
          <span>Creator Studio Tools</span>
        </div>
        <h2 className="text-lg font-black text-amber-100 mt-1">Custom Script & Prompter Studio</h2>
        <p className="text-xs text-amber-200/60 mt-0.5">
          Generate custom Hinglish video packages or paste your own script for live teleprompter delivery.
        </p>
      </div>

      {/* Tool 1: AI Custom Content Generator */}
      <form
        onSubmit={handleSubmitCustom}
        className="bg-[#121216] rounded-2xl p-4 border border-amber-500/20 space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-amber-100">Custom Hinglish Video Generator</h3>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-amber-300 font-bold uppercase">
            Video Topic / Headline / Keyword:
          </label>
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="e.g. Secret WhatsApp features nobody knows in 2026..."
            className="w-full bg-[#0a0a0c] border border-amber-500/20 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
            required
          />
        </div>

        {/* Niche & Tone Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-amber-300 uppercase font-bold">Niche:</label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
            >
              {niches.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-amber-300 uppercase font-bold">Script Tone:</label>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
            >
              {tones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 fill-black ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Drafting Custom Script & Package...' : 'Generate Full Video Package'}</span>
        </button>
      </form>

      {/* Tool 2: Instant Teleprompter Notepad */}
      <div className="bg-[#121216] rounded-2xl p-4 border border-amber-500/20 space-y-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-amber-100">Quick Teleprompter Launcher</h3>
        </div>

        <p className="text-xs text-amber-200/60">
          Have your own custom Hinglish script? Paste it here to launch the live auto-scrolling teleprompter!
        </p>

        <textarea
          rows={4}
          value={pasteScriptText}
          onChange={(e) => setPasteScriptText(e.target.value)}
          placeholder="Paste custom script or notes here..."
          className="w-full bg-[#0a0a0c] border border-amber-500/20 rounded-xl p-3 text-xs text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-amber-400 font-sans"
        />

        <button
          onClick={() => {
            if (!pasteScriptText.trim()) {
              alert('Please paste or write some script text first.');
              return;
            }
            onOpenTeleprompter(pasteScriptText);
          }}
          className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-amber-300" />
          <span>Launch Teleprompter with Custom Script</span>
        </button>
      </div>

      {/* Tool 3: Export App Source Code & Android APK Bundle */}
      <div className="bg-[#121216] rounded-2xl p-4 border border-amber-500/30 space-y-3 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-amber-100">Export Source Code & Android Package</h3>
          </div>
          <span className="text-[10px] font-mono bg-green-950 text-green-400 px-2 py-0.5 rounded border border-green-500/30">
            BUILD READY
          </span>
        </div>

        <p className="text-xs text-amber-200/70">
          Download the full React + Vite TypeScript project source code or generate the Android App manifest & PWA bundle for mobile deployment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => {
              const projectMeta = {
                name: 'Creator AI - Daily YouTube Video Drops',
                version: '1.0.0',
                techStack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express Server', 'Gemini AI'],
                exportedAt: new Date().toISOString(),
                instructions: 'To run locally: 1. Unzip, 2. npm install, 3. npm run dev',
              };
              const blob = new Blob([JSON.stringify(projectMeta, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'creator-ai-source-package.json';
              a.click();
              URL.revokeObjectURL(url);
              alert('Package Meta & Export configuration downloaded! Use AI Studio top menu (Settings -> Export ZIP / GitHub) to download the entire repository ZIP archive.');
            }}
            className="py-2.5 px-3 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Source ZIP Info</span>
          </button>

          <button
            onClick={() => {
              const webManifest = {
                short_name: 'Creator AI',
                name: 'Creator AI - YouTube Daily Video Drops',
                icons: [
                  {
                    src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%230a0a0c"/><text x="50" y="65" font-size="50" text-anchor="middle">🚀</text></svg>',
                    sizes: '192x192 512x512',
                    type: 'image/svg+xml',
                  },
                ],
                start_url: '/',
                background_color: '#0a0a0c',
                theme_color: '#D4AF37',
                display: 'standalone',
                orientation: 'portrait',
              };
              const blob = new Blob([JSON.stringify(webManifest, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'manifest.json';
              a.click();
              URL.revokeObjectURL(url);
              alert('Android Web App Manifest downloaded! You can install Creator AI directly on Android as a native PWA app or wrap with Bubblewrap/TWA for Google Play APK distribution.');
            }}
            className="py-2.5 px-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:opacity-90 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(255,215,0,0.2)]"
          >
            <Send className="w-3.5 h-3.5 fill-black" />
            <span>Export Android Package / APK</span>
          </button>
        </div>
      </div>
    </div>
  );
};

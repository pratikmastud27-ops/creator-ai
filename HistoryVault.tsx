import React, { useState } from 'react';
import { VideoIdeaPackage } from '../types';
import {
  History,
  Search,
  Star,
  Trash2,
  Play,
  Copy,
  Check,
  Download,
  Calendar,
  Flame,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface HistoryVaultProps {
  ideas: VideoIdeaPackage[];
  onSelectIdea: (idea: VideoIdeaPackage) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteIdea: (id: string) => void;
  onOpenTeleprompter: (scriptText: string) => void;
}

export const HistoryVault: React.FC<HistoryVaultProps> = ({
  ideas,
  onSelectIdea,
  onToggleFavorite,
  onDeleteIdea,
  onOpenTeleprompter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredIdeas = ideas.filter((idea) => {
    const matchesFav = !onlyFavorites || idea.isFavorite;
    const matchesSearch =
      idea.ideaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.trendingTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.niche.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFav && matchesSearch;
  });

  const handleCopyScript = (scriptText: string, id: string) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportTXT = (idea: VideoIdeaPackage) => {
    const textContent = `=========================================
CREATOR AI - YOUTUBE CONTENT PACKAGE
=========================================
Date: ${idea.date}
Topic: ${idea.trendingTopic}
Niche: ${idea.niche}
Viral Score: ${idea.viralScore}/100

-----------------------------------------
MAIN TITLE:
${idea.ideaTitle}

SEO TITLE:
${idea.seoTitle}

ALTERNATIVE TITLES:
${(idea.alternativeTitles || []).map((t, i) => `${i + 1}. ${t}`).join('\n')}

-----------------------------------------
HINGLISH SCRIPT:
${idea.hinglishScript?.fullText || ''}

-----------------------------------------
DESCRIPTION:
${idea.description}

-----------------------------------------
HASHTAGS:
${(idea.hashtags || []).join(' ')}

-----------------------------------------
THUMBNAIL CONCEPT:
Overlay Text: ${idea.thumbnailConcept?.headlineText || ''}
Visuals: ${(idea.thumbnailConcept?.visualElements || []).join(', ')}
Expression: ${idea.thumbnailConcept?.expression || ''}
Prompt: ${idea.thumbnailConcept?.imagePrompt || ''}
`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CreatorAI_${idea.ideaTitle.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 pb-24 text-gray-100">
      {/* Vault Banner */}
      <div className="bg-gradient-to-r from-[#181820] via-[#121216] to-[#0d0d10] p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-1.5 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            <History className="w-4 h-4 text-amber-400" />
            <span>Vault History ({ideas.length})</span>
          </div>
          <h2 className="text-lg font-black text-amber-100 mt-1">Saved YouTube Daily Ideas</h2>
          <p className="text-xs text-amber-200/60 mt-0.5">
            Access previous scripts, SEO titles, and thumbnail ideas anytime offline.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved ideas, scripts or topics..."
            className="w-full bg-[#121216] border border-amber-500/20 rounded-xl pl-10 pr-4 py-2 text-xs text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
            onlyFavorites
              ? 'bg-amber-400 text-black border-amber-400'
              : 'bg-[#121216] text-amber-300 border-amber-500/30 hover:bg-amber-500/10'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-black' : 'fill-amber-400 text-amber-400'}`} />
          <span>Starred</span>
        </button>
      </div>

      {/* List of Saved Ideas */}
      <div className="space-y-3">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="bg-[#121216] p-4 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[10px] font-mono">
                    <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {idea.date}
                    </span>
                    <span className="text-gray-400">{idea.niche}</span>
                  </div>
                  <h3
                    onClick={() => onSelectIdea(idea)}
                    className="text-sm font-bold text-amber-100 hover:text-amber-300 cursor-pointer transition-colors line-clamp-2"
                  >
                    "{idea.ideaTitle}"
                  </h3>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onToggleFavorite(idea.id)}
                    className="p-1.5 text-amber-300 hover:text-amber-400"
                    title="Toggle Favorite"
                  >
                    <Star className={`w-4 h-4 ${idea.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`} />
                  </button>
                  <button
                    onClick={() => onDeleteIdea(idea.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400"
                    title="Delete Idea"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Topic & Script Preview snippet */}
              <div className="bg-[#0a0a0c] p-2.5 rounded-lg border border-amber-500/10 text-xs text-amber-200/70 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Topic: {idea.trendingTopic}</span>
                </div>
                <p className="line-clamp-2 italic text-[11px] font-sans">
                  "{idea.hinglishScript?.hook || ''}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1 gap-2 flex-wrap text-xs">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onOpenTeleprompter(idea.hinglishScript?.fullText || '')}
                    className="flex items-center gap-1 font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2.5 py-1 rounded-lg border border-amber-500/30"
                  >
                    <Play className="w-3 h-3 fill-amber-300" />
                    <span>Prompter</span>
                  </button>

                  <button
                    onClick={() => handleCopyScript(idea.hinglishScript?.fullText || '', idea.id)}
                    className="flex items-center gap-1 text-gray-300 hover:text-amber-200 bg-[#1a1a20] px-2 py-1 rounded border border-gray-800"
                  >
                    {copiedId === idea.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === idea.id ? 'Copied' : 'Script'}</span>
                  </button>

                  <button
                    onClick={() => handleExportTXT(idea)}
                    className="p-1.5 text-amber-300 hover:text-amber-200 bg-[#1a1a20] rounded border border-gray-800"
                    title="Export as TXT file"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => onSelectIdea(idea)}
                  className="flex items-center gap-1 text-amber-300 font-bold hover:underline font-mono text-xs"
                >
                  <span>Open Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#121216] p-8 rounded-xl border border-dashed border-amber-500/20 text-center space-y-2">
            <History className="w-8 h-8 text-amber-400/40 mx-auto" />
            <p className="text-xs text-amber-200/70">No saved ideas in your vault matching search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

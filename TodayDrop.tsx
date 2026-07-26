import React, { useState } from 'react';
import { VideoIdeaPackage } from '../types';
import { VideoPlayerStudio } from './VideoPlayerStudio';
import {
  Sparkles,
  Flame,
  Copy,
  Check,
  Play,
  Share2,
  Bookmark,
  RefreshCw,
  Image,
  Hash,
  FileText,
  Lightbulb,
  Layers,
  ListOrdered,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface TodayDropProps {
  idea: VideoIdeaPackage;
  onOpenTeleprompter: (scriptText: string) => void;
  onToggleFavorite: (id: string) => void;
  onRefreshDailyIdea: () => void;
  isLoadingNewIdea: boolean;
}

export const TodayDrop: React.FC<TodayDropProps> = ({
  idea,
  onOpenTeleprompter,
  onToggleFavorite,
  onRefreshDailyIdea,
  isLoadingNewIdea,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showEvaluatedTopics, setShowEvaluatedTopics] = useState(false);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [generatedThumbnailUrl, setGeneratedThumbnailUrl] = useState<string | null>(null);

  if (!idea) return null;

  const handleCopy = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleGenerateThumbnail = async () => {
    try {
      setIsGeneratingThumbnail(true);
      const res = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: idea.thumbnailConcept?.imagePrompt }),
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        setGeneratedThumbnailUrl(data.imageUrl);
      } else {
        alert(data.error || 'Failed to render thumbnail mockup.');
      }
    } catch (err) {
      console.error('Thumbnail generation failed:', err);
      alert('Error rendering thumbnail image.');
    } finally {
      setIsGeneratingThumbnail(false);
    }
  };

  const hashtagsFormatted = Array.isArray(idea.hashtags)
    ? idea.hashtags.map((h) => (h.startsWith('#') ? h : `#${h}`))
    : [];

  return (
    <div className="space-y-4 pb-24 text-gray-100">
      {/* 8:00 AM Autonomous AI Drop Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-950/20 border border-amber-500/40 rounded-2xl p-4 shadow-[0_0_25px_rgba(212,175,55,0.15)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="px-2.5 py-1 rounded-full bg-amber-400 text-black font-extrabold text-[10px] font-mono tracking-wider uppercase flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 fill-black" />
              <span>8:00 AM Autonomous Drop</span>
            </div>
            <span className="text-[10px] text-amber-200/60 font-mono">{idea.date}</span>
          </div>

          <button
            onClick={onRefreshDailyIdea}
            disabled={isLoadingNewIdea}
            className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isLoadingNewIdea ? 'animate-spin' : ''}`} />
            <span>Generate Next Drop</span>
          </button>
        </div>

        {/* Idea Main Title */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>Viral Score: {idea.viralScore}/100</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-amber-100 leading-snug">
            {idea.ideaTitle}
          </h1>
          <p className="text-xs text-amber-200/70 leading-relaxed">{idea.angle}</p>
        </div>

        {/* 10 Evaluated Topics Accordion */}
        {idea.top10TopicsEvaluated && idea.top10TopicsEvaluated.length > 0 && (
          <div className="bg-[#0a0a0c] rounded-xl border border-amber-500/20 overflow-hidden text-xs">
            <button
              onClick={() => setShowEvaluatedTopics(!showEvaluatedTopics)}
              className="w-full p-2.5 flex items-center justify-between text-amber-300 font-mono font-bold hover:bg-amber-500/10 transition-colors"
            >
              <div className="flex items-center space-x-1.5">
                <ListOrdered className="w-3.5 h-3.5" />
                <span>AI Scanned 10 Trending Topics at 8:00 AM</span>
              </div>
              {showEvaluatedTopics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showEvaluatedTopics && (
              <div className="p-3 pt-0 border-t border-amber-500/10 space-y-2">
                {idea.aiReasoningForSelection && (
                  <p className="text-[11px] text-amber-200/80 italic bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                    💡 <strong className="text-amber-300">AI Selection Reason:</strong> {idea.aiReasoningForSelection}
                  </p>
                )}
                <div className="space-y-1">
                  {idea.top10TopicsEvaluated.map((top, idx) => (
                    <div
                      key={idx}
                      className={`p-1.5 rounded text-[11px] font-mono ${
                        top.includes('(SELECTED)')
                          ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30 font-bold'
                          : 'text-amber-200/50'
                      }`}
                    >
                      {top}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Complete AI Video Studio & AI Voice Player */}
      <VideoPlayerStudio
        production={idea.videoProduction}
        voice={idea.aiVoice}
        scriptText={idea.hinglishScript?.fullText || ''}
        title={idea.ideaTitle}
      />

      {/* SEO Title & Description Package */}
      <div className="bg-[#121216] rounded-2xl p-4 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
          <h3 className="text-xs font-mono font-bold uppercase text-amber-300 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>SEO Title & YouTube Description</span>
          </h3>

          <button
            onClick={() => handleCopy(idea.seoTitle + '\n\n' + idea.description, 'all_metadata')}
            className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 hover:bg-amber-500/20"
          >
            {copiedSection === 'all_metadata' ? (
              <>
                <Check className="w-3 h-3 text-green-400" />
                <span>Copied All</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Metadata</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-2">
          <div>
            <label className="text-[10px] font-mono uppercase text-amber-300/80 font-bold">
              SEO Title:
            </label>
            <p className="text-xs font-bold text-amber-100 bg-[#0a0a0c] p-2.5 rounded-xl border border-amber-500/10 mt-1">
              {idea.seoTitle}
            </p>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-amber-300/80 font-bold">
              YouTube Description:
            </label>
            <textarea
              readOnly
              rows={4}
              value={idea.description}
              className="w-full bg-[#0a0a0c] border border-amber-500/10 rounded-xl p-2.5 text-xs text-amber-200/90 font-mono mt-1 focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 20 Viral Hashtags */}
      <div className="bg-[#121216] rounded-2xl p-4 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
          <div className="flex items-center space-x-2">
            <Hash className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono font-bold uppercase text-amber-300">
              20 Viral YouTube Hashtags
            </h3>
          </div>

          <button
            onClick={() => handleCopy(hashtagsFormatted.join(' '), 'hashtags')}
            className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 hover:bg-amber-500/20"
          >
            {copiedSection === 'hashtags' ? (
              <>
                <Check className="w-3 h-3 text-green-400" />
                <span>Copied 20 Tags</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy 20 Hashtags</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {hashtagsFormatted.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded-lg bg-[#0a0a0c] border border-amber-500/20 text-[10px] font-mono text-amber-300 font-semibold hover:border-amber-400 transition-colors cursor-pointer"
              onClick={() => handleCopy(tag, `tag-${idx}`)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Full Hinglish Script & Teleprompter */}
      <div className="bg-[#121216] rounded-2xl p-4 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono font-bold uppercase text-amber-300">
              Complete Hinglish Script
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOpenTeleprompter(idea.hinglishScript?.fullText || '')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold text-xs shadow-md hover:opacity-90"
            >
              <Play className="w-3 h-3 fill-black" />
              <span>Launch Teleprompter</span>
            </button>
          </div>
        </div>

        <div className="bg-[#0a0a0c] p-3 rounded-xl border border-amber-500/10 space-y-2 text-xs font-mono leading-relaxed text-amber-100 max-h-60 overflow-y-auto">
          <p className="whitespace-pre-wrap">{idea.hinglishScript?.fullText}</p>
        </div>
      </div>

      {/* Thumbnail Concept & AI Image Renderer */}
      <div className="bg-[#121216] rounded-2xl p-4 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
          <div className="flex items-center space-x-2">
            <Image className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono font-bold uppercase text-amber-300">
              Thumbnail Concept & Prompt
            </h3>
          </div>

          <button
            onClick={handleGenerateThumbnail}
            disabled={isGeneratingThumbnail}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 text-xs font-bold disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isGeneratingThumbnail ? 'Rendering...' : 'Generate AI Thumbnail'}</span>
          </button>
        </div>

        {/* Rendered Thumbnail Preview */}
        {generatedThumbnailUrl ? (
          <div className="space-y-2">
            <img
              src={generatedThumbnailUrl}
              alt="Generated Thumbnail"
              className="w-full aspect-video rounded-xl object-cover border-2 border-amber-400 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            />
            <p className="text-[10px] text-green-400 font-mono text-center font-bold">
              ✨ Generated with Gemini Image AI (16:9 Aspect Ratio)
            </p>
          </div>
        ) : (
          <div className="bg-[#0a0a0c] p-3 rounded-xl border border-amber-500/10 space-y-2 text-xs">
            <div>
              <span className="text-[10px] font-mono text-amber-300 font-bold uppercase">
                Headline Text:
              </span>
              <p className="text-amber-100 font-black text-sm">{idea.thumbnailConcept?.headlineText}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-300 font-bold uppercase">
                16:9 AI Image Prompt:
              </span>
              <p className="text-amber-200/70 font-mono text-[11px]">{idea.thumbnailConcept?.imagePrompt}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

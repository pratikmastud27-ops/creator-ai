import React, { useState } from 'react';
import { TrendingTopicItem } from '../types';
import { TrendingUp, Search, Flame, ArrowUpRight, Sparkles, Filter, RefreshCw } from 'lucide-react';

interface TrendFinderProps {
  topics: TrendingTopicItem[];
  onSelectTopicToGenerate: (topic: string, category: string) => void;
  onRefreshTopics: (category?: string) => void;
  isLoadingTopics: boolean;
}

export const TrendFinder: React.FC<TrendFinderProps> = ({
  topics,
  onSelectTopicToGenerate,
  onRefreshTopics,
  isLoadingTopics,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Tech & AI',
    'Gaming',
    'Finance & Career',
    'Vlogging',
    'Mystery & Facts',
    'Coding',
  ];

  const filteredTopics = topics.filter((t) => {
    const matchesCat = selectedCategory === 'All' || t.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesQuery =
      t.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-4 pb-24 text-gray-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1a1a22] via-[#121216] to-[#0d0d10] p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-1.5 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>YouTube Trend Radar</span>
          </div>
          <h2 className="text-lg font-black text-amber-100 mt-1">
            Real-Time YouTube Topic Analysis
          </h2>
          <p className="text-xs text-amber-200/60 mt-0.5">
            Grounded live with Google Search for highest search velocity topics in India & globally.
          </p>
        </div>

        <button
          onClick={() => onRefreshTopics(selectedCategory !== 'All' ? selectedCategory : undefined)}
          disabled={isLoadingTopics}
          className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition-colors disabled:opacity-50"
          title="Scan Live YouTube Trends"
        >
          <RefreshCw className={`w-4 h-4 ${isLoadingTopics ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Search Bar & Category Pills */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search YouTube keywords, topics or news..."
            className="w-full bg-[#121216] border border-amber-500/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                onRefreshTopics(cat !== 'All' ? cat : undefined);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all text-xs font-medium ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(255,215,0,0.3)]'
                  : 'bg-[#121216] text-amber-200/70 border border-amber-500/20 hover:text-amber-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics List Grid */}
      <div className="space-y-3">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topicItem) => (
            <div
              key={topicItem.id}
              className="bg-[#121216] p-4 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-colors space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold uppercase">
                      {topicItem.category}
                    </span>
                    <span className="text-[10px] font-mono text-green-400 font-bold bg-green-950/40 px-2 py-0.5 rounded border border-green-500/30">
                      {topicItem.growthRate} Search Volume
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {topicItem.topic}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-amber-200/60 block">Est Volume</span>
                  <span className="text-xs font-bold text-amber-300 font-mono">{topicItem.searchVolume}</span>
                </div>
              </div>

              <p className="text-xs text-amber-100/80 leading-relaxed bg-[#0a0a0c] p-2.5 rounded-lg border border-amber-500/10">
                {topicItem.description}
              </p>

              {/* Creator Suggested Angle */}
              <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                <div className="text-xs text-amber-200/70">
                  <span className="font-bold text-amber-400 font-mono text-[10px] uppercase">Viral Angle: </span>
                  {topicItem.suggestedAngle}
                </div>

                <button
                  onClick={() => onSelectTopicToGenerate(topicItem.topic, topicItem.category)}
                  className="flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity ml-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>Generate Full Script & Package</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#121216] p-8 rounded-xl border border-dashed border-amber-500/20 text-center space-y-2">
            <Flame className="w-8 h-8 text-amber-400/40 mx-auto" />
            <p className="text-xs text-amber-200/70">No trending topics matched your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                onRefreshTopics();
              }}
              className="text-xs text-amber-300 font-bold underline"
            >
              Reset Filters & Reload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

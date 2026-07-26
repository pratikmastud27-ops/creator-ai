import React, { useState } from 'react';
import { YouTubeChannelStats } from '../types';
import {
  Youtube,
  TrendingUp,
  Users,
  Eye,
  Clock,
  DollarSign,
  Video,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Link,
  Lock,
} from 'lucide-react';

interface YouTubeDashboardProps {
  stats: YouTubeChannelStats;
  onUpdateStats: (newStats: YouTubeChannelStats) => void;
}

export const YouTubeDashboard: React.FC<YouTubeDashboardProps> = ({ stats, onUpdateStats }) => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [channelInput, setChannelInput] = useState(stats.channelHandle || '@CreatorAITech');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncAnalytics = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onUpdateStats({
        ...stats,
        subscribers: stats.subscribers + Math.floor(Math.random() * 250) + 50,
        totalViews: stats.totalViews + Math.floor(Math.random() * 8000) + 1200,
        watchTimeHours: stats.watchTimeHours + Math.floor(Math.random() * 120) + 20,
      });
      setIsSyncing(false);
    }, 1200);
  };

  const handleConnectChannel = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    setTimeout(() => {
      const handleClean = channelInput.startsWith('@') ? channelInput : `@${channelInput}`;
      onUpdateStats({
        ...stats,
        isConnected: true,
        channelHandle: handleClean,
        channelName: handleClean.replace('@', '').toUpperCase() + ' OFFICIAL',
      });
      setIsSyncing(false);
      setShowConnectModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-4 pb-24 text-gray-100">
      {/* Channel Header Banner */}
      <div className="bg-gradient-to-br from-[#1a1a22] via-[#121216] to-[#0d0d10] p-4 rounded-2xl border border-amber-500/30 shadow-[0_4px_25px_rgba(212,175,55,0.12)]">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={stats.avatarUrl}
                alt={stats.channelName}
                className="w-12 h-12 rounded-full border-2 border-amber-400 object-cover shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              />
              <div className="absolute -bottom-1 -right-1 bg-red-600 p-0.5 rounded-full text-white">
                <Youtube className="w-3 h-3 fill-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-base font-black text-amber-100">{stats.channelName}</h2>
                <CheckCircle2 className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              </div>
              <p className="text-xs text-amber-200/60 font-mono">{stats.channelHandle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSyncAnalytics}
              disabled={isSyncing}
              className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors disabled:opacity-50"
              title="Sync YouTube Live Data"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setShowConnectModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs shadow-md hover:opacity-90"
            >
              <Youtube className="w-3.5 h-3.5 fill-white" />
              <span>{stats.isConnected ? 'Connected' : 'Connect Channel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Metric 1: Subscribers */}
        <div className="bg-[#121216] p-3 rounded-xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <Users className="w-4 h-4" />
            <span className="text-[10px] font-mono text-green-400 font-bold bg-green-950/50 px-1.5 py-0.5 rounded">
              +{stats.subscribersGrowth}%
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase text-amber-200/60">Subscribers</p>
          <p className="text-lg font-black text-amber-100 font-mono">
            {stats.subscribers.toLocaleString()}
          </p>
        </div>

        {/* Metric 2: Total Views */}
        <div className="bg-[#121216] p-3 rounded-xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <Eye className="w-4 h-4" />
            <span className="text-[10px] font-mono text-green-400 font-bold bg-green-950/50 px-1.5 py-0.5 rounded">
              +{stats.viewsGrowth}%
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase text-amber-200/60">Total Views</p>
          <p className="text-lg font-black text-amber-100 font-mono">
            {(stats.totalViews / 1000000).toFixed(2)}M
          </p>
        </div>

        {/* Metric 3: Watch Time */}
        <div className="bg-[#121216] p-3 rounded-xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-mono text-amber-300 font-bold bg-amber-950/50 px-1.5 py-0.5 rounded">
              30 Days
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase text-amber-200/60">Watch Time (Hrs)</p>
          <p className="text-lg font-black text-amber-100 font-mono">
            {(stats.watchTimeHours / 1000).toFixed(1)}K hrs
          </p>
        </div>

        {/* Metric 4: Est Revenue */}
        <div className="bg-[#121216] p-3 rounded-xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-[10px] font-mono text-green-400 font-bold bg-green-950/50 px-1.5 py-0.5 rounded">
              AdSense
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase text-amber-200/60">Est. Revenue</p>
          <p className="text-lg font-black text-green-400 font-mono">
            {stats.estimatedEarnings}
          </p>
        </div>
      </div>

      {/* Visual Subscriber Growth Chart Simulation */}
      <div className="bg-[#121216] p-4 rounded-xl border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-amber-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Subscriber Velocity (Last 30 Days)</span>
          </h3>
          <span className="text-[10px] text-amber-200/60 font-mono">+4,280 new subscribers</span>
        </div>

        {/* Simulated Bar Chart */}
        <div className="h-28 flex items-end justify-between gap-1 pt-4 pb-1 border-b border-amber-500/10">
          {[35, 42, 48, 40, 55, 68, 72, 60, 80, 88, 95, 100].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                style={{ height: `${val}%` }}
                className="w-full bg-gradient-to-t from-amber-600 via-yellow-400 to-amber-300 rounded-t group-hover:brightness-125 transition-all shadow-[0_0_8px_rgba(255,215,0,0.2)]"
              />
              <span className="text-[8px] font-mono text-amber-200/40">d{idx * 2.5 + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Videos Table */}
      <div className="bg-[#121216] rounded-xl p-4 border border-amber-500/20 space-y-3">
        <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-amber-400 flex items-center gap-1.5">
          <Video className="w-3.5 h-3.5" />
          <span>Top Performing Channel Videos</span>
        </h3>

        <div className="space-y-2">
          {(stats.topPerformingVideos || []).map((vid) => (
            <div
              key={vid.id}
              className="bg-[#0a0a0c] p-3 rounded-lg border border-amber-500/10 flex items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5 flex-1 min-w-0">
                <p className="font-bold text-amber-100 truncate">{vid.title}</p>
                <p className="text-[10px] text-amber-200/50 font-mono">{vid.publishedDaysAgo}</p>
              </div>

              <div className="flex items-center space-x-3 font-mono text-right text-[11px] shrink-0">
                <div>
                  <p className="text-amber-300 font-bold">{vid.views}</p>
                  <p className="text-[9px] text-amber-200/50">Views</p>
                </div>
                <div>
                  <p className="text-green-400 font-bold">{vid.ctr}</p>
                  <p className="text-[9px] text-amber-200/50">CTR</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121216] border border-amber-500/30 rounded-2xl max-w-sm w-full p-5 space-y-4 text-amber-100 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <div className="flex items-center space-x-2 text-red-500">
              <Youtube className="w-6 h-6 fill-red-500 text-red-500" />
              <h3 className="text-base font-extrabold text-amber-100">Connect YouTube Channel</h3>
            </div>

            <p className="text-xs text-amber-200/70 leading-relaxed">
              Link your official YouTube handle to sync live subscriber counts, video watch hours, and impression CTR analytics directly inside Creator AI.
            </p>

            <form onSubmit={handleConnectChannel} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-amber-300 uppercase font-bold">
                  YouTube Channel Handle:
                </label>
                <input
                  type="text"
                  value={channelInput}
                  onChange={(e) => setChannelInput(e.target.value)}
                  placeholder="@YourChannelHandle"
                  className="w-full bg-[#0a0a0c] border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400 font-mono"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-3 py-1.5 text-xs text-amber-200/70 hover:text-amber-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl text-xs shadow-md hover:opacity-90 disabled:opacity-50"
                >
                  {isSyncing ? 'Authenticating...' : 'Sync Channel Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

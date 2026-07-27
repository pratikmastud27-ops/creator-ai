import React, { useState, useEffect } from 'react';
import { VideoIdeaPackage, TrendingTopicItem, DailyNotificationConfig, YouTubeChannelStats } from './types';
import { INITIAL_IDEAS, INITIAL_TRENDING_TOPICS, DEFAULT_YOUTUBE_STATS } from './presetIdeas'
import { AndroidHeader } from './components/AndroidHeader';
import { BottomNav, TabType } from './components/BottomNav';
import { TodayDrop } from './components/TodayDrop';
import { YouTubeDashboard } from './components/YouTubeDashboard';
import { ScriptTeleprompterModal } from './components/ScriptTeleprompterModal';
import { TrendFinder } from './components/TrendFinder';
import { HistoryVault } from './components/HistoryVault';
import { StudioTools } from './components/StudioTools';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { Bell, X } from 'lucide-react';

export default function App() {
  // Saved ideas history initialized from localStorage or defaults
  const [ideas, setIdeas] = useState<VideoIdeaPackage[]>(() => {
    try {
      const saved = localStorage.getItem('creator_ai_ideas');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved ideas', e);
    }
    return INITIAL_IDEAS;
  });

  const [activeIdea, setActiveIdea] = useState<VideoIdeaPackage>(ideas[0] || INITIAL_IDEAS[0]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopicItem[]>(INITIAL_TRENDING_TOPICS);
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [teleprompterScript, setTeleprompterScript] = useState<string | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isFrameMode, setIsFrameMode] = useState(true); // Default Android Device Frame
  const [isLoadingNewIdea, setIsLoadingNewIdea] = useState(false);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [notificationToast, setNotificationToast] = useState<{ title: string; body: string } | null>(null);

  // YouTube Stats State
  const [youtubeStats, setYoutubeStats] = useState<YouTubeChannelStats>(() => {
    try {
      const saved = localStorage.getItem('creator_ai_yt_stats');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_YOUTUBE_STATS;
  });

  // Notification Config (Default 08:00 AM)
  const [notificationConfig, setNotificationConfig] = useState<DailyNotificationConfig>(() => {
    try {
      const saved = localStorage.getItem('creator_ai_notif_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      enabled: true,
      time: '08:00',
      notifyTypes: { browser: true, inAppBanner: true },
    };
  });

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('creator_ai_ideas', JSON.stringify(ideas));
    } catch (e) {}
  }, [ideas]);

  useEffect(() => {
    try {
      localStorage.setItem('creator_ai_notif_config', JSON.stringify(notificationConfig));
    } catch (e) {}
  }, [notificationConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('creator_ai_yt_stats', JSON.stringify(youtubeStats));
    } catch (e) {}
  }, [youtubeStats]);

  // Fetch initial daily idea from API on first mount
  useEffect(() => {
    const fetchDailyIdea = async () => {
      try {
        const res = await fetch('/api/daily-idea');
        const data = await res.json();
        if (data.success && data.idea) {
          setIdeas((prev) => {
            const exists = prev.some((item) => item.id === data.idea.id);
            if (!exists) {
              return [data.idea, ...prev];
            }
            return prev.map((item) => (item.id === data.idea.id ? data.idea : item));
          });
          setActiveIdea(data.idea);
        }
      } catch (err) {
        console.warn('Backend server initializing, using local preset idea.', err);
      }
    };
    fetchDailyIdea();
  }, []);

  // Handle Refreshing Daily Idea (8:00 AM Trigger)
  const handleRefreshDailyIdea = async () => {
    try {
      setIsLoadingNewIdea(true);
      const res = await fetch('/api/daily-idea');
      const data = await res.json();
      if (data.success && data.idea) {
        setIdeas((prev) => [data.idea, ...prev]);
        setActiveIdea(data.idea);
        setActiveTab('today');
        triggerNotification(
          "Today's video is ready. 🔥",
          `AI selected: ${data.idea.ideaTitle}`
        );
      } else {
        alert(data.error || 'Failed to generate new idea.');
      }
    } catch (err) {
      console.error('Failed to generate daily idea:', err);
      alert('Error connecting to server. Please try again.');
    } finally {
      setIsLoadingNewIdea(false);
    }
  };

  // Handle Custom Idea Generation
  const handleCustomGenerate = async (topic: string, niche: string, tone: string) => {
    try {
      setIsLoadingNewIdea(true);
      const res = await fetch('/api/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, niche, tone }),
      });
      const data = await res.json();
      if (data.success && data.idea) {
        setIdeas((prev) => [data.idea, ...prev]);
        setActiveIdea(data.idea);
        setActiveTab('today');
        triggerNotification(
          'Today\'s video is ready. ✨',
          data.idea.ideaTitle
        );
      } else {
        alert(data.error || 'Failed to generate custom idea.');
      }
    } catch (err) {
      console.error('Failed custom generation:', err);
      alert('Error connecting to AI generator.');
    } finally {
      setIsLoadingNewIdea(false);
    }
  };

  // Handle Refresh Trending Topics (10 Topics)
  const handleRefreshTopics = async (category?: string) => {
    try {
      setIsLoadingTopics(true);
      const res = await fetch('/api/trending-topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.topics)) {
        setTrendingTopics(data.topics);
      }
    } catch (err) {
      console.error('Error fetching trending topics:', err);
    } finally {
      setIsLoadingTopics(false);
    }
  };

  // Favorite toggle
  const handleToggleFavorite = (id: string) => {
    setIdeas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    if (activeIdea.id === id) {
      setActiveIdea((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  // Delete idea
  const handleDeleteIdea = (id: string) => {
    if (confirm('Are you sure you want to delete this video from your vault?')) {
      const remaining = ideas.filter((item) => item.id !== id);
      setIdeas(remaining);
      if (activeIdea.id === id && remaining.length > 0) {
        setActiveIdea(remaining[0]);
      }
    }
  };

  // Trigger Notification (Browser & In-App Toast)
  const triggerNotification = (title: string, body: string) => {
    setNotificationToast({ title, body });
    setTimeout(() => setNotificationToast(null), 6000);

    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
        });
      } catch (e) {
        console.warn('Push notification failed', e);
      }
    }
  };

  const handleTestNotification = () => {
    triggerNotification(
      "Today's video is ready. 🔥",
      activeIdea ? activeIdea.ideaTitle : 'Free AI Phone Agent: No Monthly Subscription Needed!'
    );
  };

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 flex flex-col items-center justify-start font-sans antialiased selection:bg-amber-400 selection:text-black">
      {/* Simulated Push Notification Toast Banner */}
      {notificationToast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-sm w-11/12 bg-[#121218] border-2 border-amber-400 rounded-2xl p-3.5 shadow-[0_0_30px_rgba(255,215,0,0.4)] flex items-start space-x-3 text-amber-100 animate-bounce">
          <div className="p-2 rounded-xl bg-amber-400 text-black">
            <Bell className="w-4 h-4 fill-black" />
          </div>
          <div className="flex-1 pr-2">
            <p className="text-xs font-black text-amber-300 font-mono uppercase tracking-wider">
              {notificationToast.title}
            </p>
            <p className="text-xs font-semibold text-amber-100 line-clamp-2 mt-0.5">
              {notificationToast.body}
            </p>
          </div>
          <button
            onClick={() => setNotificationToast(null)}
            className="text-gray-400 hover:text-amber-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container (Supports Android Device Frame vs Fullscreen) */}
      <div
        className={`w-full transition-all duration-300 ${
          isFrameMode
            ? 'max-w-md my-0 sm:my-4 rounded-none sm:rounded-[36px] border-0 sm:border-4 border-amber-500/30 bg-[#0a0a0c] shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden min-h-screen sm:min-h-[850px]'
            : 'max-w-4xl min-h-screen bg-[#0a0a0c]'
        } flex flex-col relative`}
      >
        {/* Header */}
        <AndroidHeader
          streakCount={7}
          onOpenNotifications={() => setShowNotificationModal(true)}
          isFrameMode={isFrameMode}
          onToggleFrameMode={() => setIsFrameMode(!isFrameMode)}
          hasUnreadNotification={!!notificationToast}
        />

        {/* Tab Content Viewport */}
        <main className="flex-1 px-4 py-4 overflow-y-auto">
          {activeTab === 'today' && (
            <TodayDrop
              idea={activeIdea}
              onOpenTeleprompter={(script) => setTeleprompterScript(script)}
              onToggleFavorite={handleToggleFavorite}
              onRefreshDailyIdea={handleRefreshDailyIdea}
              isLoadingNewIdea={isLoadingNewIdea}
            />
          )}

          {activeTab === 'dashboard' && (
            <YouTubeDashboard
              stats={youtubeStats}
              onUpdateStats={setYoutubeStats}
            />
          )}

          {activeTab === 'trends' && (
            <TrendFinder
              topics={trendingTopics}
              onSelectTopicToGenerate={(topic, category) =>
                handleCustomGenerate(topic, category, 'High Energy')
              }
              onRefreshTopics={handleRefreshTopics}
              isLoadingTopics={isLoadingTopics}
            />
          )}

          {activeTab === 'history' && (
            <HistoryVault
              ideas={ideas}
              onSelectIdea={(idea) => {
                setActiveIdea(idea);
                setActiveTab('today');
              }}
              onToggleFavorite={handleToggleFavorite}
              onDeleteIdea={handleDeleteIdea}
              onOpenTeleprompter={(script) => setTeleprompterScript(script)}
            />
          )}

          {activeTab === 'studio' && (
            <StudioTools
              onCustomGenerate={handleCustomGenerate}
              onOpenTeleprompter={(script) => setTeleprompterScript(script)}
              isGenerating={isLoadingNewIdea}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          savedCount={ideas.length}
        />
      </div>

      {/* Teleprompter Fullscreen Modal */}
      {teleprompterScript && (
        <ScriptTeleprompterModal
          scriptText={teleprompterScript}
          onClose={() => setTeleprompterScript(null)}
        />
      )}

      {/* Daily Notification Modal */}
      {showNotificationModal && (
        <NotificationSettingsModal
          config={notificationConfig}
          onSaveConfig={setNotificationConfig}
          onTriggerTestNotification={handleTestNotification}
          onClose={() => setShowNotificationModal(false)}
        />
      )}
    </div>
  );
}

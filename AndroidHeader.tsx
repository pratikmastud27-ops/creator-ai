import React, { useState, useEffect } from 'react';
import { Crown, Bell, Sparkles, Smartphone, Flame, Settings } from 'lucide-react';

interface AndroidHeaderProps {
  streakCount: number;
  onOpenNotifications: () => void;
  isFrameMode: boolean;
  onToggleFrameMode: () => void;
  hasUnreadNotification?: boolean;
}

export const AndroidHeader: React.FC<AndroidHeaderProps> = ({
  streakCount,
  onOpenNotifications,
  isFrameMode,
  onToggleFrameMode,
  hasUnreadNotification,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-[#0a0a0c] text-amber-100 border-b border-amber-500/20 sticky top-0 z-40 backdrop-blur-md">
      {/* Simulated Android System Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 text-[11px] text-amber-200/60 font-mono border-b border-amber-500/10">
        <div className="flex items-center space-x-2">
          <span>{currentTime || '10:22'}</span>
          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded font-bold">5G</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>VoLTE</span>
          <div className="flex items-center space-x-0.5">
            <div className="w-1 h-2 bg-amber-400 rounded-xs"></div>
            <div className="w-1 h-2.5 bg-amber-400 rounded-xs"></div>
            <div className="w-1 h-3 bg-amber-400 rounded-xs"></div>
            <div className="w-1 h-3.5 bg-amber-400/40 rounded-xs"></div>
          </div>
          <span className="text-amber-300 font-bold">98%</span>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                CREATOR AI
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30 uppercase tracking-widest">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-amber-200/60 flex items-center gap-1">
              <span>Daily YouTube Growth Engine</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Daily Streak Badge */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold font-mono">{streakCount}d</span>
          </div>

          {/* Device Frame Toggle */}
          <button
            onClick={onToggleFrameMode}
            title={isFrameMode ? 'Full Width View' : 'Android Frame View'}
            className="p-2 rounded-xl bg-[#141419] border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 transition-colors"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-xl bg-[#141419] border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 transition-colors relative"
            title="Daily Notifications Setup"
          >
            <Bell className="w-4 h-4" />
            {hasUnreadNotification && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

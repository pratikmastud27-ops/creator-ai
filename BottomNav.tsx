import React from 'react';
import { Zap, Youtube, TrendingUp, History, Mic2 } from 'lucide-react';

export type TabType = 'today' | 'dashboard' | 'trends' | 'history' | 'studio';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, savedCount }) => {
  const tabs = [
    {
      id: 'today' as TabType,
      label: 'AI Video',
      icon: Zap,
      badge: '8 AM',
    },
    {
      id: 'dashboard' as TabType,
      label: 'YouTube',
      icon: Youtube,
    },
    {
      id: 'trends' as TabType,
      label: 'Top 10',
      icon: TrendingUp,
    },
    {
      id: 'history' as TabType,
      label: 'History',
      icon: History,
      badge: savedCount > 0 ? `${savedCount}` : undefined,
    },
    {
      id: 'studio' as TabType,
      label: 'Studio',
      icon: Mic2,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0c]/95 border-t border-amber-500/20 backdrop-blur-lg px-1.5 py-1.5">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-amber-300 font-bold'
                  : 'text-amber-100/50 hover:text-amber-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-amber-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]' : ''
                  }`}
                />
                {tab.badge && (
                  <span
                    className={`absolute -top-1.5 -right-3 text-[8px] font-black px-1 py-0.2 rounded-full font-mono ${
                      tab.id === 'today'
                        ? 'bg-amber-400 text-black animate-pulse'
                        : 'bg-amber-900/80 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] mt-1 tracking-tight font-medium">{tab.label}</span>
              {isActive && (
                <div className="w-3 h-0.5 bg-gradient-to-r from-amber-300 to-yellow-500 rounded-full mt-0.5 shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

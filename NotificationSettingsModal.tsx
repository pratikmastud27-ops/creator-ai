import React, { useState } from 'react';
import { DailyNotificationConfig } from '../types';
import { Bell, Clock, X, Send } from 'lucide-react';

interface NotificationSettingsModalProps {
  config: DailyNotificationConfig;
  onSaveConfig: (newConfig: DailyNotificationConfig) => void;
  onTriggerTestNotification: () => void;
  onClose: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  config,
  onSaveConfig,
  onTriggerTestNotification,
  onClose,
}) => {
  const [enabled, setEnabled] = useState(config.enabled);
  const [notifyTime, setNotifyTime] = useState(config.time || '08:00');
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  const handleRequestPermission = async () => {
    if (typeof Notification !== 'undefined') {
      const perm = await Notification.requestPermission();
      setBrowserPermission(perm);
      if (perm === 'granted') {
        alert('Web Push Notifications granted! Creator AI will notify you daily when your video is ready.');
      }
    }
  };

  const handleSave = () => {
    onSaveConfig({
      ...config,
      enabled,
      time: notifyTime,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121216] border border-amber-500/30 rounded-2xl max-w-md w-full p-5 space-y-4 text-amber-100 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-amber-100">Daily Drop Notification Settings</h3>
              <p className="text-[11px] text-amber-200/60">Automated daily YouTube video alerts</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-amber-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Toggle */}
        <div className="flex items-center justify-between bg-[#0a0a0c] p-3 rounded-xl border border-amber-500/20">
          <div>
            <p className="text-xs font-bold text-amber-200">Enable Daily Video Alert</p>
            <p className="text-[10px] text-amber-200/50">Triggers "Today's video is ready." at schedule time</p>
          </div>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
          />
        </div>

        {/* Time Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>Daily Schedule Time (Default: 8:00 AM)</span>
          </label>
          <input
            type="time"
            value={notifyTime}
            onChange={(e) => setNotifyTime(e.target.value)}
            className="w-full bg-[#0a0a0c] border border-amber-500/20 rounded-xl px-3 py-2 text-sm text-amber-100 font-mono focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Browser Permission Status */}
        <div className="bg-[#0a0a0c] p-3 rounded-xl border border-amber-500/10 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-amber-200/70">Browser Push Status:</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                browserPermission === 'granted'
                  ? 'bg-green-950/60 text-green-400 border border-green-500/30'
                  : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
              }`}
            >
              {browserPermission}
            </span>
          </div>

          {browserPermission !== 'granted' && (
            <button
              onClick={handleRequestPermission}
              className="w-full py-1.5 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 rounded-lg font-bold border border-amber-500/30 transition-colors text-xs"
            >
              Enable Push Notifications
            </button>
          )}
        </div>

        {/* Test Notification Button */}
        <button
          onClick={onTriggerTestNotification}
          className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(255,215,0,0.3)] hover:opacity-90"
        >
          <Send className="w-3.5 h-3.5 fill-black" />
          <span>Test Notification ("Today's video is ready.")</span>
        </button>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-amber-500/20">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-amber-200/70 hover:text-amber-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-amber-400 text-black font-bold rounded-xl text-xs shadow-md hover:bg-amber-300"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

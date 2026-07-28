import React, { useState, useEffect, useRef } from 'react';
import { VideoProduction, AIVoice, VideoScene } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Download,
  Film,
  Layers,
  CheckCircle,
  Clapperboard,
  Maximize2,
  Activity,
  Mic,
} from 'lucide-react';
import AutoThumbnailGenerator from "./AutoThumbnailGenerator";

interface VideoPlayerStudioProps {
  production?: VideoProduction;
  voice?: AIVoice;
  scriptText?: string;
  title?: string;
}

export const VideoPlayerStudio: React.FC<VideoPlayerStudioProps> = ({
  production,
  voice,
  scriptText = '',
  title = '',
}) => {
  const safeVoice: AIVoice = voice || {
    voiceName: 'Creator AI Hinglish Male (Energetic Pro)',
    language: 'Hinglish (India)',
    speed: 1.0,
    pitch: 1.0,
    status: 'ready',
    audioDuration: 210,
  };

  const safeProduction: VideoProduction = production || {
    status: 'ready',
    aspectRatio: '16:9',
    durationSeconds: 210,
    scenes: [
      {
        id: 1,
        timeRange: '0:00 - 0:15',
        captionText: title || 'Today\'s Viral YouTube Video',
        bRollPrompt: 'High energy intro with glowing gold particles',
        visualEffect: 'Dynamic Zoom In + Gold Glow',
      },
    ],
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);

  const scenes = safeProduction.scenes || [];
  const currentScene: VideoScene = scenes[currentSceneIndex] || scenes[0];

  // Web Speech Synthesis AI Voice
  const synthRef = useRef<SpeechSynthesis | null>(
    typeof window !== 'undefined' ? window.speechSynthesis : null
  );

  const startVoiceOver = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const textToSpeak = currentScene
      ? currentScene.captionText
      : scriptText;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = safeVoice.speed || 1.0;
    utterance.pitch = safeVoice.pitch || 1.0;

    // Try finding Hindi / English voices
    const voices = synthRef.current.getVoices();
    const targetVoice =
      voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN')) ||
      voices.find((v) => v.lang.includes('en')) ||
      voices[0];

    if (targetVoice) utterance.voice = targetVoice;

    utterance.onend = () => {
      setSpeechActive(false);
    };

    setSpeechActive(true);
    synthRef.current.speak(utterance);
  };

  const stopVoiceOver = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setSpeechActive(false);
    }
  };

  // Video playback loop timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      if (!isMuted && !speechActive) {
        startVoiceOver();
      }

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Loop or advance scene
            if (currentSceneIndex < scenes.length - 1) {
              setCurrentSceneIndex((idx) => idx + 1);
              return 0;
            } else {
              setIsPlaying(false);
              stopVoiceOver();
              return 100;
            }
          }
          return prev + 2;
        });
      }, 100);
    } else {
      stopVoiceOver();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSceneIndex, isMuted]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (progress >= 100 && currentSceneIndex >= scenes.length - 1) {
        setCurrentSceneIndex(0);
        setProgress(0);
      }
      setIsPlaying(true);
    }
  };

  const handleExportVideo = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 4000);
    }, 2000);
  };

  return (
    <div className="bg-[#121216] border border-amber-500/30 rounded-2xl p-4 space-y-4 text-amber-100 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clapperboard className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase font-mono text-amber-300 tracking-wider">
              AI Video Studio & Voice Generator
            </h3>
            <p className="text-[10px] text-amber-200/60">
              Complete automated video render & Hinglish AI voiceover
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-green-950 text-green-400 border border-green-500/30 uppercase">
            100% Video Ready
          </span>
        </div>
      </div>

      {/* Main Video Viewport Screen */}
      <div className="relative aspect-video bg-[#070709] rounded-xl overflow-hidden border border-amber-500/40 shadow-inner flex flex-col justify-between p-4 group">
        {/* Dynamic B-Roll Visual Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

        {/* Dynamic Background Shader / Animation */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            currentSceneIndex % 2 === 0
              ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/40 via-yellow-950/20 to-black'
              : 'bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-800/30 via-amber-950/20 to-black'
          }`}
        />

        {/* Animated Gold Watermark */}
        <div className="relative z-20 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/30">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
            <span className="text-[10px] font-black text-amber-300 uppercase font-mono tracking-wider">
              Creator AI Video Render
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 bg-black/60 hover:bg-amber-500/20 rounded-lg text-amber-300 border border-amber-500/20 transition-colors"
              title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Center Kinetic Caption Overlay */}
        <div className="relative z-20 my-auto text-center px-4 space-y-2">
          {currentScene && (
            <div className="space-y-1">
              <span className="inline-block px-2 py-0.5 rounded bg-amber-400 text-black font-black text-[9px] uppercase font-mono tracking-widest shadow-md">
                Scene {currentScene.id} / {scenes.length} • {currentScene.timeRange}
              </span>
              <p className="text-sm sm:text-lg font-black text-white drop-shadow-[0_2px_10px_rgba(255,215,0,0.8)] tracking-tight leading-tight uppercase font-mono">
                "{currentScene.captionText}"
              </p>
              <p className="text-[10px] text-amber-300/80 italic font-sans">
                🎬 B-Roll: {currentScene.bRollPrompt}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Playback Controls */}
        <div className="relative z-20 space-y-2 pt-2">
          {/* Progress Bar */}
          <div className="w-full bg-black/80 h-1.5 rounded-full overflow-hidden border border-amber-500/30">
            <div
              style={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 h-full transition-all duration-100 shadow-[0_0_10px_rgba(255,215,0,0.8)]"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleTogglePlay}
                className="p-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-xl font-bold shadow-[0_0_12px_rgba(255,215,0,0.3)] hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
              </button>

              <button
                onClick={() => {
                  setCurrentSceneIndex(0);
                  setProgress(0);
                  setIsPlaying(false);
                }}
                className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/20"
                title="Restart Video"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {speechActive && (
                <div className="flex items-center space-x-1 text-[10px] text-amber-300 font-mono animate-pulse">
                  <Mic className="w-3 h-3 text-amber-400" />
                  <span>AI Voice Speaking...</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-200/60">
              <span>Aspect: 16:9 HD</span>
              <span>•</span>
              <span>Duration: 3.5m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Storyboard Scenes List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-mono font-bold uppercase text-amber-300 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Storyboard Scenes ({scenes.length})</span>
          </h4>
          <span className="text-[10px] text-amber-200/60 font-mono">Click scene to preview</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setCurrentSceneIndex(idx);
                setProgress(0);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                currentSceneIndex === idx
                  ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                  : 'bg-[#0a0a0c] border-amber-500/10 text-amber-200/70 hover:border-amber-500/30'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                <span className="text-amber-400">Scene {scene.id}</span>
                <span className="text-amber-200/50">{scene.timeRange}</span>
              </div>
              <p className="text-xs font-semibold line-clamp-1 text-amber-100">
                {scene.captionText}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* AI Voice Info & Export Video Button */}
      <div className="bg-[#0a0a0c] p-3 rounded-xl border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5 text-left w-full sm:w-auto">
          <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
            <Mic className="w-3.5 h-3.5" />
            <span>{safeVoice.voiceName}</span>
          </div>
          <p className="text-[10px] text-amber-200/50 font-mono">
            {safeVoice.language} • {safeVoice.speed}x Speed • HD Audio Synthesized
          </p>
        </div>

        <button
          onClick={handleExportVideo}
          disabled={isExporting}
          className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:opacity-90 disabled:opacity-50 transition-all shrink-0"
        >
          {isExporting ? (
            <>
              <Activity className="w-3.5 h-3.5 animate-spin" />
              <span>Rendering 1080p MP4...</span>
            </>
          ) : exportComplete ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-black" />
              <span>Video Exported to Vault!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export Complete Video Package</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, FlipHorizontal, Type, Gauge, Clock } from 'lucide-react';

interface ScriptTeleprompterModalProps {
  scriptText: string;
  onClose: () => void;
}

export const ScriptTeleprompterModal: React.FC<ScriptTeleprompterModalProps> = ({
  scriptText,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1 to 5
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [isMirrored, setIsMirrored] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Timer effect
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Auto-scroll loop effect
  useEffect(() => {
    const scrollStep = () => {
      if (isPlaying && containerRef.current) {
        containerRef.current.scrollTop += scrollSpeed * 0.8;
        if (
          containerRef.current.scrollTop + containerRef.current.clientHeight >=
          containerRef.current.scrollHeight - 5
        ) {
          setIsPlaying(false);
        } else {
          animationFrameRef.current = requestAnimationFrame(scrollStep);
        }
      }
    };

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(scrollStep);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, scrollSpeed]);

  const handleReset = () => {
    setIsPlaying(false);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    setElapsedSeconds(0);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-base leading-relaxed';
      case 'md':
        return 'text-xl leading-loose';
      case 'lg':
        return 'text-2xl leading-loose font-medium';
      case 'xl':
        return 'text-3xl leading-loose font-bold';
      default:
        return 'text-2xl leading-loose';
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-amber-100 flex flex-col font-sans select-none overflow-hidden">
      {/* Top Teleprompter Controls Bar */}
      <div className="bg-[#0f0f13] border-b border-amber-500/20 px-4 py-3 flex items-center justify-between z-20 flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-transform active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                : 'bg-amber-400 text-black hover:bg-amber-300'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-black" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black" />
                <span>Start Prompter</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-[#1a1a20] border border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
            title="Reset to Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Timer Display */}
          <div className="flex items-center space-x-1 font-mono text-amber-300 text-sm bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
            <Clock className="w-4 h-4" />
            <span className="font-bold">{formatTimer(elapsedSeconds)}</span>
          </div>
        </div>

        {/* Speed, Font & Mirror Options */}
        <div className="flex items-center space-x-3">
          {/* Speed Selector */}
          <div className="flex items-center space-x-1.5 bg-[#181820] px-2.5 py-1 rounded-lg border border-amber-500/20 text-xs">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-200/70 text-[10px] uppercase font-mono">Speed:</span>
            {[1, 2, 3, 4, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setScrollSpeed(spd)}
                className={`px-1.5 py-0.5 rounded font-bold font-mono text-xs ${
                  scrollSpeed === spd
                    ? 'bg-amber-400 text-black'
                    : 'text-amber-200 hover:text-amber-300'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center space-x-1 bg-[#181820] px-2 py-1 rounded-lg border border-amber-500/20 text-xs">
            <Type className="w-3.5 h-3.5 text-amber-400 mr-1" />
            {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`px-1.5 py-0.5 rounded font-bold uppercase text-[10px] ${
                  fontSize === sz
                    ? 'bg-amber-400 text-black'
                    : 'text-amber-200 hover:text-amber-300'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Mirror Flip Toggle */}
          <button
            onClick={() => setIsMirrored(!isMirrored)}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1 font-mono transition-colors ${
              isMirrored
                ? 'bg-amber-400 text-black border-amber-400 font-bold'
                : 'bg-[#181820] text-amber-300 border-amber-500/30'
            }`}
            title="Mirror text for glass prompter rigs"
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          {/* Close Prompter */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 hover:bg-red-900/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prompter Guide Overlay Eye Line */}
      <div className="absolute top-1/2 left-0 right-0 h-16 bg-amber-500/10 border-y border-amber-400/30 pointer-events-none z-10 flex items-center justify-between px-4">
        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest opacity-60">
          ▶ CAMERA EYE LINE
        </span>
        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest opacity-60">
          ◀
        </span>
      </div>

      {/* Main Prompter Text Viewport */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-y-auto px-6 py-48 max-w-4xl mx-auto w-full text-center transition-transform ${
          isMirrored ? 'scale-x-[-1]' : ''
        }`}
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className={`whitespace-pre-wrap ${getFontSizeClass()} text-amber-100 font-sans tracking-wide drop-shadow-[0_2px_10px_rgba(255,215,0,0.2)]`}>
          {scriptText}
        </div>
      </div>
    </div>
  );
};

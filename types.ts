export interface ScriptBodyPoint {
  title: string;
  content: string;
  visualCue?: string;
}

export interface HinglishScript {
  hook: string;
  intro: string;
  bodyPoints: ScriptBodyPoint[];
  callToAction: string;
  fullText: string;
  wordCount: number;
  estimatedMinutes: number;
}

export interface ThumbnailConcept {
  headlineText: string;
  visualElements: string[];
  colorPalette: string;
  expression: string;
  imagePrompt: string;
  generatedImageUrl?: string;
}

export interface VideoScene {
  id: number;
  timeRange: string;
  captionText: string;
  bRollPrompt: string;
  bRollImageUrl?: string;
  visualEffect: string;
}

export interface AIVoice {
  voiceName: string;
  language: string; // 'Hinglish (India)'
  speed: number;
  pitch: number;
  status: 'ready' | 'generating';
  audioDuration: number; // in seconds
}

export interface VideoProduction {
  status: 'ready' | 'rendering';
  aspectRatio: '16:9' | '9:16';
  durationSeconds: number;
  scenes: VideoScene[];
  renderedVideoUrl?: string;
}

export interface VideoIdeaPackage {
  id: string;
  date: string;
  niche: string;
  trendingTopic: string;
  whyTrending: string;
  viralScore: number;
  targetAudience: string;
  top10TopicsEvaluated?: string[];
  aiReasoningForSelection?: string;
  ideaTitle: string;
  angle: string;
  seoTitle: string;
  alternativeTitles: string[];
  description: string;
  hashtags: string[]; // 20 hashtags
  hinglishScript: HinglishScript;
  thumbnailConcept: ThumbnailConcept;
  aiVoice: AIVoice;
  videoProduction: VideoProduction;
  isFavorite?: boolean;
  generatedAt: string;
}

export interface TrendingTopicItem {
  id: string;
  topic: string;
  category: string;
  searchVolume: string;
  growthRate: string;
  description: string;
  suggestedAngle: string;
  score?: number;
}

export interface DailyNotificationConfig {
  enabled: boolean;
  time: string; // default "08:00"
  notifyTypes: {
    browser: boolean;
    inAppBanner: boolean;
  };
  lastNotificationSent?: string;
}

export interface YouTubeChannelStats {
  isConnected: boolean;
  channelName: string;
  channelHandle: string;
  avatarUrl: string;
  subscribers: number;
  totalViews: number;
  watchTimeHours: number;
  estimatedEarnings: string;
  subscribersGrowth: number; // % growth
  viewsGrowth: number;
  topPerformingVideos: Array<{
    id: string;
    title: string;
    views: string;
    likes: string;
    ctr: string;
    publishedDaysAgo: string;
  }>;
}

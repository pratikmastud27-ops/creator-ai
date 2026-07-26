import { VideoIdeaPackage, TrendingTopicItem, YouTubeChannelStats } from '../types';

export const DEFAULT_YOUTUBE_STATS: YouTubeChannelStats = {
  isConnected: true,
  channelName: 'Creator AI Tech',
  channelHandle: '@CreatorAITech',
  avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
  subscribers: 128400,
  totalViews: 4850000,
  watchTimeHours: 192300,
  estimatedEarnings: '₹1,42,800/mo',
  subscribersGrowth: 18.4,
  viewsGrowth: 24.2,
  topPerformingVideos: [
    {
      id: 'yt-1',
      title: 'Run FREE AI Agents on Android (No Subscription Needed) 🚀',
      views: '482K',
      likes: '34K',
      ctr: '11.8%',
      publishedDaysAgo: '2 days ago',
    },
    {
      id: 'yt-2',
      title: 'Earn ₹1 Lakh/Month With Faceless YouTube Shorts with AI',
      views: '890K',
      likes: '62K',
      ctr: '14.2%',
      publishedDaysAgo: '5 days ago',
    },
    {
      id: 'yt-3',
      title: 'Top 5 Hidden Android 17 Hacks You Must Enable Now!',
      views: '230K',
      likes: '19K',
      ctr: '9.4%',
      publishedDaysAgo: '12 days ago',
    },
  ],
};

export const INITIAL_IDEAS: VideoIdeaPackage[] = [
  {
    id: 'idea-2026-07-26',
    date: 'July 26, 2026',
    niche: 'AI & Tech Breakthroughs',
    trendingTopic: 'Autonomous AI Agents & Local LLM Chips in Smartphones',
    whyTrending: 'Major tech creators are seeing 3.5x higher CTR on videos explaining local AI agents running directly on phone hardware without subscription fees.',
    viralScore: 98,
    targetAudience: 'Indian Tech Enthusiasts, Students & Young Developers (18-32)',
    top10TopicsEvaluated: [
      '1. Autonomous AI Agents & Local LLM Chips in Smartphones (SELECTED)',
      '2. Android 17 Secret Neural Settings',
      '3. Gemini 3.5 Live Speech Translation in Vernacular Languages',
      '4. WhatsApp New AI Assistant Update 2026',
      '5. Faceless YouTube Shorts Automation Challenge',
      '6. Building Micro SaaS with AI Coding Agents',
      '7. Busting Fake Stock Trading Bots on Instagram Reels',
      '8. Top 5 Hidden YouTube Algorithm Changes',
      '9. Free Video Editors with AI Auto B-Roll',
      '10. High-RPM YouTube Niches for Indian Creators'
    ],
    aiReasoningForSelection: 'Topic #1 scored highest in YouTube search acceleration (+340%) and has maximum click-through potential due to audience frustration with monthly $20 ChatGPT/Claude subscriptions.',
    ideaTitle: 'Free AI Phone Agent: No Monthly Subscription Needed!',
    angle: 'Secret hacks to install completely local, offline AI agents on Android without paying ChatGPT or Gemini Pro fees.',
    seoTitle: 'How to Run Free AI Agents on Android (No Subscription) - Hinglish Guide 2026',
    alternativeTitles: [
      'Stop Paying $20/Month! Run Free AI Agents Directly On Your Phone',
      'This Free Offline AI Agent Will Change How You Use Android Forever',
      'ChatGPT Subscriptions Are a Waste! Do THIS Instead (Free AI Setup)'
    ],
    description: `Dosto! Aaj ke video me hum baat karenge autonomous AI agents ke baare me jo aapke phone par 100% FREE aur offline chalte hain! Zero subscription, maximum privacy.

📌 In this video, you will learn:
1. Local AI agent setup on Android step-by-step
2. Best open-source models for mobile devices
3. Automating WhatsApp messages, emails & tasks using AI

🔥 Don't forget to LIKE, SHARE & SUBSCRIBE for daily tech updates!

#CreatorAI #TechHacks #AI #AndroidHacks #FreeAI #OfflineAI #AIAgents #TechInHindi #YouTubeTech #OpenSourceAI #MobileHacks #ChatGPTAlternative #PhoneHacks #HindiTech #ContentCreator #ViralIdeas #AIAutomation #SmartPhoneHacks #TechIndia #CreatorEconomy`,
    hashtags: [
      '#CreatorAI', '#TechHacks', '#AndroidAI', '#FreeAI', '#LocalLLM',
      '#AIAgents', '#TechInHindi', '#YouTubeTech', '#OpenSourceAI', '#MobileHacks',
      '#ChatGPTAlternative', '#PhoneHacks', '#HindiTech', '#ContentCreator', '#ViralIdeas',
      '#AIAutomation', '#SmartPhoneHacks', '#TechIndia', '#CreatorEconomy', '#YouTubeShorts'
    ],
    hinglishScript: {
      hook: 'Dosto! Kya aap bhi har mahine $20 yani lagbhag ₹1,600 ChatGPT ya Claude par berukhi se kharch kar rahe hain? Toh ye video turant dekhiye, kyunki aaj mai aapko aisi SECRET TRICK batane wala hu jisse aapke Android phone me ek 100% FREE aur superfast AI Agent chalega - wo bhi bina kisi internet connection ke!',
      intro: 'Haan dosto, aapne bilkul sahi suna! Ab internet ho ya na ho, aapka phone aapke personal tasks automatically handle karega. Aaj ke video me step-by-step complete Hinglish setup dikhaunga!',
      bodyPoints: [
        {
          title: 'Point 1: Why Cloud AI Subscriptions Are Becoming Obsolete',
          content: 'Pehle samajhte hain problem kya hai. Sabhi badi companies aapko subscription model me lock kar rahi hain. Par local models jaise Gemma 2, Llama 3 aur DeepSeek mobile hardware ke liye so lightweight ho gaye hain ki wo directly aapke Snapdragon/Dimensity chip par run kar sakte hain.',
          visualCue: 'Screen recorder showing high speed response without Wi-Fi connection with big red cross on $20 subscription icon.'
        },
        {
          title: 'Point 2: Step-by-Step Free App Setup',
          content: 'Sabse pehle Play Store se Termux ya Ollama Mobile app install kijiye. Phir bas ek command paste kijiye jo maine niche description aur comment section me pinned di hai. Bas 2 minutes me aapka offline agent ready!',
          visualCue: 'On-screen graphic showing 3 simple clicks: Download -> Paste Command -> Launch Agent.'
        },
        {
          title: 'Point 3: Mind-Blowing Live Demo & Use Cases',
          content: 'Maan lijiye aapko apne boss ko professional email bhejna hai ya Instagram captions ready karne hain. Ye agent aapke voice command ko sunta hai aur instant Hinglish/English text produce karta hai without any API key cost!',
          visualCue: 'Close-up camera shot holding phone, demonstrating live voice prompt and instant response generation.'
        }
      ],
      callToAction: 'Agar aapko ye secret hack pasand aaya, toh video ko LIKE karke niche comment me "AI HERO" zaroor likhiye! Channel ko subscribe kar lijiye kyunki Creator AI par hum daily aisi high-potential video ideas aur scripts late rehte hain. See you in the next video!',
      fullText: `[HOOK]
Dosto! Kya aap bhi har mahine $20 yani lagbhag ₹1,600 ChatGPT ya Claude par berukhi se kharch kar rahe hain? Toh ye video turant dekhiye, kyunki aaj mai aapko aisi SECRET TRICK batane wala hu jisse aapke Android phone me ek 100% FREE aur superfast AI Agent chalega - wo bhi bina kisi internet connection ke!

[INTRO]
Haan dosto, aapne bilkul sahi suna! Ab internet ho ya na ho, aapka phone aapke personal tasks automatically handle karega. Aaj ke video me step-by-step complete Hinglish setup dikhaunga!

[POINT 1: THE SUBSCRIPTION TRAP]
Pehle samajhte hain problem kya hai. Sabhi badi companies aapko subscription model me lock kar rahi hain. Par local models jaise Gemma 2, Llama 3 aur DeepSeek mobile hardware ke liye so lightweight ho gaye hain ki wo directly aapke Snapdragon/Dimensity chip par run kar sakte hain.

[POINT 2: EASY SETUP GUIDE]
Sabse pehle Play Store se Termux ya Ollama Mobile app install kijiye. Phir bas ek command paste kijiye jo maine niche description aur comment section me pinned di hai. Bas 2 minutes me aapka offline agent ready!

[POINT 3: LIVE DEMO & PRO PROMPTS]
Maan lijiye aapko apne boss ko professional email bhejna hai ya Instagram captions ready karne hain. Ye agent aapke voice command ko sunta hai aur instant Hinglish/English text produce karta hai without any API key cost!

[CALL TO ACTION]
Agar aapko ye secret hack pasand aaya, toh video ko LIKE karke niche comment me "AI HERO" zaroor likhiye! Channel ko subscribe kar lijiye kyunki Creator AI par hum daily aisi high-potential video ideas aur scripts late rehte hain. See you in the next video!`,
      wordCount: 310,
      estimatedMinutes: 3.5
    },
    thumbnailConcept: {
      headlineText: 'STOP PAYING $20/MO! 🛑',
      visualElements: [
        'Creator looking shocked holding smartphone',
        'Large glowing gold text: "100% FREE AI AGENT"',
        'Red dollar sign canceled out with green checkmark'
      ],
      colorPalette: 'Obsidian Black, Metallic Gold, Neon Cyan',
      expression: 'Shocked, finger pointing to glowing smartphone screen',
      imagePrompt: 'A YouTube thumbnail of a young Indian tech creator looking shocked, holding a glowing futuristic smartphone displaying a gold AI robot icon, high contrast dark obsidian background, bold gold text "FREE AI AGENT" and red cross over subscription fee icon, 16:9 aspect ratio, 8k resolution hyper realistic'
    },
    aiVoice: {
      voiceName: 'Creator AI Hinglish Male (Energetic Pro)',
      language: 'Hinglish (India)',
      speed: 1.0,
      pitch: 1.0,
      status: 'ready',
      audioDuration: 210,
    },
    videoProduction: {
      status: 'ready',
      aspectRatio: '16:9',
      durationSeconds: 210,
      scenes: [
        {
          id: 1,
          timeRange: '0:00 - 0:15',
          captionText: 'STOP Paying $20/month for ChatGPT! 🛑',
          bRollPrompt: 'Close up shock expression on phone holder, glowing golden AI text banner',
          visualEffect: 'Dynamic Zoom In + Gold Particle Glow',
        },
        {
          id: 2,
          timeRange: '0:15 - 0:45',
          captionText: 'Run 100% Offline AI Agents Directly On Android',
          bRollPrompt: 'Futuristic smartphone processor chip with neural pathways glowing gold',
          visualEffect: 'Cinematic Pan Right + Subtitle Highlights',
        },
        {
          id: 3,
          timeRange: '0:45 - 1:30',
          captionText: 'Local Models: Gemma 2 & Llama 3 on Mobile Hardware',
          bRollPrompt: 'Comparison screen showing cloud servers vs fast mobile processor speed',
          visualEffect: 'Split Screen Comparison + Green Arrow Surge',
        },
        {
          id: 4,
          timeRange: '1:30 - 2:30',
          captionText: '2-Minute Setup: Download App & Paste Secret Command',
          bRollPrompt: 'Terminal command executing smoothly with 100% completion bar',
          visualEffect: 'Animated Progress Bar + Gold Checkmark',
        },
        {
          id: 5,
          timeRange: '2:30 - 3:30',
          captionText: 'Comment "AI HERO" & Subscribe to Creator AI!',
          bRollPrompt: 'YouTube bell icon ringing with gold fireworks and subscribe button press animation',
          visualEffect: 'Subscribe Pulsing Effect + Gold Fireworks',
        },
      ],
    },
    isFavorite: true,
    generatedAt: '2026-07-26T08:00:00Z'
  }
];

export const INITIAL_TRENDING_TOPICS: TrendingTopicItem[] = [
  {
    id: 'tr-1',
    topic: 'Android 17 On-Device Neural Engine Hacks',
    category: 'Tech & Mobile',
    searchVolume: '450K/mo',
    growthRate: '+340%',
    description: 'Latest Android OS features secret neural processing features that speed up gaming and battery life by 40%.',
    suggestedAngle: 'Exposing hidden Android 17 settings every user must enable right now.',
    score: 98
  },
  {
    id: 'tr-2',
    topic: 'Gemini 3.5 Live Speech Translation in Vernacular Languages',
    category: 'AI & Future Tech',
    searchVolume: '820K/mo',
    growthRate: '+520%',
    description: 'Real-time speech translation in Hindi, Tamil, Telugu, and Bengali with zero latency.',
    suggestedAngle: 'Testing Gemini Live translation with regional accents in India.',
    score: 96
  },
  {
    id: 'tr-3',
    topic: 'Automated Micro SaaS Built with AI in 48 Hours',
    category: 'Coding & Business',
    searchVolume: '290K/mo',
    growthRate: '+210%',
    description: 'Creators building small web apps that generate monthly recurring revenue using AI coding assistants.',
    suggestedAngle: 'I built a web tool in 2 days with AI and got my first 100 paid users.',
    score: 94
  },
  {
    id: 'tr-4',
    topic: 'Busting Fake AI Stock Advice on Instagram Reels',
    category: 'Finance & Career',
    searchVolume: '610K/mo',
    growthRate: '+180%',
    description: 'Financial influencers being exposed for using AI stock bots with misleading claims.',
    suggestedAngle: 'Don\'t fall for this AI Trading Scam! Real truth exposed with proof.',
    score: 91
  },
  {
    id: 'tr-5',
    topic: 'Top 5 Hidden YouTube Algorithm Changes for 2026',
    category: 'Creator Growth',
    searchVolume: '950K/mo',
    growthRate: '+410%',
    description: 'YouTube updated its watch-time weighting algorithm, favoring longer retention and multi-session viewers.',
    suggestedAngle: 'Why your YouTube views dropped last week and 3 hacks to fix it.',
    score: 95
  }
];

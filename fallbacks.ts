export function getFallbackDailyIdea() {
  const todayStr = new Date().toISOString().split('T')[0];
  const dateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    id: `idea-${todayStr}`,
    date: dateFormatted,
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
    isFavorite: false,
    generatedAt: new Date().toISOString(),
  };
}

export function getFallbackCustomIdea(topic: string, niche: string, tone: string) {
  const cleanTopic = topic || niche || 'Viral YouTube Trend 2026';
  const cleanNiche = niche || 'Tech & Creator Economy';
  const cleanTone = tone || 'High Energy';
  const dateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    id: `custom-${Date.now()}`,
    date: dateFormatted,
    niche: cleanNiche,
    trendingTopic: cleanTopic,
    whyTrending: `Search volume for "${cleanTopic}" has surged recently across Indian YouTube audiences looking for practical, actionable advice.`,
    viralScore: 96,
    targetAudience: 'Indian Youth, Tech Enthusiasts & Digital Creators',
    top10TopicsEvaluated: [
      `1. ${cleanTopic} (SELECTED)`,
      `2. Secret Hacks for ${cleanTopic}`,
      `3. Free Tools to Master ${cleanTopic}`,
      `4. Common Mistakes to Avoid in ${cleanTopic}`,
      `5. ${cleanTopic} vs Traditional Methods`,
      `6. How Top Creators Earn with ${cleanTopic}`,
      `7. Step-by-Step ${cleanTopic} Blueprint`,
      `8. Hidden Features in ${cleanTopic}`,
      `9. Future of ${cleanTopic} in India`,
      `10. Complete ${cleanTopic} Masterclass 2026`
    ],
    aiReasoningForSelection: `Selected "${cleanTopic}" due to ultra-high search intent and massive CTR acceleration potential in ${cleanNiche}.`,
    ideaTitle: `${cleanTopic}: Complete ${cleanTone} Guide for Creators!`,
    angle: `Exclusive breakdown and action plan for ${cleanTopic} tailored for Indian content creators.`,
    seoTitle: `How to Master ${cleanTopic} in 2026 - Complete Hinglish Guide`,
    alternativeTitles: [
      `Don't Miss THIS ${cleanTopic} Secret Before Everyone Else Starts!`,
      `I Tested ${cleanTopic} For 7 Days: Here Is What Happened`,
      `The Ultimate ${cleanTopic} Blueprint for 10X Views & Revenue`
    ],
    description: `Dosto! Aaj ke video me hum detailed baat karenge "${cleanTopic}" ke baare me! Is video me aapko milega step-by-step complete guide.

📌 Key Takeaways:
1. Complete setup and overview of ${cleanTopic}
2. Secret tricks to boost your growth
3. Best free tools and strategies

🔥 Channel ko LIKE, SHARE & SUBSCRIBE kijiye daily viral ideas ke liye!

#CreatorAI #${cleanTopic.replace(/\s+/g, '')} #TechHacks #ViralTrends #YouTubeStrategy #ContentCreator #HinglishTech #IndiaCreator #YouTube2026`,
    hashtags: [
      '#CreatorAI', `#${cleanTopic.replace(/\s+/g, '')}`, '#TechHacks', '#ViralTrends',
      '#YouTubeStrategy', '#ContentCreator', '#HinglishTech', '#IndiaCreator', '#YouTube2026',
      '#CreatorEconomy', '#FreeTools', '#DigitalHacks', '#CreatorStudio', '#YouTubeShorts',
      '#AIAutomation', '#TechIndia', '#GrowthHacks', '#Masterclass', '#VideoProduction', '#FullGuide'
    ],
    hinglishScript: {
      hook: `Dosto! Kya aap bhi ${cleanTopic} ke baare me bilkul sahi aur authentic jankari dhund rahe hain? Toh ye video end tak dekhiye, kyunki aaj mai aapko aisi insider tricks batane wala hu jisse aapka pura game badal jayega!`,
      intro: `Aaj ke video me hum bilkul simple Hinglish me samjhenge ki kaise aap ${cleanTopic} ko leverage karke apne goals achieve kar sakte hain!`,
      bodyPoints: [
        {
          title: `Point 1: Understanding ${cleanTopic}`,
          content: `Sabse pehle samajhte hain basics. Is field me log sabse badi galti kya karte hain aur aapko use kaise avoid karna hai.`,
          visualCue: `High energy graphic showing ${cleanTopic} title with gold highlights.`
        },
        {
          title: `Point 2: Step-by-Step Implementation`,
          content: `Ab dekhiye practical setup. Aapko bas 3 simple steps follow karne hain jo mai screen par dikha raha hu.`,
          visualCue: `Screen recording displaying step 1, step 2, step 3 checklist.`
        },
        {
          title: `Point 3: Pro Tips & Monetization`,
          content: `Final tip: Is method ko use karke aap time aur money dono save kar sakte hain aur fast growth achieve kar sakte hain.`,
          visualCue: `Analytics graph going upward with glowing green metrics.`
        }
      ],
      callToAction: `Agar video helpful laga toh LIKE button press kijiye aur comment me "${cleanTopic.toUpperCase()}" likhiye! Subscribe Creator AI for more daily drops!`,
      fullText: `[HOOK]
Dosto! Kya aap bhi ${cleanTopic} ke baare me bilkul sahi aur authentic jankari dhund rahe hain? Toh ye video end tak dekhiye, kyunki aaj mai aapko aisi insider tricks batane wala hu jisse aapka pura game badal jayega!

[INTRO]
Aaj ke video me hum bilkul simple Hinglish me samjhenge ki kaise aap ${cleanTopic} ko leverage karke apne goals achieve kar sakte hain!

[POINT 1: THE FOUNDATION]
Sabse pehle samajhte hain basics. Is field me log sabse badi galti kya karte hain aur aapko use kaise avoid karna hai.

[POINT 2: PRACTICAL BLUEPRINT]
Ab dekhiye practical setup. Aapko bas 3 simple steps follow karne hain jo mai screen par dikha raha hu.

[POINT 3: MONETIZATION & GROWTH HACKS]
Final tip: Is method ko use karke aap time aur money dono save kar sakte hain aur fast growth achieve kar sakte hain.

[CALL TO ACTION]
Agar video helpful laga toh LIKE button press kijiye aur comment me "${cleanTopic.toUpperCase()}" likhiye! Subscribe Creator AI for more daily drops!`,
      wordCount: 280,
      estimatedMinutes: 3.0
    },
    thumbnailConcept: {
      headlineText: `${cleanTopic.toUpperCase().slice(0, 20)} 🚀`,
      visualElements: [
        `High contrast creator photo holding glowing phone/tablet`,
        `Bold text overlay: "${cleanTopic.toUpperCase()}"`,
        `Metallic gold borders with neon accent lighting`
      ],
      colorPalette: 'Obsidian Black, Metallic Gold, Neon Cyan',
      expression: 'Confident creator pointing to headline text',
      imagePrompt: `A 16:9 YouTube thumbnail design for "${cleanTopic}", featuring a stylish creator, dark obsidian black background, bold golden typography, neon cyan highlights, 8k render high quality.`
    },
    aiVoice: {
      voiceName: 'Creator AI Hinglish Male (Energetic Pro)',
      language: 'Hinglish (India)',
      speed: 1.0,
      pitch: 1.0,
      status: 'ready',
      audioDuration: 180,
    },
    videoProduction: {
      status: 'ready',
      aspectRatio: '16:9',
      durationSeconds: 180,
      scenes: [
        {
          id: 1,
          timeRange: '0:00 - 0:15',
          captionText: `Master ${cleanTopic} in 2026! 🚀`,
          bRollPrompt: `Dynamic visual hook highlighting ${cleanTopic}`,
          visualEffect: 'Dynamic Zoom In + Gold Particle Glow',
        },
        {
          id: 2,
          timeRange: '0:15 - 0:45',
          captionText: `Step-by-Step Hinglish Blueprint`,
          bRollPrompt: `Processor or tech graphic representing fast workflow`,
          visualEffect: 'Cinematic Pan Right',
        },
        {
          id: 3,
          timeRange: '0:45 - 1:30',
          captionText: `Secrets Top Creators Don't Tell You`,
          bRollPrompt: `Comparison dashboard with green growth charts`,
          visualEffect: 'Split Screen Comparison',
        },
        {
          id: 4,
          timeRange: '1:30 - 2:30',
          captionText: `Free Tools & Hacks Breakdown`,
          bRollPrompt: `Checklist completing automatically`,
          visualEffect: 'Animated Progress Bar',
        },
        {
          id: 5,
          timeRange: '2:30 - 3:00',
          captionText: `Like, Share & Subscribe to Creator AI!`,
          bRollPrompt: `YouTube subscribe button press with fireworks`,
          visualEffect: 'Subscribe Pulsing Effect',
        },
      ],
    },
    isFavorite: false,
    generatedAt: new Date().toISOString(),
  };
}

export function getFallbackTrendingTopics(category?: string) {
  const cat = category || 'Tech & AI';
  return [
    {
      id: 'tr-f1',
      topic: 'Autonomous AI Agents & Local LLM Mobile Setup',
      category: cat,
      searchVolume: '850K/mo',
      growthRate: '+420%',
      description: 'Creators are showing how to run offline open-source AI models on Android phones with zero subscription fees.',
      suggestedAngle: 'Run Free AI Agents on Android (No Monthly Fee Setup)',
      score: 98
    },
    {
      id: 'tr-f2',
      topic: 'Android 17 Hidden Neural Performance Hacks',
      category: cat,
      searchVolume: '540K/mo',
      growthRate: '+310%',
      description: 'Hidden developer settings in Android 17 that double processing speed and battery optimization.',
      suggestedAngle: '5 Hidden Android 17 Settings You Must Turn On Now',
      score: 96
    },
    {
      id: 'tr-f3',
      topic: 'Gemini 3.5 Live Voice Translation in Vernacular Languages',
      category: cat,
      searchVolume: '920K/mo',
      growthRate: '+580%',
      description: 'Real-time multi-lingual live voice translation across Hindi, English, and regional Indian languages.',
      suggestedAngle: 'Testing Gemini Live Speech Translation with Indian Accents',
      score: 95
    },
    {
      id: 'tr-f4',
      topic: 'Faceless YouTube Shorts Automation with AI Video Engines',
      category: cat,
      searchVolume: '1.2M/mo',
      growthRate: '+450%',
      description: 'Automating full short-form videos with AI voiceover, captions, and b-roll generation.',
      suggestedAngle: 'I Automated a Faceless YouTube Shorts Channel for 30 Days',
      score: 94
    },
    {
      id: 'tr-f5',
      topic: 'Building Micro SaaS Web Apps with AI Coding Agents',
      category: cat,
      searchVolume: '380K/mo',
      growthRate: '+290%',
      description: 'Non-coders building functional web products using conversational AI tools in 24 hours.',
      suggestedAngle: 'How to Build and Launch a Web App in 24 Hours with AI',
      score: 92
    },
    {
      id: 'tr-f6',
      topic: 'Exposing Fake AI Trading & Stock Scam Bots on Instagram',
      category: cat,
      searchVolume: '670K/mo',
      growthRate: '+210%',
      description: 'Debunking financial scam bots making false promises of daily stock market returns.',
      suggestedAngle: 'The Dark Truth About AI Stock Bots (Don\'t Get Scammed)',
      score: 91
    },
    {
      id: 'tr-f7',
      topic: 'YouTube Algorithm 2026: The Watch-Time Retention Secret',
      category: cat,
      searchVolume: '990K/mo',
      growthRate: '+390%',
      description: 'YouTube\'s updated recommendation system prioritizing session watch-time and title CTR.',
      suggestedAngle: 'Why YouTube Stopped Promoting Your Videos & How to Fix It',
      score: 90
    },
    {
      id: 'tr-f8',
      topic: 'Best Free Video Editors with AI Auto B-Roll & Captions',
      category: cat,
      searchVolume: '750K/mo',
      growthRate: '+330%',
      description: 'Top mobile and desktop video editing software featuring automatic subtitle generation and AI effects.',
      suggestedAngle: 'Top 3 FREE AI Video Editors Better Than Premiere Pro',
      score: 89
    },
    {
      id: 'tr-f9',
      topic: 'WhatsApp AI Chatbot Integration for Local Business',
      category: cat,
      searchVolume: '410K/mo',
      growthRate: '+260%',
      description: 'Businesses automating customer support and sales leads directly inside WhatsApp.',
      suggestedAngle: 'Set Up an Automated WhatsApp Sales Assistant in 10 Mins',
      score: 88
    },
    {
      id: 'tr-f10',
      topic: 'High RPM YouTube Niches for Indian Creators in 2026',
      category: cat,
      searchVolume: '880K/mo',
      growthRate: '+370%',
      description: 'Comparing ad revenue RPM across finance, tech, coding, gaming, and lifestyle content in India.',
      suggestedAngle: 'Which YouTube Niche Pays the Highest RPM in India?',
      score: 87
    }
  ];
}

export function getFallbackThumbnailSVG(prompt: string) {
  const title = prompt ? prompt.slice(0, 30) : 'VIRAL VIDEO THUMBNAIL';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0a0c" />
        <stop offset="50%" stop-color="#181820" />
        <stop offset="100%" stop-color="#000000" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFE066" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#F59E0B" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg)" />
    <circle cx="950" cy="360" r="280" fill="#D4AF37" opacity="0.12" filter="url(#glow)" />
    <circle cx="200" cy="150" r="180" fill="#3B82F6" opacity="0.08" filter="url(#glow)" />
    
    <rect x="20" y="20" width="1240" height="680" rx="24" fill="none" stroke="url(#gold)" stroke-width="4" opacity="0.4" />
    
    <rect x="80" y="80" width="220" height="50" rx="12" fill="#D4AF37" opacity="0.2" stroke="#D4AF37" stroke-width="1.5" />
    <text x="190" y="112" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#FFE066" text-anchor="middle">CREATOR AI 🚀</text>
    
    <text x="80" y="280" font-family="system-ui, sans-serif" font-size="64" font-weight="900" fill="url(#gold)" filter="url(#glow)">${escapeXml(title.toUpperCase())}</text>
    <text x="80" y="360" font-family="system-ui, sans-serif" font-size="48" font-weight="800" fill="#FFFFFF">100% FREE AI BLUEPRINT ⚡</text>

    <rect x="80" y="420" width="480" height="60" rx="16" fill="#F59E0B" />
    <text x="320" y="460" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#000000" text-anchor="middle">MUST WATCH NOW 🔥</text>

    <rect x="750" y="160" width="420" height="420" rx="32" fill="#121218" stroke="#D4AF37" stroke-width="3" opacity="0.9" />
    <text x="960" y="340" font-family="system-ui, sans-serif" font-size="110" text-anchor="middle">🤖</text>
    <text x="960" y="440" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#FFE066" text-anchor="middle">VIRAL AI AGENT</text>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

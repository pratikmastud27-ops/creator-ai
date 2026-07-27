import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import {
  getFallbackDailyIdea,
  getFallbackCustomIdea,
  getFallbackTrendingTopics,
  getFallbackThumbnailSVG,
}from './fallbacks'

dotenv.config();


const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to get initialized GenAI instance
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory cache for daily idea package
let cachedDailyIdea: any = null;
let cachedDailyDate: string = '';

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint: Generate or fetch today's autonomous YouTube package
app.get('/api/daily-idea', async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    if (cachedDailyIdea && cachedDailyDate === todayStr) {
      return res.json({ success: true, idea: cachedDailyIdea, source: 'cache' });
    }

    const ai = getAIClient();
    const prompt = `You are Creator AI, an autonomous AI YouTube strategy engine and viral video producer for Indian creators.
Search for TODAY's top 10 trending YouTube topics in Tech, AI, Gaming, Digital Side Hustles, or Creator Economy in India and globally.

Execute the 3-step autonomous workflow:
1. Scan & evaluate 10 trending topics.
2. Select the single best topic with highest click-through rate (CTR) and viral potential, providing reasoning.
3. Produce the full YouTube video production package:
   - Full natural Hinglish script (mix of Hindi & English in Roman script).
   - SEO Title & 3 viral alternative titles.
   - YouTube Description text.
   - EXACTLY 20 trending hashtags starting with #.
   - Thumbnail Concept with bold overlay text & 16:9 prompt.
   - AI Voice configuration.
   - Video Production Storyboard with 5 scene slides (captions, timing ranges, b-roll visual prompts, visual effects).

Format strictly as JSON with this exact structure:
{
  "niche": "Tech & AI Breakthroughs",
  "trendingTopic": "Name of winning topic",
  "whyTrending": "1-2 sentences on why it is blowing up on YouTube",
  "viralScore": 98,
  "targetAudience": "Target audience description",
  "top10TopicsEvaluated": [
    "1. Topic One (SELECTED)",
    "2. Topic Two",
    "3. Topic Three",
    "4. Topic Four",
    "5. Topic Five",
    "6. Topic Six",
    "7. Topic Seven",
    "8. Topic Eight",
    "9. Topic Nine",
    "10. Topic Ten"
  ],
  "aiReasoningForSelection": "Detailed reasoning why this topic was chosen over the other 9.",
  "ideaTitle": "Catchy main video title",
  "angle": "Unique perspective for creator",
  "seoTitle": "SEO optimized YouTube title",
  "alternativeTitles": ["Alt Title 1", "Alt Title 2", "Alt Title 3"],
  "description": "Full YouTube description text with chapters and CTA",
  "hashtags": ["#tag1", "#tag2", ... EXACTLY 20 hashtags starting with #],
  "hinglishScript": {
    "hook": "Opening 15-second hook in natural Hinglish",
    "intro": "Brief channel intro and topic transition",
    "bodyPoints": [
      { "title": "Point 1 Title", "content": "Explanation in Hinglish", "visualCue": "Visual direction" },
      { "title": "Point 2 Title", "content": "Explanation in Hinglish", "visualCue": "Visual direction" },
      { "title": "Point 3 Title", "content": "Explanation in Hinglish", "visualCue": "Visual direction" }
    ],
    "callToAction": "Energetic subscribe & like CTA in Hinglish",
    "fullText": "Full combined script text with section markers",
    "wordCount": 350,
    "estimatedMinutes": 3.5
  },
  "thumbnailConcept": {
    "headlineText": "BOLD THUMBNAIL OVERLAY TEXT",
    "visualElements": ["Visual 1", "Visual 2", "Visual 3"],
    "colorPalette": "Obsidian Black, Metallic Gold, Neon Cyan",
    "expression": "Creator expression description",
    "imagePrompt": "Detailed 16:9 prompt for generating thumbnail image with black and gold aesthetic"
  },
  "aiVoice": {
    "voiceName": "Creator AI Hinglish Male (Energetic Pro)",
    "language": "Hinglish (India)",
    "speed": 1.0,
    "pitch": 1.0,
    "status": "ready",
    "audioDuration": 210
  },
  "videoProduction": {
    "status": "ready",
    "aspectRatio": "16:9",
    "durationSeconds": 210,
    "scenes": [
      {
        "id": 1,
        "timeRange": "0:00 - 0:15",
        "captionText": "Hook caption text in bold gold",
        "bRollPrompt": "B-roll description for scene 1",
        "visualEffect": "Dynamic Zoom In + Gold Glow"
      },
      {
        "id": 2,
        "timeRange": "0:15 - 0:45",
        "captionText": "Intro caption text",
        "bRollPrompt": "B-roll description for scene 2",
        "visualEffect": "Cinematic Pan Right"
      },
      {
        "id": 3,
        "timeRange": "0:45 - 1:30",
        "captionText": "Core point 1 caption text",
        "bRollPrompt": "B-roll description for scene 3",
        "visualEffect": "Split Screen Comparison"
      },
      {
        "id": 4,
        "timeRange": "1:30 - 2:30",
        "captionText": "Core point 2 caption text",
        "bRollPrompt": "B-roll description for scene 4",
        "visualEffect": "Progress Bar + Gold Sparkle"
      },
      {
        "id": 5,
        "timeRange": "2:30 - 3:30",
        "captionText": "CTA caption text",
        "bRollPrompt": "B-roll description for scene 5",
        "visualEffect": "Subscribe Button Press + Gold Fireworks"
      }
    ]
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
      },
    });

    let jsonText = response.text ? response.text.trim() : '';

    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(jsonText);
    const dateFormatted = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const ideaPackage = {
      id: `idea-${todayStr}`,
      date: dateFormatted,
      ...parsed,
      isFavorite: false,
      generatedAt: new Date().toISOString(),
    };

    cachedDailyIdea = ideaPackage;
    cachedDailyDate = todayStr;

    res.json({ success: true, idea: ideaPackage, source: 'ai' });
  } catch (err: any) {
    console.warn('Gemini API quota/error in /api/daily-idea, returning fallback:', err?.message || err);
    const fallbackIdea = getFallbackDailyIdea();
    cachedDailyIdea = fallbackIdea;
    cachedDailyDate = new Date().toISOString().split('T')[0];
    res.json({ success: true, idea: fallbackIdea, source: 'fallback' });
  }
});

// Endpoint: Generate custom video package
app.post('/api/generate-idea', async (req, res) => {
  try {
    const { topic, niche, tone } = req.body;
    const ai = getAIClient();

    const customPrompt = `Generate an autonomous YouTube video package in Hinglish for Indian creators.
Topic/Niche: ${topic || niche || 'Latest AI & Tech viral trends'}
Tone: ${tone || 'High Energy'}

Requirements:
1. Complete Hinglish script (natural Hindi & English in Roman script).
2. SEO Title & 3 viral alternative titles.
3. YouTube description.
4. EXACTLY 20 hashtags starting with #.
5. Thumbnail Concept with 16:9 prompt.
6. AI Voice configuration.
7. Video Production Storyboard (5 scenes with timing, caption, b-roll prompt, visual effect).
8. 10 evaluated related topics and selection reasoning.

Return STRICT JSON format:
{
  "niche": "${niche || 'Tech & AI'}",
  "trendingTopic": "${topic || 'AI Breakthroughs'}",
  "whyTrending": "1-2 sentences on why viewers will click on this concept",
  "viralScore": 97,
  "targetAudience": "Indian Creators, Students, Tech Enthusiasts",
  "top10TopicsEvaluated": [
    "1. ${topic} (SELECTED)",
    "2. Related Trend 2",
    "3. Related Trend 3",
    "4. Related Trend 4",
    "5. Related Trend 5",
    "6. Related Trend 6",
    "7. Related Trend 7",
    "8. Related Trend 8",
    "9. Related Trend 9",
    "10. Related Trend 10"
  ],
  "aiReasoningForSelection": "Chosen based on search velocity and click potential.",
  "ideaTitle": "Viral Main Title",
  "angle": "Creator angle",
  "seoTitle": "SEO Optimized YouTube Title",
  "alternativeTitles": ["Alt Title 1", "Alt Title 2", "Alt Title 3"],
  "description": "Full YouTube video description text",
  "hashtags": ["#tag1", "#tag2", ... EXACTLY 20 hashtags],
  "hinglishScript": {
    "hook": "Opening hook in Hinglish",
    "intro": "Channel intro and transition",
    "bodyPoints": [
      { "title": "Point 1", "content": "Hinglish text", "visualCue": "Visual direction" },
      { "title": "Point 2", "content": "Hinglish text", "visualCue": "Visual direction" },
      { "title": "Point 3", "content": "Hinglish text", "visualCue": "Visual direction" }
    ],
    "callToAction": "CTA in Hinglish",
    "fullText": "Full formatted combined script text",
    "wordCount": 320,
    "estimatedMinutes": 3.2
  },
  "thumbnailConcept": {
    "headlineText": "BOLD OVERLAY TEXT",
    "visualElements": ["Element 1", "Element 2", "Element 3"],
    "colorPalette": "Obsidian Black, Metallic Gold, Neon Cyan",
    "expression": "Shocked creator facial expression",
    "imagePrompt": "Detailed 16:9 YouTube thumbnail image prompt with black and gold aesthetic"
  },
  "aiVoice": {
    "voiceName": "Creator AI Hinglish Male (Energetic Pro)",
    "language": "Hinglish (India)",
    "speed": 1.0,
    "pitch": 1.0,
    "status": "ready",
    "audioDuration": 190
  },
  "videoProduction": {
    "status": "ready",
    "aspectRatio": "16:9",
    "durationSeconds": 190,
    "scenes": [
      { "id": 1, "timeRange": "0:00 - 0:15", "captionText": "Hook caption", "bRollPrompt": "B-roll 1", "visualEffect": "Zoom In" },
      { "id": 2, "timeRange": "0:15 - 0:45", "captionText": "Intro caption", "bRollPrompt": "B-roll 2", "visualEffect": "Pan Right" },
      { "id": 3, "timeRange": "0:45 - 1:30", "captionText": "Body point 1 caption", "bRollPrompt": "B-roll 3", "visualEffect": "Split Screen" },
      { "id": 4, "timeRange": "1:30 - 2:30", "captionText": "Body point 2 caption", "bRollPrompt": "B-roll 4", "visualEffect": "Progress Bar" },
      { "id": 5, "timeRange": "2:30 - 3:10", "captionText": "CTA caption", "bRollPrompt": "B-roll 5", "visualEffect": "Subscribe Fireworks" }
    ]
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: customPrompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    let jsonText = response.text ? response.text.trim() : '';
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(jsonText);
    const dateFormatted = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const ideaPackage = {
      id: `custom-${Date.now()}`,
      date: dateFormatted,
      ...parsed,
      isFavorite: false,
      generatedAt: new Date().toISOString(),
    };

    res.json({ success: true, idea: ideaPackage, source: 'ai' });
  } catch (err: any) {
    console.warn('Gemini API quota/error in /api/generate-idea, returning fallback:', err?.message || err);
    const { topic, niche, tone } = req.body || {};
    const fallbackPackage = getFallbackCustomIdea(topic, niche, tone);
    res.json({ success: true, idea: fallbackPackage, source: 'fallback' });
  }
});

// Endpoint: Generate Thumbnail Image Mockup
app.post('/api/generate-thumbnail', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const ai = getAIClient();
    const thumbnailPrompt = `${prompt}, high quality 16:9 YouTube thumbnail design, bold metallic gold typography, dark obsidian black background, dramatic lighting, 8k render, clear focal point`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: thumbnailPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: '16:9',
        },
      },
    });

    let imageUrl = '';
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          const mime = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mime};base64,${base64Data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      imageUrl = getFallbackThumbnailSVG(prompt);
    }

    res.json({ success: true, imageUrl, source: 'ai' });
  } catch (err: any) {
    console.warn('Gemini API quota/error in /api/generate-thumbnail, returning fallback SVG:', err?.message || err);
    const { prompt } = req.body || {};
    const fallbackUrl = getFallbackThumbnailSVG(prompt || 'Viral YouTube Thumbnail');
    res.json({ success: true, imageUrl: fallbackUrl, source: 'fallback' });
  }
});

// Endpoint: Fetch Trending Topics with Grounded Search (Returns 10 Topics)
app.post('/api/trending-topics', async (req, res) => {
  try {
    const { category } = req.body;
    const ai = getAIClient();

    const prompt = `Search Google for current viral YouTube topics and news trends in ${category || 'Indian Tech, AI & Creator Economy'}.
Return a JSON array of EXACTLY 10 trending topics.
Structure:
[
  {
    "id": "tr-1",
    "topic": "Topic Title",
    "category": "${category || 'Tech & AI'}",
    "searchVolume": "Estimated monthly search e.g. 500K/mo",
    "growthRate": "e.g. +320%",
    "description": "Short explanation of why people are watching this",
    "suggestedAngle": "Actionable video angle for creators",
    "score": 98
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
      },
    });

    let jsonText = response.text ? response.text.trim() : '';
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const topics = JSON.parse(jsonText);
    res.json({ success: true, topics, source: 'ai' });
  } catch (err: any) {
    console.warn('Gemini API quota/error in /api/trending-topics, returning fallback:', err?.message || err);
    const { category } = req.body || {};
    const topics = getFallbackTrendingTopics(category);
    res.json({ success: true, topics, source: 'fallback' });
  }
});

// Vite Middleware & Static handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Creator AI Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();

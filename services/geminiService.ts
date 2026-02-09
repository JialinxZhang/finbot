
import { GoogleGenAI } from "@google/genai";
import { StockData } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

// Simple cache to avoid redundant AI calls within the session
const imageCache: Record<string, string> = {};

export const analyzeStockKLine = async (stock: StockData): Promise<string> => {
  const ai = getAI();
  const prompt = `Analyze the following stock data for ${stock.name} (${stock.symbol}). 
  Current Price: $${stock.price} (${stock.changePercent}%).
  Recent History (JSON): ${JSON.stringify(stock.history.slice(-5))}
  
  Please provide a concise, "social media style" analysis including:
  1. Technical trend (bullish/bearish).
  2. A key observation of the price action.
  3. A short "Conclusion" for the day.
  
  Keep it under 100 words and use some relevant emojis.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Analysis currently unavailable.";
  } catch (error) {
    console.error("AI Analysis error:", error);
    return "Failed to fetch AI analysis. Check your connection.";
  }
};

/**
 * Generates a consistent toy character based on stock symbol,
 * with facial expressions determined by performance.
 */
export const generateStockToyImage = async (stock: StockData): Promise<string | null> => {
  // Determine "Mood" based on performance
  let mood = "neutral";
  let expression = "calm, neutral face, eyes closed in zen";
  
  if (stock.changePercent >= 5) {
    mood = "extreme_bull";
    expression = "extremely happy, laughing, eyes shaped like dollar signs, cheering pose";
  } else if (stock.changePercent > 0) {
    mood = "bull";
    expression = "cheerful, wide smile, bright energetic eyes";
  } else if (stock.changePercent <= -5) {
    mood = "extreme_bear";
    expression = "crying, melting, angry and disappointed, dramatic pose";
  } else if (stock.changePercent < 0) {
    mood = "bear";
    expression = "sad, frowning, looking down with a teary eye";
  }

  // Create a unique cache key based on symbol and mood
  const cacheKey = `toy-${stock.symbol}-${mood}`;
  
  // Check memory cache
  if (imageCache[cacheKey]) return imageCache[cacheKey];
  
  // Check localStorage for persistence
  const persistentCache = localStorage.getItem(cacheKey);
  if (persistentCache) {
    imageCache[cacheKey] = persistentCache;
    return persistentCache;
  }

  const ai = getAI();
  
  // Character definitions per stock for consistency
  const characterBase: Record<string, string> = {
    'NVDA': "A futuristic cyber-fox with emerald green circuit patterns",
    'AAPL': "A minimalist, sleek designer panda with a gloss white and silver finish",
    'TSLA': "A high-speed electric cyber-cat with glowing red lightning bolts",
    'default': "A cute abstract designer toy creature with geometric shapes"
  };

  const theme = characterBase[stock.symbol] || characterBase.default;
  const prompt = `A single 3D vinyl toy character (designer toy/Pop Mart style) representing ${stock.name}. 
  The character is ${theme}. 
  Current expression: ${expression}. 
  Materials: High-quality glossy resin and polished metal. 
  Centered on a simple circular toy base.
  Lighting: Soft studio lighting, 4K render, clean light gray background, high-end toy photography style.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64 = `data:image/png;base64,${part.inlineData.data}`;
        // Store in cache
        imageCache[cacheKey] = base64;
        try {
          localStorage.setItem(cacheKey, base64);
        } catch (e) {
          // If storage is full, just skip localstorage but keep in memory
          console.warn("Storage full, only caching in memory");
        }
        return base64;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation error:", error);
    return null;
  }
};

export const editChartImage = async (base64Image: string, editPrompt: string): Promise<string | null> => {
  const ai = getAI();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/png',
            },
          },
          {
            text: `Apply the following edit to this financial chart image: "${editPrompt}". Return the edited image.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Edit error:", error);
    return null;
  }
};

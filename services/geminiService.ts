
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import type { UserLocation, GroundingChunk, Restaurant } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchRestaurantRecommendations(
  locationQuery: string,
  foodQuery: string,
  userLocation: UserLocation | null,
  diningStyle: string,
  price: string
) {
  const model = 'gemini-2.5-flash';
  
  let prompt = `Find the best strictly pure vegetarian restaurants for "${foodQuery}" within a 5km radius of ${locationQuery}. Do not recommend places that are not exclusively vegetarian. Format the response as a list. For each restaurant, provide the name, a summary from its bio/description, and a separate summary from user reviews. Use '@@@' as a separator between each restaurant. For each restaurant's details, use the exact format on separate lines: "name:: [Restaurant Name]", "bioSummary:: [Bio Summary]", "reviewSummary:: [Review Summary]". Do not use any markdown formatting like ** or ###.`;

  if (diningStyle) {
    prompt += ` The user prefers a ${diningStyle.toLowerCase()} dining experience.`;
  }
  
  if (price) {
    prompt += ` The user's approximate budget is ₹${price} per person. Please consider this when making recommendations.`;
  }
  
  const config: any = {
    tools: [{ googleMaps: {} }],
  };

  if (userLocation && locationQuery.toLowerCase().includes('current location')) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
      },
    };
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: config,
    });
    
    const text = response.text;
    const recommendations: Restaurant[] = [];
    if (text) {
        const restaurantBlocks = text.split('@@@');

        for (const block of restaurantBlocks) {
            if (block.trim() === '') continue;

            const lines = block.trim().split('\n');
            const restaurant: Partial<Restaurant> = {};

            lines.forEach(line => {
                const [key, ...valueParts] = line.split('::');
                const value = valueParts.join('::').trim();
                if (key && value) {
                    if (key.trim() === 'name') {
                        restaurant.name = value;
                    } else if (key.trim() === 'bioSummary') {
                        restaurant.bioSummary = value;
                    } else if (key.trim() === 'reviewSummary') {
                        restaurant.reviewSummary = value;
                    }
                }
            });

            if (restaurant.name && restaurant.bioSummary && restaurant.reviewSummary) {
                recommendations.push(restaurant as Restaurant);
            }
        }
    }

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;

    return { recommendations, sources: sources ?? [] };
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    throw new Error('Failed to communicate with the recommendation service.');
  }
}

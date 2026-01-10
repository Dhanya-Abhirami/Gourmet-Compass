
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
  
  let prompt = `Find at least 5 of the best strictly pure vegetarian restaurants for "${foodQuery}" within a 5km radius of ${locationQuery}. IMPORTANT: Only include restaurants with a rating of 4 stars or higher. Do not recommend places that are not exclusively vegetarian. Format the response as a list. For each restaurant, provide the name, its star rating, a short highlight sentence explaining why it's a great choice, a summary from its bio/description, and a separate summary from user reviews. Use '@@@' as a separator between each restaurant. For each restaurant's details, use the exact format on separate lines: "name:: [Restaurant Name]", "rating:: [e.g., 4.5]", "highlight:: [Highlight sentence]", "bioSummary:: [Bio Summary]", "reviewSummary:: [Review Summary]". Do not use any markdown formatting like ** or ###.`;

  if (diningStyle && diningStyle !== 'Any') {
    if (diningStyle === 'Buffet') {
      prompt += ` IMPORTANT: The user wants a restaurant that is strictly buffet-style. Do NOT recommend restaurants that also offer à la carte dining. The primary dining format must be buffet.`;
    } else if (diningStyle === 'Unlimited Thali') {
      prompt += ` IMPORTANT: The user wants a restaurant that specializes in an unlimited thali system. Do NOT recommend restaurants where thali is just one option on a larger à la carte menu.`;
    } else if (diningStyle === 'À la carte') {
      prompt += ` The user prefers an à la carte dining experience.`;
    }
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
                    const trimmedKey = key.trim();
                    if (trimmedKey === 'name') {
                        restaurant.name = value;
                    } else if (trimmedKey === 'bioSummary') {
                        restaurant.bioSummary = value;
                    } else if (trimmedKey === 'reviewSummary') {
                        restaurant.reviewSummary = value;
                    } else if (trimmedKey === 'rating') {
                        restaurant.rating = value;
                    } else if (trimmedKey === 'highlight') {
                        restaurant.highlight = value;
                    }
                }
            });

            if (restaurant.name && restaurant.bioSummary && restaurant.reviewSummary && restaurant.rating && restaurant.highlight) {
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

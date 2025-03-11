import { createApi } from 'unsplash-js';

// Centralized logging utility
const LOG_PREFIX = '[Unsplash Service]';

// Predefined fallback images for different topics
const FALLBACK_IMAGES: Record<string, string> = {
  'AI': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'Cybersecurity': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Software Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
  'default': 'https://images.unsplash.com/photo-1526374965328-7f61d4b3a4d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
};

// In-memory cache for image URLs
const imageCache: Record<string, string> = {};

// Initialize Unsplash API client
const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

let unsplash = null;
try {
  if (accessKey) {
    unsplash = createApi({ accessKey });
    console.log(`${LOG_PREFIX} Unsplash client initialized successfully`);
  } else {
    console.warn(`${LOG_PREFIX} No Unsplash access key found, using fallback images`);
  }
} catch (error) {
  console.error(`${LOG_PREFIX} Error initializing Unsplash client:`, error);
}

/**
 * Fetch a relevant image from Unsplash based on a search query
 * @param query Search term for image
 * @param width Desired image width (default: 1200)
 * @param height Desired image height (default: 800)
 * @returns Promise resolving to image URL
 */
export const fetchUnsplashImage = async (
  query: string, 
  width = 1200, 
  height = 800
): Promise<string> => {
  if (!query) {
    console.warn(`${LOG_PREFIX} Empty query provided, using default fallback`);
    return FALLBACK_IMAGES['default'];
  }

  const cacheKey = `${query}-${width}-${height}`;
  
  // Return cached image if available
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  // If no Unsplash client or access key, return fallback immediately
  if (!unsplash || !accessKey) {
    return getFallbackImage(query);
  }

  try {
    const result = await unsplash.search.getPhotos({
      query,
      orientation: 'landscape',
      page: 1,
      perPage: 1,
    });

    if (result?.response?.results?.[0]?.urls?.raw) {
      const imageUrl = `${result.response.results[0].urls.raw}&w=${width}&h=${height}&fit=crop`;
      imageCache[cacheKey] = imageUrl;
      return imageUrl;
    }
    
    return getFallbackImage(query);
  } catch (error) {
    console.error(`${LOG_PREFIX} Error fetching image:`, error);
    return getFallbackImage(query);
  }
};

/**
 * Get a fallback image based on the topic
 * @param query Search topic
 * @returns Fallback image URL matching the query or default
 */
const getFallbackImage = (query: string): string => {
  if (!query) return FALLBACK_IMAGES['default'];
  
  // Find best matching fallback image
  for (const [key, image] of Object.entries(FALLBACK_IMAGES)) {
    if (query.toLowerCase().includes(key.toLowerCase())) {
      return image;
    }
  }
  return FALLBACK_IMAGES['default'];
};

/**
 * Map blog post topics to Unsplash search queries
 */
export const getUnsplashQueryForTopic = (topic: string): string => {
  const topicMap: { [key: string]: string } = {
    'AI': 'artificial intelligence technology robot',
    'Cybersecurity': 'cybersecurity digital security network',
    'Software Development': 'software coding programming computer',
    'Cloud Computing': 'cloud computing data center technology',
    'Blockchain': 'blockchain cryptocurrency digital technology',
    'Career': 'professional career technology workspace',
    'Technology': 'modern technology innovation digital'
  };

  return topicMap[topic] || 'technology innovation digital';
};

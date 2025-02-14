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
console.log(`${LOG_PREFIX} Access Key available:`, !!accessKey);

const unsplash = accessKey 
  ? createApi({
      accessKey: accessKey
    })
  : null;

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
  console.log(`${LOG_PREFIX} Fetching image for query:`, query);
  const cacheKey = `${query}-${width}-${height}`;
  
  // Return cached image if available
  if (imageCache[cacheKey]) {
    console.log(`${LOG_PREFIX} Returning cached image for:`, query);
    return imageCache[cacheKey];
  }

  try {
    // Fallback to default image if no API key
    if (!unsplash) {
      console.warn(`${LOG_PREFIX} No Unsplash client available, using fallback image`);
      return getFallbackImage(query);
    }

    console.log(`${LOG_PREFIX} Searching Unsplash for:`, query);
    // Fetch image from Unsplash
    const result = await unsplash.search.getPhotos({
      query,
      orientation: 'landscape',
      page: 1,
      perPage: 1,
    });

    console.log(`${LOG_PREFIX} Unsplash response:`, result);

    if (!result.response) {
      console.warn(`${LOG_PREFIX} No response from Unsplash API`);
      return getFallbackImage(query);
    }

    const photos = result.response.results;
    if (!photos || photos.length === 0) {
      console.warn(`${LOG_PREFIX} No photos found for query:`, query);
      return getFallbackImage(query);
    }

    const imageUrl = `${photos[0].urls.raw}&w=${width}&h=${height}&fit=crop`;
    console.log(`${LOG_PREFIX} Using Unsplash image:`, imageUrl);

    // Cache the image URL
    imageCache[cacheKey] = imageUrl;
    return imageUrl;

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

  // Find the best matching query, default to a generic tech query
  return topicMap[topic] || 'technology innovation digital';
};

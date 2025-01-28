interface CacheEntry {
    data: any;
    expiry: number;
}

const cache: { [key: string]: CacheEntry } = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Get data from cache
export const getFromCache = (key: string): any | null => {
    const entry = cache[key];
    if (entry && entry.expiry > Date.now()) {
        return entry.data;
    }
    return null;
};

// Save data to cache
export const saveToCache = (key: string, data: any): void => {
    cache[key] = {
        data,
        expiry: Date.now() + CACHE_TTL,
    };
};

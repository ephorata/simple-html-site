import axios from 'axios';
import { Comment } from '../types/comments.type';
import { getFromCache, saveToCache } from '../utils/cache';

const API_URL = 'https://jsonplaceholder.typicode.com/comments?postId=3';

// Fetch and filter comments
export const searchComments = async (query: string): Promise<Comment[]> => {
    // Check cache first
    const cachedResults = getFromCache(query);
    if (cachedResults) {
        console.log('Serving from cache');
        return cachedResults;
    }

    try {
        // Fetch data from API
        const response = await axios.get<Comment[]>(API_URL);
        const filteredComments = response.data.filter((comment) =>
            comment.name.toLowerCase().includes(query)
        );

        // Save results to cache
        saveToCache(query, filteredComments);

        return filteredComments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Failed to fetch comments');
    }
};

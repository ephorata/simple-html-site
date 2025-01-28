import { Request, Response } from 'express';
import { searchComments } from '../services/comments.service';

// Controller for handling search requests
export const searchController = async (req: Request, res: Response): Promise<void> => {
    const query = req.query.query;

    // Validate query parameter
    if (typeof query !== 'string' || !query.trim()) {
        res.status(400).json({ error: 'Query parameter is required and must be a non-empty string' });
        return;
    }
    // Simulate an error when query is "error"
    
    
    try {
        // Fetch results
        if (query === 'error') {
            throw new Error('Simulated server error'); // Simulate a failure
        }
        const results = await searchComments(query.toLowerCase());

        // Respond with results
        res.json(results);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

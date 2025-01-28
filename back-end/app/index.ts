import express from 'express';
import cors from 'cors';


import searchRoute from '../routes/search.route';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Register the search route
app.use('/search', searchRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; // For testing purposes

import express from 'express';
import cors from 'cors';
import connectDB from './database';
import axios from 'axios';


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());

app.use(express.json());

app.post('/api/scrape', async (req, res) => {
    const { url } = req.body;
    try {
        const response = await axios.get(url);
        const data = response.data;

        res.status(200).json({ message: 'Data scraped successfully', data });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error scraping data:', error.message);
            res.status(500).json({ message: 'Error scraping data', error: error.message });
        } else {
            console.error('Unknown error:', error);
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

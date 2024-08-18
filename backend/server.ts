import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import puppeteer from 'puppeteer';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import ScrapedData from './models/ScrapedData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.post('/api/scrape', async (req: Request, res: Response) => {
  const { url } = req.body;

  let browser;
  try {
    new URL(url);
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    let responseStatusCode: number | undefined;

    page.on('response', response => {
      responseStatusCode = response.status();
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    if (responseStatusCode && responseStatusCode !== 200) {
      throw new Error(`Page returned status code ${responseStatusCode}`);
    }

    const scrapedContent = await page.evaluate(() => {
      return document.documentElement.innerText;
    });

    const newScrapedData = new ScrapedData({
      url,
      content: scrapedContent,
      statusCode: responseStatusCode || 200,
    });

    const savedData = await newScrapedData.save();
    const savedDataId = (savedData._id as mongoose.Types.ObjectId).toString();

    // Explicitly cast session to any
    if (!(req.session as any).scrapedDataIds) {
      (req.session as any).scrapedDataIds = [];
    }
    (req.session as any).scrapedDataIds.push(savedDataId);

    res.status(200).json({ message: 'Data scraped successfully', data: scrapedContent, id: savedDataId });
  } catch (err) {
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;

    if (err instanceof Error) {
      errorMessage = err.message;
      if (err.message.includes('404')) {
        statusCode = 404;
        errorMessage = 'Page not found (404)';
      }
    }

    console.error('Error scraping data:', errorMessage);
    res.status(statusCode).json({ message: 'Error scraping data', error: errorMessage });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.get('/api/scraped-data/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const scrapedData = await ScrapedData.findById(id);

    if (!scrapedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({ data: scrapedData });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving data', error: err });
  }
});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

import puppeteer from 'puppeteer';

export const scrapeWebsite = async (url: string): Promise<string> => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the provided URL
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Extract content from the page
  const scrapedContent = await page.evaluate(() => {
    return document.documentElement.innerText;
  });

  // Close the browser
  await browser.close();

  return scrapedContent;
};
  
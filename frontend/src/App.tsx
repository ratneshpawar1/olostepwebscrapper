import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [scrapedData, setScrapedData] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/scrape', { url });
      setScrapedData(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to scrape the data.');
      setScrapedData('');
    }
  };

  return (
    <div className="App">
      <h1>Web Scraper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to scrape"
        />
        <button type="submit">Scrape</button>
      </form>
      {error && <p>{error}</p>}
      {scrapedData && (
        <div>
          <h2>Scraped Data:</h2>
          <pre>{scrapedData}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

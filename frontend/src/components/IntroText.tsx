import React from 'react';

const IntroText: React.FC = () => {
  return (
    <div className="intro-text">
      <p className="created-by">
        Created by Ratnesh Pawar
        <a href="https://www.ratneshpawar.bio/" target="_blank" rel="noopener noreferrer">
          <span className="portfolio-icon">🔗</span>
        </a>
      </p>
      <h1>
        Scrap the web Data with <span className="magic">MAGIC</span>
      </h1>
      <p>
        Real-Time Web Scraper is a fast and efficient open-source web scraping application.
        It swiftly extracts and displays data from any provided URL in real-time, offering
        users immediate access to up-to-date information. Perfect for developers, researchers,
        and anyone needing instant data retrieval, this tool leverages advanced web scraping
        techniques to ensure accurate and timely results. Experience the power of real-time
        data extraction with the flexibility of our open-source platform.
      </p>
    </div>
  );
};

export default IntroText;

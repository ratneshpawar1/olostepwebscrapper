import React, { useState } from "react";

interface ScrapeFormProps {
  onSubmit: (url: string) => void;
}

const ScrapeForm: React.FC<ScrapeFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(url);
    setUrl(""); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="scrape-form">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to scrape"
        className="scrape-input"
      />
      <button type="submit" className="scrape-button">
        Scrape
      </button>
    </form>
  );
};

export default ScrapeForm;

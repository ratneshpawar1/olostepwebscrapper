import React from "react";

interface ResultsProps {
  scrapedData: string;
  error: string;
  onSave?: () => void; // Make this prop optional
}

const Results: React.FC<ResultsProps> = ({ scrapedData, error, onSave }) => {
  return (
    <div className="results">
      {error && <p className="error">{error}</p>}
      {scrapedData && (
        <>
          {onSave && (
            <button className="save-button" onClick={onSave}>
              Save Data
            </button>
          )}
          <h2>Scraped Data:</h2>
          <pre className="scraped-content">{scrapedData}</pre>
        </>
      )}
    </div>
  );
};

export default Results;

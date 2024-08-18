import React from "react";
import { TailSpin } from "react-loader-spinner";
import { FiClipboard, FiDownload } from "react-icons/fi"; // Import clipboard and download icons

interface ResultsProps {
  scrapedData: string;
  error: string;
  loading: boolean;
}

const Results: React.FC<ResultsProps> = ({ scrapedData, error, loading }) => {
  const copyToClipboard = () => {
    if (scrapedData) {
      navigator.clipboard.writeText(scrapedData);
      alert("Copied to clipboard!");
    }
  };

  const downloadAsTextFile = () => {
    const textContent = "data:text/plain;charset=utf-8," + encodeURIComponent(scrapedData);
    const link = document.createElement("a");
    link.setAttribute("href", textContent);
    link.setAttribute("download", "scraped_data.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <TailSpin height="50" width="50" color="#00BFFF" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="results">
      {error && <p className="error">{error}</p>}
      {scrapedData && (
        <>
          <div className="results-header">
            <FiClipboard
              className="copy-icon"
              onClick={copyToClipboard}
              title="Copy to Clipboard"
            />
            <FiDownload
              className="download-icon"
              onClick={downloadAsTextFile}
              title="Download as Text File"
            />
          </div>
          <pre className="scraped-content">{scrapedData}</pre>
        </>
      )}
    </div>
  );
};

export default Results;

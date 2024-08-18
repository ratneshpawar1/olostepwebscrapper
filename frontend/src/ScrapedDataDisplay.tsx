import React, { useEffect, useState } from "react";
import axios from "axios";

interface ScrapedData {
  _id: string;
  url: string;
  htmlContent: string;
  scrapedAt: string;
}

const ScrapedDataDisplay: React.FC = () => {
  const [scrapedData, setScrapedData] = useState<ScrapedData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/scraped-data"
        );
        console.log("Fetched Data:", response.data.data); // Log the entire data array
        setScrapedData(response.data.data);
      } catch (err) {
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Saved Scraped Data</h2>
      {error && <p>{error}</p>}
      {scrapedData.length > 0 ? (
        <ul>
          {scrapedData.map((data) => (
            <li key={data._id}>
              <p>
                <strong>URL:</strong> {data.url}
              </p>
              <p>
                <strong>Scraped At:</strong>{" "}
                {new Date(data.scrapedAt).toLocaleString()}
              </p>
              <pre>
                {data.htmlContent && typeof data.htmlContent === "string"
                  ? data.htmlContent.substring(0, 200)
                  : "Content cannot be displayed"}
              </pre>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default ScrapedDataDisplay;

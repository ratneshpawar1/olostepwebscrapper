import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import IntroText from "./components/IntroText";
import ScrapeForm from "./components/ScrapeForm";
import Results from "./components/Results";

interface SavedData {
  id: string;
  url: string;
}

function App() {
  const [scrapedData, setScrapedData] = useState("");
  const [error, setError] = useState("");
  const [savedData, setSavedData] = useState<SavedData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async (url: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/scrape", {
        url,
      });
      setScrapedData(response.data.data);
      setError("");

      const newSavedData: SavedData = {
        id: response.data.id, // Assuming the backend returns the ID of the saved data
        url: url,
      };
      setSavedData([...savedData, newSavedData]); // Add the new object to saved data
    } catch (err) {
      setError("Failed to scrape the data.");
      setScrapedData("");
    }
  };

  const handleSaveData = () => {
    if (scrapedData) {
      const newSavedData: SavedData = {
        id: Date.now().toString(), // You can replace this with a better ID generation method
        url: scrapedData,
      };
      setSavedData([...savedData, newSavedData]);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectSavedData = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/scraped-data/${id}`);
      setScrapedData(response.data.data.content); // Assuming 'content' is where the scraped data is stored
      setError("");
    } catch (err) {
      setError("Failed to load saved data.");
      setScrapedData("");
    }
  };

  return (
    <div className="App">
      <Navbar
        savedData={savedData}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
        onSelectSavedData={handleSelectSavedData} // Pass the handler to Navbar
      />
      <IntroText />
      <ScrapeForm onSubmit={handleSubmit} />
      <Results scrapedData={scrapedData} error={error} onSave={handleSaveData} />
    </div>
  );
}

export default App;

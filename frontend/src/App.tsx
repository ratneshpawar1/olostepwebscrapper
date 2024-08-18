import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import IntroText from "./components/IntroText";
import ScrapeForm from "./components/ScrapeForm";
import Results from "./components/Results";
import DarkModeToggle from "./components/DarkModeToggle"; // Import the DarkModeToggle component

interface SavedData {
  id: string;
  url: string;
}

function App() {
  const [scrapedData, setScrapedData] = useState("");
  const [error, setError] = useState("");
  const [savedData, setSavedData] = useState<SavedData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/scrape", {
        url,
      });
      setScrapedData(response.data.data);
      setError("");
      setLoading(false);

      const newSavedData: SavedData = {
        id: Date.now().toString(),
        url: url,
      };
      setSavedData([...savedData, newSavedData]);
    } catch (err) {
      setError("Failed to scrape the data.");
      setScrapedData("");
      setLoading(false);
    }
  };

  const handleSelectSavedData = (id: string) => {
    const selectedData = savedData.find((data) => data.id === id);
    if (selectedData) {
      handleSubmit(selectedData.url);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="App">
      <Navbar
        savedData={savedData}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
        onSelectSavedData={handleSelectSavedData} // Pass the function here
      />
      <DarkModeToggle /> {/* Add the DarkModeToggle component here */}
      <IntroText />
      <ScrapeForm onSubmit={handleSubmit} />
      <Results scrapedData={scrapedData} error={error} loading={loading} />
    </div>
  );
}

export default App;

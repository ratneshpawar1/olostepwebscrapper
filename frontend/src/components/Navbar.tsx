import React from "react";
import DarkModeToggle from "./DarkModeToggle"; // Import the DarkModeToggle component

interface SavedData {
  id: string;
  url: string;
}

interface NavbarProps {
  savedData: SavedData[];
  showDropdown: boolean;
  toggleDropdown: () => void;
  onSelectSavedData: (id: string) => void; 
}

const Navbar: React.FC<NavbarProps> = ({
  savedData,
  showDropdown,
  toggleDropdown,
  onSelectSavedData,
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ScrapLeague</div>
      <div className="navbar-menu">
        <DarkModeToggle /> {/* Add the DarkModeToggle component here */}
        <button className="dropdown-button" onClick={toggleDropdown}>
          Saved Data ▼
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            {savedData.length > 0 ? (
              savedData.map((data) => (
                <a
                  key={data.id}
                  href="#"
                  role="button"  // Add this for better accessibility
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    onSelectSavedData(data.id);
                  }}
                  style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                >
                  {new URL(data.url).hostname}
                </a>
              ))
            ) : (
              <p>No data saved</p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

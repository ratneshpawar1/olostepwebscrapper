import React from "react";

interface SavedData {
  id: string;
  url: string;
}

interface NavbarProps {
  savedData: SavedData[];
  showDropdown: boolean;
  toggleDropdown: () => void;
  onSelectSavedData: (id: string) => void; // New prop to handle selection
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
        <button className="dropdown-button" onClick={toggleDropdown}>
          Saved Data ▼
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            {savedData.length > 0 ? (
              savedData.map((data) => (
                <a key={data.id} href="#" onClick={() => onSelectSavedData(data.id)}>
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

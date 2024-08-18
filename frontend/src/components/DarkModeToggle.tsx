// DarkModeToggle.tsx
import React, { useEffect } from 'react';

const DarkModeToggle: React.FC = () => {
  const setTheme = (themeName: string) => {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  };

  const toggleTheme = () => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
    } else {
      setTheme('theme-dark');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
      const slider = document.getElementById('slider') as HTMLInputElement;
      if (slider) slider.checked = true;
    } else {
      setTheme('theme-light');
    }
  }, []);

  return (
    <label className="switch">
      <input type="checkbox" onChange={toggleTheme} id="slider" />
      <span className="slider round"></span>
    </label>
  );
};

export default DarkModeToggle;

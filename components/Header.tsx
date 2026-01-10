
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center my-8">
      <div className="flex items-center justify-center gap-4 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11a1 1 0 0 0 1.52 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-light tracking-tight">
          Gourmet Compass
        </h1>
      </div>
      <p className="text-lg text-brand-muted">Your AI guide to the perfect meal.</p>
    </header>
  );
};

export default Header;

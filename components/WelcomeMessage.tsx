
import React from 'react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="p-6 text-center bg-stone-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-brand-secondary mb-2">Welcome to Gourmet Compass!</h2>
      <p className="text-brand-muted">
        Ready to discover your next favorite restaurant? Just tell us what you're craving and where you are,
        and our AI will find the perfect match for you using real-time Google Maps data.
      </p>
    </div>
  );
};

export default WelcomeMessage;

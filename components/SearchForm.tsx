
import React from 'react';

interface SearchFormProps {
  locationQuery: string;
  setLocationQuery: (value: string) => void;
  foodQuery: string;
  setFoodQuery: (value: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  diningStyle: string;
  setDiningStyle: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  onNearMeClick: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  locationQuery,
  setLocationQuery,
  foodQuery,
  setFoodQuery,
  handleSearch,
  isLoading,
  diningStyle,
  setDiningStyle,
  price,
  setPrice,
  onNearMeClick,
}) => {
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-stone-800 rounded-lg shadow-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="food" className="block text-sm font-medium text-brand-muted mb-1">Food or Vibe</label>
          <input
            id="food"
            type="text"
            value={foodQuery}
            onChange={(e) => setFoodQuery(e.target.value)}
            placeholder="e.g., 'cozy italian pasta' or 'trendy tacos'"
            className="w-full px-4 py-2 bg-brand-dark border border-stone-600 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-brand-muted mb-1">Location</label>
           <div className="relative flex items-center">
              <input
                id="location"
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="e.g., 'Brooklyn, NY'"
                className="w-full px-4 py-2 bg-brand-dark border border-stone-600 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition-colors pr-10"
                required
              />
              <button
                type="button"
                onClick={onNearMeClick}
                className="absolute right-0 mr-3 text-brand-muted hover:text-brand-secondary transition-colors"
                aria-label="Use my current location"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v2m0 16v2m-8-10H2m20 0h-2" />
                </svg>
              </button>
           </div>
        </div>
      </div>
       <div className="pt-2">
          <label className="block text-sm font-medium text-brand-muted mb-2 text-center">Or pick a vibe...</label>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Casual Dining', 'Family Gathering', 'Fine Dining', 'Quick Bite'].map((vibe) => (
              <button
                key={vibe}
                type="button"
                onClick={() => setFoodQuery(vibe)}
                className="px-4 py-1.5 bg-stone-700 text-brand-light rounded-full text-sm hover:bg-brand-secondary hover:text-brand-dark transition-colors"
              >
                {vibe}
              </button>
            ))}
          </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mt-4 border-t border-stone-700">
        <div>
          <label htmlFor="diningStyle" className="block text-sm font-medium text-brand-muted mb-1">Dining Style</label>
          <select
            id="diningStyle"
            value={diningStyle}
            onChange={(e) => setDiningStyle(e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-stone-600 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition-colors"
          >
            <option>Any</option>
            <option>À la carte</option>
            <option>Buffet</option>
            <option>Unlimited Thali</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-brand-muted mb-1">Price/Person (Optional)</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-brand-muted sm:text-sm">₹</span>
            </div>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 1500"
              className="w-full pl-7 pr-4 py-2 bg-brand-dark border border-stone-600 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition-colors"
              min="0"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-bold rounded-md hover:bg-brand-secondary transition-all duration-300 ease-in-out disabled:bg-brand-muted disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Finding...
          </>
        ) : (
          'Find Restaurants'
        )}
      </button>
    </form>
  );
};

export default SearchForm;

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
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-brand-muted mb-1">Location</label>
          <input
            id="location"
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="e.g., 'Brooklyn, NY' or 'near me'"
            className="w-full px-4 py-2 bg-brand-dark border border-stone-600 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition-colors"
          />
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


import React, { useRef } from 'react';
import type { GroundingChunk, Restaurant } from '../types';

interface ResultsDisplayProps {
  recommendations: Restaurant[];
  sources: GroundingChunk[] | null;
}

const findSourceForRestaurant = (name: string, sources: GroundingChunk[] | null): string | null => {
  if (!sources) return null;
  const normalizedName = name.toLowerCase().replace(/\s+/g, ' ').trim();
  const source = sources.find(s => {
    const normalizedTitle = s.maps.title.toLowerCase().replace(/\s+/g, ' ').trim();
    return normalizedTitle.includes(normalizedName) || normalizedName.includes(normalizedTitle);
  });
  return source ? source.maps.uri : null;
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ recommendations, sources }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.offsetWidth * 0.9;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    
    if (!recommendations || recommendations.length === 0) {
        return (
             <div className="p-6 text-center bg-stone-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-brand-secondary mb-2">No recommendations found.</h2>
                <p className="text-brand-muted">
                    Sorry, we couldn't find any spots matching your criteria. Try broadening your search!
                </p>
            </div>
        )
    }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-brand-secondary mb-4 text-center">Your Recommendations</h2>
      
      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/80 p-2 text-white shadow-lg backdrop-blur-sm hover:bg-brand-primary disabled:opacity-50" aria-label="Scroll left">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/80 p-2 text-white shadow-lg backdrop-blur-sm hover:bg-brand-primary disabled:opacity-50" aria-label="Scroll right">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 p-2 -mx-2">
        {recommendations.map((restaurant, index) => {
          const link = findSourceForRestaurant(restaurant.name, sources);
          return (
            <div key={index} className="flex-shrink-0 w-[90%] md:w-[80%] snap-center bg-stone-800 rounded-lg shadow-xl p-6 border border-stone-700">
              <h3 className="text-xl font-bold text-brand-secondary mb-3">
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                    {restaurant.name}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                ) : (
                  restaurant.name
                )}
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-brand-muted mb-1">Bio Summary</h4>
                  <p className="text-brand-light text-sm">{restaurant.bioSummary}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-muted mb-1">Review Summary</h4>
                  <p className="text-brand-light text-sm">{restaurant.reviewSummary}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsDisplay;

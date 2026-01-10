
import React, { useState, useEffect, useCallback } from 'react';
import type { GroundingChunk, UserLocation, Restaurant } from './types';
import { fetchRestaurantRecommendations } from './services/geminiService';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Header from './components/Header';
import WelcomeMessage from './components/WelcomeMessage';

const App: React.FC = () => {
  const [locationQuery, setLocationQuery] = useState<string>('');
  const [foodQuery, setFoodQuery] = useState<string>('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [recommendations, setRecommendations] = useState<Restaurant[] | null>(null);
  const [sources, setSources] = useState<GroundingChunk[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const [diningStyle, setDiningStyle] = useState<string>('Any');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn(`Geolocation error: ${error.message}`);
        setError('Could not get your location. Please enter a location manually.');
      }
    );
  }, []);

  const handleSearch = useCallback(async () => {
    if (!locationQuery || !foodQuery) {
      setError('Please fill in both fields.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setInitialLoad(false);
    setRecommendations(null);
    setSources(null);

    try {
      const result = await fetchRestaurantRecommendations(
        locationQuery,
        foodQuery,
        userLocation,
        diningStyle,
        price
      );
      if (result) {
        setRecommendations(result.recommendations);
        setSources(result.sources);
      } else {
        setError('Could not get recommendations. Please try a different search.');
      }
    // FIX: The `catch` block below had invalid arrow function syntax (`=>`), which caused all subsequent errors.
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(e);
      setError(`Failed to fetch recommendations: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [locationQuery, foodQuery, userLocation, diningStyle, price]);
  
  const handleNearMeClick = useCallback(() => {
      if(userLocation) {
          setLocationQuery('my current location');
      } else {
          setError('Could not get your location. Please enable location services or enter a location manually.');
      }
  }, [userLocation]);

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main>
          <SearchForm
            locationQuery={locationQuery}
            setLocationQuery={setLocationQuery}
            foodQuery={foodQuery}
            setFoodQuery={setFoodQuery}
            handleSearch={handleSearch}
            isLoading={isLoading}
            diningStyle={diningStyle}
            setDiningStyle={setDiningStyle}
            price={price}
            setPrice={setPrice}
            onNearMeClick={handleNearMeClick}
          />
          <div className="mt-8">
            {initialLoad && <WelcomeMessage />}
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {recommendations && (
              <ResultsDisplay
                recommendations={recommendations}
                sources={sources}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
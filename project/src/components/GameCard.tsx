import { useState } from 'react';
import type { WeatherData } from '../types';

interface GameCardProps {
  weather: WeatherData;
  onGuess: (guess: number) => void;
  isRevealed: boolean;
}

export const GameCard = ({ weather, onGuess, isRevealed }: GameCardProps) => {
  const [guess, setGuess] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guessNum = parseInt(guess);
    if (!isNaN(guessNum)) {
      onGuess(guessNum);
      setGuess('');
    }
  };

  return (
    <div className="game-card">
      <div className="location-info">
        <h2>{weather.city}</h2>
        <p className="country">{weather.country}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Conditions</span>
          <span className="detail-value">{weather.description}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{weather.windSpeed} km/h</span>
        </div>
      </div>

      {!isRevealed ? (
        <form onSubmit={handleSubmit} className="guess-form">
          <div className="input-group">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter temperature"
              className="guess-input"
              autoFocus
            />
            <span className="celsius">°C</span>
          </div>
          <button type="submit" className="submit-btn">
            Submit Guess
          </button>
        </form>
      ) : (
        <div className="temperature-reveal">
          <div className="actual-temp">
            <span className="temp-label">Actual Temperature</span>
            <span className="temp-value">{weather.temperature}°C</span>
          </div>
        </div>
      )}
    </div>
  );
};

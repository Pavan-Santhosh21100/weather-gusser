import { useState, useEffect } from 'react';
import { GameCard } from './components/GameCard';
import { ScoreDisplay } from './components/ScoreDisplay';
import { GameOver } from './components/GameOver';
import { Leaderboard } from './components/Leaderboard';
import { getRandomWeather, calculatePoints } from './lib/weatherService';
import type { WeatherData, GameRound } from './types';
import './App.css';

const TOTAL_ROUNDS = 5;

function App() {
  const [gameState, setGameState] = useState<'playing' | 'gameover'>('playing');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [rounds, setRounds] = useState<GameRound[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    setCurrentWeather(getRandomWeather());
    setIsRevealed(false);
  };

  const handleGuess = (guess: number) => {
    if (!currentWeather || isRevealed) return;

    const points = calculatePoints(currentWeather.temperature, guess);
    const newRound: GameRound = {
      city: currentWeather.city,
      country: currentWeather.country,
      actualTemp: currentWeather.temperature,
      userGuess: guess,
      points,
    };

    setRounds([...rounds, newRound]);
    setTotalScore(totalScore + points);
    setIsRevealed(true);

    if (rounds.length + 1 >= TOTAL_ROUNDS) {
      setTimeout(() => {
        setGameState('gameover');
      }, 2000);
    } else {
      setTimeout(() => {
        startNewRound();
      }, 2000);
    }
  };

  const handlePlayAgain = () => {
    setGameState('playing');
    setRounds([]);
    setTotalScore(0);
    startNewRound();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Guesser</h1>
        <p className="tagline">Can you guess the temperature?</p>
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="leaderboard-toggle"
        >
          {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
        </button>
      </header>

      <main className="app-main">
        {showLeaderboard && (
          <div className="leaderboard-container">
            <Leaderboard />
          </div>
        )}

        {gameState === 'playing' ? (
          <div className="game-container">
            <ScoreDisplay
              rounds={rounds}
              totalScore={totalScore}
              currentRound={rounds.length + 1}
            />
            {currentWeather && (
              <GameCard
                weather={currentWeather}
                onGuess={handleGuess}
                isRevealed={isRevealed}
              />
            )}
          </div>
        ) : (
          <GameOver
            rounds={rounds}
            totalScore={totalScore}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </main>
    </div>
  );
}

export default App;

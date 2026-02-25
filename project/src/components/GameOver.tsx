import { useState } from 'react';
import type { GameRound } from '../types';
import { saveGameScore } from '../lib/database';

interface GameOverProps {
  rounds: GameRound[];
  totalScore: number;
  onPlayAgain: () => void;
}

export const GameOver = ({ rounds, totalScore, onPlayAgain }: GameOverProps) => {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const averageAccuracy = rounds.reduce((acc, round) => {
    const diff = Math.abs(round.actualTemp - (round.userGuess || 0));
    const accuracy = Math.max(0, 100 - diff * 2);
    return acc + accuracy;
  }, 0) / rounds.length;

  const handleSaveScore = async () => {
    if (saved) return;

    setSaving(true);
    const result = await saveGameScore(
      playerName || 'Anonymous',
      totalScore,
      rounds.length,
      averageAccuracy
    );

    if (result.success) {
      setSaved(true);
    }
    setSaving(false);
  };

  return (
    <div className="game-over">
      <h2>Game Over!</h2>

      <div className="final-stats">
        <div className="stat-item">
          <span className="stat-label">Final Score</span>
          <span className="stat-value">{totalScore}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Accuracy</span>
          <span className="stat-value">{averageAccuracy.toFixed(1)}%</span>
        </div>
      </div>

      <div className="rounds-summary">
        <h3>Your Guesses</h3>
        {rounds.map((round, index) => (
          <div key={index} className="round-summary-item">
            <span className="round-number">Round {index + 1}</span>
            <span className="round-city">{round.city}</span>
            <span className="round-temps">
              {round.userGuess}°C → {round.actualTemp}°C
            </span>
            <span className="round-points">{round.points} pts</span>
          </div>
        ))}
      </div>

      <div className="save-score-section">
        {!saved ? (
          <>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name (optional)"
              className="name-input"
              maxLength={30}
            />
            <button
              onClick={handleSaveScore}
              disabled={saving}
              className="save-score-btn"
            >
              {saving ? 'Saving...' : 'Save Score'}
            </button>
          </>
        ) : (
          <div className="saved-message">Score saved to leaderboard!</div>
        )}
      </div>

      <button onClick={onPlayAgain} className="play-again-btn">
        Play Again
      </button>
    </div>
  );
};

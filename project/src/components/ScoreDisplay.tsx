import type { GameRound } from '../types';

interface ScoreDisplayProps {
  rounds: GameRound[];
  totalScore: number;
  currentRound: number;
}

export const ScoreDisplay = ({ rounds, totalScore, currentRound }: ScoreDisplayProps) => {
  return (
    <div className="score-display">
      <div className="score-header">
        <div className="current-score">
          <span className="score-label">Score</span>
          <span className="score-number">{totalScore}</span>
        </div>
        <div className="round-info">
          <span className="round-text">Round {currentRound} of 5</span>
        </div>
      </div>

      {rounds.length > 0 && rounds[rounds.length - 1].userGuess !== null && (
        <div className="last-round-result">
          <div className="result-header">Last Round</div>
          <div className="result-details">
            <span className="result-city">{rounds[rounds.length - 1].city}</span>
            <div className="result-temps">
              <span>
                Your guess: <strong>{rounds[rounds.length - 1].userGuess}°C</strong>
              </span>
              <span>
                Actual: <strong>{rounds[rounds.length - 1].actualTemp}°C</strong>
              </span>
            </div>
            <span className="result-points">+{rounds[rounds.length - 1].points} points</span>
          </div>
        </div>
      )}
    </div>
  );
};

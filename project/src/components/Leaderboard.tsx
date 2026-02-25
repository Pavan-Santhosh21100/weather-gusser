import { useEffect, useState } from 'react';
import type { GameScore } from '../types';
import { getTopScores } from '../lib/database';

export const Leaderboard = () => {
  const [scores, setScores] = useState<GameScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    setLoading(true);
    const topScores = await getTopScores(10);
    setScores(topScores);
    setLoading(false);
  };

  if (loading) {
    return <div className="leaderboard loading">Loading leaderboard...</div>;
  }

  return (
    <div className="leaderboard">
      <h3>Top Players</h3>
      {scores.length === 0 ? (
        <p className="no-scores">No scores yet. Be the first!</p>
      ) : (
        <div className="scores-list">
          {scores.map((score, index) => (
            <div key={score.id} className="score-item">
              <span className="rank">#{index + 1}</span>
              <span className="player-name">{score.player_name}</span>
              <span className="score-value">{score.score} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

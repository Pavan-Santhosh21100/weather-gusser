/*
  # Weather Guessing Game - Database Schema

  1. New Tables
    - `game_scores`
      - `id` (uuid, primary key) - Unique identifier for each game score
      - `player_name` (text) - Name of the player
      - `score` (integer) - Points earned in the game
      - `guesses_count` (integer) - Number of guesses made in the game
      - `accuracy` (numeric) - Average accuracy percentage across all guesses
      - `created_at` (timestamptz) - When the score was recorded

  2. Security
    - Enable RLS on `game_scores` table
    - Add policy for anyone to insert their scores (public game)
    - Add policy for anyone to read all scores (public leaderboard)

  3. Indexes
    - Index on `score` for efficient leaderboard queries
    - Index on `created_at` for time-based filtering
*/

-- Create game_scores table
CREATE TABLE IF NOT EXISTS game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL DEFAULT 'Anonymous',
  score integer NOT NULL DEFAULT 0,
  guesses_count integer NOT NULL DEFAULT 0,
  accuracy numeric(5,2) NOT NULL DEFAULT 0.00,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert their game scores
CREATE POLICY "Anyone can insert game scores"
  ON game_scores
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Anyone can view all game scores (public leaderboard)
CREATE POLICY "Anyone can view game scores"
  ON game_scores
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_game_scores_score ON game_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_game_scores_created_at ON game_scores(created_at DESC);
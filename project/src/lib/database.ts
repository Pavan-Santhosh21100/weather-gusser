import { supabase } from './supabase';
import type { GameScore } from '../types';

export const saveGameScore = async (
  playerName: string,
  score: number,
  guessesCount: number,
  accuracy: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('game_scores')
      .insert({
        player_name: playerName || 'Anonymous',
        score,
        guesses_count: guessesCount,
        accuracy,
      });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error saving score:', error);
    return { success: false, error: 'Failed to save score' };
  }
};

export const getTopScores = async (limit: number = 10): Promise<GameScore[]> => {
  try {
    const { data, error } = await supabase
      .from('game_scores')
      .select('*')
      .order('score', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
};

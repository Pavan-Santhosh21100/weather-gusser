export interface GameScore {
  id: string;
  player_name: string;
  score: number;
  guesses_count: number;
  accuracy: number;
  created_at: string;
}

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export interface GameRound {
  city: string;
  country: string;
  actualTemp: number;
  userGuess: number | null;
  points: number;
}

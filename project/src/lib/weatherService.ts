import type { WeatherData } from '../types';

const cities = [
  { name: 'Tokyo', country: 'Japan', baseTemp: 15 },
  { name: 'London', country: 'United Kingdom', baseTemp: 12 },
  { name: 'New York', country: 'United States', baseTemp: 10 },
  { name: 'Dubai', country: 'United Arab Emirates', baseTemp: 30 },
  { name: 'Sydney', country: 'Australia', baseTemp: 22 },
  { name: 'Moscow', country: 'Russia', baseTemp: 5 },
  { name: 'Mumbai', country: 'India', baseTemp: 28 },
  { name: 'Paris', country: 'France', baseTemp: 13 },
  { name: 'Singapore', country: 'Singapore', baseTemp: 27 },
  { name: 'Cairo', country: 'Egypt', baseTemp: 25 },
  { name: 'Toronto', country: 'Canada', baseTemp: 8 },
  { name: 'Rio de Janeiro', country: 'Brazil', baseTemp: 26 },
  { name: 'Berlin', country: 'Germany', baseTemp: 11 },
  { name: 'Bangkok', country: 'Thailand', baseTemp: 29 },
  { name: 'Los Angeles', country: 'United States', baseTemp: 18 },
];

const weatherDescriptions = [
  'Clear sky',
  'Partly cloudy',
  'Overcast',
  'Light rain',
  'Sunny',
  'Cloudy',
  'Foggy',
];

export const getRandomWeather = (): WeatherData => {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const tempVariation = Math.floor(Math.random() * 11) - 5;
  const temperature = Math.round(city.baseTemp + tempVariation);

  return {
    city: city.name,
    country: city.country,
    temperature,
    description: weatherDescriptions[Math.floor(Math.random() * weatherDescriptions.length)],
    humidity: Math.floor(Math.random() * 40) + 40,
    windSpeed: Math.floor(Math.random() * 20) + 5,
  };
};

export const calculatePoints = (actualTemp: number, guessedTemp: number): number => {
  const difference = Math.abs(actualTemp - guessedTemp);

  if (difference === 0) return 100;
  if (difference <= 2) return 80;
  if (difference <= 5) return 60;
  if (difference <= 10) return 40;
  if (difference <= 15) return 20;
  return 10;
};

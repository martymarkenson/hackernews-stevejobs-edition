import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export interface Story {
  id: number;
  title: string;
  url?: string;
  text?: string;
  by: string;
  score: number;
  time: number;
  descendants: number;
  kids?: number[];
  type: 'story' | 'job' | 'poll' | 'pollopt';
}

export interface Comment {
  id: number;
  text?: string;
  by: string;
  time: number;
  kids?: number[];
  parent: number;
  type: 'comment';
  deleted?: boolean;
  dead?: boolean;
}

export interface User {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}

// Get top stories IDs
export const getTopStories = async (): Promise<number[]> => {
  const response = await axios.get(`${BASE_URL}/topstories.json`);
  return response.data;
};

// Get new stories IDs
export const getNewStories = async (): Promise<number[]> => {
  const response = await axios.get(`${BASE_URL}/newstories.json`);
  return response.data;
};

// Get best stories IDs
export const getBestStories = async (): Promise<number[]> => {
  const response = await axios.get(`${BASE_URL}/beststories.json`);
  return response.data;
};

// Get ask stories IDs
export const getAskStories = async (): Promise<number[]> => {
  const response = await axios.get(`${BASE_URL}/askstories.json`);
  return response.data;
};

// Get show stories IDs
export const getShowStories = async (): Promise<number[]> => {
  const response = await axios.get(`${BASE_URL}/showstories.json`);
  return response.data;
};

// Get job stories IDs
export const getJobStories = async (): Promise<number[]> => {
  const response = await axios.get(`${BASE_URL}/jobstories.json`);
  return response.data;
};

// Get item (story, comment, etc.) by ID
export const getItem = async <T>(id: number): Promise<T> => {
  const response = await axios.get(`${BASE_URL}/item/${id}.json`);
  return response.data;
};

// Get user by ID
export const getUser = async (id: string): Promise<User> => {
  const response = await axios.get(`${BASE_URL}/user/${id}.json`);
  return response.data;
};

// Fetch multiple items in parallel
export const getItems = async <T>(ids: number[], limit: number = 30): Promise<T[]> => {
  const limitedIds = ids.slice(0, limit);
  const itemPromises = limitedIds.map(id => getItem<T>(id));
  return Promise.all(itemPromises);
}; 
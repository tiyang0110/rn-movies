const API_KEY = '34dd1ee0f946af031080543a470e2f0b';
const BASE_URL = 'https://api.themoviedb.org/3';

const trending = () => fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then(res => res.json());
const upComing = () => fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(res => res.json());
const nowPlaying = () => fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(res => res.json());

export const moviesAPI = { trending, upComing, nowPlaying };
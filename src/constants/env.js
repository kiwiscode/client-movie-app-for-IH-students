const API_BASE_URL = import.meta.env.VITE_API_URL;

export const MOVIES_API_URL = `${API_BASE_URL}/api/movies`;
export const MOVIE_DETAIL_API_URL = (movieId) =>
  `${API_BASE_URL}/api/movies/${movieId}`;
export const SEARCH_API_URL = (searchTerm) =>
  `${API_BASE_URL}/api/movies/search/${searchTerm}`;
export const MOVIES_API_URL_WITH_QUERIES = (queryParams) =>
  `${API_BASE_URL}/api/movies?${queryParams.toString()}`;
export const MOVIE_REVIEW_API_URL = (movieId) =>
  `${API_BASE_URL}/api/reviews/${movieId}`;

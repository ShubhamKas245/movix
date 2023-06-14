import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_APP_MOVIEDB_KEY;


export async function fetchDataFromMovieDB(endpoint, params = {}) {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: { ...params, api_key: API_KEY },
    });

    return response.data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

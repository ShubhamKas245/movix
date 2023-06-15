import { useEffect, useState } from "react";
import { fetchDataFromMovieDB } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the fetchData function to handle data fetching
    const fetchData = async () => {
      try {
        // Set loading state to true and reset data and error states
        setLoading(true);
        setData(null);
        setError(null);

        // Fetch data from the MovieDB API using the provided URL
        const res = await fetchDataFromMovieDB(url);

        // Update loading state to false and store the fetched data
        setLoading(false);
        setData(res);
      } catch (err) {
        // Update loading state to false and store the error message
        setLoading(false);
        setError("Something went wrong");
      }
    };
  // Call the fetchData function when the URL dependency changes
    fetchData();
  }, [url]);

  // Return the data, loading, and error states as an object
  return { data, loading, error };
};
export default useFetch;

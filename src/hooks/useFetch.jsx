import { useEffect, useState } from "react";
import { fetchDataFromMovieDB } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setData(null);
        setError(null);

        const res = await fetchDataFromMovieDB(url);
        setLoading(false);
        setData(res);
      } catch (err) {
        setLoading(false);
        setError("Something went wrong");
      }
    };

    fetchData();
  }, [url]);
  return { data, loading, error };
};
export default useFetch;

import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const method = options.method || "get";

      try {
        const response = await axios({
          url,
          method,
          cancelToken: source.token,
          ...options,
        });
        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel("Request canceled by cleanup");
    };
  }, [url, JSON.stringify(options)]);

  return { data, setData, error, loading };
};

export default useFetch;

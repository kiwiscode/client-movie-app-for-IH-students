import { useState, useRef } from "react";
import axios from "axios";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const cancelSource = useRef(null);

  const fetchData = async ({ url, method = "get", ...options }) => {
    if (!url) return;

    if (cancelSource.current) {
      cancelSource.current.cancel("Cancelled previous request");
    }

    cancelSource.current = axios.CancelToken.source();
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method,
        cancelToken: cancelSource.current.token,
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

  return { data, error, loading, fetchData, setData };
};

export default useFetch;

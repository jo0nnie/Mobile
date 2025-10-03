import { useEffect, useState } from "react";
import { api } from "../api/api";

const usePelis = (query) => {
  const [pelis, setPelis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPelis = async () => {
      try {
        let response;
        let data;

        if (query === "") {
          response = await api.get(`/shows?page=0`);
          data = response.data;
        } else {
          response = await api.get(`/search/shows?q=${query}`);
          data = response.data.map((item) => item.show);
        }

        setPelis(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPelis();
  }, [query]);

  return { pelis, loading, error };
};
export default usePelis;

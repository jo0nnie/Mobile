import { useEffect, useState } from "react";
import axios from "axios";

export default function usePelis() {
  const [pelis, setPelis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/shows");
        setPelis(response.data); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

return { pelis, loading, error } ;
}

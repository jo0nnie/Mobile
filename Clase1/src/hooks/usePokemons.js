import { useEffect, useState } from "react"
import { api } from "../api/api";

const usePokemons = (limit) => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await api.get(`/pokemon?limit=${limit}`);
                setPokemons(response.data.results);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemons();
    }, [limit]);


    return { pokemons, loading, error };
};

export default usePokemons;
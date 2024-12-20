import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '076305f76f2f5094bb863c12feb2cf7b'; 

const useGetMovies = () => {
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const getMovies = useCallback(async (endpoint, params = {}) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
                params: {
                    api_key: API_KEY,
                    ...params,
                },
            });
            setMovieList(response.data.results || []);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, []); 

    return {
        isLoading,
        error,
        movieList,
        getMovies,
    };
};

export default useGetMovies;

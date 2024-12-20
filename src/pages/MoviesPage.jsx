import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieList from "./MovieList"; // Komponent do wyświetlania filmów
import SearchForm from '../components/SearchForm'; // Formularz wyszukiwania

const API_KEY = '076305f76f2f5094bb863c12feb2cf7b'; // Twój klucz API

export default function MoviesPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");  // Pobieramy zapytanie z URL
  const [movies, setMovies] = useState([]);  // Stan do przechowywania filmów
  const [error, setError] = useState(null);  // Stan do obsługi błędów
  const [isLoading, setIsLoading] = useState(false);  // Stan do oznaczenia ładowania

  useEffect(() => {
    if (!query) return;  // Jeśli nie ma zapytania, nie wyszukuj filmów

    const fetchMovies = async () => {
      setIsLoading(true);  // Rozpocznij ładowanie
      setError(null);  // Zresetuj poprzedni błąd
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setMovies(data.results || []);  
        } else {
          setError("Nie udało się pobrać filmów. Spróbuj ponownie.");  
        }
      } catch (err) {
        setError("Nie udało się pobrać filmów. Spróbuj ponownie.");
      } finally {
        setIsLoading(false);  
      }
    };

    fetchMovies();
  }, [query]);  

  if (isLoading) {
    return <div>Ładowanie...</div>;  
  }

  if (error) {
    return <div>{error}</div>;  
  }

  return (
    <div>
      <SearchForm />
      {movies.length ? (
        <MovieList movies={movies} />  
      ) : (
        <div>Nie znaleziono wyników</div> 
      )}
    </div>
  );
}

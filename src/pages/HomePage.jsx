import React, { useEffect } from "react";
import useGetMovies from "../hooks/useGetMovies"; 
import MovieList from "../pages/MovieList"; 
 

const HomePage = () => {
    const { isLoading, error, movieList, getMovies } = useGetMovies(); 

    useEffect(() => {
        getMovies("movie/popular");
    }, [getMovies]);  


    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Popular Movies</h1>
     
            {movieList.length > 0 ? (
                <MovieList movies={movieList} />
            ) : (
                <div>No movies found</div>
            )}
        </div>
    );
};

export default HomePage;

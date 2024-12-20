import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '076305f76f2f5094bb863c12feb2cf7b';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
        setMovie(response.data);
      } catch (err) {
        setError('Failed to load movie details.');
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <div>
            <NavLink to="cast" style={{ marginRight: '10px' }}>Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;

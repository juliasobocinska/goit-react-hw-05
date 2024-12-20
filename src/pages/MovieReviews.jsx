import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieReviews = () => {
  const { movieId } = useParams();  
  const [reviews, setReviews] = useState([]);  
  const [error, setError] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);  
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=076305f76f2f5094bb863c12feb2cf7b`
        );
        setReviews(response.data.results);  
      } catch (err) {
        setError('Nie udało się pobrać recenzji. Spróbuj ponownie później.');  
      } finally {
        setIsLoading(false);  
      }
    };

    fetchReviews(); 
  }, [movieId]);  

  if (isLoading) {
    return <div>Ładowanie recenzji...</div>;  
  }

  if (error) {
    return <div>{error}</div>;  
  }

  if (!reviews.length) {
    return <div>Brak recenzji dla tego filmu.</div>;  
  }

  return (
    <div>
      <h2>Recenzje</h2>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {reviews.map((review) => (
          <li key={review.id} style={{ marginBottom: '10px', fontSize: '16px' }}>
            <p>{review.content}</p>
            <small>- {review.author}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;

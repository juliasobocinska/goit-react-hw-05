import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCast = () => {
  const { movieId } = useParams();  
  const [cast, setCast] = useState([]);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=076305f76f2f5094bb863c12feb2cf7b`
        );
        setCast(response.data.cast);  
      } catch (err) {
        setError('Nie udało się pobrać informacji o obsadzie.');
      }
    };

    fetchCast();  
  }, [movieId]);  

  if (error) {
    return <div>{error}</div>;  
  }

  if (!cast.length) {
    return <div>Brak informacji o obsadzie.</div>; 
  }

  return (
    <div>
      <h2>Obsada</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {cast.map((member) => (
          <div key={member.id} style={{ textAlign: 'center', maxWidth: '150px' }}>
            <img
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : 'https://via.placeholder.com/150'}
              alt={member.name}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
            <p>{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;

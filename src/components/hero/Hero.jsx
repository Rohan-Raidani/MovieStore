import React, { useState, useEffect } from "react";
import "./hero.css";

const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    setNewMovie(e.target.value);
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (newMovie.trim()) {
      try {
        const response = await fetch('http://localhost:5000/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newMovie.trim() }),
        });
        const data = await response.json();
        setMovies([...movies, data]);
        setNewMovie("");
        setShowForm(false);
      } catch (error) {
        console.error('Error adding movie:', error);
      }
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:5000/movies/${id}`, {
        method: 'DELETE',
      });
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  useEffect(() => {
    const cardContent = document.querySelector('.card__content');
    if (cardContent) {
      if (showForm) {
        cardContent.classList.add('show');
      } else {
        cardContent.classList.remove('show');
      }
    }
  }, [showForm]);

  return (
    <div className="head">
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      ></link>
      <div className="heading">
        <h1>Movie Store</h1>
      </div>
      <div className="card">
        <div id="movie-list">
          <h2 className="title">Movies to Watch</h2>
          <div className="movie-list-container">
            <ul>
              {movies.map((movie) => (
                <li key={movie._id}>
                  <span className="name">{movie.name}</span>
                  <span className="delete" onClick={() => handleDeleteMovie(movie._id)}>Delete</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button id="toggle-form" className="toggle-button" onClick={toggleForm}>
          {showForm ? 'Back to List' : 'Add New Movie'}
        </button>
        <div className="card__content">
          <form id="add-movie" onSubmit={handleAddMovie}>
            <input 
              type="text" 
              placeholder="Add a new movie.." 
              value={newMovie}
              onChange={handleInputChange}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
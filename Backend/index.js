const express = require('express')
const cors = require('cors');
const port = 5000;

const db = require('./config/mongoose');
const Movie = require('./model/movie')

const app = express();

app.use(cors());
app.use(express.json());

// Get all movies
app.get('/movies', async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Add a new movie
  app.post('/movies', async (req, res) => {
    const movie = new Movie({
      name: req.body.name
    });
  
    try {
      const newMovie = await movie.save();
      res.status(201).json(newMovie);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a movie
  app.delete('/movies/:id', async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.json({ message: 'Movie deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });


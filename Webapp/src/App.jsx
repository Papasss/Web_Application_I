import { useState } from 'react';
import NavBar from './components/NavBar';
import Filters from './components/Filters';
import Films from './components/Films';

import { Film, FilmLibrary } from './models/models';
import './App.css';

const papaLibrary = new FilmLibrary("My Film Library");

const film = new Film(1, "Inception", true, 5, "2024-01-01", 1);
papaLibrary.addFilm(film);

function App() {
  // // 1. STATO: La lista di tutti i film
  // const [movies, setMovies] = useState([
  //   { id: 1, title: 'Inception', director: 'Nolan', year: 2010 },
  //   { id: 2, title: 'Matrix', director: 'Wachowski', year: 1999 }
  // ]);

  // // 2. STATO: I filtri attivi (es. per anno, regista, ecc.)
  // const [filters, setFilters] = useState({ year: '', search: '' });

  // // Funzione per eliminare un film (verrà passata alla FilmLibrary)
  // const deleteMovie = (idToRemove) => {
  //   setMovies(movies.filter(movie => movie.id !== idToRemove));
  // };

  // // Funzione per aggiungere un film (verrà passata alla FilmLibrary)
  // const addMovie = (newMovie) => {
  //   setMovies([...movies, newMovie]);
  // };

  return (
    <div className="app-container">
      {/* HEADER IN ALTO */}
      <NavBar />
      
    </div>
  );
}

export default App;

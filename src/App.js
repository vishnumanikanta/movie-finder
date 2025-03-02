import React, { useState, useEffect } from 'react';
import './App.css';

const baseurl = "https://www.omdbapi.com/?apikey=88051b61";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("movie");
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseurl}&s=${searchQuery}&page=${page}`);
      const data = await response.json();
      if (data.Search) {
        setMovies((prevMovies) => (page === 1 ? data.Search : [...prevMovies, ...data.Search]));
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery]);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">🎬 Movie Finder</a>
          <input 
            type="text"
            className="form-control w-50"
            placeholder="Search for movies..."
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </nav>

      <div className='container mt-4'>
        <h1 className="text-center text-warning">Find Your Favorite Movies</h1>
        <div className='row justify-content-center'>
          {movies.map((movie) => (
            <div className='col-md-3 mb-4' key={movie.imdbID}>
              <div className='card h-100'>
                 <img src={movie.Poster} alt={movie.Title}/>
                <div className='card-body d-flex flex-column'>
                  <h5 className='card-title'>{movie.Title}</h5>
                  <p className='card-text'><strong>Year:</strong> {movie.Year}</p>
                  <p className='card-text'><strong>IMDB ID:</strong> {movie.imdbID}</p>
                  <p className='card-text'><strong>Type:</strong> {movie.Type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && <div className="text-center text-warning">Loading...</div>}

        <div className='text-center mt-3'>
          <button className='btn btn-warning' onClick={() => setPage((prev) => prev + 1)}>Load More Movies</button>
        </div>
      </div>
    </>
  );
};

export default App;
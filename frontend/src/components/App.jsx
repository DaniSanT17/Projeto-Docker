import React, { useState, useEffect } from "react";
import MovieForm from "./MovieForm";
import TitleForm from "./TitleForm";
import MovieList from "./MovieList"
import api from "../services/api";
import "./App.css";

function App() {
  const moviesEndpoint = "/movies";
  const showsEndpoint = "/shows";
  const compareEndpoint = "/compare";
  const [searchResult, setSearchResult] = useState("");
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [error, setError] = useState();

  const fetchMovies = async () => {
    try {
      const { data } = await api.get(moviesEndpoint);
      setMovies(data);
    } catch (error) {
      setError("Could not fetch the movies!");
    }
  };
  const fetchShows = async () => {
    try {
      const { data } = await api.get(showsEndpoint);
      setShows(data);
    } catch (error) {
      setError("Could not fetch the shows!");
    }
  };

  const handleAddMovie = async (title) => {
    try {
      const movie = { _id: Date.now(), title };
      setMovies([...movies, movie]);

      const { data: savedMovie } = await api.create(moviesEndpoint, movie);

      setMovies([...movies, savedMovie]);
    } catch (error) {
      setError("Could not save the movie!");
      setMovies(movies);
    }
  };

  const titleSearch = async (title) => {
    if (title === ""){
      setSearchResult({
        movie: null,
        show: null
      });
      return;
    }
    try {
      const { data } = await api.get(compareEndpoint+"/"+title);
      setSearchResult(data);
    } catch (error) {
      console.log("Could not fetch the movies!");
    }
  };

  const handleAddShow = async (title) => {
    try {
      const show = { _id: Date.now(), title };
      setShows([...shows, show]);

      const { data: savedShow } = await api.create(showsEndpoint, show);

      setShows([...shows, savedShow]);
    } catch (error) {
      setError("Could not save the show!");
      setShows(shows);
    }
  };

  const handleDeleteMovie = async (movie) => {
    try {
      setMovies(movies.filter((m) => m !== movie));
      await api.remove(moviesEndpoint + "/" + movie._id);
    } catch (error) {
      setError("Could not delete the movie!");
      setMovies(movies);
    }
  };

  const handleDeleteShow = async (show) => {
    try {
      setShows(shows.filter((s) => s !== show));
      await api.remove(showsEndpoint + "/" + show._id);
    } catch (error) {
      setError("Could not delete the show!");
      setShows(shows);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchShows();
  }, []);

  return (
    <div className="App">
      <div className="movieContainer">
        <h1>Banco de dados de filmes - MoviesDB</h1>
        <MovieForm onAddMovie={handleAddMovie} placeholder="Adicione seu filme favorito!" />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
        <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} type="MovieItem" />
      </div>
      <div className="showContainer">
        <h1>Banco de dados de séries - ShowsDB</h1>
        <MovieForm onAddMovie={handleAddShow} placeholder="Adicione sua série favorita!" />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
        <MovieList movies={shows} onDeleteMovie={handleDeleteShow} type="ShowItem"/>
      </div>
      <div className="compareContainer">
        <h1>Comparar se um título pertence aos dois bancos</h1>
        <TitleForm onSearchTitle={titleSearch} searchResult={searchResult} />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

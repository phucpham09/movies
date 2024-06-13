
import './App.css';

import React from 'react'

import NewMovies from './components/NewMovies'
import NewGenre from './components/NewGenre'
import MoviesList from './components/MoviesList'
import GenresList from './components/GenresList'
import {useState, useEffect} from 'react'
import axios from 'axios'
function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8001/movies')
    .then(function(res){
      setMovies([...res.data])
    })
  },[])

  useEffect(() => {
    axios.get('http://localhost:8001/genres')
    .then(function(res){
      setGenres([...res.data])
    })
  })

  
  return (

    <div className = "App">
      <div className='add_movie_and_genre'>
        <NewMovies movies={movies} genres={genres} setMovies = {setMovies}  />
        <NewGenre genres = {genres} setGenres= {setGenres}/>
      </div>
      <MoviesList movies={movies} setMovies = {setMovies} genres = {genres}/>
      <GenresList genres = {genres} setGenres= {setGenres}/>
    </div>
  )
}

export default App
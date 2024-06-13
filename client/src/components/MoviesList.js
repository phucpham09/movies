import React from 'react'
import axios  from 'axios'
import EditMovies from './EditMovies'
export default function MoviesList ({movies, setMovies, genres}) {
    const deleteMovie = (id) => {
        axios.delete(`http://localhost:8001/delete/${id}`)
        .then(res => {
            setMovies(movies.filter(movie => movie.movie_id !== id))
            console.log(id)
        })
    }
    return (
      <>
          <div className = "tabletitle">
              <h1>List of movies</h1> <br/>
              <p>--------------------------------------------------------------------------------------------------------</p>
          </div>
          <table className='movielist_table'>
              <thead>
                  <tr>
                      <th>Title</th>
                      <th>year</th>
                      <th>Genre</th>
                      <th>Imdb</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
              </thead>

              <tbody>
                {movies.map(movie =>
                    <tr key={movie.movie_id}>
                    <td>{movie.movie_title}</td>
                    <td>{movie.movie_year}</td>
                    <td>{movie.genre_title}</td>
                    <td><a href={movie.movie_imdb} target="_blank">View</a></td>
                    <td><EditMovies movie = {movie} movies = {movies} genres = {genres} setMovies = {setMovies}/></td>
                    <td><button className = "delete-button" onClick = {() => deleteMovie(movie.movie_id)}>Delete</button></td>
                    </tr>)}
            </tbody>
          </table>
      </>
    )
}

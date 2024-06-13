import { useState, useEffect } from "react"
import axios from 'axios'

export default function NewMovie({ movies, genres, setMovies }) {
  const [movie_title, setMovieTitle] = useState("")
  const [movie_genre_id, setMovieGenre] = useState("")
  const [movie_imdb, setMovieImdb] = useState("")
  const [movie_year, setMovieYear] = useState(19);

  useEffect (() => {
    const foundGenre = genres.find((genre) => {
      return genre.level_id === movie_genre_id
    })
    if (!foundGenre && genres.length) {
      setMovieGenre(genres[0].genre_id)
    }
}, [genres])
  function onSubmitForm(e) {
    e.preventDefault();
    const movie = {
      movie_title,
      movie_year,
      movie_genre_id,
      movie_imdb
    }
    addMovie(movie)
    resetForm();

  }


  function addMovie(movie) {
    console.log("Movie added:", movie)
    return axios.post(`http://localhost:8001/movies`, movie)
    .then((response) => {
      const newMovie = response.data;
      const movieGenre = genres.find((genre) => {
        return genre.genre_id === newMovie.movie_genre_id
      })
      newMovie.genre_title = movieGenre.genre_title;
      setMovies([newMovie, ...movies])
    })
 }

    function resetForm() {
      setMovieTitle("");
      setMovieImdb("");
      }

  return (
    <div>
  
      {/* <!-- Button trigger modal --> */}
      <button type="button"
        className="button_add" data-toggle="modal" data-target={`#newmoviemodal${movies.movie_id}`}>Add movie
      </button>
  
      {/* <!-- Modal --> */}
      <div className="modal fade" id={`newmoviemodal${movies.movie_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add new movie</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
           
            <div className="modal-body">
  
              <label className="add_movie_title" htmlFor="title">Title</label>
              <input className="form-control" type="text" name="title" value={movie_title} onChange={(e) => setMovieTitle(e.target.value)} />
              <p></p>
  
              <label className="add_movie_title" htmlFor="title">Year</label>
              <input className="form-control" type="text" name="title" value={movie_year}
              onChange={(e) => setMovieYear(e.target.value)}/>
              <p></p>
  
              <div className="level_input">
                <label className="add_movie_title" htmlFor="title">Genre</label>
                <select className="form-control" value={movie_genre_id}
                onChange={(e) => setMovieGenre(e.target.value)}>
                  {genres.map((genre) => <option key={genre.genre_id} value={genre.genre_id}>{genre.genre_title}</option>)}
                </select>
              </div>
  
              <label className="add_movie_title" htmlFor="title">Imdb</label>
              <input className="form-control" type="text" name="title" value={movie_imdb} onChange={(e) => setMovieImdb(e.target.value)}/>
              <p></p>
  
            </div>
  
            <div className="modal-footer">
              <button type="button" className="button_close" data-dismiss="modal">Close</button>
              <button
                className="button_submit"
                type="Submit"
                data-dismiss="modal"
                onClick = {onSubmitForm}
              >Add movie</button>
            </div>
          </div>
        </div>
      </div>
  
  
    </div>
  )
 }
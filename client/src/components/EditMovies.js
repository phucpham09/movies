import { useState } from "react";
import axios from 'axios'
import React from "react";
export default function EditMovies ({ genres, movie, setMovies}) {
    const [movie_title, setMovieTitle] = useState(movie.movie_title);
    const [movie_year, setMovieYear] = useState(movie.movie_year);
    const [movie_genre_id, setMovieGenre] = useState(movie.movie_genre_id);
    const [movie_imdb, setMovieImdb] = useState(movie.movie_imdb);
    
    const editMovie = async (e) => {
        e.preventDefault()
        try {
          const body = {movie_title, movie_year, movie_genre_id, movie_imdb };
          const response = await fetch(`http://localhost:8001/movies/${movie.movie_id}`, {
            method: "PUT",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify(body)
         })
         axios.get('http://localhost:8001/movies')
         .then(function(res){
           setMovies([...res.data])
         })
        } catch (err) {
         console.error(err.message)
        }
   }
    
    return (
       <div>
     
         {/* <!-- Button trigger modal --> */}
         <button type="button"
           className="button_edit" data-toggle="modal" data-target={`#editmoviemodal${movie.movie_id}`}>Edit
         </button>
     
         {/* <!-- Modal --> */}
         <div className="modal fade" id={`editmoviemodal${movie.movie_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
           <div className="modal-dialog" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title" id="exampleModalLabel">Edit movie</h5>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
     
               <div className="modal-body">
     
                 <label className="add_movie_title" htmlFor="title">Title</label>
                 <input
className="form-control"
type="text"
name="title"
value={movie_title}
onChange={e => setMovieTitle(e.target.value)}
/>
                <p></p>
     
                 <label className="add_movie_title" htmlFor="title">Year</label>
                 <input
className="form-control"
type="text"
name="title"
value={movie_year}
onChange={e => setMovieYear(e.target.value)}
/>
                 <p></p>
     
                 <div className="level_input">
<label className="add_movie_title" htmlFor="title">Genre</label>
<select className="form-control"
value={movie_genre_id}
onChange={e => setMovieGenre(e.target.value)}
>
{genres.map((genre) =>
<option key={genre.genre_id}
value={genre.genre_id}>
{genre.genre_title}
</option>
)}
</select>
</div>
     
<label className="add_movie_title" htmlFor="title">Imdb</label>
<input className="form-control"
type="text"
name="title"
value={movie_imdb}
onChange={e => setMovieImdb(e.target.value)}
/>
                 <p></p>
     
               </div>
     
               <div className="modal-footer">
     
                               <button type="button" className="button_close" data-dismiss="modal">Close</button>
                 <button
                   className="button_submit"
                   type="Submit"
                   data-dismiss="modal"
                   onClick={e => editMovie(e)}
                 >Edit</button>
               </div>
             </div>
           </div>
         </div>
       </div>
     )
    }
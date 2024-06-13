const express = require('express');
const app = express();
const port = 8001;
const cors = require('cors');
const pool = require('./db');


app.use(cors());
app.use(express.json()); //req.body


//Get all movies
app.get("/movies", async(req, res) => {
    try{
        const getAllMovies = await pool.query(
            'SELECT movie_id, movie_title, movie_year, movie_genre_id, movie_imdb, genre_title FROM movies JOIN genres on genres.genre_id = movies.movie_genre_id ORDER BY movies.movie_id DESC'
        );
        res.json(getAllMovies.rows);
    }catch(err){
        console.error(err.message);
    }
})


//get all genres
app.get("/genres", async(req, res) => {
    try{
        const getAllGenres = await pool.query(
            'SELECT genre_id, genre_title FROM genres ORDER BY genre_id DESC'
        );
        res.json(getAllGenres.rows);
    }catch(err){
        console.error(err.message);
    }
})

//Delete a movie
app.delete("/delete/:id", async (req, res) => {
    try {
     const id = parseInt(req.params.id);
     console.log("Deleted movie id:", id);
     const deleteStep = await pool.query(
       "DELETE FROM movies WHERE movie_id = $1 RETURNING *", [id]
     )
     res.json("The movie was deleted")
    } catch (err) {
      console.error(err.message)
    }
  })



//delete a genre
app.delete("/genres/delete/:id" , async(req, res) => {
    try{
        const id = parseInt (req.params.id);
        const deleteGenre = await pool.query('DELETE FROM genres WHERE genre_id = $1 RETURNING *', [id])
        res.json("The genre was deleted")
    }catch(err){
        console.error(err.message)
    }
})


//add new movie
app.post("/movies", async (req, res) => {
    try {
      const {movie_title, movie_year, movie_genre_id, movie_imdb} = req.body;
      console.log("reqb body", req.body)
     const newMovie = await pool.query("INSERT INTO movies (movie_title, movie_year, movie_genre_id, movie_imdb) VALUES($1, $2,   $3, $4) RETURNING *", [movie_title, movie_year, movie_genre_id,   movie_imdb])
      res.json(newMovie.rows[0])
    } catch (err) {
 console.error(err.message)
    }
 })


//add new genre
app.post('/genres', async(req, res) => {
    try{
        const {genre_title} = req.body;
        const newGenre = await pool.query('INSERT INTO genres (genre_title) VALUES($1) RETURNING *', [genre_title])
        res.json(newGenre.rows[0])
    }catch(err){
        console.log(err.message)
    }
})


//edit movie
//Edit a movie
app.put("/movies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const {
        movie_title, movie_year, movie_genre_id, movie_imdb } = req.body
        const editMovie = await pool.query('UPDATE movies SET movie_title = $1, movie_year = $2, movie_genre_id = $3, movie_imdb = $4 WHERE movie_id = $5', [movie_title, movie_year, movie_genre_id, movie_imdb, id])
        res.json("Movie was updated")
      } catch (err) {
        console.error(err.message)
      }
 })

 
app.listen(port, () => {
console.log(`Movies app running on port ${port}.`);
});
import React from 'react'
import axios  from 'axios'

export default function GenresList({genres, setGenres}) {
    const deleteGenre = (id) => {
        axios.delete(`http://localhost:8001/genres/delete/${id}`)
        .then(res => {
            setGenres(genres.filter(genre => genre.genre_id !== id))
            console.log(id)
        })
    }


    return (
        <>
            <div className = "tabletitle">
              <h1>List of Genres</h1> <br/>
              <p>--------------------------------------------------------------------------------------------------------</p>
          </div>
        
          <table className='movielist_table'>
              <thead>
                  <tr>
                      <th>Title</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
              </thead>

              <tbody>
                {genres.map(genre =>
                    <tr key={genre.genre_id}>
                    <td>{genre.genre_title}</td>
                    <td><button >Edit</button></td>
                    <td><button className = "delete-button" onClick={() => deleteGenre(genre.genre_id)}>Delete</button></td>
                    </tr>)}
              </tbody>
                
            </table>
        </>
    )
};

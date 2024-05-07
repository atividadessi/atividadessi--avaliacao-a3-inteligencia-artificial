import { useLocation  } from 'react-router-dom'
import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './DetailsMovie.module.css'



function DetailsMovie({ to, text}){
   const [movie, setMovie] = useState();
   const [moviesLancamentos, setMoviesLancamento] = useState([])
   const imageUrl = "https://image.tmdb.org/t/p/original"
   const [genres, setGenres] = useState([])

   const location = useLocation();
   useEffect(() => {
      
      setMovie(location.state.movie)
   }, [])

   const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzcxNWQzMjkyYTE1NmRmYTIzYjM0YjhlMmVjMzYwNCIsInN1YiI6IjY2MTA3YmQxMWYzMzE5MDE0YWMxMmJiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5fHRMuEhAg-qlWR5eH_Z2Fg474AcQDbPzHS3YsW2SBs'
      }
   };

   const getGenres = (urlApi) =>{
      fetch(urlApi, options)
        .then(response => response.json()) 
        .then(response => { 
            setGenres(response.genres)
            console.log(response.genres)
         })
        .catch(err => console.error("Error: " + err));
   }

   useEffect(()=>{ 
      getGenres("https://api.themoviedb.org/3/genre/movie/list?language=pt-br")
   },[])

   const getMovie = (urlApi) =>{
      fetch(urlApi, options)
        .then(response => response.json()) 
        .then(response => { 
            setMoviesLancamento(response.genres)
         })
        .catch(err => console.error("Error: " + err));
   }

   useEffect(()=>{ 
      getMovie("https://api.themoviedb.org/3/genre/movie/list?language=pt-br")
   },[])

   const getGenero = () =>{
      
   }

 

   return ( 
      <div className={styles.datalhes}>
         {movie ? (
               
         <>
               <h1>{movie.title}</h1>
               <img src={imageUrl + movie.poster_path} alt="" className={styles.fundo_poster} />
               <p className={styles.descricao}>{movie.overview}</p>
         </>
         ) : (
            <p>Loading...</p> 
         )}
         
      </div>
   ) 
}

export default DetailsMovie
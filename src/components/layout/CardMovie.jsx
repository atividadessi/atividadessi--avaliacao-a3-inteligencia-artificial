import styles from './CardMovie.module.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


function CardMovie({movie, moviesFavorite, moviesRecomendados, handleClickFavorited}){
   let navigate = useNavigate();
   const [genres, setGenres] = useState()
   const [isHovered, setIsHovered] = useState(false);


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
         })
        .catch(err => console.error("Error: " + err));
   }

   useEffect(()=>{ 
      getGenres("https://api.themoviedb.org/3/genre/movie/list?language=pt-br")
   },[])


   const imageUrl = "https://image.tmdb.org/t/p/w500/"


   const  handleClick =() =>{
      navigate("/detalhes/" + movie.title.replaceAll(" ","_"), {state: {movie}})
   }

   return(
      <div className={styles.cardMovie} 
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >

         <h2 className={styles.title}>{movie.title}</h2>
         
         <img onClick={handleClick} src={imageUrl + movie.backdrop_path} alt=""
         
         />
         
         <div onClick={handleClickFavorited} className={styles.icon}  id={movie.id}
            style={{ display: isHovered ? 'block' : 'none' }}
         >
               <p>Favoritar</p>
         </div>
      </div>
   )
}

export default CardMovie
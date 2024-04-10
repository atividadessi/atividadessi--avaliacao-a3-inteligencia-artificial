import styles from './CardMovie.module.css'
import { MdOutlineFavorite  } from "react-icons/md";
import { useState, useEffect } from 'react';



function CardMovie({movie}){
   const [toogle, setToogle] = useState(true);

   const imageUrl = "https://image.tmdb.org/t/p/w500/"

   const click = (event) => {
      const idDoElemento = event.target.parentNode.parentNode.id;
      console.log("ID do elemento clicado:", idDoElemento);
    };

   return(
      <div className={styles.cardMovie} >
         <h2 className={styles.title}>{movie.title}</h2>

         <div className={styles.image_movie}>
            <img src={imageUrl + movie.poster_path} alt="" />
         </div>
         <div className={styles.container_description}>
            <button>Detalhes</button>
            <div className={styles.icon} id={movie.id}>
               <MdOutlineFavorite  
                  onClick={click}
               />
            </div>
         </div>
      </div>
   )
}

export default CardMovie
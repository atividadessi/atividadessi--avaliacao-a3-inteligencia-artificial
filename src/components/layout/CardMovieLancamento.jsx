import styles from './CardMovieLancamento.module.css'
import { useNavigate } from "react-router-dom";



function CardMovieLancamento({movie}){
   const imageUrl = "https://image.tmdb.org/t/p/original"
   let navigate = useNavigate();


   const  handleClick =() =>{
      navigate("/detalhes/" + movie.title.replaceAll(" ","_"), {state: {movie}})
   }

   return(
      <section  className={styles.container_lancamentos}>
         <img src={imageUrl + movie.backdrop_path} alt="" className={styles.fundo_poster} />

         <h1 className={styles.title}>{movie.title}</h1>
         <button onClick={handleClick} className={styles.btn_detalhes}>Detalhes</button>
      </section>
   )
}

export default CardMovieLancamento
import styles from './CardMovieLancamento.module.css'


function CardMovieLancamento({movie}){
   const imageUrl = "https://image.tmdb.org/t/p/original"

   return(
      <section  className={styles.container_lancamentos}>
        <img src={imageUrl + movie.backdrop_path} alt="" className={styles.fundo_poster} />
        <div className={styles.container_details}> 

         <h1>{movie.title}</h1>
         <p>{movie.overview}</p>
        </div>
      </section>
   )
}

export default CardMovieLancamento
import styles from './Home.module.css'
import CardMovie from '../layout/CardMovie'
import CardMovieLancamento from '../layout/CardMovieLancamento'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';


function Home(){
   const [movies, setMovies] = useState([])
   const [moviesLancamentos, setMoviesLancamento] = useState([])
   const [moviesRecomendadosLocalStorage, setMoviesRecomendadosLocalStorage] = useState([])
   const [moviesRecomendados, setmoviesRecomendados] = useState([])
   const [moviesFavorite, setMoviesFavorite] = useState([])
   let idMovieFavorited = ""
   let tempMoviesRecomendados = {}
   let newIdMovieFavoritedList = []
   let newListMoviesRecomendation = []

   useEffect(()=>{
      setTimeout(()=>{ 
         getInfosLocalStorage();
      }, 300)
   },[]) 

   const getInfosLocalStorage =() =>{
      if(getLocalStorage("idFilmeFavoritos") != null){
         backupLocalStorageIdsMoviesFavorited()
      }
      if(getLocalStorage("filmesRecomendados") != null){
         backupLocalStorageMoviesRecomendation()
      }
   }
   
 
   const backupLocalStorageIdsMoviesFavorited = () =>{
      newIdMovieFavoritedList = getLocalStorage("idFilmeFavoritos")
      setMoviesFavorite(newIdMovieFavoritedList)
   } 

   const backupLocalStorageMoviesRecomendation  = () =>{
      tempMoviesRecomendados = getLocalStorage("filmesRecomendados")
      setMoviesRecomendadosLocalStorage(tempMoviesRecomendados)
      setTimeout(()=>{
         updateMoviesRecomendation()
      },200)
      
   }

   const updateMoviesRecomendation = ()=>{
      let arr = []
      tempMoviesRecomendados.flatMap(filme =>{
         arr.push(...Object.values(filme)[0])
      })
      setmoviesRecomendados(arr)
      setTimeout(()=>{
         reajusteElementosFavoritados()
      },500)
   }
   
 
   const reajusteElementosFavoritados = ()=>{
      for (let index = 0; index < newIdMovieFavoritedList.length; index++) {
         let element = document.getElementById(`${newIdMovieFavoritedList[index]}`)
         console.log("reprocessando")
         element.firstChild.style.color = "red";
         element.firstChild.classList.add("favorited");
      } 
   } 

   const setLocalStorage = (key, value) =>{
      localStorage.setItem(key, JSON.stringify(value));
   }

   const getLocalStorage = (key) =>{
      const usuarioString = localStorage.getItem(key);
      return JSON.parse(usuarioString);
   }

   function SampleNextArrow(props) {
      const { className, style, onClick } = props; 
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "black" }}
          onClick={onClick}
        />
      );
   }
    
   function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "black" }}
          onClick={onClick}
        />
      );
   }
   
   const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzcxNWQzMjkyYTE1NmRmYTIzYjM0YjhlMmVjMzYwNCIsInN1YiI6IjY2MTA3YmQxMWYzMzE5MDE0YWMxMmJiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5fHRMuEhAg-qlWR5eH_Z2Fg474AcQDbPzHS3YsW2SBs'
      }
   };

   useEffect(()=>{
      getMovie("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=1&sort_by=popularity.desc")
      
   },[])
 

   const getMovie = (urlApi) =>{
      fetch(urlApi, options)
        .then(response => response.json()) 
        .then(response => {
            setMovies(response.results)
         })
        .catch(err => console.error("Error: " + err))
   }

   const getMovieLancamentos = (urlApi) =>{
      fetch(urlApi, options)
        .then(response => response.json()) 
        .then(response => { 
            setMoviesLancamento(response.results)
         })
        .catch(err => console.error("Error: " + err));
   }

   useEffect(()=>{ 
      getMovieLancamentos("https://api.themoviedb.org/3/movie/popular?language=pt-brpage=1") 
   },[])


   const getMovieRecomendados = () =>{
      fetch(`https://api.themoviedb.org/3/movie/${idMovieFavorited}/similar?language=pt-br&page=2`, options)
      .then(response => response.json()) 
      .then(response => { 
         let moviesRecomedationAPI = response.results.slice(0,5) 
         tempMoviesRecomendados[idMovieFavorited] = moviesRecomedationAPI
         tempMoviesRecomendados = [...moviesRecomendadosLocalStorage, tempMoviesRecomendados]

         setMoviesRecomendadosLocalStorage(tempMoviesRecomendados)

         setLocalStorage("filmesRecomendados",tempMoviesRecomendados)
         adjustArrayMovieRecomendations()
         
         })
      .catch(err => console.error("Error: " + err))
   }

   const removeMovieRecomendados = () =>{
      tempMoviesRecomendados = []
      for (let index = 0; index < moviesRecomendadosLocalStorage.length; index++) {
         if(moviesRecomendadosLocalStorage[index][idMovieFavorited] == undefined){
            tempMoviesRecomendados.push(moviesRecomendadosLocalStorage[index])
         }
      }
      
      setMoviesRecomendadosLocalStorage(tempMoviesRecomendados)
      setLocalStorage("filmesRecomendados",tempMoviesRecomendados)
      updateMoviesRecomendation()
   }
   
   const adjustArrayMovieRecomendations = () =>{
      newListMoviesRecomendation.push(...moviesRecomendados,...tempMoviesRecomendados[tempMoviesRecomendados.length-1][idMovieFavorited])
      setmoviesRecomendados(newListMoviesRecomendation)
   }

   const settings = { 
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 3,
      touchMove: true,
      arrows: true,
      centerPadding: '10px',
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      
      responsive: [
         {
            breakpoint: 1520,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
         {
           breakpoint: 1024,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 2,
             infinite: true,
             dots: true
           }
         },
         {
           breakpoint: 800,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1,
             initialSlide: 2,
             dots: true,
             infinite: true,
           }
         }
       ]
      
   };


   const settings2 = {
   dots: true,
   infinite: true,
   speed: 500,
   autoplay: true,
   autoplaySpeed: 2000,
   slidesToShow: 1,
   slidesToScroll: 1,
   touchMove: true,
   arrows: true, 
   centerPadding: '10px'
   };

   const handleClickFavorited = (event) => {
      const element = event.target;
      element.classList.toggle("favorited");
      idMovieFavorited = element.parentNode.id
      
      if(element.classList.contains("favorited")){
         console.log("favoritando: " + idMovieFavorited)
         element.style.color = "red"
         newIdMovieFavoritedList = [...moviesFavorite, idMovieFavorited]
         setMoviesFavorite(newIdMovieFavoritedList)
         setLocalStorage("idFilmeFavoritos", newIdMovieFavoritedList)

         getMovieRecomendados()
      } else{
         removeIdMovieFavorited()
         
         removeMovieRecomendados()

         element.style.color = "white"
      }
   };

   const removeIdMovieFavorited = () =>{
      let newIdMovieFavoritedList = []
      for (let index = 0; index < moviesFavorite.length; index++) {
         if(moviesFavorite[index] != idMovieFavorited){
            newIdMovieFavoritedList.push(moviesFavorite[index])
         }
      }
      setMoviesFavorite(newIdMovieFavoritedList)
      setLocalStorage("idFilmeFavoritos", newIdMovieFavoritedList)
   }
   
   return(
      <main className={styles.content_home}>
         <h2>Lançamentos</h2>
         
         <Slider {...settings2}>
            {moviesLancamentos && moviesLancamentos.map((movie) => 
               <CardMovieLancamento
                  movie={movie} 
               />  
            )} 
         </Slider>
        
         <div className={styles.carousel_container}>
            <div className={styles.generos}> 
               {moviesRecomendados.length > 0 && (
                  <> 
                     <h2>Recomendados</h2> 
                     <Slider {...settings}>
                        
                        {moviesRecomendados.map((moviesRecomendation) => 
                           <> 
                              <CardMovie 
                                 movie={moviesRecomendation}
                                 moviesFavorite ={moviesFavorite}
                                 moviesRecomendados= {moviesRecomendados}
                                 handleClickFavorited= {handleClickFavorited}
                              />
                           </>
                           
                        )}
                     </Slider>
                  </>
               )}
               
            </div>
         

            <div className={styles.generos}>
               
               <Slider {...settings}>
                  {movies && movies.map((movie) => 
                     <>
                        <CardMovie 
                           movie={movie}
                           moviesFavorite ={moviesFavorite}
                           moviesRecomendados= {moviesRecomendados}
                           handleClickFavorited= {handleClickFavorited}
                        />
                     </>
                  )}
                  
                  
               </Slider>
            </div>
         </div>
      </main>
   )
}

export default Home
import styles from './Home.module.css'
import CardMovie from '../layout/CardMovie'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';


function Home(){
   const [movies, setMovies] = useState([])
   const imageUrl = "https://image.tmdb.org/t/p/w500/"

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
      getMovie()
   },[])

   const getMovie = () =>{
      fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=1&sort_by=popularity.desc', options)
        .then(response => response.json()) 
        .then(response => {
            setMovies(response.results)
            console.log(movies)  
         })
        .catch(err => console.error("Error: " + err));
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
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
         {
           breakpoint: 1024,
           settings: {
             slidesToShow: 3,
             slidesToScroll: 3,
             infinite: true,
             dots: true
           }
         },
         {
           breakpoint: 600,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 2,
             initialSlide: 2
           }
         },
         {
           breakpoint: 480,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1
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
   centerPadding: '10px',

   responsive: [
      {
         breakpoint: 1520,
         settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
         }
         },
      {
         breakpoint: 1024,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
         }
      },
      {
         breakpoint: 600,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
         }
      },
      {
         breakpoint: 480,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1
         }
      }
      ]
   
   };

   
   return(
      <main className={styles.content_home}>
         <h2>Lançamentos</h2>
         <Slider {...settings2}>
            {movies && movies.map((movie) => 
               <div className={styles.container_lancamentos}
                  
               > 
                  <img src={imageUrl + movie.backdrop_path} alt="" />
                  
               </div>
            )} 
         </Slider>
        
         <div className={styles.carousel_container}>
            <div className={styles.generos}>
               
               <Slider {...settings}>
                  {movies && movies.map((movie) => 
                     <CardMovie 
                        movie={movie}
                     />
                  )}
                  
                  
               </Slider>
            </div>
         </div>

         
         
      </main>
   )
}

export default Home
import React from 'react'
import { useParams } from "react-router"
// import { useEffect, useState } from 'react';


function MovieDetails() {
  const movieId = useParams().id
  // const apiKey = "903ddbbeb450bfedbf6d93e02cef2067"
  // const SEARCH_MOVIE_API = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`

  return (
    <div>{movieId}</div>
  )
}

export default MovieDetails
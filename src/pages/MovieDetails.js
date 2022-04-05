import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from "@emotion/styled"
import { useParams } from "react-router"
import Container from '@mui/material/Container';

import Loader from "../components/Loader"
import MovieCard from "../components/MovieCard"
import useFetchMovieDetails from "../hooks/useFetchMovieDetails"
import { useFetchMovieCredits } from "../hooks/useFetchMovieCredits"
import { useFetchMovieRecommendations } from "../hooks/useFetchMovieRecommendations"
import Castcard from "../components/CastCard"
import GenreChip from "../components/GenreChip"

function MovieDetails() {
  const movieId = useParams().id
  const { movieDetails, isLoading } = useFetchMovieDetails(movieId)
  const { castList, isLoading: isCastLoading } = useFetchMovieCredits(movieId)
  const { recommendedMovies } = useFetchMovieRecommendations(movieId)


  function imageLink(path, size = "w500") {
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

  if (isLoading) return <Loader />
  if (!movieDetails) return null

  const imageUrl = imageLink(movieDetails.poster_path ?? "")
  const backDropImageUrl = imageLink(movieDetails.backdrop_path ?? "", "original")

  return (
    <div>
      <PosterCard style={{ backgroundImage: `url(${backDropImageUrl})` }}>
        <PosterCardBody>
          <PosterImage src={imageUrl} alt={movieDetails.title} />
          <div style={{ margin: "30px 5px" }}>
            <Typography component="div">
              <Box sx={{ letterSpacing: 8, m: 1, fontSize: 'h3.fontSize' }}>{movieDetails.title}</Box>
              <Box sx={{ letterSpacing: 3, m: 1, fontSize: 'h6.fontSize' }}>{movieDetails.tagline}</Box>
              <MovieTagline></MovieTagline>
            </Typography>
          </div>
        </PosterCardBody>
      </PosterCard>
      <Container>

        <MainSection>
          {<GenreContainer>
            {movieDetails.genres.map((genre) => (
              <GenreChip key={genre.id}>{genre.name}</GenreChip>
            ))}
          </GenreContainer>}
          {/* {<ReleaseDate
            date={movieDetails.release_date}
            style={{ color: "#cbd5e1" }}
          />} */}
          <Overview>{movieDetails.overview}</Overview>
          <h2 style={{ marginTop: "30px" }}>Casts</h2>
          <Container sx={{ py: 5 }} maxWidth="lg">
            <Grid container spacing={2}>
              {isCastLoading && <Loader />}
              {!isCastLoading &&
                castList.map((cast) => (
                  <Grid item key={cast.id} >
                    <Castcard {...cast} />
                  </Grid>)
                )
              }
            </Grid>
          </Container>
        </MainSection>
        <Container sx={{ py: 5 }} maxWidth="lg">
          <h1 style={{ textAlign: "center" }}>Similar Movies</h1>
          {isLoading && <Loader />}
          <Grid container spacing={2}>
            {recommendedMovies.map((Movie) => (
              <Grid item key={Movie.id} xs={12} sm={6} md={3}>
                <MovieCard {...Movie} />
              </Grid>
            ))}
          </Grid>
        </Container>

      </Container>
    </div>
  )
}


const MainSection = styled.div`
	margin: 30px 30px 50px 30px;
`

const PosterCard = styled.div`
	height: 500px;
	background-size: cover;
	background-position: center;
`

const PosterCardBody = styled.div`
	height: inherit;
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: flex-end;
	grid-gap: 20px;
	padding: 0px 30px;
	background: linear-gradient(transparent, rgba(18, 18, 18, 1));
`

const PosterImage = styled.img`
	height: 320px;
	max-width: 320px;
	@media only screen and (max-width: 576px) {
		display: none;
	}
`

const MovieTagline = styled.div`
	font-size: 20px;
	color: #e2e8f0;
`

const GenreContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10px auto;
	margin-left: -5px;
`

const Overview = styled.div`
	margin: 10px auto;
	color: #cbd5e1;
`
export default MovieDetails
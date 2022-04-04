import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MovieCard from "../components/MovieCard";
import Search from "../components/Search";


const POPULAR_MOVIES_API = "https://api.themoviedb.org/3/movie/top_rated?api_key=903ddbbeb450bfedbf6d93e02cef2067"

export default function Movies() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  const [Movies, setMovies] = useState([])
  useEffect(() => {
    fetch(POPULAR_MOVIES_API).then(res => res.json())
      .then(data => {
        console.log(data.results)
        setMovies(data.results)
      })

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Search />
        </Toolbar>
      </AppBar>
      <main>

        <Container sx={{ py: 5 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {Movies.map((Movie) => (
              <Grid item key={Movie.id} xs={12} sm={6} md={3}>
                <MovieCard {...Movie} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
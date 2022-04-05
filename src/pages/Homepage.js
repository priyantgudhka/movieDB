import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from "../components/Loader"
import MovieCard from "../components/MovieCard";
import AppBar from '../components/Appbar';
import useFetchMovies from "../hooks/useFetchMovies"

export default function Movies() {
  const [pageNumber, setPageNumber] = useState(1)
  const { Movies, errorMessage, isLoading, hasMore } = useFetchMovies(pageNumber)


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

  function handleNextPage() {
    return setPageNumber((currPageNumber) => currPageNumber + 1)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <main>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <InfiniteScroll
          dataLength={Movies.length}
          hasMore={hasMore}
          loader={isLoading && <Loader />}
          next={handleNextPage}
        >
          <Container sx={{ py: 5 }} maxWidth="lg">
            {isLoading && <Loader />}
            <Grid container spacing={2}>
              {Movies.map((Movie) => (
                <Grid item key={Movie.id} xs={12} sm={6} md={3}>
                  <MovieCard {...Movie} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </InfiniteScroll>
      </main>
    </ThemeProvider>
  );
}
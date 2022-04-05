import { useEffect, useState } from "react"

export function useFetchMovieRecommendations(movieId) {
    const apiKey = "903ddbbeb450bfedbf6d93e02cef2067"
    const [recommendedMovies, setRecommendedMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        setIsLoading(true)

        const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setRecommendedMovies(data.results)
            })
            .catch((err) => {
                if (err instanceof Error) setErrorMessage(err.message)
                setErrorMessage("Something went wrong")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [apiKey, movieId])

    return { recommendedMovies, isLoading, errorMessage }
}
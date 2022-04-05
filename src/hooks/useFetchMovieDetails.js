import { useEffect, useState } from "react"

export default function useFetchMovieDetails(movieId) {
    const apiKey = "903ddbbeb450bfedbf6d93e02cef2067"
    const [movieDetails, setMovieDetails] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        setIsLoading(true)

        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setMovieDetails(data)
            })
            .catch((err) => {
                if (err) setErrorMessage(err.message)
                setErrorMessage("Something went wrong")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [apiKey, movieId])

    return { movieDetails, isLoading, errorMessage }
}

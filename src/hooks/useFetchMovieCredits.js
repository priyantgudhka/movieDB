import { useEffect, useState } from "react"

export function useFetchMovieCredits(movieId) {
    const apiKey = "903ddbbeb450bfedbf6d93e02cef2067"
    const [castList, setCastList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        setIsLoading(true)

        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setCastList(data.cast)
            })
            .catch((err) => {
                if (err instanceof Error) setErrorMessage(err.message)
                setErrorMessage("Something went wrong")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [apiKey, movieId])

    return { castList, isLoading, errorMessage }
}
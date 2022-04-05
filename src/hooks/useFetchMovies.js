import { } from "react-router"
import { useEffect, useState } from "react"

function useFetchMovies(pageNumber) {

    const apiKey = "903ddbbeb450bfedbf6d93e02cef2067"
    const [Movies, setMovies] = useState([])
    const [errorMessage, setErrorMessage] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=IN&with_original_language=hi&sort_by=popularity.desc&page=${pageNumber}`

        // const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${pageNumber}`

        fetch(url).then(res => res.json())
            .then(data => {
                setMovies((currentMovies) => [...currentMovies, ...data.results])
                setHasMore(data.results.length > 0)
            })
            .catch((err) => {
                if (err instanceof Error) {
                    setErrorMessage(err.message)
                }
                setErrorMessage("Something went wrong")
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [apiKey, pageNumber])
    return { Movies, isLoading, errorMessage, hasMore }
}
export default useFetchMovies
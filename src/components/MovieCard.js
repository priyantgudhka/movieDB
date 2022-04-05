import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom"


const IMG_API = "https://image.tmdb.org/t/p/w1280"

function MovieCard({ id, title, poster_path, vote_average, release_date, vote_count }) {
    return (
        <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                <CardActionArea >
                    <CardMedia
                        component="img"
                        height="320"
                        image={IMG_API + poster_path}
                        alt={title}
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {release_date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ☆ <b>{vote_average}</b> / 10 ({vote_count} Reviews)
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </ Card>
        </Link >
    )
}

export default MovieCard
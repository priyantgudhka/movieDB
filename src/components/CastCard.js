import React from 'react'
import Avatar from '@mui/material/Avatar';

function CastCard(cast) {
    function imageLink(path, size = "w500") {
        return `https://image.tmdb.org/t/p/${size}${path}`
    }
    return (
        <div>
            <Avatar src={imageLink(cast.profile_path)} alt={cast.original_name} />
        </div>
    )
}

export default CastCard
import React from 'react';
import { Avatar } from '@mui/material';

const Post = ({ username, caption, imageUrl }) => {

    return(
        <div className='post'>
            <div className='post_header'>
                <Avatar
                className='avatar-profile'
                src='https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=170667a&w=0&h=FXkT-N6vISLOCUefa9MyQg0pH-6loMX9zBZjgLK458c='
                alt='avatar'
                />
                <h3>{username}</h3>
            </div>
            <div>
                <img
                className='image-post'
                src={imageUrl}
                alt='post'
                />
                <h3 className='post_text'><strong>{username}:</strong> {caption}</h3>
                {/* {username + caption } */}     
            </div>
        </div>
    )
}

export default Post;
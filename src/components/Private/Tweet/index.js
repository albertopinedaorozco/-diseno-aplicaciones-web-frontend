import React from 'react';
import {Link} from 'react-router-dom';

const Tweet = (props) => {

    return (
        <>
            <p>{props.tweet.content}</p>
            <p><Link to={`/profile/${props.tweet.user.username}/${props.tweet.user._id}`}>@{props.tweet.user.username}</Link></p>
            <p>comments: {props.tweet.comments.length}</p> 
            <p>{props.tweet.createdAt}</p> 
            <hr />
        </>
    );
}

export default Tweet;
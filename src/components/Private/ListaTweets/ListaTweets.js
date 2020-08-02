import React from 'react';
import {Link, useParams} from 'react-router-dom';

const getTweets = () => {
    const token = localStorage.getItem('token');
    const api = process.env.REACT_APP_API_URL;
    const url = `${api}/tweets`;
    fetch(url, {
        method: 'GET',
        headers: {
            "x-access-token":token
        }
    })
    .then(res=>res.json())
    .then(json=>{
        setTweets(json);
    })
}

const Profile = (props) => {
    const params = useParams();
    return (
        <div>
            {this.state.Tweets.map((tweets, index) => (
                <p 
                key={index}>{tweets.name}<br/>
                {tweets.content}<br/>
                {tweets.date}<br/>
                </p>
                
            ))}
        </div>);
}

export default Profile;
import React, { useState, useEffect } from 'react';
import NewTweet from './../NewTweet';
import Tweet from './../Tweet';
import { Link } from 'react-router-dom';


const Tweets = () => {
    const [tweets, setTweets] = useState([]);

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

    const addTweet = (tweet) => {
        setTweets([tweet, ...tweets]);
    }

    useEffect(()=>{
        getTweets();
    },[]);

    return (
        <>
            <ul>
                <li><Link to="/Profile/">Profile</Link></li>
            </ul>
            <NewTweet addTweet={addTweet} />
            <h2>Tweets</h2>
            {
                tweets ? 
                    tweets.map(tweet=>
                        <Tweet key={tweet._id} tweet={tweet} />
                    )
                : 
                    <p>No hay elementos</p>
            }
        </>
    );
}

export default Tweets;
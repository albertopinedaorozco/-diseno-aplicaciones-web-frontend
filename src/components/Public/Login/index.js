import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './style.css';

const Login = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        const user = {
            username,
            password
        };
        const api = process.env.REACT_APP_API_URL;
        
        const url = `${api}/users/login`;
        console.log(url)
        console.log(" El objeto usuario que se envia " + JSON.stringify(user))
        fetch(url, {
            method: "POST",
            headers:{
                "content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(json=>{
            //console.log(json)
            const user = {
                id: json.id,
                name: json.name,
                username: json.username
            };
            console.log(user)
            console.log(json.token)
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem('token', json.token);
            props.setIsAuth(true);
            history.push("/");
        })
        .catch(err=>console.log("Usuario no existe " + err));
    };

    return (
            <Paper elevation={3} className="paper">
            <Typography variant="h4" component="h2" gutterBottom>
                Login
            </Typography>
            <form>
                <p> 
                    <TextField 
                        type="text" 
                        name="username"
                        label="Username" 
                        variant="filled"
                        placeholder="Username"
                        value={username}
                        onChange={event=>{setUsername(event.target.value)}}
                         />
                </p>
                <p> 
                    <TextField 
                        type="password" 
                        name="password"
                        label="Password" 
                        variant="filled"
                        placeholder="Password"
                        value={password}
                        onChange={event=>{setPassword(event.target.value)}}
                        />
                </p>
                <p><Button
                    onClick={()=>{ handleClick() }} 
                    type="button"
                    variant="contained" 
                    color="primary"
                    >Login</Button></p>
            </form>

            <p>
                <Link to="/passwordRecovery"><Typography variant="button" display="block" gutterBottom>
                Forgot password?
      </Typography></Link>  
            <Link to="/signup"><Typography variant="button" display="block" gutterBottom>
                Sign Up
      </Typography></Link> 
            
            <Link to="/"><Typography variant="button" display="block" gutterBottom>
                Home
      </Typography></Link></p>
        </Paper>
    )
};

export default Login;
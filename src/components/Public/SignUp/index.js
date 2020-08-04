import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';

const SignUp = (props) => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleClick = () => {
        if(password === passwordConfirmation){
            const user = {
                name,
                username,
                password
            };
            
        console.log('Las contraseña coinciden')

        const api = process.env.REACT_APP_API_URL;
        
        const url = `${api}/users`;
        const url2 = `${api}/users/login`;

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
            const id_user = json._id
            console.log(" el id del usuario es: "+id_user)
            /* autenticando al usuario*/
            const user2 = {
                username: user.username,
                password: user.password
            };
            fetch(url2, {
                method: "POST",
                headers:{
                    "content-Type": "application/json"
                },
                body: JSON.stringify(user2)
            })
            .then(res2=>res2.json())
            .then(json2=>{
                //console.log(json)
                const user3 = {
                    id: json2.id,
                    name: json2.name,
                    username: json2.username
                };
                console.log(user3)
                console.log(json2.token)
                localStorage.setItem("user", JSON.stringify(user3));
                localStorage.setItem('token', json2.token);
                props.setIsAuth(true);
                history.push("/");
            })
            .catch(err=>console.log("Usuario no existe " + err));
            
        })
        .catch(err=>console.log("Usuario no existe " + err));


            
        }
    };

    return (
        <div>
        <h1>Sign Up</h1>
            <form>
                <p> 
                    <label>Name</label><br />
                    <input 
                        type="text" 
                        name="name"
                        value={name}
                        onChange={event=>{setName(event.target.value)}}
                         />
                </p>
                <p> 
                    <label>Username</label><br />
                    <input 
                        type="text" 
                        name="username"
                        value={username}
                        onChange={event=>{setUsername(event.target.value)}}
                         />
                </p>
                <p> 
                    <label>Password</label><br />
                    <input 
                        type="password" 
                        name="password"
                        value={password}
                        onChange={event=>{setPassword(event.target.value)}}
                        />
                </p>
                <p> 
                    <label>Password Confirmation</label><br />
                    <input 
                        type="password" 
                        name="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={event=>{setPasswordConfirmation(event.target.value)}}
                        />
                </p>
                <p><button
                    onClick={()=>{ handleClick() }} 
                    type="button"
                    >SignUp</button></p>


                <p><Link to="/">Home</Link> or <Link to="/login">Sign In</Link></p>
            </form>
        </div>
    )
};

export default SignUp;
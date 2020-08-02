import React from "react";
import {useHistory, Link, Switch, Route} from "react-router-dom";
import Tweets from "./Tweets";
import Profile from "./Profile";

const Private = (props) => {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    props.setIsAuth(false);
    history.push("/");
  }
  return <div>
      <h1>Private</h1>
      <p><Link to="/profile">Profile</Link></p>
      <p><button 
          type="button" 
          onClick={()=>{logout()}}
        >Logout</button></p>

        <Switch>
          <Route exact path="/" component={Tweets} />
          <Route exact path="/Profile/:username?/:userId?"><Profile/></Route>
        </Switch>

  </div>;
};

export default Private;

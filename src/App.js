import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/dashboard/Dashboard";
import PostDetails from "./Components/posts/PostDetails";
import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
import CreatePost from "./Components/posts/CreatePost";
import Navbar from "./Components/layout/Navbar";
import {linkurl} from "./keyword";
import Notifications from "./Components/dashboard/Notifications";
import Profile from "./Components/Profile";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path={linkurl.root} component={Dashboard} />
            <Route path={linkurl.post} component={PostDetails} />
            <Route path={linkurl.signIn} component={SignIn} />
            <Route path={linkurl.signUp} component={SignUp} />
            <Route path={linkurl.createPost} component={CreatePost} />
            <Route path={linkurl.notifications} component={Notifications} />
            <Route path={linkurl.profile} component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;

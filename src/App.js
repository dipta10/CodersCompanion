import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./Components/layout/Navbar";
import Dashboard from "./Components/dashboard/Dashboard";
import PostDetails from "./Components/posts/PostDetails";
import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
import CreatePost from "./Components/posts/CreatePost";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={PostDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/createPost" component={CreatePost} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

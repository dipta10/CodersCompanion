import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class SignedInLinks extends Component {
  render() {
    return (
      <ul className="right">
        <li>
          <NavLink to="/createPost">New Post</NavLink>
        </li>
        <li>
          <NavLink to="/">Log Out</NavLink>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating pink lighten-1">
            NN
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default SignedInLinks;

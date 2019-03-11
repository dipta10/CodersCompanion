import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class SignedOutLink extends Component {
  render() {
    return (
      <div>
        <ul className="right">
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
          <li>
            <NavLink to="/signin">Log In</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default SignedOutLink;

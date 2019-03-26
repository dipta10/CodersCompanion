import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SignedInLinks } from "./SignedInLinks";
import { SignedOutLink } from "./SignedOutLink";
import {connect} from 'react-redux'

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="nav-wrapper blue-grey darken-3">
          <div className="container">
            <Link to="/" className="brand-logo left hide-on-med-and-down">
              Coders Companion
            </Link>
            <SignedInLinks />
            <SignedOutLink />
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
}

export default  connect(mapStateToProps) (Navbar);


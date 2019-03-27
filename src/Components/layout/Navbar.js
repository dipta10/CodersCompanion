import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SignedOutLink } from "./SignedOutLink";
import { connect } from 'react-redux'
import SignedInLinks from "./SignedInLinks";
import {linkurl} from "../../keyword";


export class Navbar extends Component {
  render() {

    const { auth } = this.props;
    const links = auth.uid ? (
      <SignedInLinks/>
    ) : (
      <SignedOutLink/>
    );

    return (
      <div>
        <nav className="nav-wrapper blue-grey darken-3">
          <div className="container">
            <Link to={linkurl.root} className="brand-logo left hide-on-med-and-down">
              Coders Companion
            </Link>
            <Link to={linkurl.root} className="brand-logo blue-text text-lighten-4 left show-on-med-and-down">
              Coders'Comp
            </Link>

            {links}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Navbar);



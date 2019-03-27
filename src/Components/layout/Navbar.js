import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SignedOutLink } from "./SignedOutLink";
import { connect } from 'react-redux'
import SignedInLinks from "./SignedInLinks";
import {linkurl} from "../../keyword";
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'


export class Navbar extends Component {
  render() {

    const { auth, profile } = this.props;
    const links = auth.uid ? (
      <SignedInLinks profile={profile}/>
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
            <Link to={linkurl.root} className="brand-logo blue-text text-lighten-4 left show-on-medium">
              Code'Comp
            </Link>
            {links}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('profile', state.firebase.profile);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([
//     {collection: 'posts'}
//   ])
// )(Navbar);


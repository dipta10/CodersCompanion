import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux'
import {signOut} from "../../store/actions/authActions";
import {linkurl} from "../../keyword";

const SignedInLinks = (props) => {

  return (
    <ul className="right">
      <li>
        <NavLink to={linkurl.createPost}>New Post</NavLink>
      </li>
      <li>
        <a href='/' onClick={() => handleLogout(props)}>Log Out</a>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          {props.profile.initial}
        </NavLink>
      </li>
    </ul>
  );
};

const handleLogout = (props) => {
  props.signOut();
};


const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
}

export default connect(null, mapDispatchToProps)(SignedInLinks);


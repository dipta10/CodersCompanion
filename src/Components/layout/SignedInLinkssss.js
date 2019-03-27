import React from 'react';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux'
import {signOut} from "../../store/actions/authActions";

const SignedInLinkssss = (props) => {
  return (
    <div>
      
    </div>
  );
};


const handleLogout = (props) => {
}


const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
}

export default connect(null, mapDispatchToProps)(SignedInLinkssss);



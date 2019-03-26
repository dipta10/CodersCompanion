import React from 'react';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux'
import {signOut} from "../../store/actions/authActions";

const SignedInLinkssss = (props) => {
  console.log('fucn you', props);
  return (
    <div>
      
    </div>
  );
};


const handleLogout = (props) => {
  console.log('handling log out');
  console.log(props);
}


const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
}

export default connect(null, mapDispatchToProps)(SignedInLinkssss);



import React, { Component } from "react";
import { connect } from 'react-redux'
import {signIn} from "../../store/actions/authActions";
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom";
import {linkurl} from "../../keyword";

export class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const auth = this.props.auth ;
    console.log('auth', auth);
    if (auth.uid) return <Redirect to={linkurl.dashboard}/>;

    const authError = this.props.authError;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <div className="center">
              <button className="btn pink lighten-1 z-depth-0">Login</button>
            </div>
            <div className="red-text center">
              { authError ? <p>Login Failed! Wrong email/password!</p> : null}
            </div>
            <div className="red-text center">
              <Link to={linkurl.signUp}>
                <p className="red-text">Create Account?</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

const mapStateToProps = (state) => {
  return {
    ...state,
    authError: state.auth.authError,
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

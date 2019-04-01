import React, { Component } from "react";
import { Link } from "react-router-dom";
import {linkurl} from "../../keyword";
import {signUp} from "../../store/actions/authActions";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    upVote: 0,
    downVote: 0,
    reputation: 0,
    description: "",
    status: 1,
  };
  // 1 = active
  // 2 = inactive
  // 3 = banned
  something = e => {};
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const auth = this.props.auth;
    const authError = this.props.authError;
    console.log('auth', auth);
    if (auth.uid) return <Redirect to={linkurl.dashboard}/>;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
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
              <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            </div>
            <div className="red-text center">
              <Link to={linkurl.signIn}>
                <p className="red-text">Sign In?</p>
              </Link>
              { authError ? <p className="red-text">{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

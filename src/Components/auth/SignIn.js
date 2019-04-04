import React, { Component } from "react";
import { connect } from 'react-redux'
import {signIn} from "../../store/actions/authActions";
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom";
import {linkurl} from "../../keyword";
import {Container, Button, Grid, Form, Message} from 'semantic-ui-react'

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
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input onChange={this.handleChange} id="email" label='Email' type="email" placeholder='Email'/>
          <Form.Input onChange={this.handleChange} id="password" label='Enter Password' placeholder='Password' type='password'/>


          <Grid>
            <Grid.Column textAlign="center">
              <Button primary type='submit'>Submit</Button>
            </Grid.Column>
          </Grid>

        </Form>

        {authError ?
          <Message
            error
            content={'wrong email/password'}
          />
          : null}


      </Container>
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

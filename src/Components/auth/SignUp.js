import React, {Component} from "react";
import {Link} from "react-router-dom";
import {linkurl} from "../../keyword";
import {signUp} from "../../store/actions/authActions";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Container, Button, Grid, Form, Message} from 'semantic-ui-react'


export class SignUp extends Component {

  componentDidMount() {
    console.log('here');
  }

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
    totalPosts: 0,
  };
  // 1 = active
  // 2 = inactive
  // 3 = banned
  something = e => {
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.firstName.trim().length == 0 || this.state.firstName.trim().length == 0 || this.state.email.trim().length == 0) {
      alert('you need to fill in all the fields')
      return;
    }
    this.props.signUp(this.state);
  };

  render() {
    const auth = this.props.auth;
    const authError = this.props.authError;
    console.log('auth', auth);
    if (auth.uid) return <Redirect to={linkurl.dashboard}/>;

    return (

      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>First Name</label>
            <input onChange={this.handleChange} id="firstName" placeholder='First Name'/>
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input onChange={this.handleChange} id="lastName" placeholder='Last Name'/>
          </Form.Field>
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
            content={authError}
          />
          : null}


      </Container>
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



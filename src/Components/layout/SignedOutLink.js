import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {linkurl} from "../../keyword";
import {Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react'
import logo from "../../logo.png"
import { withRouter} from 'react-router-dom'

export class SignedOutLink extends Component {
  state = {activeItem: 'home'};

  handleItemClick = (e, {name}) => {

    this.setState({activeItem: name});

    switch (name) {
      case 'SignIn':
        this.props.history.push(linkurl.signIn);
        break;
      case 'SignUp':
        this.props.history.push(linkurl.signUp);
        break;
    }
  };

  render() {
    const {activeItem} = this.state;
    return (
      <div>
        <Menu pointing primary>
          {/*<Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>*/}
          <Menu.Item>
            <img src={logo}/>
          </Menu.Item>

          <Menu.Item
            name='SignIn'
            active={activeItem === 'SignIn'}
            onClick={this.handleItemClick}
          >
            Sign In
          </Menu.Item>
          <Menu.Item
            name='SignUp'
            active={activeItem === 'SignUp'}
            onClick={this.handleItemClick}
          >Sign Up</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default withRouter(SignedOutLink);

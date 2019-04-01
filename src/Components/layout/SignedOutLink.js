import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {linkurl} from "../../keyword";
import {Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react'

export class SignedOutLink extends Component {
  state = {activeItem: 'home'};
  handleItemClick = (e, {name}) => this.setState({activeItem: name});
  render() {
    const {activeItem} = this.state;
    return (
      <div>
        <Menu pointing secondary>
          {/*<Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>*/}
          <Link to={linkurl.dashboard}>
            <Menu.Item
              name='Sign In'
              active={activeItem === 'Sign In'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to={linkurl.signUp}>
            <Menu.Item
              name='Sign Up'
              active={activeItem === 'Sign Up'}
              onClick={this.handleItemClick}
            />
          </Link>
        </Menu>
      </div>
    );
  }
}

export default SignedOutLink;

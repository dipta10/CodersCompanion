import React, {Component} from "react";
import {connect} from 'react-redux'
import {signOut} from "../../store/actions/authActions";
import {Menu, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {linkurl} from "../../keyword";
import logo from "../../logo.png"
import {Redirect, withRouter} from 'react-router-dom'

export class SignedInLinks extends Component {

  state = {activeItem: 'Dashboard'};

  handleItemClick = (e, {name}) => {

    this.setState({activeItem: name});

    switch (name) {
      case 'Dashboard':
        this.props.history.push(linkurl.dashboard);
        break;
      case 'CreatePost':
        this.props.history.push(linkurl.createPost);
        break;
      case 'Notifications':
        this.props.history.push(linkurl.notifications);
        break;
    }
  }

  render() {
    const {activeItem} = this.state;
    return (
      <div>
        <Menu pointing primary>
          {/*<Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>*/}
          <Menu.Item>
            <img src={logo}/>
          </Menu.Item>

          <Menu.Menu>

          </Menu.Menu>
          <Menu.Item
            name='Dashboard'
            active={activeItem === 'Dashboard'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='CreatePost'
            active={activeItem === 'CreatePost'}
            onClick={this.handleItemClick}
          >Create Post</Menu.Item>
          <Menu.Item
            name='Notifications'
            active={activeItem === 'Notifications'}
            onClick={this.handleItemClick}
          >
            Notifications
            <Label circular color="red">
              2
            </Label>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={() => handleLogout(this.props)}
            />
          </Menu.Menu>
        </Menu>
      </div>

    );
  }
};

const handleLogout = (props) => {
  props.signOut();
};


const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
}

export default connect(null, mapDispatchToProps)(withRouter(SignedInLinks));


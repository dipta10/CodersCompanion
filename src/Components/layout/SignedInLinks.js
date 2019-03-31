import React, {Component} from "react";
import {connect} from 'react-redux'
import {signOut} from "../../store/actions/authActions";
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {linkurl} from "../../keyword";

export class SignedInLinks extends Component {

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
              name='Dashboard'
              active={activeItem === 'Dashboard'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to={linkurl.createPost}>
            <Menu.Item
              name='CreatePost'
              active={activeItem === 'CreatePost'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to={linkurl.notifications}>
            <Menu.Item
              name='Notifications'
              active={activeItem === 'Notifications'}
              onClick={this.handleItemClick}
            />
          </Link>
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

export default connect(null, mapDispatchToProps)(SignedInLinks);


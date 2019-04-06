import React, {Component} from "react";
import {connect} from 'react-redux'
import {signOut} from "../../store/actions/authActions";
import {Dropdown, Icon, Menu, Label, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {linkurl} from "../../keyword";
import logo from "../../logo.png"
import {Redirect, withRouter} from 'react-router-dom'
import img from '../../jenny.jpg'

export class SignedInLinks extends Component {

  state = {activeItem: 'Dashboard'};

  options = [
    // {
    //   key: 'user',
    //   text: (
    //     <span>
    //     Signed in as <strong>{this.props.profile.firstName + ' ' + this.props.profile.lastName}</strong>
    //       {console.log('the props', this.props)}
    //     </span>
    //   ),
    //   disabled: true,
    // },
    { key: 'profile', text: 'My Profile',  onClick: () => this.handleItemClick(null, {name: 'myProfile'}) },
    { key: 'stars', text: 'My Friends' },
    { key: 'explore', text: 'Explore' },
    { key: 'integrations', text: 'Integrations' },
    { key: 'help', text: 'Help' },
    { key: 'settings', text: 'Settings' },
    { key: 'sign-out', text: 'Sign Out', onClick: this.props.signOut},
  ]

  handleItemClick = (e, {name}) => {
    switch (name) {
      case 'Dashboard':
        this.setState({activeItem: name});
        this.props.history.push(linkurl.dashboard);
        break;
      case 'CreatePost':
        this.setState({activeItem: name});
        this.props.history.push(linkurl.createPost);
        break;
      case 'Notifications':
        this.setState({activeItem: name});
        this.props.history.push(linkurl.notifications);
        break;
      case 'myProfile':
        console.log('off to my profile');
        this.props.history.push('/profile/' + this.props.profile.id);
        // console.log(this.props.profile);
        break;
    }
  };

  render() {
    const {activeItem} = this.state;
    return (
      <div>
        <Menu fixed='top' pointing primary>
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
            <Icon name='bell' />
            <Label circular color="red">
              2
            </Label>
          </Menu.Item>

          {/*<Menu.Menu position='right'>*/}
            {/*<Menu.Item*/}
              {/*name='logout'*/}
              {/*active={activeItem === 'logout'}*/}
              {/*onClick={() => handleLogout(this.props)}*/}
            {/*/>*/}
            {/*{console.log(this.props)}*/}
          {/*</Menu.Menu>*/}

          <Menu.Menu position='right'>
            <Menu.Item>
              <div>
                <Image src={img} avatar />
                <span>{this.props.profile.firstName}</span>
              </div>
              <Dropdown trigger={' '} options={this.options} />
            </Menu.Item>
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


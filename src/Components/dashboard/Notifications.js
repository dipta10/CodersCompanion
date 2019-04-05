import React, {Component} from "react";
import moment from 'moment'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {Feed, Container} from 'semantic-ui-react'
import {Icon, Grid, Menu, Segment} from 'semantic-ui-react'
import imageJenny from '../../jenny.jpg'
import {Link} from 'react-router-dom'
import AllFeed from "../Feed/AllFeed";
import MyPostsFeed from "../Feed/MyPostsFeed";
import PostsFeed from "../Feed/PostsFeed";

export class Notifications extends Component {

  state = {
    activeItem: 'all',
    sortOn: 'creationTime',
  };
  handleItemClick = (e, {name}) => {
    console.log('hola');
    console.log('name:', name);
    this.setState({
      ...this.state,
      activeItem: name,
    })
  }

  render() {
    const {notifications} = this.props;
    console.log('props noti', this.props);

    const auth = this.props.auth;
    if (!auth.uid) return <Redirect to='/signin'/>;

    return (
      <Container style={{marginTop: "10px"}}>

        <Grid style={{}}>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item name='all' active={this.state.activeItem === 'all'} onClick={this.handleItemClick}>
                All
              </Menu.Item>
              <Menu.Item name='myPosts' active={this.state.activeItem === 'myPosts'} onClick={this.handleItemClick}>
                My Posts & Comments
              </Menu.Item>
              <Menu.Item name='posts' active={this.state.activeItem === 'posts'}
                         onClick={this.handleItemClick}>
                Posts & Comments
              </Menu.Item>
              <Menu.Item name='friendRequests' active={this.state.activeItem === 'friendRequests'}
                         onClick={this.handleItemClick}>
                Friend Requests
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            { this.state.activeItem === 'all' && <AllFeed notifications={notifications} />}
            { this.state.activeItem === 'myPosts' && <MyPostsFeed notifications={notifications} />}
            { this.state.activeItem === 'posts' && <PostsFeed notifications={notifications} />}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    all: state.firestore,
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'notifications', orderBy: ['creationTime', 'desc']}
  ])
)(Notifications);


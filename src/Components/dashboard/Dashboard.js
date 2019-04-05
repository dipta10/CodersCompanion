import React, {Component} from "react";
import Notifications from "./Notifications";
import {PostList} from "../posts/PostList";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {messi} from '../../messi.jpg'
import {Label, Container, Icon, Grid, Menu, Segment} from 'semantic-ui-react'


export class Dashboard extends Component {
  state = {
    activeItem: 'public',
    sortOn: 'creationTime',
  }

  handleItemClick = (e, {name}) => {
    var sortOn = 'time';
    console.log('here name is', name);
    switch(name) {
      case 'public':
        sortOn = 'creationTime';
        break;
      case 'hot':
        sortOn = 'score';
        break;
    }
    this.setState({
      activeItem: name,
      sortOn: sortOn,
    })
  };

  compareCreationTime = (a, b) => {
    if (a.creationTime < b.creationTime) return -1;
    if (a.creationTime > b.creationTime) return 1;
    return 0;
  }

  render() {
    var projects = this.props.project;


    const auth = this.props.auth;
    if (!auth.uid) return <Redirect to='/signin'/>;
    const {notifications} = this.props;
    if (projects) {
      console.log('this state', this.state);
      if (this.state.sortOn === 'creationTime') {
        projects =  projects.slice().sort(function(a, b) {
          // return b.score - a.score;
          return b.creationTime.toDate() - a.creationTime.toDate();
        });
      } else if (this.state.sortOn === 'score') {
        projects =  projects.slice().sort(function(a, b) {
          return b.score - a.score;
        });
      }
    }

    return (
      <Grid style={{}}>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item name='public' active={this.state.activeItem === 'public'} onClick={this.handleItemClick}/>
            <Menu.Item name='friends' active={this.state.activeItem === 'friends'} onClick={this.handleItemClick}/>
            <Menu.Item
              name='hot'
              active={this.state.activeItem === 'hot'}
              onClick={this.handleItemClick}
            >
              <Icon name='bolt'/>
              Hot
            </Menu.Item>
            <Menu.Item
              name='notifications'
              active={this.state.activeItem === 'notifications'}
              onClick={this.handleItemClick}
            >Notification
            </Menu.Item>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
            <PostList projects={projects}/>
        </Grid.Column>
      </Grid>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.firestore.ordered.posts,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    // {collection: 'posts', orderBy: ['creationTime', 'desc']},
    {collection: 'posts', },
    {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']}
  ])
)(Dashboard);

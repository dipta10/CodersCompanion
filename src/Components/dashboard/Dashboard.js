import React, {Component} from "react";
import Notifications from "./Notifications";
import {PostList} from "../posts/PostList";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {messi} from '../../messi.jpg'
import {Label, Container, Icon, Grid, Menu, Segment} from 'semantic-ui-react'
import ProfilePostsFeed from "../Feed/ProfilePostsFeed";
import DashboardPostsFeed from "../Feed/DashboardPostsFeed";
import SearchExampleStandard from "./SearchExampleStandard";


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
      <Grid style={{ marginTop: '2.8em' }} >
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
              name='search'
              active={this.state.activeItem === 'search'}
              onClick={this.handleItemClick}
            >Search
            </Menu.Item>
          </Menu>
        </Grid.Column>
        {this.state.activeItem !== 'search' && <Grid.Column style={{marginTop: "1em"}} stretched width={12}>
          <DashboardPostsFeed posts={projects}/>
        </Grid.Column>
        }
        {
          this.state.activeItem === 'search' &&
            <SearchExampleStandard style={{marginTop: "2em"}}/>
        }
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

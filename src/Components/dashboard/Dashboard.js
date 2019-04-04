import React, {Component} from "react";
import Notifications from "./Notifications";
import {PostList} from "../posts/PostList";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {messi} from '../../messi.jpg'
import { Container, Grid, Menu, Segment } from 'semantic-ui-react'


export class Dashboard extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const projects = this.props.project;


    const auth = this.props.auth;
    if (!auth.uid) return <Redirect to='/signin'/>;
    const {notifications} = this.props;

    return (
    <Grid style={{}}>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item name='bio' active={this.state.activeItem === 'bio'} onClick={this.handleItemClick} />
          <Menu.Item name='pics' active={this.state.activeItem === 'pics'} onClick={this.handleItemClick} />
          <Menu.Item
            name='companies'
            active={this.state.activeItem === 'companies'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='links'
            active={this.state.activeItem === 'links'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Grid.Column>

      <Grid.Column stretched width={12}>
        <Segment>
          <PostList projects={projects}/>
        </Segment>
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
    {collection: 'posts', orderBy: ['creationTime', 'desc']},
    {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']}
  ])
)(Dashboard);

import React, {Component} from "react";
import Notifications from "./Notifications";
import {PostList} from "../posts/PostList";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {messi} from '../../messi.jpg'
import { Container } from 'semantic-ui-react'

export class Dashboard extends Component {
  render() {
    const projects = this.props.project;


    const auth = this.props.auth;
    if (!auth.uid) return <Redirect to='/signin'/>;
    const {notifications} = this.props;

    return (

      <Container style={{marginLeft: "10px", marginTop: "20px"}}>
        <div className="">
          <PostList projects={projects}/>
        </div>
      </Container>
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

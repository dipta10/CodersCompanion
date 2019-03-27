import React, { Component } from "react";
import Notifications from "./Notifications";
import { PostList } from "../posts/PostList";
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
import {messi} from '../../messi.jpg'

export class Dashboard extends Component {
  render() {
    const projects = this.props.project;

    console.log('your auth: ', this.props);

    const auth = this.props.auth;
    if (!auth.uid) return <Redirect to='/signin'/>;

    return (
      <div className="dashboard container">




        <div className="row">
          {/*<div className="col s12 m6">*/}
          <div className="col s12 m12">
            <PostList projects={projects}/>
          </div>
          {/*<div className="col s12 m5 offset-m1">*/}
          <div className="col s12 m12">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.firestore.ordered.posts,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(Dashboard);

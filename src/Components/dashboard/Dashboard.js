import React, { Component } from "react";
import Notifications from "./Notifications";
import { PostList } from "../posts/PostList";
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

export class Dashboard extends Component {
  render() {
    // console.log(this.props);
    const projects = this.props.project;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <PostList projects={projects}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project.projects
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(Dashboard);

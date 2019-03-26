import React, { Component } from "react";
import Notifications from "./Notifications";
import { PostList } from "../posts/PostList";
import { connect } from 'react-redux'

export class Dashboard extends Component {
  render() {
    // console.log(this.props);
    const projects = this.props.project;
    console.log('hola');
    console.log(projects);
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

export default connect(mapStateToProps)(Dashboard);

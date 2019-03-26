import React, { Component } from "react";
import PostSummary from "./PostSummary";
import {connect} from 'react-redux'

export class PostList extends Component {
  render() {
    const projects = this.props.projects;
    console.log(projects);
    return (
      <div className="project-list section">
        { projects && projects.map ( project => {
          {console.log('id is', project.id)}
          return (
            <PostSummary project={project} key={project.id} name='dipta'/>
          );
        })};
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project.projects
  }
};

export default connect(mapStateToProps)(PostList);

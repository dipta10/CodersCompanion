import React, { Component } from "react";
import PostSummary from "./PostSummary";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class PostList extends Component {
  render() {
    const projects = this.props.projects;
    return (
      <div className="project-list section">
        { projects && projects.map ( project => {
          return (
            <Link to={'/post/' + project.id} key={project.id}>
              <PostSummary project={project} key={project.id} name='dipta'/>
            </Link>
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

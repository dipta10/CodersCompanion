import React, { Component } from "react";

export class PostSummary extends Component {
  render() {
    console.log('summary');
    console.log(this.props);
    // const project = this.props.project;

    const {project} = this.props;

    return (
      <div className="project-list section">
        <div className="card z-depth-0 project-summary">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">{project.title}</span>
            <p className="">Posted by LoveExtendsCode</p>
            <p className="grey-text">{project.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostSummary;

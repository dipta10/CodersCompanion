import React, { Component } from "react";

export class PostSummary extends Component {
  render() {
    return (
      <div className="project-list section">
        <div className="card z-depth-0 project-summary">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">Post Title</span>
            <p>Posted by LoveExtendsCode</p>
            <p className="grey-text">3rd September, 2am</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostSummary;

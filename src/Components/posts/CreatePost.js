import React, { Component } from "react";
import { connect } from 'react-redux'
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from 'react-router-dom'
import {keyword, linkurl} from "../../keyword";

export class CreatePost extends Component {
  state = {
    title: "",
    content: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createProjectActionType(this.state);
    this.props.history.push(linkurl.dashboard);
  };
  render() {

    const auth = this.props.auth;
    if (!auth) return <Redirect to='/signin'/>;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Post</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Post Content</label>
            <textarea
              className="materialize-textarea"
              id="content"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProjectActionType: (project) => dispatch(createProject(project))
  };
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);

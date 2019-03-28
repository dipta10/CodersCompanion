import React, {Component} from "react";
import {connect} from 'react-redux'
import {createProject} from "../../store/actions/projectActions";
import {Redirect} from 'react-router-dom'
import MarkdownRenderer from 'react-markdown-renderer';
import {keyword, linkurl} from "../../keyword";
import TextareaAutosize from 'react-textarea-autosize';
import { Form, TextArea } from 'semantic-ui-react'



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
    if (auth.uid == null) return <Redirect to='/signin'/>;

    return (
      <div className="">
        <Form onSubmit={this.handleSubmit} className="white ">
          <h5 className="grey-text text-darken-3 center">Create New Post</h5>
          <div className="row">
            <div className="col s12 m6">
              <div className="input-field">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" onChange={this.handleChange}/>
              </div>
              <div className="input-field">
                {/*<label htmlFor="">Post Content</label>*/}
                <textarea
                  className="materialize-textarea"
                  rows={100}
                  cols={100}
                  aria-expanded={true}
                  id="content"
                  onChange={this.handleChange}
                  style={{ height: 200 }}
                  value={this.state.content}
                />
              </div>
            </div>
            <div className=" col s12 m6">
              {/*<label htmlFor="password">MD Render</label>*/}
              {/*<textarea*/}
                {/*disabled={true}*/}
                {/*className="materialize-textarea black-text"*/}
                {/*id="content"*/}
                {/*onChange={this.handleChange}*/}
                {/*value="skip"*/}
              {/*/>*/}
              <div className="card">
                <MarkdownRenderer markdown={this.state.content} />
              </div>
            </div>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Submit</button>
          </div>
        </Form>
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
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);

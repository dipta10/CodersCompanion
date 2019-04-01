import React, {Component} from "react";
import {connect} from 'react-redux'
import {createProject} from "../../store/actions/projectActions";
import {Redirect} from 'react-router-dom'
import MarkdownRenderer from 'react-markdown-renderer';
import {keyword, linkurl, newline_firebase} from "../../keyword";
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Divider, Header, Image, Segment, Form, TextArea } from 'semantic-ui-react'

export class CreatePost extends Component {
  state = {
    title: "",
    content: "",
    upVote: 0,
    downVote: 0,
    score: 0,
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let con = this.state.content.replace(/\n/g, newline_firebase);
    this.setState({
      ... this.state,
      content: con,
    });


    this.props.createProjectActionType({...this.state, content: con});
    this.props.history.push(linkurl.dashboard);
  };

  render() {

    const auth = this.props.auth;
    if (auth.uid == null) return <Redirect to='/signin'/>;

    return (
      <div>
        <Segment>
          <Form>
            <TextArea rows={2} placeholder='Title' onChange={this.handleChange} value={this.state.title} id='title' />
          </Form>
          <br/>
          <Form>
            <TextArea placeholder='Details' onChange={this.handleChange} value={this.state.content} id='content' style={{ minHeight: 100 }} />
          </Form>
          <Divider fitted />
          <Divider horizontal>Markdown Rendering</Divider>

        </Segment>

        <MarkdownRenderer markdown={this.state.content} />

        <Divider horizontal>
          <Button primary onClick={this.handleSubmit} >Submit</Button>
        </Divider>
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

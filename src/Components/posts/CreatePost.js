import React, {Component} from "react";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {createProject} from "../../store/actions/projectActions";
import {Redirect} from 'react-router-dom'
import MarkdownRenderer from 'react-markdown-renderer';
import {keyword, linkurl, newline_firebase} from "../../keyword";
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Divider, Container, Segment, Form, TextArea, Dropdown } from 'semantic-ui-react'

export class CreatePost extends Component {
  options = [
    { key: 'DFS', text: 'Angular', value: 'angular' },
    { key: 'BFS', text: 'CSS', value: 'css' },
    { key: 'DP', text: 'Graphic Design', value: 'design' },
    { key: 'C++', text: 'Ember', value: 'ember' },
    { key: 'C', text: 'HTML', value: 'html' },
    { key: 'JAVA', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'Markdown', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'CodeForces', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
  ]
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

    const users = this.props.users;
    var profile = null;
    users.forEach(user => {
      if (user.id === this.props.auth.uid) {
        profile = user;
      }
    });
    console.log('my profile', profile);

    this.props.createProjectActionType({...this.state, content: con}, profile);
    this.props.history.push(linkurl.dashboard);
  };

  render() {

    const auth = this.props.auth;
    if (auth.uid == null) return <Redirect to='/signin'/>;
    if (this.props.notificationCount) console.log('count', this.props.notificationCount[0]);

    return (
      <Container style={{ marginTop: '5em' }}>
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

        <Dropdown placeholder='Tags' fluid multiple selection options={this.options} />

        <Divider horizontal>
          <Button primary onClick={this.handleSubmit} >Submit</Button>
        </Divider>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProjectActionType: (project, myProfile) => dispatch(createProject(project, myProfile)),

  };
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    notificationCount: state.firestore.ordered.notificationCount,
  }
}

export default compose(
  connect(
    mapStateToProps, mapDispatchToProps
  ),

  firestoreConnect([
    {collection: 'users'},
    {collection: 'notifications', limit: 50, orderBy: ['time', 'desc']},
    {collection: 'notificationCount'},
  ])
)(CreatePost);


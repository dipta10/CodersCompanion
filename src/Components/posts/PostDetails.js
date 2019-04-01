import React, {Component} from "react";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {newline_firebase} from "../../keyword";
import MarkdownRenderer from 'react-markdown-renderer';
import {Button, Comment, Form, Header, Loader, Image, Segment} from 'semantic-ui-react'
import {createComment, createPostCommentReply} from "../../store/actions/projectActions";
import CustomComment from "../CustomComment";
const queryable = require('query-objects');


export class PostDetails extends Component {

  // state = {
  //   postComment: "",
  //   postAnswer: "",
  // };
  state = {
    postComment: {
      postId: null,
      content: "",
      child: [],
      parent: null,
      type: "post"
    },
    answerComment: {
      answerId: null,
      content: "",
      child: [],
      parent: null,
      type: "answer"
    }
  }
  handlePostCommentChange = e => {
    // this.setState({
    //   [e.target.id]: e.target.value
    // });
    if (e.target.id === 'postComment') {
      this.setState(
        {
          ...this.state,
          postComment: {
            ...this.state.postComment,
            content: e.target.value,
          },
        }
      );
    } else {

    }
  };
  handlePostCommentSubmit = e => {
    e.preventDefault();
    this.props.createPostCommentActionType({...this.state.postComment}, this.props.postid);
    this.setState({
      ...this.state,
      postComment: {
        ...this.state.postComment,
        content: "",
      },
    });
  };


  render() {

    const { project, comments, postid } = this.props;

    const filters = [
      {
        field: 'postId',
        value: postid,
        operator: 'equals'
      },
      {
        field: 'parent',
        value: null,
        operator: 'equals',
        matchEmpty: true,
      },
    ];
    var res = null;
    if (comments) {
      res = queryable(comments).and(filters);
    }

    if (project != null) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{project.title}</span>
                <MarkdownRenderer markdown={project.content.replace(/%20NEW_LINE19382%/g, '\n')}/>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by {project.username}</div>
              <div>{moment(project.creationTime.toDate().toString()).calendar()}</div>
            </div>
          </div>
          <Form reply>
            <Form.TextArea value={this.state.postComment.content} onChange={this.handlePostCommentChange} id={"postComment"} placeholder={"Create a comment"} style={{height: '60px'}}/>
            <Button onClick={this.handlePostCommentSubmit} content='Add comment' labelPosition='left' icon='edit' primary/>
          </Form>
          <br/>

          {res && res.map(comment => {
            return(
              <CustomComment comments={comments} id={comment.id} key={comment.id} all={this.props} />
            );
          })}

        </div>
      )
    }
    else {
      return (
        <Segment>
        <Loader active />

        </Segment>
      );
    }
  }
};


const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.posts;
  const project = projects ? projects[id] : null;

  return {
    project: project,
    postid: id,
    auth: state.firebase.auth,
    comments: state.firestore.ordered.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPostCommentActionType: (comment, postId) => dispatch(createComment(comment, postId)),
    createPostCommentReply: (comment, parentChild) => dispatch(createPostCommentReply(comment, parentChild))
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'posts'},
    {collection: 'comments'}
  ])
)(PostDetails);

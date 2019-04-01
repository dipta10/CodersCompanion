import React, {Component} from "react";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {newline_firebase} from "../../keyword";
import MarkdownRenderer from 'react-markdown-renderer';
import {createComment, createPostCommentReply} from "../../store/actions/projectActions";
import CustomComment from "../CustomComment";
import {Divider, Header, Container, Button, Form, Icon, Label, Placeholder, Loader, Segment, Card} from 'semantic-ui-react'

const queryable = require('query-objects');
const ReactMarkdown = require('react-markdown')


export class PostDetails extends Component {

  ButtonExampleLabeledBasic = () => (
    <div>
      <Button as='div' labelPosition='right'>
        <Button color='red'>
          <Icon name='heart'/>
          Like
        </Button>
        <Label as='a' basic color='red' pointing='left'>
          2,048
        </Label>
      </Button>
      <Button as='div' labelPosition='right'>
        <Button basic color='blue'>
          <Icon name='fork'/>
          Fork
        </Button>
        <Label as='a' basic color='blue' pointing='left'>
          2,048
        </Label>
      </Button>
    </div>
  )


  PlaceholderExampleHeaderImage = () => (
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line/>
        <Placeholder.Line/>
      </Placeholder.Header>
    </Placeholder>
  )

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
    },
    postUpvoteDownVote: {
      postId: null,
      userId: null,
      status: 0
    }
  };
  handleUpvote = e => {
    console.log('upvote handler');
  };
  handleDownVote = e => {
    console.log('downvote handler');
  };
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

    const {project, comments, postid} = this.props;

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
        <Container className="">

          <Container>
            <Segment>
              <Header as='h2' icon textAlign='center'>
                <Header.Content>{project.title}</Header.Content>
              </Header>
              <Divider />
              <MarkdownRenderer markdown={project.content.replace(/%20NEW_LINE19382%/g, '\n')}/>
              {/*<ReactMarkdown source={project.content.replace(/%20NEW_LINE19382%/g, '\n')} />,*/}
            </Segment>
          </Container>

          <Container textAlign='center' style={{marginTop: '10px'}} className="">
            <Button onClick={this.handleUpvote} as='div' labelPosition='right'>
              <Button basic color='grey'>
                <Icon name='arrow up'/>
                UpVote
                {console.log(project)}
              </Button>

              <Label as='a' basic color='grey' pointing='left'>
                {project.upVote}
              </Label>
            </Button>
            <Button onClick={this.handleDownVote} as='div' labelPosition='right'>
              <Button basic color='grey'>
                <Icon name='arrow down'/>
                DownVote
              </Button>
              <Label as='a' basic color='grey' pointing='left'>
                {project.downVote}
              </Label>
            </Button>
            <Button as='div' labelPosition='right'>
              <Button disabled basic color='blue'>
                <Icon name='fork'/>
                Total
              </Button>
              <Label as='a' basic color='blue' pointing='left'>
                {project.score}
              </Label>
            </Button>
          </Container>

          <Form reply style={{marginTop: "10px"}}>
            <Form.TextArea value={this.state.postComment.content} onChange={this.handlePostCommentChange}
                           id={"postComment"} placeholder={"Create a comment"} style={{height: '60px'}}/>
            <Button onClick={this.handlePostCommentSubmit} content='Add comment' labelPosition='right' floated='right'  icon='edit' primary/>
          </Form>
          <br/>


          {res == null && this.PlaceholderExampleHeaderImage()}
          {res && res.map(comment => {
            return (
              <CustomComment comments={comments} id={comment.id} key={comment.id} all={this.props}/>
            );
          })}

        </Container>
      )
    }
    else {
      return (
        <Segment>
          <Loader active/>

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

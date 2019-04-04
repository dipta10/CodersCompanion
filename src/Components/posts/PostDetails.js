import React, {Component} from "react";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {newline_firebase} from "../../keyword";
import MarkdownRenderer from 'react-markdown-renderer';
import {createComment, createPostCommentReply, createPostVote} from "../../store/actions/projectActions";
import CustomComment from "../CustomComment";
import {
  Divider,
  Header,
  Container,
  Button,
  Form,
  Icon,
  Label,
  Placeholder,
  Loader,
  Segment,
  Card
} from 'semantic-ui-react'

const queryable = require('query-objects');
const ReactMarkdown = require('react-markdown')


export class PostDetails extends Component {


  PlaceholderExampleHeaderImage = () => (
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line/>
        <Placeholder.Line/>
      </Placeholder.Header>
    </Placeholder>
  );

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
    postVote: {
      postId: null,
      userId: null,
      status: 0
    },
    postVoteButton: {
      upVoteButton: true,
      downVoteButton: true,
      status: 0
    }
  };
  handleVote = (value, found, id, values) => {
    // this.setState({
    //   ...this.state,
    //   postVote: {
    //     postId: this.props.project.id,
    //     userId: this.props.auth.uid,
    //     status: 1
    //   }
    // });
    this.props.createPostVote(value, found, id, values);
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

  constructor(props) {
    super(props);
    const {project, postVotes} = this.props;
  }

  render() {

    const {project, comments, postid, postVotes} = this.props;

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

    var postVoteButton = {
      upVoteButton: true,
      downVoteButton: true,
      status: 0,
      found: false,
      id: null
    };

    if (postVotes && project) postVotes.forEach(postVote => {
      if (postVote.postId === this.props.project.id && postVote.userId === this.props.auth.uid) {
        postVoteButton = {
          upVoteButton: postVote.status !== 1,
          downVoteButton: postVote.status !== -1,
          status: 0,
          found: true,
          id: postVote.id
        }
      }
    });

    if (project != null) {
      return (
        <Container className="">

          <Container>
            <Segment>
              <Header as='h2' icon textAlign='center'>
                <Header.Content>{project.title}</Header.Content>
              </Header>
              <Divider/>
              <MarkdownRenderer markdown={project.content.replace(/%20NEW_LINE19382%/g, '\n')}/>
              {/*<ReactMarkdown source={project.content.replace(/%20NEW_LINE19382%/g, '\n')} />,*/}
            </Segment>
          </Container>

          <Container textAlign='center' style={{marginTop: '10px'}} className="">

            <Button onClick={() => this.handleVote(1, postVoteButton.found, postVoteButton.id, {postId: this.props.project.id, userId: this.props.auth.uid, postScore: this.props.project.score, upVote: project.upVote, downVote: project.downVote})} disabled={!postVoteButton.upVoteButton} as='div'
                    labelPosition='right'>
              <Button basic color={postVoteButton.upVoteButton ? 'grey' : 'red'}>
                <Icon name='arrow up'/>
                UpVote
              </Button>

              <Label as='a' basic color={postVoteButton.upVoteButton ? 'grey' : 'red'} pointing='left'>
                {project.upVote}
              </Label>
            </Button>

            <Button onClick={() => this.handleVote(-1, postVoteButton.found, postVoteButton.id, {postId: this.props.project.id, userId: this.props.auth.uid, postScore: this.props.project.score, upVote: project.upVote, downVote: project.downVote})} disabled={!postVoteButton.downVoteButton} as='div'
                    labelPosition='right'>
              <Button basic color={postVoteButton.downVoteButton ? 'grey' : 'blue'}>
                <Icon name='arrow down'/>
                DownVote
              </Button>
              <Label as='a' basic color={postVoteButton.downVoteButton ? 'grey' : 'blue'} pointing='left'>
                {project.downVote}
              </Label>
            </Button>
            <Button as='div' disabled labelPosition='right'>
              <Button bled basic color='grey'>
                <Icon name='sort'/>
              </Button>
              <Label as='a' basic color='grey' pointing='left'>
                {project.score}
              </Label>
            </Button>
          </Container>

          <Form reply style={{marginTop: "10px"}}>
            <Form.TextArea value={this.state.postComment.content} onChange={this.handlePostCommentChange}
                           id={"postComment"} placeholder={"Create a comment"} style={{height: '60px'}}/>
            <Button onClick={this.handlePostCommentSubmit} content='Add comment' labelPosition='right' floated='right'
                    icon='edit' primary/>
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


const
  mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.posts;
    const project = projects ? projects[id] : null;

    return {
      project: project,
      postid: id,
      auth: state.firebase.auth,
      comments: state.firestore.ordered.comments,
      postVotes: state.firestore.ordered.postVotes,
    }
  }

const
  mapDispatchToProps = (dispatch) => {
    return {
      createPostCommentActionType: (comment, postId) => dispatch(createComment(comment, postId)),
      createPostCommentReply: (comment, parentChild) => dispatch(createPostCommentReply(comment, parentChild)),
      createPostVote: (value, found, id, values) => dispatch(createPostVote(value, found, id, values)),
    };
  }

export default compose(
  connect(
    mapStateToProps, mapDispatchToProps
  ),

  firestoreConnect([
    {collection: 'posts'},
    {collection: 'comments'},
    {collection: 'postVotes'},
  ])
)(
  PostDetails
)
;

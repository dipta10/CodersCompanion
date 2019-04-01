import React, {Component} from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Button, Comment, Form, Header} from 'semantic-ui-react'
import moment from 'moment'
import {createPostCommentReply} from "../store/actions/projectActions";

class CustomComment extends Component {
  // <CustomComment comments={comments} id={2} />

  state = {
    show: false,
    content: "",
    childComment: [],
  };

  handleShowComment = () => {
    this.setState({
      show: this.state.show ? false : true,
    });
  };

  handelAddReply = (mycomment) => {
    const commentId = this.props.id;
    console.log('my comment', mycomment);
    if (mycomment.type === 'post') {
      // post
      const uploadState = {
        ...this.state,
        content: this.state.content,
        type: 'post',
        parent: commentId,
        postId: mycomment.postId,
      }
      this.props.createPostCommentReply(uploadState, mycomment.child);

    } else {
      // answer

    }

    this.setState({
      ...this.state,
      content: "",
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };


  getMyCommentDetails = (comments, id) => {
    const mycomment = {
      id: 'found?',
      content: 'found?',
      username: 'found?',
      child: [],
    };

    for (let i = 0; i < comments.length; ++i) {
      if (comments[i].id == id) {
        // mycomment.id = comments[i].id;
        // mycomment.username = comments[i].username;
        // mycomment.content = comments[i].content;
        // mycomment.child = comments[i].child;
        // mycomment.creationTime = comments[i].creationTime;
        const mycomment = {
          ...comments[i]
        };
        return mycomment;
      }
    }
    return null;
  }

  render() {
    const {comments, id} = this.props;

    let mycomment = {};
    mycomment = this.getMyCommentDetails(comments, id);


    return (
      <Comment.Group>

        <Comment>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'/>
          <Comment.Content>
            <Comment.Author as='a'>{mycomment.username}</Comment.Author>
            <Comment.Metadata>
              <div>
                {moment(mycomment.creationTime.toDate()).fromNow()}
              </div>
            </Comment.Metadata>
            <Comment.Text>
              <p>{mycomment.content}</p>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={this.handleShowComment}>Reply</Comment.Action>
            </Comment.Actions>
            {this.state.show ?
              <Form reply>
                <Form.TextArea value={this.state.content} id="content" onChange={this.handleChange} style={{height: '60px'}}/>
                <Button onClick={() => this.handelAddReply(mycomment)} content='Add Reply' labelPosition='right' icon='edit' primary/>

                <br/>
                <br/>
                <br/>
              </Form>
              : null}
          </Comment.Content>
        </Comment>

      </Comment.Group>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    comments: state.firestore.ordered.comments
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createPostCommentReply: (comment, parentChild) => dispatch(createPostCommentReply(comment, parentChild))
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'posts'},
    {collection: 'comments'}
  ])
)(CustomComment);


// {(this.props.comments[this.props.id-1].child && this.props.comments[this.prop+s.id-1].child.length > 0) ?
//
//   <Comment.Group>
//     {this.props.comments[this.props.id-1].child.map((value) => {
//       return <CustomComment comments={this.props.comments} id={this.props.comments[value-1].id}/>
//     })}
//   </Comment.Group>
//
//   : null }




import React, {Component} from 'react';
import moment from 'moment'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Feed, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import imageJenny from '../../jenny.jpg'

class MyPostsFeed extends Component {
  render() {
    const {notifications} = this.props;

    return (
      <Feed>
        {notifications && notifications.map(item => {
          if (this.props.auth.uid !== item.userId &&
            (item.type === 'post' || item.type === 'comment') &&
            (item.postCreatorId === this.props.auth.uid || item.commentCreatorId === this.props.auth.uid)
          ) return (
            <Feed.Event key={item.id}>
              <Feed.Label image={imageJenny}/>
              <Feed.Content>
                <Feed.Date>{moment(item.creationTime.toDate()).fromNow()}</Feed.Date>
                <Feed.Summary>
                  <Link to={'/profile/' + item.userId}>{item.userName} </Link>
                  <Link to={'/post/' + item.postId}>
                  </Link>
                  {item.type === 'post' &&
                  <span>
                      created a new<span> </span>
                    <Link to={'/post/' + item.postId}>
                      post
                    </Link>
                    </span>
                  }
                  {
                    item.type === 'join' &&
                    <span> from your Institution Joined the party</span>
                  }
                  {
                    item.type === 'commentReply' && null
                  }
                  {item.type === 'comment' &&
                  item.postCreatorId !== this.props.auth.uid &&
                  <span> commented on a <span></span>
                          <Link to={'/post/' + item.postId}>
                          post
                          </Link>
                        </span>
                  }
                  {
                    item.type === 'comment' &&
                    item.postCreatorId === this.props.auth.uid &&
                    <span> commented on your <span></span>
                          <Link to={'/post/' + item.postId}>
                          post
                          </Link>
                          </span>
                  }
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          )
        })}
        { notifications && notifications.length === 0 && <h4>You've no notifications yet :(</h4> }
      </Feed>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    // {collection: 'notifications', orderBy: ['creationTime', 'desc']}
  ])
)(MyPostsFeed);


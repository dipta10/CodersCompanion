import React, {Component} from 'react';
import moment from 'moment'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Feed, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import imageJenny from '../../jenny.jpg'

class ProfilePostsFeed extends Component {
  render() {
    const {posts} = this.props;

    return (
      <Feed>
        {posts && posts.map(item => {
            return (
            <Feed.Event key={item.id}>
              <Feed.Label image={imageJenny}/>
              <Feed.Content>
                <Feed.Summary>
                  <Link to={'/profile/' + item.userId}>{item.username} </Link>
                  <Link to={'/post/' + item.postId}>
                  </Link>
                  {/*<span>*/}
                  {/*created a new<span> </span>*/}
                  {/*<Link to={'/post/' + item.id}>*/}
                  {/*post*/}
                  {/*</Link>*/}
                  {/*</span>*/}
                  <Feed.Date>{moment(item.creationTime.toDate()).fromNow()}</Feed.Date>
                  <Link to={'/post/' + item.id}>
                    <p style={{color: "black"}}>{item.title}</p>
                  </Link>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='arrow up'/>
                    {item.upVote}
                  </Feed.Like>
                  <Feed.Like>
                    <Icon name='arrow down'/>
                    {item.downVote}
                  </Feed.Like>
                  <Feed.Like>
                    <Icon name='sort'/>
                    {item.score}
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          )
        })}
        {posts && posts.length === 0 && <h4>You've no notifications yet :(</h4>}
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
)(ProfilePostsFeed);

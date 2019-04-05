import React, {Component} from "react";
import moment from 'moment'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {Feed, Container} from 'semantic-ui-react'
import imageJenny from '../../jenny.jpg'
import {Link} from 'react-router-dom'

export class Notifications extends Component {
  render() {
    const {notifications} = this.props;
    console.log('props noti', this.props);

    const auth = this.props.auth;
    if (!auth.uid) return <Redirect to='/signin'/>;

    return (
      <Container style={{marginTop: "10px"}}>
        <Feed>
          {notifications && notifications.map(item => {
            if (this.props.auth.uid !== item.userId) return (
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
                      Created a new<span> </span>
                    <Link to={'/post/' + item.postId}>
                      Post
                    </Link>
                    </span>
                    }
                    {
                      item.type === 'join' &&
                      <span> from your Institution Joined the party</span>
                    }
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            )
          })}
        </Feed>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    all: state.firestore,
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'notifications', orderBy: ['creationTime', 'desc']}
  ])
)(Notifications);

// export default Notifications;


{/*<div className="container">*/
}
{/*<div className="section">*/
}
{/*<div className="card z-depth-0">*/
}
{/*<div className="card-content">*/
}
{/*<span className="card-title">Notificaitons</span>*/
}
{/*<ul className="notifications">*/
}
{/*{ notifications && notifications.map((item) => {*/
}
{/*return (*/
}
{/*<li key={item.id}>*/
}
{/*<span className="pink-text"> {item.user}</span>*/
}
{/*<span> {item.content}</span>*/
}
{/*<div className="grey-text note-date">*/
}
{/*{moment(item.time.toDate()).fromNow()}*/
}
{/*</div>*/
}
{/*</li>*/
}
{/*);*/
}
{/*}) }*/
}
{/*</ul>*/
}
{/*</div>*/
}
{/*</div>*/
}
{/*</div>*/
}
{/*</div>*/
}

import React, { Component } from "react";
import moment from 'moment'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'

export class Notifications extends Component {
  render() {
    const { notifications } = this.props;

    const auth = this.props.auth;
    if (!auth.uid) return <Redirect to='/signin'/>;

    return (
      <div className="container">
        <div className="section">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">Notificaitons</span>
              <ul className="notifications">
                { notifications && notifications.map((item) => {
                  return (
                    <li key={item.id}>
                      <span className="pink-text"> {item.user}</span>
                      <span> {item.content}</span>
                      <div className="grey-text note-date">
                        {moment(item.time.toDate()).fromNow()}
                      </div>
                    </li>
                  );
                }) }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'notifications', limit: 50, orderBy: ['time', 'desc']}
  ])
)(Notifications);

// export default Notifications;

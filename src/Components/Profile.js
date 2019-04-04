import React, {Component} from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import messi from '../messi.jpg'
import Table from 'rc-table';
import moment from 'moment';
import chooseColor from '../keyword';

import {
  Container, Image, Divider, Loader, Feed
} from 'semantic-ui-react'

class Profile extends Component {
  LoaderExampleInlineCentered = () => <Loader style={{marginTop: "20px"}} active inline='centered' size='large'/>


  render() {
    console.log(this.props);
    const uid = this.props.userId;
    const users = this.props.users;
    var profile = null;
    console.log('props sent', this.props);

    var columns = [
      {
        title: 'Up Votes', dataIndex: 'upVote', key: 'upVote', width: 100,
      },
      {
        title: 'Down Votes', dataIndex: 'downVote', key: 'downVote', width: 100,
      },
      {
        title: 'Reputation', dataIndex: 'reputation', key: 'reputation', width: 100,
      },
      {
        title: 'Total Post', dataIndex: 'totalPosts', key: 'totalPosts', width: 100,
      },
    ];

    var dataa = [
      {upVote: 100, downVote: 200, reputation: -100, totalPosts: 21, key: '1'},
    ];

    users && users.forEach(user => {
      if (user.id === uid) {
        profile = user;
        dataa = [
          {upVote: user.upVote, downVote: user.downVote, reputation: user.reputation, totalPosts: user.totalPosts, key: '1'},
        ];
      }
    });
    console.log('prof', profile);
    const mycolor = chooseColor(profile ? profile.reputation : 0);

    if (profile) return (


      <Container style={{marginTop: "10px", marginBottom: "10px"}} textAlign='center'>

        <Image circular centered bordered large src={messi}/>
        {console.log(this.props)}
        <h2 style={{color: mycolor}}>{profile && profile.firstName + ' ' + profile.lastName}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, nisi.</p>
        <span style={{}} className=''>
          Joined {moment(profile.creationTime.toDate()).fromNow()}
        </span>


        <Divider/>
        <Table centered columns={columns} data={dataa}/>
        <Divider/>

      </Container>

    );
    else return (this.LoaderExampleInlineCentered());
  }
}

Profile.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.posts;
  const project = projects ? projects[id] : null;

  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    notifications: state.firestore.ordered.notifications,
    userId: id,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  connect(
    mapStateToProps, mapDispatchToProps
  ),

  firestoreConnect([
    {collection: 'users'},
    {collection: 'notifications', limit: 50, orderBy: ['time', 'desc']}
  ])
)(Profile);










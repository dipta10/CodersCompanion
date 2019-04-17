import React, {Component} from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import messi from '../messi.jpg'
import Table from 'rc-table';
import moment from 'moment';
import chooseColor from '../keyword';
import {
  Container, Image, Divider, Loader, Feed, Tab, Button
} from 'semantic-ui-react'
import ProfileActivityFeed from "./Feed/ProfileActivityFeed";
import ProfilePostsFeed from "./Feed/ProfilePostsFeed";

class Profile extends Component {
  LoaderExampleInlineCentered = () => <Loader style={{marginTop: "10em"}} active inline='centered' size='large'/>

  panes = [
    { menuItem: 'Posts', render: () =>
        <Tab.Pane attached={false}>
          {this.props.posts && <ProfilePostsFeed posts={this.props.posts} profileId={this.props.userId} />}
        </Tab.Pane>
    },
    { menuItem: 'Activity', render: () =>
        <Tab.Pane attached={false}>
          {this.props.notifications && <ProfileActivityFeed notifications={this.props.notifications} profileId={this.props.userId}/>}
        </Tab.Pane>
    },
  ]

  TabExampleSecondaryPointing = () => (
    <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} />
  )

  render() {
    const uid = this.props.userId;
    const users = this.props.users;
    var profile = null;
    const { notifications } = this.props;

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
          {
            upVote: user.upVote,
            downVote: user.downVote,
            reputation: user.reputation,
            totalPosts: user.totalPosts,
            key: '1'
          },
        ];
      }
    });
    const mycolor = chooseColor(profile ? profile.reputation : 0);

    if (profile)

      if (profile.id !== null) {
        return (
          <Container style={{marginTop: "5em", marginBottom: "10px"}} textAlign='center'>

            <Image circular centered bordered large src={messi}/>
            <h2 style={{color: mycolor}}>{profile && profile.firstName + ' ' + profile.lastName}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, nisi.</p>
            <span style={{}} className=''>
            Joined {moment(profile.creationTime.toDate()).fromNow()}
            </span>
            <br/>
            <br/>
            <Button.Group>
              <Button positive={true}>Following</Button>
              <Button.Or text='or' />
              <Button disabled>Unfollow</Button>
            </Button.Group>

            <Divider/>
            <Table centered columns={columns} data={dataa}/>
            <Divider/>

            {this.TabExampleSecondaryPointing()}

          </Container>

        );
      } else {
        return (
          <h1>NOT FOUND</h1>
        );
      }
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
    posts: state.firestore.ordered.posts,
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
    {collection: 'notifications', orderBy: ['creationTime', 'desc']},
    {collection: 'posts', orderBy: ['creationTime', 'desc']}
  ])
)(Profile);



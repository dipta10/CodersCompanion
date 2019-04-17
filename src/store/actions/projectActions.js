import {keyword} from "../../keyword";

const createNotificationForProjectCreation = (projectId, userId, profile, firestore) => {
  firestore.collection('notifications').add({
    type: 'post',
    userId: userId,
    postId: projectId,
    creationTime: new Date(),
    userName: profile.firstName + ' ' + profile.lastName,
  }).then((res) => {
    firestore.collection('notifications').doc(res.id).update({
      id: res.id,
    });
  }).catch(err => {
    console.log('error whole creating notification for post creation', err);
  });
}

export const createProject = (project, myProfile) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile; // no 30
    const userid = getState().firebase.auth.uid;
    firestore.collection('posts').add({
      ...project,
      username: profile.firstName + ' ' + profile.lastName,
      userId: userid,
      creationTime: new Date()
    }).then((res) => {


      firestore.collection('posts').doc(res.id).update({
        id: res.id,
      });

      firestore.collection('users').doc(userid).update({
        totalPosts: myProfile.totalPosts + 1,
      });

      createNotificationForProjectCreation(res.id, userid, profile, firestore);

      dispatch({
        type: keyword.createProjectActionType, project: project
      });
    }).catch((err) => {
      dispatch(
        {
          type: keyword.createProjectErrorActionType,
          err: err
        }
      );
    });

  };
};


const createNotificationForCommentCreation = (postId, commentId, userId, postCreatorId, firestore, firstName, lastName, reply) => {

  if (!reply) {
    firestore.collection('notifications').add({
      type: 'comment',
      userId: userId,
      postId: postId,
      creationTime: new Date(),
      userName: firstName + ' ' + lastName,
      postCreatorId: postCreatorId,
      commentId: commentId,
    }).then((res) => {
      firestore.collection('notifications').doc(res.id).update({
        id: res.id,
      });
    }).catch(err => {
      console.log('error whole creating notification for comment creation', err);
    });
  }
};


const createNotificationForCommentReplyCreation = (userId, postId, postCreatorId, parentCommentId, parentCommentCreatorId, firstName, lastName, commentId, firestore) => {

    firestore.collection('notifications').add({
      type: 'commentReply',
      userId: userId,
      postId: postId,
      postCreatorId: postCreatorId,
      parentCommentId: parentCommentId,
      parentCommentCreatorId: parentCommentCreatorId,
      creationTime: new Date(),
      userName: firstName + ' ' + lastName,
      commentId: commentId,
    }).then((res) => {
      firestore.collection('notifications').doc(res.id).update({
        id: res.id,
      });
    }).catch(err => {
      console.log('error whole creating notification for comment creation', err);
    });
};

export const resetNotificationCount = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile; // no 30
    const userid = getState().firebase.auth.uid;
    firestore.collection('users').doc(userid).update({
      notificationCount: 0,
    });
  };
}

const incrementCount = (userId, firestore) => {
  // firestore.collection('users').doc(userId).update({
  //   notificationCount: count+1,
  // });
  firestore.collection('users').doc(userId).get().then(function(doc) {
    if (doc.exists) {
      console.log('document is:', doc.data());
      const count = doc.data().notificationCount;
      firestore.collection('users').doc(userId).update({
        notificationCount: count + 1,
      });
    } else {
      console.log('document not found for that user! :(');
    }
  }).catch(err => {
    console.log('error in incrementCount()', err);
  });
}

export const createComment = (comment, postId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    console.log('comment creation:', comment);
    const firestore = getFirestore();
    const profile = getState().firebase.profile; // no 30
    const userid = getState().firebase.auth.uid;
    console.log('comment creation here', comment);
    firestore.collection('comments').add({
      ...comment,
      username: profile.firstName + ' ' + profile.lastName,
      userId: userid,
      creationTime: new Date(),
      postId: postId
    }).then((res) => {

      firestore.collection('comments').doc(res.id).update({
        id: res.id,
      });

      createNotificationForCommentCreation(postId, res.id, userid, comment.postCreatorId, firestore, profile.firstName, profile.lastName, false);

      if (comment.postCreatorId !== userid) {
        console.log('here i am');
        incrementCount(comment.postCreatorId, firestore);
      }

      dispatch({
        type: keyword.createPostCommentActionType, comment: comment
      });
    }).catch((err) => {
      dispatch(
        {
          type: keyword.createPostCommentErrorType,
          err: err
        }
      );
    });

  };
}

export const createPostCommentReply = (comment, parentChild) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile; // no 30
    const userid = getState().firebase.auth.uid;


    const refid = firestore.collection('comments').doc().id;


    firestore.collection('comments').add({
      ...comment,
      username: profile.firstName + ' ' + profile.lastName,
      userId: userid,
      creationTime: new Date(),
    }).then((res) => {

      firestore.collection('comments').doc(res.id).update({
        id: res.id,
      });

      firestore.collection('comments').doc(comment.parent).update({
        child: parentChild.concat(res.id),
      });


      if (userid == comment.parentCommentCreatorId) return;

      createNotificationForCommentReplyCreation(userid, comment.postId, comment.postCreatorId, comment.parent, comment.parentCommentCreatorId, profile.firstName, profile.lastName, res.id, firestore);

      incrementCount(comment.parentCommentCreatorId, firestore);

      dispatch({
        type: keyword.createPostCommentReplyActionType, comment: comment
      });
    }).catch((err) => {
      dispatch(
        {
          type: keyword.createPostCommentReplyErrorType,
          err: err
        }
      );
    });
  };
}


export const createPostVote = (value, found, id, values, his_profile) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile; // no 30
    const userid = getState().firebase.auth.uid;

    if (found) {
      firestore.collection('postVotes').doc(id).update({
        status: value,
      });

      if (value === 1) {
        firestore.collection('posts').doc(values.postId).update({
          upVote: values.upVote + 1,
          downVote: values.downVote - 1,
        });
        firestore.collection('users').doc(his_profile.id).update({
          upVote: his_profile.upVote + 1,
          downVote: his_profile.downVote - 1,
        });
      } else if (value === -1) {
        firestore.collection('posts').doc(values.postId).update({
          upVote: values.upVote - 1,
          downVote: values.downVote + 1,
        });
        firestore.collection('users').doc(his_profile.id).update({
          upVote: his_profile.upVote - 1,
          downVote: his_profile.downVote + 1,
        });
      }

      firestore.collection('posts').doc(values.postId).update({
        score: values.postScore + 2*value,
      });
      firestore.collection('users').doc(his_profile.id).update({
        reputation: his_profile.reputation + 2*value,
      });

    } else {
      firestore.collection('postVotes').add({
        postId: values.postId,
        userId: values.userId,
        status: value,
      }).then((res) => {

        firestore.collection('postVotes').doc(res.id).update({
          id: res.id,
        });

        if (value === 1) {
          firestore.collection('posts').doc(values.postId).update({
            score: values.postScore + value,
            upVote: values.upVote + 1,
          });
          firestore.collection('users').doc(his_profile.id).update({
            reputation: his_profile.reputation + value,
            upVote: his_profile.upVote + 1,
          });
        } else if (value === -1) {
          firestore.collection('posts').doc(values.postId).update({
            score: values.postScore + value,
            downVote: values.downVote + 1,
          });
          firestore.collection('users').doc(his_profile.id).update({
            reputation: his_profile.reputation + value,
            downVote: his_profile.downVote + 1,
          });
        }

        // dispatch({
        //   type: keyword.createPostCommentActionType, comment: value
        // });

      }).catch((err) => {
        // dispatch(
        //   {
        //     type: keyword.createPostCommentErrorType,
        //     err: err
        //   }
        // );
      });
    };
  }
};



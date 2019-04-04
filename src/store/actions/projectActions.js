import {keyword} from "../../keyword";

export const createProject = (project) => {
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


export const createComment = (comment, postId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile; // no 30
    const userid = getState().firebase.auth.uid;
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


export const createPostVote = (value, found, id, values) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile; // no 30
    const userid = getState().firebase.auth.uid;
    console.log(id);

    if (found) {
      console.log('found', values);
      console.log('found vaule', found);
      firestore.collection('postVotes').doc(id).update({
        status: value,
      });

      if (value === 1) {
        firestore.collection('posts').doc(values.postId).update({
          upVote: values.upVote + 1,
          downVote: values.downVote - 1,
        });
      } else if (value === -1) {
        firestore.collection('posts').doc(values.postId).update({
          upVote: values.upVote - 1,
          downVote: values.downVote + 1,
        });
      }

      firestore.collection('posts').doc(values.postId).update({
        score: values.postScore + 2*value,
      });

    } else {
      console.log('not found and value', values);
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
        } else if (value === -1) {
          firestore.collection('posts').doc(values.postId).update({
            score: values.postScore + value,
            downVote: values.downVote + 1,
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

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
      console.log('response', res);

      firestore.collection('comments').doc(res.id).update({
        id: res.id,
      });

      parentChild.push(res.id);

      firestore.collection('comments').doc(comment.parent).update({
        child: parentChild,
      });

      dispatch({
        type: keyword.createPostCommentReplyActionType, comment: comment
      });
    }).catch((err) => {
      console.log('inside the error catch');
      dispatch(
        {
          type: keyword.createPostCommentReplyErrorType,
          err: err
        }
      );
    });



  };
}

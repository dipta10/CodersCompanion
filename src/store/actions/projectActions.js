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
    }).then(() => {
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
    }).then(() => {
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

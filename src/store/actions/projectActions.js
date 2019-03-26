import {keyword} from "../../keyword";

export const createProject = (project) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.collection('posts').add({
      ...project,
      username: 'tonmoy debnath',
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
}
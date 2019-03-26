import {keyword} from "../../keyword";

export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: keyword.loginSuccess})
    }).catch((err) => {
      dispatch({type: keyword.loginError, err});
    });
  }
};

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

export const signOut = () => {
  console.log('hola');
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch ({type: keyword.signoutSuccess});
    });
  };
};

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
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch ({type: keyword.signoutSuccess});
    });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore})  => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password
    ).then((res) => {
      return firestore.collection('users').doc(res.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initial: newUser.firstName[0] + newUser.lastName[0]
      });
    }).then(() => {
      dispatch({type: keyword.signupSuccess});
    }).catch((err) => {
      dispatch({type: keyword.signupError, error: err})
    });
  }
}
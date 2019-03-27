import {keyword} from "../../keyword";

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case keyword.signoutSuccess:
      console.log('signout success');
      return state;
    case keyword.loginError:
      console.log('login error');
      return {
        ...state,
        authError: 'Login Failed!'
      };
    case keyword.loginSuccess:
      console.log('login success!');
      return {
        ...state,
        authError: null,
      };
    case keyword.signupSuccess:
      console.log('sign up SUCCESS');
      return {
        ...state,
        authError: null,
      };
    case keyword.signupError:
      console.log('sign up error');
      return {
        ...state,
        authError: action.error.message
      };
    default:
      return state;
  }
};

export default authReducer;

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
      console.log(action);
      console.log('login success!');
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
};

export default authReducer;

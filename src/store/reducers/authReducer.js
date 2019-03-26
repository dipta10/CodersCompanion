import {keyword} from "../../keyword";

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {

  switch (action.type) {
    case keyword.loginError:
      console.log('login error');
      return {
        ...state,
        authError: 'Login Failed!'
      };
      break;
    case keyword.loginSuccess:
      console.log('login success!');
      return {
        ...state,
        authError: null,
      };
      break;
    default:
      return state;
  }

  return state;
};

export default authReducer;

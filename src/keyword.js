export const keyword = {
  createProjectActionType: 'CREATE_PROJECT',
  createProjectErrorActionType: 'CREATE_PROJECT_ERROR',
  loginSuccess: 'LOGIN_SUCCESS',
  loginError: 'LOGIN_ERROR',
  signoutSuccess: 'SIGN_OUT_SUCCESS',
  signupSuccess: 'SIGN_UP_SUCCESS',
  signupError: 'SIGNUP_ERROR',
  createPostCommentActionType: 'CREATE_POST_COMMENT',
  createPostCommentErrorType: 'CREATE_POST_COMMENT_ERROR',
  createPostCommentReplyActionType: 'CREATE_POST_COMMENT_REPLY',
  createPostCommentReplyErrorType: 'CREATE_POST_COMMENT_REPLY_ERROR',
};


export const linkurl = {
  post: "/post/:id",
  profile: "/profile/:id",
  signIn: "/signin",
  signUp: "/signup",
  createPost: "/createPost",
  root: "/",
  dashboard: "/",
  notifications: "/notifications",
};

export const newline_firebase = "%20NEW_LINE19382%";

function chooseColor (value) {
  if (value >= 3) return 'red';
  else if (value >= 2) return 'blue';
  else if (value >= 1) return 'green';
  return 'black';
}
export default chooseColor

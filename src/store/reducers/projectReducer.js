import {keyword} from "../../keyword";

const initState = {
  projects: [
    {id: '1', title:'this is the first one!', content: 'hola hola holaaaaaaaaaaaaaa'},
    {id: '2', title:'seconddddddddddddddddd', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa facere harum hic nulla odio officia?'},
    {id: '3', title:'third third third', content: 'leoooooooleoooooooleooooooo   leooooooo '},
  ]
};

const projectReducer = (state = initState, action) => {

  switch (action.type){
    case keyword.createProjectActionType:
      console.log('created project', action.project);
      break;
    case keyword.createProjectErrorActionType:
      console.log('create project error!', action.err);
      return state;
    default:
      return state;
    case keyword.createPostCommentActionType:
      console.log('created comment in POST');
      return state;
    case keyword.createPostCommentErrorType:
      console.log('ERROR creating comment!', action.err);
      return state;
    case keyword.createPostCommentReplyActionType:
      console.log('Created a post comment reply comment!', state);
      return state;
    case keyword.createPostCommentReplyErrorType:
      console.log('Error creating post comment reply comment');
      return state;
  }

  return state;
};

export default projectReducer;

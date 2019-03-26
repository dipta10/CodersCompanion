import {keyword} from "../../keyword";

const initState = {
  projects: [
    {id: '1', title:'this is the first one!', content: 'hola hola holaaaaaaaaaaaaaa'},
    {id: '2', title:'seconddddddddddddddddd', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa facere harum hic nulla odio officia?'},
    {id: '3', title:'third third third', content: 'leoooooooleoooooooleooooooo   leooooooo '},
  ]
};

const projectReducer = (state = initState, action) => {

  switch (action){
    case keyword.createProjectActionType:
      console.log('created project', action.project);
      break;
    default:
      console.log('error in projectReducer.js in the default case');
  }

  return state;
};

export default projectReducer;

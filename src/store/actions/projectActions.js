import {keyword} from "../../keyword";

export const createProject = (project) => {
  return (dispatch, getState) => {
    // make async call to database
    dispatch({
      type: keyword.createProjectActionType, project: project
    });
  };
}
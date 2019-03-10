import React from "react";

const PostDetails = props => {
  const id = props.match.params.id;
  return (
    <div className="cotainer section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Project Title - {id}</span>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam in
            optio nesciunt aliquid suscipit magni beatae qui, delectus
            consectetur voluptatum?
          </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by LoveExtendsCode</div>
          <div>2nd September, 5am</div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

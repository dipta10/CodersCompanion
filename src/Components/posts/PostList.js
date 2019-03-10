import React, { Component } from "react";
import PostSummary from "./PostSummary";

export class PostList extends Component {
  render() {
    return (
      <div>
        <PostSummary />
        <PostSummary />
        <PostSummary />
        <PostSummary />
        <PostSummary />
        <PostSummary />
        <PostSummary />
        <PostSummary />
      </div>
    );
  }
}

export default PostList;

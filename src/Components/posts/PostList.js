import React, {Component} from "react";
import PostSummary from "./PostSummary";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Grid, Card, Placeholder} from 'semantic-ui-react'


export class PostList extends Component {


  PlaceholderExamplePlaceholder = () => (
    <Placeholder style={{marginTop: "40px"}}>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  );

  render() {
    const projects = this.props.projects;

    if (projects) return (
      <Card.Group style={{marginLeft: "20px"}}>
        {projects && projects.map(project => {
          return (
              <PostSummary project={project} key={project.id} name='dipta'/>
          );
        })};
      </Card.Group>
    ); else {
      return this.PlaceholderExamplePlaceholder();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project.projects
  }
};

export default connect(mapStateToProps)(PostList);

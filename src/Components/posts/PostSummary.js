import React, {Component} from "react";
import messi from "../../messi.jpg"
import moment from 'moment'
import {Card, Button, Icon, Label, List, Segment, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import imageHelena from '../../jenny.jpg'


export class PostSummary extends Component {
  render() {
    // const project = this.props.project;

    const {project} = this.props;

    return (

      <Card fluid>
        <Card.Content>
          <Image floated='left' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
          <Card.Header>{project.username}</Card.Header>
          <Card.Meta>{moment(project.creationTime.toDate()).fromNow()}</Card.Meta>
          <Link to={'/post/' + project.id}>
            <Card.Description style={{color: 'black', marginTop: '10px'}}>{project.title}</Card.Description>
          </Link>
        </Card.Content>
        <Card.Content extra>
          <div className='ui one buttons'>
            <div className="">
              <Button as='div' labelPosition='right'>
                <Button basic color='grey'>
                  <Icon name='star'/>
                </Button>
                <Label as='a' basic color='grey' pointing='left'>
                  {project.score}
                </Label>
              </Button>
            </div>
          </div>
          <div style={{marginTop: "10px"}}>
            <Label>DFS</Label>
            <Label>Shortest Path</Label>
            <Label>Loop</Label>
          </div>
        </Card.Content>
      </Card>


    );
  }
}

export default PostSummary;



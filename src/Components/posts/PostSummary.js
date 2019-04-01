import React, {Component} from "react";
import messi from "../../messi.jpg"
import moment from 'moment'
import {Icon, Image, Button, Card, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


export class PostSummary extends Component {
  render() {
    // const project = this.props.project;

    const {project} = this.props;

    return (

      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
          <Card.Header>{project.username}</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Link to={'/post/' + project.id}>
            <Card.Description style={{color: 'black', marginTop: '10px'}}>{project.title}</Card.Description>
          </Link>
        </Card.Content>
        <Card.Content extra>
          <div className='ui one buttons'>
            <div className="">
              <Button as='div' labelPosition='right'>
                <Button basic color='grey'>
                  <Icon name='star'/>Score
                </Button>
                <Label as='a' basic color='grey' pointing='left'>
                  2,048
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


{/*<div className="project-list section col m-6">*/
}
{/*<ul className="collection">*/
}
{/*<li className="collection-item avatar">*/
}
{/*<img src={messi} alt="" className="circle"/>*/
}
{/*/!*<i className="material-icons circle">folder</i>*!/*/
}

{/*<div className="text-darken-4">*/
}
{/*<div className="row">*/
}
{/*<div className="col m6">*/
}
{/*<span className="title">{project.username}</span><br/>*/
}
{/*<span className="grey-text m5">{moment(project.creationTime.toDate().toString()).calendar()}</span>*/
}
{/*</div>*/
}
{/*<div className="right col m6">*/
}
{/*<span to="" className="right"><i className="material-icons">arrow_downward</i></span>*/
}
{/*<span to="" className="right"><i className="material-icons">arrow_upward</i></span>*/
}
{/*</div>*/
}
{/*<div className="">*/
}
{/*<p className="collection-header"><span className="badge">+100</span></p>*/
}
{/*</div>*/
}
{/*</div>*/
}
{/*</div>*/
}


{/*<div className="">*/
}
{/*<Link to={'/post/' + project.id}>*/
}
{/*<div className='card-title' style={{marginTop: '10px', marginBottom: '10px'}}>*/
}
{/*<p className="black-text">{project.title}</p>*/
}
{/*</div>*/
}
{/*</Link>*/
}

{/*</div>*/
}

{/*<div className="">*/
}
{/*<div className="chip">Dijkstra</div>*/
}
{/*<div className="chip">Shortest Path</div>*/
}
{/*<div className="chip">Lorem ipsum dolor sit amet.</div>*/
}
{/*</div>*/
}
{/*</li>*/
}
{/*</ul>*/
}

{/*</div>*/
}

import React, { Component } from "react";
import messi from "../../messi.jpg"
import moment from 'moment'

export class PostSummary extends Component {
  render() {
    // const project = this.props.project;

    const {project} = this.props;
    const divStyle = {
      marginTop: '10px',
    };
    const box = {
      border: '2px solid red'
    };


    return (


      <div className="project-list section" >
        <ul className="collection">
          <li className="collection-item avatar">
            <img src={messi} alt="" className="circle"/>
            {/*<i className="material-icons circle">folder</i>*/}

            <div className="text-darken-4">
              <div className="row">
                <div className="col m6">
                  <span className="title">{project.username}</span><br/>
                  <span className="grey-text m5">{moment(project.creationTime.toDate().toString()).calendar()}</span>
                </div>
                <div className="right col m6">
                  <span to="" className="right"><i className="material-icons">arrow_downward</i></span>
                  <span to="" className="right"><i className="material-icons">arrow_upward</i></span>
                </div>
                <div className="">
                  <p className="collection-header"><span className="badge">+100</span></p>
                </div>
              </div>
            </div>


              <div className="">
                <div className='card-title' style={{marginTop: '10px', marginBottom: '10px'}}>
                  <p className="black-text">{project.title}</p>
                </div>
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                  <p className="card-content black-text">{project.content}
                    <br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolores ea error fugiat laboriosam maxime molestias porro quia veniam, vitae!</p>
                </div>
              </div>

            <div className="">
              <div className="chip">Dijkstra</div>
              <div className="chip">Shortest Path</div>
              <div className="chip">Lorem ipsum dolor sit amet.</div>
            </div>
          </li>
        </ul>

      </div>



    );
  }
}

export default PostSummary;

/*

      <div className="project-list section">
        <div className="card z-depth-0 project-summary">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">{project.title}</span>
            <p className="">Posted by {project.username}</p>
            <p className="grey-text">{project.content}</p>
          </div>
        </div>
      </div>
 */

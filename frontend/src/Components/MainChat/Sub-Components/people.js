import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { getMembers ,removeUser} from '../../../store/actions/chatActions'
import { makeModerator} from '../../../store/actions/auth'
import { connect, ReactReduxContext } from 'react-redux';
import { serverBaseURL } from "../../../services/api"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './people.css'

class People extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getMembers(this.props.currentRoom.title)
  }

  handleClick = e =>{
    this.props.removeUser(this.props.currentRoom.title,e.target.name)
  }
  handleMod = e =>{
  this.props.makeModerator(this.props.currentRoom.title,e.target.name)
  }

  render() {
    
    if(this.props.members)
      return (
        <div className="mainbody">
          <br />
          <br />
          <TableContainer >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Avatar</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Points</TableCell>
                  
                  {this.props.currentRoom.owner===this.props.userid &&
                  <b><TableCell align="right">Moderator</TableCell>
                  <TableCell align="right">Remove</TableCell></b>}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.members.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell component="th" scope="row">{member.username}</TableCell>
                    <TableCell align="right"><img src={serverBaseURL + '/' + member.avatar} className="imgs"/></TableCell>
                    <TableCell align="right">{member.status}</TableCell>
                    <TableCell align="right">{member.score}</TableCell>
                    
                      {this.props.currentRoom.owner===this.props.userid &&
                      <i><TableCell align="right">
                      {!member.moderator &&
                      <button className="btn btn-info" id="mod" name={member.username} onClick={this.handleMod}>Make</button>
                      }
                      {member.moderator &&
                        <p>Moderator</p>
                      }
                      </TableCell> 
                  <TableCell align="right">
                    <button className="btn btn-info" name={member._id} onClick={this.handleClick}>Remove</button></TableCell></i>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      )
    else
      return (
        <div className="mainbody">
          <LoadingOverlay
            active={!this.props.members}
            text="Loading Members..."
            spinner>
          </LoadingOverlay>
        </div>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMembers: (data) => { dispatch(getMembers(data)) },
    removeUser : (title,data) => { dispatch(removeUser(title,data)) },
    makeModerator : (title,data) => { dispatch(makeModerator(title,data)) },
  }
}
const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    members: state.currentUser.members
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(People);
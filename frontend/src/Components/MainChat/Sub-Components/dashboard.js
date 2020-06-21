import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { serverBaseURL } from "../../../services/api"
import Axios from 'axios';
import {updateUser, roomLeave} from "../../../store/actions/auth"
import { removeError } from "../../../store/actions/error";
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: this.props.currentUser.user.username,
      status: this.props.currentUser.user.status, 
      file:"",
      avatar : this.props.currentUser.user.avatar
    }
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
handleSubmit = e => {
  e.preventDefault();
  this.props.updateUser(this.state)
};

fileChange = (e) => {
  this.setState({
      file: e.target.files[0]
  })
}

fileUpload = e =>{
  const fd= new FormData();
  fd.append('avatar',this.state.file,this.state.file.name)
  console.log(`${serverBaseURL}/profilePic`)
    Axios.post(`${serverBaseURL}/profilePic`,fd)
    .then(res=>{
      console.log(res.data.user.avatar)
      this.setState({
        avatar:res.data.user.avatar
      })
      this.props.updateUser(this.state)
    })
}

handleLeave = e =>{
  this.props.roomLeave(this.props.roomName)
  this.props.history.push("/rooms")
}

  render() {
    const { username, status,avatar} = this.state
    console.log(avatar)
    const urlimg = serverBaseURL + "/" + avatar
    console.log(urlimg)
    this.props.history.listen(() => {
      removeError();
    });
    return (
      <div class="container">
        <br />
        <br />
        <div class="row" id="main">
          <div class="col-md-4 well" id="leftPanel">
            <div class="row">
              <div class="col-md-12">
                <div>
                  <img src={urlimg} id="imgprof" alt="Avatar" class="img-circle img-thumbnail"></img>
                  <h2>{username}</h2>
                  <input type="file" name="file" accept="image/*" class="form-control-file" id="exampleFormControlFile1" onChange={this.fileChange}></input>
                  <br/>
                  <button className="btn btn-success btn-block btn-sm" onClick={this.fileUpload}>Upload</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8 well" id="rightPanel">
            <div class="row">
              <div class="col-md-12 ">
                <form >
                  <span><h2>Edit your profile,<span><small>It's always easy</small></span></h2></span>
                  <br/>
                  <br/>
                  {this.props.error.message && (
                <div className="alert alert-danger" role="alert">{this.props.error.message}</div>
              )}
                  <div class="form-group">
                    <input
                      type="text" name="username"
                      id="username" class="form-control input-sm"
                      onChange={this.handleChange}
                      placeholder={username}>
                    </input>
                  </div>
                  <div class="form-group">
                    <input
                       name="password" id="password"
                      type="password" class="form-control input-sm"
                      onChange={this.handleChange}
                      placeholder="Password"
                      required
                      >
                    </input>
                  </div>
                  <div class="input-group mb-4 col-6 mx-auto">
                    <div class="input-group-prepend">
                      <label class="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                    </div>
                    <select class="custom-select" id="inputGroupSelect01"  name="status"onChange={this.handleChange}>
                      <option defaultValue={status}>Choose...</option>
                      <option value="Availabe">Availabe</option>
                      <option value="Busy">Busy</option>
                    </select>
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-md-4"></div>
                    <div class="col-xs-12 col-md-4">
                      <button className="btn btn-success btn-block btn-md" onClick={this.handleSubmit}>Save
                    </button></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div >
        <br />
        <div id="leaveroom">
        <button className="btn btn-primary btn-md" onClick={this.handleLeave}>Leave Room</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    error: state.errors,
    roomName : state.chatReducer.roomName
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      updateUser: (data) => { dispatch(updateUser(data))},
      roomLeave :(data) => {dispatch(roomLeave(data))}
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard))

import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./edit.css"
import { updateChannel, deleteChannel, createChannel, updateRoom, deleteRoom } from '../../../store/actions/auth';
import People from "./people"

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelname: '',
      roomname: this.props.roomName,
      title: '',
      description: undefined,
      newchannel: ''
    }
  }

  //channel update 
  handleChange = e => {
    this.setState({
      channelname: e.target.name,
      title: e.target.value,
    })
  }
  handleChannelUpdate = e => {
    e.preventDefault();
    if (this.state.title)
      this.props.updateChannel(this.state)
  };
  handleChannelDelete = e => {
    e.preventDefault();
    this.props.deleteChannel(this.state.roomname, this.state.channelname)
  }
  handleCreate = e => {
    if (this.state.title)
      this.props.createChannel(this.state)
  }

  handleDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  channelList = () => {
    if (this.props.channels) {
      return this.props.channels.map((channelObject, index) => {
        return <div className="input-group mb-3" id="rch">
          <input type="text" className="form-control rounded" name={channelObject.name}
            placeholder={channelObject.name} onChange={this.handleChange}
          ></input>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text rounded">Description</span>
            </div>
            <textarea className="form-control rounded" placeholder={channelObject.description} onChange={this.handleDescription}></textarea>
          </div>
          <button className="btn btn-info border rounded-pill " type="button" onClick={this.handleChannelUpdate}>Update</button>
          <button className="btn btn-info border rounded-pill " type="button" onClick={this.handleChannelDelete}>Delete</button>
        </div>
      })
    }
  }

  //room data
  handleRoomUpdate = e => {
    e.preventDefault();
    if (this.state.title)
      this.props.updateRoom(this.state)
  }

  handleRoomDelete = e => {
    this.props.deleteRoom(this.state.roomname)
  }

 
  render() {
    const { title, description, owner } = this.props.currentRoom
    if (this.props.userid === owner) {
      return (
        <div className="mainbody">
          <form className="formchannel" >
            <h4>Edit Your Channels</h4>
            {this.channelList()}
            <br />
            <h4>Create new Channel!</h4>
            <div className="input-group mb-3 " id="ch">
              <input type="text" className="form-control rounded" name="title"
                placeholder="Channel name" onChange={this.handleChange}
                required></input>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text rounded">Description</span>
                </div>
                <textarea className="form-control rounded" placeholder="Enter Description here" onChange={this.handleDescription}></textarea>
              </div>
              <button className="btn btn-info border rounded-pill " type="button" onClick={this.handleCreate}>Create</button>
            </div>
          </form>
          <hr />
          <form className="formroom">
            <h4>Edit Your Room</h4>
            <div className="input-group mb-3 " id="rh">
              <input type="text" className="form-control rounded" placeholder={title} onChange={this.handleChange} required></input>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Description</span>
                </div>
                <textarea className="form-control rounded" placeholder={description} onChange={this.handleDescription}></textarea>
              </div>
              <button className="btn btn-info border rounded-pill " type="button" onClick={this.handleRoomUpdate}>Update</button>
              <button className="btn btn-info border rounded-pill " type="button" onClick={this.handleRoomDelete}>Delete</button>
            </div>
          </form>
        </div>
      )
    }
    else {
      return (
        <div className="textdiv">
          <br />
          <h5>Sorry you cannot view the contents , You are not the owner of this room !</h5>
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    roomName: state.chatReducer.roomName,
    channels: state.chatReducer.channels,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateChannel: (data) => { dispatch(updateChannel(data)) },
    deleteChannel: (data) => { dispatch(deleteChannel(data)) },
    createChannel: (data) => { dispatch(createChannel(data)) },
    updateRoom: (data) => { dispatch(updateRoom(data)) },
    deleteRoom: (data) => { dispatch(deleteRoom(data)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
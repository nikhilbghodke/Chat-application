import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from '../Assests/Images/icon-logo-2.png'
import Profile from '../Assests/Images/acc.png'
import './RoomPage.css'
import searchIcon from "../Assests/Images/search-icon.png";
export default function RoomPage(props) {
    return (
<div>
<ul class="nav ">
  <li class="nav-item">
    <a class="nav-link active" href="#">
       <div className="icon-section-auth">
                        <img src={Icon} alt="icon" className="icon" onClick={() => alert("ICON")} />
                    </div></a>
  </li>
  <div className="profile">
  <li class="nav-item dropdown ">
  
    <a class="nav-link dropdown-toggle " data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
    <img src={Profile} alt="icon" />
    </a>
   
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">Separated link</a>
    </div>
  </li>
  </div>
</ul>



        <div className="roompage">
            <div class="verticalLine">
                <div className="form2">
                   
                    <div className="form">
                        <p className="form-title">
                            Discover Public Rooms </p>
                        <p className="form-subtitle">
                            Open to all !!  </p>

                        <nav class="navbar navbar-light bg-light justify-content-between">
                            <a class="navbar-brand mb-0 h1">Choose your Interest :)</a>
                            <form class="form-inline">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                <button class="btn my-2 my-sm-0" type="submit">
                                    <img src={searchIcon} width="45" height="40" alt="search"></img>
                                </button>
                            </form>
                        </nav>

                        <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                            <a href="#" class="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                            <a href="#" class="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                            <a href="#" class="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                            <a href="#" class="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form1">
                <div className="form">
                    <p className="form-title">
                        Welcome !</p>
                    <p className="form-subtitle">
                        Choose a Chat Room to get Started with :) </p>
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                        <a href="#" class="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                        <a href="#" class="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                        <a href="#" class="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                    </div>
                    <button className="form-submit">
                        Let's go!</button>
                    <p className="form-bottom-text">
                        Don't have a room yet?
                <a href="#"> Create One!</a>
                    </p>
                </div>
            </div>

        </div>

        </div>
    );
}
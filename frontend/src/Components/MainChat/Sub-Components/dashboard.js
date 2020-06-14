import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';

 function Dashboard() {
  return (
    <div class="container">
      <br />
      <br />
      <div class="row" id="main">
        <div class="col-md-4 well" id="leftPanel">
          <div class="row">
            <div class="col-md-12">
              <div>
                <img src="" height="200" width="200" alt="Avatar" class="img-circle img-thumbnail"></img>
                <h2>UserName</h2>
                <input type="file" class="form-control-file" id="exampleFormControlFile1"></input>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8 well" id="rightPanel">
          <div class="row">
            <div class="col-md-12 ">
              <form role="form">
                <h2>Edit your profile.<small>It's always easy</small></h2>
                <hr class="colorgraph" />

                <div class="form-group">
                  <input
                    type="text" name="username"
                    id="username" class="form-control input-lg"
                    placeholder="UserName">
                  </input>
                </div>
                <div class="form-group">
                  <input type="password" name="password"
                    id="password" class="form-control input-lg"
                    placeholder="Password" ></input>
                </div>
                <div class="form-group">
                  <input type="password" name="password"
                    id="password" class="form-control input-lg"
                    placeholder=" Confirm Password" ></input>
                </div>
                
                <div class="input-group mb-4 col-6 mx-auto">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Status</label>
                  </div>
                  <select class="custom-select" id="inputGroupSelect01">
                    <option selected>Choose...</option>
                    <option value="Availabe">Availabe</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>

                <hr class="colorgraph" />
                <div class="row">
                  <div class="col-xs-12 col-md-4"></div>
                  <div class="col-xs-12 col-md-4"><a href="#" class="btn btn-success btn-block btn-lg">Save</a></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default withRouter(Dashboard)

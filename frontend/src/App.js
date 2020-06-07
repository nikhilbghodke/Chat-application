import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Welcome from './Components/Welcome'
import NotFound from './Components/404Error'
import AuthenticationPage from './Components/AuthenticationPage'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact strict component={Welcome}/>
          <Route path="/authenticate/:type" exact strict component={AuthenticationPage}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

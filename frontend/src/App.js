import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import { configureStore } from "../src/store";
import { setAuthorizationToken } from "../src/store/actions/auth";
import Welcome from './Components/Welcome'
import NotFound from './Components/404Error'
import AuthenticationPage from './Components/AuthenticationPage'
import RoomPage from './Components/RoomPage';
import MainChatWindow from './Components/MainChat/mainChatWindow';

import './prism.css';
import './App.css';

const store = configureStore();

function App() {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
  }

  // Check if the user data is loaded
  if (store.getState().currentUser.user)

    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Switch>
              <Route path="/" exact strict component={Welcome} />
              <Route path="/authenticate/:type" exact strict component={AuthenticationPage} />
              <Route path="/chat/:roomName" exact strict component={MainChatWindow} />
              <Route path="/rooms" exact strict component={RoomPage} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
}

export default App;

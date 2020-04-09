import React from 'react';
import HeaderBar from "./components/Header";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import configureStore from "./store";
import asyncComponent from "./components/AsyncComponent";
import { Container } from 'semantic-ui-react'

const AsyncHomePage = asyncComponent(() => import("./pages/HomePage"));
const AsyncFungiPage = asyncComponent(() => import("./pages/FungiPage"));

const App = () => {
  return (
    <Provider store={configureStore()}>
      <BrowserRouter>
        <Container className="appContainer" fluid>
          <HeaderBar/>
          <Switch>
            <Route exact path='/' component={AsyncHomePage}/>
            <Route exact path='/fungi/:fungi/' component={AsyncFungiPage}/>
          </Switch>
        </Container>
      </BrowserRouter>
    </Provider>
  );
};


export default App;
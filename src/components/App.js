import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { Login, WorkerManage, Home, Another} from '../pages';

class App extends Component {
  render() {
    return (
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/workerManage" component={WorkerManage}/>
      <Route exact path="/another" component={Another}/>
    </div>
    );
  }
}

export default App;

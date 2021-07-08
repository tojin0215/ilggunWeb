import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { Login, Home, WorkerManage, WorkerManageContract, WorkerManageStaff, TaskManage, PayManage, PayManageExtra, PayDocument, PayDocumentDetails } from '../pages';

import '../styles/basic/layout.css';
import '../styles/basic/block.css';
import '../styles/basic/basic.css';
import '../styles/basic/sideNavigation.css';

class App extends Component {
  render() {
    return (
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/workerManage" component={WorkerManage}/>
      <Route exact path='/workerManage/staff' component={WorkerManageStaff}/>
      <Route exact path='/workerManage/contract' component={WorkerManageContract}/>
      <Route exact path="/taskManage" component={TaskManage}/>
      <Route exact path='/payManage' component={PayManage} />
      <Route exact path='/payManage/extra' component={PayManageExtra} />
      <Route exact path='/payDocument' component={PayDocument} />
      <Route exact path='/payDocument/details' component={PayDocumentDetails}/>
    </div>
    );
  }
}

export default App;

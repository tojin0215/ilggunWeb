import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { Login, Home, WorkerManage, WorkerManageContract, WorkerManageStaff, TaskManage, PayManage, PayManageExtra, PayDocument, PayDocumentDetails, Message, MessageSended, SendMail, Download, SelectBusiness } from '../pages';

import '../styles/basic/basic.css';
import '../styles/basic/block.css';
// import '../styles/basic/button.css';
import '../styles/basic/input.css';
import '../styles/basic/layout.css';
import '../styles/basic/sideNavigation.css';
import '../styles/basic/text.css';

class App extends Component {
  render() {
    return (
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/selectBusiness" component={SelectBusiness}/>
      <Route exact path="/workerManage" component={WorkerManage}/>
      <Route exact path='/workerManage/staff' component={WorkerManageStaff}/>
      <Route exact path='/workerManage/contract' component={WorkerManageContract}/>
      <Route exact path="/taskManage" component={TaskManage}/>
      <Route exact path='/payManage' component={PayManage} />
      <Route exact path='/payManage/extra' component={PayManageExtra} />
      <Route exact path='/payDocument' component={PayDocument} />
      <Route exact path='/payDocument/details' component={PayDocumentDetails}/>
      <Route exact path='/message' component={Message} />
      <Route exact path='/message/sended' component={MessageSended} />
      <Route exact path='/message/sendMail' component={SendMail} />
      <Route exact path='/download' component={Download} />
    </div>
    );
  }
}

export default App;
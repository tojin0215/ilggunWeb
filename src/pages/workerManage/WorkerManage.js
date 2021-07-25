import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table from '../../components/Navigation/TableWorker';
import data from '../../components/Navigation/data';
import {postSelectWorker} from "../../action/api"

import '../../styles/home/home.css';


class WorkerManage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        worker: []
      }
      this.curFetch()
  }

  curFetch = () => {
    postSelectWorker(this.props.userinfo.business_name)
    .then(result => result.json())
    .then(result => {
      if (result) this.setState({worker: result})
      else this.setState({worker: []})
    })
    .catch(error => console.error("postSelectWorker",error))
  }

  goLogin = () => {
    this.props.history.push('/');
  };
  
  render() {
    const { userinfo } = this.props;

    const clickhandler = name => console.log("delete", name);

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='sectionShadow'>
            <Table data={this.state.worker} click={clickhandler}/>
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const WorkerManageStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.status
  };
};

export default connect(WorkerManageStateToProps, undefined)(WorkerManage);

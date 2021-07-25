import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table from '../../components/Navigation/TableWorker';
import data from '../../components/Navigation/data';

import '../../styles/home/home.css';



class WorkerManage extends Component {
  constructor(props) {
      super(props);
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
            <Table data={data} click={clickhandler}/>
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

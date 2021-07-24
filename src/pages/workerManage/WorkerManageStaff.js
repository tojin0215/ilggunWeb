import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table2 from '../../components/Navigation/Table2';
import data from '../../components/Navigation/data';


import '../../styles/home/home.css';



class WorkerManageStaff extends Component {
  goLogin = () => {
    this.props.history.push('/');
  };

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);

    const clickhandler = name => console.log("delete", name);

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='sectionShadow'>
            <Table2 data={data} click={clickhandler}/>
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const WorkerManageStaffStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(WorkerManageStaffStateToProps, undefined)(WorkerManageStaff);

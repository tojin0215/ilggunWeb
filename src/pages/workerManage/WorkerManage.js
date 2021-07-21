import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table from '../../components/Navigation/Table';
import data from '../../components/Navigation/data';

import '../../styles/home/home.css';



class WorkerManage extends Component {
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
          <article style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
            근로계약서-직원 목록 아티클입니다.
            {/* <form style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
              <input placeholder="검색 창입니다." />
              <button>검색 버튼입니다.</button>
            </form>
            <div style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
              직원 목록 표시 공간입니다. 정규직/비정규직, 근로계약서이 표시됩니다.<br/>
              <span> 사원이름 </span>
              <span> 정규직/비정규직 </span>
              <span> 근로계약서작성여부 </span>
              <button>근로계약서</button>
            </div> */}
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
    //status: state.authentication.status
  };
};

export default connect(WorkerManageStateToProps, undefined)(WorkerManage);

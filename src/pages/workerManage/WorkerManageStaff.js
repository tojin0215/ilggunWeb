import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import '../../styles/home/home.css';

class WorkerManageStaff extends Component {
  goLogin = () => {
    this.props.history.push('/');
  };

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
            직원관리/직원관리의 직원 목록 아티클입니다.
            <form style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
              <input placeholder="검색 창입니다." />
              <button>검색 버튼입니다.</button>
            </form>
            <div style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
              직원 목록 표시 공간입니다. No, 이름, QR, 입사일, 직책(업무), 퇴직처리가 표시됩니다.<br/>
              QR 버튼을 클릭할 경우 해당 직원의 QR 이미지가 표시되는 모달창이 띄워집니다.<br/>
              모달창에는 이름, QR 코드(페이지 제목), 다운로드, 프린트, 닫기 버튼이 표시됩니다.(시안 참고)<br/> 
              <span style={{ border:'1px solid #000', padding:'10px' }}> No. </span>
              <span style={{ border:'1px solid #000', padding:'10px' }}> 사원이름 </span>
              <button style={{ border:'1px solid #000', padding:'10px' }}> QR </button>
              <span style={{ border:'1px solid #000', padding:'10px' }}> 입사일 </span>
              <span style={{ border:'1px solid #000', padding:'10px' }}> 직책(업무) </span>
              <button style={{ border:'1px solid #000', padding:'10px' }}> 퇴직처리 </button>
            </div>
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

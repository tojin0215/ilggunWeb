import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import '../../styles/home/home.css';

class TaskManage extends Component {
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
          <p>
          업무관리 페이지 컨테이너 입니다.
          </p>
          <div style={{ display:'flex' }}>
            <div
                style={{
                width: '500px',
                height: '300px',
                border: '1px solid #000',
                padding: '10px',
                margin: '10px',
                }}
            >
                캘린더 선택 공간입니다.
                <br />
                날짜 선택 시 해당 날짜의 정보를 전달합니다.
            </div>
            <article
            style={{
                width: '500px',
                height: '300px',
                border: '1px solid #000',
                padding: '10px',
                margin: '10px',
            }}
            >
                <h4>오늘의 휴가자</h4>
                <div>
                    해당 날짜 휴가자의 이름, 휴가기간이 표시됩니다.
                </div>
            </article>
          </div>
          <div
            style={{
                width:'100%',
              border: '1px solid #000',
              padding: '10px',
              margin: '10px',
            }}
          >
            <h4>오늘의 근무자</h4>
            <span> 사원이름 </span>
            <span> 출근시간 </span>
            <span> 퇴근시간 </span>
            <span> 휴가 </span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const TaskManageStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(TaskManageStateToProps, undefined)(TaskManage);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import '../../styles/home/home.css';

class PayDocument extends Component {
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
          <article
            style={{
              border: '1px solid #000',
              padding: '10px',
              margin: '10px',
            }}
          >
            급여대장 페이지입니다.
            <span> 00월 급여대장 </span>
            <button> 엑셀로 다운받기 </button>
            <button> 프린트 </button>
            <input placeholder='월 선택 캘린더'></input>
            <button> 조회 </button>
            <div
              style={{
                border: '1px solid #000',
                padding: '10px',
                margin: '10px',
              }}
            >
              급여대장 표시 공간입니다. No, 이름, 직책, 통상시급, 월근무시간, 월급여, 공제, 실지급액이 표시됩니다.
              <br /><br />
              <span style={{ border: '1px solid #000', padding: '10px' }}>
                No.
              </span>
              <span style={{ border: '1px solid #000', padding: '10px' }}>
                이름
              </span>
              <span style={{ border: '1px solid #000', padding: '10px' }}>
                직책
              </span>
              <span style={{ border: '1px solid #000', padding: '10px' }}>
                통상시급
              </span>
              <span style={{ border: '1px solid #000', padding: '10px' }}>
                월근무시간
              </span>
              <span style={{ border: '1px solid #000', padding: '10px' }}>
                월급여
              </span>
              <span style={{ border: '1px solid #000', padding: '10px' }}>
                공제
              </span>
              <span style={{ border: '1px solid #000', padding: '10px' }}>
                실지급액
              </span>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayDocumentStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(PayDocumentStateToProps, undefined)(PayDocument);

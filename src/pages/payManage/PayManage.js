import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Calendar from 'react-calendar';

import TableVacation from '../../components/Navigation/TableVacation';
import data from '../../components/Navigation/data';
import '../../styles/home/home.css';

class PayManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date()
    }
  }
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
          <p>급여관리/무급/유급휴가 페이지입니다.</p>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '500px',
                height: '100px',
                border: '1px solid #000',
                padding: '10px',
                margin: '10px',
              }}
            >
              <h4>직원 선택</h4>
              <input ></input>
              <button >검색</button>
              {/* 검색 창이 들어옵니다. */}
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
              <h4>휴가자</h4>
              <div
                style={{
                  width: '450px',
                  height: '50px',
                  border: '1px solid #000',
                  padding: '10px',
                  margin: '10px',
                }}
              >
                
              <Calendar
        onChange={this.onChange}
        value={this.state.value}
      />
                {/* 날짜를 선택할 수 있는 캘린더 인풋 창입니다. 년/월/일 단위까지 선택할 수 있습니다. */}
              </div>
              <div
                style={{
                  width: '450px',
                  height: '170px',
                  border: '1px solid #000',
                  padding: '10px',
                  margin: '10px',
                }}
              >
                <TableVacation data={data} />
                선택한 날짜의 휴가자 목록이 표시됩니다.
              </div>
            </article>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              border: '1px solid #000',
              padding: '10px',
              margin: '10px',
              justifyContent: 'space-around',
            }}
          >
            <div>
              휴가기간 선택
              <br />
              
              <Calendar
        onChange={this.onChange}
        value={this.state.value}
      />
              기간을 선택할 수 있는 캘린더 인풋창입니다.
            </div>
            <div>
              유급 휴가<input type="checkbox" />
              <br />
              무급 휴가<input type="checkbox" />
              {/* <br />
              유급 휴가와 무급 휴가를 체크합니다. */}
            </div>
            <div>
              사유 입력: <input ></input>
              <br />
              사유를 기재할 수 있는 인풋창입니다.
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayManageStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(PayManageStateToProps, undefined)(PayManage);

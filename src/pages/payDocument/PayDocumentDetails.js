import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Calendar from 'react-calendar';

import PayDocumentPDF from './PayDocumentPDF';

import '../../styles/home/home.css';

class PayDocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
      checkEtc: false
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
          <h4 className='text-h5'>급여서류/급여명세서</h4>
          <article className='flex todayleave sectionShadow'>
            <div>
              <h4>직원 선택</h4>
              <input ></input>
              <button >검색</button>
            </div>
            <Calendar
              onChange={this.onChange}
              value={this.state.value}
            />
          </article>
          <div className='sectionShadow'>
					급여명세서가 표시되는 공간입니다.
					이름,근무형태,급여신청기간이 표시되며, 다운로드, 프린트, 전체직원 버튼이 있습니다. 전체직원을 클릭하면 전체직원의 엑셀이 다운로드 합니다. 
            <div>
              <span>
								이름:<strong>A사원</strong>
							</span>
							<span>
								근무형태:<strong>정규직</strong>
							</span>
							<span>
								급여신청기간:<strong>매월 0일~0일</strong>
							</span>
							<button>다운로드</button>
							<button>프린트</button>
							<button>전체직원</button>
            </div>
            <div>
              {/* 급여명세서 표시하는 공간입니다. */}
              <PayDocumentPDF forDownload={false} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayDocumentDetailsStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(PayDocumentDetailsStateToProps, undefined)(PayDocumentDetails);

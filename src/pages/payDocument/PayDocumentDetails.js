import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import '../../styles/home/home.css';

class PayDocumentDetails extends Component {
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
          <p>급여서류/급여명세서 페이지입니다.</p>
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
              직원 검색 창이 들어옵니다. 해당 직원의 급여명세서를 볼 수 있습니다.
            </div>
            <article
              style={{
                width: '500px',
                height: '100px',
                border: '1px solid #000',
                padding: '10px',
                margin: '10px',
              }}
            >
                날짜를 선택할 수 있는 캘린더 인풋 창입니다. 년/월 단위까지 선택할 수 있습니다.
            </article>
						<button>조회</button>
          </div>
          <div
            style={{
              width: '100%',
              border: '1px solid #000',
              padding: '10px',
              margin: '10px'
            }}
          >
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
              급여명세서 표시하는 공간입니다.
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Calendar from 'react-calendar';
import TableExtraPay from '../../components/Navigation/TableExtraPay';
import data from '../../components/Navigation/data';

import '../../styles/home/home.css';

class PayManageExtra extends Component {
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
          <p>급여관리/과세/비과세 추가수당 페이지입니다.</p>
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
              {/* 직원 검색 창이 들어옵니다. 해당 직원을 선택하고 아래 입력폼을 통해 추가수당 정보를 추가할 수 있습니다. */}
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
              <h4>추가수당 지급자</h4>
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
                {/* 날짜를 선택할 수 있는 캘린더 인풋 창입니다. 년/월 단위까지 선택할 수 있습니다. */}
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
                <TableExtraPay data={data} />
                {/* 선택한 월의 추가수당 지급자들이 표시됩니다. */}
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
              <p>
								<strong>지급월</strong>
                {/* 지급 월을 선택할 수 있는 캘린더 인풋입니다. */}
                
              <Calendar
        onChange={this.onChange}
        value={this.state.value}
      />
							</p>
							<p><strong>과세</strong> 과세 종류를 선택할 수 있는 체크박스: 직책, 상여, 연장근무, 기타 항목이 있습니다. 기타에는 텍스트 인풋창입니다.
              직책<input type="checkbox" />
              <br />
              상여<input type="checkbox" />
              <br />
              연장근무<input type="checkbox" />
              <br />
              기타<input type="checkbox" checked={this.state.checkEtc} onChange={() => this.setState({checkEtc: !this.state.checkEtc})} />
              {(this.state.checkEtc) ? <input></input> : null}
							</p>
							<p>
								<strong>비과세</strong> 비과세 종류를 선택할 수 있는 체크박스: 식대, 자가유류비, 육아수당 항목이 있습니다.
                식대<input type="checkbox" />
              <br />
              자가유류비<input type="checkbox" />
              <br />
              육아수당<input type="checkbox" />
              <br />
							</p>
            </div>
            <div>
              <h4>금액</h4>
              <input type="number"></input>
              {/* 금액을 입력할 수 있는 텍스트 인풋창입니다. */}
            </div>
          </div>
					<button>저장하기</button>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayManageExtraStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(PayManageExtraStateToProps, undefined)(PayManageExtra);

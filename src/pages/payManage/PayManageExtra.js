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
          <article className='flex todayleave'>
            <Calendar
              onChange={this.onChange}
              value={this.state.value}
              className='sectionShadow'
            />
            <div className='sectionShadow'>
              <TableExtraPay data={data} />
            </div>
          </article>
          <div>
            <div>
              <strong>지급월</strong>
              <Calendar
                onChange={this.onChange}
                value={this.state.value}
              />
							<p><strong>과세</strong>
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

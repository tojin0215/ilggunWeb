import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Calendar from 'react-calendar';
import Picker from 'react-month-picker'

import TableWorkerFilter from '../../components/Navigation/TableWorkerFilter';

import PayDocumentPDF from './PayDocumentPDF';
import {getUserInfoBusinessId,} from '../../util/cookie';
import {selectWorkerByType} from '../../action/api';

import '../../styles/home/home.css';

const pickerLang = {
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  from: '부터', to: '까지',
}

class PayDocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
      checkEtc: false,
      yearMonth: {year: new Date().getFullYear(), month: new Date().getMonth()},
      isVisibleMonthSelector: false,
      workers: [],
      selectedWorker: null,
    }

    this.curFetchWorker();
  }

  curFetchWorker = () => {
    const business_id = (getUserInfoBusinessId())? getUserInfoBusinessId() : this.props.userinfo.business_name;

    selectWorkerByType(business_id, 2)
    .then(result => result.json())
    .then(result => {
      this.setState({ workers: result })
      })
      .catch(error => {
        console.error("curFetchWorker",error);
      })
  }

  goLogin = () => {
    this.props.history.push('/');
  };

  handleAMonthChange = (year, month) => {
    this.setState({yearMonth: {year, month}});
    this.setState({isVisibleMonthSelector: false});
  }
  handleAMonthDissmis = (e) => {
    this.setState({isVisibleMonthSelector: false});
  }

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);
    this.pickAMonth = React.createRef()
    // this.pickAMonth.current.show()

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <h4 className='text-h5'>급여서류/급여명세서</h4>
          <article className='flex todayleave sectionShadow'>
            {(this.state.selectedWorker)? (
              <div>
                <span>{this.state.selectedWorker.workername2}</span>
              </div>
            ):(
              <div>
              {/* <h4>직원 선택</h4>
              <input ></input>
              <button >검색</button> */}
              <TableWorkerFilter data={this.state.workers} handleSelectWorker={r => this.setState({selectedWorker: r})}/>
            </div>
            )}
            {/* <div>
              <TableWorkerFilter data={this.state.workers} handleSelectWorker={r => this.setState({selectedWorker: r})}/>
            </div> */}
            {/* <Calendar
              onChange={this.onChange}
              value={this.state.value}
            /> */}
            <div>
            <Picker
                className='button-solid_white-0 py-2 ps-4 pe-0 my-0 mx-1 d-flex'
                ref={this.pickAMonth}
                value={this.state.yearMonth}
                lang={pickerLang.months}
                show={this.state.isVisibleMonthSelector}
                onChange={this.handleAMonthChange}
                onDismiss={this.handleAMonthDissmis}
            >
              <div onClick={() => this.pickAMonth.current.show()}> {this.state.yearMonth.year}년 {this.state.yearMonth.month}월 </div></Picker>
            </div>
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Calendar from 'react-calendar';
import Picker from 'react-month-picker'

import TableExtraPay from '../../components/Navigation/TableExtraPay';
import TableWorkerFilter from '../../components/Navigation/TableWorkerFilter';

import { otherAllowanceAll, selectWorkerByType, selectContractformAll, insertAllowance } from "../../action/api"


import '../../styles/home/home.css';

const pickerLang = {
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  from: '부터', to: '까지',
}

class PayManageExtra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),

      yearMonth: { year: new Date().getFullYear(), month: new Date().getMonth() },
      year: "2020",
      month: "1",
      isVisibleMonthSelector: false,

      checkboxGroup: {
        position: true,
        bonus: false,
        over: false,
        etc: false,
        bob: false,
        oil: false,
        agi: false
      },

      AA: [],
      //Additional Allowance
      worker: [],
      addAllowance: []
    }
    this.selectAlloWance()
    this.workerFilter()

  }
  selectAlloWance = () => {

    selectContractformAll(this.props.userinfo.business_name)
      .then((result) => result.json())
      .then((selectContractformAllResult) => {

        otherAllowanceAll(this.props.userinfo.business_name, this.state.yearMonth.year,
          this.state.yearMonth.month)
          .then((result) => result.json())
          .then((otherAllowanceAllResult) => {
            this.setState({
              AA: selectContractformAllResult.map((item, index) => {
                const otherAllowance = otherAllowanceAllResult.find(
                  (selectContractformAllResult) => selectContractformAllResult.id == item.id
                );
                if (otherAllowance) item['otherAllowance'] = otherAllowance;
                else item['otherAllowance'] = { t_bonus: 0, t_extension: 0, t_position: 0, t_etc: 0, f_carMaintenanceFee: 0, f_childcareAllowance: 0, f_meals: 0 };

                item['worker_id'] = item.id;
                item['id'] = index;
                console.log("item");
                console.log(item);

                return item;
              })
            })
          })
      })
  }


  workerFilter = () => {
    selectWorkerByType(this.props.userinfo.business_name, 2)
      .then(result => result.json())
      .then(result => {
        this.setState({ worker: result })
      })
    return
  }


  handleAMonthChange = (year, month) => {
    this.setState({ yearMonth: { year, month } }, () => this.selectAlloWance());
    this.setState({ isVisibleMonthSelector: false });
  }
  handleAMonthDissmis = (e) => {
    this.setState({ isVisibleMonthSelector: false });
  }
  handleClickMonthBox = (e) => {
    this.setState({ isVisibleMonthSelector: true });
    console.debug(this.state.isVisibleMonthSelector);
  }

  goLogin = () => {
    this.props.history.push('/');
  };


  handleOnClick = (e) => {

    insertAllowance(this.props.userinfo.business_name, "Qq", this.state.month, this.state.month,
      this.state.allowance)
      .then((result) => result.json())
      .then((result) => {
        alert("추가 수당 저장 완료.");
        this.setState({ addAllowance: result })
      })
    this.selectAlloWance()
  }
  handleCheckbox = (e) => {
    let obj = {
      position: false,
      bonus: false,
      over: false,
      etc: false,
      bob: false,
      oil: false,
      agi: false
    }
    obj[e.target.id] = e.target.checked
    // console.log(obj);
    this.setState({
      checkboxGroup: obj
    })
  }
  handleInsert = (e) => {
    this.setState({
      allowance: e.target.value
    })
  }
  handleInsertMonth = (e) => {
    this.setState({
      month: e.target.value
    })
  }


  handleSelectWorker = (workername2) => {
    const selectWokrerState = { selectedWorker: workername2 };
    this.setState(selectWokrerState)
  }


  render() {
    const { userinfo } = this.props;

    this.pickAMonth = React.createRef()
    // this.pickAMonth.current.show()
    this.pickAMonth2 = React.createRef()

    return (
      <div className="wrap paymanageextra">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='flex todayleave'>
            <h4 className='w-100 text-h4'>
              💰 추가수당 지급 확인
            </h4>

            <Picker
              ref={this.pickAMonth}
              value={this.state.yearMonth}
              lang={pickerLang.months}
              // show={this.state.isVisibleMonthSelector}
              onChange={this.handleAMonthChange}
              onDismiss={this.handleAMonthDissmis}
            >
              <div
                className='small-shadow text-bold text-h5 text-center cursor-pointer'
                onClick={() => this.pickAMonth.current.show()}>
                {this.state.yearMonth.year}년 {this.state.yearMonth.month}월
              </div>
              <p className='text-center'>확인하고 싶은 해당 월을 선택하세요</p>
            </Picker>

            <div className='sectionShadow'>
              <TableExtraPay data={this.state.AA} />
              {/* this.state.id */}
            </div>
          </article>
          <h4 className='text-h4 mt-5'>🙋‍♀️ 추가수당 등록하기</h4>
          <article className='sectionShadow flex flex-wrap align-items-start'>
            <div className='col-4 w-50 small-shadow m-0 align-self-center'>
              {(!this.state.selectedWorker) ? <TableWorkerFilter data={this.state.worker} handleSelectWorker={this.handleSelectWorker} />
                :
                (
                  <p className='text-center'>
                    <span className='text-h5 text-bold my-3 px-2'>{this.state.selectedWorker.workername2}</span>님의 추가 수당을 저장하세요.
                  </p>
                )}
            </div>
            <div className='flex-wrap col-4 w-50 px-5'>
              <div className='w-100'>
                <h5 className='text-bold text-h5'>🗓 추가수당 지급 월</h5>
                <input className='small-shadow' type="month" id="month" value={this.state.month} onChange={this.handleInsertMonth} />
                <p className='px-3'>추가수당 지급을 확인할 해당 월을 선택해주세요.</p>
              </div>
              <div className='mt-3'>
                <p className='p-2 text-h5 text-bold w-100'>과세/비과세 선택</p>
                <div className='d-flex'>
                  <div>
                    <label>
                      <span className='text-h5 px-4'>과세</span>
                    </label>
                    <div className='p-1 w-100'>
                      <input type="checkbox" id="position" name="checkboxGroup"
                        checked={this.state.checkboxGroup['position']} onChange={this.handleCheckbox} />
                      직책
                      <br />
                      <input type="checkbox" id="bonus" name="checkboxGroup"
                        checked={this.state.checkboxGroup['bonus']} onChange={this.handleCheckbox} />
                      상여
                      <br />
                      <input type="checkbox" id="over" name="checkboxGroup"
                        checked={this.state.checkboxGroup['over']} onChange={this.handleCheckbox} />
                      연장근무
                      <br />
                      <input type="checkbox" id="etc" name="checkboxGroup"
                        checked={this.state.checkboxGroup['etc']} onChange={this.handleCheckbox} />
                      기타
                      {/* {(this.state.etc) ? <input/> : null}    */}
                    </div>
                  </div>
                  <div className='d-flex align-items-start flex-wrap pb-5'>
                    <p>
                      <label>
                        <span className='text-h5 px-4'>비과세</span>
                      </label>
                    </p>
                    <div className='p-1 w-100'>
                      <input type="checkbox" id="bob" name="checkboxGroup"
                        checked={this.state.checkboxGroup['bob']} onChange={this.handleCheckbox} />
                      식대
                      <br />
                      <input type="checkbox" id="oil" name="checkboxGroup"
                        checked={this.state.checkboxGroup['oil']} onChange={this.handleCheckbox} />
                      자가유류비
                      <br />
                      <input type="checkbox" id="agi" name="checkboxGroup"
                        checked={this.state.checkboxGroup['agi']} onChange={this.handleCheckbox} />
                      육아수당
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-100'>
                <h4 className='p-2 text-h5 text-bold w-100'>금액</h4>
                <input type="number" placeholder="금액을 입력하세요."
                  name="taxation" id="allowance" value={this.state.allowance} onChange={this.handleInsert}
                />
              </div>
            </div>
            <button className='my-0 mx-auto button-solid mt-3 py-3 px-5 font-bold' onClick={this.handleOnClick}>저장하기</button>
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayManageExtraStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.status
  };
};

export default connect(PayManageExtraStateToProps, undefined)(PayManageExtra);

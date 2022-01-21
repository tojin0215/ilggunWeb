import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Calendar from 'react-calendar';
import Picker from 'react-month-picker';

import TableExtraPay from '../../components/Navigation/TableExtraPay';
import TableWorkerFilter from '../../components/Navigation/TableWorkerFilter';

import {
  otherAllowanceAll,
  selectWorkerByType,
  selectContractformAll,
  insertAllowance,
} from '../../action/api';

import '../../styles/home/home.css';
import { PC, Mobile } from '../../components/MediaQuery';

const pickerLang = {
  months: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  from: '부터',
  to: '까지',
};

class PayManageExtra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),

      yearMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
      year: '2020',
      month: '1',
      isVisibleMonthSelector: false,

      selectedWorker: null,

      t_position: ' ',
      t_bonus: ' ',
      t_extension: ' ',
      t_etc: ' ',
      f_carMaintenanceFee: ' ',
      f_childcareAllowance: ' ',
      f_meals: ' ',

      checkboxGroup: {
        position: true,
        bonus: false,
        over: false,
        etc: false,
        bob: false,
        oil: false,
        agi: false,
      },

      AA: [],
      //Additional Allowance
      worker: [],
      addAllowance: [],
    };
    this.selectAlloWance();
    this.workerFilter();
  }
  selectAlloWance = () => {
    selectContractformAll(this.props.userinfo.business_name)
      .then((result) => result.json())
      .then((selectContractformAllResult) => {
        otherAllowanceAll(
          this.props.userinfo.business_name,
          this.state.yearMonth.year,
          this.state.yearMonth.month,
        )
          .then((result) => result.json())
          .then((otherAllowanceAllResult) => {
            this.setState({
              AA: selectContractformAllResult.map((item, index) => {
                const otherAllowance = otherAllowanceAllResult.find(
                  (selectContractformAllResult) =>
                    selectContractformAllResult.id == item.id,
                );
                if (otherAllowance) item['otherAllowance'] = otherAllowance;
                else
                  item['otherAllowance'] = {
                    t_bonus: 0,
                    t_extension: 0,
                    t_position: 0,
                    t_etc: 0,
                    f_carMaintenanceFee: 0,
                    f_childcareAllowance: 0,
                    f_meals: 0,
                  };

                item['worker_id'] = item.id;
                item['id'] = index;
                // console.log('item');
                // console.log(item);

                return item;
              }),
            });
          });
      });
  };

  workerFilter = () => {
    selectWorkerByType(this.props.userinfo.business_name, 2)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ worker: result });
      });
    return;
  };

  handleAMonthChange = (year, month) => {
    this.setState({ yearMonth: { year, month } }, () => this.selectAlloWance());
    this.setState({ isVisibleMonthSelector: false });
  };
  handleAMonthDissmis = (e) => {
    this.setState({ isVisibleMonthSelector: false });
  };
  handleClickMonthBox = (e) => {
    this.pickAMonth.current.show()
    this.setState({ isVisibleMonthSelector: true });
  };

  handleClickMonthBox2 = (e) => {
    this.pickAMonth2.current.show()
    this.setState({ isVisibleMonthSelector: true });
  };

  goLogin = () => {
    this.props.history.push('/');
  };

  handleOnClick = (e) => {
    if (this.state.selectedWorker === null) {
      alert('근로자를 선택해주세요.');
    }

    if (
      (this.state.checkboxGroup['position'] == true &&
        this.state.t_position.trim() === '') ||
      (this.state.checkboxGroup['bonus'] == true &&
        this.state.t_bonus.trim() === '') ||
      (this.state.checkboxGroup['over'] == true &&
        this.state.t_extension.trim() === '') ||
      (this.state.checkboxGroup['etc'] == true &&
        this.state.t_etc.trim() === '') ||
      (this.state.checkboxGroup['bob'] == true &&
        this.state.f_meals.trim() === '') ||
      (this.state.checkboxGroup['oil'] == true &&
        this.state.f_carMaintenanceFee.trim() === '') ||
      (this.state.checkboxGroup['agi'] == true &&
        this.state.f_childcareAllowance.trim() === '')
    ) {
      alert('금액을 입력해주세요.');
    } else {
      insertAllowance(
        this.props.userinfo.business_name,
        this.state.selectedWorker.workername,
        this.state.yearMonth.year,
        this.state.yearMonth.month,
        this.state.checkboxGroup['bonus'] == false ? 0 : this.state.t_bonus,
        this.state.checkboxGroup['over'] == false ? 0 : this.state.t_extension,
        this.state.checkboxGroup['position'] == false
          ? 0
          : this.state.t_position,
        this.state.checkboxGroup['etc'] == false ? 0 : this.state.t_etc,
        this.state.checkboxGroup['oil'] == false
          ? 0
          : this.state.f_carMaintenanceFee,
        this.state.checkboxGroup['agi'] == false
          ? 0
          : this.state.f_childcareAllowance,
        this.state.checkboxGroup['bob'] == false ? 0 : this.state.f_meals,
      )
        .then((result) => result.json())
        .then((result) => {
          // console.log(result);
          alert('추가 수당 저장 완료.');
          this.setState({ addAllowance: result });
          this.selectAlloWance();
        });
    }
  };
  handleCheckbox = (e) => {
    let obj = {
      position: false,
      bonus: false,
      over: false,
      etc: false,
      bob: false,
      oil: false,
      agi: false,
    };
    obj[e.target.id] = e.target.checked;
    // console.log(obj);
    this.setState({
      checkboxGroup: obj,
    });
  };
  handleAllowance = (e) => {
    this.setState({
      t_position: e.target.value,
    });
  };
  handleAllowance1 = (e) => {
    this.setState({
      t_bonus: e.target.value,
    });
  };
  handleAllowance2 = (e) => {
    this.setState({
      t_extension: e.target.value,
    });
  };
  handleAllowance3 = (e) => {
    this.setState({
      t_etc: e.target.value,
    });
  };
  handleAllowance4 = (e) => {
    this.setState({
      f_carMaintenanceFee: e.target.value,
    });
  };
  handleAllowance5 = (e) => {
    this.setState({
      f_childcareAllowance: e.target.value,
    });
  };
  handleAllowance6 = (e) => {
    this.setState({
      f_meals: e.target.value,
    });
  };

  handleSelectWorker = (worker) => {
    console.log(worker);
    const selectWokrerState = { selectedWorker: worker };
    this.setState(selectWokrerState);
  };

  render() {
    const { userinfo } = this.props;

    this.pickAMonth = React.createRef();
    this.pickAMonth2 = React.createRef();

    return (
      <div className="wrap paymanageextra">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className="flex todayleave">
            <h4 className="text-h4 w-100 py-3 px-5 fw-bold sectionShadow">
              💰 추가수당 지급 확인
            </h4>

            <div className="sectionShadow me-2 my-3">
              <Picker
                ref={this.pickAMonth}
                value={this.state.yearMonth}
                lang={pickerLang.months}
                onChange={this.handleAMonthChange}
                onDismiss={this.handleAMonthDissmis}
                show={this.state.isVisibleMonthSelector}
              >
                <div
                  className="small-shadow text-bold text-h5 text-center cursor-pointer"
                  //onClick={() => this.pickAMonth.current.show()}                  
                  onClick={this.handleClickMonthBox}
                >
                  {this.state.yearMonth.year}년 {this.state.yearMonth.month}월
                </div>
                <p className="text-center">
                  확인하고 싶은 해당 월을 선택하세요
                </p>
              </Picker>
            </div>
            <div className="sectionShadow my-3 ms-2">
              <TableExtraPay data={this.state.AA} />
              {/* this.state.id */}
            </div>
          </article>
          <h4 className="text-h4 w-100 py-3 px-5 fw-bold sectionShadow">
            🙋‍♀️ 추가수당 등록하기
          </h4>
          <PC>
            <article className="sectionShadow flex flex-wrap align-items-start my-3">
              <div className="col-4 w-50 small-shadow m-0 align-self-center">
                {!this.state.selectedWorker ? (
                  <TableWorkerFilter
                    data={this.state.worker}
                    handleSelectWorker={this.handleSelectWorker}
                  />
                ) : (
                  <p className="text-center">
                    <span className="text-h5 text-bold my-3 px-2">
                      {this.state.selectedWorker.workername2}
                    </span>
                    님의 추가 수당을 저장하세요.
                  </p>
                )}
              </div>
              <div className="flex-wrap col-4 w-50 px-5">
                <div className="w-100">
                  <h5 className="text-bold text-h5">🗓 추가수당 지급 월</h5>
                  <Picker
                    ref={this.pickAMonth2}
                    value={this.state.yearMonth}
                    lang={pickerLang.months}
                    onChange={this.handleAMonthChange}
                    onDismiss={this.handleAMonthDissmis}
                    show={this.state.isVisibleMonthSelector}
                  >
                    <div
                      className="small-shadow text-bold text-h5 text-center cursor-pointer"
                      onClick={this.handleClickMonthBox2}
                    >
                      {this.state.yearMonth.year}년 {this.state.yearMonth.month}
                      월
                    </div>
                    <p className="px-3">
                      추가수당 지급을 확인할 해당 월을 선택해주세요.
                    </p>
                  </Picker>
                </div>
                <div className="mt-3">
                  <p className="p-2 text-h5 text-bold w-100">
                    과세/비과세 선택
                  </p>
                  <div className="d-flex">
                    <div>
                      <label>
                        <span className="text-h5 px-4">과세</span>
                      </label>
                      <div className="p-1 w-100">
                        <input
                          type="checkbox"
                          id="position"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['position']}
                          onChange={this.handleCheckbox}
                        />
                        직책
                        <br />
                        <input
                          type="checkbox"
                          id="bonus"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['bonus']}
                          onChange={this.handleCheckbox}
                        />
                        상여
                        <br />
                        <input
                          type="checkbox"
                          id="over"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['over']}
                          onChange={this.handleCheckbox}
                        />
                        연장근무
                        <br />
                        <input
                          type="checkbox"
                          id="etc"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['etc']}
                          onChange={this.handleCheckbox}
                        />
                        기타
                        {/* {(this.state.etc) ? <input/> : null}    */}
                      </div>
                    </div>
                    <div className="d-flex align-items-start flex-wrap pb-5">
                      <p>
                        <label>
                          <span className="text-h5 px-4">비과세</span>
                        </label>
                      </p>
                      <div className="p-1 w-100">
                        <input
                          type="checkbox"
                          id="bob"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['bob']}
                          onChange={this.handleCheckbox}
                        />
                        식대
                        <br />
                        <input
                          type="checkbox"
                          id="oil"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['oil']}
                          onChange={this.handleCheckbox}
                        />
                        자가유류비
                        <br />
                        <input
                          type="checkbox"
                          id="agi"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['agi']}
                          onChange={this.handleCheckbox}
                        />
                        육아수당
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-100">
                  <h4 className="p-2 text-h5 text-bold w-100">금액</h4>
                  {!this.state.checkboxGroup['position'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="t_position"
                      value={this.state.t_position}
                      onChange={this.handleAllowance}
                    />
                  )}
                  {!this.state.checkboxGroup['bonus'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="t_bonus"
                      value={
                        this.state.checkboxGroup['bonus'] == false
                          ? 0
                          : this.state.t_bonus
                      }
                      onChange={this.handleAllowance1}
                    />
                  )}
                  {!this.state.checkboxGroup['over'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="t_extension"
                      value={
                        this.state.checkboxGroup['over'] == false
                          ? 0
                          : this.state.t_extension
                      }
                      onChange={this.handleAllowance2}
                    />
                  )}
                  {!this.state.checkboxGroup['etc'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="t_etc"
                      value={
                        this.state.checkboxGroup['etc'] == false
                          ? 0
                          : this.state.t_etc
                      }
                      onChange={this.handleAllowance3}
                    />
                  )}
                  {!this.state.checkboxGroup['bob'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="f_meals"
                      value={
                        this.state.checkboxGroup['bob'] == false
                          ? 0
                          : this.state.f_meals
                      }
                      onChange={this.handleAllowance6}
                    />
                  )}
                  {!this.state.checkboxGroup['oil'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="f_carMaintenanceFee"
                      value={
                        this.state.checkboxGroup['oil'] == false
                          ? 0
                          : this.state.f_carMaintenanceFee
                      }
                      onChange={this.handleAllowance4}
                    />
                  )}
                  {!this.state.checkboxGroup['agi'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="f_childcareAllowance"
                      value={
                        this.state.checkboxGroup['agi'] == false
                          ? 0
                          : this.state.f_childcareAllowance
                      }
                      onChange={this.handleAllowance5}
                    />
                  )}
                </div>
              </div>
              <button
                className="my-0 mx-auto button-solid mt-3 py-3 px-5 font-bold"
                type="button"
                onClick={this.handleOnClick}
              >
                저장하기
              </button>
            </article>
          </PC>
          <Mobile>
            <article className="sectionShadow flex flex-wrap align-items-start px-3 my-3">
              <div className="col-4 w-100 small-shadow m-0 align-self-center">
                {!this.state.selectedWorker ? (
                  <TableWorkerFilter
                    data={this.state.worker}
                    handleSelectWorker={this.handleSelectWorker}
                  />
                ) : (
                  <p className="text-center">
                    <span className="text-h5 text-bold my-3 px-2">
                      {this.state.selectedWorker.workername2}
                    </span>
                    님의 추가 수당을 저장하세요.
                  </p>
                )}
              </div>
              <div className="flex-wrap col-4 w-100">
                <div className="w-100">
                  <h5 className="text-bold text-h5 mt-4">🗓 추가수당 지급 월</h5>
                  <Picker
                    ref={this.pickAMonth2}
                    value={this.state.yearMonth}
                    lang={pickerLang.months}
                    onChange={this.handleAMonthChange}
                    onDismiss={this.handleAMonthDissmis}
                  >
                    <div
                      className="small-shadow text-bold text-h5 text-center cursor-pointer"
                      // onClick={() => this.pickAMonth2.current.show()}
                      onClick={this.handleClickMonthBox2}
                    >
                      {this.state.yearMonth.year}년 {this.state.yearMonth.month}
                      월
                    </div>
                    <p className="px-3">
                      추가수당 지급을 확인할 해당 월을 선택해주세요.
                    </p>
                  </Picker>
                </div>
                <div className="w-100 mt-3">
                  <p className="p-2 text-h5 text-bold w-100">
                    과세/비과세 선택
                  </p>
                  <div className="flex justify-around">
                    <div>
                      <label>
                        <span className="text-h5 px-4">과세</span>
                      </label>
                      <div className="p-1">
                        <input
                          type="checkbox"
                          id="position"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['position']}
                          onChange={this.handleCheckbox}
                        />
                        직책
                        <br />
                        <input
                          type="checkbox"
                          id="bonus"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['bonus']}
                          onChange={this.handleCheckbox}
                        />
                        상여
                        <br />
                        <input
                          type="checkbox"
                          id="over"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['over']}
                          onChange={this.handleCheckbox}
                        />
                        연장근무
                        <br />
                        <input
                          type="checkbox"
                          id="etc"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['etc']}
                          onChange={this.handleCheckbox}
                        />
                        기타
                      </div>
                    </div>
                    <div className="pb-5">
                      <label>
                        <span className="text-h5 px-4">비과세</span>
                      </label>
                      <div className="p-1">
                        <input
                          type="checkbox"
                          id="bob"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['bob']}
                          onChange={this.handleCheckbox}
                        />
                        식대
                        <br />
                        <input
                          type="checkbox"
                          id="oil"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['oil']}
                          onChange={this.handleCheckbox}
                        />
                        자가유류비
                        <br />
                        <input
                          type="checkbox"
                          id="agi"
                          name="checkboxGroup"
                          checked={this.state.checkboxGroup['agi']}
                          onChange={this.handleCheckbox}
                        />
                        육아수당
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-100 text-center">
                  <h4 className="p-2 text-h5 text-bold w-100">금액</h4>
                  {!this.state.checkboxGroup['position'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="t_position"
                      value={this.state.t_position}
                      onChange={this.handleAllowance}
                    />
                  )}
                  {!this.state.checkboxGroup['bonus'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="t_bonus"
                      value={this.state.t_bonus}
                      onChange={this.handleAllowance1}
                    />
                  )}
                  {!this.state.checkboxGroup['over'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="t_extension"
                      value={this.state.t_extension}
                      onChange={this.handleAllowance2}
                    />
                  )}
                  {!this.state.checkboxGroup['etc'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="t_etc"
                      value={this.state.t_etc}
                      onChange={this.handleAllowance3}
                    />
                  )}
                  {!this.state.checkboxGroup['bob'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="f_meals"
                      value={this.state.f_meals}
                      onChange={this.handleAllowance6}
                    />
                  )}
                  {!this.state.checkboxGroup['oil'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="f_carMaintenanceFee"
                      value={this.state.f_carMaintenanceFee}
                      onChange={this.handleAllowance4}
                    />
                  )}
                  {!this.state.checkboxGroup['agi'] == true ? null : (
                    <input
                      className="p-2 w-100 text-center"
                      type="number"
                      placeholder="금액을 입력하세요."
                      id="f_childcareAllowance"
                      value={this.state.f_childcareAllowance}
                      onChange={this.handleAllowance5}
                    />
                  )}
                </div>
              </div>
              <button
                className="my-0 mx-auto button-solid mt-3 py-3 px-5 font-bold"
                type="button"
                onClick={this.handleOnClick}
              >
                저장하기
              </button>
            </article>
          </Mobile>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayManageExtraStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.status,
  };
};

export default connect(PayManageExtraStateToProps, undefined)(PayManageExtra);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import $ from 'jquery';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Calendar from 'react-calendar';
import Picker from 'react-month-picker'
import "react-month-picker/css/month-picker.css";

import TableVacation from '../../components/Navigation/TableVacation';
import TableWorkerFilter from '../../components/Navigation/TableWorkerFilter';


import '../../styles/home/home.css';
import { dividerClasses } from '@material-ui/core';

import '../../styles/payManage/payManage.css';

import { insertVacation, selectVacation, selectWorkerByType, dateVacation } from '../../action/api';


const pickerLang = {
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  from: '부터', to: '까지',
}

class PayManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Calendar: new Date(),

      yearMonth: { year: 2019, month: 1, date: 31 },
      year: "2020",
      month: "1",
      date: "31",
      isVisibleMonthSelector: false,

      checkboxGroup: {
        paid: true,
        unpaid: false
      },

      selectedWorker: null,

      workername: false,
      reason: false,
      start_date: `${this.getToday().year}-${this.getToday().month}-${this.getToday().date}`,
      end_date: `${this.getToday().year}-${this.getToday().month}-${this.getToday().date + 1}`,

      vacation: [],
      worker: [],
      // dateVacation: [],
      addVacation: []
    }
    this.vacation()
    this.workerFilter()
    this.updateVacation()
  }
  goLogin = () => {
    this.props.history.push('/');
  };


  vacation = () => {
    selectVacation(this.props.userinfo.business_name)
      .then((result) => result.json())
      .then((result) => {
        result.map((item, index) => {
          const start_date = new Date(item.start_date)
          start_date.setDate(start_date.getDate() + 1);

          item.start_date = `${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate() - 1}`
          const end_date = new Date(item.end_date)
          end_date.setDate(end_date.getDate());

          item.end_date = `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`
        });

        this.setState({ vacation: result })
      })
    return
  }

  updateVacation = () => {
    dateVacation(this.props.userinfo.business_name, `${this.state.yearMonth.year}-${this.state.yearMonth.month}-${this.state.yearMonth.date}`)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ dateVacation: result })
        console.log(this.state)
        console.log(result)
      })
    return
  }




  workerFilter = () => {
    selectWorkerByType(this.props.userinfo.business_name, 2)
      .then(result => result.json())
      .then(result => {
        this.setState({ worker: result })
      })
    return
  }


  handleSelectWorker = (workername2) => {
    const selectWokrerState = { selectedWorker: workername2 };
    this.setState(selectWokrerState)
  }
  handleSelectDate = (year, month, date) => {
    const selectDateState = { selectedDate: year, month, date };
    this.setState(selectDateState)
  }



  handleAMonthChange = (year, month, date) => {
    this.setState({ yearMonth: { year, month, date } }, () => this.updateVacation());
    this.setState({ isVisibleMonthSelector: false });
  }
  handleAMonthDissmis = (e) => {
    this.setState({ isVisibleMonthSelector: false });
  }
  handleClickMonthBox = (e) => {
    this.setState({ isVisibleMonthSelector: true });
    console.debug(this.state.isVisibleMonthSelector);
  }



  handleOnClick = (e) => {

    insertVacation(this.props.userinfo.business_name, this.state.selectedWorker.workername2,
      this.state.checkboxGroup.unpaid && 1,//true:유급(else), false:무급(1)
      this.state.reason, this.state.start_date, this.state.end_date)
      .then((result) => result.json())
      .then((result) => {
        alert("휴가 저장 완료.");
        this.setState({ addVacation: result })
        this.vacation();
      })
    // .then(() => { this.props.history.push('/payManage') })


  }

  handleCheckbox = (e) => {
    let obj = {
      paid: false,
      unpaid: false,
    }
    obj[e.target.id] = e.target.checked
    this.setState({
      checkboxGroup: obj
    })
    console.log(obj)
  }
  handleInsert = (e) => {
    this.setState({
      start_date: e.target.value
    })
  }
  handleInsert1 = (e) => {
    this.setState({
      end_date: e.target.value
    })
  }
  handleInsert2 = (e) => {
    this.setState({
      reason: e.target.value
    })
  }

  getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    if (String(month).length === 1) month = "0" + month;
    if (String(date).length === 1) date = "0" + date;

    return {
      year: year,
      month: month,
      date: date,
    }
  }


  render() {
    const { userinfo } = this.props;
    // console.log('userinfo : ', userinfo);
    const makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
      return '?'
    }
    this.pickAMonth = React.createRef()

    const today = this.getToday();
    const dateToday = `${today.year}-${today.month}-${today.date}`;
    const dateToday2 = `${today.year}-${today.month}-${today.date + 1}`;

    return (
      <div className="wrap wrap-paymanage">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='todayleave'>
            <h4 className='w-100 text-h4'>
              {/* <span className='color-point text-h5'>✔ </span> */}
              🏖 휴가중인 직원
            </h4>
            {/* <div className="edit">
              <Picker
                ref={this.pickAMonth}
                show={this.state.isVisibleMonthSelector}
                years={[2019, 2020, 2021, 2022]}
                age={0}
                value={this.state.yearMonth}
                lang={pickerLang.months}
                onChange={this.handleAMonthChange}
                onDismiss={this.handleAMonthDissmis}
              >
                <MonthBox value={makeText({ year: 2019, month: 1 })} onClick={this.handleClickMonthBox} />
                
              </Picker>
            </div> */}

            {(!this.state.handleSelectDate) ?
              <Calendar
                onChange={this.onChange}
                value={this.state.Calendar}
                className='sectionShadow'
                handleSelectDate={this.handleSelectDate}
              />
              :
              (<p>휴가기간선택</p>)}
            <div className='sectionShadow'>
              <TableVacation data={this.state.vacation} handleSelectDate={this.handleSelectDate} />
            </div>


          </article>


          <h4 className='text-h4'>🙋‍♀️ 휴가 등록하기</h4>
          <article className='sectionShadow flex flex-wrap'>
            <div className='w-50 small-shadow pt-3 m-0'>
              {(!this.state.selectedWorker) ? <TableWorkerFilter data={this.state.worker} handleSelectWorker={this.handleSelectWorker} />
                :
                (<p className='text-center'>
                  <span className='text-h5 text-bold my-3 px-2'>{this.state.selectedWorker.workername2}</span>님의 휴가를 저장하세요.</p>
                )}
            </div>
            <div className='w-50'>
              <div className='p-3 h-100'>


              </div>
              <div className='p-3 h-100'>
                <p className='text-h5 text-bold w-100'>휴가기간</p>
                <input className='small-shadow' type="date" min={dateToday} id="start_date" value={this.state.start_date} onChange={this.handleInsert} />
                ~
                <input className='small-shadow' type="date" min={dateToday2} id="end_date" value={this.state.end_date} onChange={this.handleInsert1} />
              </div>
              <div className='p-3 h-100 flex-wrap'>
                <p className='text-h5 text-bold w-100'>무/유급 휴가 선택</p>
                <input type="checkbox" id="paid" name="checkboxGroup"
                  checked={this.state.checkboxGroup['paid']} onChange={this.handleCheckbox} />
                <span className='text-h6'>유급 휴가</span>
                <input type="checkbox" id="unpaid" name="checkboxGroup"
                  checked={this.state.checkboxGroup['unpaid']} onChange={this.handleCheckbox} />
                <span className='text-h6'>무급 휴가</span>
              </div>
              <div className='p-3 h-100'>
                <p className='text-h5 text-bold'>사유 입력</p>
                <input className='small-shadow' placeholder="사유를 입력하세요" id="reason" onChange={this.handleInsert2} />
              </div>
            </div>
            <button className='button-solid py-3 px-5 font-bold' type="button" onClick={this.handleOnClick} >저장하기</button>
          </article>
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

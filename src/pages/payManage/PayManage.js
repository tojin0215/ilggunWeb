import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Calendar from 'react-calendar';
// import Picker from 'react-month-picker'
// import "react-month-picker/css/month-picker.css";

import TableVacation from '../../components/Navigation/TableVacation';
import TableWorkerFilter from '../../components/Navigation/TableWorkerFilter';


import '../../styles/home/home.css';
import { dividerClasses } from '@material-ui/core';

import '../../styles/payManage/payManage.css';

import { insertVacation, selectVacation, selectWorkerByType } from '../../action/api';


const pickerLang = {
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  from: '부터', to: '까지',
}

class PayManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),

      yearMonth: {year: 2019, month: 1},
      year: "2020",
      month: "1",
      isVisibleMonthSelector: false,
      
      checkboxGroup:{
        paid:true,
        unpaid:false
      },

      selectedWorker: null,

      VA:[],
      worker:[]
    }
    this.vacation()
    this.workerFilter()
  }
  goLogin = () => {
    this.props.history.push('/');
  };


  vacation = () => {
    selectVacation(this.props.userinfo.business_name)
    .then((result) => result.json())
    .then((result) => {
      this.setState({VA:result})
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

 
  handleSelectWorker =(workername2) =>{
    const selectWokrerState = {selectedWorker: workername2};
    this.setState(selectWokrerState)
  }
  



  handleAMonthChange = (year, month) => {
    this.setState({yearMonth: {year, month}});
    this.setState({isVisibleMonthSelector: false});
  }
  handleAMonthDissmis = (e) => {
    this.setState({isVisibleMonthSelector: false});
  }
  handleClickMonthBox = (e) => {
    this.setState({isVisibleMonthSelector: true});
    console.debug(this.state.isVisibleMonthSelector);
  }

  handleCheckbox = (e) => {
    let obj = {
      paid:false,
      unpaid:false,
    }
    obj[e.target.id] = e.target.checked
    // console.log(obj);
    this.setState({
      checkboxGroup:obj
    })
  }

  handleOnClick = () =>{
    alert("휴가 저장 완료.");
  }




  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);
    const makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
      return '?'
      }
    this.pickAMonth = React.createRef()

    const a = new Date();
    const year = a.getFullYear();
    let month = a.getMonth() + 1;
    if (String(month).length === 1) {
      month = "0" + month;
    }
    let day = a.getDate();
    if (String(day).length === 1) {
      day = "0" + day;
    }
    const dateToday = `${year}-${month}-${day}`;
    const dateToday2 = `${year}-${month}-${day+1}`;

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
            {/*
            <div className="edit">
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
                <MonthBox value={makeText({year: 2019, month: 1})} onClick={this.handleClickMonthBox} />
              </Picker>
            </div>
            */}
            {/* <Calendar
              onChange={this.onChange}
              value={this.state.value}
              className='sectionShadow'
            /> */}
            <div className='sectionShadow'>
              <TableVacation data={this.state.VA}/>
            </div>
          </article>
          <h4 className='text-h4'>🙋‍♀️ 휴가 등록하기</h4>
          <article className='sectionShadow flex flex-wrap'>
            <div className='w-50 small-shadow pt-3 m-0'>
              {(!this.state.selectedWorker) ? <TableWorkerFilter data={this.state.worker} handleSelectWorker={this.handleSelectWorker}/>
              : 
               (<span className='text-h5 text-bold my-3'>{this.state.selectedWorker.workername2}님의 휴가를 저장하세요.</span>
               )}
              
            </div>
            <div className='w-50'>
              <div className='p-3 h-100'>
                
                
              </div>
              <div className='p-3 h-100'>
                <p className='text-h5 text-bold w-100'>휴가기간</p>
                <input className='small-shadow' type="date" defaultValue={dateToday} min={dateToday} id="start_date"/>
                  ~ 
                <input className='small-shadow' type="date" min={dateToday2} id="end_date"/>
              </div>
              <div className='p-3 h-100 flex-wrap'>
                <p className='text-h5 text-bold w-100'>무/유급 휴가 선택</p>
                <input type="checkbox" id="paid" name="checkboxGroup"
                checked={this.state.checkboxGroup['paid']} onChange={this.handleCheckbox}/>
                <span className='text-h6'>유급 휴가</span>
                <input type="checkbox" id="unpaid" name="checkboxGroup"
                checked={this.state.checkboxGroup['unpaid']} onChange={this.handleCheckbox}/>
                <span className='text-h6'>무급 휴가</span>
              </div>
              <div className='p-3 h-100'>
                <p className='text-h5 text-bold'>사유 입력</p>
                <input className='small-shadow' placeholder="사유를 입력하세요"></input>
              </div>
            </div>
            <button className='button-solid' type="button" onClick={this.handleOnClick} >저장하기</button>
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

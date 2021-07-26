import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Calendar from 'react-calendar';
import Picker from 'react-month-picker'
import "react-month-picker/css/month-picker.css";

import TableVacation from '../../components/Navigation/TableVacation';
import data from '../../components/Navigation/data';
import '../../styles/home/home.css';
import { dividerClasses } from '@material-ui/core';


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
      isVisibleMonthSelector: false
    }
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
  handleClickMonthBox = (e) => {
    this.setState({isVisibleMonthSelector: true});
    console.debug(this.state.isVisibleMonthSelector);
  }

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);
    const makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
      return '?'
  }
  this.pickAMonth = React.createRef()

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='todayleave'>
            <h4 className='w-100 text-h5'>
              <span className='color-point text-h5'>✔ </span>
              휴가 직원
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
            <Calendar
              onChange={this.onChange}
              value={this.state.value}
              className='sectionShadow'
            />
            <div className='sectionShadow'>
              <TableVacation
                data={data}
              />
            </div>
          </article>
          <article className='sectionShadow flex todayleave'>
            <Calendar
              onChange={this.onChange}
              value={this.state.value}
              className='w-50'
            />
            <div className='border'>
              <div className='p-3'>
                유급 휴가
                <input type="checkbox" />
              </div>
              <div className='p-3'>
                무급 휴가
                <input type="checkbox" />
              </div>
              <div className='p-3'>사유 입력: <input ></input></div>
            </div>
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

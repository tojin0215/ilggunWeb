import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import TablePay from '../../components/Navigation/TablePay';
import data from '../../components/Navigation/data';

import Picker from 'react-month-picker'
import "react-month-picker/css/month-picker.css";

import '../../styles/payDocument/payDocument.css'
import '../../styles/home/home.css';
import { AdditionalAllowance, selectWorkerByType } from '../../action/api';

const pickerLang = {
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  from: '부터', to: '까지',
}

class PayDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
      yearMonth: {year: new Date().getFullYear(), month: new Date().getMonth()},
      year: "2020",
      month: "1",
      isVisibleMonthSelector: false,

      AA:[]
    }
    this.selectAlloWance()
  }

  selectAlloWance = () => {
    AdditionalAllowance(this.props.userinfo.business_name)
     .then((result) => result.json())
     .then((result) => {           
       this.setState({ AA :result })      
     })     
    
    //  selectWorkerByType(this.props.userinfo.business_name, 2)
    // .then(result => result.json())
    // .then(result => {
    //   this.setState({AA: this.state.AA.map((item, index) => {
    //      const worker = result.find((res) => res.business == item.bang);
    //      item["worker"] = worker;
    //      return item;
    //   })})
    // })
    // .catch(error => {
    //   console.error("curFetchWorker",error);
    // })
    

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
  goLogin = () => {
    this.props.history.push('/');
  };

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);
    this.pickAMonth = React.createRef()

    return (
      <div className="wrap wrap-paydocument">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='sectionShadow'>
            <h4 className='text-h5'>{this.state.yearMonth.year}년 {this.state.yearMonth.month}월 급여대장</h4>
            <div className='w-100 flex jf-end'>
              <button> 엑셀로 다운받기 </button>
              <button> 프린트 </button>
              {/* <input
                placeholder='월 선택 캘린더'
                type="date"
                value={this.state.value}
                onChange={(v) => this.setState({value: v.target.value})}
              >
              </input> */}
              <Picker
                ref={this.pickAMonth}
                value={this.state.yearMonth}
                lang={pickerLang.months}
                // show={this.state.isVisibleMonthSelector}
                onChange={this.handleAMonthChange}
                onDismiss={this.handleAMonthDissmis}
            >
            <div onClick={() => this.pickAMonth.current.show()}> {this.state.yearMonth.year}년 {this.state.yearMonth.month}월 </div></Picker>
            </div>
            <TablePay data={this.state.AA} />
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayDocumentStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.status
  };
};

export default connect(PayDocumentStateToProps, undefined)(PayDocument);

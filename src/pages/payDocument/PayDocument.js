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
import { otherAllowanceAll, selectContractformAll, selectInsuranceYear } from '../../action/api';

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
      PD:[]
    }
    this.selectPayDocu()
   
  } 
 
  // selectPayDocu = () => {
  //   const d = new Date()
  //   // otherAllowanceAll(this.props.userinfo.business_name, d.getFullYear(),d.getMonth()+1)
  //   otherAllowanceAll(this.props.userinfo.business_name, this.state.yearMonth.year, 7)
  //    .then((result) => result.json())
  //    .then((result) => {
  //     // console.log( "this.props.userinfo.business_name")
  //     console.log(result)
  //     this.setState({ PD: result})
  //    })
  // }

  selectPayDocu = () => {
    const d = new Date()
    otherAllowanceAll(this.props.userinfo.business_name, d.getFullYear(), 6)
     .then((result) => result.json())
     .then((result) => {           
      console.log(result)
      this.setState({ PD: result})
     })
    
     selectInsuranceYear(this.props.userinfo.business_name, d.getFullYear())
    .then((result) => result.json())
    .then((result) => { 
    console.log(result)          
      this.setState({ PD : this.state.PD.map((item, index)=>{
      const  insurance = result.find((res) => res.bang == item.bang);
      item["insurance"] = insurance;
      return item;
      }) 
    }) 
    })
    
    selectContractformAll (this.props.userinfo.business_name)
    .then((result) => result.json())
    .then((result) => { 
      console.log(result)          
      this.setState({ item :this.state.item.map((item2, index)=>{
        const  contractform = result.find((res) => res.bang == item2.bang);
        item2["contractform"] = contractform;
        return item2;
      })})         
    })
    .catch(error => {
      console.error("kkkkk",error);
    })
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
    // console.log('userinfo : ', userinfo);
    this.pickAMonth = React.createRef()

    return (
      <div className="wrap wrap-paydocument">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='sectionShadow'>
            <h4 className='text-h5 text-bold'>{this.state.yearMonth.year}년 {this.state.yearMonth.month}월 급여대장</h4>
            <div className='w-100 flex jf-end'>
              {/* <input
                placeholder='월 선택 캘린더'
                type="date"
                value={this.state.value}
                onChange={(v) => this.setState({value: v.target.value})}
              >
              </input> */}
              <Picker
                className='button-solid_white-0 py-2 ps-4 pe-0 my-0 mx-1 d-flex'
                ref={this.pickAMonth}
                value={this.state.yearMonth}
                lang={pickerLang.months}
                // show={this.state.isVisibleMonthSelector}
                onChange={this.handleAMonthChange}
                onDismiss={this.handleAMonthDissmis}
            >
            <div onClick={() => this.pickAMonth.current.show()}> {this.state.yearMonth.year}년 {this.state.yearMonth.month}월 </div></Picker>
            </div>
            <TablePay data={this.state.PD} />
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

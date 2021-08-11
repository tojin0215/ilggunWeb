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

import { otherAllowanceAll, AdditionalAllowance, selectWorkerByType } from "../../action/api"


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

      yearMonth: {year: new Date().getFullYear(), month: new Date().getMonth()},
      year: "2020",
      month: "1",
      isVisibleMonthSelector: false,

      checkboxGroup:{
        position: true,
        bonus: false,
        over: false,
        etc: false,
        bob: false,
        oil: false,
        agi: false       
      },      
      
      AA:[],    
      //Additional Allowance
      MA:[],
      //Month select Allowance
      worker:[] 
    }    
    // this.initialState;
    // this.props.initialValues;
    // this.insertAllowance()
    this.selectAlloWance()
    this.workerFilter()

  }
  selectAlloWance = () => {
    AdditionalAllowance(this.props.userinfo.business_name)
     .then((result) => result.json())
     .then((result) => {           
       this.setState({ AA :result })      
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

  otherAllowanceAll = () => {
    const d = new Date();
    otherAllowanceAll(this.props.userinfo.business_name, d.getFullYear(), d.getMonth())
    .then((result) => result.json)
    .then((result) =>{
      this.setState({ MA:result })
    })
    return
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
    console.log(obj);
      this.setState({
        checkboxGroup:obj
      })
  }




  handleChange = event => {
    const { taxation, value } = event.target;
    this.setState({ [taxation]: value });
  };

  render() {
    const { userinfo } = this.props;

    const { taxation, value } = this.state;
    // this.setState({ [taxation]: value });

    this.pickAMonth = React.createRef()
    // this.pickAMonth.current.show()

    // return (<></>)
    
    return (
      <div className="wrap paymanageextra">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='flex todayleave'>
            <h4 className='w-100 text-h5'>
              <span className='color-point text-h5'>✔ </span>
              추가수당
            </h4>
            {/* <Calendar
              onChange={this.onChange}
              value={this.state.value}
              className='sectionShadow'
            /> */}
            <div className='sectionShadow'>
              <Picker
                ref={this.pickAMonth}
                value={this.state.yearMonth}
                lang={pickerLang.months}
                // show={this.state.isVisibleMonthSelector}
                onChange={this.handleAMonthChange}
                onDismiss={this.handleAMonthDissmis}
              >
              <div onClick={() => this.pickAMonth.current.show()}> 
                {this.state.yearMonth.year}년 {this.state.yearMonth.month}월 
              </div>
              </Picker>
            </div>
            <div className='sectionShadow'>
              <TableExtraPay data={this.state.AA} onChange={this.state.MA} />
              {/* this.state.id */}
            </div>
          </article>
            <h4 className='text-h4 mt-5'>🙋‍♀️ 추가수당 등록하기</h4>
            <article className='sectionShadow flex flex-wrap align-items-start'>
            <div className='col-4'>
              <TableWorkerFilter data={this.state.worker}/>
              <br/>           
              <p className='p-2 text-h5 text-bold w-100'>지급일</p>
              <input type="month" />           
            </div>
            <div className='flex-wrap col-4'>
              <p className='p-2 text-h5 text-bold w-100'>과세/비과세 선택</p>
              <div className=''>
                <input type='radio'></input>
                <span className='text-h6 text-bold'>과세</span>
                <div className='p-1 w-100'>
                  <input type="checkbox" id="position" name="checkboxGroup"
                    checked={this.state.checkboxGroup['position']} onChange={this.handleCheckbox}/>
                  직책
                  <br />
                  <input type="checkbox" id="bonus" name="checkboxGroup"
                    checked={this.state.checkboxGroup['bonus']} onChange={this.handleCheckbox}/>
                  상여
                  <br />
                  <input type="checkbox" id="over" name="checkboxGroup"
                    checked={this.state.checkboxGroup['over']} onChange={this.handleCheckbox}/>
                  연장근무
                  <br />
                  <input type="checkbox" id="etc" name="checkboxGroup"
                  checked={this.state.checkboxGroup['etc']} onChange={this.handleCheckbox}/>
                  기타
                  {/* {(this.state.etc) ? <input/> : null}    */}
                </div>
              </div>
              <div className='d-flex align-items-start flex-wrap pb-5 mt-2'>
                <p>
                  <input type='radio'></input>
                  <span className='text-h6 text-bold'>비과세</span>
                </p>
                <div  className='p-1 w-100'>
                  <input type="checkbox" id="bob" name="checkboxGroup"
                    checked={this.state.checkboxGroup['bob']} onChange={this.handleCheckbox}/>
                  식대
                  <br />
                  <input type="checkbox" id="oil" name="checkboxGroup"
                    checked={this.state.checkboxGroup['oil']} onChange={this.handleCheckbox}/>
                  자가유류비
                  <br />
                  <input type="checkbox" id="agi" name="checkboxGroup"
                    checked={this.state.checkboxGroup['agi']} onChange={this.handleCheckbox}/>
                  육아수당
                </div>
              </div>
            </div>
            <div className='col-4'>
              <h4 className='p-2 text-h5 text-bold w-100'>금액</h4>
              <input type="number"placeholder="금액을 입력하세요." 
              name="taxation" value={taxation}
              onChange={this.handleChange}/>              
              <button className='my-0 mx-auto button-solid mt-3' onClick={this.insertAllowance}>저장하기</button>
            </div>
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import WorkerContract from './WorkerContract';
import Menu from '../../components/Navigation/Menu';
import { selectBusinessByName, selectContractform, sendMessage, writeContractform } from '../../action/api';
import { PDFDownloadLink } from '@react-pdf/renderer';

import '../../styles/home/home.css';

class WorkerManageContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bangcode: props.userinfo.business_name,
      bang: props.userinfo.business_name,
      id: props.location.state.worker.workername,
      types1: [{label: '없음   ', value: 0}, {label: '있음', value: 1}], 
      types2: [{label: '없음   ', value: 0}, {label: '있음', value: 1}], 
      types3: [{label: '근로자에게 직접지급   ', value: 0}, {label: '근로자 명의 예금통장에 입금', value: 1}], 
      types4: [0,0,0,0,0],
      value1: "",
      value1Index: "",
      value2: "",
      value2Index: "",
      value3: "",
      value3Index: "",
      value4: [],
      Employer: "",
      Employee: "",
      StartYear: "",
      StartMonth: "",
      StartDay: "",
      EndYear: "",
      EndMonth: "",
      EndDay: "",
      WorkReference: "",
      StartTimeHour: "",
      StartTimeHMin: "",
      EndTimeHMin: "",
      BreakTimeStartMin: "",
      BreakTimeEndHour: "",
      BreakTimeEndMin: "",
      Salary: "",
      Bonus: "",
      Bonus2: "",
      Bonus3: "",
      Bonus4: "",
      SalaryDay: "",
      WorkPlace: "",
      Holiday: "",
      EndTimeHour: "",
      WorkingDays: "",
      ContractYear: "",
      ContractMonth: "",
      ContractDay: "",
      BusinessName: "",
      BusinessAddress: "",
      BusinessPhone: "",
      BusinessOwner1: "",
      EmployeePhone: "",
      EmployeeName: "",
      Employer: "",
      Employee: "",
      StartYear: "",
      StartMonth: "",
      StartDay: "",
      EndYear: "",
      EndMonth: "",
      EndDay: "",
      WorkReference: "",
      StartTimeHour: "",
      StartTimeHMin: "",
      EndTimeHMin: "",
      BreakTimeStartMin: "",
      BreakTimeEndHour: "",
      BreakTimeEndMin: "",
      Salary: "",
      Bonus: "",
      Bonus2: "",
      Bonus3: "",
      Bonus4: "",
      SalaryDay: "",
      WorkPlace: "",
      Holiday: "",
      EndTimeHour: "",
      WorkingDays: "",
      ContractYear: "",
      ContractMonth: "",
      ContractDay: "",
      BusinessName: "",
      BusinessAddress: "",
      BusinessPhone: "",
      BusinessOwner1: "",
      EmployeeAddress: "",
      EmployeePhone: "",
      EmployeeName: "",
      type: 1,
      htmlContent: '',
      tableHead: ['', '시작시간', '마치는시간', '근무시간'],
      tableTitle: ['월', '화', '수', '목', '금', '토', '일'],
      checkedItems: new Set(),
    };
    // this.props.location.worker.name
    console.debug('WorkerManageContract');
    console.debug(props);
    this.curFetch();
    // this.props.userinfo.business_name
  }

  goLogin = () => {
    this.props.history.push('/');
  };

  curFetch = () => {
    selectBusinessByName(this.props.userinfo.business_name)
      .then((result) => result.json())
      .then((result) => {
        console.log('__________');
        console.log(result);
        if (result.length !== 0 && result[0].stamp == 1) {
          this.setState({
            signOrStamp: `<img src="http://13.124.141.28:3000/${this.props.userinfo.business_name}.png" alt="도장" z-index="2" width="100" height="100"></img>`,
          });
        }
      });

    selectContractform(
      this.props.location.state.worker.workername,
      this.props.userinfo.business_name,
    )
      .then((res) => res.json())
      .then((result) => {
        console.log('|__________|');
        // console.log(result);
        let res = { data: result };
        // console.log(res);
        console.log(res);
        if (res.data[0] != undefined) {
          if (res.data[0].type == 3) console.log(res.data);
          // else return;

          console.log(JSON.parse(res.data[0].types1)[0]);
          if (res.data[0].value1Index == 0) {
            res.data[0].types1 = '없음';
          } else {
            res.data[0].types1 = '있음';
          }

          if (res.data[0].value2Index == 0) {
            res.data[0].types2 = '없음';
          } else {
            res.data[0].types2 = '있음';
          }

          if (JSON.parse(res.data[0].types3)[0].value == 1) {
            res.data[0].types3 = '근로자에게 직접 지급';
          } else {
            res.data[0].types3 = '근로자 명의 예금통장에 입금';
          }

          if (res.data[0].Bonus == null) res.data[0].Bonus = 0;
          if (res.data[0].Bonus1 == null) res.data[0].Bonus1 = 0;
          if (res.data[0].Bonus2 == null) res.data[0].Bonus2 = 0;
          if (res.data[0].Bonus3 == null) res.data[0].Bonus3 = 0;
          if (res.data[0].Bonus4 == null) res.data[0].Bonus4 = 0;
          if (res.data[0].AdditionalWageRate == null)
            res.data[0].AdditionalWageRate = 0;

          let t4 = [0, 0, 0, 0, 0];
          let n = JSON.parse(res.data[0].value4);
          for (let i = 0; i < n.length; i++) {
            t4[n[i]] = 1;
          }
          // console.log('whyyyyyyyyyyyyyyyyyyyyy?' + t4);
          res.data[0]['types4'] = t4;

          // this.setState(res.data[0]);
          // console.log(res.data[0].types4);
          
          const temp = new Set(JSON.parse(res.data[0].value4));
          const checkedItems = new Set();
          if (temp.has(1)) checkedItems.add("고용보험")
          if (temp.has(2)) checkedItems.add("산재보험")
          if (temp.has(3)) checkedItems.add("국민연금")
          if (temp.has(4)) checkedItems.add("건강보험")

          res.data[0].checkedItems = checkedItems;

          this.setState({...res.data[0]});
        }
      })
      .catch((error) => {
        console.error(error);
        console.log('__________');
      });
  };

  checkedItemHandler = (id, isChecked) => {
    const newCheckedItems = new Set(this.state.checkedItems);

    if (this.state.checkedItems.has(id)) {
      newCheckedItems.delete(id);
    } else {
      newCheckedItems.add(id)
    }
    this.setState({checkedItems: newCheckedItems})

    // if (isChecked) {
    //   this.setState({checkedItems: this.state.checkedItems.add(id)})
    // } else if (!isChecked && this.state.checkedItems.has(id)) {
    //   this.setState({checkedItems: this.state.checkedItems.delete(id)})
    // }
  };

  handleSubmit(){
    const chkNum = (str)=> {
        var pattern_num = /[0-9]/;
        return pattern_num.test(str) ? true : false;
    };
    const chkEng = (str)=> {
        var pattern_eng = /[a-zA-Z]/;
        return pattern_eng.test(str) ? true : false;
    };
    const chkKor = (str)=> {
        var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        return pattern_kor.test(str) ? true : false;
    };
    const chkSpc = (str)=> {
        var pattern_spc = /[-~!@#$%^&*()_+|<>?:{}.,/]/;
        return pattern_spc.test(str) ? true : false;
    };

    if(this.state.Employer == null||this.state.Employee ==null
        ||this.state.StartYear==null||this.state.StartMonth==null||this.state.StartDay==null
        ||this.state.WorkPlace==null||this.state.WorkReference==null||this.state.StartTimeHour==null
        ||this.state.StartTimeHMin==null||this.state.EndTimeHour==null||this.state.EndTimeHMin==null
        ||this.state.WorkingDays==null||this.state.Holiday==null||this.state.Salary==null
        ||this.state.SalaryDay==null||this.state.ContractYear==null||this.state.ContractMonth==null
        ||this.state.ContractDay==null||this.state.BusinessName==null||this.state.BusinessAddress==null
        ||this.state.BusinessOwner1==null||/*this.state.EmployeeAddress==null||this.state.EmployeePhone==null
        ||this.state.EmployeeName==null||*/this.state.BusinessPhone==null){
        alert('빈칸을 채워주세요.') 
    } else if(
         (!((chkNum(this.state.StartYear)===true) && (chkEng(this.state.StartYear)===false) && (chkKor(this.state.StartYear) ===false) && (chkSpc(this.state.StartYear)===false))||
        !((chkNum(this.state.StartMonth)===true) && (chkEng(this.state.StartMonth)===false) && (chkKor(this.state.StartMonth) ===false) && (chkSpc(this.state.StartMonth)===false))||
        !((chkNum(this.state.StartDay)===true) && (chkEng(this.state.StartDay)===false) && (chkKor(this.state.StartDay) ===false) && (chkSpc(this.state.StartDay)===false))||
        !((chkNum(this.state.StartTimeHour)===true) && (chkEng(this.state.StartTimeHour)===false) && (chkKor(this.state.StartTimeHour) ===false) && (chkSpc(this.state.StartTimeHour)===false))||
        !((chkNum(this.state.StartTimeHMin)===true) && (chkEng(this.state.StartTimeHMin)===false) && (chkKor(this.state.StartTimeHMin) ===false) && (chkSpc(this.state.StartTimeHMin)===false))||
        !((chkNum(this.state.EndTimeHour)===true) && (chkEng(this.state.EndTimeHour)===false) && (chkKor(this.state.EndTimeHour) ===false) && (chkSpc(this.state.EndTimeHour)===false))||
        !((chkNum(this.state.EndTimeHMin)===true) && (chkEng(this.state.EndTimeHMin)===false) && (chkKor(this.state.EndTimeHMin) ===false) && (chkSpc(this.state.EndTimeHMin)===false))||
        !((chkNum(this.state.WorkingDays)===true) && (chkEng(this.state.WorkingDays)===false) && (chkKor(this.state.WorkingDays) ===false) && (chkSpc(this.state.WorkingDays)===false))||
        !((chkNum(this.state.Holiday)===true) && (chkEng(this.state.Holiday)===false) && (chkKor(this.state.Holiday) ===false) && (chkSpc(this.state.Holiday)===false))||
        !((chkNum(this.state.Salary)===true) && (chkEng(this.state.Salary)===false) && (chkKor(this.state.Salary) ===false) && (chkSpc(this.state.Salary)===false))||
        !((chkNum(this.state.SalaryDay)===true) && (chkEng(this.state.SalaryDay)===false) && (chkKor(this.state.SalaryDay) ===false) && (chkSpc(this.state.SalaryDay)===false))||
        !((chkNum(this.state.ContractYear)===true) && (chkEng(this.state.ContractYear)===false) && (chkKor(this.state.ContractYear) ===false) && (chkSpc(this.state.ContractYear)===false))||
        !((chkNum(this.state.ContractMonth)===true) && (chkEng(this.state.ContractMonth)===false) && (chkKor(this.state.ContractMonth) ===false) && (chkSpc(this.state.ContractMonth)===false))||
        !((chkNum(this.state.ContractDay)===true) && (chkEng(this.state.ContractDay)===false) && (chkKor(this.state.ContractDay) ===false) && (chkSpc(this.state.ContractDay)===false)))
        || this.state.StartYear<2000 || this.state.StartYear>3000
        || this.state.StartMonth<1 || this.state.StartMonth>12 
        || this.state.StartDay<1 || this.state.StartDay>31
        ){
        alert('계약기간, 근로시간, 임금, 계약날짜의 숫자가 제대로 입력되었는지 확인해주세요.') 
    } else{
        var flag = true
        if(!(this.state.EndYear==null)||!(this.state.EndMonth==null)||!(this.state.EndDay==null)){
            console.log('근로기간 확인')
            if(!((chkNum(this.state.EndYear)===true) && (chkEng(this.state.EndYear)===false) && (chkKor(this.state.EndYear) ===false) && (chkSpc(this.state.EndYear)===false))||
            !((chkNum(this.state.EndMonth)===true) && (chkEng(this.state.EndMonth)===false) && (chkKor(this.state.EndMonth) ===false) && (chkSpc(this.state.EndMonth)===false))||
            !((chkNum(this.state.EndDay)===true) && (chkEng(this.state.EndDay)===false) && (chkKor(this.state.EndDay) ===false) && (chkSpc(this.state.EndDay)===false))){
                alert('계약기간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                console.log('근로기간_숫자 제대로 입력안됨')
                flag=false
            }else{
                console.log('근로기간_숫자 제대로 확인됨')
            }            
        } 

        if(!(this.state.BreakTimeStartHour==null)||!(this.state.BreakTimeStartMin==null)||!(this.state.BreakTimeEndHour==null)||!(this.state.BreakTimeEndMin==null)){
            console.log('근로기간 확인')
            if(!((chkNum(this.state.BreakTimeStartHour)===true) && (chkEng(this.state.BreakTimeStartHour)===false) && (chkKor(this.state.BreakTimeStartHour) ===false) && (chkSpc(this.state.BreakTimeStartHour)===false))||
            !((chkNum(this.state.BreakTimeStartMin)===true) && (chkEng(this.state.BreakTimeStartMin)===false) && (chkKor(this.state.BreakTimeStartMin) ===false) && (chkSpc(this.state.BreakTimeStartMin)===false))||
            !((chkNum(this.state.BreakTimeEndHour)===true) && (chkEng(this.state.BreakTimeEndHour)===false) && (chkKor(this.state.BreakTimeEndHour) ===false) && (chkSpc(this.state.BreakTimeEndHour)===false))||
            !((chkNum(this.state.BreakTimeEndMin)===true) && (chkEng(this.state.BreakTimeEndMin)===false) && (chkKor(this.state.BreakTimeEndMin) ===false) && (chkSpc(this.state.BreakTimeEndMin)===false))){
                alert('휴게시간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                console.log('휴게시간_숫자 제대로 입력안됨')
                flag=false
            }else{
                console.log('휴게시간_숫자 제대로 확인됨')
            }            
        } 

        if(!(this.state.Bonus==null)){
            if(!((chkNum(this.state.Bonus)===true) && (chkEng(this.state.Bonus)===false) && (chkKor(this.state.Bonus) ===false) && (chkSpc(this.state.Bonus)===false))){
                alert('상여금의 숫자가 제대로 입력되었는지 확인해주세요.')  
                flag=false
            }else{
                console.log('상여금_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Bonus1==null)){
            if(!((chkNum(this.state.Bonus1)===true) && (chkEng(this.state.Bonus1)===false) && (chkKor(this.state.Bonus1) ===false) && (chkSpc(this.state.Bonus1)===false))){
                alert('기타급여의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('기타급여_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Bonus2==null)){
            if(!((chkNum(this.state.Bonus2)===true) && (chkEng(this.state.Bonus2)===false) && (chkKor(this.state.Bonus2) ===false) && (chkSpc(this.state.Bonus2)===false))){
                alert('기타급여의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('기타급여_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Bonus3==null)){
            if(!((chkNum(this.state.Bonus3)===true) && (chkEng(this.state.Bonus3)===false) && (chkKor(this.state.Bonus3) ===false) && (chkSpc(this.state.Bonus3)===false))){
                alert('기타급여의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('기타급여_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Bonus4==null)){
            if(!((chkNum(this.state.Bonus4)===true) && (chkEng(this.state.Bonus4)===false) && (chkKor(this.state.Bonus4) ===false) && (chkSpc(this.state.Bonus4)===false))){
                alert('기타급여의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('기타급여_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.AdditionalWageRate==null)){
            if(!((chkNum(this.state.AdditionalWageRate)===true) && (chkEng(this.state.AdditionalWageRate)===false) && (chkKor(this.state.AdditionalWageRate) ===false) && (chkSpc(this.state.AdditionalWageRate)===false))){
                alert('초과근로 가산임금률의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('초과근로 가산임금률_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.SalaryCalculationPeriodStart==null)){
            if(!((chkNum(this.state.SalaryCalculationPeriodStart)===true) && (chkEng(this.state.SalaryCalculationPeriodStart)===false) && (chkKor(this.state.SalaryCalculationPeriodStart) ===false) && (chkSpc(this.state.SalaryCalculationPeriodStart)===false))||
            !((chkNum(this.state.SalaryCalculationPeriodEnd)===true) && (chkEng(this.state.SalaryCalculationPeriodEnd)===false) && (chkKor(this.state.SalaryCalculationPeriodEnd) ===false) && (chkSpc(this.state.SalaryCalculationPeriodEnd)===false))
            ){
                alert('급여산정기간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('급여산정기간_숫자 제대로 확인됨')
            }
        }

        console.log(this.state);
        if(flag){ 
          this.setState({type: 2})
            // this.state.type = 2;
            this.fetchHtml();
            alert('저장되었습니다.')   
        }else{
            //에러 
        }
        
    }
  }

  fetchHtml = () => {
    const data = {...this.state}
    delete data['tableHead']
    delete data['tableTitle']
    delete data['bangcode']
    delete data['htmlContent']
    delete data['AdditionalWageRate']
    const value4 = new Array();
    if (data.checkedItems.has("고용보험")) value4.push(1)
    if (data.checkedItems.has("산재보험")) value4.push(2)
    if (data.checkedItems.has("국민연금")) value4.push(3)
    if (data.checkedItems.has("건강보험")) value4.push(4)
    data['value4'] = (data.value4.length > 0)? data.value4 : value4;
    delete data['checkedItems']

    writeContractform(data)
    .then(res => {
      selectBusinessByName(this.state.bangcode)
      .then(result => result.json())
      .then(result => {
        try {
          sendMessage(
            result[0].id,
            null,
            this.state.id,
            null,
            `<${this.state.bang}>사업주가 ${this.state.id}님의 계약서를 작성했습니다. [문서함>계약서]를 확인해주세요.`,
            null,
            1,
            3
          ).then(r => {
            this.props.history.push('/workerManage');
          })
        } catch (e) {console.error(e)}
      })
    })
  }

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);

    const isEditMode = false;

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article
            style={{
              border: '1px solid #000',
              padding: '10px',
              margin: '10px',
            }}
          >
            직원관리/근로계약서의 직원 근로계약서 상세 아티클입니다.
            <br />
            <form
              style={{
                border: '1px solid #000',
                padding: '10px',
                margin: '10px',
              }}
            >
              이름 및 조작 버튼이 들어가는 공간입니다.
              <br />
              <span
                style={{
                  border: '1px solid #000',
                  padding: '10px',
                  margin: '10px',
                }}
              >
                {this.props.location.state.worker.workername2}
              </span>
              <button>작성/수정</button>
              <button>다운로드</button>
              <button onClick={(e) => {e.preventDefault();this.handleSubmit()}}>저장</button>
              <button onClick={(e) => {e.preventDefault();}}>프린트</button>
            </form>
            {/* 완전한 계약서만 출력 */}
            {this.state.type === 3 && !isEditMode ? (
              <>
                <WorkerContract forDownload={false} contract={this.state} />
                <PDFDownloadLink
                  document={
                    <WorkerContract forDownload={true} contract={this.state} />
                  }
                  fileName="worker.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                  }
                </PDFDownloadLink>
              </>
            ) : null}
            {/* 사업주가 계약서 작성해야 함 */}
            {this.state.type === 1 ? (
              <>
                <div>
                  <span>근로자가 확인하고 있습니다.</span>
                  <p>
                    <p>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ Employer: e.target.value })
                        }
                        value={this.state.Employer}
                      ></input>
                      <span>(이하 "사업주"라 함) 과(와)</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ Employee: e.target.value })
                        }
                        value={this.state.Employee}
                      ></input>
                      <span>(이하 "근로자"라 함) 은</span>
                    </p>
                    <span>다음과 같이 근로계약을 체결한다.</span>
                  </p>
                  <p>
                    <span>1. 근로계약기간 :</span>
                    <p>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ StartYear: e.target.value })
                        }
                        value={this.state.StartYear}
                      ></input>
                      <span>년</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ StartMonth: e.target.value })
                        }
                        value={this.state.StartMonth}
                      ></input>
                      <span>월</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ StartDay: e.target.value })
                        }
                        value={this.state.StartDay}
                      ></input>
                      <span>일부터</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ EndYear: e.target.value })
                        }
                        value={this.state.EndYear}
                      ></input>
                      <span>년</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ EndMonth: e.target.value })
                        }
                        value={this.state.EndMonth}
                      ></input>
                      <span>월</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ EndDay: e.target.value })
                        }
                        value={this.state.EndDay}
                      ></input>
                      <span>일까지</span>
                    </p>
                  </p>
                  <p>
                    <p>
                      <span>2. 근무장소 : </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ WorkPlace: e.target.value })
                        }
                        value={this.state.WorkPlace}
                      ></input>
                    </p>
                  </p>
                  <p>
                    <p>
                      <span>3. 업무의 내용 : </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ WorkReference: e.target.value })
                        }
                        value={this.state.WorkReference}
                      ></input>
                    </p>
                  </p>
                  <p>
                    <span>4. 소정근로시간 :</span>
                    <p>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ StartTimeHour: e.target.value })
                        }
                        value={this.state.StartTimeHour}
                      ></input>
                      <span>시</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ StartTimeHMin: e.target.value })
                        }
                        value={this.state.StartTimeHMin}
                      ></input>
                      <span>분 ~ </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ EndTimeHour: e.target.value })
                        }
                        value={this.state.EndTimeHour}
                      ></input>
                      <span>시</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ EndTimeHMin: e.target.value })
                        }
                        value={this.state.EndTimeHMin}
                      ></input>
                      <span>분</span>
                    </p>
                    <p>
                      <span>휴게시간</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ BreakTimeStartHour: e.target.value })
                        }
                        value={this.state.BreakTimeStartHour}
                      ></input>
                      <span>시</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ BreakTimeStartMin: e.target.value })
                        }
                        value={this.state.BreakTimeStartMin}
                      ></input>
                      <span>분 ~ </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ BreakTimeEndHour: e.target.value })
                        }
                        value={this.state.BreakTimeEndHour}
                      ></input>
                      <span>시</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ BreakTimeEndMin: e.target.value })
                        }
                        value={this.state.BreakTimeEndMin}
                      ></input>
                      <span>분</span>
                    </p>
                  </p>
                  <p>
                    <span>5. 근무일/휴일 : </span>
                    <p>
                      <span>매주</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ WorkingDays: e.target.value })
                        }
                        value={this.state.WorkingDays}
                      ></input>
                      <span>일 근무,</span>
                    </p>
                    <p>
                      <span>주휴일 매주</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ Holiday: e.target.value })
                        }
                        value={this.state.Holiday}
                      ></input>
                      <span>일</span>
                    </p>
                  </p>

                  <p>
                    <span>6. 임금</span>
                    <p>
                      <span>-월급 : </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ Salary: e.target.value })
                        }
                        value={this.state.Salary}
                      ></input>
                      <span>원</span>
                    </p>
                    <p>
                      <span>-상여금 : </span>
                      <span>없음</span>
                      <input
                      type="radio"
                      name="types1"
                      value="0"
                      checked={this.state.value1===0}
                      onChange={(e) => this.setState({value1: 0, value1Index: 0})}
                      >
                      </input>
                      <span>있음</span>
                      <input
                      type="radio"
                      name="types1"
                      value="1"
                      checked={this.state.value1===1}
                      onChange={(e) => this.setState({value1: 1, value1Index: 1})}
                      >
                      </input>
                      <span>, </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ Bonus: e.target.value })
                        }
                        value={this.state.Bonus}
                      ></input>
                      <span>원</span>
                    </p>
                    <p>
                      <span>-기타급여(제수당 등) : </span>
                      <span>없음</span>
                      <input
                      type="radio"
                      name="types2"
                      value="0"
                      checked={this.state.value2===0}
                      onChange={(e) => this.setState({value2: 0, value2Index: 0})}
                      >
                      </input>
                      <span>있음</span>
                      <input
                      type="radio"
                      name="types2"
                      value="1"
                      checked={this.state.value2===1}
                      onChange={(e) => this.setState({value2: 1, value2Index: 1})}
                      >
                      </input>
                    </p>
                    <p>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ Bonus1: e.target.value })
                        }
                        value={this.state.Bonus1}
                      ></input>
                      <span>원, </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ Bonus2: e.target.value })
                        }
                        value={this.state.Bonus2}
                      ></input>
                      <span>원, </span>
                    </p>
                    <p>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ Bonus3: e.target.value })
                        }
                        value={this.state.Bonus3}
                      ></input>
                      <span>원, </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ Bonus4: e.target.value })
                        }
                        value={this.state.Bonus4}
                      ></input>
                      <span>원, </span>
                    </p>
                  </p>
                  <p>
                    <span>-급여산정기간 : </span>
                    <p>
                      <span>매주</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            SalaryCalculationPeriodStart: e.target.value,
                          })
                        }
                        value={this.state.SalaryCalculationPeriodStart}
                      ></input>
                      <span>일 ~ </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            SalaryCalculationPeriodEnd: e.target.value,
                          })
                        }
                        value={this.state.SalaryCalculationPeriodEnd}
                      ></input>
                      <span>일</span>
                    </p>
                    <p>
                    <span>-임금지급일 : 매월</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            SalaryDay: e.target.value,
                          })
                        }
                        value={this.state.SalaryDay}
                      ></input>
                      <span>일</span>
                    </p>
                    <p>
                      <span>(휴일의 경우에는 전일 지급)</span>
                    </p>
                    <p>
                      <span>-지급방법 : </span>
                      <span>근로자에게 직접지급   </span>
                      <input
                      type="radio"
                      name="types3"
                      value="0"
                      checked={this.state.value3===0}
                      onChange={(e) => this.setState({value3: 0, value3Index: 0})}
                      >
                      </input>
                      <span>근로자 명의 예금통장에 입금</span>
                      <input
                      type="radio"
                      name="types3"
                      value="1"
                      checked={this.state.value3===1}
                      onChange={(e) => this.setState({value3: 1, value3Index: 1})}
                      >
                      </input>
                    </p>
                  </p>

                  <p>
                    <span>7. 연차유급휴가</span>
                    <span>
                      - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함
                    </span>
                  </p>

                  <p>
                    <span>8. 사대보험 적용여부(해당란에 체크)</span>
                    <p>
                      
                    <span>고용보험:</span>
                      <input type="checkbox" checked={this.state.checkedItems.has("고용보험")} onChange={(e) => this.checkedItemHandler("고용보험", e.checked)} />;
                      <span>산재보험:</span>
                      <input type="checkbox" checked={this.state.checkedItems.has("산재보험")} onChange={(e) => this.checkedItemHandler("산재보험", e.checked)} />;
                      <span>국민연금:</span>
                      <input type="checkbox" checked={this.state.checkedItems.has("국민연금")} onChange={(e) => this.checkedItemHandler("국민연금", e.checked)} />;
                      <span>건강보험:</span>
                      <input type="checkbox" checked={this.state.checkedItems.has("건강보험")} onChange={(e) => this.checkedItemHandler("건강보험", e.checked)} />;
                    </p>
                  </p>

                  <p>
                    <span>9. 근로계약서 교부</span>
                    <span>
                      {' '}
                      - 사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여
                      근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법
                      제17조 이행)
                    </span>
                  </p>
                  <p>
                    <span>10. 기타</span>
                    <span>
                      {' '}
                      - 이 계약에 정함이 없는 사항은 근로기준법령에 의함
                    </span>
                  </p>
                  <p>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({
                          ContractYear: e.target.value,
                        })
                      }
                      value={this.state.ContractYear}
                    ></input>
                    <span>년</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({
                          ContractMonth: e.target.value,
                        })
                      }
                      value={this.state.ContractMonth}
                    ></input>
                    <span>월</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({
                          ContractDay: e.target.value,
                        })
                      }
                      value={this.state.ContractDay}
                    ></input>
                    <span>일</span>
                  </p>
                  <p>
                    <span>사업주</span>
                    <p>
                      <span>사업체명: </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            BusinessName: e.target.value,
                          })
                        }
                        value={this.state.BusinessName}
                      />
                    </p>
                    <p>
                      <span>주소: </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            BusinessAddress: e.target.value,
                          })
                        }
                        value={this.state.BusinessAddress}
                      />
                    </p>
                    <p>
                      <span>전화번호: </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            BusinessPhone: e.target.value,
                          })
                        }
                        value={this.state.BusinessPhone}
                      />
                    </p>
                    <p>
                      <span>대표자: </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            BusinessOwner1: e.target.value,
                          })
                        }
                        value={this.state.BusinessOwner1}
                      />
                    </p>
                    <p>
                      <span>근로자</span>
                      <input
                        type="text"
                        value="주소 : 사용자가 입력하는 칸입니다."
                        disabled
                      />
                      <input
                        type="text"
                        value="연락처 : 사용자가 입력하는 칸입니다."
                        disabled
                      />
                      <input
                        type="text"
                        value="성명 : 사용자가 입력하는 칸입니다."
                        disabled
                      />
                    </p>
                    <p>{/* <input type="button">저장하기</input> */}</p>
                  </p>
                </div>
              </>
            ) : null}




            
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const WorkerManageContractStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(
  WorkerManageContractStateToProps,
  undefined,
)(WorkerManageContract);

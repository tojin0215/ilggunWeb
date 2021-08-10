import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import { selectBusinessByName, selectContractform } from '../../action/api';

import '../../styles/home/home.css';
import '../../styles/workerManage/workerManageContract.css';

class WorkerManageContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 3,
      id: 'Qq',
      bang: '맛있다떡볶이',
      types1: '없음',
      types2: '없음',
      types3: '근로자 명의 예금통장에 입금',
      types4: [0, 1, 1, 1, 1],
      value1: 0,
      value1Index: 0,
      value2: 0,
      value2Index: 0,
      value3: 0,
      value3Index: 0,
      value4: '[2,1,3,4]',
      Employer: '권소령',
      Employee: '권소령',
      StartYear: '2019',
      StartMonth: '5',
      StartDay: '1',
      EndDay: '31',
      WorkPlace: '사무실',
      StartTimeHour: '10',
      EndTimeHour: '18',
      BreakTimeStartHour: '12',
      BreakTimeEndHour: '13',
      WorkingDays: '5',
      Bonus: 0,
      Bonus1: 0,
      Bonus2: 0,
      Bonus3: 0,
      Bonus4: 0,
      SalaryDay: '10',
      ContractYear: '2021',
      ContractMonth: '5',
      ContractDay: '7',
      BusinessName: '맛있다 떡볶이',
      BusinessAddress: '부산광역시',
      BusinessPhone: '01039770370',
      BusinessOwner1: '권소령',
      EmployeeAddress: '부산광역시',
      EmployeePhone: '010',
      EmployeeName: '권소령ㅇ',
      WorkReference: '어플개발',
      StartTimeHMin: '00',
      EndTimeHMin: '00',
      BreakTimeStartMin: '00',
      BreakTimeEndMin: '00',
      Holiday: '2',
      EndYear: '2022',
      EndMonth: '12',
      Salary: '2000000',
      SalaryCalculationPeriodStart: '1',
      SalaryCalculationPeriodEnd: '31',
      AdditionalWageRate: 0,
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
        if (result[0].stamp == 1) {
          this.setState({
            signOrStamp: `<img src="http://13.124.141.28:3000/{this.props.userinfo.business_name}.png" alt="도장" z-index="2" width="100" height="100"></img>`,
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
        console.log(result);
        let res = { data: result };
        console.log(res);
        if (res.data[0] != undefined) {
          if (res.data[0].type == 3) console.log(res.data);
          else return;

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
          this.setState(res.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
        console.log('__________');
      });
  };

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);

    return (
      <div className="wrap workercontractwrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <div className='small-shadow p-3 flex align-ct js-ct worker-name width-fit'>
            <span className='text-h6 text-bold'>{this.props.location.state.worker.workername2}</span>
          </div>
          <article className='sectionShadow'>
            {this.props.location.state.worker.state == 2 ? (
              <div className='flex-wrap container'>
                <h6 className='text-h4 text-ct w-100 text-bold'>표준근로계약서</h6>
                <p className='text-ct w-100'>
                  <span className='text-bold'>{this.state.Employer}</span>
                  <span>(이하 "사업주"라 함) 과(와)</span>
                </p>
                <p className='text-ct w-100'>
                  <span className='text-bold'>{this.state.Employee}</span>
                  <span>
                    (이하 "근로자"라 함) 은
                  </span>
                </p>
                <p className='text-ct w-100'>
                  다음과 같이 근로계약을 체결한다.
                </p>
                <p className='text-st w-100 text-bold text-h6'>1. 근로계약기간 :</p>
                <p className='text-ct w-100'>
                  <span>{this.state.StartYear}</span>
                  <span>년</span>
                  <span>{this.state.StartMonth}</span>
                  <span>월</span>
                  <span>{this.state.StartDay}</span>
                  <span>일부터</span>
                </p>
                <p className='text-ct w-100'>
                  <span>
                    {this.state.EndYear == null ? '-' : this.state.EndYear}
                  </span>
                  <span>년</span>
                  <span>
                    {this.state.EndMonth == null ? '-' : this.state.EndMonth}
                  </span>
                  <span>월</span>
                  <span>
                    {this.state.EndDay == null ? '-' : this.state.EndDay}
                  </span>
                  <span>일까지</span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>
                  2. 근 무 장 소 :
                  <span className='text-medium'>{this.state.WorkPlace}</span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>
                  3. 업무의 내용 :
                  <span className='text-medium'>{this.state.WorkReference}</span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>4. 소정근로시간 :</p>
                <p className='text-ct w-100'>
                  <span>{this.state.StartTimeHour}</span>
                  <span>시</span>
                  <span>{this.state.StartTimeHMin}</span>
                  <span>분부터 </span>
                  <span>{this.state.EndTimeHour}</span>
                  <span>시</span>
                  <span>{this.state.EndTimeHMin}</span>
                  <span>분까지</span>
                </p>
                <p className='text-ct w-100'>
                  <span>( 휴게시간 : </span>
                  <span>
                    {this.state.BreakTimeStartHour}
                  </span>
                  <span>시</span>
                  <span>
                    {this.state.BreakTimeStartMin}
                  </span>
                  <span>분 ~ </span>
                  <span>
                    {this.state.BreakTimeEndHour}
                  </span>
                  <span>시</span>
                  <span>
                    {this.state.BreakTimeEndMin}
                  </span>
                  <span>분 )</span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>
                  5. 근무일/휴일 :
                </p>
                <p className='text-ct w-100'>
                  <span>매주 {this.state.WorkingDays}</span>
                  <span>일(또는 매일단위)근무</span>
                </p>
                <p className='text-ct w-100'>
                  <span>(</span>
                  <span>주휴일 : 매주</span>
                  <span>{this.state.Holiday}</span>
                  <span>일</span>
                  <span>)</span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>6. 임 금</p>
                <p className='text-st w-100'>
                  <span className='ml-20'>- 월(일, 시간)급 : </span>
                  <span>{this.state.Salary}</span>
                  <span>원</span>
                </p>
                <p className='text-st w-100'>
                  <span className='ml-20'>- 상여금 : </span>
                  <span for="bonusYes">{this.state.types1}</span>
                  <span>({this.state.Bonus}</span>
                  <span>원)</span>
                </p>
                <p className='text-st w-100'>
                  <span className='ml-20'>- 기타급여(제수당 등) : </span>
                  <span for="bonus2Yes">{this.state.types2}</span>
                  <span>(</span>
                  <span>{this.state.Bonus1}</span>
                  <span>원, </span>
                  <span>{this.state.Bonus2}</span>
                  <span>원, </span>
                  <span>{this.state.Bonus3}</span>
                  <span>원, </span>
                  <span>{this.state.Bonus4}</span>
                  <span>원 </span>
                  <span>)</span>
                </p>
                <p>
                  <span className='ml-20'>- 급여산정기간 :</span>
                </p>
                <p>
                  <span>
                    {this.state.SalaryCalculationPeriodStart}
                  </span>
                  <span>일 ~ </span>
                  <span>
                    {this.state.SalaryCalculationPeriodEnd}
                  </span>
                  <span>일</span>
                </p>
                <p>
                  <span className='ml-20'>- 임금지급일 : 매월</span>
                  <span>{this.state.SalaryDay}</span>
                  <span>일 (휴일의 경우에는 전일 지급)</span>
                </p>
                <p>
                  <span className='ml-20'>- 지급방법 : </span>
                  <span for="wayOfPayment1">{this.state.types3}</span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>
                  7. 연차유급휴가
                </p>
                <span className='ml-20'>
                  {' '}
                  - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함.
                </span>
                <p className='text-st w-100 text-bold text-h6'>8. 사대보험 적용여부</p>
                <p className='d-flex align-items-center'>
                  <span className='ml-20'>
                    - 고용보험 : {this.state.types4[1] == 1 ? 'O' : 'X'}
                  </span>
                  <span className='ml-20'>
                    - 산재보험 : {this.state.types4[2] == 1 ? 'O' : 'X'}
                  </span>
                  <span className='ml-20'>
                    - 국민연금 : {this.state.types4[3] == 1 ? 'O' : 'X'}
                  </span>
                  <span className='ml-20'>
                    - 건강보험 : {this.state.types4[4] == 1 ? 'O' : 'X'}
                  </span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>9. 근로계약서 교부</p>
                <p>
                  <span className='ml-20'>
                  {' '}
                  - '사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여
                  근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법 제17조 이행)
                  </span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>10. 기타</p>
                <p>
                  <span className='ml-20'>
                    {' '}
                    - 이 계약에 정함이 없는 사항은 근로기준법령에 의함
                  </span>
                </p>
                <p className='text-ct w-100 text-h6'>
                  <span>{this.state.ContractYear}</span>
                  <span>년</span>
                  <span>{this.state.ContractMonth}</span>
                  <span>월</span>
                  <span>{this.state.ContractDay}</span>
                  <span>일</span>
                </p>
                <p className='w-100 text-bold text-h6'>(사업주)</p>
                <p className='w-100'>
                  <span className='ml-20'>사업체명 : </span>
                  <span>{this.state.BusinessName}</span>
                </p>
                <p className='w-100'>
                  <span className='ml-20'>연락처 : </span>
                  <span>{this.state.BusinessPhone}</span>
                </p>
                <p className='w-100'>
                  <span className='ml-20'>주 소 : </span>
                  <span>{this.state.BusinessAddress}</span>
                </p>
                <p className='w-100'>
                  <span className='ml-20'>대 표 자 : </span>
                  <span>{this.state.BusinessOwner1}</span>
                  <span>
                    (서명){this.state.signOrStamp}
                  </span>
                </p>
                <p className='w-100'>
                  <span className='w-100 text-bold text-h6'>(근로자)</span>
                </p>
                <p className='w-100'>
                  <span className='ml-20'>주 소 : </span>
                  <span>{this.state.EmployeeAddress}</span>
                </p>
                <p className='w-100'>
                  <span className='ml-20'>연 락 처 : </span>
                  <span>{this.state.EmployeePhone}</span>
                </p>
                <p className='w-100'>
                  <span className='ml-20'>성 명 : </span>
                  <span>{this.state.EmployeeName}</span>
                  <span>(서명)</span>
                </p>
                {/* <svg
                viewBox="0 0 500 500"
                style="position:absolute; z-index: 2; height:300px; width: 300px; "
                xmlns="http://www.w3.org/2000/svg"
              ><polyline
                  points="{String(sign)}"
                  style="fill:none;stroke:black;stroke-width:3"
                />
              </svg> */}
              </div>
            ) : this.props.location.state ? (
              <div className='flex-wrap container'>
                <h6 className='text-h4 text-ct w-100 text-bold'>표준근로계약서</h6>
                <p className='text-ct w-100'>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ Employer: e.target.value })
                    }
                  />
                  <span>
                    (이하 "사업주"라 함) 과(와)
                  </span>
                </p>
                <p className='text-ct w-100'>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ Employee: e.target.value })
                    }
                  />
                  <span>
                    (이하 "근로자"라 함) 은
                  </span>
                </p>
                <p className='text-ct w-100'>
                  다음과 같이 근로계약을 체결한다.
                </p>
                <p className='text-st w-100 text-bold text-h6'>1. 근로계약기간 :</p>
                <p className='text-ct w-100'>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ StartYear: e.target.value })
                    }
                  ></input>
                  <span>년</span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ StartMonth: e.target.value })
                    }
                  ></input>
                  <span>월</span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ StartStartDayYear: e.target.value })
                    }
                  ></input>
                  <span>일부터</span>
                </p>
                <p className='text-ct w-100'>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ EndYear: e.target.value })
                    }
                  ></input>
                  <span>년</span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ EndMonth: e.target.value })
                    }
                  ></input>
                  <span>월</span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ EndDay: e.target.value })
                    }
                  ></input>
                  <span>일까지</span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>
                  2. 근무장소 : 
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ WorkPlace: e.target.value })
                    }
                  ></input>
                </p>
                <p className='text-st w-100 text-bold text-h6'>
                  3. 업무의 내용 : 
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ WorkReference: e.target.value })
                    }
                  ></input>
                </p>
                <p className='text-st w-100 text-bold text-h6'>4. 소정근로시간 :</p>
                <p className='text-ct w-100'>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ StartTimeHour: e.target.value })
                    }
                  ></input>
                  <span>시</span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ StartTimeHMin: e.target.value })
                    }
                  ></input>
                  <span>분 ~ </span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ EndTimeHour: e.target.value })
                    }
                  ></input>
                  <span>시</span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ EndTimeHMin: e.target.value })
                    }
                  ></input>
                  <span>분까지</span>
                </p>
                <p className='text-ct w-100'>
                  <span>( 휴게시간 : </span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ BreakTimeStartHour: e.target.value })
                    }
                  ></input>
                  <span>시</span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ BreakTimeStartMin: e.target.value })
                    }
                  ></input>
                  <span>분 ~ </span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ BreakTimeEndHour: e.target.value })
                    }
                  ></input>
                  <span>시</span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ BreakTimeEndMin: e.target.value })
                    }
                  ></input>
                  <span>분 )</span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>
                  5. 근무일/휴일 : 
                </p>
                <p className='text-ct w-100'>
                  <span>매주</span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ WorkingDays: e.target.value })
                    }
                  ></input>
                  <span>일 근무,</span>
                </p>
                <p className='text-ct w-100'>
                  <span>(</span>
                  <span>주휴일 : 매주</span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ Holiday: e.target.value })
                    }
                  ></input>
                  <span>일</span>
                  <span>)</span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>6. 임금</p>
                <p className='text-st w-100'>
                  <span className='ml-20'>- 월급 : </span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ Salary: e.target.value })
                    }
                  ></input>
                  <span>원</span>
                </p>
                <p className='text-st w-100'>
                  <span className='ml-20'>- 상여금 : </span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ types1: e.target.value })
                    }
                  ></input>
                  <span>, </span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) => this.setState({ Bonus: e.target.value })}
                  ></input>
                  <span>원</span>
                </p>
                <p className='text-st w-100'>
                  <span className='ml-20'>- 기타급여(제수당 등) : </span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ types2: e.target.value })
                    }
                  ></input>
                  <span>( </span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ Bonus1: e.target.value })
                    }
                  ></input>
                  <span>원, </span>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({ Bonus2: e.target.value })
                    }
                  ></input>
                  <span>원</span>
                  <span> )</span>
                </p>
                <p>
                  <span className='ml-20'>- 급여산정기간 : </span>
                </p>
                <p>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({
                        SalaryCalculationPeriodStart: e.target.value,
                      })
                    }
                  ></input>
                  <span>일 ~ </span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({
                        SalaryCalculationPeriodEnd: e.target.value,
                      })
                    }
                  ></input>
                  <span>일</span>
                </p>
                <p>
                  <span className='ml-20'>- 임금지급일 : 매월</span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({
                        SalaryDay: e.target.value,
                      })
                    }
                  ></input>
                  <span>일 (휴일의 경우에는 전일 지급)</span>
                </p>
                <p>
                  <span className='ml-20'>- 지급방법 : </span>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ types3: e.target.value })
                    }
                  ></input>
                </p>
                <p className='text-st w-100 text-bold text-h6'>7. 연차유급휴가</p>
                <p>
                  <span className='ml-20'>
                    - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함
                  </span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>8. 사대보험 적용여부(해당란에 체크)</p>
                <p className='d-flex align-items-center'>
                  <span className='ml-20'>- 고용보험 : </span>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      this.setState({
                        SalaryCalculationPeriodEnd: e.target.value,
                      })
                    }
                  ></input>
                  <span className='ml-20'>- 산재보험 : </span>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      this.setState({
                        SalaryCalculationPeriodEnd: e.target.value,
                      })
                    }
                  ></input>
                  <span className='ml-20'>- 국민연금 : </span>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      this.setState({
                        SalaryCalculationPeriodEnd: e.target.value,
                      })
                    }
                  ></input>
                  <span className='ml-20'>- 건강보험 : </span>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      this.setState({
                        SalaryCalculationPeriodEnd: e.target.value,
                      })
                    }
                  ></input>
                </p>
                <p className='text-st w-100 text-bold text-h6'>9. 근로계약서 교부</p>
                <p>
                  <span className='ml-20'>
                    {' '}
                    - 사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여
                    근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)
                  </span>
                </p>
                <p className='text-st w-100 text-bold text-h6'>10. 기타</p>
                <p>
                  <span className='ml-20'>
                    {' '}
                    - 이 계약에 정함이 없는 사항은 근로기준법령에 의함
                  </span>
                </p>
                <p className='text-ct w-100 text-h6'>
                  <input
                    className='w-100px'
                    type="number"
                    onChange={(e) =>
                      this.setState({
                        ContractYear: e.target.value,
                      })
                    }
                  ></input>
                  <span>년</span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({
                        ContractMonth: e.target.value,
                      })
                    }
                  ></input>
                  <span>월</span>
                  <input
                    className='w-70px'
                    type="number"
                    onChange={(e) =>
                      this.setState({
                        ContractDay: e.target.value,
                      })
                    }
                  ></input>
                  <span>일</span>
                </p>
                <p className='w-100 text-bold text-h6'>(사업주)</p>
                <p className='w-100'>
                  <span className='ml-20'>사업체명: </span>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({
                        BusinessName: e.target.value,
                      })
                    }
                  />
                </p>
                <p className='w-100'>
                  <span className='ml-20'>전화번호 : </span>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({
                        BusinessPhone: e.target.value,
                      })
                    }
                  />
                </p>
                <p className='w-100'>
                  <span className='ml-20'>주 소 : </span>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({
                        BusinessAddress: e.target.value,
                      })
                    }
                  />
                </p>
                <p className='w-100'>
                  <span className='ml-20'>대표자 : </span>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({
                        BusinessOwner1: e.target.value,
                      })
                    }
                  />
                </p>
                <p className='w-100'>
                  <span className='w-100 text-bold text-h6'>(근로자)</span>
                </p>
                <p className='w-100'>
                  <span className='ml-20'>주 소 : </span>
                  <input
                    type="text"
                    placeholder="사용자가 입력하는 칸입니다."
                  />
                </p>
                <p className='w-100'>
                  <span className='ml-20'>연락처 : </span>
                  <input
                    type="text"
                    placeholder="사용자가 입력하는 칸입니다."
                  />
                </p>
                <p className='w-100'>
                  <span className='ml-20'>성 명 : </span>
                  <input
                    type="text"
                    placeholder="사용자가 입력하는 칸입니다."
                  />
                </p>
                <p>
                  {/* <input type="button">저장하기</input> */}
                </p>
              </div>
            ) : (
              <div></div>
            )}
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

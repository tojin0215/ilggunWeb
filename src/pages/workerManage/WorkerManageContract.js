import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import WorkerContract from './WorkerContract';
import Menu from '../../components/Navigation/Menu';
import { selectBusinessByName, selectContractform } from '../../action/api';
import { PDFDownloadLink } from '@react-pdf/renderer';

import '../../styles/home/home.css';

class WorkerManageContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bangcode: '',
      types1: 0,
      types2: 0,
      types3: 0,
      types4: [],
      value1: 0,
      value1Index: 0,
      value2: 0,
      value2Index: 0,
      value3: 0,
      value3Index: 0,
      Employer: 0,
      Employee: 0,
      StartYear: 0,
      StartMonth: 0,
      StartDay: 0,
      EndYear: 0,
      EndMonth: 0,
      EndDay: 0,
      WorkReference: 0,
      StartTimeHour: 0,
      StartTimeHMin: 0,
      EndTimeHMin: 0,
      BreakTimeStartMin: 0,
      BreakTimeEndHour: 0,
      BreakTimeEndMin: 0,
      Salary: 0,
      Bonus: 0,
      Bonus2: 0,
      Bonus3: 0,
      Bonus4: 0,
      SalaryDay: 0,
      WorkPlace: 0,
      Holiday: 0,
      EndTimeHour: 0,
      WorkingDays: 0,
      ContractYear: 0,
      ContractMonth: 0,
      ContractDay: 0,
      BusinessName: 0,
      BusinessAddress: 0,
      BusinessPhone: 0,
      BusinessOwner1: 0,
      EmployeePhone: 0,
      EmployeeName: 0,
      Employer: 0,
      Employee: 0,
      StartYear: 0,
      StartMonth: 0,
      StartDay: 0,
      EndYear: 0,
      EndMonth: 0,
      EndDay: 0,
      WorkReference: 0,
      StartTimeHour: 0,
      StartTimeHMin: 0,
      EndTimeHMin: 0,
      BreakTimeStartMin: 0,
      BreakTimeEndHour: 0,
      BreakTimeEndMin: 0,
      Salary: 0,
      Bonus: 0,
      Bonus2: 0,
      Bonus3: 0,
      Bonus4: 0,
      SalaryDay: 0,
      WorkPlace: 0,
      Holiday: 0,
      EndTimeHour: 0,
      WorkingDays: 0,
      ContractYear: 0,
      ContractMonth: 0,
      ContractDay: 0,
      BusinessName: 0,
      BusinessAddress: 0,
      BusinessPhone: 0,
      BusinessOwner1: 0,
      EmployeeAddress: 0,
      EmployeePhone: 0,
      EmployeeName: 0,
      type: 1,
      htmlContent: '',
      tableHead: ['', '시작시간', '마치는시간', '근무시간'],
      tableTitle: ['월', '화', '수', '목', '금', '토', '일'],
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
              <button>프린트</button>
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
                          this.setState({ StartStartDayYear: e.target.value })
                        }
                        value={this.state.StartStartDayYear}
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
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ types1: e.target.value })
                        }
                        value={this.state.types1}
                      ></input>
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
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ types2: e.target.value })
                        }
                        value={this.state.types2}
                      ></input>
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
                      <span>(휴일의 경우에는 전일 지급)</span>
                    </p>
                    <p>
                      <span>-지급방법 : </span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ types3: e.target.value })
                        }
                        value={this.state.types3}
                      ></input>
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
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            SalaryCalculationPeriodEnd: e.target.value,
                          })
                        }
                        value={this.state.SalaryCalculationPeriodEnd}
                      ></input>
                      <span>산재보험:</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            SalaryCalculationPeriodEnd: e.target.value,
                          })
                        }
                        value={this.state.SalaryCalculationPeriodEnd}
                      ></input>
                      <span>국민연금:</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            SalaryCalculationPeriodEnd: e.target.value,
                          })
                        }
                        value={this.state.SalaryCalculationPeriodEnd}
                      ></input>
                      <span>건강보험:</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({
                            SalaryCalculationPeriodEnd: e.target.value,
                          })
                        }
                        value={this.state.SalaryCalculationPeriodEnd}
                      ></input>
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
            {this.props.location.state.worker.state == 2 ? (
              <div>
                <span>표준근로계약서</span>
                <div>
                  <hr />
                  <br />
                  <span class="text_underline">{this.state.Employer}</span>
                  <span>(이하 "사업주"라 함) 과(와)</span>
                  <span class="text_underline">{this.state.Employee}</span>
                  <span>
                    (이하 "근로자"라 함) 은 다음과 같이 근로계약을 체결한다.
                  </span>
                  <br />
                  <br />
                  <span>1. 근로계약기간 :</span>
                  <span class="text_underline">{this.state.StartYear}</span>
                  <span>년</span>
                  <span class="text_underline">{this.state.StartMonth}</span>
                  <span>월</span>
                  <span class="text_underline">{this.state.StartDay}</span>
                  <span>일부터</span>
                  <span class="text_underline">
                    {this.state.EndYear == null ? '-' : this.state.EndYear}
                  </span>
                  <span>년</span>
                  <span class="text_underline">
                    {this.state.EndMonth == null ? '-' : this.state.EndMonth}
                  </span>
                  <span>월</span>
                  <span class="text_underline">
                    {this.state.EndDay == null ? '-' : this.state.EndDay}
                  </span>
                  <span>일까지</span>
                  <br />
                  <span>2. 근 무 장 소 : </span>
                  <span>{this.state.WorkPlace}</span>
                  <br />
                  <span>3. 업무의 내용 : </span>
                  <span>{this.state.WorkReference}</span>
                  <br />
                  <span>4. 소정근로시간 :</span>
                  <span class="text_underline">{this.state.StartTimeHour}</span>
                  <span>시</span>
                  <span class="text_underline">{this.state.StartTimeHMin}</span>
                  <span>분부터 </span>
                  <span class="text_underline">{this.state.EndTimeHour}</span>
                  <span>시</span>
                  <span class="text_underline">{this.state.EndTimeHMin}</span>
                  <span>분까지</span>
                  <span>(휴게시간 : </span>
                  <span class="text_underline">
                    {this.state.BreakTimeStartHour}
                  </span>
                  <span>시</span>
                  <span class="text_underline">
                    {this.state.BreakTimeStartMin}
                  </span>
                  <span>분~</span>
                  <span class="text_underline">
                    {this.state.BreakTimeEndHour}
                  </span>
                  <span>시</span>
                  <span class="text_underline">
                    {this.state.BreakTimeEndMin}
                  </span>
                  <span>분)</span>
                  <br />
                  <span>5. 근무일/휴일 : 매주</span>
                  <span class="text_underline">{this.state.WorkingDays}</span>
                  <span>일(또는 매일단위)근무, 주휴일 매주</span>
                  <span class="text_underline">{this.state.Holiday}</span>
                  <span>일</span>
                  <br />
                  <span>6. 임 금</span>
                  <br />
                  <span class="margin_left">- 월(일, 시간)급 : </span>
                  <span class="text_underline">{this.state.Salary}</span>
                  <span>원</span>
                  <br />
                  <span class="margin_left">- 상여금 : </span>
                  <span for="bonusYes">{this.state.types1}</span>
                  <span class="text_underline">{this.state.Bonus}</span>
                  <span>원</span>
                  <br />
                  <span class="margin_left">- 기타급여(제수당 등) : </span>
                  <span for="bonus2Yes">{this.state.types2}</span>
                  <br />
                  <span class="text_underline_margin_left">
                    {this.state.Bonus1}
                  </span>
                  <span>원, </span>
                  <span class="text_underline_margin_left">
                    {this.state.Bonus2}
                  </span>
                  <span>원, </span>
                  <span class="text_underline_margin_left">
                    {this.state.Bonus3}
                  </span>
                  <span>원, </span>
                  <span class="text_underline_margin_left">
                    {this.state.Bonus4}
                  </span>
                  <span>원 </span>
                  <br />
                  <span class="margin_left">- 급여산정기간 :</span>
                  <span class="text_underline">
                    {this.state.SalaryCalculationPeriodStart}
                  </span>
                  <span>일~</span>
                  <span class="text_underline">
                    {this.state.SalaryCalculationPeriodEnd}
                  </span>
                  <span>일</span>
                  <br />
                  <span class="margin_left">- 임금지급일 : 매월</span>
                  <span class="text_underline">{this.state.SalaryDay}</span>
                  <span>일 (휴일의 경우에는 전일 지급)</span>
                  <br />
                  <span class="margin_left">- 지급방법 : </span>
                  <span for="wayOfPayment1">{this.state.types3}</span>
                  <br />
                  <span>7. 연차유급휴가</span>
                  <br />
                  <span class="margin_left">
                    {' '}
                    - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함.
                  </span>
                  <br />
                  <span>8. 사대보험 적용여부(해당란에 체크)</span> <br />
                  <span class="margin_left">
                    고용보험 {this.state.types4[1] == 1 ? 'O' : 'X'}
                  </span>
                  <span class="margin_left">
                    산재보험 {this.state.types4[2] == 1 ? 'O' : 'X'}
                  </span>
                  <span class="margin_left">
                    국민연금 {this.state.types4[3] == 1 ? 'O' : 'X'}
                  </span>
                  <span class="margin_left">
                    건강보험 {this.state.types4[4] == 1 ? 'O' : 'X'}
                  </span>
                  <br />
                  <span>9. 근로계약서 교부</span> <br />
                  <span class="margin_left">
                    {' '}
                    - '사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여
                    근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법
                    제17조 이행)
                  </span>
                  <br />
                  <span>10. 기타</span>
                  <br />
                  <span class="margin_left">
                    {' '}
                    - 이 계약에 정함이 없는 사항은 근로기준법령에 의함
                  </span>
                  <br />
                  <br />
                  <div class="contract_day">
                    <span>{this.state.ContractYear}</span>
                    <span>년</span>
                    <span>{this.state.ContractMonth}</span>
                    <span>월</span>
                    <span>{this.state.ContractDay}</span>
                    <span>일</span>
                  </div>
                  <br />
                  <span>(사업주)</span>
                  <span>사업체명 : </span>
                  <span>{this.state.BusinessName}</span>
                  <span class="margin_left2">(전 화 : </span>
                  <span>{this.state.BusinessPhone}</span>
                  <span>) </span>
                  <br />
                  <span class="margin_left2">주 소 : </span>
                  <span>{this.state.BusinessAddress}</span>
                  <br />
                  <span class="margin_left2">대 표 자 : </span>
                  <span>{this.state.BusinessOwner1}</span>
                  <span class="margin_left2">
                    (서명){this.state.signOrStamp}
                  </span>
                  <br />
                  <br />
                  <br />
                  <br />
                  <span>(근로자)</span>
                  <span>주 소 : </span>
                  <span>{this.state.EmployeeAddress}</span>
                  <br />
                  <span class="margin_left2">연 락 처 : </span>
                  <span>{this.state.EmployeePhone}</span>
                  <br />
                  <span class="margin_left2">성 명 : </span>
                  <span>{this.state.EmployeeName} </span>
                  {/* <svg
                  viewBox="0 0 500 500"
                  style="position:absolute; z-index: 2; height:300px; width: 300px; "
                  xmlns="http://www.w3.org/2000/svg"
                ><polyline
                    points="{String(sign)}"
                    style="fill:none;stroke:black;stroke-width:3"
                  />
                </svg> */}
                  <span class="margin_left2">(서명)</span>
                </div>
              </div>
            ) : this.props.location.state ? (
              <div>
                <span>근로자가 확인하고 있습니다.</span>
                <p>
                  <p>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ Employer: e.target.value })
                      }
                    ></input>
                    <span>(이하 "사업주"라 함) 과(와)</span>
                  </p>
                  <p>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ Employee: e.target.value })
                      }
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
                    ></input>
                    <span>년</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ StartMonth: e.target.value })
                      }
                    ></input>
                    <span>월</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ StartStartDayYear: e.target.value })
                      }
                    ></input>
                    <span>일부터</span>
                  </p>
                  <p>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ EndYear: e.target.value })
                      }
                    ></input>
                    <span>년</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ EndMonth: e.target.value })
                      }
                    ></input>
                    <span>월</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ EndDay: e.target.value })
                      }
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
                    ></input>
                    <span>시</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ StartTimeHMin: e.target.value })
                      }
                    ></input>
                    <span>분 ~ </span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ EndTimeHour: e.target.value })
                      }
                    ></input>
                    <span>시</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ EndTimeHMin: e.target.value })
                      }
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
                    ></input>
                    <span>시</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ BreakTimeStartMin: e.target.value })
                      }
                    ></input>
                    <span>분 ~ </span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ BreakTimeEndHour: e.target.value })
                      }
                    ></input>
                    <span>시</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ BreakTimeEndMin: e.target.value })
                      }
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
                    ></input>
                    <span>원</span>
                  </p>
                  <p>
                    <span>-상여금 : </span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ types1: e.target.value })
                      }
                    ></input>
                    <span>, </span>
                    <input
                      type="text"
                      onChange={(e) => this.setState({ Bonus: e.target.value })}
                    ></input>
                    <span>원</span>
                  </p>
                  <p>
                    <span>-기타급여(제수당 등) : </span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ types2: e.target.value })
                      }
                    ></input>
                  </p>
                  <p>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ Bonus1: e.target.value })
                      }
                    ></input>
                    <span>원, </span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ Bonus2: e.target.value })
                      }
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
                    ></input>
                    <span>일 ~ </span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({
                          SalaryCalculationPeriodEnd: e.target.value,
                        })
                      }
                    ></input>
                    <span>일</span>
                  </p>
                  <p>
                    <span>(휴일의 경우에는 전일 지급)</span>
                  </p>
                  <p>
                    <span>-지급방법 : </span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ types3: e.target.value })
                      }
                    ></input>
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
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({
                          SalaryCalculationPeriodEnd: e.target.value,
                        })
                      }
                    ></input>
                    <span>산재보험:</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({
                          SalaryCalculationPeriodEnd: e.target.value,
                        })
                      }
                    ></input>
                    <span>국민연금:</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({
                          SalaryCalculationPeriodEnd: e.target.value,
                        })
                      }
                    ></input>
                    <span>건강보험:</span>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({
                          SalaryCalculationPeriodEnd: e.target.value,
                        })
                      }
                    ></input>
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
                  ></input>
                  <span>년</span>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({
                        ContractMonth: e.target.value,
                      })
                    }
                  ></input>
                  <span>월</span>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({
                        ContractDay: e.target.value,
                      })
                    }
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

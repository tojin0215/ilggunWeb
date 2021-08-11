import { Component } from 'react';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({ family: "Nanum Gothic", src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf", });

// Create styles
const styles = StyleSheet.create({
    page: {
    //   flexDirection: 'row',
    //   backgroundColor: '#E4E4E4'
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    text: {
        fontFamily: 'Nanum Gothic'
    }
  });

class WorkerContract extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numPages: null,
            pageNumber: 1,
            forDownload: false,
            types4: [1,1,1,1],
            contract: props.contract
        }
    }

    n = () => (!this.props.forDownload)?<br />:"\n"
    // n = () => (!this.props.forDownload)?<br />:<br />

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({numPages: numPages});
    }

    renderPDF = () => {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                <Text style={styles.text}>표준근로계약서{this.n()}
                    {this.n()}
                    {this.state.contract.Employer}(이하 "사업주"라 함) 과(와){this.state.contract.Employee}(이하 "근로자"라 함) 은 다음과 같이 근로계약을 체결한다.
                    {this.n()}
                    </Text>
                    
                    <Text style={styles.text}>
                        1. 근로계약기간 : {this.state.contract.StartYear}년 {this.state.contract.StartYear}월 {this.state.contract.StartYear}부터
                        {this.state.contract.EndYear==null?'-':this.state.contract.EndYear}년 {this.state.contract.EndMonth==null?'-':this.state.contract.EndMonth}월 {this.state.contract.EndDay==null?'-':this.state.contract.EndDay}일까지
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    2. 근 무 장 소 : {this.state.contract.WorkPlace}
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    3. 업무의 내용 : {this.state.contract.WorkReference}
                        {this.n()}
                    </Text>
                    <Text style={styles.text}>
                    4. 소정근로시간 :{this.state.contract.StartTimeHour}시 {this.state.contract.StartTimeHMin}분부터 {this.state.contract.EndTimeHour}시 {this.state.contract.EndTimeHMin}분까지
                    (휴게시간: {this.state.contract.BreakTimeStartHour}시 {this.state.contract.BreakTimeStartMin}분 ~ {this.state.contract.BreakTimeEndHour}시 {this.state.contract.BreakTimeEndMin}분)
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    5. 근무일/휴일 : 매주 {this.state.contract.WorkingDays}일(또는 매일단위)근무, 주휴일 매주 {this.state.contract.Holiday}일
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    6. 임 금
                        {this.n()}
                        - 월급 : {this.state.contract.Salary}원
                        {this.n()}
                        - 상여금 : {this.state.contract.types1} {this.state.contract.Bonus}원
                        {this.n()}
                        - 기타급여(제수당 등) : {this.state.contract.Bonus1}원, {this.state.contract.Bonus2}원, {this.state.contract.Bonus3}원, {this.state.contract.Bonus4}원
                        {this.n()}
                        - 급여산정기간 : {this.state.contract.SalaryCalculationPeriodStart}일 ~ {this.state.contract.SalaryCalculationPeriodEnd}일
                        {this.n()}
                        - 임금지급일 : 매월 10일 (휴일의 경우에는 전일 지급) 
                        {this.n()}
                        - 지급방법 : {this.state.contract.types3}
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    7. 연차유급휴가
                        {this.n()}
                         - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함.
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    8. 사대보험 적용여부(해당란에 체크)
                        {this.n()}
                        고용보험 {this.state.contract.types4[1]==1?'O':'X'}
                        {this.n()}
                        산재보험 {this.state.contract.types4[2]==1?'O':'X'}
                        {this.n()}
                        국민연금 {this.state.contract.types4[3]==1?'O':'X'}
                        {this.n()}
                        건강보험 {this.state.contract.types4[4]==1?'O':'X'}
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    9. 근로계약서 교부
                        {this.n()}
                        - '사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법 제17조 이행)
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    10. 기타
                        {this.n()}
                        - 이 계약에 정함이 없는 사항은 근로기준법령에 의함
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    {this.state.contract.ContractYear}년 {this.state.contract.ContractMonth}월 {this.state.contract.ContractDay}일
                        {this.n()}
                        </Text>
                    <Text style={styles.text}>
                    (사업주) 사업체명 : {this.state.contract.BusinessName} (전 화 : {this.state.contract.BusinessPhone}) 
                        {this.n()}
                        주    소 : {this.state.contract.BusinessAddress}
                        {this.n()}
                        대 표 자 : {this.state.contract.BusinessOwner1} (서명) {this.state.contract.signOrStamp}
                        {this.n()}
                        </Text>
                        
                    <Text style={styles.text}>
                    (근로자) 주 소 : {this.state.contract.EmployeeAddress}
                        {this.n()}
                        연 락 처 : {this.state.contract.EmployeePhone}
                        {this.n()}
                        성    명 : {this.state.contract.EmployeeName} (서명) {this.state.contract.signOrStamp}
                        {this.n()}
                        </Text>
                </Page>
              </Document>
        )
    }

    render() {
        return this.renderPDF();
        return (
            <div>
              <Document
                file="somefile.pdf"
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                    <Text>Section #1</Text>
                    </View>
                    <View style={styles.section}>
                    <Text>Section #2</Text>
                    </View>
                </Page>
              </Document>
              <p>Page {this.state.contract.pageNumber} of {this.state.contract.numPages}</p>
            </div>
          );
    }
  }
  
const WorkerContractStateToProps = (state) => {
    return {
      userinfo: state.authentication.userinfo,
    };
  };

// export default connect(WorkerContractStateToProps, null)(WorkerContract);
export default WorkerContract;
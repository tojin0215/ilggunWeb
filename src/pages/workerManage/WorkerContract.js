import { Component } from 'react';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { PC, Mobile } from '../../components/MediaQuery';

Font.register({
  family: 'Nanum Gothic',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf',
      fontStyle: 'normal',
      fontWeight: 'medium',
    },
    {
      src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Bold.ttf',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    {
      src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf',
      fontStyle: 'normal',
      fontWeight: '900',
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Nanum Gothic',
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
    flexGrow: 1,
  },
  text: {
    fontFamily: 'Nanum Gothic',
    fontWeight: 'medium',
  },
});

class WorkerContract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
      forDownload: false,
      types4: [1, 1, 1, 1],
      contract: props.contract,
    };
  }

  n = () => (!this.props.forDownload ? <br /> : '\n');
  // n = () => (!this.props.forDownload)?<br />:<br />

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages: numPages });
  };

  render = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '25px',
              margin: '15px',
            }}
          >
            <View
              className="container sectionShadow"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                paddingHorizontal: '25px',
              }}
            >
              <Text
                className="text-h4 text-ct w-100 text-bold p-2"
                style={{
                  fontSize: '34px',
                  textAlign: 'center',
                  width: '100%',
                  fontWeight: 'bold',
                  padding: '5px',
                  marginBottom: '15px',
                }}
              >
                ?????????????????????
              </Text>
              <Text
                className="text-ct w-100"
                style={{
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <Text className="text-bold" style={{ fontWeight: 'bold' }}>
                  {this.state.contract.Employer}
                </Text>
                <Text style={styles.mainText}>(?????? "?????????"??? ???) ???(???)</Text>
              </Text>
              <Text
                className="text-ct w-100"
                style={{ textAlign: 'center', width: '100%' }}
              >
                <Text className="text-bold" style={{ fontWeight: 'bold' }}>
                  {this.state.contract.Employee}
                </Text>
                <Text>(?????? "?????????"??? ???) ???</Text>
              </Text>
              <Text
                className="text-ct w-100"
                style={{ textAlign: 'center', width: '100%' }}
              >
                ????????? ?????? ??????????????? ????????????.
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                1. ?????????????????? :
              </Text>
              <Text style={{ textAlign: 'center', width: '100%' }}>
                <Text>{this.state.contract.StartYear}</Text>
                <Text>???</Text>
                <Text>{this.state.contract.StartMonth}</Text>
                <Text>???</Text>
                <Text>{this.state.contract.StartDay}</Text>
                <Text>?????????</Text>
              </Text>
              <Text style={{ textAlign: 'center', width: '100%' }}>
                <Text>
                  {this.state.contract.EndYear == null
                    ? '-'
                    : this.state.contract.EndYear}
                </Text>
                <Text>???</Text>
                <Text>
                  {this.state.contract.EndMonth == null
                    ? '-'
                    : this.state.contract.EndMonth}
                </Text>
                <Text>???</Text>
                <Text>
                  {this.state.contract.EndDay == null
                    ? '-'
                    : this.state.contract.EndDay}
                </Text>
                <Text>?????????</Text>
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                2. ?????? ?????? :
                <Text style={{ fontWeight: 'medium' }}>
                  {this.state.contract.WorkPlace}
                </Text>
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                3. ????????? ?????? :
                <Text style={{ fontWeight: 'medium' }}>
                  {this.state.contract.WorkReference}
                </Text>
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                4. ?????????????????? :
              </Text>
              <Text style={{ textAlign: 'center', width: '100%' }}>
                <Text>{this.state.contract.StartTimeHour}</Text>
                <Text>???</Text>
                <Text>{this.state.contract.StartTimeHMin}</Text>
                <Text>????????? </Text>
                <Text>{this.state.contract.EndTimeHour}</Text>
                <Text>???</Text>
                <Text>{this.state.contract.EndTimeHMin}</Text>
                <Text>?????????</Text>
              </Text>
              <Text
                className="text-ct w-100"
                style={{ textAlign: 'center', width: '100%' }}
              >
                <Text>( ???????????? : </Text>
                <Text>{this.state.contract.BreakTimeStartHour}</Text>
                <Text>???</Text>
                <Text>{this.state.contract.BreakTimeStartMin}</Text>
                <Text>??? ~ </Text>
                <Text>{this.state.contract.BreakTimeEndHour}</Text>
                <Text>???</Text>
                <Text>{this.state.contract.BreakTimeEndMin}</Text>
                <Text>??? )</Text>
              </Text>
              <Text
                className="text-st w-100 text-bold text-h6"
                style={{
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                5. ?????????/?????? :
              </Text>
              <Text
                className="text-ct w-100"
                style={{ textAlign: 'left', width: '100%' }}
              >
                <Text>?????? {this.state.contract.WorkingDays}</Text>
                <Text>???(?????? ????????????)??????</Text>
              </Text>
              <Text
                className="text-ct w-100"
                style={{ textAlign: 'left', width: '100%' }}
              >
                <Text>(</Text>
                <Text>????????? : ??????</Text>
                <Text>{this.state.contract.Holiday}</Text>
                <Text>???</Text>
                <Text>)</Text>
              </Text>
              <Text
                className="text-st w-100 text-bold text-h6"
                style={{
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                6. ??? ???
              </Text>
              <Text
                className="text-st w-100"
                style={{ textAlign: 'left', width: '100%' }}
              >
                <Text>- ???(???, ??????)??? : </Text>
                <Text>{this.state.contract.Salary}</Text>
                <Text>???</Text>
              </Text>
              <Text
                className="text-st w-100"
                style={{ textAlign: 'left', width: '100%' }}
              >
                <Text>- ????????? : </Text>
                <Text>{this.state.contract.types1.toString()}</Text>
                <Text>({this.state.contract.Bonus}</Text>
                <Text>???)</Text>
              </Text>
              <Text
                className="text-st w-100"
                style={{ textAlign: 'center', width: '100%' }}
              >
                <Text>- ????????????(????????? ???) : </Text>
                <Text for="bonus2Yes">
                  {this.state.contract.types2.toString()}
                </Text>
                <Text>(</Text>
                <Text>{this.state.contract.Bonus1}</Text>
                <Text>???, </Text>
                <Text>{this.state.contract.Bonus2}</Text>
                <Text>???, </Text>
                <Text>{this.state.contract.Bonus3}</Text>
                <Text>???, </Text>
                <Text>{this.state.contract.Bonus4}</Text>
                <Text>??? </Text>
                <Text>)</Text>
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text className="">- ?????????????????? :</Text>
                <Text>
                  {this.state.SalaryCalculationPeriodStart
                    ? this.state.SalaryCalculationPeriodStart.toString()
                    : null}
                </Text>
                <Text>??? ~ </Text>
                <Text>
                  {this.state.SalaryCalculationPeriodEnd
                    ? this.state.SalaryCalculationPeriodEnd.toString()
                    : null}
                </Text>
                <Text>???</Text>
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text className="">- ??????????????? : ??????</Text>
                <Text>{this.state.contract.SalaryDay.toString()}</Text>
                <Text>??? (????????? ???????????? ?????? ??????)</Text>
              </Text>
              <Text>
                <Text className="">- ???????????? : </Text>
                <Text for="wayOfPayment1">
                  {this.state.contract.types3.toString()}
                </Text>
              </Text>
              <Text
                className="text-st w-100 text-bold text-h6"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                7. ??????????????????
              </Text>
              <Text className="">
                {' '}
                - ????????????????????? ????????????????????? ????????? ?????? ?????? ?????????.
              </Text>
              <Text
                className="text-st w-100 text-bold text-h6"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                8. ???????????? ????????????
              </Text>
              <PC>
                <Text
                  className="d-flex align-items-center"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Text className="">
                    - ???????????? :{' '}
                    {this.state.contract.types4[1] == 1 ? 'O' : 'X'}
                  </Text>
                  <Text className="">
                    - ???????????? :{' '}
                    {this.state.contract.types4[2] == 1 ? 'O' : 'X'}
                  </Text>
                  <Text className="">
                    - ???????????? :{' '}
                    {this.state.contract.types4[3] == 1 ? 'O' : 'X'}
                  </Text>
                  <Text className="">
                    - ???????????? :{' '}
                    {this.state.contract.types4[4] == 1 ? 'O' : 'X'}
                  </Text>
                </Text>
              </PC>
              <Mobile>
                <Text
                  className="d-flex align-items-center flex-col"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Text className="">
                    - ???????????? :{' '}
                    {this.state.contract.types4[1] == 1 ? 'O' : 'X'}
                  </Text>
                  <Text className="">
                    - ???????????? :{' '}
                    {this.state.contract.types4[2] == 1 ? 'O' : 'X'}
                  </Text>
                  <Text className="">
                    - ???????????? :{' '}
                    {this.state.contract.types4[3] == 1 ? 'O' : 'X'}
                  </Text>
                  <Text className="">
                    - ???????????? :{' '}
                    {this.state.contract.types4[4] == 1 ? 'O' : 'X'}
                  </Text>
                </Text>
              </Mobile>
              <Text
                className="text-st w-100 text-bold text-h6"
                style={{
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                9. ??????????????? ??????
              </Text>
              <Text>
                <Text className="">
                  {' '}
                  - '?????????'??? ??????????????? ???????????? ????????? ??? ???????????? ????????????
                  ???????????? ??????????????? ???????????? '?????????'?????? ?????????(???????????????
                  ???17??? ??????)
                </Text>
              </Text>
              <Text
                className="text-st w-100 text-bold text-h6"
                style={{
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                10. ??????
              </Text>
              <Text>
                <Text className="">
                  {' '}
                  - ??? ????????? ????????? ?????? ????????? ????????????????????? ??????
                </Text>
              </Text>
              <Text
                className="text-ct w-100 py-5"
                style={{
                  textAlign: 'center',
                  width: '100%',
                  paddingVertical: '5px',
                }}
              >
                <Text className="text-h5" style={{ fontSize: '26px' }}>
                  {this.state.contract.ContractYear}
                </Text>
                <Text className="text-h5" style={{ fontSize: '26px' }}>
                  ???
                </Text>
                <Text className="text-h5" style={{ fontSize: '26px' }}>
                  {this.state.contract.ContractMonth}
                </Text>
                <Text className="text-h5" style={{ fontSize: '26px' }}>
                  ???
                </Text>
                <Text className="text-h5" style={{ fontSize: '26px' }}>
                  {this.state.contract.ContractDay}
                </Text>
                <Text className="text-h5" style={{ fontSize: '26px' }}>
                  ???
                </Text>
              </Text>
              <Text
                className="w-100 text-bold text-h6"
                style={{ width: '100%', fontWeight: 'bold', fontSize: '20px' }}
              >
                (?????????)
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text className="">???????????? : </Text>
                <Text>{this.state.contract.BusinessName}</Text>
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text className="">????????? : </Text>
                <Text>{this.state.contract.BusinessPhone}</Text>
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text className="">??? ??? : </Text>
                <Text>{this.state.contract.BusinessAddress}</Text>
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text className="">??? ??? ??? : </Text>
                <Text>{this.state.contract.BusinessOwner1}</Text>
                <Text>(??????){/* this.state.signOrStamp */}</Text>
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text
                  className="w-100 text-bold text-h6"
                  style={{
                    width: '100%',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  (?????????)
                </Text>
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text className="">??? ??? : </Text>
                <Text>{this.state.contract.EmployeeAddress}</Text>
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text className="">??? ??? ??? : </Text>
                <Text>{this.state.contract.EmployeePhone}</Text>
              </Text>
              <Text className="w-100" style={{ width: '100%' }}>
                <Text className="">??? ??? : </Text>
                <Text>{this.state.contract.EmployeeName}</Text>
                <Text>(??????)</Text>
              </Text>
              {/* <svg
                    viewBox="0 0 500 500"
                    style="position:absolute; z-index: 2; height:300px; width: 300px; "
                    xmlns="http://www.w3.org/2000/svg"
                    ><polyline
                        points="{String(sign)}"
                        style="fill:none;stroke:black;stroke-width:3"
                    />
                    </svg> */}
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  //   renderPDF = () => {
  //     return (
  //       <Document>
  //         <Page size="A4" style={styles.page}>
  //           <Text style={styles.text}>
  //             ?????????????????????{this.n()}
  //             {this.n()}
  //             {this.state.contract.Employer}(?????? "?????????"??? ???) ???(???)
  //             {this.state.contract.Employee}(?????? "?????????"??? ???) ??? ????????? ??????
  //             ??????????????? ????????????.
  //             {this.n()}
  //           </Text>

  //           <Text style={styles.text}>
  //             1. ?????????????????? : {this.state.contract.StartYear}???{' '}
  //             {this.state.contract.StartYear}??? {this.state.contract.StartYear}
  //             ??????
  //             {this.state.contract.EndYear == null
  //               ? '-'
  //               : this.state.contract.EndYear}
  //             ???{' '}
  //             {this.state.contract.EndMonth == null
  //               ? '-'
  //               : this.state.contract.EndMonth}
  //             ???{' '}
  //             {this.state.contract.EndDay == null
  //               ? '-'
  //               : this.state.contract.EndDay}
  //             ?????????
  //             {this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             2. ??? ??? ??? ??? : {this.state.contract.WorkPlace}
  //             {this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             3. ????????? ?????? : {this.state.contract.WorkReference}
  //             {this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             4. ?????????????????? :{this.state.contract.StartTimeHour}???{' '}
  //             {this.state.contract.StartTimeHMin}?????????{' '}
  //             {this.state.contract.EndTimeHour}???{' '}
  //             {this.state.contract.EndTimeHMin}????????? (????????????:{' '}
  //             {this.state.contract.BreakTimeStartHour}???{' '}
  //             {this.state.contract.BreakTimeStartMin}??? ~{' '}
  //             {this.state.contract.BreakTimeEndHour}???{' '}
  //             {this.state.contract.BreakTimeEndMin}???)
  //             {this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             5. ?????????/?????? : ?????? {this.state.contract.WorkingDays}???(??????
  //             ????????????)??????, ????????? ?????? {this.state.contract.Holiday}???{this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             6. ??? ???{this.n()}- ?????? : {this.state.contract.Salary}???{this.n()}-
  //             ????????? : {this.state.contract.types1} {this.state.contract.Bonus}???
  //             {this.n()}- ????????????(????????? ???) : {this.state.contract.Bonus1}???,{' '}
  //             {this.state.contract.Bonus2}???, {this.state.contract.Bonus3}???,{' '}
  //             {this.state.contract.Bonus4}???{this.n()}- ?????????????????? :{' '}
  //             {this.state.contract.SalaryCalculationPeriodStart}??? ~{' '}
  //             {this.state.contract.SalaryCalculationPeriodEnd}???{this.n()}-
  //             ??????????????? : ?????? 10??? (????????? ???????????? ?????? ??????)
  //             {this.n()}- ???????????? : {this.state.contract.types3}
  //             {this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             7. ??????????????????
  //             {this.n()}- ????????????????????? ????????????????????? ????????? ?????? ?????? ?????????.
  //             {this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             8. ???????????? ????????????(???????????? ??????)
  //             {this.n()}
  //             ???????????? {this.state.contract.types4[1] == 1 ? 'O' : 'X'}
  //             {this.n()}
  //             ???????????? {this.state.contract.types4[2] == 1 ? 'O' : 'X'}
  //             {this.n()}
  //             ???????????? {this.state.contract.types4[3] == 1 ? 'O' : 'X'}
  //             {this.n()}
  //             ???????????? {this.state.contract.types4[4] == 1 ? 'O' : 'X'}
  //             {this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             9. ??????????????? ??????
  //             {this.n()}- '?????????'??? ??????????????? ???????????? ????????? ??? ????????????
  //             ???????????? ???????????? ??????????????? ???????????? '?????????'?????? ?????????(???????????????
  //             ???17??? ??????)
  //             {this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             10. ??????
  //             {this.n()}- ??? ????????? ????????? ?????? ????????? ????????????????????? ??????
  //             {this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             {this.state.contract.ContractYear}???{' '}
  //             {this.state.contract.ContractMonth}???{' '}
  //             {this.state.contract.ContractDay}???{this.n()}
  //           </Text>
  //           <Text style={styles.text}>
  //             (?????????) ???????????? : {this.state.contract.BusinessName} (??? ??? :{' '}
  //             {this.state.contract.BusinessPhone}){this.n()}??? ??? :{' '}
  //             {this.state.contract.BusinessAddress}
  //             {this.n()}??? ??? ??? : {this.state.contract.BusinessOwner1} (??????){' '}
  //             {this.state.contract.signOrStamp}
  //             {this.n()}
  //           </Text>

  //           <Text style={styles.text}>
  //             (?????????) ??? ??? : {this.state.contract.EmployeeAddress}
  //             {this.n()}??? ??? ??? : {this.state.contract.EmployeePhone}
  //             {this.n()}??? ??? : {this.state.contract.EmployeeName} (??????){' '}
  //             {this.state.contract.signOrStamp}
  //             {this.n()}
  //           </Text>
  //         </Page>
  //       </Document>
  //     );
  //   };

  renderTemp() {
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
        <Text>
          Page {this.state.contract.pageNumber} of{' '}
          {this.state.contract.numPages}
        </Text>
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

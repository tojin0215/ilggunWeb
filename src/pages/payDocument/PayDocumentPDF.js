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
  src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf',
});

// Create styles
const styles = StyleSheet.create({
  document: {
    // display: "flex",
    // "flex-direction": "row"
  },
  page: {
    fontFamily: 'Nanum Gothic',
    // backgroundColor: '#E4E4E4',
    // display: 'flex',
    // flexDirection: 'column',
  },
  header: {
    backgroundColor: '#EFEFEF',
    flexGrow: 1,
  },
  footer: {
    backgroundColor: 'skyblue',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  bodySend: {
    backgroundColor: 'cyan',
    flexGrow: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  bodyTax: {
    backgroundColor: 'yellow',
    flexGrow: 6,
    display: 'flex',
    flexDirection: 'row',
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
  item: {
    flexGrow: 1,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Nanum Gothic',
  },
  d_flex: {
    display: 'flex',
  },
  w100: { width: '100%' },
});

class PayDocumentPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forDownload: false,
    };
  }

  n = () => (!this.props.forDownload ? <br /> : '\n');

  render() {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            className="d-flex w-100 flex-wrap"
            style={{ display: 'flex', width: '100%', flexWrap: 'nowrap' }}
          >
            <View
              className="border border-col d-flex w-100"
              style={{
                borderWidth: '1',
                borderStyle: 'solid',
                borderColor: '#000',
                width: '100%',
                display: 'flex',
                flexWrap: 'nowrap',
                flexDirection: 'row',
              }}
            >
              <View
                className="border border-col col-9 text-center p-2"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '75%',
                  textAlign: 'center',
                  padding: '5px',
                }}
              >
                <Text className="text-bold" style={{ fontWeight: 'bold' }}>
                  내역
                </Text>
              </View>
              <View
                className="border border-col col-3 text-center p-2"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '25%',
                  textAlign: 'center',
                  padding: '5px',
                }}
              >
                <Text className="text-bold" style={{ fontWeight: 'bold' }}>
                  금액
                </Text>
              </View>
            </View>
            {/**첫째행 */}
            <View
              className="border border-col w-100 d-flex"
              style={{
                borderWidth: '1',
                borderStyle: 'solid',
                borderColor: '#000',
                width: '100%',
                display: 'flex',
                flexWrap: 'nowrap',
                flexDirection: 'row',
              }}
            >
              <View
                className="border border-col col-9 flex-nowrap flex-row d-flex"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '75%',
                  display: 'flex',
                  flexWrap: 'nowrap',
                  flexDirection: 'row',
                }}
              >
                <View
                  className="border border-col col-3 d-flex justify-content-center align-items-center"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>지급</Text>
                </View>
                <View
                  className="border border-col col-9 flex-wrap"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '75%',
                    flexWrap: 'wrap',
                  }}
                >
                  <View
                    className="border border-col w-100 text-center p-2"
                    style={{
                      borderWidth: '1',
                      borderStyle: 'solid',
                      borderColor: '#000',
                      width: '100%',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    <Text>기본급</Text>
                  </View>
                  <View
                    className="border border-col w-100 text-center p-2"
                    style={{
                      borderWidth: '1',
                      borderStyle: 'solid',
                      borderColor: '#000',
                      width: '100%',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    <Text>과세 추가수당</Text>
                  </View>
                  <View
                    className="border border-col w-100 text-center p-2"
                    style={{
                      borderWidth: '1',
                      borderStyle: 'solid',
                      borderColor: '#000',
                      width: '100%',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    <Text>비과세 추가수당</Text>
                  </View>
                </View>
              </View>
              {/**둘째행 지급 라벨 */}
              <View
                className="border border-col col-3 flex-wrap"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '25%',
                  flexWrap: 'wrap',
                }}
              >
                <View
                  className="border border-col w-100 text-center p-2"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '100%',
                    textAlign: 'center',
                    padding: '5px',
                  }}
                >
                  <Text>{this.props.data.salary}</Text>
                </View>
                <View
                  className="border border-col w-100 text-center p-2"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '100%',
                    textAlign: 'center',
                    padding: '5px',
                  }}
                >
                  <Text>{this.props.data.taxation}</Text>
                </View>
                <View
                  className="border border-col w-100 text-center p-2"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '100%',
                    textAlign: 'center',
                    padding: '5px',
                  }}
                >
                  <Text>{this.props.data.taxFree}</Text>
                </View>
              </View>
              {/**둘째행 지급 금액 */}
            </View>
            {/**둘째행 */}
            <View
              className="border border-col w-100 d-flex"
              style={{
                borderWidth: '1',
                borderStyle: 'solid',
                borderColor: '#000',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <View
                className="border border-col col-9 flex-nowrap flex-row d-flex"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '75%',
                  display: 'flex',
                  flexWrap: 'nowrap',
                  flexDirection: 'row',
                }}
              >
                <View
                  className="border border-col col-3 d-flex justify-content-center align-items-center"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>공제</Text>
                </View>
                <View
                  className="border border-col col-9 flex-wrap"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '75%',
                    flexWrap: 'wrap',
                  }}
                >
                  <View
                    className="border border-col w-100 text-center p-2"
                    style={{
                      borderWidth: '1',
                      borderStyle: 'solid',
                      borderColor: '#000',
                      width: '100%',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    <Text>국민연금</Text>
                  </View>
                  <View
                    className="border border-col w-100 text-center p-2"
                    style={{
                      borderWidth: '1',
                      borderStyle: 'solid',
                      borderColor: '#000',
                      width: '100%',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    <Text>건강보험료</Text>
                  </View>
                  <View
                    className="border border-col w-100 text-center p-2"
                    style={{
                      borderWidth: '1',
                      borderStyle: 'solid',
                      borderColor: '#000',
                      width: '100%',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    <Text>장기요양보험료</Text>
                  </View>
                  <View
                    className="border border-col w-100 text-center p-2"
                    style={{
                      borderWidth: '1',
                      borderStyle: 'solid',
                      borderColor: '#000',
                      width: '100%',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    <Text>고용보험료</Text>
                  </View>
                  {/* <View className='border border-col w-100 text-center p-2'>
                    <Text>소득세</Text>
                  </View>
                  <View className='border border-col w-100 text-center p-2'>
                    <Text>주민세</Text>
                  </View> */}
                </View>
              </View>
              {/* 공제 텍스트 */}
              <View
                className="border border-col col-3 flex-wrap"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '25%',
                  flexWrap: 'wrap',
                }}
              >
                <View
                  className="border border-col w-100 text-center p-2"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '100%',
                    textAlign: 'center',
                    padding: '5px',
                  }}
                >
                  <Text>{this.props.data.nationalPension}</Text>
                </View>
                <View
                  className="border border-col w-100 text-center p-2"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '100%',
                    textAlign: 'center',
                    padding: '5px',
                  }}
                >
                  <Text>{this.props.data.healthInsurance}</Text>
                </View>
                <View
                  className="border border-col w-100 text-center p-2"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '100%',
                    textAlign: 'center',
                    padding: '5px',
                  }}
                >
                  <Text>{this.props.data.regularCare}</Text>
                </View>
                <View
                  className="border border-col w-100 text-center p-2"
                  style={{
                    borderWidth: '1',
                    borderStyle: 'solid',
                    borderColor: '#000',
                    width: '100%',
                    textAlign: 'center',
                    padding: '5px',
                  }}
                >
                  <Text>{this.props.data.employmentInsurance}</Text>
                </View>
                {/* <View className='border border-col w-100 text-center p-2'>
                  <Text></Text>
                </View>
                <View className='border border-col w-100 text-center p-2'>
                  <Text></Text>
                </View> */}
              </View>
              {/* 공제 금액 */}
            </View>
            {/* 셋째행 */}
            <View
              className="border border-col w-100 d-flex"
              style={{
                borderWidth: '1',
                borderStyle: 'solid',
                borderColor: '#000',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <View
                className="border border-col col-9 text-center p-2"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '75%',
                  textAlign: 'center',
                  padding: '5px',
                }}
              >
                <Text>지급액계</Text>
              </View>
              <View
                className="border border-col col-3 text-center p-2"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '25%',
                  textAlign: 'center',
                  padding: '5px',
                }}
              >
                <Text>{this.props.data.origin}</Text>
              </View>
            </View>
            {/**넷째행 */}
            <View
              className="border border-col w-100 d-flex"
              style={{
                borderWidth: '1',
                borderStyle: 'solid',
                borderColor: '#000',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <View
                className="border border-col col-9 text-center p-2"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '75%',
                  textAlign: 'center',
                  padding: '5px',
                }}
              >
                <Text>공제액계</Text>
              </View>
              <View
                className="border border-col col-3 text-center p-2"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '25%',
                  textAlign: 'center',
                  padding: '5px',
                }}
              >
                <Text>{this.props.data.minus}</Text>
              </View>
            </View>
            <View
              className="border border-col w-100 d-flex"
              style={{
                borderWidth: '1',
                borderStyle: 'solid',
                borderColor: '#000',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <View
                className="border border-col col-9 text-center p-2"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '75%',
                  textAlign: 'center',
                  padding: '5px',
                }}
              >
                <Text>차인지급액계</Text>
              </View>
              <View
                className="border border-col col-3 text-center p-2"
                style={{
                  borderWidth: '1',
                  borderStyle: 'solid',
                  borderColor: '#000',
                  width: '25%',
                  textAlign: 'center',
                  padding: '5px',
                }}
              >
                <Text>{this.props.data.real}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
export default PayDocumentPDF;

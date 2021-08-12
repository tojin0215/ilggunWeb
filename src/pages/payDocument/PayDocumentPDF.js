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
    backgroundColor: '#E4E4E4',
    display: 'flex',
    flexDirection: 'column',
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
        <Page size="A4">
          <View className="container">
            <View>
              <View className="">
                <Text>내역</Text>
              </View>
              <View>
                <Text>금액</Text>
              </View>
            </View>
            <View>
              <View>
                <View>
                  <Text>과세</Text>
                </View>
                <View>
                  <View>
                    <Text>기본급</Text>
                  </View>
                  <View>
                    <View>
                      <Text>과세 추가수당</Text>
                    </View>
                    <View>
                      <View>
                        <Text>직책</Text>
                      </View>
                      <View>
                        <Text>상여</Text>
                      </View>
                      <View>
                        <Text>연장</Text>
                      </View>
                      <View>
                        <Text>기타</Text>
                      </View>
                    </View>
                  </View>{/* 과세 추가수당 */}
                  <View>
                    <View>
                      <Text>비과세 추가수당</Text>
                    </View>
                    <View>
                      <View>
                        <Text>식대</Text>
                      </View>
                      <View>
                        <Text>자가유류비</Text>
                      </View>
                      <View>
                        <Text>육아수당</Text>
                      </View>
                      <View>
                        <Text>기타</Text>
                      </View>
                    </View>
                  </View>{/* 비과세 추가수당 */}
                </View>{/* 지급 */}
                <View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                </View>{/* 지급 금액 */}
              </View>
            </View>
            <View>
                <View>
                    <View>
                        <View>
                            <Text>공제</Text>
                        </View>
                        <View>
                            <View>
                                <Text>국민연금</Text>
                            </View>
                            <View>
                                <Text>건강보험료</Text>
                            </View>
                            <View>
                                <Text>장기요양보험료</Text>
                            </View>
                            <View>
                                <Text>고용보험료</Text>
                            </View>
                            <View>
                                <Text>소득세</Text>
                            </View>
                            <View>
                                <Text>주민세</Text>
                            </View>
                        </View>
                    </View>
                </View>{/* 공제 텍스트 */}
                <View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                </View>{/* 공제 금액 */}
            </View>{/* 공제 컨텐츠 */}
            <View>
                <View></View>
                <View></View>
            </View>
            <View>
                <View></View>
                <View></View>
            </View>
            <View>
                <View></View>
                <View></View>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
export default PayDocumentPDF;

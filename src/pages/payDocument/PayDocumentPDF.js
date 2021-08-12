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
                <Text>지급</Text>
              </View>
              <View>
                <View>
                  <Text>기본급</Text>
                </View>
                <View>
                  <Text>기타수당(과세)</Text>
                </View>
                <View>
                  <Text>기타수당(비과세)</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>{this.props.data.salary}</Text>
                </View>
                <View>
                  <Text>{this.props.data.taxation}</Text>
                </View>
                <View>
                  <Text>{this.props.data.taxFree}</Text>
                </View>
              </View>
            </View>
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
              <View>
                <View>
                  <Text>{this.props.data.nationalPension}</Text>
                </View>
                <View>
                  <Text>{this.props.data.healthInsurance}</Text>
                </View>
                <View>
                  <Text>{this.props.data.regularCare}</Text>
                </View>
                <View>
                  <Text>{this.props.data.employmentInsurance}</Text>
                </View>
                <View>
                  <Text>소득세</Text>
                </View>
                <View>
                  <Text>주민세</Text>
                </View>
              </View>
            </View>
            <View>
              <Text>지급액계</Text>
              <Text>{this.props.data.origin}</Text>
            </View>
            <View>
              <Text>공제액계</Text>
              <Text>{this.props.data.minus}</Text>
            </View>
            <View>
              <Text>차인지급액계</Text>
              <Text>{this.props.data.real}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
export default PayDocumentPDF;

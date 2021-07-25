import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import TableMessageSended from '../../components/Navigation/TableMessageSended';
import data from '../../components/Navigation/data';

import '../../styles/home/home.css';

class MessageSended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDelete: false
    }
  }

    goLogin = () => {
        this.props.history.push("/");
    }

    render() {
        const { userinfo } = this.props;
        console.log("userinfo : ", userinfo);

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
              메시지함/받은 메시지 페이지입니다.
              우측 상단의 삭제 버튼을 클릭하면 메시지 목록의 가장 오른편에 삭제 버튼이 나타납니다.<br/>
              <span> 📨받은 메시지함 </span>
              <button> 삭제 </button>
              <input type="checkbox" value={this.state.checkDelete} onChange={() => this.setState({checkDelete: !this.state.checkDelete})} />
              <div
                style={{
                  border: '1px solid #000',
                  padding: '10px',
                  margin: '10px',
                }}
              >
                메시지 목록 표시공간입니다. 발신인, 제목, 날짜, 읽음, 삭제(숨김)이 표시됩니다.
                <br /><br />
                <span style={{ border: '1px solid #000', padding: '10px' }}>
                  발신인
                </span>
                <span style={{ border: '1px solid #000', padding: '10px' }}>
                  제목
                </span>
                <span style={{ border: '1px solid #000', padding: '10px' }}>
                  날짜
                </span>
                <span style={{ border: '1px solid #000', padding: '10px' }}>
                  읽음
                </span>
                <span style={{ border: '1px solid #000', padding: '10px' }}>
                  ❌
                </span>
              </div>
              <TableMessageSended data={data} checkDelete={this.state.checkDelete} deleteMessage={(r) => console.debug(r)} />
            </article>
          </div>
          <Footer />
        </div>
      )
    }
}

const MessageSendedStateToProps = (state) => {
    return {
      userinfo: state.authentication.userinfo,
      //status: state.authentication.status
    }
}

export default connect(MessageSendedStateToProps, undefined)(MessageSended);
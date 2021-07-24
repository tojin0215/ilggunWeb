import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import '../../styles/home/home.css';

class SendMail extends Component {

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
              메시지함/메일 보내기 페이지입니다.<br/>
              <h3> 메일 보내기 </h3>
              <button> 삭제 </button>
              <div
                style={{
                  border: '1px solid #000',
                  padding: '10px',
                  margin: '10px',
                }}
              >
                메일 입력 공간입니다. 제목, 작성자, 첨부파일, 내용을 입력하고 보낼 수 있습니다.
                <br /><br />
                <div>
                    <span style={{ padding: '10px' }}>
                    제목
                    </span>
                    <input style={{ padding: '10px', type:'text', placeHolder: '제목을 입력하는 칸입니다' }}></input>
                </div>
                <div>
                    <span style={{ padding: '10px' }}>
                        수신인
                    </span>
                    <input style={{ padding: '10px', type:'text', placeHolder: '제목을 입력하는 칸입니다' }}></input>
                </div>
                <div>
                    <span style={{ padding: '10px' }}>
                     첨부파일
                    </span>
                    <span style={{ border:'1px solid #000', padding: '10px' }}>
                     첨부파일.excel
                    </span>
                    <button style={{ border:'1px solid #000', padding: '10px' }}>
                      삭제🗑
                    </button>
                    <button style={{ border:'1px solid #000', padding: '10px' }}>
                        첨부💾
                    </button>
                </div>
                <span style={{ border: '1px solid #000', padding: '10px' }}>
                  읽음
                </span>
                <span style={{ border: '1px solid #000', padding: '10px' }}>
                  ❌
                </span>
              </div>
            </article>
          </div>
          <Footer />
        </div>
      )
    }
}

const SendMailStateToProps = (state) => {
    return {
      userinfo: state.authentication.userinfo,
      //status: state.authentication.status
    }
}

export default connect(SendMailStateToProps, undefined)(SendMail);
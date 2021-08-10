import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import {selectReceivedMessage} from '../../action/api';
import {delMessage} from '../../action/api';
import {Modal} from '../../components/Modal/Modal';

import TableMessage from '../../components/Navigation/TableMessage';
import data from '../../components/Navigation/data';
import '../../styles/home/home.css';

const pattern_message = /(?<FROM>.+)사업주가 (?<TO>.+)님의 계약서를 작성했습니다.\n\s?[문서함>계약서]를 확인해주세요\./
const pattern_message2 = /(?<FROM>.+)님이 (?<WHERE>.+) 사업장에 (?<TO>.+)님을 초대합니다.\n\s?승낙하시겠습니까\?/
const pattern_message3 = /(?<FROM>.+)근로자 (?<WHERE>.+)가 초대에 응했습니다. 근로계약서를 작성해주세요./


class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recv_message: [],
      send_message: [],
      msg: {}
    }
    this.curFetch()
  }

  deleteMessage = (message) => {
    delMessage(message.ind)
    .then(result => {
      this.curFetch()
    })
  }

  curFetch = () => {
    selectReceivedMessage(this.props.userinfo.id)
    .then(result => result.json())
    .then(result => {
      result.map((item, index) => {
        let result  = pattern_message.exec(item.message)
        if (result) {
          if (!item.f) item.f = result.groups.FROM
        }
        result  = pattern_message2.exec(item.message)
        if (result) {
          if (!item.f) item.f = result.groups.FROM
        }
        // console.log(pattern_message.exec(item.message))
        // console.log(pattern_message2.exec(item.message))
        // console.log(pattern_message3.exec(item.message))
      })

      this.setState({recv_message: result})
    })
  }

    goLogin = () => {
        this.props.history.push("/");
    }

    openModal = () => {

    }

    render() {
        const { userinfo } = this.props;

      return (
        <div className="wrap">
          <Header />
          <Navigation goLogin={this.goLogin} />
          <div className="container">
            <Menu />
            <article className='sectionShadow'>
              <h5 className='text-h5'>📮 받은 메시지</h5>
              <TableMessage data={this.state.recv_message} deleteMessage={this.deleteMessage} click={this.openModal} />
            </article>
          </div>
          {/* <Modal open={true} close={this.closeModal} msg={}>
            <div>
              <label for="inputFrom">발신자</label>
              <input id="inputFrom"></input>
            </div>
            <div>
              <label for="inputTo">수신자</label>
              <input id="inputTo"></input>
            </div>
            <div>
              <label for="inputTo">읽음</label>
              <input type="checkbox" id="inputTo"></input>
            </div>
            <div>
              <label for="inputBody">내용</label>
              <textarea id="inputBody"></textarea>
            </div>
          </Modal> */}
          <Footer />
        </div>
      )
    }
}

const MessageStateToProps = (state) => {
    return {
      userinfo: state.authentication.userinfo,
      //status: state.authentication.status
    }
}

export default connect(MessageStateToProps, undefined)(Message);
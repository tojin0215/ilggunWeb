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
        console.log("userinfo : ", userinfo);

      return (
        <div className="wrap">
          <Header />
          <Navigation goLogin={this.goLogin} />
          <div className="container">
            <Menu />
            <article className='sectionShadow'>
              <h5 className='text-h5'>메시지함/받은 메시지</h5>
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
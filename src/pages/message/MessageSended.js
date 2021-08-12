import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import TableMessageSended from '../../components/Navigation/TableMessageSended';
import data from '../../components/Navigation/data';
import {selectSentMessage} from '../../action/api';
import {delMessage} from '../../action/api';
import {Modal} from '../../components/Modal/Modal';

import '../../styles/home/home.css';

class MessageSended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDelete: false,
      recv_message: [],
      send_message: [],

      isModalOpen: false,
      msgFrom: "발신자",
      msgTo: "수신자",
      msgBody: "메시지 내용",
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
    selectSentMessage(this.props.userinfo.id)
    .then(result => result.json())
    .then(result => {
      console.log(result);
      this.setState({send_message: result});
    })
  }

    goLogin = () => {
        this.props.history.push("/");
    }

    onRowClicked = (row) => {
      console.log(row);
      this.setState({
        msgFrom: row.f,
        msgTo: row.t,
        msgBody: row.message,
        isModalOpen: true,
      })
    }

    closeModal = () => {
      this.setState({isModalOpen: false})
    }

    render() {
        const { userinfo, send_message } = this.props;
        console.log("userinfo : ", userinfo);
        console.log("send_message : ", send_message);

      return (
        <div className="wrap">
          <Header />
          <Navigation goLogin={this.goLogin} />
          <div className="container">
            <Menu />
            <article className='sectionShadow'>
              <h5 className='text-h5'> 📨 보낸 메시지함 </h5>
              {/* <div className='messagedelete'>
                삭제하기
                <input type="checkbox" value={this.state.checkDelete} onChange={() => this.setState({checkDelete: !this.state.checkDelete})} />
              </div> */}
              <TableMessageSended data={this.state.send_message} checkDelete={this.state.checkDelete} deleteMessage={this.deleteMessage} onRowClicked={this.onRowClicked} />
            </article>
          </div>
          <Modal open={this.state.isModalOpen} close={this.closeModal}>
            <div>
              <p><span className='text-bold'>발신자</span>: {this.state.msgFrom}</p>
            </div>
            <div>
              <p><span className='text-bold'>수신자</span>: {this.state.msgTo}</p>
            </div>
            <div className='my-3 border'>
              <p className='text-bold pb-2'>내용</p>
              <p>{this.state.msgBody}</p>
            </div>
          </Modal>
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
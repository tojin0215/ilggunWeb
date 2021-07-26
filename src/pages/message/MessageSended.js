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
            <article className='sectionShadow'>
              <h5 className='text-h5'> 📨보낸 메시지함 </h5>
              <div className='messagedelete'>
                삭제하기
                <input type="checkbox" value={this.state.checkDelete} onChange={() => this.setState({checkDelete: !this.state.checkDelete})} />
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
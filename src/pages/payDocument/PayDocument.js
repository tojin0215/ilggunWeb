import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import TablePay from '../../components/Navigation/TablePay';
import data from '../../components/Navigation/data';

import '../../styles/payDocument/payDocument.css'
import '../../styles/home/home.css';

class PayDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date()
    }
  }
  goLogin = () => {
    this.props.history.push('/');
  };

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);

    return (
      <div className="wrap wrap-paydocument">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='sectionShadow'>
            <h4 className='text-h5'>00월 급여대장</h4>
            <div className='w-100 flex jf-end'>
              <button> 엑셀로 다운받기 </button>
              <button> 프린트 </button>
              <input
                placeholder='월 선택 캘린더'
                type="date"
                value={this.state.value}
                onChange={(v) => this.setState({value: v.target.value})}
              >
              </input>
              <button> 조회 </button>
            </div>
            <TablePay data={data} />
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayDocumentStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(PayDocumentStateToProps, undefined)(PayDocument);

import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import TableBoard from '../../components/Navigation/TableBoard';
import boardData from '../../components/Navigation/boardData';
import rssData from '../../components/Navigation/rssData';

import { bizinfoRSS } from '../../action/api';

import '../../styles/home/home.css';
import { PC, Mobile } from '../../components/MediaQuery';


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rssAraay: []
    }

    // this.viewBizinfoRSS()
  }


  // viewBizinfoRSS = () => {
  //   bizinfoRSS()
  //     .then((result) => result.json())
  //     .then((result) => {
  //       console.log(result.jsonArray)
  //       console.log(result.jsonArray[0].industNm)
  //       alert("30초 뒤 연결")
  //       this.setState({ rssAraay: result.jsonArray })
  //       console.log(this.state.rssArray)
  //     })
  // }




  render() {
    const { userinfo } = this.props;
    console.log(this.state.rssArray)

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <PC>
            <div className="sectionShadow">
              <h4 className="text-h5 text-bold">필터</h4>
            </div>
            <div className="sectionShadow">
              <TableBoard data={rssData.jsonArray} />
              <div className="pt-2"></div>
            </div>
          </PC>
          <Mobile>
            <div className="sectionShadow">
              <h4 className="text-h5 text-bold">필터</h4>
            </div>
            <div className="sectionShadow">
              <TableBoard data={rssData.jsonArray} />
              <div className="pt-2"></div>
            </div>
          </Mobile>
        </div>
        <Footer />
      </div>
    );
  }
}

const BoardStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(BoardStateToProps, undefined)(Board);

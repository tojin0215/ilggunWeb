import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import TableBoard from '../../components/Navigation/TableBoard';

import { bizinfoRSSAll, bizinfoRSS100, bizinfoRSSSearch } from '../../action/api';

import '../../styles/home/home.css';
import { PC, Mobile } from '../../components/MediaQuery';


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rssArray: []
    }

    this.bizinfoRSS100()
    this.bizinfoRSSAll()
  }
  bizinfoRSSAll = () => {
    bizinfoRSSAll()
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          rssArray: result.jsonArray
        })
      })
  }

  bizinfoRSS100 = () => {
    bizinfoRSS100()
      .then((result) => result.json())
      .then((result) => {
        this.setState({ rssArray: result.jsonArray },
          () => this.bizinfoRSSAll)
      })
  }
  // searchLclasId:분야, searchPldirJrsdCode:소관, searchIndustCode:업종, searchAreaCode:지역
  // this.state.searchLclasId, this.state.searchPldirJrsdCode, this.state.searchIndustCode, this.state.searchAreaCode
  handleOnClick = () => {

    bizinfoRSSSearch("all", "all", "all", "1100000000",)
      .then((result) => result.json())
      .then((result) => {
        alert("검색")
        this.setState({ rssArray: result.jsonArray })
      })
  }


  goLogin = () => {
    this.props.history.push('/');
  };

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
              <h4 className="text-h5 text-bold">
                <button className='button-solid py-3 px-5 font-bold' type="button" onClick={this.handleOnClick} >서울</button>
              </h4>
            </div>
            <div className="sectionShadow">
              <TableBoard data={this.state.rssArray} />
              <div className="pt-2"></div>
            </div>
          </PC>
          <Mobile>
            <div className="sectionShadow">
              <h4 className="text-h5 text-bold">필터</h4>
            </div>
            <div className="sectionShadow">
              <TableBoard data={this.state.rssArray} />
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
    userinfo: state.authentication.userinfo
  };
};

export default connect(BoardStateToProps, undefined)(Board);

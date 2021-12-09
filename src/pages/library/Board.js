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

import { getBase64 } from '../../action/api';
import { upload, filelist, deleteFile } from '../../action/api';
import { SERVER_URL } from '../../const/setting';

import '../../styles/home/home.css';
import { PC, Mobile } from '../../components/MediaQuery';
{
  /* <script lang="javascript" src="dist/xlsx.full.min.js" /> */
}
// const xlsx = require("xlsx");
// const excelFile = xlsx.readFile("지원사업조회.xls")
// const sheetName = excelFile.SheetNames[0];
// console.log(sheetName)

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userinfo } = this.props;

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
              <TableBoard data={boardData} />
              <div className="pt-2"></div>
            </div>
          </PC>
          <Mobile>
            <div className="sectionShadow">
              <h4 className="text-h5 text-bold">필터</h4>
            </div>
            <div className="sectionShadow">
              <TableBoard data />
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

import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import TableBoard from '../../components/Navigation/TableBoard';

import {
  bizinfoRSSAll,
  bizinfoRSS100,
  bizinfoRSSSearch,
} from '../../action/api';

import '../../styles/home/home.css';
import '../../styles/library/board.css';
import { PC, Mobile } from '../../components/MediaQuery';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: true,

      rssArray: [],
      checkboxGroup: {
        // _areaCode: true,
        areaCode1: false,
        areaCode2: false,
        areaCode3: false,
        areaCode4: false,
        areaCode5: false,
        areaCode6: false,
        areaCode7: false,
        areaCode8: false,
        areaCode9: false,
        areaCode10: false,
        areaCode11: false,
        areaCode12: false,
        areaCode13: false,
        areaCode14: false,
        areaCode15: false,
        areaCode16: false,
        areaCode17: false,
      },
      checkboxGroup2: {
        // _areaCode: true,
        industNmA: false,
        industNmB: false,
        industNmC: false,
        industNmD: false,
        industNmE: false,
        industNmF: false,
        industNmG: false,
        industNmH: false,
        industNmI: false,
        industNmJ: false,
        industNmK: false,
        industNmL: false,
        industNmM: false,
        industNmN: false,
        industNmO: false,
        industNmP: false,
        industNmQ: false,
        industNmR: false,
        industNmS: false,
        industNmT: false,
        industNmU: false,
      },
      checkboxGroup3: {
        PldirJrsdG33: false,
        PldirJrsdG03: false,
        PldirJrsdG14: false,
        PldirJrsdG05: false,
        PldirJrsdG07: false,
        PldirJrsdG12: false,
        PldirJrsdG45: false,
        PldirJrsdG21: false,
        PldirJrsdG06: false,
        PldirJrsdG11: false,
        PldirJrsdG30: false,
        PldirJrsdG31: false,
        PldirJrsdG32: false,
        PldirJrsdG35: false,
        PldirJrsdG08: false,
        PldirJrsdG34: false,
        PldirJrsdG10: false,
        PldirJrsdG02: false,
        PldirJrsdG13: false,
        PldirJrsdG09: false,
        PldirJrsdG22: false,
        PldirJrsdG15: false,
        PldirJrsdG20: false,
        PldirJrsdG17: false,
        PldirJrsdG16: false,
        PldirJrsdG27: false,
        PldirJrsdG01: false,
        PldirJrsdG44: false,
        PldirJrsdG42: false,
        PldirJrsdG23: false,
        PldirJrsdG26: false,
        PldirJrsdG29: false,
      },
      checkboxGroup4: {
        LclasId01: false,
        LclasId02: false,
        LclasId03: false,
        LclasId04: false,
        LclasId05: false,
        LclasId06: false,
        LclasId07: false,
        LclasId08: false,
        LclasId09: false,
      },
    };

    this.bizinfoRSS100();
    this.bizinfoRSSAll();
  }

  handleCheckbox4 = (e) => {
    let obj = {
      LclasId01: false,
      LclasId02: false,
      LclasId03: false,
      LclasId04: false,
      LclasId05: false,
      LclasId06: false,
      LclasId07: false,
      LclasId08: false,
      LclasId09: false,
    };
    obj[e.target.id] = e.target.checked;
    this.setState({
      checkboxGroup4: obj,
    });
    // console.log(obj)
  };

  handleCheckbox3 = (e) => {
    let obj = {
      PldirJrsdG33: false,
      PldirJrsdG03: false,
      PldirJrsdG14: false,
      PldirJrsdG05: false,
      PldirJrsdG07: false,
      PldirJrsdG12: false,
      PldirJrsdG45: false,
      PldirJrsdG21: false,
      PldirJrsdG06: false,
      PldirJrsdG11: false,
      PldirJrsdG30: false,
      PldirJrsdG31: false,
      PldirJrsdG32: false,
      PldirJrsdG35: false,
      PldirJrsdG08: false,
      PldirJrsdG34: false,
      PldirJrsdG10: false,
      PldirJrsdG02: false,
      PldirJrsdG13: false,
      PldirJrsdG09: false,
      PldirJrsdG22: false,
      PldirJrsdG15: false,
      PldirJrsdG20: false,
      PldirJrsdG17: false,
      PldirJrsdG16: false,
      PldirJrsdG27: false,
      PldirJrsdG01: false,
      PldirJrsdG44: false,
      PldirJrsdG42: false,
      PldirJrsdG23: false,
      PldirJrsdG26: false,
      PldirJrsdG29: false,
    };
    obj[e.target.id] = e.target.checked;
    this.setState({
      checkboxGroup3: obj,
    });
    // console.log(obj)
  };

  handleCheckbox2 = (e) => {
    let obj = {
      // _areaCode: false,
      industNmA: false,
      industNmB: false,
      industNmC: false,
      industNmD: false,
      industNmE: false,
      industNmF: false,
      industNmG: false,
      industNmH: false,
      industNmI: false,
      industNmJ: false,
      industNmK: false,
      industNmL: false,
      industNmM: false,
      industNmN: false,
      industNmO: false,
      industNmP: false,
      industNmQ: false,
      industNmR: false,
      industNmS: false,
      industNmT: false,
      industNmU: false,
    };
    obj[e.target.id] = e.target.checked;
    this.setState({
      checkboxGroup2: obj,
    });
    // console.log(obj)
  };

  handleCheckbox = (e) => {
    let obj = {
      // _areaCode: false,
      areaCode1: false,
      areaCode2: false,
      areaCode3: false,
      areaCode4: false,
      areaCode5: false,
      areaCode6: false,
      areaCode7: false,
      areaCode8: false,
      areaCode9: false,
      areaCode10: false,
      areaCode11: false,
      areaCode12: false,
      areaCode13: false,
      areaCode14: false,
      areaCode15: false,
      areaCode16: false,
      areaCode17: false,
    };
    obj[e.target.id] = e.target.checked;
    this.setState({
      checkboxGroup: obj,
    });
    // console.log(obj)
  };

  bizinfoRSSAll = () => {
    bizinfoRSSAll()
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          rssArray: result.jsonArray,
          pending: false,
        });
      });
  };

  bizinfoRSS100 = () => {
    bizinfoRSS100()
      .then((result) => result.json())
      .then((result) => {
        this.setState(
          { rssArray: result.jsonArray, pending: false },
          () => this.bizinfoRSSAll,
        );
      });
  };
  // searchLclasId:??????, searchPldirJrsdCode:??????, searchIndustCode:??????, searchAreaCode:??????, searchCnt: ??????
  // this.state.searchLclasId, this.state.searchPldirJrsdCode, this.state.searchIndustCode, this.state.searchAreaCode
  handleOnClick = () => {
    if (this.state.pending) {
    } else {
      this.setState(
        {
          rssArray: [],
          pending: true,
        },
        () => {
          bizinfoRSSSearch(
            this.state.checkboxGroup4.LclasId01 == true
              ? '01'
              : this.state.checkboxGroup4.LclasId02 == true
              ? '02'
              : this.state.checkboxGroup4.LclasId03 == true
              ? '03'
              : this.state.checkboxGroup4.LclasId04 == true
              ? '04'
              : this.state.checkboxGroup4.LclasId05 == true
              ? '05'
              : this.state.checkboxGroup4.LclasId06 == true
              ? '06'
              : this.state.checkboxGroup4.LclasId07 == true
              ? '07'
              : this.state.checkboxGroup4.LclasId08 == true
              ? '08'
              : this.state.checkboxGroup4.LclasId09 == true
              ? '09'
              : 'all',
            this.state.checkboxGroup3.PldirJrsdG33 == true
              ? 'G33'
              : this.state.checkboxGroup3.PldirJrsdG03 == true
              ? 'G03'
              : this.state.checkboxGroup3.PldirJrsdG14 == true
              ? 'G14'
              : this.state.checkboxGroup3.PldirJrsdG05 == true
              ? 'G05'
              : this.state.checkboxGroup3.PldirJrsdG07 == true
              ? 'G07'
              : this.state.checkboxGroup3.PldirJrsdG12 == true
              ? 'G12'
              : this.state.checkboxGroup3.PldirJrsdG45 == true
              ? 'G45'
              : this.state.checkboxGroup3.PldirJrsdG21 == true
              ? 'G21'
              : this.state.checkboxGroup3.PldirJrsdG06 == true
              ? 'G06'
              : this.state.checkboxGroup3.PldirJrsdG11 == true
              ? 'G11'
              : this.state.checkboxGroup3.PldirJrsdG30 == true
              ? 'G30'
              : this.state.checkboxGroup3.PldirJrsdG31 == true
              ? 'G31'
              : this.state.checkboxGroup3.PldirJrsdG32 == true
              ? 'G32'
              : this.state.checkboxGroup3.PldirJrsdG35 == true
              ? 'G35'
              : this.state.checkboxGroup3.PldirJrsdG08 == true
              ? 'G08'
              : this.state.checkboxGroup3.PldirJrsdG34 == true
              ? 'G34'
              : this.state.checkboxGroup3.PldirJrsdG10 == true
              ? 'G10'
              : this.state.checkboxGroup3.PldirJrsdG02 == true
              ? 'G02'
              : this.state.checkboxGroup3.PldirJrsdG13 == true
              ? 'G13'
              : this.state.checkboxGroup3.PldirJrsdG09 == true
              ? 'G09'
              : this.state.checkboxGroup3.PldirJrsdG22 == true
              ? 'G22'
              : this.state.checkboxGroup3.PldirJrsdG15 == true
              ? 'G15'
              : this.state.checkboxGroup3.PldirJrsdG20 == true
              ? 'G20'
              : this.state.checkboxGroup3.PldirJrsdG17 == true
              ? 'G17'
              : this.state.checkboxGroup3.PldirJrsdG16 == true
              ? 'G16'
              : this.state.checkboxGroup3.PldirJrsdG27 == true
              ? 'G27'
              : this.state.checkboxGroup3.PldirJrsdG01 == true
              ? 'G01'
              : this.state.checkboxGroup3.PldirJrsdG44 == true
              ? 'G44'
              : this.state.checkboxGroup3.PldirJrsdG42 == true
              ? 'G42'
              : this.state.checkboxGroup3.PldirJrsdG23 == true
              ? 'G23'
              : this.state.checkboxGroup3.PldirJrsdG26 == true
              ? 'G26'
              : this.state.checkboxGroup3.PldirJrsdG29 == true
              ? 'G29'
              : 'all',
            this.state.checkboxGroup2.industNmA == true
              ? 'A'
              : this.state.checkboxGroup2.industNmB == true
              ? 'B'
              : this.state.checkboxGroup2.industNmC == true
              ? 'C'
              : this.state.checkboxGroup2.industNmD == true
              ? 'D'
              : this.state.checkboxGroup2.industNmE == true
              ? 'E'
              : this.state.checkboxGroup2.industNmF == true
              ? 'F'
              : this.state.checkboxGroup2.industNmG == true
              ? 'G'
              : this.state.checkboxGroup2.industNmH == true
              ? 'H'
              : this.state.checkboxGroup2.industNmI == true
              ? 'I'
              : this.state.checkboxGroup2.industNmJ == true
              ? 'J'
              : this.state.checkboxGroup2.industNmK == true
              ? 'K'
              : this.state.checkboxGroup2.industNmL == true
              ? 'L'
              : this.state.checkboxGroup2.industNmM == true
              ? 'M'
              : this.state.checkboxGroup2.industNmN == true
              ? 'N'
              : this.state.checkboxGroup2.industNmO == true
              ? 'O'
              : this.state.checkboxGroup2.industNmP == true
              ? 'P'
              : this.state.checkboxGroup2.industNmQ == true
              ? 'Q'
              : this.state.checkboxGroup2.industNmR == true
              ? 'R'
              : this.state.checkboxGroup2.industNmS == true
              ? 'S'
              : this.state.checkboxGroup2.industNmT == true
              ? 'T'
              : this.state.checkboxGroup2.industNmU == true
              ? 'U'
              : 'all',

            this.state.checkboxGroup.areaCode1 == true
              ? 1100000000
              : this.state.checkboxGroup.areaCode2 == true
              ? 2600000000
              : this.state.checkboxGroup.areaCode3 == true
              ? 2700000000
              : this.state.checkboxGroup.areaCode4 == true
              ? 2800000000
              : this.state.checkboxGroup.areaCode5 == true
              ? 2900000000
              : this.state.checkboxGroup.areaCode6 == true
              ? 3000000000
              : this.state.checkboxGroup.areaCode7 == true
              ? 3100000000
              : this.state.checkboxGroup.areaCode8 == true
              ? 3611000000
              : this.state.checkboxGroup.areaCode9 == true
              ? 4100000000
              : this.state.checkboxGroup.areaCode10 == true
              ? 4200000000
              : this.state.checkboxGroup.areaCode11 == true
              ? 4300000000
              : this.state.checkboxGroup.areaCode12 == true
              ? 4400000000
              : this.state.checkboxGroup.areaCode13 == true
              ? 4500000000
              : this.state.checkboxGroup.areaCode14 == true
              ? 4600000000
              : this.state.checkboxGroup.areaCode15 == true
              ? 4700000000
              : this.state.checkboxGroup.areaCode16 == true
              ? 4800000000
              : this.state.checkboxGroup.areaCode17 == true
              ? 5000000000
              : 'all',
          )
            .then((result) => result.json())
            .then((result) => {
              this.setState({ rssArray: result.jsonArray, pending: false });
              console.log('??????', result);
            });
        },
      );
    }
  };

  goLogin = () => {
    this.props.history.push('/');
  };

  render() {
    const { userinfo } = this.props;
    // console.log(this.state.rssArray)

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container boardcontainer">
          <Menu />

          <h4 className="text-h4 w-100 py-3 px-5 fw-bold sectionShadow">
            ???????????? ??????
          </h4>
          <PC>
            <div className="sectionShadow">
              <div className="text-h5 text-bold text-center boardfilterbox">
                <div className="p-3 h-100 flex-wrap">
                  <p className="text-h5 text-bold w-100">?????? ??????</p>
                  {/* <input type="checkbox" id="_areaCode" name="checkboxGroup" value="on"
                    onChange={this.handleCheckbox}
                    checked={this.state.checkboxGroup['_areaCode']} />
                  <span className='text-h6'>??????</span> */}
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode1"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode1',undefined);"
                        checked={this.state.checkboxGroup['areaCode1']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode2"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        //  onclick="gfn_selectCode('areaCode2',undefined);"
                        checked={this.state.checkboxGroup['areaCode2']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode3"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode3',undefined);"
                        checked={this.state.checkboxGroup['areaCode3']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode4"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode1',undefined);"
                        checked={this.state.checkboxGroup['areaCode4']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode5"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        //  onclick="gfn_selectCode('areaCode2',undefined);"
                        checked={this.state.checkboxGroup['areaCode5']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode6"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode3',undefined);"
                        checked={this.state.checkboxGroup['areaCode6']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode7"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode1',undefined);"
                        checked={this.state.checkboxGroup['areaCode7']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode8"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        //  onclick="gfn_selectCode('areaCode2',undefined);"
                        checked={this.state.checkboxGroup['areaCode8']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode9"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode3',undefined);"
                        checked={this.state.checkboxGroup['areaCode9']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode10"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode1',undefined);"
                        checked={this.state.checkboxGroup['areaCode10']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode11"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        //  onclick="gfn_selectCode('areaCode2',undefined);"
                        checked={this.state.checkboxGroup['areaCode11']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode12"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode3',undefined);"
                        checked={this.state.checkboxGroup['areaCode12']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode13"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        //  onclick="gfn_selectCode('areaCode2',undefined);"
                        checked={this.state.checkboxGroup['areaCode13']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode14"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode3',undefined);"
                        checked={this.state.checkboxGroup['areaCode14']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode15"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode1',undefined);"
                        checked={this.state.checkboxGroup['areaCode15']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode16"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        //  onclick="gfn_selectCode('areaCode2',undefined);"
                        checked={this.state.checkboxGroup['areaCode16']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="areaCode17"
                        name="checkboxGroup"
                        onChange={this.handleCheckbox}
                        // onclick="gfn_selectCode('areaCode3',undefined);"
                        checked={this.state.checkboxGroup['areaCode17']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                  </div>
                </div>
                <div className="p-3 h-100 flex-wrap">
                  <p className="text-h5 text-bold w-100">?????? ??????</p>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmA"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmA']}
                      />
                      <span className="text-h6">??????, ?????? ??? ??????(01~03)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmB"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmB']}
                      />
                      <span className="text-h6">??????(05~08)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmC"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmC']}
                      />
                      <span className="text-h6">?????????(10~34)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmD"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmD']}
                      />
                      <span className="text-h6">
                        ??????, ??????, ?????? ??? ?????? ?????? ?????????(35)
                      </span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmE"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmE']}
                      />
                      <span className="text-h6">
                        ??????, ?????? ??? ????????? ??????, ?????? ?????????(36~39)
                      </span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmF"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmF']}
                      />
                      <span className="text-h6">?????????(41~42)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmG"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmG']}
                      />
                      <span className="text-h6">?????? ??? ?????????(45~47)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmH"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmH']}
                      />
                      <span className="text-h6">?????? ??? ?????????(49~52)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmI"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmI']}
                      />
                      <span className="text-h6">?????? ??? ????????????(55~56)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmJ"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmJ']}
                      />
                      <span className="text-h6">???????????????(58~63)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmK"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmK']}
                      />
                      <span className="text-h6">?????? ??? ?????????(64~66)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmL"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmL']}
                      />
                      <span className="text-h6">????????????(68)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmM"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmM']}
                      />
                      <span className="text-h6">
                        ??????, ?????? ??? ?????? ????????????(70~73)
                      </span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmN"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmN']}
                      />
                      <span className="text-h6">
                        ???????????? ??????, ?????? ?????? ??? ?????? ????????????(74~76)
                      </span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmO"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmO']}
                      />
                      <span className="text-h6">
                        ?????? ??????, ?????? ??? ???????????? ??????(84)
                      </span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmP"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmP']}
                      />
                      <span className="text-h6">?????? ????????????(85)</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmQ"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmQ']}
                      />
                      <span className="text-h6">
                        ????????? ??? ???????????? ????????????(86~87)
                      </span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmR"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmR']}
                      />
                      <span className="text-h6">
                        ??????, ????????? ??? ???????????? ????????????(90~91)
                      </span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmS"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmS']}
                      />
                      <span className="text-h6">
                        ?????? ??? ??????, ?????? ??? ?????? ?????? ????????????(94~96)
                      </span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmT"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmT']}
                      />
                      <span className="text-h6">
                        ?????? ??? ???????????? ??? ?????? ???????????? ?????? ?????? ??????
                        ????????????(97~98)
                      </span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="industNmU"
                        name="checkboxGroup2"
                        onChange={this.handleCheckbox2}
                        checked={this.state.checkboxGroup2['industNmU']}
                      />
                      <span className="text-h6">?????? ??? ????????????(99)</span>
                    </label>
                  </div>
                </div>
                <div className="p-3 h-100 flex-wrap">
                  <p className="text-h5 text-bold w-100">?????? ??????</p>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG33"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG33']}
                      />
                      <span className="text-h6">?????????????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG03"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG03']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG14"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG14']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG05"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG05']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG07"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG07']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG12"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG12']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG45"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG45']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG21"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG21']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG06"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG06']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG11"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG11']}
                      />
                      <span className="text-h6">?????????????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG30"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG30']}
                      />
                      <span className="text-h6">????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG31"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG31']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG32"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG32']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG35"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG35']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG08"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG08']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG34"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG34']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG10"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG10']}
                      />
                      <span className="text-h6">?????????????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG02"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG02']}
                      />
                      <span className="text-h6">???????????????????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG13"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG13']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG09"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG09']}
                      />
                      <span className="text-h6">?????????????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG22"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG22']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG15"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG15']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG20"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG20']}
                      />
                      <span className="text-h6">????????????????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG17"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG17']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG16"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG16']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG27"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG27']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG01"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG01']}
                      />
                      <span className="text-h6">???????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG44"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG44']}
                      />
                      <span className="text-h6">?????????????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG42"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG42']}
                      />
                      <span className="text-h6">?????????????????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG23"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG23']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG26"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG26']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="PldirJrsdG29"
                        name="checkboxGroup3"
                        onChange={this.handleCheckbox3}
                        checked={this.state.checkboxGroup3['PldirJrsdG29']}
                      />
                      <span className="text-h6">?????????</span>
                    </label>
                  </div>
                </div>

                <div className="p-3 h-100 flex-wrap">
                  <p className="text-h5 text-bold w-100">???????????? ??????</p>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        id="LclasId01"
                        name="checkboxGroup4"
                        onChange={this.handleCheckbox4}
                        checked={this.state.checkboxGroup4['LclasId01']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="LclasId02"
                        name="checkboxGroup4"
                        onChange={this.handleCheckbox4}
                        checked={this.state.checkboxGroup4['LclasId02']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="LclasId03"
                        name="checkboxGroup4"
                        onChange={this.handleCheckbox4}
                        checked={this.state.checkboxGroup4['LclasId03']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="LclasId04"
                        name="checkboxGroup4"
                        onChange={this.handleCheckbox4}
                        checked={this.state.checkboxGroup4['LclasId04']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="LclasId05"
                        name="checkboxGroup4"
                        onChange={this.handleCheckbox4}
                        checked={this.state.checkboxGroup4['LclasId05']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="LclasId06"
                        name="checkboxGroup4"
                        onChange={this.handleCheckbox4}
                        checked={this.state.checkboxGroup4['LclasId06']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="LclasId07"
                        name="checkboxGroup4"
                        onChange={this.handleCheckbox4}
                        checked={this.state.checkboxGroup4['LclasId07']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="LclasId08"
                        name="checkboxGroup4"
                        onChange={this.handleCheckbox4}
                        checked={this.state.checkboxGroup4['LclasId08']}
                      />
                      <span className="text-h6">??????</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        id="LclasId09"
                        name="checkboxGroup4"
                        onChange={this.handleCheckbox4}
                        checked={this.state.checkboxGroup4['LclasId09']}
                      />
                      <span className="text-h6">????????????</span>
                    </label>
                  </div>
                </div>

                <button
                  className="button-solid py-2 px-5 fw-bolder fs-5"
                  type="button"
                  onClick={this.handleOnClick}
                >
                  ??????
                </button>
              </div>
            </div>
            <div className="sectionShadow">
              <TableBoard data={this.state.rssArray} />
              <div className="pt-2"></div>
            </div>
          </PC>
          <Mobile>
            <div className="sectionShadow">
              <h4 className="text-h5 text-bold">
                <div className="p-3 h-100 flex-wrap">
                  <p className="text-h5 text-bold w-100">?????? ??????</p>
                  {/* <input type="checkbox" id="_areaCode" name="checkboxGroup" value="on"
                    onChange={this.handleCheckbox}
                    checked={this.state.checkboxGroup['_areaCode']} />
                  <span className='text-h6'>??????</span> */}
                  <input
                    type="checkbox"
                    id="areaCode1"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode1',undefined);"
                    checked={this.state.checkboxGroup['areaCode1']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode2"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    //  onclick="gfn_selectCode('areaCode2',undefined);"
                    checked={this.state.checkboxGroup['areaCode2']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode3"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode3',undefined);"
                    checked={this.state.checkboxGroup['areaCode3']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode4"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode1',undefined);"
                    checked={this.state.checkboxGroup['areaCode4']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode5"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    //  onclick="gfn_selectCode('areaCode2',undefined);"
                    checked={this.state.checkboxGroup['areaCode5']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode6"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode3',undefined);"
                    checked={this.state.checkboxGroup['areaCode6']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode7"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode1',undefined);"
                    checked={this.state.checkboxGroup['areaCode7']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode8"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    //  onclick="gfn_selectCode('areaCode2',undefined);"
                    checked={this.state.checkboxGroup['areaCode8']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode9"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode3',undefined);"
                    checked={this.state.checkboxGroup['areaCode9']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode10"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode1',undefined);"
                    checked={this.state.checkboxGroup['areaCode10']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode11"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    //  onclick="gfn_selectCode('areaCode2',undefined);"
                    checked={this.state.checkboxGroup['areaCode11']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode12"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode3',undefined);"
                    checked={this.state.checkboxGroup['areaCode12']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode13"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    //  onclick="gfn_selectCode('areaCode2',undefined);"
                    checked={this.state.checkboxGroup['areaCode13']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode14"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode3',undefined);"
                    checked={this.state.checkboxGroup['areaCode14']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode15"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode1',undefined);"
                    checked={this.state.checkboxGroup['areaCode15']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode16"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    //  onclick="gfn_selectCode('areaCode2',undefined);"
                    checked={this.state.checkboxGroup['areaCode16']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="areaCode17"
                    name="checkboxGroup"
                    onChange={this.handleCheckbox}
                    // onclick="gfn_selectCode('areaCode3',undefined);"
                    checked={this.state.checkboxGroup['areaCode17']}
                  />
                  <span className="text-h6">??????</span>
                </div>

                <div className="p-3 h-100 flex-wrap">
                  <p className="text-h5 text-bold w-100">?????? ??????</p>
                  <input
                    type="checkbox"
                    id="industNmA"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmA']}
                  />
                  <span className="text-h6">??????, ?????? ??? ??????(01~03)</span>
                  <input
                    type="checkbox"
                    id="industNmB"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmB']}
                  />
                  <span className="text-h6">??????(05~08)</span>
                  <input
                    type="checkbox"
                    id="industNmC"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmC']}
                  />
                  <span className="text-h6">?????????(10~34)</span>
                  <input
                    type="checkbox"
                    id="industNmD"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmD']}
                  />
                  <span className="text-h6">
                    ??????, ??????, ?????? ??? ?????? ?????? ?????????(35)
                  </span>
                  <input
                    type="checkbox"
                    id="industNmE"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmE']}
                  />
                  <span className="text-h6">
                    ??????, ?????? ??? ????????? ??????, ?????? ?????????(36~39)
                  </span>
                  <input
                    type="checkbox"
                    id="industNmF"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmF']}
                  />
                  <span className="text-h6">?????????(41~42)</span>
                  <input
                    type="checkbox"
                    id="industNmG"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmG']}
                  />
                  <span className="text-h6">?????? ??? ?????????(45~47)</span>
                  <input
                    type="checkbox"
                    id="industNmH"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmH']}
                  />
                  <span className="text-h6">?????? ??? ?????????(49~52)</span>
                  <input
                    type="checkbox"
                    id="industNmI"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmI']}
                  />
                  <span className="text-h6">?????? ??? ????????????(55~56)</span>
                  <input
                    type="checkbox"
                    id="industNmJ"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmJ']}
                  />
                  <span className="text-h6">???????????????(58~63)</span>
                  <input
                    type="checkbox"
                    id="industNmK"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmK']}
                  />
                  <span className="text-h6">?????? ??? ?????????(64~66)</span>
                  <input
                    type="checkbox"
                    id="industNmL"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmL']}
                  />
                  <span className="text-h6">????????????(68)</span>
                  <input
                    type="checkbox"
                    id="industNmM"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmM']}
                  />
                  <span className="text-h6">
                    ??????, ?????? ??? ?????? ????????????(70~73)
                  </span>
                  <input
                    type="checkbox"
                    id="industNmN"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmN']}
                  />
                  <span className="text-h6">
                    ???????????? ??????, ?????? ?????? ??? ?????? ????????????(74~76)
                  </span>
                  <input
                    type="checkbox"
                    id="industNmO"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmO']}
                  />
                  <span className="text-h6">
                    ?????? ??????, ?????? ??? ???????????? ??????(84)
                  </span>
                  <input
                    type="checkbox"
                    id="industNmP"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmP']}
                  />
                  <span className="text-h6">?????? ????????????(85)</span>
                  <input
                    type="checkbox"
                    id="industNmQ"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmQ']}
                  />
                  <span className="text-h6">
                    ????????? ??? ???????????? ????????????(86~87)
                  </span>
                  <input
                    type="checkbox"
                    id="industNmR"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmR']}
                  />
                  <span className="text-h6">
                    ??????, ????????? ??? ???????????? ????????????(90~91)
                  </span>
                  <input
                    type="checkbox"
                    id="industNmS"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmS']}
                  />
                  <span className="text-h6">
                    ?????? ??? ??????, ?????? ??? ?????? ?????? ????????????(94~96)
                  </span>
                  <input
                    type="checkbox"
                    id="industNmT"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmT']}
                  />
                  <span className="text-h6">
                    ?????? ??? ???????????? ??? ?????? ???????????? ?????? ?????? ??????
                    ????????????(97~98)
                  </span>
                  <input
                    type="checkbox"
                    id="industNmU"
                    name="checkboxGroup2"
                    onChange={this.handleCheckbox2}
                    checked={this.state.checkboxGroup2['industNmU']}
                  />
                  <span className="text-h6">?????? ??? ????????????(99)</span>
                </div>

                <div className="p-3 h-100 flex-wrap">
                  <p className="text-h5 text-bold w-100">?????? ??????</p>
                  <input
                    type="checkbox"
                    id="PldirJrsdG33"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG33']}
                  />
                  <span className="text-h6">?????????????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG03"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG03']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG14"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG14']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG05"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG05']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG07"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG07']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG12"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG12']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG45"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG45']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG21"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG21']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG06"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG06']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG11"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG11']}
                  />
                  <span className="text-h6">?????????????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG30"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG30']}
                  />
                  <span className="text-h6">????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG31"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG31']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG32"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG32']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG35"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG35']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG08"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG08']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG34"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG34']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG10"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG10']}
                  />
                  <span className="text-h6">?????????????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG02"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG02']}
                  />
                  <span className="text-h6">???????????????????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG13"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG13']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG09"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG09']}
                  />
                  <span className="text-h6">?????????????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG22"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG22']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG15"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG15']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG20"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG20']}
                  />
                  <span className="text-h6">????????????????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG17"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG17']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG16"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG16']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG27"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG27']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG01"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG01']}
                  />
                  <span className="text-h6">???????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG44"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG44']}
                  />
                  <span className="text-h6">?????????????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG42"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG42']}
                  />
                  <span className="text-h6">?????????????????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG23"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG23']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG26"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG26']}
                  />
                  <span className="text-h6">?????????</span>
                  <input
                    type="checkbox"
                    id="PldirJrsdG29"
                    name="checkboxGroup3"
                    onChange={this.handleCheckbox3}
                    checked={this.state.checkboxGroup3['PldirJrsdG29']}
                  />
                  <span className="text-h6">?????????</span>
                </div>

                <div className="p-3 h-100 flex-wrap">
                  <p className="text-h5 text-bold w-100">???????????? ??????</p>
                  <input
                    type="checkbox"
                    id="LclasId01"
                    name="checkboxGroup4"
                    onChange={this.handleCheckbox4}
                    checked={this.state.checkboxGroup4['LclasId01']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="LclasId02"
                    name="checkboxGroup4"
                    onChange={this.handleCheckbox4}
                    checked={this.state.checkboxGroup4['LclasId02']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="LclasId03"
                    name="checkboxGroup4"
                    onChange={this.handleCheckbox4}
                    checked={this.state.checkboxGroup4['LclasId03']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="LclasId04"
                    name="checkboxGroup4"
                    onChange={this.handleCheckbox4}
                    checked={this.state.checkboxGroup4['LclasId04']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="LclasId05"
                    name="checkboxGroup4"
                    onChange={this.handleCheckbox4}
                    checked={this.state.checkboxGroup4['LclasId05']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="LclasId06"
                    name="checkboxGroup4"
                    onChange={this.handleCheckbox4}
                    checked={this.state.checkboxGroup4['LclasId06']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="LclasId07"
                    name="checkboxGroup4"
                    onChange={this.handleCheckbox4}
                    checked={this.state.checkboxGroup4['LclasId07']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="LclasId08"
                    name="checkboxGroup4"
                    onChange={this.handleCheckbox4}
                    checked={this.state.checkboxGroup4['LclasId08']}
                  />
                  <span className="text-h6">??????</span>
                  <input
                    type="checkbox"
                    id="LclasId09"
                    name="checkboxGroup4"
                    onChange={this.handleCheckbox4}
                    checked={this.state.checkboxGroup4['LclasId09']}
                  />
                  <span className="text-h6">????????????</span>
                </div>

                <button
                  className="button-solid py-3 px-5 font-bold"
                  type="button"
                  onClick={this.handleOnClick}
                >
                  ??????
                </button>
              </h4>
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
    userinfo: state.authentication.userinfo,
  };
};

export default connect(BoardStateToProps, undefined)(Board);

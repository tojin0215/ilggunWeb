import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
import { logoutRequest } from '../../action/authentication';
import {
  businessRequest,
  businessUpdate,
  loginRequest,
} from '../../action/authentication';
import { PC, Mobile } from '../MediaQuery';
import './Navigation.css';

import { FaSignOutAlt } from 'react-icons/fa';

import { postBusinessGet } from '../../action/api';
import {
  clearUserInfo,
  setUserInfoBusinessId,
  getUserInfoBusinessId,
  getUserInfo,
} from '../../util/cookie';

class Navigation extends Component {
  constructor(props) {
    super(props);
    // this.setState({business: []})
    this.state = {
      business: [],
    };
    this.initCheckLoggedIn();
    this.initPage();
  }

  initCheckLoggedIn = () => {
    //로그인 되어있으면 무시
    if (this.props.status === 'SUCCESS') return true;
    try {
      //저장된 로그인이 있는지 확인
      const userinfo = getUserInfo();
      if (!userinfo.isLoggedIn) {
        this.props.goLogin();
        return true;
      }

      //저장된 로그인으로 확인
      this.props.loginRequest(userinfo.id, userinfo.pw).then(() => {
        if (this.props.status === 'SUCCESS') {
          let loginData = {
            isLoggedIn: true,
            id: userinfo.id,
            pw: userinfo.pw,
          };
          document.cookie = 'key=' + btoa(JSON.stringify(loginData));

          this.initPage();
        } else {
          if (typeof this.props.goLogin !== 'undefined') {
            this.props.goLogin();
          }
          return true;
        }
      });
    } catch (e) {}
  };

  initPage() {
    const user_id = this.props.userinfo.id;
    const business_id = getUserInfoBusinessId();
    this.props.businessRequest(user_id, business_id);

    // if (this.props.userinfo.business_id) this.props.businessRequest(this.props.userinfo.id, this.props.userinfo.business_id)
    // else this.props.businessRequest(this.props.userinfo.id, null)

    postBusinessGet(user_id)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ business: result });
      });
  }

  handleLogout = () => {
    this.props.logoutRequest().then(() => {
      clearUserInfo();
      alert('로그아웃 되었습니다.');

      // EMPTIES THE SESSION
      let loginData = {
        isLoggedIn: false,
        username: '',
      };

      document.cookie = 'key=' + btoa(JSON.stringify(loginData));

      this.props.goLogin();
    });
  };

  handleSelect = (eventKey) => {
    if (eventKey === 'logout') {
      this.handleLogout();
    } else {
      this.props.businessUpdate(eventKey);
      setUserInfoBusinessId(eventKey);
      if (typeof this.props.handleSelectNewBusiness !== 'undefined')
        this.props.handleSelectNewBusiness();
      alert(`selected ${eventKey}`);
    }
  };

  render() {
    const { userinfo } = this.props;
    return (
      <div className="flex justify-end">
        <div className="navigation">
          {/* <Nav className="mr-auto dropdownNav navitem"> */}
          {/* <Nav>
                  <NavLink exact to="/home">
                      <span className={styles.navitem}>
                          Home
                      </span>
                  </NavLink>
                  <NavLink exact to="/WorkerManage">
                      <span className={styles.navitem}>
                          근무자관리
                      </span>
                  </NavLink>
              </Nav> */}
          <Nav
            className="navUtill flex flex-auto flex-no-wrap justify-between items-center px-5"
            onSelect={this.handleSelect}
          >
            <Nav.Item className="flex items-center">
              {/* 관리자 이름 */}
              {userinfo.id === '' ? null : (
                <span className="navitem button-solid_white_text nav-name py-1 px-3 m-0">
                  {userinfo.manager_name} 님
                </span>
              )}
            </Nav.Item>
            <NavDropdown
              title={this.props.userinfo.business_name}
              id="nav-dropdown"
            >
              {this.state.business.map((business, index) => (
                <NavDropdown.Item
                  className="truncate text-center"
                  eventKey={business.bname}
                  title={business.bname}
                  key={index}
                >
                  {business.bname}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <PC>
              <Nav.Item eventKey="logout">
                <button
                  className="button-logout button-solid flex items-center py-1 px-3"
                  onClick={this.handleLogout}
                >
                  <FaSignOutAlt className="mr-2" />
                  <span className="text-center">나가기</span>
                </button>
                {/* 로그아웃 */}
                {/* {userinfo.id === '' ? null : (
                  <button className="btnSolid" onClick={this.handleLogout}>
                    LOG-OUT
                  </button>
                )} */}
              </Nav.Item>
            </PC>
            <Mobile>
              <Nav.Item className="flex items-center" eventKey="logout">
                <button
                  className="button-logout button-solid items-center py-2 px-3"
                  onClick={this.handleLogout}
                >
                  <FaSignOutAlt className="" />
                </button>
              </Nav.Item>
            </Mobile>
          </Nav>
        </div>
      </div>
    );
  }
}

const NavigationStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.login.status,
  };
};

const NavigationDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
    businessRequest: (id, business_id) => {
      return dispatch(businessRequest(id, business_id));
    },
    businessUpdate: (business_id) => {
      return dispatch(businessUpdate(business_id));
    },
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    },
  };
};
export default connect(
  NavigationStateToProps,
  NavigationDispatchToProps,
)(Navigation);

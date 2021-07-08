import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { logoutRequest } from '../../action/authentication';
import styles from './Navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  handleLogout = () => {
    this.props.logoutRequest().then(() => {
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

  render() {
    const { userinfo } = this.props;
    return (
      <div className="Navigation">
        <Navbar className={styles.navbar}>
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
          <Nav className={styles.navUtill}>
            <Nav.Item style={{ border: '1px solid #000' }}>
              대분류페이지 이름입니다.
            </Nav.Item>
            <Nav.Item style={{ border: '1px solid #000' }}>
              상세페이지 이름입니다.
            </Nav.Item>
            <Nav.Item style={{ border: '1px solid #000' }}>
                로그인 이름
              {userinfo.id === '' ? null : (
                <span className={styles.navitem}>
                  {userinfo.manager_name}님
                </span>
              )}
            </Nav.Item>
            <Nav.Item style={{ border: '1px solid #000' }}>
                로그아웃
              {userinfo.id === '' ? null : (
                <button className="btnSolid" onClick={this.handleLogout}>
                  LOG-OUT
                </button>
              )}
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const navigationStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
  };
};

const navigationDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
  };
};
export default connect(
  navigationStateToProps,
  navigationDispatchToProps,
)(Navigation);

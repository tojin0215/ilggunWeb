import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.css';
import { logoutRequest } from '../../action/authentication';
import styles from './Navigation.css';
import './Navigation.css';

import {postBusinessGet} from '../../action/api';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: []
    }
    this.initPage();
  }

  initPage() {
    // console.debug(this.props.userinfo.id);
    postBusinessGet(this.props.userinfo.id)
    .then(result => result.json())
    .then(result => {
        this.setState({business: result});
    })
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
  handleSelect = (eventKey) => {
    if (eventKey === "logout") {
      this.handleLogout()
    } else {
      alert(`selected ${eventKey}`)
    }
    
  }

  render() {
    const { userinfo } = this.props;
    return (
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
          <Nav className={styles.navUtill} onSelect={this.handleSelect}>
            <Nav.Item style={{ border: '1px solid #000', marginLeft: '50px', padding:'5px' }}>
              대분류페이지 이름입니다.
            </Nav.Item>
            <Nav.Item style={{ border: '1px solid #000', padding:'5px' }}>
              상세페이지 이름입니다.
            </Nav.Item>
            <NavDropdown title="사업장 선택바 ▼" id="nav-dropdown" style={{ border: '1px solid #000', padding:'5px' }}>
            {this.state.business.map((business, index) => (
              <NavDropdown.Item eventKey={business.id} title={business.name} key={index}>{business.name}</NavDropdown.Item>
            ))}
            </NavDropdown>
            <Nav.Item style={{ border: '1px solid #000', padding:'5px' }}>
                {/* 관리자 이름 */}
              {userinfo.id === '' ? null : (
                <span className={styles.navitem}>
                  {userinfo.manager_name}님
                </span>
              )}
            </Nav.Item>
            <Nav.Item eventKey="logout" style={{ border: '1px solid #000', padding:'5px' }}>
                로그아웃
              {/* {userinfo.id === '' ? null : (
                <button className="btnSolid" onClick={this.handleLogout}>
                  LOG-OUT
                </button>
              )} */}
            </Nav.Item>
          </Nav>
      </div>
    );
  }
}

const NavigationStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
  };
};

const NavigationDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
  };
};
export default connect(
  NavigationStateToProps,
  NavigationDispatchToProps,
)(Navigation);

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.css';
import { logoutRequest } from '../../action/authentication';
import { businessRequest, businessUpdate } from '../../action/authentication';
// import styles from './Navigation.css';
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
    if (this.props.userinfo.business_id) this.props.businessRequest(this.props.userinfo.id, this.props.userinfo.business_id)
    else this.props.businessRequest(this.props.userinfo.id, null)
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
      this.props.businessUpdate(eventKey);
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
          <Nav className='navUtill' onSelect={this.handleSelect}>
            <Nav.Item style={{ display:'none' }}>
              대분류페이지 이름입니다.
            </Nav.Item>
            <Nav.Item style={{ display:'none' }}>
              상세페이지 이름입니다.
            </Nav.Item>
            <NavDropdown 
              title={this.props.userinfo.business_name}
              id="nav-dropdown"
            >
              {this.state.business.map((business, index) => (
                <NavDropdown.Item eventKey={business.bname} title={business.bname} key={index}>
                  {business.bname}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Item>
                {/* 관리자 이름 */}
              {userinfo.id === '' ? null : (
                <span className='navitem button-solid_white nav-name'>
                  {userinfo.manager_name} 님
                </span>
              )}
            </Nav.Item>
            <Nav.Item eventKey="logout">
            <button className="button-logout button-solid" onClick={this.handleLogout}>
                  LOG-OUT
                </button>
                {/* 로그아웃 */}
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
    businessRequest: (id, business_id) => {
      return dispatch(businessRequest(id, business_id));
    },
    businessUpdate: (business_id) => {
      return dispatch(businessUpdate(business_id));
    },
  };
};
export default connect(
  NavigationStateToProps,
  NavigationDispatchToProps,
)(Navigation);

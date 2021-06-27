import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {logoutRequest} from '../../action/authentication';
import styles from './Navigation.css';
import imgLogo from '../../img/logo.png';

class Navigation extends Component {

    constructor(props){
        super(props);
    }
    handleLogout = () => {
        this.props.logoutRequest().then(
            () => {
                alert('로그아웃 되었습니다.');
 
                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };
 
                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                
                this.props.goLogin();
                
            }
        );
    }

    render(){

        const { userinfo } = this.props;
        return(

        <div className="Navigation">
        <Navbar className={styles.navbar}>
            <Navbar.Brand href="/home">
                <img
                    alt="일꾼"
                    src={imgLogo}
                    width="auto"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
            </Navbar.Brand>
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
                    <Nav.Item>
                        {userinfo.id === ""?
                        null
                        :
                        <span className={styles.navitem}>
                            {userinfo.manager_name}님
                        </span>
                        }
                    </Nav.Item>
                    <Nav.Item>
                        {userinfo.id === ""?
                        null
                        :
                        <button className='btnSolid' onClick={this.handleLogout}>
                            LOG-OUT
                        </button>
                        }
                        
                    </Nav.Item>
                </Nav>
            
        </Navbar>
        </div>
        )
    }
}

const navigationStateToProps = (state) => {
    return {
      userinfo: state.authentication.userinfo
    }
}

const navigationDispatchToProps = (dispatch) => {
    return {
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};
export default connect(navigationStateToProps, navigationDispatchToProps)(Navigation);


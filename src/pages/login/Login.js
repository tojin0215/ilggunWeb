import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Authentication from '../login/Authentication';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';

import { connect } from 'react-redux';
import {loginRequest} from '../../action/authentication';



class Login extends Component {
    handleLogin = (id, pw) => {
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        id: id
                    };
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    alert(id + '님 반갑습니다.') 
                    this.props.history.push('/home');
                    return true;
                } else {
                    alert('ID나 비밀번호를 확인해주세요.');
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div className='wrap loginWrap'>
                <div className='header'>
                    <Header />
                    <Navigation/>
                </div>
                <div className='localNavigation'>
                    <div className='container'>
                        <h2>
                            <div className='parallelogram'></div>
                            로그인
                            <span>.</span>
                        </h2>
                    </div>
                </div>
                <div className='container'>
                  <Authentication 
                  mode={true} 
                  onLogin={this.handleLogin}/>
                  
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        );
    }

    

};

 
const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = {
    container: {
      width:'100vw',
      height: '100vh', 
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column'
    },
  };
  
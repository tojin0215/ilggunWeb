import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Authentication from '../login/Authentication';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';

import { connect } from 'react-redux';
import { loginRequest } from '../../action/authentication';

import { setUserInfo, getUserInfo } from '../../util/cookie';

import '../../styles/login/login.css';

import imgloginvisual from '../../img/loginVisual.png';
import { PC, Mobile } from '../../components/MediaQuery';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.checkAlreadyLogin();
  };

  checkAlreadyLogin = () => {
    const userInfo = getUserInfo();
    if (userInfo.id) this.handleLogin(userInfo.id, userInfo.pw);
  };

  handleLogin = (id, pw) => {
    return this.props.loginRequest(id, pw).then(() => {
      // console.log(this.props.status)
      if (this.props.status === 'SUCCESS') {
        // create session data
        let loginData = {
          isLoggedIn: true,
          id: id,
          pw: pw,
        };
        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        setUserInfo(id, pw, null);
        // this.props.history.push('/selectBusiness');
        this.props.history.push('/home');
        return true;
      } else {
        alert('ID나 비밀번호를 확인해주세요.');
        return false;
      }
    });
  };

  render() {
    return (
      <div className="wrap wrap_login bg-point-light">
        <Header />
        {/* <Navigation /> */}
        <div className="container">
          <PC>
            <div className="sectionShadow container flex justify-around max-w-5xl items-center h-fit m-5 py-5 bg-light">
              <Authentication mode={true} onLogin={this.handleLogin} />
              <div className="card-visual">
                <img src={imgloginvisual} alt="로그인 배경 이미지" />
              </div>
            </div>
          </PC>
          <Mobile>
            <div className="sectionShadow container flex justify-around max-w-5xl items-center h-fit m-5 py-5 bg-light">
              <Authentication mode={true} onLogin={this.handleLogin} />
            </div>
            <p className="text-base text-center">
              해당 홈페이지는 PC 해상도에 최적화되어 있으며,
              <br /> 모바일 전용 앱이 제작되어 있습니다.
            </p>
          </Mobile>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// const styles = {
//     container: {
//       width:'100vw',
//       height: '100vh',
//       display:'flex',
//       justifyContent:'center',
//       alignItems:'center',
//       flexDirection:'column'
//     },
//     logoArea:{
//       height: '52vh',
//       display:'flex',
//       alignItems:'center',
//     },
//     logoStyle:{
//       width:'10vw',
//       height:'10vw'
//     },
//     idArea:{
//       height:'17vh',
//       display:'flex',
//       justifyContent:'flex-start',
//       alignItems:'center',
//       flexDirection:'column',
//     },
//     bottom:{
//       display:'flex',
//       justifyContent:'center',
//       paddingBottom:'0.3vw',
//       borderColor:'white',
//       borderBottomColor:'#67C8BA',
//       borderBottomWidth:'0.2vw',
//       borderStyle:'solid',
//     },
//     idStyle :{
//       width:'5vw',
//       height:'1.9vw',
//       marginRight:'3.5vw',
//       marginTop:'0.1vw'
//     },
//     pwdStyle:{
//       width:'6.3vw',
//       height:'2vw',
//       marginRight:'2.3vw',
//       marginTop:'0.2vw'
//     },
//     inputStyle:{
//       width:'20vw',
//       height:'2vw',
//       fontSize:'15px',
//       color:'#040525',
//       fontFamily: 'NanumSquareR',
//       backgroundColor:'white',
//       borderColor:'white',
//       borderWidth:0,
//       borderStyle:'solid',
//       paddingTop:'0.1vw',
//       paddingBottom:'0.1vw',
//       paddingLeft:'1vw',
//       boxShadow:0
//     },
//     btnArea:{
//       height:'15vh',
//       display:'flex',
//       justifyContent:'center',
//       flexDirection:'column'
//     },
//     btnStyle:{
//       width:'32vw',
//       height:'3.1vw',
//       backgroundColor:'white',
//       borderWidth:0,
//       borderColor:'white',
//       borderRadius:'10px',
//     },
//     loginBtnStyle:{
//       width:'100%',
//       height:'100%'
//     },
//     ilArea:{
//       height:'15vh',
//       display:'flex',
//       justifyContent:'center',
//       alignItems:'flex-end',
//       paddingBottom:'3vh',
//       //backgroundColor:'blue'
//     },
//     ilStyle:{
//       width:'7vw',
//       height:'1.2vw',
//     }
//   };

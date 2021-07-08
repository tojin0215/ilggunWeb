import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Authentication from '../login/Authentication';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';

import { connect } from 'react-redux';
import {loginRequest} from '../../action/authentication';

import axios from 'axios';
import logo from '../../img/logo.png';
import id from '../../img/id.png';
import pwd from '../../img/pwd.png';
import loginBtn from '../../img/login.png';
import google from '../../img/google.png';
import ilggun from '../../img/ilggun.png';

import '../../styles/login/login.css';


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

    

//     constructor(props) {
//         super(props);
//         this.state = {
//           id: "",
//           password: "",
//           name: "",
//           isLogin: null
//         };
//       }

//       //이메일 입력창 관리
//   handleId = e => {
//     this.setState({
//       id: e.target.value
//     });
//   };
//   //패스워드 입력창 관리
//   handlePassword = e => {
//     this.setState({
//       password: e.target.value
//     });
//   };
//   //로그인버튼 클릭시 서버로 데이터 전송
//   handleSubmit = async(e) => {
//     e.preventDefault();
//     const login_info = {
//       method: "POST",
//       body: JSON.stringify(this.state),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     };

//     await axios.post('https://www.toojin.tk:3000/signin', { 
//         id: this.state.id,
//         password: this.state.password, 
//         headers:{
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'}
//       })
//       .then((responseData) => {
//         console.log(responseData);
//         if(responseData.data[0] == undefined || responseData.data[0] == ''){
//           alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.")
//         }else{
//           //storeToken({id:responseData.data[0].id, name:responseData.data[0].name});
//           //getToken();
      
//           if(responseData.data[0].id){
//             //onSignIn();
//             console.log(responseData.data[0].id);
//             //this.props.history.push("/Businesslist/"+responseData.data[0].id)
//           }
//         }
//       })
//       .catch(function(error) {
//         alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.")

//         if (!error.response) {
//           // network error
//           console.log('hh'+error)
//         }
//       });
//     /*fetch("https://www.toojin.tk:3000/signin", login_info)
//       .then(res => {
//         return res.json();
//       })
//       .then(json => {
//         //json형식 {idx: 8, name: "noh", email: "noh@gmail.com", success: true}
//         if (json.success === true) {
//           alert("로그인되었습니다");
//           // 서버로 부터 받은 JSON형태의 데이터를 로컬스토리지에 우선 저장한다.
//           window.localStorage.setItem('userInfo', JSON.stringify(json))
//           //스테이트에 유저정보를 저장한다.
//           this.setState({
//             idx: json.idx,
//             id: json.id,
//             name: json.name,
//             isLogin: json.success
//           });
//           this.props.history.push("/Businesslist")
//         } else {
//           alert("아이디 혹은 비밀번호를 확인하세요");
//         }
//       });*/
//     };
//     render() {
//         return (
//             <div>
//                 <Router>
//                   <div style={styles.container}>
//                     <div style={styles.logoArea}>
//                      <img src={logo} style={styles.logoStyle}/>
//                     </div>
//                     <div>
//                     <form onSubmit={this.handleSubmit}>
                        
//                       <div style={styles.idArea}>
//                         <div style={styles.bottom}>
//                           <img src={id} style={styles.idStyle}/>
//                           <input
//                               placeholder="아이디를 입력하세요"
//                               value={this.state.id}
//                               onChange={this.handleId}
//                               style={styles.inputStyle}
//                           />
//                         </div>
//                         <div style={{paddingTop:'1.5vw'}}></div>
//                         <div style={styles.bottom}>
//                           <img src={pwd} style={styles.pwdStyle}/>
//                           <input
//                               placeholder="비밀번호를 입력하세요"
//                               value={this.state.password}
//                               onChange={this.handlePassword}
//                               style={styles.inputStyle}
//                               type="password"
//                           />
//                         </div>
//                         </div>
                        
//                         <div style={styles.btnArea}>
//                         <div>
//                         <button type="submit" style={styles.btnStyle}>
//                           <img src={loginBtn} style={styles.loginBtnStyle}/>
//                         </button>
//                         </div>
//                         <div style={{paddingTop:'0.5vh'}}>
//                         <button type="" style={styles.btnStyle}>
//                           <img src={google} style={styles.loginBtnStyle}/>
//                         </button>
//                         </div>
//                         </div>
//                     </form>
//                     </div>
//                     <div style={styles.ilArea}>
//                      <img src={ilggun} style={styles.ilStyle}/>
//                     </div>
//                   </div>
//                 </Router>
//             </div>
//         );
//     };

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
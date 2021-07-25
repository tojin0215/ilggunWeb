import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table from '../../components/Navigation/Table3';

import {loginRequest} from '../../action/authentication';

import '../../styles/home/home.css';


import data from '../../components/Navigation/data';
const clickhandler = name => console.log("delete", name);

class Home extends Component {
    constructor(props) {
      super(props);
      if (props.location.state) {
        this.state = {
          business_id: props.location.state.business_id
        }
      } else {
        this.state = { }
      }
    }

    goLogin = () => {
        this.props.history.push("/");
    }
    componentDidMount() { //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie; 
            var parts = value.split("; " + name + "="); 
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // get loginData from cookie
        let loginData = getCookie('key');
        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined"){
            this.props.history.push('/');
            return;
        }

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
        // if not logged in, do nothing
        if(!loginData.isLoggedIn){
            this.props.history.push('/');
            return;
        }

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.loginRequest(loginData.id, loginData.pw).then(
            () => {
                console.log(loginData);
                // if session is not valid
                // if(!this.props.status.valid) {
                if(!this.props.status.isLoggedIn) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        id: ''
                    };

                    document.cookie='key=' + btoa(JSON.stringify(loginData));
                    // and notify
                    alert("다시 로그인 바랍니다")
                    this.props.history.push('/');
                } else {
                    if (loginData.business_id) {
                        this.setState({business_id: loginData.business_id})
                    } else if(this.state.business_id) {
                        loginData.business_id = this.state.business_id;
                        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    }
                }
            }
        );
    }

    render() {
        const { userinfo } = this.props;

      return (
        
        <div className='container'>
            <Header />
            <Navigation goLogin={this.goLogin}/>
            <div style={{marginTop:'10rem', marginBottom:'10rem',display:'flex', width:'100%',}}>
                <div style={{flex:1}}>
                    <Menu/>
                </div>
                <div style={{flex:4, backgroundColor:'#cca9dd'}}>
                    <h4>오늘의 근무자</h4>
                        <Table data={data} click={clickhandler}/>
                    {/* <h5>Home</h5>
                    <div className='sectionShadow'>
                        
                    </div> */}
                </div>
            </div>
            
            <Footer/>
        </div>
      )
    }
}
  
const HomeStateToProps = (state) => {
    return {
      userinfo: state.authentication.userinfo,
      status: state.authentication.status
    }
}

const HomeDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};
export default connect(HomeStateToProps, HomeDispatchToProps)(Home);
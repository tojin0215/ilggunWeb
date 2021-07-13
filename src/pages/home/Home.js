import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import {getStatusRequest} from '../../action/authentication';

import '../../styles/home/home.css';

class Home extends Component {

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
        this.props.getStatusRequest().then(
            () => {
                // if session is not valid
                if(!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        id: ''
                    };
   
                    document.cookie='key=' + btoa(JSON.stringify(loginData));
   
                    // and notify
                    alert("Your session is expired, please log in again")
                }
                // else{
                //     this.cusFetch();//기본값
                // }
            }
        );
    }

    render() {
        const { userinfo } = this.props;
        console.log("userinfo : ", userinfo);

      return (
        
        <div className='container'>
            <Header />
            <Navigation goLogin={this.goLogin}/>
            <div style={{marginTop:'10rem', marginBottom:'10rem',display:'flex',width:'67rem',}}>
                <div style={{flex:1}}>
                    <Menu/>
                </div>
                <div style={{flex:4, backgroundColor:'#cca9dd'}}>
                    <h5>Home</h5>
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
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
    };
};
export default connect(HomeStateToProps, HomeDispatchToProps)(Home);
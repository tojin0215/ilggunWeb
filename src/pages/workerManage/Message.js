import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import '../../styles/home/home.css';

class Message extends Component {

    goLogin = () => {
        this.props.history.push("/");
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
            
                <div style={{flex:3.5, backgroundColor:'#cca9dd'}}>
                    <h5>근로자관리</h5>
                    <h5>근로자관리</h5>
                    <h5>근로자관리</h5>
                    <h5>근로자관리</h5>

                </div>
            </div>
            <Footer/>
        </div>
      )
    }
}

const MessageStateToProps = (state) => {
    return {
      userinfo: state.authentication.userinfo,
      //status: state.authentication.status
    }
}

export default connect(MessageStateToProps, undefined)(Message);
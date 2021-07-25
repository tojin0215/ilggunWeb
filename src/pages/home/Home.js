import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table from '../../components/Navigation/Table3';

import { loginRequest } from '../../action/authentication';
import { businessRequest } from '../../action/authentication';
import { setBusiness } from '../../action/userinfo';
import { postBusinessGet } from '../../action/api';

import '../../styles/home/home.css';

import data from '../../components/Navigation/data';
const clickhandler = (name) => console.log('delete', name);

class Home extends Component {
  constructor(props) {
    super(props);
    if (props.location.state) {
      this.state = {
        business_id: props.location.state.business_id,
      };
    } else {
      this.state = {};
    }
  }

  goLogin = () => {
    this.props.history.push('/');
  };

  curFetch = (id, pw) => {
    // get cookie by name
    function getCookie(name) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      if (parts.length == 2) return parts.pop().split(';').shift();
    }

    // get loginData from cookie
    let loginData = getCookie('key');
    this.props
          .businessRequest(this.props.userinfo.id, loginData.business_id)
          // .then(() => {
          //   console.debug('this.props.businessRequest', this.props.userinfo);
          // });
        postBusinessGet(loginData.id)
          .then((result) => result.json())
          .then((result) => {
            loginData = {
              isLoggedIn: true,
              id: loginData.id,
              pw: loginData.pw,
              business_id: result ? result[0].id : '',
            };
            // this.props.setBusiness((result) ? result[0].id: "");
            this.setState({ business: result });
          });
        if (loginData.business_id) {
          this.setState({ business_id: loginData.business_id });
        } else if (this.state.business_id) {
          loginData.business_id = this.state.business_id;
          document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        }
  }
  componentDidMount() {
    //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
    // get cookie by name
    function getCookie(name) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      if (parts.length == 2) return parts.pop().split(';').shift();
    }

    // get loginData from cookie
    let loginData = getCookie('key');
    // if loginData is undefined, do nothing
    if (typeof loginData === 'undefined') {
      this.props.history.push('/');
      return;
    }

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));
    // if not logged in, do nothing
    if (!loginData.isLoggedIn) {
      this.props.history.push('/');
      return;
    }

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.loginRequest(loginData.id, loginData.pw).then(() => {
      // if session is not valid
      // if(!this.props.status.valid) {
      if (!this.props.status.isLoggedIn) {
        // logout the session
        loginData = {
          isLoggedIn: false,
          id: '',
        };

        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        // and notify
        alert('다시 로그인 바랍니다');
        this.props.history.push('/');
      } else {
        this.props
          .businessRequest(this.props.userinfo.id, loginData.id)
          .then(() => {
            console.debug('this.props.businessRequest', this.props.userinfo);
          });
        postBusinessGet(loginData.id)
          .then((result) => result.json())
          .then((result) => {
            loginData = {
              isLoggedIn: true,
              id: loginData.id,
              pw: loginData.pw,
              business_id: result ? result[0].id : '',
            };
            // this.props.setBusiness((result) ? result[0].id: "");
            this.setState({ business: result });
          });
        if (loginData.business_id) {
          this.setState({ business_id: loginData.business_id });
        } else if (this.state.business_id) {
          loginData.business_id = this.state.business_id;
          document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        }
      }
    });
  }

  render() {
    const { userinfo } = this.props;

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className='container'>
          <Menu />
          <article className='sectionShadow'>
            <h4>오늘의 근무자</h4>
            <Table data={data} click={clickhandler} />
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const HomeStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.status,
    userinfo_2: state.userinfo,
  };
};

const HomeDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    },
    businessRequest: (id, business_id) => {
      return dispatch(businessRequest(id, business_id));
    },
  };
};
export default connect(HomeStateToProps, HomeDispatchToProps)(Home);

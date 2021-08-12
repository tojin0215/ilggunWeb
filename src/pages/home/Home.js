import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table from '../../components/Navigation/Table3';

import { loginRequest } from '../../action/authentication';
import { businessRequest, businessUpdate } from '../../action/authentication';
import { setBusiness } from '../../action/userinfo';
import { postBusinessGet, postSelectWorker, selectTimelog, selectWorkerByType } from '../../action/api';
import {selectReceivedMessage} from '../../action/api';
import {getUserInfo, setUserInfo, getUserInfoBusinessId, setUserInfoBusinessId, selectVacation} from '../../util/cookie';

import '../../styles/home/home.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';

import data from '../../components/Navigation/data';
const clickhandler = (name) => console.log('delete', name);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business_id: "",
      worker: [],
      timelog: [],
      message_count: 0,
      recv_message: []
    };
    this.curFetchWorker();
  }

  goLogin = () => {
    this.props.history.push('/');
  };

  handleSelectNewBusiness = () => {
    this.curFetchWorker();
  }


  curFetchWorker = () => {
    const d = new Date()
    const business_id = (getUserInfoBusinessId())? getUserInfoBusinessId() : this.props.userinfo.business_name;

    selectWorkerByType(business_id, 2)
    .then(result => result.json())
    .then(selectWorkerByType_result => {
      // this.setState({ worker: result })

      selectTimelog(business_id, d.getFullYear(), d.getMonth()+1, d.getDate())
      .then(result => result.json())
      .then(result => {
        const selectTimelogResult = selectWorkerByType_result.map((item, index) => {
          const timelog = result.find((res) => res.workername == item.workername);
          item["timelog"] = timelog;
          return item;
        })
        // this.setState({worker: selectWorkerByType_result.map((item, index) => {
        //   const timelog = result.find((res) => res.workername == item.workername);
        //   item["timelog"] = timelog;
        //   return item;
        // })})

        selectVacation(business_id)
        .then(result => result.json())
        .then(selectVacation_result => {
          selectTimelogResult
        })

        this.forceUpdate();
      })
      .catch(error => {
        console.error("curFetchWorker",error);
      })
    })
  }

  returnToLogin = () => {
    const loginData = {
      isLoggedIn: false,
      id: '',
    };

    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
    // and notify
    alert('다시 로그인 바랍니다');
    this.props.history.push('/');
  }

  initLoadMessageCount = () => {
    selectReceivedMessage(this.props.userinfo.id)
    .then(result => result.json())
    .then(result => {
      this.setState({message_count: result.length})
    })
  }

  initLoadBusiness = (user_id, business_id) => {
    this.props.businessRequest(user_id, business_id)
    .then(v => {
      postBusinessGet(user_id)
      .then((result) => result.json())
      .then((result) => {
        const new_business_id = (!business_id &&result && result.length > 0) ? result[0].bname : '';

        this.setState({ business: result });
        this.setState({ business_id: new_business_id });
        setUserInfoBusinessId(new_business_id)

        this.curFetchWorker();
        this.initLoadMessageCount();
      });
    });
  }

  initLoadUserInfo = (id, pw) => {
    this.props.loginRequest(id, pw)
    .then(() => {
      if (!this.props.status.isLoggedIn) this.returnToLogin(); 
      else {
        const business_id = getUserInfoBusinessId()
        setUserInfo(id, pw, null)
        this.initLoadBusiness(id, business_id)
      }
    })
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

    // document.cookie = 'key=' + btoa(JSON.stringify(loginData));

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.initLoadUserInfo(loginData.id, loginData.pw)
  }

  render() {
    const { userinfo } = this.props;
    const alarms = this.state.recv_message.map((item, index) => {
      return <li>{item.message}</li>
    })
    console.log(this.state.recv_message)

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin}  handleSelectNewBusiness={this.handleSelectNewBusiness}/>
        <div className='container'>
          <Menu />
          <article className='sectionShadow'>
            <h4 className='text-h5 text-bold'>
              <span className='color-point text-h5'>✔ </span>
               알림
              <p className='text-h6 p-3 mt-2 small-box text-medium'>{this.state.message_count} 개의 새로운 메시지가 있습니다.</p>
            </h4>
            <ul>
            {alarms}
            </ul>
          </article>
          <article className='sectionShadow'>
            <h4 className='text-h5 text-bold'>
              <span className='color-point text-h5'>✔ </span>
              오늘의 근무자
            </h4>
            <Table data={this.state.worker} click={clickhandler} />
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
    businessUpdate: (business_id) => {
      return dispatch(businessUpdate(business_id));
    }
  };
};
export default connect(HomeStateToProps, HomeDispatchToProps)(Home);

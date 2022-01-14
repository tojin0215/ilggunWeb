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
import {
  postBusinessGet,
  postSelectWorker,
  selectTimelog,
  selectWorkerByType,
  selectVacation,
  selectReceivedMessage,
  addLoginHistory
} from '../../action/api';
import {
  getUserInfo,
  setUserInfo,
  getUserInfoBusinessId,
  setUserInfoBusinessId,
} from '../../util/cookie';

import { FaBell } from 'react-icons/fa';

import '../../styles/home/home.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
//import data from '../../components/Navigation/data';
import moment from 'moment';
import 'moment/locale/ko';

const clickhandler = (name) => console.log('delete', name);

const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business_id: '',
      worker: [],
      timelog: [],
      message_count: 0,
      recv_message: [],
      login_time: moment().format('YYYY-MM-DD a h:mm:ss'),
      lhistory: []

    };
    this.curFetchWorker();
  }

  goLogin = () => {
    this.props.history.push('/');
  };

  handleSelectNewBusiness = () => {
    this.curFetchWorker();
  };

  curFetchWorker = () => {
    const d = new Date();
    const business_id = getUserInfoBusinessId()
      ? getUserInfoBusinessId()
      : this.props.userinfo.business_name;

    selectWorkerByType(business_id, 2)
      .then((result) => result.json())
      .then((selectWorkerByType_result) => {
        selectTimelog(
          business_id,
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate(),
        )
          .then((result) => result.json())
          .then((result) => {
            const selectTimelogResult = selectWorkerByType_result.map(
              (item, index) => {
                const timelog = result.find(
                  (res) => res.workername == item.workername,
                );
                item['timelog'] = timelog;
                return item;
              },
            );

            selectVacation(business_id)
              .then((result) => result.json())
              .then((selectVacation_result) => {
                selectVacation_result = selectVacation_result.map(
                  (item, index) => {
                    return {
                      business_id: '' + item.bang,
                      start_date: new Date(item.start_date),
                      end_date: new Date(item.end_date),
                      reason: '' + item.reason,
                      vacation_type: 0 + item.vacation,
                      worker_name: '' + item.workername,
                      start_date_str: '' + item.start_date,
                      end_date_str: '' + item.end_date,
                      worker_id: null,
                    };
                  },
                );

                const d = new Date();
                selectVacation_result = selectVacation_result.filter(
                  (item) => item.end_date > d,
                );
                console.log(selectVacation_result);

                const workerResult = selectTimelogResult.map((item, index) => {
                  const filtered = selectVacation_result.filter(
                    (vac_item) => vac_item.worker_name === item.workername2,
                  );
                  if (filtered.length > 0) item['vacation'] = filtered[0];
                  else item['vacation'] = null;

                  item['goToWork'] = item[day[new Date().getDay()]]
                    ? item[day[new Date().getDay()]].slice(0, 2) +
                    ':' +
                    item[day[new Date().getDay()]].slice(2, 4)
                    : '출근안함';

                  item['goToHome'] = item[day[new Date().getDay()]]
                    ? item[day[new Date().getDay()]].slice(4, 6) +
                    ':' +
                    item[day[new Date().getDay()]].slice(6, 8)
                    : '출근안함';

                  return item;
                });

                console.log(workerResult);
                this.setState({ worker: workerResult });
                this.loginHistory()
              });
            // this.forceUpdate();
          })
          .catch((error) => {
            console.error('curFetchWorker', error);
          });
      });
    console.log(this.props);
  };

  returnToLogin = () => {
    const loginData = {
      isLoggedIn: false,
      id: '',
    };

    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
    // and notify
    alert('다시 로그인 바랍니다');
    this.props.history.push('/');
  };

  initLoadMessageCount = () => {
    selectReceivedMessage(this.props.userinfo.id)
      .then((result) => result.json())
      .then((result) => {
        result = result.filter((item) => item.r === 0);
        this.setState({ message_count: result.length });
      });
  };

  initLoadBusiness = (user_id, business_id) => {
    this.props.businessRequest(user_id, business_id).then((v) => {
      postBusinessGet(user_id)
        .then((result) => result.json())
        .then((result) => {
          const new_business_id =
            !business_id && result && result.length > 0 ? result[0].bname : '';

          this.setState({ business: result });
          this.setState({ business_id: new_business_id });
          setUserInfoBusinessId(new_business_id);
          this.curFetchWorker();
          this.initLoadMessageCount();
        });
    });
  };

  loginHistory = () => {
    addLoginHistory(this.props.userinfo.business_name, this.state.login_time, this.state.worker.length)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ lhistory: result })
      })
  }

  initLoadUserInfo = (id, pw) => {
    this.props.loginRequest(id, pw).then(() => {
      if (!this.props.status.isLoggedIn) this.returnToLogin();
      else {
        const business_id = getUserInfoBusinessId();
        setUserInfo(id, pw, null);
        this.initLoadBusiness(id, business_id);

      }
    });
  };


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
    this.initLoadUserInfo(loginData.id, loginData.pw);
  }

  render() {
    const { userinfo } = this.props;
    const alarms = this.state.recv_message.map((item, index) => {
      return <li>{item.message}</li>;
    });

    return (
      <div className="wrap">
        <Header />
        <Navigation
          goLogin={this.goLogin}
          handleSelectNewBusiness={this.handleSelectNewBusiness}
        />
        <Menu />
        <div className="container">
          <article className="sectionShadow">
            <h4 className="text-h5 text-bold">
              <span className="color-point text-h5">✔ </span>
              알림
              <p className="text-h6 p-3 mt-2 small-box text-medium fw-bold">
                {this.state.message_count} 개의 새로운 메시지가 있습니다.
              </p>
            </h4>
            <ul>{alarms}</ul>
          </article>
          <article className="sectionShadow">
            <h4 className="text-h5 text-bold">
              <span className="color-point text-h5">✔ </span>
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
    },
  };
};
export default connect(HomeStateToProps, HomeDispatchToProps)(Home);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { loginRequest } from '../../action/authentication';
import { setBusiness } from '../../action/userinfo';
import { postBusinessGet } from '../../action/api';

function ListItemLink(props) {
  // const CustomLink = props => <Link to={{pathname: '/home', state: {business_id: id}}}{...props} />;
  return <ListItem button component={Link} {...props} />;
}

class SelectBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: [],
    };
  }

  goLogin = () => {
    // this.props.history.push("/");
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

    this.props.loginRequest(loginData.id, loginData.pw).then(() => {
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
        postBusinessGet(loginData.id)
        .then((result) => result.json())
        .then((result) => {
          loginData = {
            isLoggedIn: true,
            id: loginData.id,
            pw: loginData.pw,
            business_id: ""
          };
          this.setState({ business: result });
        });
      }
    });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <List component="nav" aria-label="secondary mailbox folders">
          {this.state.business.map((business, index) => (
            // <Link to={{pathname: '/home', state: {business_id: week.id}}}>{week.type}</Link>
            <ListItemLink
              to={{ pathname: '/home', state: { business_id: business.id } }}
              key={index}
            >
              <ListItemText primary={business.type} />
              <ListItemText primary={business.id} />
            </ListItemLink>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    },
    setBusiness: (business_id) => {
      return dispatch(setBusiness(business_id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectBusiness);

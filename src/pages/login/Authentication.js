import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Authentication extends Component {
  state = {
    mode: false,
    id: '',
    password: '',
  };

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleRegister = () => {
    let id = this.state.id;
    let pw = this.state.password;

    this.props.onRegister(id, pw).then((result) => {
      if (!result) {
        this.setState({
          id: '',
          password: '',
        });
      }
    });
  };

  handleLogin = () => {
    let id = this.state.id;
    let pw = this.state.password;

    this.props.onLogin(id, pw).then((success) => {
      if (!success) {
        this.setState({
          password: '',
        });
      }
    });
  };
  handleKeyPress = (e) => {
    if (e.charCode == 13) {
      if (this.props.mode) {
        this.handleLogin();
      } else {
        this.handleRegister();
      }
    }
  };
  render() {
    const inputBoxes = (
      <div>
        <div className="input-field col s12 id">
          <label>아이디</label>
          <input
            name="id"
            type="text"
            className="validate"
            onChange={this.handleChange}
            value={this.state.id}
          />
        </div>
        <div className="input-field col s12">
          <label>비밀번호</label>
          <input
            name="password"
            type="password"
            className="validate"
            onChange={this.handleChange}
            value={this.state.password}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );

    const loginView = (
      <div className="loginCard">
        <div className="card-content">
          <div className="row">
            {inputBoxes}
            <button onClick={this.handleLogin}>LOGIN</button>
            <a
              className="waves-effect waves-light btn"
              onClick={this.handleLogin}
            >
              <button>LOGIN</button>
            </a>
          </div>
        </div>

        {/*<div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>*/}
      </div>
    );

    const registerView = (
      <div className="card-content">
        <div className="row">
          {inputBoxes}
          <a
            className="waves-effect waves-light btn"
            onClick={this.handleRegister}
          >
            회원가입
          </a>
        </div>
      </div>
    );

    return (
      <div className="container auth">
        <div className="text-h2">
          <p className='text-bold text-h2'>편리한 근태관리 서비스</p>
          <p className="text-h2">
            <span className='text-h1 text-point text-extrabold'>일꾼</span>에 오신 것을 환영합니다.
          </p>
        </div>
        <div className="card">
          {/*<div className="header blue white-text center">
                      <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>*/}
          {this.props.mode ? loginView : registerView}
        </div>
      </div>
    );
  }
}

Authentication.propTypes = {
  mode: PropTypes.bool,
  onRegister: PropTypes.func,
  onLogin: PropTypes.func,
};

Authentication.defaultProps = {
  mode: true,
  onRegister: (id, pw) => {
    console.error('register function is not defined');
  },
  onLogin: (id, pw) => {
    console.error('login function not defined');
  },
};

export default Authentication;

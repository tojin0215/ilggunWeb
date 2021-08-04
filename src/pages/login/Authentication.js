import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import imgPerson from '../../img/person.png';
import imgPassword from '../../img/password.png';


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
        <div className="input-field input-underline input-id">
          <label>
            <div className='label-icon'>
              <img src={ imgPerson } alt='로그인 아이콘'/>
            </div>
            <p className='color-point text-h5'>아이디</p>
            <input
              name="id"
              type="text"
              className="validate text-h5"
              onChange={this.handleChange}
              value={this.state.id}
            />
          </label>
        </div>
        <div className="input-field input-underline input-password">
          <label className='color-point text-h5'>
            <div className='label-icon'>
              <img src={ imgPassword } alt='비밀번호 아이콘'/>
            </div>
            <p className='color-point text-h5'>비밀번호</p>
            <input
              name="password"
              type="password"
              className="validate"
              onChange={this.handleChange}
              value={this.state.password}
              onKeyPress={this.handleKeyPress}
            />
          </label>
        </div>
      </div>
    );

    const loginView = (
      <div className="loginCard">
        <div className="card-content">
          <div className="row">
            {inputBoxes}
            <button className='button-solid text-h5 text-bold' onClick={this.handleLogin}>LOGIN</button>
            {/* <button onClick={this.handleLogin}>로그인</button> */}
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
        <div>
          <p className='text-bold text-h4'>편리한 근태관리 서비스</p>
          <p className="text-h4">
            <span className='text-h3 color-point text-bold'>일꾼</span>에 오신 것을 환영합니다.
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

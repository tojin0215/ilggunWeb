import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table3 from '../../components/Navigation/Table3';
import data from '../../components/Navigation/data';
import Calendar from 'react-calendar';


import '../../styles/home/home.css';


class TaskManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date()
    }
  }
  goLogin = () => {
    this.props.history.push('/');
  };
  onChange = (e) => {
    this.setState({value: e});
    console.log(e);
  }

  render() {
    const { userinfo } = this.props;
    const clickhandler = name => console.log("delete", name);

    return (
      <div className="wrap warp_taskmanage">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <p>
          업무관리 페이지 컨테이너 입니다.
          </p>
          <div style={{ display:'flex' }}>
            <div
                style={{
                width: '500px',
                height: '300px',
                border: '1px solid #000',
                padding: '10px',
                margin: '10px',
                }}
            >
              <Calendar
        onChange={this.onChange}
        value={this.state.value}
      />
                {/* 캘린더 선택 공간입니다.
                <br />
                날짜 선택 시 해당 날짜의 정보를 전달합니다. */}
            </div>
            <article
            style={{
                width: '500px',
                height: '300px',
                border: '1px solid #000',
                padding: '10px',
                margin: '10px',
            }}
            >
                <h4>오늘의 휴가자</h4>
                <div>
                    해당 날짜 휴가자의 이름, 휴가기간이 표시됩니다.
                </div>
            </article>
          </div>
          <div className='sectionShadow'>
            <h4>오늘의 근무자</h4>
            <Table3 data={data} click={clickhandler}/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const TaskManageStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(TaskManageStateToProps, undefined)(TaskManage);

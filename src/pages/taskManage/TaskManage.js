import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import TableVacation from '../../components/Navigation/TableVacation';
import Table3 from '../../components/Navigation/Table3';
import data from '../../components/Navigation/data';
import Calendar from 'react-calendar';

import '../../styles/teskmanage/teskmanage.css';
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
          <article className='todayleave'>
            <h4 className='text-h5 w-100'>
              <span className='color-point text-h5'>✔ </span>
              오늘의 휴가자
            </h4>
            <Calendar
              onChange={this.onChange}
              value={this.state.value}
              className='sectionShadow'
            />
            <div className='sectionShadow'>
              <TableVacation data={data} />
            </div>
          </article>
          <article className='sectionShadow'>
            <h4>오늘의 근무자</h4>
            <Table3 data={data} click={clickhandler}/>
          </article>
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

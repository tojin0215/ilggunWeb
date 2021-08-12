import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table from '../../components/Navigation/TableWorker';
import data from '../../components/Navigation/data';
import { selectTimelog, selectWorkerByType} from "../../action/api"

import '../../styles/home/home.css';


class WorkerManage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        worker: []
      }
      this.curFetch()
  }

  curFetch = () => {
    selectWorkerByType(this.props.userinfo.business_name, 2)
    .then(result => result.json())
    .then(result => {
      this.setState({ worker: result })
    })


    // const d = new Date()
    // selectTimelog(this.props.userinfo.business_name, d.getFullYear(), d.getMonth()+1, d.getDate())
    // .then(result => result.json())
    // .then(result => {
    //   // console.log("result", business_id, d.getFullYear(), d.getMonth()+1, d.getDate())
    //   // console.log(result, business_id)
    //   this.setState({worker: this.state.worker.map((item, index) => {
    //      const timelog = result.find((res) => res.workername == item.workername);
    //      item["timelog"] = timelog;
    //      return item;
    //   })})
    // })
    // .catch(error => {
    //   console.error("curFetchWorker",error);
    // })
  }

  goLogin = () => {
    this.props.history.push('/');
  };
  
  render() {
    const { userinfo } = this.props;

    const clickhandler = name => console.log("delete", name);

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='sectionShadow'>
            {/* <Table data={this.state.worker} click={clickhandler}/> */}
            <Table data={this.state.worker} click={clickhandler}/>
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const WorkerManageStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.status
  };
};

export default connect(WorkerManageStateToProps, undefined)(WorkerManage);

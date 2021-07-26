import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import '../../styles/home/home.css';

class WorkerManageContract extends Component {
  constructor(props) {
      super(props);
      // this.props.location.worker.name
      console.debug("WorkerManageContract");
      console.debug(props);
      this.props.userinfo.business_name
  }

  goLogin = () => {
    this.props.history.push('/');
  };

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
            직원관리/근로계약서의 직원 근로계약서 상세 아티클입니다.<br/>
            <form style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
              이름 및 조작 버튼이 들어가는 공간입니다.<br/>
              <span style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
                {/* {this.props.location.state.worker.name} */}직원이름
              </span>
              <button>
                작성/수정
              </button>
              <button>
                다운로드
              </button>
              <button>
                프린트
              </button>
            </form>
            <div style={{ border:'1px solid #000', padding:'10px', margin:'10px' }}>
              해당 직원의 근로계약서 내용이 표시됩니다.<br/>
              작성되지 않은 경우 근로계약서 내에 작성할 수 있는 input 공간이 들어갑니다.<br/>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const WorkerManageContractStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(WorkerManageContractStateToProps, undefined)(WorkerManageContract);

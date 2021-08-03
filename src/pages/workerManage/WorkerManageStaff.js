import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Table2 from '../../components/Navigation/Table2';
import data from '../../components/Navigation/data';

import '../../styles/home/home.css';
import {Modal} from '../../components/Modal/Modal'
import QRCode from "react-qr-code";
import Button from 'react-bootstrap/Button'

import {selectWorkerByType, selectContractform} from '../../action/api'


class WorkerManageStaff extends Component {
  constructor(props) {
      super(props);
      this.state = {
        modalOpen: false,
        modalData: "",
        worker: []
      }
      this.curFetch()
  }

  // curFetchWorker = (worker) => {
  //   this.setState({worker: worker.map((item, index) => {
  //     selectContractform(
  //       item.workername,
  //       this.props.userinfo.business_name,
  //     )
  //       .then((res) => res.json())
  //       .then((result) => {
  //         const res = result[0]
  //         console.log('||__________||');
  //         console.log(res);
  //         if (res) item["startdate"] = `${res.StartYear}/${res.StartMonth}/${res.StartDay}`;
  //         else console.log(item);
  //         return item
  //       })
  //   })})
  // }

  curFetch = () => {
    selectWorkerByType(this.props.userinfo.business_name, 2)
    .then(result => result.json())
    .then(result => {
      console.log('|__________|');
      console.log(result);
      this.setState({ worker: result })
      // this.curFetchWorker(result);
    })
    return
  };

  openModal = (modalData) => {
    console.log(modalData)
    this.setState({
      modalOpen: true,
      modalData: modalData.toString()
    });
  }

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalData: ""
    });
  }

  deleteWorker = (business_id, workername) => {
    const idx = this.state.worker.findIndex(function(item) {return item.workername === workername}) // findIndex = find + indexOf
    // if (idx > -1) this.state.worker.splice(idx, 1)
    this.state.worker[idx].state = 3;

    this.setState({
      modalOpen: false,
      modalData: ""
    });
  }

  goLogin = () => {
    this.props.history.push('/');
  };

  onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
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
            {/* <Table2 data={this.state.worker} click={clickhandler} openModal={this.openModal} deleteWorker={this.deleteWorker}/> */}
            <Table2 data={this.state.worker} click={clickhandler} openModal={this.openModal} deleteWorker={this.deleteWorker}/>
          </article>
          <Modal open={ this.state.modalOpen } close={ this.closeModal } title="Create a chat room">
            <QRCode id="QRCode" value={ this.state.modalData } />
            <Button
                // type="button"
                value="QR 다운로드"
                onClick={this.onImageCownload}
              >"QR 다운로드</Button>
          </Modal>
        </div>
        <Footer />
      </div>
    );
  }
}

const WorkerManageStaffStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(WorkerManageStaffStateToProps, undefined)(WorkerManageStaff);

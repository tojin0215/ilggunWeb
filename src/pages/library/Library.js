import React, { Component, useRef  } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Table from '../../components/Navigation/TableFile';
import { getBase64 } from '../../action/api';
import { upload, filelist, deleteFile } from '../../action/api';
import {SERVER_URL} from '../../const/setting';

import '../../styles/home/home.css';

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      base64URL: '',
      uploadFile: null,
      fileName: null,
      // inputRef: useRef<HTMLInputElement>(null)
    };
    this.getBase64 = getBase64
    // this.initPage();
    this.curFetch();
  }

  curFetch = () => {
    filelist(this.props.userinfo.business_name)
    // filelist("undefined")
    .then(r => r.json())
    .then(result_file => {
      console.log(result_file);
      this.setState({file: result_file.file.map((item, index) => {return {name: item}})})
    })
    .catch(error => console.error(error));
  }

  goLogin = () => {
    this.props.history.push('/');
  };

  handleUpload = (e) => {
    if (!this.state.uploadFile) {
      alert("먼저 파일을 선택하세요")
      return
    }
    upload(this.props.userinfo.business_name, this.state.uploadFile)
    .then(result => {
      alert("업로드 성공");
      console.log(result);
      this.setState({uploadFile: null})
      this.curFetch();
    })
  }

  handleFileInputChange = (e) => {
    // console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];
    if (!(file.type === "image/png" || file.type === "image/jpeg" || file.type === "application/pdf" || file.type === "text/plain" || file.type ===  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || /.+\.hwp$/.exec(file.name))) {
      alert("이미지나 문서만 업로드 가능합니다.")
      e.target.value = null;
      return
    }
    if (file.size >= (30 * 1024 * 1024)) {
      alert("업로드 제한을 초과하였습니다.")
      e.target.value = null;
      return
    }

    // this.getBase64(file)
    //   .then((result) => {
    //     file['base64'] = result;
    //     console.log('File Is', file);
    //     this.setState({
    //       base64URL: result,
    //       file,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    this.setState({
      uploadFile: e.target.files[0],
    });
  };

  downloadFile = (e) => {
    window.open(`${SERVER_URL}/download/${this.props.userinfo.business_name}/${e.name}`, "_blank")
    console.log(e);
  }

  deleteFile = (e) => {
    deleteFile(this.props.userinfo.business_name, e.name)
    .then(r => this.curFetch())
  }

  render() {
    const { userinfo } = this.props;

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <div className='sectionShadow'>
            <h4 className='text-h5 text-bold'>🗃 자료실 목록</h4>
            <Table data={this.state.file} downloadFile={this.downloadFile} deleteFile={this.deleteFile}></Table>
          </div>
          {/* <div className="m-3">
            <label className="mx-3">파일 선택:</label>
            <input
              ref={this.state.inputRef}
              onChange={this.handleFileInputChange}
              // onChange={handleDisplayFileDetails}
              className="d-none"
              type="file"
            />
            <button
              onClick={this.handleUpload}
              className={`btn btn-outline-${
                this.state.file.name ? "success" : "primary"
              }`}
            >
              {this.state.file.name ? this.state.file.name : "업로드"}
            </button>
          </div> */}
          <div className='sectionShadow'>
            <h4 className='text-h5 text-bold'>💾 파일 올리기</h4>
            <label className="mx-3 text-bold text-h6">파일 선택 : </label>
            <input type="file" name="file" onChange={this.handleFileInputChange}/>
            <div className='d-flex justify-content-center flex-wrap'>
              <Button className='' onClick={this.handleUpload}>업로드</Button>
              <span className='text-p w-100 d-flex justify-content-center'>파일 업로드는 최대 30MB까지 가능합니다.</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const DownloadStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(DownloadStateToProps, undefined)(Download);

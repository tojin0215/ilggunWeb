import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Table from '../../components/Navigation/TableFile';
import { getBase64 } from '../../action/api';
import { upload, filelist, download } from '../../action/api';

import '../../styles/home/home.css';

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      base64URL: '',
    };
    this.getBase64 = getBase64
    // this.initPage();
    this.curFetch();
  }

  curFetch = () => {
    filelist(this.props.userinfo.business_name)
    .then(r => r.json())
    .then(result_file => {
      console.log(result_file);
      this.setState({file: result_file})
    })
  }

  goLogin = () => {
    this.props.history.push('/');
  };

  handleUpload = (e) => {
    upload(this.props.userinfo.business_name, this.state.file)
    .then(result => {
      alert("업로드 성공");
    })
  }

  handleFileInputChange = (e) => {
    // console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

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
      file: e.target.files[0],
    });
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
          <input type="file" name="file" onChange={this.handleFileInputChange} />
          <Button onClick={this.handleUpload}>업로드 </Button>
          <Table></Table>
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

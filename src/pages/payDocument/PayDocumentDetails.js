import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';
import Calendar from 'react-calendar';
import Picker from 'react-month-picker';
import { PDFDownloadLink } from '@react-pdf/renderer';

import TableWorkerFilter from '../../components/Navigation/TableWorkerFilter';

import PayDocumentPDF from './PayDocumentPDF';
import { getUserInfoBusinessId } from '../../util/cookie';
import {
  otherAllowance,
  selectContractform,
  selectInsurance,
  selectTimelogAsWorker,
  selectWorkerByType,
} from '../../action/api';

import '../../styles/home/home.css';
import { PC, Mobile } from '../../components/MediaQuery';

const pickerLang = {
  months: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  from: '부터',
  to: '까지',
};

class PayDocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
      checkEtc: false,
      yearMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
      isVisibleMonthSelector: false,
      workers: [],
      selectedWorker: null,
      contract: null,
      insurance: null,

      salary: 0,
      taxation: 0,
      taxFree: 0,
    };

    this.curFetchWorker();
  }

  curFetchWorker = () => {
    const business_id = getUserInfoBusinessId()
      ? getUserInfoBusinessId()
      : this.props.userinfo.business_name;

    selectWorkerByType(business_id, 2)
      .then((result) => result.json())
      .then((result) => {
        const r = result.filter(
          (item) => !(item.state === '0' || item.state === '1'),
        );
        this.setState({ workers: r });
      })
      .catch((error) => {
        console.error('curFetchWorker', error);
      });
  };

  handleSelectWorker = (worker) => {
    const new_state = {
      selectedWorker: worker,
      contract: null,
      insurance: null,
      salary: 0,
      taxation: 0,
      taxFree: 0,
    };
    // this.setState({ selectedWorker: worker });

    const worker_id = worker.workername;
    const business_id = this.props.userinfo.business_name;

    selectContractform(worker_id, business_id)
      .then((r) => r.json())
      .then((result) => {
        // console.log(!result);
        if (result && result.length > 0 && result[0].id)
          new_state.contract = result[0];
        // this.setState({ contract: result[0] });

        selectInsurance(business_id)
          .then((r) => r.json())
          .then((result) => {
            if (result && result.length > 0)
              new_state.insurance = result[result.length - 1];
            // this.setState({ insurance: result[result.length - 1] });

            otherAllowance(
              business_id,
              worker_id,
              this.state.yearMonth.year,
              this.state.yearMonth.month,
            )
              .then((r) => r.json())
              .then((result) => {
                const allowance = result && result.length > 0 ? result[0] : {};

                let taxation = 0;
                if (allowance.t_bonus) taxation += Number(allowance.t_bonus);
                if (allowance.t_extension)
                  taxation += Number(allowance.t_extension);
                if (allowance.t_position)
                  taxation += Number(allowance.t_position);
                if (allowance.t_etc) taxation += Number(allowance.t_etc);
                new_state.taxation = taxation;
                console.log('taxation', taxation);

                let taxFree = 0;
                if (allowance.f_carMaintenanceFee)
                  taxFree += Number(allowance.f_carMaintenanceFee);
                if (allowance.f_childcareAllowance)
                  taxFree += Number(allowance.f_childcareAllowance);
                if (allowance.f_meals) taxFree += Number(allowance.f_meals);
                new_state.taxFree = taxFree;
                console.log('taxFree', taxFree);

                let salary = 0;
                try {
                  if (allowance.salary) salary = allowance.Salary;
                  else if (new_state.contract.Salary)
                    salary = Number(new_state.contract.Salary);
                } catch (e) {
                  console.error(e);
                }

                new_state.salary = salary;
                console.log('salary', salary);

                // this.setState({ salary, taxation, taxFree });
                this.setState(new_state);
              });
          });
      });
  };

  goLogin = () => {
    this.props.history.push('/');
  };

  handleAMonthChange = (year, month) => {
    if (this.state.selectedWorker)
      this.setState({ yearMonth: { year, month } }, () =>
        this.handleSelectWorker(this.state.selectedWorker),
      );
    else this.setState({ yearMonth: { year, month } });

    this.setState({ isVisibleMonthSelector: false });
  };
  handleAMonthDissmis = (e) => {
    this.setState({ isVisibleMonthSelector: false });
  };

  render() {
    const { userinfo } = this.props;
    this.pickAMonth = React.createRef();

    const show_pay_document =
      this.state.contract !== null && this.state.insurance !== null;

    const pay_document_data = show_pay_document
      ? {
          name: this.state.workername2,
          salary: this.state.salary,
          taxFree: this.state.taxFree,
          taxation: this.state.taxation,

          nationalPension: Math.round(
            (this.state.salary *
              this.state.insurance.NationalPensionPercentage) /
              100,
          ),
          employmentInsurance: Math.round(
            (this.state.salary *
              this.state.insurance.EmploymentInsurancePercentage) /
              100,
          ),
          healthInsurance: Math.round(
            (this.state.salary *
              this.state.insurance.HealthInsurancePercentage) /
              100,
          ),
          regularCare: Math.round(
            (this.state.salary * this.state.insurance.RegularCarePercentage) /
              100,
          ),
        }
      : {};

    if (show_pay_document) pay_document_data.origin = pay_document_data.salary;
    if (show_pay_document)
      pay_document_data.minus =
        pay_document_data.nationalPension +
        pay_document_data.employmentInsurance +
        pay_document_data.healthInsurance +
        pay_document_data.regularCare;
    if (show_pay_document)
      pay_document_data.real =
        pay_document_data.origin - pay_document_data.minus;

    console.log(this.state);
    console.log(pay_document_data);

    return (
      <div className="wrap payDocumentDetail">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <PC>
            <h4 className="text-h4 w-100 py-3 px-5 fw-bold sectionShadow">
              급여명세서
            </h4>
            <article className="flex todayleave sectionShadow m-5 px-2">
              <div className="small-shadow">
                {this.state.selectedWorker ? (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <p className="text-center">
                      <span className="text-h5">
                        {this.state.selectedWorker.workername2}
                      </span>{' '}
                      님 급여명세서입니다.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* <h4>직원 선택</h4>
                  <input ></input>
                  <button >검색</button> */}
                    <TableWorkerFilter
                      data={this.state.workers}
                      handleSelectWorker={this.handleSelectWorker}
                    />
                  </div>
                )}
                {/* <div>
                  <TableWorkerFilter data={this.state.workers} handleSelectWorker={r => this.setState({selectedWorker: r})}/>
                </div> */}
                {/* <Calendar
                  onChange={this.onChange}
                  value={this.state.value}
                /> */}
              </div>
              <div>
                <p className="text-center py-2">
                  급여명세서를 보고자 하는 해당 월을 선택하세요
                </p>
                <Picker
                  className="py-2 ps-4 pe-0 my-0 mx-1 d-flex"
                  ref={this.pickAMonth}
                  value={this.state.yearMonth}
                  lang={pickerLang.months}
                  show={this.state.isVisibleMonthSelector}
                  onChange={this.handleAMonthChange}
                  onDismiss={this.handleAMonthDissmis}
                >
                  <div
                    onClick={() => this.pickAMonth.current.show()}
                    className="button-solid_white-0 py-2 my-0 mx-1 w-100 text-center cursor-pointer text-h5"
                  >
                    {' '}
                    {this.state.yearMonth.year}년 {this.state.yearMonth.month}월{' '}
                  </div>
                </Picker>
              </div>
            </article>
          </PC>
          <Mobile>
            <h4 className="text-h4 w-100 py-3 px-5 fw-bold sectionShadow">
              급여명세서
            </h4>
            <article className="flex todayleave-col sectionShadow px-2 flex-auto">
              <div className="small-shadow w-100 flex-col">
                {this.state.selectedWorker ? (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <p className="text-center">
                      <span className="text-h5">
                        {this.state.selectedWorker.workername2}
                      </span>{' '}
                      님 급여명세서입니다.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* <h4>직원 선택</h4>
                  <input ></input>
                  <button >검색</button> */}
                    <TableWorkerFilter
                      data={this.state.workers}
                      handleSelectWorker={this.handleSelectWorker}
                    />
                  </div>
                )}
                {/* <div>
                  <TableWorkerFilter data={this.state.workers} handleSelectWorker={r => this.setState({selectedWorker: r})}/>
                </div> */}
                {/* <Calendar
                  onChange={this.onChange}
                  value={this.state.value}
                /> */}
              </div>
              <div>
                <p className="text-center py-2">
                  급여명세서를 보고자 하는 해당 월을 선택하세요
                </p>
                <Picker
                  className="py-2 pe-0 my-0 d-flex"
                  ref={this.pickAMonth}
                  value={this.state.yearMonth}
                  lang={pickerLang.months}
                  show={this.state.isVisibleMonthSelector}
                  onChange={this.handleAMonthChange}
                  onDismiss={this.handleAMonthDissmis}
                >
                  <div
                    onClick={() => this.pickAMonth.current.show()}
                    className="button-solid_white-0 py-2 my-0 w-100 text-center cursor-pointer text-h5"
                  >
                    {' '}
                    {this.state.yearMonth.year}년 {this.state.yearMonth.month}월{' '}
                  </div>
                </Picker>
              </div>
            </article>
          </Mobile>
          <div className="sectionShadow">
            {show_pay_document ? (
              <PDFDownloadLink
                className="button-solid width-fit d-flex align-items-center mb-3"
                document={
                  <PayDocumentPDF forDownload={true} data={pay_document_data} />
                }
                fileName="pay_detail.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : '다운받기'
                }
              </PDFDownloadLink>
            ) : null}
            {show_pay_document ? (
              <div>
                {/* 급여명세서 표시하는 공간입니다. */}
                <PayDocumentPDF forDownload={false} data={pay_document_data} />
              </div>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayDocumentDetailsStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    //status: state.authentication.status
  };
};

export default connect(
  PayDocumentDetailsStateToProps,
  undefined,
)(PayDocumentDetails);

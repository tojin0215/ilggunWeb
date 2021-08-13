import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import TablePay from '../../components/Navigation/TablePay';
import data from '../../components/Navigation/data';

import Picker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';

import '../../styles/payDocument/payDocument.css';
import '../../styles/home/home.css';
import {
  otherAllowanceAll,
  selectContractformAll,
  selectInsuranceYear,
} from '../../action/api';

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

class PayDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
      yearMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
      },
      year: '2021',
      month: '6',
      isVisibleMonthSelector: false,
      PD: [],
      //PayDocument(constractForm+insurancePercentage+otherAllance)
    };
    this.selectPayDocu();
  }

  // selectPayDocu = () => {
  //   const d = new Date()
  // selectInsuranceYear(this.props.userinfo.business_name, d.getFullYear())
  //   .then((result) => result.json())
  //   .then((result) => {
  //     console.log(result)
  //     this.setState({ PD: result})
  //   })
  // }

  selectPayDocu = () => {
    const d = new Date();
    selectContractformAll(this.props.userinfo.business_name)
      .then((result) => result.json())
      .then((selectContractformAllResult) => {
        // console.log(selectContractformAllResult);

        selectInsuranceYear(this.props.userinfo.business_name, this.state.yearMonth.year)
          .then((result) => result.json())
          .then((selectInsuranceYearResult) => {
            // console.log(selectInsuranceYearResult);

            selectContractformAllResult.map((item, index) => {
              const insurance = selectInsuranceYearResult.find(
                (res) => res.bang == item.bang,
              );
              item['insurance'] = insurance;
            });

            otherAllowanceAll(
              this.props.userinfo.business_name,
              this.state.yearMonth.year,
              this.state.yearMonth.month
            )
              .then((result) => result.json())
              .then((otherAllowanceAllResult) => {
                // console.log(otherAllowanceAllResult);
                this.setState({
                  PD: selectContractformAllResult.map((item2, index) => {
                    const otherAllowance = otherAllowanceAllResult.find(
                      (res) => res.bang == item2.bang,
                    );
                    item2['otherAllowance'] = otherAllowance;
                    console.log("item2");
                    console.log(item2);
                    return item2;

                  }),
                });
              });
          });
      })

      .catch((error) => {
        console.error('kkkkk', error);
      });
  };

  handleAMonthChange = (year, month) => {
    this.setState({ yearMonth: { year, month } });
    this.setState({ isVisibleMonthSelector: false });
  };
  handleAMonthDissmis = (e) => {
    this.setState({ isVisibleMonthSelector: false });
  };
  handleClickMonthBox = (e) => {
    this.setState({ isVisibleMonthSelector: true });
    console.debug(this.state.isVisibleMonthSelector);
  };
  goLogin = () => {
    this.props.history.push('/');
  };

  render() {
    const { userinfo } = this.props;
    // console.log('userinfo : ', userinfo);
    this.pickAMonth = React.createRef();

    console.log("PD");
    console.log(this.state.PD);

    const view_pay_document =
      this.state.PD !== null && this.state.insurance != null && this.state.otherAllowance != null;

    const pay_document_data = view_pay_document
      ?
      {
        name: this.state.Employee,
        salary: this.state.Salary,
        workTime: Math.round(
          this.state.EndTime - this.state.StartTime
        ),
        additionalAllowance: Math.round(
          (this.state.otherAllowance.t_bonus + this.state.otherAllowance.t_extension + this.state.otherAllowance.t_position + this.state.otherAllowance.t_etc)
          +
          (this.state.otherAllowance.f_carMaintenanceFee + this.state.otherAllowance.f_childcareAllowance + this.state.otherAllowance.f_meals)
        ),
        hourlyWage: this.state.insurance.HourlyWage,

        nationalPension: Math.round(
          (this.state.Salary *
            this.state.insurance.NationalPensionPercentage) /
          100,
        ),
        employmentInsurance: Math.round(
          (this.state.Salary *
            this.state.insurance.EmploymentInsurancePercentage) /
          100,
        ),
        healthInsurance: Math.round(
          (this.state.Salary *
            this.state.insurance.HealthInsurancePercentage) /
          100,
        ),
        regularCare: Math.round(
          (this.state.Salary * this.state.insurance.RegularCarePercentage) /
          100,
        ),
        origin: Math.round(
          this.state.nationalPension + this.state.employmentInsurance + this.state.healthInsurance + this.state.regularCare
        ),
        realPay: Math.round(
          (this.stae.salary + this.stae.additionalAllowance) - this.stae.origin
        )

      }
      : {};

    console.log("____________________");
    console.log(pay_document_data);

    return (
      <div className="wrap wrap-paydocument">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className="sectionShadow">
            <div className="w-100 flex justify-content-between align-items-center">
              <h4 className="text-h5 text-bold">
                {this.state.yearMonth.year}년 {this.state.yearMonth.month}월
                급여대장
              </h4>
              {/* <input
                placeholder='월 선택 캘린더'
                type="date"
                value={this.state.value}
                onChange={(v) => this.setState({value: v.target.value})}
              >
              </input> */}
              <Picker
                className="py-2 ps-4 pe-0 my-0 mx-1 d-flex"
                ref={this.pickAMonth}
                value={this.state.yearMonth}
                lang={pickerLang.months}
                // show={this.state.isVisibleMonthSelector}
                onChange={this.handleAMonthChange}
                onDismiss={this.handleAMonthDissmis}
              >
                <div
                  onClick={() => this.pickAMonth.current.show()}
                  className="button-solid_white-0 py-2 px-5 my-0 mx-1 w-100 text-center cursor-pointer text-h5"
                >
                  {this.state.yearMonth.year}년 {this.state.yearMonth.month}월
                </div>
              </Picker>
            </div>

            {view_pay_document ? (
              <TablePay data={pay_document_data} />
            ) : null
            }

          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

const PayDocumentStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.status,
  };
};

export default connect(PayDocumentStateToProps, undefined)(PayDocument);

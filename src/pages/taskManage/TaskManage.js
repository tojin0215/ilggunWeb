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
import {
  selectTimelog,
  selectWorkerByType,
  selectVacation,
  dateVacation,
} from '../../action/api';
import { getUserInfoBusinessId } from '../../util/cookie';

import '../../styles/teskmanage/teskmanage.css';
import '../../styles/home/home.css';
import { PC, Mobile } from '../../components/MediaQuery';

class TaskManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),

      yearMonth: new Date(),
      year: '2020',
      month: '1',
      date: '31',

      worker: [],
      VA: [],
      DA: [],
      selectedDate: null,
    };
    this.curFetchWorker();
    // this.vacation()
    this.updateVacation();
  }

  curFetchWorker = () => {
    const d = new Date();
    const business_id = getUserInfoBusinessId()
      ? getUserInfoBusinessId()
      : this.props.userinfo.business_name;

    selectWorkerByType(business_id, 2)
      .then((result) => result.json())
      .then((selectWorkerByType_result) => {
        // this.setState({ worker: result })

        selectTimelog(
          business_id,
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate(),
        )
          .then((result) => result.json())
          .then((result) => {
            const selectTimelogResult = selectWorkerByType_result.map(
              (item, index) => {
                const timelog = result.find(
                  (res) => res.workername == item.workername,
                );
                item['timelog'] = timelog;
                return item;
              },
            );

            selectVacation(business_id)
              .then((result) => result.json())
              .then((selectVacation_result) => {
                selectVacation_result = selectVacation_result.map(
                  (item, index) => {
                    return {
                      business_id: '' + item.bang,
                      start_date: new Date(item.start_date),
                      end_date: new Date(item.end_date),
                      reason: '' + item.reason,
                      vacation_type: 0 + item.vacation,
                      worker_name: '' + item.workername,
                      start_date_str: '' + item.start_date,
                      end_date_str: '' + item.end_date,
                      worker_id: null,
                    };
                  },
                );

                const d = new Date();
                selectVacation_result = selectVacation_result.filter(
                  (item) => item.end_date > d,
                );
                console.log(selectVacation_result);

                const workerResult = selectTimelogResult.map((item, index) => {
                  const filtered = selectVacation_result.filter(
                    (vac_item) => vac_item.worker_name === item.workername2,
                  );
                  if (filtered.length > 0) item['vacation'] = filtered[0];
                  else item['vacation'] = null;

                  return item;
                });

                console.log(workerResult);
                this.setState({ worker: workerResult });
              });
            // this.forceUpdate();
          })
          .catch((error) => {
            console.error('curFetchWorker', error);
          });
      });
    console.log(this.props);
  };

  // vacation = () => {
  //   selectVacation(this.props.userinfo.business_name)
  //     .then((result) => result.json())
  //     .then((result) => {
  //       this.setState({ VA: result })
  //     })
  //   return
  // }

  updateVacation = () => {
    console.log(this.state.yearMonth);
    const a = this.state.yearMonth;
    dateVacation(this.props.userinfo.business_name, a)
      //`${a.year}-${a.month}-${a.date}`
      .then((result) => result.json())
      .then((result) => {
        result.map((item, index) => {
          const start_date = new Date(item.start_date);
          start_date.setDate(start_date.getDate() + 1);

          item.start_date = `${start_date.getFullYear()}-${
            start_date.getMonth() + 1
          }-${start_date.getDate() - 1}`;
          const end_date = new Date(item.end_date);
          end_date.setDate(end_date.getDate());

          item.end_date = `${end_date.getFullYear()}-${
            end_date.getMonth() + 1
          }-${end_date.getDate()}`;
        });

        this.setState({ DA: result });
      });
    return;
  };
  goLogin = () => {
    this.props.history.push('/');
  };
  // onChange = (e) => {
  //   this.setState({ value: e });
  //   console.log(e);
  // }
  handleDate = (currentDate) => {
    this.setState({ yearMonth: currentDate }, () => this.updateVacation());
    console.log(currentDate);
  };
  render() {
    const { userinfo } = this.props;
    const clickhandler = (name) => console.log('delete', name);

    return (
      <div className="wrap wrap_taskmanage">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <PC>
            <article className="todayleave">
              <h4 className="text-h4 w-100 py-3 px-5 fw-bold sectionShadow">
                {/* <span className='color-point text-h5'>??? </span> */}
                ???? ????????? ?????????
              </h4>
              {/* <Calendar
                onChange={this.onChange}
                value={this.state.value}
                className='sectionShadow'
              />

              {(!this.state.selectedDate && false) ?
                <Calendar
                  value={this.state.value} onChange={this.onChange} className='sectionShadow'
                  data={this.state.DA} handleSelectWorker={(row) => console.log(row)}
                /> : null} */}
              <Calendar
                onChange={this.handleDate}
                id="currentDate"
                // value={this.state.yearMonth.currentDate}
                className="sectionShadow my-3 me-2"
              />
              <div className="sectionShadow my-3 ms-2">
                <TableVacation data={this.state.DA} />
              </div>
            </article>
          </PC>
          <Mobile>
            <article className="todayleave">
              <h4 className="text-h4 w-100 py-3 px-5 fw-bold sectionShadow">
                {/* <span className='color-point text-h5'>??? </span> */}
                ???? ????????? ?????????
              </h4>
              {/* <Calendar
                onChange={this.onChange}
                value={this.state.value}
                className='sectionShadow'
              />

              {(!this.state.selectedDate && false) ?
                <Calendar
                  value={this.state.value} onChange={this.onChange} className='sectionShadow'
                  data={this.state.DA} handleSelectWorker={(row) => console.log(row)}
                /> : null} */}
              <Calendar
                onChange={this.handleDate}
                id="currentDate"
                // value={this.state.yearMonth.currentDate}
                className="sectionShadow"
              />
            </article>
            <article className="todayleave">
              <div className="sectionShadow">
                <TableVacation data={this.state.DA} />
              </div>
            </article>
          </Mobile>
          <article className="sectionShadow">
            <h4 className="text-h4 px-4 fw-bold">???? ????????? ?????????</h4>
            <Table3 data={this.state.worker} click={clickhandler} />
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

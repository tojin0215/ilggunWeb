import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import Calendar from 'react-calendar';
import TableExtraPay from '../../components/Navigation/TableExtraPay';


import { AdditionalAllowance } from "../../action/api"


import '../../styles/home/home.css';

class PayManageExtra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),     

      checkboxGroup:{
        position: true,
        bonus: false,
        over: false,
        etc: false,
        bob: false,
        oil: false,
        agi: false       
      },      
      
      AA:[]
    }    
    this.Allowance()
    //AA:Additional Allowance

  }
  Allowance = () => {
    AdditionalAllowance(this.props.userinfo.business_name)
     .then((result) => result.json())
     .then((result) => {           
       this.setState({ AA :result })      
     })     
     return
  }
  

  



  goLogin = () => {
    this.props.history.push('/');
  };

  handleCheckbox = (e) => {
    let obj = {
      position: false,
        bonus: false,
        over: false,
        etc: false,
        bob: false,
        oil: false,
        agi: false 
    }
    // if (e.target.id === "etc") {
    //   obj[e.target.id] = e.target.checked 
    //   this.setState({etc: !this.state.etc}) 
    // }else{
    //   obj[e.target.id] = e.target.checked 
    // }
    obj[e.target.id] = e.target.checked         
    console.log(obj);      
      this.setState({
        checkboxGroup:obj
      })
          
  }
  

  render() {
    const { userinfo } = this.props;
    console.log('userinfo : ', userinfo);

    return (
      <div className="wrap">
        <Header />
        <Navigation goLogin={this.goLogin} />
        <div className="container">
          <Menu />
          <article className='flex todayleave'>
            <h4 className='w-100 text-h5'>
              <span className='color-point text-h5'>✔ </span>
              추가수당
            </h4>
            <Calendar
              onChange={this.onChange}
              value={this.state.value}
              className='sectionShadow'
            />
            <div className='sectionShadow'>
              <TableExtraPay data={this.state.AA} />              
              {/* this.state.id */}
            </div>
          </article>


          <div className='border'>
            <div  className='p-3'>
              <strong>지급일</strong> 
              <input type="date"/>           

							<p>
                <strong>과세</strong>
                <div  className='p-3'>
                  직책 &nbsp; <input type="checkbox" id="position" name="checkboxGroup"
                    checked={this.state.checkboxGroup['position']} onChange={this.handleCheckbox}/>
                  <br />
                  상여 &nbsp; <input type="checkbox" id="bonus" name="checkboxGroup"
                    checked={this.state.checkboxGroup['bonus']} onChange={this.handleCheckbox}/>
                  <br />
                  연장근무 &nbsp; <input type="checkbox" id="over" name="checkboxGroup"
                    checked={this.state.checkboxGroup['over']} onChange={this.handleCheckbox}/>
                  <br />
                  기타 &nbsp; <input type="checkbox" id="etc" name="checkboxGroup"
                  checked={this.state.checkboxGroup['etc']} onChange={this.handleCheckbox}/>              
                  &nbsp;
                  {/* {(this.state.etc) ? <input/> : null}    */}
                </div>              
								<strong>비과세</strong> 
                <br/>
                <div  className='p-3'>
                  식대 &nbsp; <input type="checkbox" id="bob" name="checkboxGroup"
                    checked={this.state.checkboxGroup['bob']} onChange={this.handleCheckbox}/>
                  <br />
                  자가유류비 &nbsp; <input type="checkbox" id="oil" name="checkboxGroup"
                    checked={this.state.checkboxGroup['oil']} onChange={this.handleCheckbox}/>
                  <br />
                  육아수당 &nbsp; <input type="checkbox" id="agi" name="checkboxGroup"
                    checked={this.state.checkboxGroup['agi']} onChange={this.handleCheckbox}/>
                  <br />                
              </div>
							</p>
            </div>

            <div className='p-3'>
              <h4>금액</h4>
              <input type="number"placeholder="금액을 입력하세요." />              
              <button>저장하기</button>
            </div>
            
          </div>
					
        </div>
        <Footer />
      </div>
    );
  }
}

const PayManageExtraStateToProps = (state) => {
  return {
    userinfo: state.authentication.userinfo,
    status: state.authentication.status
  };
};

export default connect(PayManageExtraStateToProps, undefined)(PayManageExtra);

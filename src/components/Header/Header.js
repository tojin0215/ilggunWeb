import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render(){
        // const activeStyle = {
        //     color: 'green',
        //     fontSize: '2rem'
        // };

        const { userinfo } = this.props;

        return (
            <div>
                
            </div>
          );

        // return(
        //     <div style={styles.area}>
        //         <div style={styles.titleAera}><text style={styles.titleStyle}>{/*{props.bangbang}*/}사업장</text></div>
        //         <div style={styles.textArea}>
        //             <text style={styles.textStyle}> {/*{props.idid}*/} id님 반갑습니다.</text> 
        //         </div>
        //         {/* <div style={styles.selectArea}>
        //             <NavLink exact to={`/Businesslist/${props.idid}`} activeStyle={activeStyle} style={styles.textStyle}>사업장 선택</NavLink> 
        //         </div> */}
        //         <div style={styles.logoutArea}>
        //             <NavLink exact to="/" activeStyle={activeStyle} style={{marginLeft:'3vw'}, styles.textStyle}>Logout</NavLink>
        //         </div>
        //     </div>
        // )
    }
}

const headerStateToProps = (state) => {
    return {
      userinfo: state.authentication.userinfo
    }
  }
  export default connect(headerStateToProps, undefined)(Header);

const styles={
    area:{
        width:'100vw',
        height:'10vh', 
        borderBottomColor:'black', 
        borderBottomWidth:'0.5vh', 
        borderBottomStyle:'solid',
        display:'flex',
        alignItems:'center',
    },
    titleAera:{
        float:'left',
    },
    textArea:{
        position:'absolute',
        right:'25vw',
    },
    selectArea:{
        position:'absolute',
        right:'13vw',
    },
    logoutArea:{
        position:'absolute',
        right:'5vw',
    },
    titleStyle:{
        width:'40vw',
        fontSize:'25px',
        fontWeight:'bold',
        marginLeft:'2vw',
        color:'#040525',
        fontFamily: 'NanumSquareR'
    },
    textStyle:{
        textDecoration:'none', 
        color:'#040525',
        fontFamily: 'NanumSquareR'
    }
}
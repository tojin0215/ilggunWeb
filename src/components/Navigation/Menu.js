import React, {useState} from 'react';

import {Nav, Navbar} from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import imgLogo from '../../img/logo.png';

const Menu = (props) => {
    const history = useHistory();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    return (
      <>
        <div className='logo'>
          <img 
            src={ imgLogo }
            width='50'
            height='50'
            alt='일꾼'
          />
        </div>
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: '홈',
              itemId: '/home'
            },
            {
              title: '직원관리',
              itemId: '/workerManage',
              subNav: [
                {
                  title: '근로계약서',
                  itemId: '/workerManage',
                },
                {
                  title: '근로계약서상세(임시)',
                  itemId: '/workerManage/contract',
                },
                {
                  title: '직원 관리',
                  itemId: '/workerManage/staff',
                },
              ],
            },
            {
              title: '업무관리',
              itemId: '/taskManage',
              subNav: [
                {
                  title: '근태관리',
                  itemId: '/taskManage',
                },
              ],
            },
            {
              title: '급여관리',
              itemId: '/payManage',
              subNav: [
                {
                  title: '무급/유급 휴가',
                  itemId: '/payManage',
                },
                {
                  title: '과세/비과세 추가수당',
                  itemId: '/payManage/extra',
                },
              ],
            },
            {
              title: '급여 서류',
              itemId: '/payDocument',
              subNav: [
                {
                  title: '급여대장',
                  itemId: '/payDocument',
                },
                {
                  title: '급여명세서',
                  itemId: '/payDocument/details',
                },
              ],
            },
            {
              title: '메시지함',
              itemId: '/another4',
              subNav: [
                {
                  title: '받은 메시지함',
                  itemId: '/another4',
                },
                {
                  title: '보낸 메시지함',
                  itemId: '/another4/1',
                }
              ],
            },
            {
              title: '리포트',
              itemId: '/another4',
              subNav: [
                {
                  title: '자료실',
                  itemId: '/another4/1',
                },
                {
                  title: '메일보내기',
                  itemId: '/another4/2',
                },
              ],
            },
          ]}
        />
      </>
        // <div>
        //     <div style={{width:'20vw', marginTop:'4vw'}}>
        //         <div style={styles.liStyle}><NavLink exact to="/Home" activeStyle={activeStyle} style={styles.textStyle1}>홈</NavLink></div>
        //         <div style={styles.liStyle}><NavLink exact to="/Workermanage" activeStyle={activeStyle} style={styles.textStyle1}>근로자 관리</NavLink></div> 
        //         {/*<li><NavLink exact to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
        //         <li><NavLink exact to="/Businesslist" activeStyle={activeStyle}>About</NavLink></li>
        //         <li><NavLink exact to="/Businesslist/foo" activeStyle={activeStyle}>About Foo</NavLink></li>*/}
        //     </div>
        // </div>
    );
};

export default Menu;

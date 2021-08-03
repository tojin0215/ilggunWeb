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
                // {
                //   title: '근로계약서상세(임시)',
                //   itemId: '/workerManage/contract',
                // },
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
              itemId: '/message',
              subNav: [
                {
                  title: '받은 메시지함',
                  itemId: '/message',
                },
                {
                  title: '보낸 메시지함',
                  itemId: '/message/sended',
                },
                {
                  title: '메일 보내기',
                  itemId: '/message/sendMail',
                }
              ],
            },
            {
              title: '자료실',
              itemId: '/library'
            },
            {
              title: '견적내기 사이트 링크',
              itemId: 'http://13.124.141.28:9090/',
            },
          ]}
        />
      </>
    );
};

export default Menu;

import React, {useState} from 'react';
import  { PC, Mobile } from '../MediaQuery';

import { useHistory, useLocation } from "react-router-dom";
import {Navigation} from 'react-minimal-side-navigation';

import imgLogo from '../../img/logo.png';
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

import Icon from 'awesome-react-icons';
import { FaHome, FaBriefcase, FaUsers, FaFileAlt, FaMarker, FaNetworkWired, FaTable, FaPiggyBank, FaCoffee, FaDonate, FaFileInvoiceDollar, FaListAlt, FaWindowRestore, FaArchive, FaCommentDots, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export const Menu = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-30 block transition-opacity bg-black opacity-50 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />
      <div className='z-30 fixed top-0 md:hidden'>
        <button
          className="btn-menu"
          onClick={(): void => setIsSidebarOpen(true)}
          type="button"
        >
          <Icon name="burger" className="w-10 h-10 m-2" />
        </button>
      </div>


      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white  md:translate-x-0 md:inset-0 pt-12 bg-base ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }
        `
      }
      >
        <PC>
          <div className='logo'>
              <img 
                src={ imgLogo }
                width='50'
                height='50'
                alt='일꾼'
              />
          </div>
        </PC>
        <Mobile>
          <div className='logo w-24'>
              <img 
                src={ imgLogo }
                width='40'
                height='40'
                alt='일꾼'
              />
          </div>
        </Mobile>
        <div className="flex items-center justify-center mt-2 text-center py-6">
          <span className="mx-2 text-2xl font-semibold text-black">
          </span>
        </div>
        {/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            if (itemId==="http://13.124.141.28:9090/") window.open("http://13.124.141.28:9090/", "_blank")
            else history.push(itemId);
            setIsSidebarOpen(false);
          }}
          
          // onSelect={({ itemId }) => {
          //   if (itemId==="http://13.124.141.28:9090/") window.open("http://13.124.141.28:9090/", "_blank")
          //   else history.push(itemId);
          // }}
          items={[
            {
              title: '홈',
              itemId: '/home',
              elemBefore: () => <FaHome />,
            },
            {
              title: '직원관리',
              itemId: '/workerManage',
              elemBefore: () => <FaUsers />,
              subNav: [
                {
                  title: '근로계약서',
                  itemId: '/workerManage',
                  elemBefore: () => <FaMarker />
                },
                // {
                //   title: '근로계약서상세(임시)',
                //   itemId: '/workerManage/contract',
                // },
                {
                  title: '직원 관리',
                  itemId: '/workerManage/staff',
                  elemBefore: () => <FaNetworkWired />
                },
              ],
            },
            {
              title: '업무관리',
              itemId: '/taskManage',
              elemBefore: () => <FaTable />,
              subNav: [
                {
                  title: '근태관리',
                  itemId: '/taskManage',
                  elemBefore: () => <FaBriefcase />
                },
              ],
            },
            {
              title: '급여관리',
              itemId: '/payManage',
              elemBefore: () => <FaDonate />,
              subNav: [
                {
                  title: '휴가',
                  itemId: '/payManage',
                  elemBefore: () => <FaCoffee />
                },
                {
                  title: '추가수당',
                  itemId: '/payManage/extra',
                  elemBefore: () => <FaPiggyBank />
                },
              ],
            },
            {
              title: '급여 서류',
              itemId: '/payDocument',
              elemBefore: () => <FaWindowRestore />,
              subNav: [
                {
                  title: '급여대장',
                  itemId: '/payDocument',
                  elemBefore: () => <FaListAlt />
                },
                {
                  title: '급여명세서',
                  itemId: '/payDocument/details',
                  elemBefore: () => <FaFileInvoiceDollar />
                },
              ],
            },
            {
              title: '메시지함',
              itemId: '/message',
              elemBefore: () => <FaCommentDots />,
              subNav: [
                {
                  title: '받은 메시지함',
                  itemId: '/message',
                  elemBefore: () => <FaEnvelope />
                },
                {
                  title: '보낸 메시지함',
                  itemId: '/message/sended',
                  elemBefore: () => <FaPaperPlane />
                },
                // {
                //   title: '메일 보내기',
                //   itemId: '/message/sendMail',
                // }
              ],
            },
            {
              title: '자료실',
              itemId: '/library',
              elemBefore: () => <FaArchive />
            },
            {
              title: '견적내기 사이트 링크',
              itemId: 'http://13.124.141.28:9090/',
              elemBefore: () => <FaFileAlt />
            },
          ]}
          
        />
      </div>
    </>
  );
};

export default Menu;

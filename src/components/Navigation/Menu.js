import React, {useState} from 'react';

import { useHistory, useLocation } from "react-router-dom";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const Menu = (props) => {
    const history = useHistory();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    return (
        <>
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId={location.pathname}
            onSelect={({ itemId }) => {
                history.push(itemId);
            }}
            items={[
              {
                title: '홈',
                itemId: '/home',
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
                    title: '직원 관리',
                    itemId: '/workerManage/1',
                  },
                ],
              },
              {
                title: '업무관리',
                itemId: '/another',
                subNav: [
                  {
                    title: '근태관리',
                    itemId: '/another/1',
                  },
                ],
              },
              {
                title: '급여관리',
                itemId: '/another2',
                subNav: [
                  {
                    title: '무급/유급 휴가',
                    itemId: '/another2',
                  },
                  {
                    title: '과세/비과세 추가수당',
                    itemId: '/another2/1',
                  },
                ],
              },
              {
                title: '급여 서류',
                itemId: '/another3',
                subNav: [
                  {
                    title: '급여대장',
                    itemId: '/another3',
                  },
                  {
                    title: '급여명세서',
                    itemId: '/another3/1',
                  },
                ],
              },
              {
                title: '리포트',
                itemId: '/another4',
                subNav: [
                  {
                    title: '메시지함',
                    itemId: '/another4',
                  },
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
    );
};

export default Menu;

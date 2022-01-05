import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';
import imgsearch from '../../img/close_white.png';
import { PC, Mobile } from '../MediaQuery';

const Table = (props) => {
  const { data } = props;
  const columns = [
    {
      name: '이름',
      selector: (row, index) => row.workername2,
      sortable: true,
    },
    {
      name: '정규직/비정규직',
      selector: (row, index) => row.permanent,
      grow: 2,
      cell: (row) =>
        row.type == 2 ? (
          <>
            <span>정규직</span>
            {/* <Link to={{ pathname:"/workerManage", state:{ worker: row } }}>정규직</Link> */}
          </>
        ) : (
          <>
            <span>비정규직</span>
            {/* <Link to={{ pathname:"/workerManage", state:{ worker: row } }}>비정규직</Link> */}
          </>
        ),
    },
    {
      name: '근로계약서작성여부',
      grow: 2,
      cell: (row) =>
        row.state == 2 ? (
          <>
            <PC>
              <Link
                to={{
                  pathname: '/workerManage/contract',
                  state: { worker: row },
                }}
                className="button-solid_white m-1 py-2"
              >
                작성
              </Link>
            </PC>
            <Mobile>
              <Link
                to={{
                  pathname: '/workerManage/contract',
                  state: { worker: row },
                }}
                className="button-solid_white m-1 px-5 py-1"
              >
                작성
              </Link>
            </Mobile>
          </>
        ) : (
          <>
            <PC>
              <Link
                to={{
                  pathname: '/workerManage/contract',
                  state: { worker: row },
                }}
                className="button-solid m-1 px-5 py-2"
              >
                미작성
              </Link>
            </PC>
            <Mobile>
              <Link
                to={{
                  pathname: '/workerManage/contract',
                  state: { worker: row },
                }}
                className="button-solid m-1 px-3 py-1"
              >
                미작성
              </Link>
            </Mobile>
          </>
        ),
    },
  ];

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  // const filteredItems = props.data.filter(
  //   item =>
  //     JSON.stringify(item)
  //       .toLowerCase()
  //       .indexOf(filterText.toLowerCase()) !== -1
  // );
  const filteredItems = props.data.filter(
    (item) => item.workername2.indexOf(filterText) !== -1,
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        className="test"
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      defaultSortField="id"
      defaultSortAsc={false}
      // selectableRows
      highlightOnHover
      pointerOnHover
      noHeader
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      noDataComponent="데이터가 없습니다"
    />
  );
};

export default Table;

import React, { useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import FilterComponent2 from './FilterComponent2';
import FilterAreaNm from './FilterAreaNm';

import './table.css';
import { red } from '@material-ui/core/colors';
import { Button } from 'react-bootstrap';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	margin: 16px;
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

const CustomLoader = () => (
	<div style={{ padding: '24px' }}>
		<Spinner />
		<div>잠시만 기다려주세요...</div>
	</div>
);


const Table = (props) => {
  const { data } = props;
  console.log('data');
  console.log(data);

  const columns = [
    //grow 크기 center 중앙 정렬
    {
      name: '지원사업명',
      selector: (row, index) => row.pblancNm,
      sortable: true,
      grow: 5,
      center: true,
    },
    {
      name: '신청기간',
      // selector: (row, index) => reqstBeginEndDe,
      cell: (row) =>
        row.reqstBeginEndDe.indexOf('~') > 0
          ? row.reqstBeginEndDe.substr(0, 4) +
            '-' +
            row.reqstBeginEndDe.substr(4, 2) +
            '-' +
            row.reqstBeginEndDe.substr(6, 2) +
            ' ~ ' +
            row.reqstBeginEndDe.substr(11, 4) +
            '-' +
            row.reqstBeginEndDe.substr(15, 2) +
            '-' +
            row.reqstBeginEndDe.substr(17, 2)
          : row.reqstBeginEndDe,
      sortable: true,
      grow: 1.6,
      center: true,
    },
    {
      name: '소관부처',
      selector: (row, index) => row.jrsdInsttNm,
      sortable: true,
      grow: 1.4,
      center: true,
    },
    {
      name: '등록일',
      selector: (row, index) => row.creatPnttm.split(' ')[0],
      sortable: true,
      grow: 1,
      center: true,
    },
  ];

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );

  const filteredItems = props.data.filter(
    (item) => item.pblancNm.indexOf(filterText) !== -1,
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent2
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const onRowClicked = (row, event) => {
    console.log('row', row);
    let link = `https://www.bizinfo.go.kr/${row.pblancUrl}`;
    window.open(link);
    // window.location.assign(link)
  };

  return (
    <DataTable
      defaultSortAsc={false}
      highlightOnHover
      pointerOnHover
      noHeader
      columns={columns}
      data={filteredItems}
      onRowClicked={onRowClicked}
      striped
      pagination
      paginationPerPage={10}
      subHeader
      subHeaderComponent={subHeaderComponent}
      noDataComponent="데이터가 없습니다"
			progressPending={data.length === 0}
			progressComponent={<CustomLoader />}
    />
  );
};

export default Table;

import React, { useMemo, useState } from 'react';

import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import FilterComponent2 from './FilterComponent2';

import './table.css';
import { red } from '@material-ui/core/colors';
import { Button } from 'react-bootstrap';

const Table = (props) => {
  const { data } = props;
  console.log('data');
  console.log(data);



  const columns = [
    //grow 크기 center 중앙 정렬
    {
      name: '번호',
      sortable: true,
      grow: 0.5,
      center: true,
    },
    {
      name: '지원사업명',
      selector: (row, index) => row.pblancNm,
      sortable: true,
      grow: 5,
      center: true,
    },
    {
      name: '신청기간',
      selector: (row, index) => '추후 공지',
      sortable: true,
      grow: 1,
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
      selector: (row, index) => row.creatPnttm.split("T"),
      sortable: true,
      grow: 1.4,
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
    console.log("row", row);
    let link = `https://www.bizinfo.go.kr/${row.pblancUrl}`
    window.open(link)
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
    />
  );
};

export default Table;

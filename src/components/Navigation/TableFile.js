import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';
import imgsearch from '../../img/close_white.png'

const Table = props => {
  const { data, downloadFile, deleteFile } = props;
  const columns = [
    {
      name: "이름",
      selector: "name",
      sortable: true
    },
    {
      name: "삭제",
      cell: row => <Button variant="danger" onClick={ () => deleteFile(row) }>삭제</Button>  
    }
  ];
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  // const filteredItems = props.data.filter(
  //   item =>
  //     JSON.stringify(item)
  //       .toLowerCase()
  //       .indexOf(filterText.toLowerCase()) !== -1
  // );
  // const filteredItems = props.data.filter(
  //   item =>
  //     item.name.indexOf(filterText.toLowerCase()) !== -1
  // );


  return (
    <DataTable
      defaultSortAsc={false}
      // selectableRows
      highlightOnHover
      pointerOnHover
      noHeader
      columns={columns}
      data={data}
      defaultSortField="name"
      striped
      pagination
      onRowDoubleClicked={downloadFile}
      noDataComponent="데이터가 없습니다"
    />
  );
};

export default Table;

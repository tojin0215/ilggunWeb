import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';
import imgsearch from '../../img/search.png'

const Table = props => {
  const { data } = props;
  console.log(data)
  const columns = [
    {
      name: "이름",
      selector: (row, index) => row.Employee,
      sortable: true
    },
    {
      name: "과세",
      selector: (row, index) => row.realTaxation,
      sortable: true,
      cell: row =>
        (parseInt(row.otherAllowance.t_bonus) + parseInt(row.otherAllowance.t_extension) + parseInt(row.otherAllowance.t_position) + parseInt(row.otherAllowance.t_etc))
    },
    {
      name: "비과세",
      selector: (row, index) => row.realTaxFree,
      sortable: true,
      cell: row =>
        (parseInt(row.otherAllowance.f_carMaintenanceFee) + parseInt(row.otherAllowance.f_childcareAllowance) + parseInt(row.otherAllowance.f_meals))
    },

  ];
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = props.data.filter(
    item =>
      item.Employee.indexOf(filterText.toLowerCase()) !== -1
  );




  return (
    <DataTable
      defaultSortField="Employee"
      defaultSortAsc={false}
      highlightOnHover
      pointerOnHover
      noHeader
      columns={columns}
      data={filteredItems}
      striped
      pagination
      paginationPerPage={4}
      noDataComponent="데이터가 없습니다"
    />
  );
};

export default Table;

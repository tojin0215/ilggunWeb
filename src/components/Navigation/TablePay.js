import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';

const Table = props => {
  const { data } = props;
  const columns = [
     
    {
      name:"이름",
      selector: (row, index) => row.Employee,
      sortable:true
    },
    {
      name: "국민연금",
      selector: (row, index) => row.NationalPensionPercentage,
      sortable: true
    
    },

    {
      name:"월급여",
      selector: (row, index) => row.Salary,
      sortable: true
    },
    {
      name: "과세 수당",
      selector: (row, index) => row.taxation,
      sortable: true
    },
    {
      name: "비과세 수당",
      selector: (row, index) => row.taxFree,
      sortable: true
    }, 
    
    {
      name: "연장근무비",
      selector: (row, index) => row.t_bonus,
      sortable: true,
      cell: row =>
      (row.t_bonus == null) ?(
        0
      ):(
        row.t_bonus
      )
    },   
    {
      name: "자가유류비",
      selector: (row, index) => row.f_carMaintenanceFee,
      sortable: true,
      cell: row =>
      (row.f_carMaintenanceFee == null) ?(
        0
      ):(
        row.f_carMaintenanceFee
      )
    }, 
    // {
    //   name:" 통상시급",
    //   selector: "normalPay",
    //   sortable:true
    // },
    // {
    //   name:" 월근무시간",
    //   selector: "worktime",
    //   sortable:true
    // },
    // {
    //   name:" 월급여공제",
    //   selector: "tax",
    //   sortable:true
    // },
    // {
    //   name:" 실지급액",
    //   selector: "realPay",
    //   sortable:true
    // }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
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
    item2 =>
      item2.Employee.indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

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
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;

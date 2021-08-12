import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';

const Table = props => {
  const { data } = props;
  const columns = [
    {
      name:"id",
      selector: (row, index) => row.id,
      sortable:true
    },
    {
      name:"근로자명",
      // selector: (row, index) => row.contract.Employee,
      sortable:true
    },
    {
      name:"월급여",
      selector: (row, index) => row.Salary,
      sortable: true,
      cell: row => (row.Salary == null)?(
        0
        ):(
          row.Salary
        ) 
    },
    {
      name: "추가 수당",
      selector: (row, index) => row.additionalAllowance,
      sortable: true,
      cell: row =>
      (parseInt(row.taxation) + parseInt(row.taxFree) == null) ?(
        0
      ):(
        parseInt(row.taxation) + parseInt(row.taxFree)
      )
    },
    {
      name:" 통상시급",
      selector: (row, index) => row.insurance.HourlyWage,
      sortable:true
    },
    
    {
      name:" 월근무시간",
      selector: "worktime",
      sortable:true
    },
            
    {
      name:" 월급여공제",
      selector: "tax",
      sortable:true,
      cell:  row =>
      (row.insurance.NationalPensionPercentage + row.insurance.HealthInsurancePercentage + row.insurance.RegularCarePercentage + row.insurance.EmploymentInsurancePercentage)
      
    },
    //공제액 계산

    {
      name:" 실지급액",
      selector: "realPay",
      sortable:true,
      cell:row=>
      parseInt(row.Salary) + parseInt(row.taxation) + parseInt(row.taxFree)
    }
    //실지급액 계산
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    item =>
      item.id.indexOf(filterText.toLowerCase()) !== -1
  );
  //id ==> Employee 변경
  

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
      defaultSortField="name"
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

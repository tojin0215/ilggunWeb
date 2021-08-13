import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';

const Table = props => {
  const { data } = props;
  const columns = [
    
    {
      name:"근로자명",
      selector: (row, index) => row.Employee,
      sortable:true
      //contractform
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
        //contractform
    },
    {
      name: "추가 수당",
      selector: (row, index) => row.additionalAllowance,
      sortable: true,
      cell: row =>
      (parseInt(row.otherAllowance.taxation) + parseInt(row.otherAllowance.taxFree) == null) ?(
        0
      ):(
        parseInt(row.otherAllowance.taxation) + parseInt(row.otherAllowance.taxFree)
      )
      //otherAllowance.
    },
    {
      name:" 통상시급",
      selector: (row, index) => row.insurance.HourlyWage,
      sortable:true
      //insurance
    },
    
    {
      name:" 월근무시간",
      selector: "worktime",
      sortable:true,
      cell: row =>
      parseInt(row.EndTimeHour)- parseInt(row.StartTimeHour) + "시간"
      //contractform.
    },
            
    {
      name:" 월급여공제",
      selector: "tax",
      sortable:true,
      cell:  row =>
      (row.insurance.NationalPensionPercentage + row.insurance.HealthInsurancePercentage + row.insurance.RegularCarePercentage + row.insurance.EmploymentInsurancePercentage)
      //insurance
    },
    //공제액 계산

    {
      name:" 실지급액",
      selector: "realPay",
      sortable:true,
      cell:row=>
      parseInt(row.Salary) + parseInt(row.otherAllowance.taxation) + parseInt(row.otherAllowance.taxFree)
      //otherAllowance. + contractform + insurance
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
      item.Employee.indexOf(filterText.toLowerCase()) !== -1
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
      noDataComponent="데이터가 없습니다"
    />
  );
};

export default Table;

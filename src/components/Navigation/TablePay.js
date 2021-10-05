import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';

const Table = props => {
  const { data } = props;
  console.log("data");
  console.log(data);


  const columns = [

    {
      name: "근로자명",
      selector: (row, index) => row.Employee,
      sortable: true
      //contractform
    },
    {
      name: "월급여",
      selector: (row, index) => row.Salary,
      sortable: true
      //contractform

    },
    {
      name: "추가 수당",
      selector: (row, index) => row.additionalAllowance,
      sortable: true,
      cell: row =>
        (parseInt(row.otherAllowance.t_bonus) + parseInt(row.otherAllowance.t_extension) + parseInt(row.otherAllowance.t_position) + parseInt(row.otherAllowance.t_etc))
        +
        (parseInt(row.otherAllowance.f_carMaintenanceFee) + parseInt(row.otherAllowance.f_childcareAllowance) + parseInt(row.otherAllowance.f_meals))
      //otherAllowance.
    },

    {
      name: "통상시급",
      selector: (row, index) => row.insurance.HourlyWage,
      sortable: true
      //insurance.
    },

    {
      name: " 월근무시간",
      selector: (row, index) => row.workTime,
      sortable: true,
      cell: row => Math.round(
        row.EndTimeHour - row.StartTimeHour
      )
      //contractform.
    },

    {
      name: " 월급여공제",
      selector: (row, index) => row.deduction,
      sortable: true,
      cell: row =>
        (Math.round((row.Salary * row.insurance.NationalPensionPercentage) / 100)) +
        (Math.round((row.Salary * row.insurance.EmploymentInsurancePercentage) / 100)) +
        (Math.round((row.Salary * row.insurance.HealthInsurancePercentage) / 100)) +
        (Math.round((row.Salary * row.insurance.RegularCarePercentage) / 100))
      //insurance.
    },

    {
      name: " 실지급액",
      selector: (row, index) => row.realPay,
      sortable: true,
      cell: row =>
        (parseInt(row.Salary) + ((parseInt(row.otherAllowance.t_bonus) + parseInt(row.otherAllowance.t_extension) + parseInt(row.otherAllowance.t_position) + parseInt(row.otherAllowance.t_etc))
          +
          (parseInt(row.otherAllowance.f_carMaintenanceFee) + parseInt(row.otherAllowance.f_childcareAllowance) + parseInt(row.otherAllowance.f_meals)))) - ((Math.round((row.Salary * row.insurance.NationalPensionPercentage) / 100)) +
            (Math.round((row.Salary * row.insurance.EmploymentInsurancePercentage) / 100)) +
            (Math.round((row.Salary * row.insurance.HealthInsurancePercentage) / 100)) +
            (Math.round((row.Salary * row.insurance.RegularCarePercentage) / 100)))
      //otherAllowance. + contractform + insurance
    }

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
      item.Employee.indexOf(filterText) !== -1
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
      defaultSortField="name"
      defaultSortAsc={false}
      highlightOnHover
      pointerOnHover
      noHeader
      columns={columns}
      data={filteredItems}
      striped
      pagination
      paginationPerPage={5}
      subHeader
      subHeaderComponent={subHeaderComponent}
      noDataComponent="데이터가 없습니다"
    />
  );
};

export default Table;

import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';

const Table = props => {
  const { data } = props;
  const columns = [
    {
      name: "근로자명",
      selector: (row, index) => row.name,
      sortable: true
      //contractform
    },
    {
      name: "근로자명",
      selector: (row, index) => row.name,
      sortable: true
      //contractform
    },
    {
      name: "월급여",
      selector: (row, index) => row.salary,
      sortable: true,
      cell: row => (row.salary == null) ? (
        0
      ) : (
        row.salary
      )
      //contractform
    },
    {
      name: "추가 수당",
      selector: (row, index) => row.additionalAllowance,
      sortable: true,

      //otherAllowance.
    },

    {
      name: "통상시급",
      selector: (row, index) => row.hourlyWage,
      sortable: true
      //insurance
    },

    {
      name: " 월근무시간",
      selector: (row, index) => row.workTime,
      sortable: true
      //contractform.
    },

    {
      name: " 월급여공제",
      selector: (row, index) => row.insurance,
      sortable: true
      //insurance
    },

    {
      name: " 실지급액",
      selector: (row, index) => row.realPay,
      sortable: true
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
      item.name.indexOf(filterText.toLowerCase()) !== -1
  );
  // name = Employee

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

import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import FilterComponent2 from './FilterComponent2';

import './table.css';

const Table = props => {
  const { data } = props;
  console.log("data");
  console.log(data);


  const columns = [
    //grow 크기 center 중앙 정렬
    {
      name: "번호",
      selector: (row, index) => row.number,
      sortable: true,
      grow: 0.5,
      center: true
    },
    {
      name: "분야",
      selector: (row, index) => row.field,
      sortable: true,
      grow: 0.5,
      center: true
    },
    {
      name: "지원사업명",
      selector: (row, index) => row.project,
      sortable: true,
      grow: 50,
      center: true
    },
    {
      name: "신청기간",
      selector: (row, index) => row.period,
      sortable: true,
      grow: 25,
      center: true
    },
    {
      name: "소관부처",
      selector: (row, index) => row.ministries,
      sortable: true,
      grow: 10,
      center: true
    },
    {
      name: "등록일",
      selector: (row, index) => row.registration,
      sortable: true,
      grow: 10,
      center: true
    },


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
      item.project.indexOf(filterText) !== -1
  );



  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent2
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
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

import React, { useMemo } from 'react';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';


const Table = props => {
  const { data } = props;
  // console.log(data)
  const columns = [
    {
      name: "이름",
      selector: (row, index) => row.workername,
      sortable: true
    },

    {
      name: "휴가 출발",
      sortable: true,
      cell: row => (<> {row.start_date.split("T")[0]}</>),
      grow: 2
    },
    {
      name: "휴가 복귀",
      sortable: true,
      cell: row => (<>{row.end_date.split("T")[0]}</>),
      grow: 2
    },
    {
      name: "휴가",
      selector: (row, index) => row.vacation,
      sortable: true,
      cell: row =>
        (row.vacation === 1) ? (
          <>
            <span>무급</span>
          </>
        ) : (
          <>
            <span>유급</span>
          </>)
      //무급=1, 유급=else
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = props.data.filter(
    item =>
      item.workername.indexOf(filterText.toLowerCase()) !== -1
  );

  // const filteredItems = props.data.filter(
  //   item => item.name && item.vacation
  // );
  // const filteredItems = props.data.filter(
  //   item =>
  //     JSON.stringify(item)
  //       .toLowerCase()
  //       .indexOf(filterText.toLowerCase()) !== -1
  // );

  //   const rt = (filteredItems.length > 0) ? <DataTable      
  //   defaultSortAsc={false}
  //   highlightOnHover
  //   pointerOnHover
  //   noHeader
  //   columns={columns}
  //   data={filteredItems}
  //   defaultSortField="workername"
  //   striped
  //   pagination
  //   paginationPerPage={4}
  // /> : <span>휴가자가 없습니다</span>

  //     return rt

  return (
    <DataTable
      defaultSortField="workername"
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

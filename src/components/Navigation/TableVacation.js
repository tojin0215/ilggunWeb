import React, { useMemo } from 'react';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';


const Table = props => {
  const { data } = props;
  const columns = [
    {
      name: "이름",
      selector: "name",
      sortable: true
    },  
    {
      name:"휴가 기간",
      selector: "vacation",
      sortable:true
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = data.filter(
    item => item.name && item.vacation
  );
  // const filteredItems = props.data.filter(
  //   item =>
  //     JSON.stringify(item)
  //       .toLowerCase()
  //       .indexOf(filterText.toLowerCase()) !== -1
  // );

  const rt = (filteredItems.length > 0) ? <DataTable      
  defaultSortAsc={false}               
  selectableRows
  highlightOnHover
  pointerOnHover
  noHeader
  columns={columns}
  data={filteredItems}
  defaultSortField="name"
  striped
  pagination
  paginationPerPage={4}
/> : <span>휴가자가 없습니다</span>

    return rt

  return (
    <DataTable      
      defaultSortAsc={false}               
      selectableRows
      highlightOnHover
      pointerOnHover
      noHeader
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      striped
      pagination
      paginationPerPage={4}
    />
  );
};

export default Table;

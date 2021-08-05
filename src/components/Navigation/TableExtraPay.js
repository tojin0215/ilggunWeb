import React, { useMemo } from 'react';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';


const Table = props => {
  const columns = [
    {
      name: "이름",
      selector: (rows, index) => rows.workername,
      sortable: true
    },  
    {
      name:"과세 수당",
      selector: (rows, index) => rows.taxation,
      sortable:true
    },  
    {
      name:"비과세 수당",
      selector: (rows, index) => rows.taxFree,
      sortable:true
    }
  ];
//   const filteredItems = props.data.filter(
//     item => item.name && item.vacation
//   );

//   const addaa = (filteredItems.length > 0) ? 
//   <DataTable      
//   defaultSortAsc={false}               
//   selectableRows
//   highlightOnHover
//   pointerOnHover
//   noHeader
//   columns={columns}  
//   defaultSortField="name"
//   striped
//   pagination
//   paginationPerPage={4}
// /> : <span>추가수당 수령자가 없습니다</span>

//     return addaa

  return (
    <DataTable      
      defaultSortField="id"
      defaultSortAsc={false}               
      selectableRows
      highlightOnHover
      pointerOnHover
      noHeader
      columns={columns}      
      defaultSortField="name"
      striped
      pagination
      // data={filteredItems}
      // subHeader
      // subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;

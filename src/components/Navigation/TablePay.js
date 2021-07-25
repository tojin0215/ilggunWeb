import React, { useMemo } from 'react';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';


const Table = props => {
  const columns = [
    {
      name: "No",
      selector: "id",
      sortable: true
    },  

    {
      name:"이름",
      selector: "name",
      sortable:true
    },
    {
      name:" 직책",
      selector: "level",
      sortable:true
    },
    {
      name:" 통상시급",
      selector: "normalPay",
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
      sortable:true
    },
    {
      name:" 실지급액",
      selector: "realPay",
      sortable:true
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
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
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
      defaultSortField="id"
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
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;

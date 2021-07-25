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
      name:"수신자",
      selector: "to",
      sortable:true
    },
    {
      name:"제목",
      selector: "title",
      sortable:true
    },
    {
      name:"날짜",
      selector: "date",
      sortable:true
    },
    {
      name:"읽음",
      selector: "reac",
      sortable:true
    },
    {
      name:"삭제",
      selector: "delete",
      cell: row =>
        (props.checkDelete) ? (
          <>
          <button onClick={ () => props.deleteMessage(row) }> ❌ </button>
          </>
        ) : null
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

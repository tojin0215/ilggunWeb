import React, { useMemo } from 'react';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';


const Table = props => {
  const columns = [
    {
      name: "이름",
      selector: "name",
      sortable: true
    },    

    {
    name: "QR",
    Button: true,
    cell: row =>
        row.showButtons ? (
          <>           
            <button>QR</button>
          </>
        ) : null
    },
    {
      name: "입사일",
      selector: "date",
      sortable: true    
    }, 
    {
      name: "직책(업무)",
      selector: "work",
      sortable: true
    },
    {
      name: "퇴직처리",
      Button: true,
      cell: row =>
          row.showButtons ? (
            <>           
              <button>Delete</button>              
            </>
          ) : null
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

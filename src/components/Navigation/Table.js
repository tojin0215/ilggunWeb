import React, { useMemo } from 'react';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

// import './table.css';
import imgsearch from '../../img/search.png'

const Table = props => {
  const columns = [
    {
      name: "이름",
      selector: "name",
      sortable: true
    },    
    {
      name: "정규직/비정규직",
      selector: "permanent",
      grow:2,
      cell: row =>
          row.showButtons ? (
            <>
              <button>정규직</button>
              <button>비정규직</button>
            </>
          ) : null
    },
    {
      name: "근로계약서작성여부",
      selector: "write",
      grow:2,
      cell: row =>
          row.showButtons ? (
            <>
              <button>작성</button>
              <button>미작성</button>
            </>
            ) : null
    },
    {
      name: "근로계약서",
      Button: true,
      grow:2,
      cell: row =>
          row.showButtons ? (
            <>
              <button>근로계약서</button>
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
      // selectableRows
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

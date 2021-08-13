import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';
import imgsearch from '../../img/search.png'

const Table = props => {
  const { data } = props;
  const columns = [
    {
      name: "이름",
      selector: (row, index) => row.id,
      sortable: true
    },
    // {
    //   name: "추가 수당",
    //   selector: (row, index) => row.additionalAllowance,
    //   sortable: true,
    //   cell: row =>
    //   (parseInt(row.taxation) + parseInt(row.taxFree) == null) ?(
    //     0
    //   ):(
    //     parseInt(row.taxation) + parseInt(row.taxFree)
    //   )
    // },
    {
      name: "과세",
      selector: (row, index) => row.taxation,
      sortable: true
    },
    {
      name: "비과세",
      selector: (row, index) => row.taxFree,
      sortable: true
    },
   
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
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
      highlightOnHover
      pointerOnHover
      noHeader
      columns={columns}
      data={filteredItems}
      striped
      pagination
      paginationPerPage={4}
      //  subHeader
      // subHeaderComponent={subHeaderComponent}
      noDataComponent="데이터가 없습니다"
    />
  );
};

export default Table;

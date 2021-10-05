import React, { useMemo } from 'react';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

import './table.css';
import imgsearch from '../../img/search.png'

const Table = props => {
  const { data, handleSelectWorker } = props;
  const columns = [
    {
      selector: (row, index) => row.workername2,
      sortable: true
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  // const filteredItems = props.data.filter(
  //   item =>
  //     JSON.stringify(item)
  //       .toLowerCase()
  //       .indexOf(filterText.toLowerCase()) !== -1
  // );
  const filteredItems = props.data.filter(
    item =>
      item.workername2.indexOf(filterText) !== -1
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
      defaultSortAsc={false}
      highlightOnHover
      pointerOnHover
      columns={columns}
      data={filteredItems}
      striped
      subHeader
      onRowClicked={handleSelectWorker}
      subHeaderComponent={subHeaderComponent}
      noDataComponent="데이터가 없습니다"

    />
  );
};

export default Table;

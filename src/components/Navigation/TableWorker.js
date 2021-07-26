import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

// import './table.css';
import imgsearch from '../../img/search.png'

const Table = props => {
  const { data } = props;
  const columns = [
    {
      name: "이름",
      selector: "workername2",
      sortable: true
    },
    {
      name: "정규직/비정규직",
      selector: "permanent",
      grow:2,
      cell: row =>
          (row.type == 2) ? (
            <>
            <Link to={{ pathname:"/workerManage", state:{ worker: row } }}>정규직</Link>
            </>
          ) : (
            <>
            <Link to={{ pathname:"/workerManage", state:{ worker: row } }}>비정규직</Link>
            </>)
    },
    {
      name: "근로계약서작성여부",
      selector: "write",
      grow:2,
      cell: row =>
          (row.state == 2) ? (
            <>
              <button>작성</button>
            </>
            ) : (
              <>
                <button>미작성</button>
              </>)
    },
    {
      name: "근로계약서",
      Button: true,
      grow:2,
      cell: row =>
        (row.state != 2) ? (
            <>
            <Link to={{ pathname:"/workerManage/contract", state:{ worker: row } }}>근로계약서</Link>
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
  // const filteredItems = props.data.filter(
  //   item =>
  //     JSON.stringify(item)
  //       .toLowerCase()
  //       .indexOf(filterText.toLowerCase()) !== -1
  // );

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
      data={data}
      defaultSortField="name"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;

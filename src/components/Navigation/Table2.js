import React, { useMemo } from 'react';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import Button from 'react-bootstrap/Button';

const Table = (props) => {
  const { openModal, data, deleteWorker } = props;
  const columns = [
    {
      name: '이름',
      selector: (row, index) => row.workername2,
      sortable: true,
    },
    {
      name: 'QR',
      Button: true,
      cell: (row) =>
        row.state == 2 ? (
          <>
            <Button
              className="w-100 fw-bold text-h6"
              onClick={() => openModal(row.workername)}
            >
              {' '}
              QR{' '}
            </Button>
          </>
        ) : null,
    },

    {
      name: '입사일',
      selector: (row, index) => row.startdate,
      sortable: true,
    },

    // {
    //   name: "직책(업무)",
    //   selector: (row, index) => row.workername,
    //   sortable: true
    // },
    {
      name: '퇴직처리',
      Button: true,
      cell: (row) =>
        row.state == 2 ? (
          <>
            <Button
              className="py-1 fw-bold"
              variant="danger"
              onClick={() => deleteWorker(null, row.workername)}
            >
              퇴사
            </Button>
          </>
        ) : row.state == 0 ? (
          <span>미입사</span>
        ) : (
          <>
            <span>
              {row.retire_date
                ? row.retire_date
                : new Date().toLocaleDateString()}{' '}
              퇴사{' '}
            </span>
          </>
        ),
    },
  ];

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    (item) => item.workername2.indexOf(filterText) !== -1,
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
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
      noDataComponent="데이터가 없습니다"
    />
  );
};

export default Table;

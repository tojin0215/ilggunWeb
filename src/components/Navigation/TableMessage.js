import React, { useMemo } from 'react';
import Button from 'react-bootstrap/Button';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

const Table = (props) => {
  const { deleteMessage } = props;

  const columns = [
    {
      name: 'No',
      maxWidth: '6rem',
      selector: (row, index) => row.ind,
      sortable: true,
    },

    {
      name: '발신자',
      maxWidth: '7rem',
      selector: (row, index) => row.f_name,
      sortable: true,
    },
    {
      name: '제목',
      // maxWidth: '60rem',
      selector: (row, index) => row.message,
      sortable: true,
    },
    // {
    //   name:"날짜",
    //   selector: "date",
    //   sortable:true
    // },
    {
      name: '읽음',
      maxWidth: '6rem',
      cell: (row) => (row.r == 1 ? <span>읽음</span> : null),
    },
    {
      name: '삭제',
      maxWidth: '6rem',
      cell: (row) =>
        row.r === 1 ? (
          <Button variant="danger" onClick={() => deleteMessage(row)}>
            삭제
          </Button>
        ) : (
          <></>
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
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1,
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
      onRowClicked={props.click}
      subHeaderComponent={subHeaderComponent}
      noDataComponent="데이터가 없습니다"
    />
  );
};

export default Table;

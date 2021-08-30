import React, { useMemo } from 'react';

import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';

const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const Table = props => {
  const columns = [
    {
      name: "이름",
      selector: (row, index) => row.workername2,
      sortable: true
    },  

    {
      name:"출근시간",
      selector: (row, index) => row.goToWork,
      sortable:true,
    },
    {
      name:" 퇴근시간",
      selector: (row, index) => row.goToHome,
      sortable:true,
    },
    {
      name:"휴가",
      selector: (row, index) => row.vacation,
      sortable:true,
      cell: row => (row.vacation)? (<span>{console.log(row.vacation)}{row.vacation.start_date_str.split('T')[0].replace("2021-", "")}~{row.vacation.end_date_str.split('T')[0].replace("2021-", "")}</span>):(<>-</>)
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
      item.workername2.indexOf(filterText.toLowerCase()) !== -1
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
      // selectableRows
      highlightOnHover
      pointerOnHover
      noHeader
      columns={columns}
      data={filteredItems}
      // sortFunction={(rows, field, sortDirection) => {console.log(field)}}
      defaultSortField="workername2"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      noDataComponent="데이터가 없습니다"
    />
  );
};

export default Table;

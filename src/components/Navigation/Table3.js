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
      selector: (row, index) => row.openTime,
      sortable:true,
      cell: row =>
          (row[day[new Date().getDay()]]) ? (
            <>
            <span>{row[day[new Date().getDay()]].slice(0, 2)}:{row[day[new Date().getDay()]].slice(2, 4)}</span>
            {/* <span>작성</span> */}
            {/* <Link to={{ pathname:"/workerManage/contract", state:{ worker: row } }}>작성</Link> */}
              {/* <Button>작성</Button> */}
            </>
            ) : (
              <>
              <span>{"출근안함"}</span>
              {/* <Link to={{ pathname:"/workerManage/contract", state:{ worker: row } }}>미작성</Link> */}
                {/* <Button>미작성</Button> */}
              </>)
    },
    {
      name:" 퇴근시간",
      selector: (row, index) => row.closeTime,
      sortable:true,
      cell: row =>
          (row[day[new Date().getDay()]]) ? (
            <>
            <span>{row[day[new Date().getDay()]].slice(4, 6)}:{row[day[new Date().getDay()]].slice(6, 8)}</span>
            {/* <span>작성</span> */}
            {/* <Link to={{ pathname:"/workerManage/contract", state:{ worker: row } }}>작성</Link> */}
              {/* <Button>작성</Button> */}
            </>
            ) : (
              <>
              <span>{"출근안함"}</span>
              {/* <Link to={{ pathname:"/workerManage/contract", state:{ worker: row } }}>미작성</Link> */}
                {/* <Button>미작성</Button> */}
              </>)
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
      defaultSortField="workername2"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;

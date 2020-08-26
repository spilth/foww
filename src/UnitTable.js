import React, { useMemo } from "react";
import units from "./data/units";
import { useFilters, useSortBy, useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faForward,
  faPlay,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

import "./UnitTable.css";

export function UnitTable() {
  const data = useMemo(() => units, []);

  const FactionsColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        row.values[id].forEach((item) => {
          options.add(item);
        });
      });
      return [...options.values()].sort().filter((v) => v != null && v !== "");
    }, [id, preFilteredRows]);

    return (
      <select
        value={filterValue}
        onChange={(e) => setFilter(e.target.value || undefined)}
        className="form-control"
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const StringColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => options.add(row.values[id]));
      return [...options.values()].sort().filter((v) => v != null && v !== "");
    }, [id, preFilteredRows]);

    return (
      <select
        value={filterValue}
        onChange={(e) => setFilter(e.target.value || undefined)}
        className="form-control"
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const RangeColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => options.add(row.values[id]));
      return [...options.values()].sort((a, b) => a - b);
    }, [id, preFilteredRows]);

    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        className="form-control"
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const FactionsCell = ({ value: factions }) => (
    <span>{factions.join(" / ")}</span>
  );

  const RangeCell = ({ value: range }) => (
    <div className={`range range-${range}`}>{range}</div>
  );

  const columns = useMemo(
    () => [
      {
        Header: "Wave",
        accessor: "wave",
        Filter: StringColumnFilter,
        filter: "equals",
      },
      {
        Header: "Factions",
        accessor: "factions",
        Filter: FactionsColumnFilter,
        filter: "includes",
        Cell: FactionsCell,
        sortType: "faction",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Type",
        accessor: "type",
        Filter: StringColumnFilter,
        filter: "equals",
      },
      {
        Header: "Cost",
        accessor: "cost",
      },
      {
        Header: "Unique",
        accessor: (d) => (d.unique ? "Yes" : "No"),
        Filter: StringColumnFilter,
        filter: "equals",
      },
      {
        Header: <FontAwesomeIcon icon={faPlay} fixedWidth />,
        accessor: "move",
        Filter: RangeColumnFilter,
        filter: "equals",
        Cell: RangeCell,
      },
      {
        Header: <FontAwesomeIcon icon={faForward} fixedWidth />,
        accessor: "charge",
        Filter: RangeColumnFilter,
        filter: "equals",
        Cell: RangeCell,
      },
      {
        Header: <FontAwesomeIcon icon={faEye} fixedWidth />,
        accessor: "awareness",
        Filter: RangeColumnFilter,
        filter: "equals",
        Cell: RangeCell,
      },
    ],
    []
  );

  const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
  }) => {
    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search...`}
        className="form-control"
      />
    );
  };

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const sortTypes = useMemo(
    () => ({
      faction: (rowA, rowB) => {
        if (rowA.values.factions[0] === undefined) return 1;
        if (rowB.values.factions[0] === undefined) return -1;
        return rowA.values.factions[0] > rowB.values.factions[0];
      },
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      sortTypes,
    },
    useFilters,
    useSortBy
  );

  return (
    <table
      {...getTableProps()}
      className="table table-sm table-borderless table-striped"
    >
      <thead className="thead-dark">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FontAwesomeIcon icon={faSortDown} fixedWidth />
                    ) : (
                      <FontAwesomeIcon icon={faSortUp} fixedWidth />
                    )
                  ) : (
                    <FontAwesomeIcon
                      icon={faSort}
                      fixedWidth
                      color="lightGrey"
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}

        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

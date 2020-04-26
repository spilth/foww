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

  const StringColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()].sort().filter((v) => v != null && v !== "");
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

  const NumberColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
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

  const DistanceCell = ({ value }) => (
    <div className={`distance distance-${value}`}>{value}</div>
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
        Header: "Faction",
        accessor: "faction",
        Filter: StringColumnFilter,
        filter: "equals",
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
        accessor: (d) => {
          return d.unique ? "Yes" : "No";
        },
        Filter: StringColumnFilter,
        filter: "equals",
      },
      {
        Header: <FontAwesomeIcon icon={faPlay} fixedWidth />,
        accessor: "move",
        Filter: NumberColumnFilter,
        filter: "equals",
        Cell: DistanceCell,
      },
      {
        Header: <FontAwesomeIcon icon={faForward} fixedWidth />,
        accessor: "charge",
        Filter: NumberColumnFilter,
        filter: "equals",
        Cell: DistanceCell,
      },
      {
        Header: <FontAwesomeIcon icon={faEye} fixedWidth />,
        accessor: "awareness",
        Filter: NumberColumnFilter,
        filter: "equals",
        Cell: DistanceCell,
      },
    ],
    []
  );

  const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
  }) => {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
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
    },
    useFilters,
    useSortBy
  );

  return (
    <table {...getTableProps()} className="table table-sm table-borderless table-striped">
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

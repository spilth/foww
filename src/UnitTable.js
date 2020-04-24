import React from "react";
import models from "./data/models";
import { useFilters, useSortBy, useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

export function UnitTable() {
  const data = React.useMemo(() => models, []);

  const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
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

  const columns = React.useMemo(
    () => [
      {
        Header: "Faction",
        accessor: "faction",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Cost",
        accessor: "cost",
      },
      {
        Header: "Unique",
        accessor: d => { return d.unique ? 'Yes' : 'No' },
        Filter: SelectColumnFilter,
        filter: "equals",
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

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const filterTypes = React.useMemo(
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
    <table {...getTableProps()} className="table table-sm">
      <thead>
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

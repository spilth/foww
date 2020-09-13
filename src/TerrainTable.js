import React, { useMemo } from "react";

import "./UnitTable.css";
import terrain from "./data/terrain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { useSortBy, useTable } from "react-table";

export function TerrainTable() {
  const data = useMemo(() => terrain, []);

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: (d) => ({ image: d.image, alt: d.name }),
        Cell: ({ value }) => {
          return (
            <img
              src={`/images/terrain/${value.image}`}
              alt={value.alt}
              class="img img-fluid"
              width="64"
              height="64"
            ></img>
          );
        },
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Product",
        accessor: (d) => ({ product: d.product, url: d.product_url }),
        Cell: ({ value }) => {
          return <a href={value.url}>{value.product}</a>;
        },
      },
      {
        Header: "Provides Cover?",
        accessor: (d) => (d.provides_cover ? "Yes" : "No"),
      },
      {
        Header: "Blocks Line of Sight?",
        accessor: (d) => (d.blocks_line_of_sight ? "Yes" : "No"),
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
    },
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

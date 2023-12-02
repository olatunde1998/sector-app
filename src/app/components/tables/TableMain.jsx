import React, { FC } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Spinner } from "../spinner/spinner";

export const TableMain = ({
  data,
  columns = [],
  tableClass,
  filters,
  isLoading,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    debugTable: true,
    filters,
  });

  return (
    <div className="">
      <div className="w-full overflow-x-auto block rounded-[0.25rem] min-h-[30.3rem] bg-[#495F6E] shadow-shadowOne border border-[#213f7d0f]">
        {/* Render table if table has data  */}
        <table
          className={"w-full h-full rounded-[0.25rem] " + " " + tableClass}
        >
          <thead className="text-xs border-b-[2px] text-white whitespace-nowrap  border-[#10172A]">
            {/* Mapping through the table headers */}
            {table?.getHeaderGroups()?.map((headerGroup, i) => (
              <tr key={i}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className=" bg-[#495F6E]  p-6  text-left font-bold capitalize text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={columns.length}>
                  <div className="w-[100px] relative right-28 h-[100px] md:w-[250px] md:left-28 md:right-0 md:h-[250px] mx-auto mt-28">
                    <Spinner />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {/* Mapping throught the table body */}
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={index}
                  className="cursor-pointer border-x-none text-sm border-b-[1px] border-gray-100 hover:bg-slate-100  bg-[#495F6E]  hover:border-l-[2px] hover:border-[#10172A] hover:border-b-0  whitespace-nowrap"
                >
                  {row.getVisibleCells().map((cell, key) => (
                    <td key={key} className="py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

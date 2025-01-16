"use client";

import {
  // SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  // ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronDown, Shell } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTablePagination } from "./DataTablePaginationProps";


export function DataTable({ columns, data, paparentCallback }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  // const {id} = useParams()
  const [isl, setIsL] = useState(false);
  const [colFl, setColFl] = useState();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  const selectedRows = table.getSelectedRowModel();
  // const fileIds = Object.values(selectedRows).map(row => row.original)
  // const fileIdString = fileIds.join(",")
  const lib = selectedRows.rows.map((sl) => sl.original).map((l) => l.id);

  const sendIdToParent = () => {
    paparentCallback(lib);
  };
  useEffect(() => {
    // if(lib.length >=1){
    sendIdToParent();
    // }
  }, [selectedRows]);
  // const updatedfile = updatefileselection(fileIdString)
  const accessorKey = Object.values(columns)
    .map((item) => item.accessorKey)
    .filter((accessorKey) => accessorKey);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="flex items-center p-4">
          {accessorKey.includes(colFl) && (
            <Input
              placeholder={`${colFl} ...`}
              value={table.getColumn(colFl)?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn(colFl)?.setFilterValue(event.target.value)
              }
              className="max-w-60"
            />
          )}
          <Select
            onValueChange={(e) => {
              setColFl(e);
            }}
          >
            <SelectTrigger className="w-[180px] ml-5">
              <SelectValue placeholder="Filter par" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter par</SelectLabel>
                {columns.map((cl, key) => {
                  return (
                    typeof cl.header === "string" && (
                      <SelectItem key={key} value={cl.accessorKey.toString()}>
                        {cl.header}
                      </SelectItem>
                    )
                  );
                })}
                <SelectItem value={null}>None</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* ################################# */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table   
          className="rounded-md border-border h-10 overflow-clip relative"
          divClassName="max-h-96 overflow-y-scroll">
          <TableHeader className={"sticky top-0 backdrop-blur-sm"}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No thing ...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

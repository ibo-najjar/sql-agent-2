"use client";

import { Check, Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation } from "@tanstack/react-query";

import { Button as Btn } from "@/components/ui/button";
import { MessagesContext } from "@/context/messages";
import { nanoid } from "nanoid";

function toJson(data: any) {
  return JSON.stringify(data, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}

const Button = ({ children, ...props }: any) => {
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const { addMessage } = useContext(MessagesContext);

  // extract columns from the first row
  const columns =
    data.length > 0 && data
      ? Object.keys(data[0]).map((key) => {
          return {
            accessorKey: key,
            header: key,
          };
        })
      : [];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // const fetchOnClick = async () => {
  //   setLoading(true);
  //   const res = await fetch("/api/database", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ sqlQuery: children[0] }),
  //   }).finally(() => setLoading(false));

  //   const data = await res.json();
  //   setData(data);
  //   console.log(data);
  // };

  const { mutate: fetchOnClick, isLoading } = useMutation({
    mutationFn: async () => {
      // setLoading(true);
      const res = await fetch("/api/database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sqlQuery: children[0] }),
      });

      return await res.json();
    },
    onSuccess: (data) => {
      setData(data);
      // console.log("data", data);
      // if (!fetched) {
      //   addMessage({
      //     id: nanoid(),
      //     isUserMessage: false,
      //     text: " this is the retrived data \n" + toJson(data),
      //   });
      //   setFetched(true);
      // }
    },
    onError: async (error: any) => {
      console.log("error", error);
      setError(await error.json());
    },
  });

  useEffect(() => {
    console.log("is fetched", fetched);
  }, [fetched]);

  return (
    <>
      <button
        {...props}
        className="bg-neutral-700 text-white px-2 py-1.5  rounded-lg flex items-center w-fit my-1"
        onClick={fetchOnClick}
      >
        {isLoading ? (
          <Loader2
            className="animate-spin w-4 h-4 mr-2"
            stroke="currentColor"
          />
        ) : data ? (
          <Check className="w-4 h-4 mr-2" stroke="currentColor" />
        ) : (
          "execute "
        )}
        {children}
      </button>

      {data.length > 0 && !error && (
        <div className="">
          <div className="rounded-md border max-w-4xl">
            <Table className="">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="truncate">
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
                        <TableCell key={cell.id} className="truncate">
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
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Btn
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Btn>
            <Btn
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Btn>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default Button;

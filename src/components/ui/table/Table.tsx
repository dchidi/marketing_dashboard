import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import styles from "./Table.module.css";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useTable } from "./useTable";

interface TableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  tableTitle?: string;
  downloadFileName?: string;
}

const Table = <TData,>({
  columns,
  data,
  enableSorting = true,
  enableFiltering = true,
  tableTitle,
  downloadFileName,
}: TableProps<TData>) => {
  const { exportToExcel } = useTable();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    enableSorting,
    enableFilters: enableFiltering,
    initialState: {
      sorting: enableSorting
        ? columns
            .filter((col) => (col as any).defaultSort)
            .map((col) => ({
              id: (col as any).accessorKey as string,
              desc: (col as any).defaultSort === "desc",
            }))
        : [],
    },
  });

  const handleSort = (column: any) => {
    if (!column.getCanSort()) return;

    // If currently sorted ascending, switch to descending
    if (column.getIsSorted() === "asc") {
      column.toggleSorting(true); // desc
    }
    // Otherwise (including unsorted), switch to ascending
    else {
      column.toggleSorting(false); // asc
    }
  };

  const handleDownload = () => {
    const excel_file_name = downloadFileName || "table_data";
    exportToExcel(
      table.getRowModel().rows.map((r) => r.original),
      `${excel_file_name}.xlsx`
    );
  };

  return (
    <>
      <p className={styles.tableTitle}>
        {tableTitle}
        <span onClick={handleDownload} className={styles.downloadButton}>
          [download file]
        </span>
      </p>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className={styles.tableHeader}
                  >
                    <div className={styles.headerContent}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      {enableSorting && header.column.getCanSort() && (
                        <button
                          onClick={() => handleSort(header.column)}
                          className={styles.sortButton}
                        >
                          {header.column.getIsSorted() === "asc" ? (
                            <RiSortAsc />
                          ) : (
                            <RiSortDesc />
                          )}
                        </button>
                      )}
                    </div>

                    {enableFiltering && header.column.getCanFilter() && (
                      <div className={styles.filterContainer}>
                        <input
                          type="text"
                          value={
                            (header.column.getFilterValue() as string) ?? ""
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          className={styles.filterInput}
                          placeholder={`Filter...`}
                        />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className={styles.tableBody}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.tableRow}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;

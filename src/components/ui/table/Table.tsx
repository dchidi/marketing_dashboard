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
import { Row } from "../../layouts/row_col/RowCol";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useFilterLocalStore } from "../../../hooks/useFilterLocalStore";

interface TableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  limit?: number;
  skip?: number;
  total?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  tableTitle?: string;
  downloadFileName?: string;
  isFetching: boolean;
  downloadSourceData: any;
  paramQueryFn: (args: any) => void;
}

const stringToNumber = (arg: string): number => {
  return typeof arg === "string" ? parseInt(arg, 10) : arg;
};

const pages = (
  // skip: number,
  total: number,
  // limit: number,
  pageSize: string
): number => {
  const pageSizeNum = stringToNumber(pageSize);

  // Calculate current page correctly
  // const currentPage = skip === 0 ? 1 : Math.floor(skip / limit) + 1;
  const totalPage = Math.ceil(total / pageSizeNum);

  return totalPage;
};

const DEFAULT_PAGE_SIZE = 100;

const Table = <TData,>({
  columns,
  data,
  enableSorting = true,
  enableFiltering = false,
  tableTitle,
  paramQueryFn = (_: any) => {},
  limit = DEFAULT_PAGE_SIZE,
  skip = 0,
  total = 0,
  isFetching = true,
  downloadSourceData,
}: TableProps<TData>) => {
  const [updateSkip, setUpdateSkip] = useState<number>(skip);
  const [pageSize, setPageSize] = useState<string>(String(limit));
  let totalPage = pages(total, pageSize);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { saveFilter } = useFilterLocalStore();

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

  const pageSizeGroup = ["50", "100", "200", "500"].filter((item) => {
    return item !== pageSize;
  });

  useEffect(() => {
    console.log("run query", updateSkip, limit);
    saveFilter({ limit: stringToNumber(pageSize), skip: updateSkip });
    paramQueryFn({ limit: stringToNumber(pageSize), skip: updateSkip });
  }, [updateSkip, pageSize]);

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

  const pageSizeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setPageSize(event.target.value);
    // if pageSize changes, call the endpoint with updated limit.
    // We will put the endpoint call in useEffect
  };

  const nav = (direction: string) => {
    switch (direction) {
      case "start":
        setUpdateSkip(0);
        setCurrentPage(0);
        return;

      case "prev":
        if (currentPage > 0) {
          const _updatedCurrPage = currentPage - 1;
          setUpdateSkip(_updatedCurrPage * stringToNumber(pageSize));
          setCurrentPage(_updatedCurrPage);
        }
        return;

      case "next":
        if (currentPage + 1 < totalPage) {
          const _updatedCurrPage = currentPage + 1;
          setUpdateSkip(_updatedCurrPage * stringToNumber(pageSize));
          setCurrentPage(_updatedCurrPage);
        } else setCurrentPage(totalPage - 1);
        return;

      case "end":
        const _updatedCurrPage = totalPage - 1;
        setUpdateSkip(_updatedCurrPage * stringToNumber(pageSize));
        setCurrentPage(totalPage - 1);
        return;
    }
  };

  return (
    <>
      {!isFetching && (
        <div>
          <p className={styles.tableTitle}>
            {tableTitle}

            <button
              type="button"
              onClick={downloadSourceData}
              // disabled={isDownloading}
              className={styles.downloadButton}
              // aria-busy={isDownloading}
            >
              Download Data
            </button>
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Row className={styles.pagination}>
            {/* {total > skip + limit && ( */}
            <Row className={styles.navBtns}>
              <MdOutlineKeyboardDoubleArrowLeft
                // fontSize={25}
                className={styles.btn}
                onClick={() => nav("start")}
              />
              <MdOutlineArrowBackIos
                // fontSize={18}
                className={styles.btnSm}
                onClick={() => nav("prev")}
              />

              <div className={styles.counterDisplay}>{`${
                currentPage + 1
              } / ${totalPage}`}</div>
              <MdOutlineArrowForwardIos
                // fontSize={18}
                className={styles.btnSm}
                onClick={() => nav("next")}
              />

              <MdOutlineKeyboardDoubleArrowRight
                // fontSize={25}
                className={styles.btn}
                onClick={() => nav("end")}
              />
            </Row>
            {/* )} */}
            <Row>
              <select
                onChange={pageSizeHandler}
                value={pageSize} // Add this to control the selected value
                // key={pageSize} // This forces re-render when pageSize changes
                className={styles.btnLg}
              >
                <option value={pageSize}>{pageSize}</option>
                {pageSizeGroup.map((item, idx) => (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                ))}
              </select>
            </Row>
          </Row>
        </div>
      )}
    </>
  );
};

export default Table;

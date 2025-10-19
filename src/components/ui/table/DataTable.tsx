import React, { useMemo } from "react";
import styles from "./DataTable.module.css";
import Skeleton from "../loading/skeleton";

type Row = { month: string; value: number };
interface DataTableProps {
  data?: Row[];
  isLoading?: boolean;
}

// If parent passes the same `data` reference, this avoids re-rendering.
const DataTable: React.FC<DataTableProps> = React.memo(
  ({ data = [], isLoading = true }) => {
    // Build the header and value cells once per `data` change.
    const { headerCells, valueCells, columnCount } = useMemo(() => {
      const h: React.ReactNode[] = [];
      const v: React.ReactNode[] = [];

      for (let i = 0; i < data.length; i++) {
        const { month, value } = data[i];
        // If months can repeat, fall back to index suffix for a stable key.
        const key = month ? `${month}-${i}` : String(i);

        h.push(<td key={`h-${key}`}>{month}</td>);
        v.push(<td key={`v-${key}`}>{value.toLocaleString("en-US")}</td>);
      }

      return { headerCells: h, valueCells: v, columnCount: Math.max(data.length, 1) };
    }, [data]);

    return (
      <table className={styles.root}>
        <tbody className={styles.tdata}>
          {isLoading ? (
            <tr className={styles.loadingRow}>
              <td colSpan={columnCount}>
                <div className={styles.loadingCell}>
                  <Skeleton variant="dots" intervalMs={600} overlay={false} as="div" />
                </div>
              </td>
            </tr>
          ) : (
            <>
              <tr className={styles.header}>{headerCells}</tr>
              <tr>{valueCells}</tr>
            </>
          )}
        </tbody>
      </table>
    );
  }
);

export default DataTable;

import React from "react";
import styles from "./FreePolicyConversion.module.css";
import { Row, Column } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import { PieChart } from "../../ui/graph/PieChart";
import { TableModal } from "../../ui/table/TableModal";
import { fp_columns } from "../../ui/table/table_columns";
import Skeleton from "../../ui/loading/skeleton";
import { useFreePolicyConversion } from "./useFreePolicyConversion";

const FreePolicyConversion: React.FC = () => {
  const {
    by_status,
    by_pet_type,
    by_channel,
    fmt_total,
    dataWindow,
    dataTableQuery,
    isLoadingSummary,
    isSuccessSummary,
    errorSummary,
    hasRequested,
    isOpen,
    closeModal,
    setPagination,
    handleViewData,
    handleDirectDownload,
  } = useFreePolicyConversion();

  // Deferred API call
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching, // true while a request is in flight
  } = dataTableQuery;

  return (
    <>
      <Card
        title="Free Policy"
        viewDataCallback={handleViewData}
        className={styles.root}
      >
        {isLoadingSummary ? (
          <Skeleton variant="dots" intervalMs={600} />
        ) : (
          <>
            <h3>
              {fmt_total}
              {/* <span className="date">[{dataWindow}]</span> */}
            </h3>
            <Column className={styles.chart}>
              <div style={{ width: "300px", height: 250 }}>
                <div>
                  <h5>By Status</h5>
                  <Row gap="5px" className={styles.row}>
                    {by_status?.map(({ name, value, PctOfTotal }: any) => (
                      <Row key={name} className={styles.dataRow}>
                        {name}
                        <div className={styles.val}>
                          {value.toLocaleString("en-US")}
                          <span className={styles.perct}>({PctOfTotal}%)</span>
                        </div>
                      </Row>
                    ))}
                  </Row>
                </div>
                <div className={styles.mt2}>
                  <h5>By Pet Type</h5>
                  <Row gap="5px" className={styles.row}>
                    {by_pet_type?.map(({ name, value, PctOfTotal }: any) => (
                      <Row key={name} className={styles.dataRow}>
                        {name}
                        <div className={styles.val}>
                          {value.toLocaleString("en-US")}
                          <span className={styles.perct}>({PctOfTotal}%)</span>
                        </div>
                      </Row>
                    ))}
                  </Row>
                </div>
                <div>
                  <h5>By Channel</h5>
                  <Row gap="5px" className={styles.row}>
                    {by_channel?.map(({ name, value, PctOfTotal }: any) => (
                      <Row key={name} className={styles.dataRow}>
                        {name}
                        <div className={styles.val}>
                          {value.toLocaleString("en-US")}
                          <span className={styles.perct}>({PctOfTotal}%)</span>
                        </div>
                      </Row>
                    ))}
                  </Row>
                </div>
              </div>
            </Column>
          </>
        )}
      </Card>
      <TableModal
        modalState={isOpen}
        closeModal={closeModal}
        closeEvent={false}
        isFetching={isFetching}
        hasRequested={hasRequested}
        isError={isError}
        error={error}
        data={data}
        isSuccess={isSuccess}
        columns={fp_columns}
        downloadHandler={handleDirectDownload}
        paginationHandler={setPagination}
      />
    </>
  );
};
export default FreePolicyConversion;

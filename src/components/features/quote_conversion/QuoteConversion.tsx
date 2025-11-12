import React from "react";
import styles from "./QuoteConversion.module.css";
import { Row } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import { useQuoteConversion } from "./useQuoteConversion";
import { PieChart } from "../../ui/graph/PieChart";
import { TableModal } from "../../ui/table/TableModal";
import { conversion_table_columns } from "../../ui/table/table_columns";
import Skeleton from "../../ui/loading/Skeleton";

const QuoteConversion: React.FC = () => {
  const {
    totalConversion,
    graphData,
    dataTableQuery,
    isLoadingSummary,
    hasRequested,
    isOpen,
    closeModal,
    setPagination,
    handleViewData,
    handleDirectDownload,
  } = useQuoteConversion();

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
        title="Quote Conversion"
        viewDataCallback={handleViewData}
        className={styles.root}
        hasViewData={false}
      >
        {isLoadingSummary ? (
          <Skeleton variant="dots" intervalMs={600} />
        ) : (
          <>
            <h3>{totalConversion}</h3>
            <Row className={styles.chart}>
              <div style={{ width: "300px", height: 250 }}>
                {totalConversion !== "0" ? (
                  <PieChart
                    data={graphData}
                    colors={["#59577bff", "#24a08aff"]}
                    outerRadius="80%"
                    label={true}
                    tooltip={true}
                    legend={true}
                  />
                ) : (
                  <PieChart
                    data={[
                      { name: "Empty", value: 80 },
                      { name: "Empty", value: 10 },
                    ]}
                    colors={["#3a3a3aff"]}
                    outerRadius="100%"
                    label={false}
                    tooltip={false}
                    legend={false}
                  />
                )}
              </div>
            </Row>
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
        columns={conversion_table_columns}
        downloadHandler={handleDirectDownload}
        paginationHandler={setPagination}
      />
    </>
  );
};
export default QuoteConversion;

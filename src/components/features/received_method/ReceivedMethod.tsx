import type React from "react";
import styles from "./ReceivedMethod.module.css";
import { Row } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import { useReceiveMethod } from "./useReceivedMethod";
import { TwoLineChart } from "../../ui/graph/LineGraph";
import { TbMinusVertical } from "react-icons/tb";
import { TableModal } from "../../ui/table/TableModal";
import { quote_receive_mth_columns } from "../../ui/table/table_columns";
import Skeleton from "../../ui/loading/skeleton";
import type { CardProps } from "../pet_type/types";

const ReceivedMethod: React.FC<CardProps> = ({
  modal_key,
  download_url,
  api_summary_hook,
  api_data_hook,
  card_name = "",
  historical_months = 7,
  showDataDownloadBtn = true,
}) => {
  const {
    total_phone,
    total_web,
    fmt_total,
    graphData,
    dataTableQuery,
    setPagination,
    handleDirectDownload,
    isOpen,
    closeModal,
    handleViewData,
    hasRequested,
    isLoadingSummary,
  } = useReceiveMethod({
    modal_key,
    download_url,
    api_summary_hook,
    api_data_hook,
    historical_months,
  });

  const {
    data: tableData,
    error,
    isError,
    isSuccess,
    isFetching,
  } = dataTableQuery;

  return (
    <>
      <Card
        title={card_name}
        viewDataCallback={handleViewData}
        className={styles.root}
        hasViewData={showDataDownloadBtn}
      >
        {isLoadingSummary ? (
          <Skeleton variant="dots" intervalMs={600} />
        ) : (
          <>
            <h3>{fmt_total}</h3>
            <Row className={styles.chart}>
              <TwoLineChart data={graphData} />
            </Row>
            <Row className={styles.legend}>
              <div>
                <div>Web</div>
                <Row className={styles.legendRow}>
                  <TbMinusVertical className={styles.web} />
                  <span>{total_web}</span>
                </Row>
              </div>
              <div>
                <div>Phone</div>
                <Row className={styles.legendRow}>
                  <TbMinusVertical className={styles.phone} />{" "}
                  <span>{total_phone}</span>
                </Row>
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
        data={tableData}
        isSuccess={isSuccess}
        columns={quote_receive_mth_columns}
        downloadHandler={handleDirectDownload}
        paginationHandler={setPagination}
      />
    </>
  );
};
export default ReceivedMethod;

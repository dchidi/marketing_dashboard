import React, { useMemo } from "react";
import styles from "./PetType.module.css";
import { VBar } from "../../ui/graph/BarChart";
import { Row } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import { usePetType } from "./usePetType";
import type { CardProps, ScaledDatum } from "./types";
import { TableModal } from "../../ui/table/TableModal";
import { quote_table_columns } from "../../ui/table/table_columns";
import Skeleton from "../../ui/loading/Skeleton";

const BAR_CHART_WIDTH = 80;

const PetType: React.FC<CardProps> = ({
  modal_key,
  download_url,
  api_summary_hook,
  api_data_hook,
  card_name = "",
  colors = [],
  showDataDownloadBtn = true,
}) => {
  const {
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
  } = usePetType({ modal_key, download_url, api_summary_hook, api_data_hook });

  const {
    data: tableData,
    error,
    isError,
    isSuccess,
    isFetching,
  } = dataTableQuery;

  const bars = useMemo(
    () =>
      graphData.map(({ id, height, label, name }: ScaledDatum) => {
        return (
          <VBar
            key={id}
            color={colors?.length > 0 ? `color${colors[id]}` : `color${id}`}
            height={height}
            width={BAR_CHART_WIDTH}
            value_label={label}
            text_label={name}
          />
        );
      }),

    [graphData]
  );

  return (
    <>
      <Card
        title={card_name}
        viewDataCallback={handleViewData}
        className={styles.quote}
        hasViewData={showDataDownloadBtn}
      >
        {isLoadingSummary ? (
          <Skeleton variant="dots" intervalMs={600} />
        ) : (
          <>
            <h3>
              {fmt_total}
              {/* <span className="date">[{dataWindow}]</span> */}
            </h3>
            <Row className={styles.chart}>
              {fmt_total !== "0" ? (
                bars
              ) : (
                <Row gap="10px">
                  <VBar color="#b0b0b0" height={50} width={60} />
                  <VBar color="#b0b0b0" height={250} width={60} />
                  <VBar color="#b0b0b0" height={100} width={60} />
                </Row>
              )}
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
        columns={quote_table_columns}
        downloadHandler={handleDirectDownload}
        paginationHandler={setPagination}
      />
    </>
  );
};

export default PetType;

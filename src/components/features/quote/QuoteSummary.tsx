import React, { memo, Suspense } from "react";
import styles from "./QuoteSummary.module.css";
import Card from "../../layouts/card/Card";
import { Column, Row } from "../../layouts/row_col/RowCol";

import { useQuoteOverview } from "./useQuoteOverview";

import { TableModal } from "../../ui/table/TableModal";
import { quote_data_table_columns } from "../../ui/table/table_columns";
import PetType from "../pet_type/PetType";
import {
  useQuoteByPetType,
  useQuoteByPetTypeData,
  useQuoteReceiveMethodData,
  useQuoteReceiveMethodSummary,
} from "../../../api_lib/services/quote-service";
import {
  QUOTE_PET_TYPE_DATA_URL,
  QUOTE_RECEIVED_DATA_URL,
} from "../../../api_lib/api_urls";
import QuoteConversion from "../quote_conversion/QuoteConversion";
import ReceivedMethod from "../received_method/ReceivedMethod";
import Skeleton from "../../ui/loading/Skeleton";

const AreaGraph = React.lazy(() => import("../../ui/graph/AreaGraph"));
const DataTable = React.lazy(() => import("../../ui/table/DataTable"));

const QuoteSummary: React.FC = () => {
  const {
    quotesCompleteness,
    graphData,
    currentMonthQuotes,
    liveQuote,
    lapsedQuote,

    dataWindow,
    dataTableQuery,
    setPagination,
    handleDirectDownload,
    isOpen,
    closeModal,
    handleViewData,
    hasRequested,
    isLoadingSummary,
  } = useQuoteOverview();

  const {
    data: tableData,
    error,
    isError,
    isSuccess,
    isFetching,
  } = dataTableQuery;

  const chartData = graphData ?? []; // avoid passing undefined

  return (
    <>
      <Card
        title="Quotes Summary"
        viewDataCallback={handleViewData}
        className={styles.root}
      >
        <span className="date">{dataWindow}</span>
        <Row>
          <Column className={styles.left} gap="10px">
            <Row gap="10px">
              <Card
                title="Total Quotes"
                hasViewData={false}
                className={styles.card1}
              >
                {isLoadingSummary ? (
                  <Skeleton variant="dots" intervalMs={600} />
                ) : (
                  <h3 className={styles.innerCard}>{currentMonthQuotes}</h3>
                )}
              </Card>
              <Card
                title="Quote Completeness (%)"
                hasViewData={false}
                className={styles.card2}
              >
                {isLoadingSummary ? (
                  <Skeleton variant="dots" intervalMs={600} />
                ) : (
                  <h3 className={styles.innerCard}>{quotesCompleteness}</h3>
                )}
              </Card>
            </Row>
            <Row gap="10px">
              <Card
                title="Live Quotes"
                hasViewData={false}
                className={styles.card3}
              >
                {isLoadingSummary ? (
                  <Skeleton variant="dots" intervalMs={600} />
                ) : (
                  <h3 className={styles.innerCard}>{liveQuote}</h3>
                )}
              </Card>
              <Card
                title="Lapsed Quotes"
                hasViewData={false}
                className={styles.card4}
              >
                {isLoadingSummary ? (
                  <Skeleton variant="dots" intervalMs={600} />
                ) : (
                  <h3 className={styles.innerCard}>{lapsedQuote}</h3>
                )}
              </Card>
            </Row>
          </Column>

          <Column className={styles.right} gap="5px">
            <Card
              title="LTM Quote Numbers"
              hasViewData={false}
              className={styles.areaChart}
              classNameHeader={styles.cardHeader}
            >
              <Suspense fallback={<Skeleton h={180} />}>
                <AreaGraph data={chartData} isLoading={isLoadingSummary} />
              </Suspense>
            </Card>
            <Card title="Data Table" hasViewData={false}>
              <Suspense fallback={<Skeleton h={240} />}>
                <DataTable data={chartData} isLoading={isLoadingSummary} />
              </Suspense>
            </Card>
          </Column>
        </Row>

        <Row gap="20px" className={styles.mt2}>
          <PetType
            api_data_hook={useQuoteByPetTypeData}
            api_summary_hook={useQuoteByPetType}
            download_url={QUOTE_PET_TYPE_DATA_URL}
            modal_key="quote-pet-type"
            card_name="Quotes by Pet Type"
            showDataDownloadBtn={false}
          />
          <QuoteConversion />
          <ReceivedMethod
            api_data_hook={useQuoteReceiveMethodData}
            api_summary_hook={useQuoteReceiveMethodSummary}
            download_url={QUOTE_RECEIVED_DATA_URL}
            modal_key="quote-received-method"
            card_name="Quotes by Channel"
            historical_months={13}
          />
        </Row>
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
        columns={quote_data_table_columns}
        downloadHandler={handleDirectDownload}
        paginationHandler={setPagination}
      />
    </>
  );
};

export default memo(QuoteSummary);

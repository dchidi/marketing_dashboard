import React, { memo, Suspense } from "react";
import styles from "./PolicySummary.module.css";
import Card from "../../layouts/card/Card";
import { Column, Row } from "../../layouts/row_col/RowCol";

import Skeleton from "../../ui/loading/Skeleton";
import { TableModal } from "../../ui/table/TableModal";
import { sales_columns } from "../../ui/table/table_columns";
import { usePolicyOverview } from "./usePolicyOverview";
import PetType from "../pet_type/PetType";
import {
  useQuoteByPetTypeData,
  useSalesByPetType,
  useSalesReceivedMethod,
} from "../../../api_lib/services/quote-service";
import {
  SALES_PET_TYPE_URL,
  SALES_RECEIVED_METHOD_URL,
} from "../../../api_lib/api_urls";
import ReceivedMethod from "../received_method/ReceivedMethod";
import FreePolicyConversion from "../free_policy_conversion/FreePolicyConversion";

const AreaGraph = React.lazy(() => import("../../ui/graph/AreaGraph"));
const DataTable = React.lazy(() => import("../../ui/table/DataTable"));

const PolicySummary: React.FC = () => {
  const {
    graphData,
    dataWindow,
    dataTableQuery,
    setPagination,
    handleDirectDownload,
    isOpen,
    closeModal,
    handleViewData,
    hasRequested,
    isLoadingSummary,
  } = usePolicyOverview();

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
        title="Sales Summary"
        viewDataCallback={handleViewData}
        className={styles.root}
      >
        <span className="date">{dataWindow}</span>
        <Column className={styles.mt2}>
          <Column gap="10px">
            <Card
              title="LTM Sales Numbers"
              hasViewData={false}
              className={styles.areaChart}
              classNameHeader={styles.cardHeader}
            >
              <Suspense fallback={<Skeleton h={180} />}>
                <AreaGraph
                  data={chartData}
                  isLoading={isLoadingSummary}
                  colorPalette={["#00c49f"]}
                />
              </Suspense>
            </Card>
            <Card title="Data Table" hasViewData={false} className={styles.mt1}>
              <Suspense fallback={<Skeleton h={240} />}>
                <DataTable data={chartData} isLoading={isLoadingSummary} />
              </Suspense>
            </Card>
          </Column>
          <Row gap="20px" className={styles.mt2}>
            <ReceivedMethod
              api_data_hook={useQuoteByPetTypeData}
              api_summary_hook={useSalesReceivedMethod}
              download_url={SALES_RECEIVED_METHOD_URL}
              modal_key="sales-received-method"
              card_name="Sales by Channel"
              historical_months={13}
              showDataDownloadBtn={false}
            />
            <PetType
              api_data_hook={useQuoteByPetTypeData}
              api_summary_hook={useSalesByPetType}
              download_url={SALES_PET_TYPE_URL}
              modal_key="sales-pet-type"
              card_name="Sales by Pet Type"
              showDataDownloadBtn={false}
            />
            <FreePolicyConversion />
          </Row>
        </Column>
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
        columns={sales_columns}
        downloadHandler={handleDirectDownload}
        paginationHandler={setPagination}
      />
    </>
  );
};

export default memo(PolicySummary);

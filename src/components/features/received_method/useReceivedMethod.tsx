import { useMemo, useState } from "react";
import {
  formatPeriod,
  start_of_month,
  current_date,
} from "../../../util/date_util";

import { openDownloadGET } from "../../../util/download";
import { formatTotal } from "../../../util/number_util";
import { BASE_URL } from "../../../api_lib/api_urls";
import { useFilterCtx } from "../../../context/FilterContext";
import type { useReceivedMethodProps } from "./types";
import type { CardProps } from "../pet_type/types";

export const useReceiveMethod = ({
  modal_key,
  download_url,
  api_summary_hook,
  api_data_hook,
  historical_months = 7,
}: CardProps): useReceivedMethodProps | any => {
  const [hasRequested, setHasRequested] = useState(false);

  const {
    store,
    openModal,
    closeModal,
    isModalOpen,
    pagination,
    setPagination,
  } = useFilterCtx();

  const isOpen = isModalOpen(modal_key);

  const baseParams = useMemo(
    () => ({
      start_date: store?.start_date || start_of_month,
      end_date: store?.end_date || current_date,
      country_codes: store?.country || "all",
      brands: store?.brand || "all",
      pet_types: store?.pet_type || "all",
      historical_months,
    }),

    [
      store?.start_date,
      store?.end_date,
      store?.country,
      store?.brand,
      store?.pet_type,
    ]
  );

  const handleDirectDownload = () => {
    openDownloadGET(BASE_URL + download_url, {
      ...baseParams,
      download: true,
    });
  };

  const handleViewData = () => {
    if (isOpen) {
      closeModal();
      return;
    }
    setHasRequested(true);
    openModal(modal_key);
  };

  const handleCloseModal = () => {
    if (isOpen) {
      closeModal();
    }
  };

  const rmth_response = api_summary_hook(baseParams);
  const isLoadingSummary = rmth_response.isLoading || rmth_response.isFetching;
  const isSuccessSummary = rmth_response.isSuccess;
  const errorSummary = rmth_response.error;

  const { meta, chart, current_period_total } = rmth_response?.data || {};

  const dataWindow = useMemo(
    () =>
      meta
        ? formatPeriod({
            start_date: meta.start_date,
            end_date: meta.end_date,
          })
        : "",
    [meta]
  );

  const { web, phone } = current_period_total ?? { web: 0, phone: 0 };

  const fmt_total = useMemo(() => formatTotal(web + phone), [web, phone]);
  const total_web = formatTotal(web, 2);
  const total_phone = formatTotal(phone, 2);

  const quoteDataParams = useMemo(
    () => ({
      ...baseParams,
      limit: pagination.limit,
      skip: pagination.skip,
    }),
    [baseParams, pagination?.limit, pagination?.skip]
  );

  const dataTableQuery = api_data_hook(
    quoteDataParams,
    {
      // delay enabled until user request
      enabled: hasRequested && isOpen, //When enabled === true, changing pagination -> new key -> auto-refetch
      retry: 0,
      refetchOnWindowFocus: false,
    },
    { timeout: 0 }
  );

  return {
    fmt_total,
    total_web,
    current_period_total,
    total_phone,
    graphData: Array.isArray(chart) ? chart : [],
    dataWindow,
    dataTableQuery,
    isLoadingSummary,
    isSuccessSummary,
    errorSummary,
    hasRequested,
    isOpen,
    closeModal: handleCloseModal,
    setPagination,
    handleViewData,
    handleDirectDownload,
  };
};

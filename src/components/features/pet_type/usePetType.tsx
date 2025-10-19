import { useMemo, useState } from "react";

import type {
  usePetTypeProps,
  ResProps,
  ScaledDatum,
  CardProps,
} from "./types";

import {
  formatPeriod,
  start_of_month,
  current_date,
} from "../../../util/date_util";

import { openDownloadGET } from "../../../util/download";
import { formatTotal } from "../../../util/number_util";
import { BASE_URL } from "../../../api_lib/api_urls";
import { BAR_CHART_MAX_HEIGHT } from "../../../constants";
import { useFilterCtx } from "../../../context/FilterContext";

export const usePetType = ({
  modal_key,
  download_url,
  api_summary_hook,
  api_data_hook,
}: CardProps): usePetTypeProps => {
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

  const api_summary_res = api_summary_hook(baseParams);
  const isLoadingSummary = api_summary_res.isLoading || api_summary_res.isFetching;
  const isSuccessSummary = api_summary_res.isSuccess;
  const errorSummary = api_summary_res.error;

  const { meta, summary, total } = api_summary_res?.data || {};

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

  const fmt_total = useMemo(() => formatTotal(total), [total]);

  const rawData: ResProps[] = summary ?? [];

  const graphData: ScaledDatum[] = useMemo(() => {
    if (rawData.length === 0) return [];
    const maxValue = Math.max(...rawData.map((d) => d.value));
    return rawData.map((item, idx) => ({
      ...item,
      id: idx,
      height: maxValue > 0 ? (item.value / maxValue) * BAR_CHART_MAX_HEIGHT : 0,
      label: formatTotal(item.value),
    }));
  }, [rawData]);

  const dataParams = useMemo(
    () => ({
      ...baseParams,
      limit: pagination.limit,
      skip: pagination.skip,
    }),
    [baseParams, pagination?.limit, pagination?.skip]
  );

  // defer endpoint call with the extra configs until an event is triggered.

  const dataTableQuery = api_data_hook(
    dataParams,
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
    graphData,
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

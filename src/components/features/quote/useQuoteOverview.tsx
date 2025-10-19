import { useMemo, useState } from "react";

import type { useQuoteProps } from "./types";

import {
  useQuoteData,
  useQuoteSummary,
} from "../../../api_lib/services/quote-service";

import {
  formatPeriod,
  start_of_month,
  current_date,
} from "../../../util/date_util";

import { openDownloadGET } from "../../../util/download";
import { formatTotal } from "../../../util/number_util";
import { BASE_URL, QUOTE_DATA_URL } from "../../../api_lib/api_urls";
import { useFilterCtx } from "../../../context/FilterContext";

const QUOTE_MODAL_KEY = "quote-summary";

export const useQuoteOverview = (): useQuoteProps | any => {
  const [hasRequested, setHasRequested] = useState(false);

  const {
    store,
    openModal,
    closeModal,
    isModalOpen,
    pagination,
    setPagination,
  } = useFilterCtx();

  const isOpen = isModalOpen(QUOTE_MODAL_KEY);

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
    openDownloadGET(BASE_URL + QUOTE_DATA_URL, {
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
    openModal(QUOTE_MODAL_KEY);
  };

  const handleCloseModal = () => {
    if (isOpen) {
      closeModal();
    }
  };

  const quoteSummary = useQuoteSummary(baseParams);
  const isLoadingSummary = quoteSummary.isLoading || quoteSummary.isFetching;
  const isSuccessSummary = quoteSummary.isSuccess;
  const errorSummary = quoteSummary.error;

  const {
    meta,
    currentPeriodTotalQuotes,
    lastPeriodTotalQuotes,
    liveQuotes,
    lapsedQuotes,
    // incompleteQuoteDetails,
    quotesCompleteness,
    graphData,
  } = quoteSummary?.data || {};

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

  const currentMonthQuotes = useMemo(
    () => formatTotal(currentPeriodTotalQuotes),
    [currentPeriodTotalQuotes]
  );
  const lastMonthQuotes = useMemo(
    () => formatTotal(lastPeriodTotalQuotes),
    [lastPeriodTotalQuotes]
  );
  const liveQuote = useMemo(() => formatTotal(liveQuotes), [liveQuotes]);

  const lapsedQuote = useMemo(() => formatTotal(lapsedQuotes), [lapsedQuotes]);

  const quoteDataParams = useMemo(
    () => ({
      ...baseParams,
      limit: pagination.limit,
      skip: pagination.skip,
      // quoteStatus: "All",
    }),
    [baseParams, pagination?.limit, pagination?.skip]
  );

  // defer endpoint call with the extra configs until an event is triggered.

  const dataTableQuery = useQuoteData(
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
    quotesCompleteness,
    graphData,
    currentMonthQuotes,
    lastMonthQuotes,
    liveQuote,
    lapsedQuote,
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

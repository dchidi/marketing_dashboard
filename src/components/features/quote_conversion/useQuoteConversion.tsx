import { useMemo, useState } from "react";
import type { useQuoteProps, quoteGraphProps } from "./types";
import {
  useQuoteConversionSummary,
  useQuoteConversionData,
} from "../../../api_lib/services/quote-service";
import {
  formatPeriod,
  start_of_month,
  current_date,
} from "../../../util/date_util";
import { openDownloadGET } from "../../../util/download";
import { BASE_URL, QUOTE_CONVERSION_DATA_URL } from "../../../api_lib/api_urls";
import { useFilterCtx } from "../../../context/FilterContext";

const QUOTE_CONVERSION_MODAL_KEY = "quote-conversion";

export const useQuoteConversion = (): useQuoteProps | any => {
  const [hasRequested, setHasRequested] = useState(false);
  const {
    store,
    openModal,
    closeModal,
    isModalOpen,
    pagination,
    setPagination,
  } = useFilterCtx();

  const isOpen = isModalOpen(QUOTE_CONVERSION_MODAL_KEY);

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
    openDownloadGET(BASE_URL + QUOTE_CONVERSION_DATA_URL, {
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
    openModal(QUOTE_CONVERSION_MODAL_KEY);
  };

  const handleCloseModal = () => {
    if (isOpen) {
      closeModal();
    }
  };

  const quoteConversionSummary = useQuoteConversionSummary(baseParams);

  const isLoadingSummary =
    quoteConversionSummary.isLoading || quoteConversionSummary.isFetching;
  const isSuccessSummary = quoteConversionSummary.isSuccess;
  const errorSummary = quoteConversionSummary.error;
  const { meta, total_quotes, converted, conversion_percent, not_converted } =
    quoteConversionSummary?.data || {};

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

  const graphData: quoteGraphProps[] = [
    { id: 1, name: "Not Converted", value: not_converted },
    { id: 2, name: "Converted", value: converted },
  ];

  const totalConversion = conversion_percent ? `${conversion_percent}%` : "0";

  // Data table

  const convertedDataParams = useMemo(
    () => ({
      ...baseParams,
      limit: pagination.limit,
      skip: pagination.skip,
      // quoteStatus: "All",
    }),
    [baseParams, pagination?.limit, pagination?.skip]
  );

  // defer endpoint call with the extra configs until an event is triggered.
  const dataTableQuery = useQuoteConversionData(
    convertedDataParams,
    {
      // delay enabled until user request
      enabled: hasRequested && isOpen, //When enabled === true, changing pagination -> new key -> auto-refetch
      retry: 0,
      refetchOnWindowFocus: false,
    },
    { timeout: 0 }
  );

  return {
    totalConversion,
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

import { useMemo, useState } from "react";
import {
  useFreePolicy,
  useFreePolicyData,
} from "../../../api_lib/services/quote-service";
import {
  formatPeriod,
  start_of_month,
  current_date,
} from "../../../util/date_util";
import { openDownloadGET } from "../../../util/download";
import { BASE_URL, FREE_POLICY_DATA_URL } from "../../../api_lib/api_urls";
import { useFilterCtx } from "../../../context/FilterContext";
import type { useQuoteProps } from "./types";
import { formatTotal } from "../../../util/number_util";

const FP_CONVERSION_MODAL_KEY = "FP-conversion";

export const useFreePolicyConversion = (): useQuoteProps | any => {
  const [hasRequested, setHasRequested] = useState(false);
  const {
    store,
    openModal,
    closeModal,
    isModalOpen,
    pagination,
    setPagination,
  } = useFilterCtx();

  const isOpen = isModalOpen(FP_CONVERSION_MODAL_KEY);

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
    openDownloadGET(BASE_URL + FREE_POLICY_DATA_URL, {
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
    openModal(FP_CONVERSION_MODAL_KEY);
  };

  const handleCloseModal = () => {
    if (isOpen) {
      closeModal();
    }
  };

  const fpConversion = useFreePolicy(baseParams);

  const isLoadingSummary = fpConversion.isLoading || fpConversion.isFetching;
  const isSuccessSummary = fpConversion.isSuccess;
  const errorSummary = fpConversion.error;
  const { meta, by_status, by_pet_type, by_channel, total } =
    fpConversion?.data || {};

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
  const dataTableQuery = useFreePolicyData(
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
    closeModal: handleCloseModal,
    setPagination,
    handleViewData,
    handleDirectDownload,
  };
};

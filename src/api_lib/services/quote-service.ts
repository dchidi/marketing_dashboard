import { createEndpoints } from "../lib/api/crud-factory";
import {
  BASE_URL,
  QUOTE_CONVERSION_DATA_URL,
  QUOTE_CONVERSION_URL,
  QUOTE_RECEIVED_DATA_URL,
  QUOTE_RECEIVED_URL,
  POLICY_DATA_URL,
  POLICY_SUMMARY_URL,
  QUOTE_PET_TYPE_URL,
  QUOTE_PET_TYPE_DATA_URL,
  QUOTE_SUMMARY_URL,
  QUOTE_DATA_URL,
  SALES_SUMMARY_URL,
  SALES_PET_TYPE_URL,
  SALES_RECEIVED_METHOD_URL,
  FREE_POLICY_URL,
  SALES_DATA_URL,
  FREE_POLICY_DATA_URL,
} from "../api_urls";

// Using your factory as-is (single TReturn = any)
const { service: quoteService, hooks } = createEndpoints(BASE_URL, "quote", {
  QuoteSummary: { method: "GET", path: QUOTE_SUMMARY_URL },
  quoteData: { method: "GET", path: QUOTE_DATA_URL },

  QuoteByPetType: { method: "GET", path: QUOTE_PET_TYPE_URL },
  quoteByPetTypeData: { method: "GET", path: QUOTE_PET_TYPE_DATA_URL },

  quoteConversionSummary: {
    method: "GET",
    path: QUOTE_CONVERSION_URL,
  },
  quoteConversionData: { method: "GET", path: QUOTE_CONVERSION_DATA_URL },

  quoteReceiveMethodSummary: {
    method: "GET",
    path: QUOTE_RECEIVED_URL,
  },
  quoteReceiveMethodData: { method: "GET", path: QUOTE_RECEIVED_DATA_URL },

  policySummary: { method: "GET", path: POLICY_SUMMARY_URL },
  policyData: { method: "GET", path: POLICY_DATA_URL },

  salesSummary: { method: "GET", path: SALES_SUMMARY_URL },
  salesByPetType: { method: "GET", path: SALES_PET_TYPE_URL },
  salesReceivedMethod: { method: "GET", path: SALES_RECEIVED_METHOD_URL },
  freePolicy: { method: "GET", path: FREE_POLICY_URL },

  salesData: { method: "GET", path: SALES_DATA_URL },
  freePolicyData: { method: "GET", path: FREE_POLICY_DATA_URL },
});

// Export plain service (useful for SSR prefetch, tests, non-React usage)
export { quoteService };

// Export generated GET hooks
export const {
  useQuoteSummary,
  useQuoteData,
  useQuoteByPetType,
  useQuoteByPetTypeData,
  useQuoteConversionSummary,
  useQuoteConversionData,
  useQuoteReceiveMethodSummary,
  useQuoteReceiveMethodData,
  usePolicyData,
  usePolicySummary,
  useSalesByPetType,
  useSalesReceivedMethod,
  useSalesSummary,
  useFreePolicy,
  useSalesData,
  useFreePolicyData,
} = hooks;

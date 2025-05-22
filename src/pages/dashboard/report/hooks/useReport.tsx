import React, { useReducer } from "react";
import type { ModalAction, ModalKey, ReportMenuItem } from "../types";
const QuoteReport = React.lazy(() => import("../reporting_tables/QuoteReport"));
const QuoteConversionReport = React.lazy(
  () => import("../reporting_tables/QuoteConversionReport")
);
const LapsedQuoteReport = React.lazy(
  () => import("../reporting_tables/LapsedQuoteReport")
);
const ActivePolicyReport = React.lazy(
  () => import("../reporting_tables/ActivePolicyReport")
);
const FreePolicyReport = React.lazy(
  () => import("../reporting_tables/FreePolicyReport")
);
const FreePolicyConversionReport = React.lazy(
  () => import("../reporting_tables/FreePolicyConversionReport")
);
const CancelledPolicyReport = React.lazy(
  () => import("../reporting_tables/CancelledPolicyReport")
);
const ExpiredPolicyReport = React.lazy(
  () => import("../reporting_tables/ExpiredPolicyReport")
);
const RenewalsReport = React.lazy(
  () => import("../reporting_tables/RenewalsReport")
);
const BirthdaysReport = React.lazy(
  () => import("../reporting_tables/BirthdaysReport")
);

const useReport = () => {
  const reportModalHandler = (
    state: ModalKey | null,
    action: ModalAction
  ): ModalKey | null => {
    switch (action.type) {
      case "OPEN":
        // call api for the required tableData
        console.log(action.payload);
        return action.payload;
      case "CLOSE":
        return null;
      default:
        return state;
    }
  };

  // const tableData: any = []; //move this into the state
  const [activeModal, dispatch] = useReducer(reportModalHandler, null);

  const open = (modal: ModalKey) => {
    dispatch({ type: "OPEN", payload: modal });
  };

  const close = () => dispatch({ type: "CLOSE" });

  const reportMenu: ReportMenuItem[] = [
    { id: 1, modal: "quote", labels: ["Quote"], Component: QuoteReport },
    {
      id: 2,
      modal: "quote_conversion",
      labels: ["Quote", "Conversion"],
      Component: QuoteConversionReport,
    },
    {
      id: 3,
      modal: "lapsed_quote",
      labels: ["Lapsed", "Quote"],
      Component: LapsedQuoteReport,
    },
    {
      id: 4,
      modal: "active_policy",
      labels: ["Active", "Policy"],
      Component: ActivePolicyReport,
    },
    {
      id: 5,
      modal: "free_policy",
      labels: ["Free", "Policy"],
      Component: FreePolicyReport,
    },
    {
      id: 6,
      modal: "free_policy_conversion",
      labels: ["Fee Policy", "Conversion"],
      Component: FreePolicyConversionReport,
    },
    {
      id: 7,
      modal: "cancelled_policy",
      labels: ["Cancelled", "Policy"],
      Component: CancelledPolicyReport,
    },
    {
      id: 8,
      modal: "expired_policy",
      labels: ["Expired", "Policy"],
      Component: ExpiredPolicyReport,
    },
    {
      id: 9,
      modal: "renewals",
      labels: ["Renewals"],
      Component: RenewalsReport,
    },
    {
      id: 10,
      modal: "birthdays",
      labels: ["Birthdays"],
      Component: BirthdaysReport,
    },
  ];
  return { activeModal, open, close, reportMenu };
};
export default useReport;

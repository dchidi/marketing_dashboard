import { useCallback, useReducer } from "react";
import type { ModalAction, ModalKey, ReportMenuItem } from "../types";
import {
  QuoteReport,
  QuoteConversionReport,
  LapsedQuoteReport,
  ActivePolicyReport,
  FreePolicyReport,
  FreePolicyConversionReport,
  CancelledPolicyReport,
  ExpiredPolicyReport,
  RenewalsReport,
  BirthdaysReport,
} from "./lazyloading";

const useReport = () => {
  const reportModalHandler = (
    state: ModalKey | null,
    action: ModalAction
  ): ModalKey | null => {
    switch (action.type) {
      case "OPEN":
        return action.payload;
      case "CLOSE":
        return null;
      default:
        return state;
    }
  };

  const [activeModal, dispatch] = useReducer(reportModalHandler, null);

  const open = useCallback((modal: ModalKey) => {
    dispatch({ type: "OPEN", payload: modal });
    // call api for the required tableData and load it into a global state
    console.log(modal);
  }, []);

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

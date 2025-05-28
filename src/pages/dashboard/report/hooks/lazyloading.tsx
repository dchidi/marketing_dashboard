import React from "react";

export const QuoteReport = React.lazy(
  () => import("../reporting_tables/QuoteReport")
);
export const QuoteConversionReport = React.lazy(
  () => import("../reporting_tables/QuoteConversionReport")
);
export const LapsedQuoteReport = React.lazy(
  () => import("../reporting_tables/LapsedQuoteReport")
);
export const ActivePolicyReport = React.lazy(
  () => import("../reporting_tables/ActivePolicyReport")
);
export const FreePolicyReport = React.lazy(
  () => import("../reporting_tables/FreePolicyReport")
);
export const FreePolicyConversionReport = React.lazy(
  () => import("../reporting_tables/FreePolicyConversionReport")
);
export const CancelledPolicyReport = React.lazy(
  () => import("../reporting_tables/CancelledPolicyReport")
);
export const ExpiredPolicyReport = React.lazy(
  () => import("../reporting_tables/ExpiredPolicyReport")
);
export const RenewalsReport = React.lazy(
  () => import("../reporting_tables/RenewalsReport")
);
export const BirthdaysReport = React.lazy(
  () => import("../reporting_tables/BirthdaysReport")
);

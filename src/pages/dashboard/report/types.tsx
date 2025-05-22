import type { ColumnDef } from "@tanstack/react-table";
import type { QuoteProps } from "../../../components/features/quote/types";

export type ModalKey =
  | "quote"
  | "quote_conversion"
  | "lapsed_quote"
  | "active_policy"
  | "free_policy"
  | "free_policy_conversion"
  | "cancelled_policy"
  | "expired_policy"
  | "renewals"
  | "birthdays";

export type ModalAction =
  | { type: "OPEN"; payload: ModalKey }
  | { type: "CLOSE" };

export type ReportMenuItem = {
  id: number;
  modal: ModalKey;
  labels: string[];
  Component: React.LazyExoticComponent<React.FC>;
};

export interface QuoteReportProps {
  quoteTableData: QuoteProps[];
  columns: ColumnDef<QuoteProps>[];
}

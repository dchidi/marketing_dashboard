import type { ColumnDef } from "@tanstack/react-table";

export interface QuoteProps {
  id: number;
  country: string;
  brand: string;
  quote_number: string;
  quote_status: string;
  quote_start_date: string;
  quote_end_date: string;
  client_name: string;
  email: string;
  phone_number: string;
  pet_name: string;
  pet_type: string;
  pet_breed: string;
  pet_dob: number;
}
export type quoteGraphProps = {
  id: number;
  width: number;
  value: string;
  text: string;
};
export interface useQuoteProps {
  quoteTableData: QuoteProps[];
  columns: ColumnDef<QuoteProps>[];
  quoteData: quoteGraphProps[];
  totalQuotes: string;
}

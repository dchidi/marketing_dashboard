import type { ColumnDef } from "@tanstack/react-table";

export interface QuoteProps {
  id: number;
  Country: string;
  Brand: string;
  QuoteNumber: string;
  QuoteStatus: string;
  QuoteStartDate: string;
  QuoteStartEnd: string;
  ClientName: string;
  Email: string;
  ContactNumber: string;
  PetName: string;
  PetType: string;
  BreedName: string;
  PetBirthDate: number;
}

export type ResProps = {
  value: number;
  name: string;
};

export type ScaledDatum = ResProps & {
  id: number;
  height: number;
  label: string;
};

export interface useQuoteProps {
  quoteTableData: QuoteProps[];
  columns: ColumnDef<QuoteProps>[];
  quoteData: Partial<ScaledDatum[]>;
  totalQuotes: string;
  live: any;
}

export type storeProps = {
  start_date: string;
  end_date: string;
  country: string;
  limit?: string;
  skip?: string;
} | null;

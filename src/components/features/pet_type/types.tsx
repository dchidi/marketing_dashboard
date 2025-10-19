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

export type storeProps = {
  start_date: string;
  end_date: string;
  country: string;
  limit?: string;
  skip?: string;
} | null;

export interface usePetTypeProps {
  // quoteTableData: QuoteProps[];
  // columns: ColumnDef<QuoteProps>[];
  // quoteData: Partial<ScaledDatum[]>;
  // totalQuotes: string;
  // live: any;

  fmt_total: string;
  graphData: any;
  dataWindow: any;
  dataTableQuery: any;
  isLoadingSummary: any;
  isSuccessSummary: any;
  errorSummary: any;
  hasRequested: any;
  isOpen: any;
  closeModal: any;
  setPagination: any;
  handleViewData: any;
  handleDirectDownload: any;
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
export type CardProps = {
  modal_key: string;
  download_url: string;
  api_summary_hook: any;
  api_data_hook: any;
  card_name?: string;
  colors?: number[];
  historical_months?: number;
  showDataDownloadBtn?: boolean;
};

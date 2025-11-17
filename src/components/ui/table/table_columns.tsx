import type { ColumnDef } from "@tanstack/react-table";
// import type { QuoteProps } from "../../features/quote/types";
import { formatDateColumn } from "../../../util/date_util";

export const policy_table_columns: ColumnDef<any>[] = [
  {
    accessorKey: "Country",
    header: "Country",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Brand",
    header: "Brand",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteNumber",
    header: "Quote No.",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteStatus",
    header: "Quote Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteStartDate",
    header: "Quote Start Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "QuoteEndDate",
    header: "Quote End Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "PolicyNumber",
    header: "Policy No.",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "OriginalPolicyStartDate",
    header: "Policy Start Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "PolicyEndDate",
    header: "Policy End Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "ClientName",
    header: "Client Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ContactNo",
    header: "Phone",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetName",
    header: "Pet Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetType",
    header: "Pet Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "BreedName",
    header: "Pet Breed",
    cell: (info) => info.getValue(),
  },

  {
    accessorKey: "PetBirthDate",
    header: "Pet DOB",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  // If date sorting is wrong then use the below implementation
  // {
  //   accessorKey: "hireDate",
  //   header: "Hire Date",
  //   cell: (info) => info.getValue<string>(),
  //   sortingFn: (rowA, rowB, columnId) => {
  //     const dateA = new Date(rowA.getValue(columnId));
  //     const dateB = new Date(rowB.getValue(columnId));
  //     return dateA.getTime() - dateB.getTime();
  //   },
  // },
  // {
  //   accessorKey: "salary" as const,
  //   header: "Salary",
  //   cell: (info) => `$${info.getValue<number>().toLocaleString()}`,
  // },
  // {
  //   accessorKey: "isActive",
  //   header: "Status",
  //   cell: (info) => (info.getValue() ? "Active" : "Inactive"),
  // },
];

export const quote_data_table_columns: ColumnDef<any>[] = [
  {
    accessorKey: "CountryName",
    header: "Country",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Brand",
    header: "Brand",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteNumber",
    header: "Quote Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteStatus",
    header: "Quote Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ConvertedQuote",
    header: "Quote Converted",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteDetailsCompleted",
    header: "Complete Details",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteReceivedMethod",
    header: "Receive Method",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteStartDate",
    header: "Start Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "QuoteExpiryDate",
    header: "Expiry Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "FullName",
    header: "Client Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ContactNo",
    header: "Phone Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetName",
    header: "Pet Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetType",
    header: "Pet Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "BreedName",
    header: "Pet Breed",
    cell: (info) => info.getValue(),
  },

  {
    accessorKey: "PetBirthDate",
    header: "Pet DOB",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
];

export const quote_table_columns: ColumnDef<any>[] = [
  {
    accessorKey: "CountryName",
    header: "Country",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Brand",
    header: "Brand",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteNumber",
    header: "Quote Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteStatus",
    header: "Quote Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ConvertedQuote",
    header: "Quote Converted",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteReceivedMethod",
    header: "Receive Method",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteStartDate",
    header: "Start Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "QuoteExpiryDate",
    header: "Expiry Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "FullName",
    header: "Client Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ContactNo",
    header: "Phone Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetName",
    header: "Pet Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetType",
    header: "Pet Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "BreedName",
    header: "Pet Breed",
    cell: (info) => info.getValue(),
  },

  {
    accessorKey: "PetBirthDate",
    header: "Pet DOB",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  // If date sorting is wrong then use the below implementation
  // {
  //   accessorKey: "hireDate",
  //   header: "Hire Date",
  //   cell: (info) => info.getValue<string>(),
  //   sortingFn: (rowA, rowB, columnId) => {
  //     const dateA = new Date(rowA.getValue(columnId));
  //     const dateB = new Date(rowB.getValue(columnId));
  //     return dateA.getTime() - dateB.getTime();
  //   },
  // },
  // {
  //   accessorKey: "salary" as const,
  //   header: "Salary",
  //   cell: (info) => `$${info.getValue<number>().toLocaleString()}`,
  // },
  // {
  //   accessorKey: "isActive",
  //   header: "Status",
  //   cell: (info) => (info.getValue() ? "Active" : "Inactive"),
  // },
];

export const conversion_table_columns: ColumnDef<any>[] = [
  {
    accessorKey: "CountryName",
    header: "Country Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Brand",
    header: "Brand",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteNumber",
    header: "Quote Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteStatus",
    header: "Quote Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteReceivedMethod",
    header: "Received Method",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "CreatedDate",
    header: "Quote Created Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "QuoteStartDate",
    header: "Quote Start Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "QuoteExpiryDate",
    header: "Quote Expiry Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "BreedName",
    header: "Breed Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ConvertedQuote",
    header: "Quote Converted",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PolicyNumber",
    header: "Policy Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PolicyStartDate",
    header: "Policy Start Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "PolicyEndDate",
    header: "Policy End Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "FullName",
    header: "Client Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ContactNo",
    header: "Phone Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetName",
    header: "Pet Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetType",
    header: "Pet Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetBirthDate",
    header: "Pet DOB",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
];

export const quote_receive_mth_columns: ColumnDef<any>[] = [
  {
    accessorKey: "CountryName",
    header: "Country Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Brand",
    header: "Brand",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteNumber",
    header: "Quote Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteStatus",
    header: "Quote Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteReceivedMethod",
    header: "Received Method",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "CreatedDate",
    header: "Quote Created Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "QuoteStartDate",
    header: "Quote Start Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "QuoteExpiryDate",
    header: "Quote Expiry Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "BreedName",
    header: "Breed Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ConvertedQuote",
    header: "Quote Converted",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PolicyNumber",
    header: "Policy Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PolicyStartDate",
    header: "Policy Start Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "PolicyEndDate",
    header: "Policy End Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "FullName",
    header: "Client Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ContactNo",
    header: "Phone Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetName",
    header: "Pet Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetType",
    header: "Pet Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetBirthDate",
    header: "Pet DOB",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
];

export const sales_columns: ColumnDef<any>[] = [
  {
    accessorKey: "CountryName",
    header: "Country Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PolicyNumber",
    header: "Policy Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "CreatedDate",
    header: "Policy Created Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "ActualStartDate",
    header: "Policy Start Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "ProductName",
    header: "Product Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetType",
    header: "Pet Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ClientName",
    header: "Client Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetName",
    header: "Pet Name",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "Brand",
    header: "Brand",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteNumber",
    header: "Quote Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "QuoteCreatedDate",
    header: "Quote CreatedDate",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "SaleMethod",
    header: "Receive Method",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
];

export const fp_columns: ColumnDef<any>[] = [
  {
    accessorKey: "CountryName",
    header: "Country Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "CreatedDate",
    header: "Created Date",
    cell: (info) => {
      const value = info.getValue();
      return formatDateColumn(value);
    },
  },
  {
    accessorKey: "QuoteNumber",
    header: "Quote Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PolicyNumber",
    header: "Policy Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "SubAgentName",
    header: "Agent Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "AgentCategory",
    header: "Agent Category",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PetType",
    header: "Pet Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ProductName",
    header: "Product Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Brand",
    header: "Brand",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "SaleMethod",
    header: "Receive Method",
    cell: (info) => info.getValue(),
  },
];

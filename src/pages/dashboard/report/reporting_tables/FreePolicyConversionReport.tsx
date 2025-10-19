import { useQuote } from "../../../../components/features/quote/useQuoteByPetType";
import Table from "../../../../components/ui/table/Table";

const FreePolicyConversionReport = () => {
  const { quoteTableData, columns } = useQuote();
  return (
    <Table
      columns={columns}
      data={quoteTableData}
      enableSorting={true}
      enableFiltering={true}
    />
  );
};
export default FreePolicyConversionReport;

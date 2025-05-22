import { useQuote } from "../../../../components/features/quote/useQuote";
import Table from "../../../../components/ui/table/Table";

const CancelledPolicyReport = () => {
  const { quoteTableData, columns, quoteData, totalQuotes } = useQuote();
  return (
    <Table
      columns={columns}
      data={quoteTableData}
      enableSorting={true}
      enableFiltering={true}
    />
  );
};
export default CancelledPolicyReport;

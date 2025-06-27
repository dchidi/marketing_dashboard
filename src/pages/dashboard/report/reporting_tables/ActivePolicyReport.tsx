import { useQuote } from "../../../../components/features/quote/useQuote";
import Table from "../../../../components/ui/table/Table";

const ActivePolicyReport = () => {
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
export default ActivePolicyReport;

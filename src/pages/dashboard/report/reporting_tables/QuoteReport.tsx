import Table from "../../../../components/ui/table/Table";
import { useQuoteReport } from "../hooks/useQuoteReport";
import { Column } from "../../../../components/layouts/row_col/RowCol";
import Filters from "../../../../components/features/filters/Filters";

const QuoteReport: React.FC = () => {
  const { tableData, columns } = useQuoteReport();

  return (
    <Column>
      <Filters />
      <Table
        columns={columns}
        data={tableData}
        enableSorting={true}
        enableFiltering={true}
        tableTitle="Quote table"
        downloadFileName="QuoteTable_"
      />
    </Column>
  );
};
export default QuoteReport;

import React, { useMemo } from "react";
import styles from "./QuoteConversion.module.css";
import { VBar } from "../../ui/graph/BarChart";
import { Row } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import Modal from "../../layouts/modal/Modal";
import { useQuoteConversion } from "./useQuoteConversion";
import Table from "../../ui/table/Table";
import { useModal } from "../../../hooks/useModal";
import { PieChart } from "../../ui/graph/PieChart";

const QuoteConversion: React.FC = () => {
  const { isOpen, toggleModal } = useModal();
  const { quoteTableData, columns, quoteData, totalQuotes } =
    useQuoteConversion();

  return (
    <>
      <Card
        title="Quote Conversion"
        viewDataCallback={toggleModal}
        className={styles.root}
      >
        <h3>
          {totalQuotes} <span className="date">[May 2025]</span>
        </h3>
        <Row className={styles.chart}>
          {" "}
          <div style={{ width: "300px", height: 250 }}>
            <PieChart
              data={quoteData}
              colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
              // innerRadius="0"
              outerRadius="100%"
              label={true}
              tooltip={false}
              legend={true}
            />
          </div>
        </Row>
      </Card>
      <Modal isOpen={isOpen} onClose={toggleModal} allowKeyCloseEvent={false}>
        {/* TODO:: Ensure table data is only loaded when user click on the data icon to 
        improve load time. Leave the logic as it is for now until you start to 
        implement api calls */}
        <Table
          columns={columns}
          data={quoteTableData}
          enableSorting={true}
          enableFiltering={true}
        />
      </Modal>
    </>
  );
};
export default QuoteConversion;

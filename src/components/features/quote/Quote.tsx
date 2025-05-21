import React, { useMemo } from "react";
import styles from "./Quote.module.css";
import { VBar } from "../../ui/graph/BarChart";
import { Row } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import Modal from "../../layouts/modal/Modal";
import { useQuote } from "./useQuote";
import Table from "../../ui/table/Table";
import { useModal } from "../../../hooks/useModal";

const Quote: React.FC = () => {
  const width = 80;
  const { isOpen, toggleModal } = useModal();
  const { quoteTableData, columns, quoteData, totalQuotes } = useQuote();

  const bars = useMemo(
    () =>
      quoteData.map(({ id, height, value, text }) => (
        <VBar
          color={`color${id}`}
          height={height}
          width={width}
          value_label={value}
          text_label={text}
          key={id}
        />
      )),
    [quoteData, width]
  );

  return (
    <>
      <Card
        title="Quote"
        viewDataCallback={toggleModal}
        className={styles.quote}
      >
        <h3>
          {totalQuotes} <span className="date">[May 2025]</span>
        </h3>
        <Row className={styles.chart}>{bars}</Row>
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
export default Quote;

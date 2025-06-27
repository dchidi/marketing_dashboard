import React, { useMemo } from "react";
import styles from "./FreePolicyConversion.module.css";
import { HBar } from "../../ui/graph/BarChart";
import { Column } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import Modal from "../../layouts/modal/Modal";
import { useFreePolicyConversion } from "./useFreePolicyConversion";
import Table from "../../ui/table/Table";
import { useModal } from "../../../hooks/useModal";

const FreePolicyConversion: React.FC = () => {
  const height = 20;
  const { isOpen, toggleModal } = useModal();
  const { quoteTableData, columns, quoteData, totalQuotes } =
    useFreePolicyConversion();

  const bars = useMemo(
    () =>
      quoteData.map(({ id, width, value, text }) => (
        <HBar
          color={`color${id}`}
          height={height}
          width={width}
          value_label={value}
          text_label={text}
          key={id}
        />
      )),
    [quoteData, height]
  );

  return (
    <>
      <Card
        title="Free Policy Conversion"
        viewDataCallback={toggleModal}
        className={styles.root}
      >
        <h3>
          {totalQuotes} <span className="date">[May 2025]</span>
        </h3>
        <Column className={styles.chart}>{bars}</Column>
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
export default FreePolicyConversion;

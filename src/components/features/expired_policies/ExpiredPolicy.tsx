import type React from "react";
import styles from "./ExpiredPolicy.module.css";
import { Row } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import Modal from "../../layouts/modal/Modal";
import { useExpiredPolicy } from "./useExpiredPolicy";
import Table from "../../ui/table/Table";
import { useModal } from "../../../hooks/useModal";
import { SingleLineChart } from "../../ui/graph/LineGraph";

const ExpiredPolicy: React.FC = () => {
  const { isOpen, toggleModal } = useModal();
  const { quoteData, columns } = useExpiredPolicy();

  const yourData = [
    // { date: "Apr 24", count: 390 },
    // { date: "Feb 24", count: 480 },
    // { date: "Mar 24", count: 240 },
    // { date: "Apr 24", count: 390 },
    { date: "May 24", count: 480 },
    { date: "Jun 24", count: 240 },
    { date: "Jul 24", count: 139 },
    { date: "Aug 24", count: 980 },
    { date: "Sept 24", count: 380 },
    { date: "Oct 24", count: 430 },
    { date: "Nov 24", count: 390 },
    { date: "Dec 24", count: 480 },
    { date: "Jan 25", count: 240 },
    { date: "Feb 25", count: 139 },
    { date: "Mar 25", count: 980 },
    { date: "Apr 25", count: 380 },
    { date: "May 25", count: 430 },
  ];

  return (
    <>
      <Card
        title="Expired Policy"
        viewDataCallback={toggleModal}
        className={styles.root}
      >
        {/* <h3>32.5k</h3> */}
        <Row className={styles.chart}>
          <SingleLineChart data={yourData} color="#f39523" />
        </Row>
      </Card>
      <Modal isOpen={isOpen} onClose={toggleModal} allowKeyCloseEvent={false}>
        <Table
          columns={columns}
          data={quoteData}
          enableSorting={true}
          enableFiltering={true}
        />
      </Modal>
    </>
  );
};
export default ExpiredPolicy;

import type React from "react";
import styles from "./ActiveCustomer.module.css";
import { Row } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import Modal from "../../layouts/modal/Modal";
import { useActiveUser } from "./useActiveCustomer";
import Table from "../../ui/table/Table";
import { useModal } from "../../../hooks/useModal";
import { TwoLineChart } from "../../ui/graph/LineGraph";
import { TbMinusVertical } from "react-icons/tb";

const ActiveCustomer: React.FC = () => {
  const { isOpen, toggleModal } = useModal();
  const { quoteData, columns } = useActiveUser();

  const yourData = [
    { date: "Nov 24", free: 278, paid: 390 },
    { date: "Dec 24", free: 189, paid: 480 },
    { date: "Jan 25", free: 400, paid: 240 },
    { date: "Feb 25", free: 300, paid: 139 },
    { date: "Mar 25", free: 200, paid: 980 },
    { date: "Apr 25", free: 239, paid: 380 },
    { date: "May 25", free: 349, paid: 430 },
  ];

  return (
    <>
      <Card
        title="Active Policy"
        viewDataCallback={toggleModal}
        className={styles.root}
      >
        <h3>
          32.5k <span className="date">[May 2025]</span>
        </h3>
        <Row className={styles.chart}>
          <TwoLineChart data={yourData} />
        </Row>
        <Row className={styles.legend}>
          <div>
            <div>Free</div>
            <Row className={styles.legendRow}>
              <TbMinusVertical className={styles.free} />
              <span>600</span>
            </Row>
          </div>
          <div>
            <div>Paid</div>
            <Row className={styles.legendRow}>
              <TbMinusVertical className={styles.paid} /> <span>1,600</span>
            </Row>
          </div>
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
export default ActiveCustomer;

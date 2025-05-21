import React from "react";
import styles from "./css/Report.module.css";
import { Column, Row } from "../../components/layouts/row_col/RowCol";
import Menu from "../../components/features/menu/Menu";
import Card from "../../components/layouts/card/Card";

const Report: React.FC = () => {
  return (
    <Column className={styles.root} gap="20px">
      <Menu />
      <Row gap="20px" className={styles.row}>
        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Quote</h3>
        </Card>
        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Quote</h3>
          <h3 className={styles.lbl}>Conversion</h3>
        </Card>

        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Lapsed</h3>
          <h3 className={styles.lbl}>Quote</h3>
        </Card>
        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Active</h3>
          <h3 className={styles.lbl}>Policy</h3>
        </Card>
        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Free Policy</h3>
        </Card>
        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Free Policy</h3>
          <h3 className={styles.lbl}>Conversion</h3>
        </Card>
        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Cancelled</h3>
          <h3 className={styles.lbl}>Policy</h3>
        </Card>
        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Expired</h3>
          <h3 className={styles.lbl}>Policy</h3>
        </Card>

        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Renewals</h3>
        </Card>
        <Card
          // viewDataCallback={toggleModal}
          className={styles.reportCard}
          hasViewData={false}
        >
          <h3 className={styles.lbl}>Birthdays</h3>
        </Card>
      </Row>
    </Column>
  );
};
export default Report;

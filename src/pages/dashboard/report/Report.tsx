import React, { Suspense } from "react";
import styles from "../css/Report.module.css";
import { Column, Row } from "../../../components/layouts/row_col/RowCol";
import Menu from "../../../components/features/menu/Menu";
import Card from "../../../components/layouts/card/Card";
import Modal from "../../../components/layouts/modal/Modal";
import useReport from "./hooks/useReport";

const Report: React.FC = () => {
  const { activeModal, close, open, reportMenu } = useReport();

  // Find the menu table component to render for the currently active modal (if any)
  const current = reportMenu.find((m) => m.modal === activeModal);

  return (
    <>
      <Column className={styles.root} gap="20px">
        <Menu />
        <Row gap="20px" className={styles.row}>
          {reportMenu.map(({ id, labels, modal }) => (
            <Card
              className={styles.reportCard}
              hasViewData={false}
              onClick={() => open(modal)}
              key={id}
            >
              {labels.map((label, index) => (
                <h3 className={styles.lbl} key={index}>
                  {label}
                </h3>
              ))}
            </Card>
          ))}
        </Row>
      </Column>

      <Modal
        isOpen={!!current}
        onClose={close}
        allowKeyCloseEvent={false}
        className={styles.reportModal}
      >
        <Suspense fallback={<div>Loading report…</div>}>
          {current && <current.Component />}
        </Suspense>
      </Modal>
    </>
  );
};
export default Report;

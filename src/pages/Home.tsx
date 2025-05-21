import React from "react";
import Quote from "../components/features/quote/Quote";
import ActiveCustomer from "../components/features/active_customer/ActiveCustomer";
import { Column, Row } from "../components/layouts/row_col/RowCol";
import QuoteConversion from "../components/features/quote_conversion/QuoteConversion";
import FreePolicyConversion from "../components/features/free_policy_conversion/FreePolicyConversion";
import Campaigns from "../components/features/campaigns/Campaigns";
import CancelledPolicy from "../components/features/cancelled_policies/CancelledPolicy";
import ExpiredPolicy from "../components/features/expired_policies/ExpiredPolicy";
import styles from "./css/Home.module.css";
import Menu from "../components/features/menu/Menu";

const Home: React.FC = () => {
  return (
    <Column className={styles.root} gap="20px">
      <Menu />
      <Row gap="20px" className={styles.row}>
        <Quote />
        <QuoteConversion />
        <ActiveCustomer />
      </Row>
      <Row gap="20px" className={styles.row}>
        <CancelledPolicy />
        <ExpiredPolicy />
      </Row>
      <Row gap="20px">
        <FreePolicyConversion />
        <Campaigns />
      </Row>
    </Column>
  );
};
export default Home;

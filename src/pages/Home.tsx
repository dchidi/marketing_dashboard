import React from "react";
import { Column, Row } from "../components/layouts/row_col/RowCol";
import styles from "./css/Home.module.css";
import Menu from "../components/features/menu/Menu";
import { FilterProvider } from "../context/FilterContext";
import QuoteSummary from "../components/features/quote/QuoteSummary";
import PolicySummary from "../components/features/policies/PolicySummary";

const Home: React.FC = () => {
  return (
    <FilterProvider>
      <Column className={styles.root} gap="20px">
        <Menu />
        <Row className={styles.row}>
          <QuoteSummary />
        </Row>
        <PolicySummary />
      </Column>
    </FilterProvider>
  );
};
export default Home;

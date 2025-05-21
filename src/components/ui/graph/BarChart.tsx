import type React from "react";
import styles from "./BarChart.module.css";
import { Row } from "../../layouts/row_col/RowCol";

interface BarProps {
  height?: number;
  width?: number;
  color: "color1" | "color2" | "color3" | "color4" | "color5" | string;
  value_label?: string;
  text_label?: string;
  className?: string;
}
export const VBar: React.FC<BarProps> = ({
  height = 0,
  width,
  color = "color1",
  value_label,
  text_label,
}) => {
  return (
    <div className={`${styles.vbar} ${color}`} style={{ height, width }}>
      {height > 0 && (
        <span className={height > 30 ? styles.vlbl : styles.lblSM}>
          {value_label}
        </span>
      )}
      <span className={styles.tlbl}>{text_label}</span>
    </div>
  );
};

export const HBar: React.FC<BarProps> = ({
  height,
  width = 0,
  color = "color1",
  value_label,
  text_label,
}) => {
  return (
    <Row className={styles.hroot}>
      <div className={styles.thlbl}>{text_label}</div>
      <div
        className={`${styles.hbar} ${color}`}
        style={{ height, width }}
      ></div>
      <div className={styles.vhlbl}>{value_label}</div>
    </Row>
  );
};

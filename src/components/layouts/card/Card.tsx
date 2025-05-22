import React from "react";
import styles from "./Card.module.css";
import { Row } from "../row_col/RowCol";
import { MdOutlineDataset } from "react-icons/md";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  hasViewData?: boolean;
  viewDataCallback?: VoidFunction;
  onClick?: VoidFunction;
}
const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  hasViewData = true,
  viewDataCallback,
  onClick,
}) => {
  return (
    <>
      <div className={`${styles.card} ${className}`} onClick={onClick}>
        <Row className={styles.header}>
          <span className={styles.title}>{title}</span>
          {hasViewData && (
            <span onClick={viewDataCallback} className={styles.link}>
              <MdOutlineDataset size={20} /> Data
            </span>
          )}
        </Row>
        {children}
      </div>
    </>
  );
};
export default Card;

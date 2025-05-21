import React from "react";
import styles from "./RowCol.module.css";

interface RowProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  onClick?: VoidFunction;
}
export const Row: React.FC<RowProps> = ({
  children,
  className,
  gap,
  onClick,
}) => {
  return (
    <div
      className={`${styles.row} ${className} `}
      style={{ gap: gap }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const Column: React.FC<RowProps> = ({ children, className, gap }) => {
  return (
    <div className={`${styles.column} ${className} `} style={{ gap: gap }}>
      {children}
    </div>
  );
};

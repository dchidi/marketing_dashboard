import React, { useActionState } from "react";
import styles from "./DatePicker.module.css";
import { Column, Row } from "../../layouts/row_col/RowCol";

interface DatePickerProps {
  className?: string;
  open: boolean;
  close: () => void;
}
type FormState = {
  success: boolean;
};

const DatePicker: React.FC<DatePickerProps> = ({ className, close, open }) => {
  const handleSubmit = async (
    _prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const fromDate = formData.get("fromDate");
    const toDate = formData.get("toDate");
    close();

    console.log("Submitted:", { fromDate, toDate });

    return { success: true };
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    success: false,
  });

  return (
    <form
      action={formAction}
      className={`${styles.root} ${className} ${open ? "show" : "hide"}`}
    >
      <p className={styles.lbl}>From Date</p>
      <input type="date" className={styles.dateInput} name="fromDate" />
      <p className={styles.lbl2}>To Date</p>
      <input type="date" className={styles.dateInput} name="toDate" />
      <Row className={styles.row} gap="10px">
        <button className={styles.btn}>OK</button>
        <button className={styles.btnCancel} onClick={close} type="button">
          Cancel
        </button>
      </Row>
    </form>
  );
};
export default DatePicker;

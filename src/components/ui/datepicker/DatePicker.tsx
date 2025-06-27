import React, { useActionState } from "react";
import styles from "./DatePicker.module.css";
import { Row } from "../../layouts/row_col/RowCol";

export type DateItemProps = FormDataEntryValue | null;
interface DatePickerProps {
  className?: string;
  open: boolean;
  close: () => void;
  callback?: (dates: {
    start_date: DateItemProps;
    end_date: DateItemProps;
  }) => void;
}
type FormState = {
  success: boolean;
};

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  close,
  open,
  callback,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (
    _prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const fromDate = formData.get("fromDate");
    const toDate = formData.get("toDate");
    close();

    callback !== undefined &&
      callback({ start_date: fromDate, end_date: toDate });

    return { success: true };
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    success: false,
  });

  console.log(state, isPending);
  return (
    <form
      action={formAction}
      className={`${styles.root} ${className} ${open ? "show" : "hide"}`}
    >
      <p className={styles.lbl}>From Date</p>
      <input
        type="date"
        className={styles.dateInput}
        name="fromDate"
        defaultValue={today}
      />
      <p className={styles.lbl2}>To Date</p>
      <input
        type="date"
        className={styles.dateInput}
        name="toDate"
        defaultValue={today}
      />
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

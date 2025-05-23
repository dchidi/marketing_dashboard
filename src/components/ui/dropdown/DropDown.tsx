import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import styles from "./DropDown.module.css";
import { Row } from "../../layouts/row_col/RowCol";
import { useDropdown } from "./useDropdown";
import type { DropDownPropsWithId, SingleSelectProps } from "./types";
import DatePicker from "../datepicker/DatePicker";

export const SingleSelect: React.FC<SingleSelectProps> = ({
  data,
  selectHandler,
  defaultValue,
  className,
}) => {
  const {
    selectedItem,
    onToggle,
    showDropdown,
    setShowDropdown,
    showDatePicker,
    closeDatePicker,
  } = useDropdown(data, defaultValue);

  const dropdownHandler = (item: DropDownPropsWithId) => {
    if (item.code === null) {
      throw new Error("Code is null");
    }
    onToggle(item.code);
    selectHandler(item);
  };

  return (
    <div className={styles.root}>
      <div className={`${styles.singleSelect} ${className}`}>
        <Row
          gap="10px"
          className={styles.selected}
          onClick={() =>
            showDatePicker === false && setShowDropdown(!showDropdown)
          }
        >
          {selectedItem?.name || "Select an option"}
          {showDropdown ? <FaCaretUp /> : <FaCaretDown />}
        </Row>
        <ul
          className={`${styles.dropdown} ${
            showDropdown ? styles.showMenu : styles.hideMenu
          }`}
        >
          {data.map((item) => (
            <li
              key={item.id}
              onClick={() => showDatePicker === false && dropdownHandler(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <DatePicker
        open={showDatePicker}
        className={styles.datepicker}
        close={closeDatePicker}
      />
    </div>
  );
};

export const MultiSelect = () => {
  return <div></div>;
};

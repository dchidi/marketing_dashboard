import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import styles from "./DropDown.module.css";
import { Row } from "../../layouts/row_col/RowCol";
import { useDropdown } from "./useDropdown";
import type { SingleSelectProps } from "./types";
import DatePicker, { type DateItemProps } from "../datepicker/DatePicker";
import { useFilterLocalStore } from "../../../hooks/useFilterLocalStore";

export const SingleSelect: React.FC<SingleSelectProps> = ({
  data,
  selectHandler,
  defaultValue,
  className,
  formFieldName,
}) => {
  const { saveFilter } = useFilterLocalStore();
  const {
    selectedItem,
    showDropdown,
    showDatePicker,
    closeDatePicker,
    setShowDropdown,
    dropdownHandler,
    setSelectedItem,
  } = useDropdown(data, defaultValue);

  const datePickerData = ({
    start_date,
    end_date,
  }: {
    start_date: DateItemProps;
    end_date: DateItemProps;
  }) => {
    selectHandler(
      {
        code: "date_picker",
        name: `${start_date} - ${end_date}`,
        id: 99,
      },
      formFieldName
    );
    setSelectedItem((prev) => ({
      ...prev,
      code: "date_picker",
      name: `${start_date} - ${end_date}`,
      id: 99,
    }));
    saveFilter({ start_date, end_date });
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
              onClick={() =>
                showDatePicker === false &&
                dropdownHandler(item, formFieldName, selectHandler)
              }
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
        callback={datePickerData}
      />
    </div>
  );
};

export const MultiSelect = () => {
  return <div></div>;
};

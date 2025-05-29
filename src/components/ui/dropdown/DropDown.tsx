import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import styles from "./DropDown.module.css";
import { Row } from "../../layouts/row_col/RowCol";
import { useDropdown } from "./useDropdown";
import type { DropDownPropsWithId, SingleSelectProps } from "./types";
import DatePicker, { type DateItemProps } from "../datepicker/DatePicker";
import { useFilterLocalStore } from "../../../hooks/useFilterLocalStore";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { IoCheckboxSharp } from "react-icons/io5";
import { useState } from "react";

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
      <div className={`${styles.selectBox} ${className}`}>
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

export const MultiSelect: React.FC<SingleSelectProps> = ({
  className,
  data,
  defaultValue,
  formFieldName,
  selectHandler,
}) => {
  const [selectedItems, setSelectedItems] = useState<any>(
    defaultValue?.code?.split(",")
  );
  const {
    selectedItem,
    showDropdown,
    setShowDropdown,
    multiDropdownHandler,
    setSelectedItem,
  } = useDropdown(data, defaultValue);

  const onClickHandler = (item: DropDownPropsWithId) => {
    setSelectedItems((prev: string[]) => {
      const { code = "all" } = item; //set default value for code
      // const allCodes = ["all", "uk", "at", "de", "au", "nz"];
      const allCodes = data.map((item) => item?.code!);
      let newSelected: string[];

      if (code === "all") {
        // Toggle "all" selection
        const isAllSelected = prev.includes("all");
        newSelected = isAllSelected ? [] : allCodes;
      } else {
        // Toggle individual code
        const isSelected = prev.includes(code!);
        newSelected = isSelected
          ? prev.filter((c) => c !== code!)
          : [...prev, code!];
        // If all individual codes are selected, include "all"
        const allIndividualSelected = allCodes
          .slice(1)
          .every((c) => newSelected.includes(c));
        if (allIndividualSelected) {
          newSelected = ["all", ...allCodes.slice(1)];
        } else {
          // Ensure "all" is removed if not all
          newSelected = newSelected.filter((c) => c !== "all");
        }
      }

      // Update displayed name
      const size = newSelected.length - 1;

      // find the first code that isn’t “all”
      const firstRealCode = newSelected.find((code) => code !== "all");
      // then filter data by that
      const nameObj = data.filter((item) => item.code === firstRealCode);

      const name =
        data.length === newSelected.length ? data[0]?.name : nameObj[0]?.name;
      const lbl = size > 0 ? "& " + size + " more" : "";
      setSelectedItem({
        ...item,
        code: newSelected.join(","),
        name: `${name || "Select Option"} ${
          newSelected[0] !== "all" ? lbl : ""
        } `,
      });

      return newSelected;
    });
  };

  const closeDropdown = () => {
    multiDropdownHandler(selectedItem, formFieldName, selectHandler);
  };

  return (
    <div className={styles.root}>
      <div className={`${styles.selectBox} ${className}`}>
        <Row
          gap="10px"
          className={styles.selected}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedItem?.name || defaultValue.name}
          {showDropdown ? <FaCaretUp /> : <FaCaretDown />}
        </Row>
        <ul
          className={`${styles.dropdown} ${
            showDropdown ? styles.showMenu : styles.hideMenu
          }`}
        >
          {data.map((item, _) => (
            <li
              onClick={() => onClickHandler(item)}
              className={styles.checkBoxItem}
              key={item.id}
            >
              {selectedItems.includes(item!.code!) ? (
                <IoCheckboxSharp size={25} />
              ) : (
                <RiCheckboxBlankFill size={25} />
              )}

              {item.name}
            </li>
          ))}
          <li onClick={closeDropdown}>Okay</li>
        </ul>
      </div>
    </div>
  );
};

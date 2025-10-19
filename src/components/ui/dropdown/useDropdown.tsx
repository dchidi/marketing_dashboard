import { useState } from "react";
import type { DropDownPropsWithId } from "./types";
import { useFilterLocalStore } from "../../../hooks/useFilterLocalStore";
// import { useFilterLocalStore } from "../../../hooks/useFilterLocalStore";

export const useDropdown = (
  data: DropDownPropsWithId[],
  defaultValue: DropDownPropsWithId
) => {
  const { saveFilter } = useFilterLocalStore();
  const [selectedItem, setSelectedItem] = useState<DropDownPropsWithId | null>(
    defaultValue
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const dropdownHandler = (
    item: DropDownPropsWithId | null,
    formFieldName: string,
    selectHandler: (
      item: DropDownPropsWithId | null,
      formFieldName: string
    ) => void
  ) => {
    const code = item ? item.code : "";
    if (code === null) {
      throw new Error("Code is null");
    }

    const updatedItem = data.find((i) => i.code === code);
    if (!updatedItem) return;

    setSelectedItem((prev) => ({ ...prev, ...updatedItem }));
    saveFilter({ date_code: updatedItem.code });
    setShowDropdown(false);

    if (code === "date_picker") setShowDatePicker(!showDatePicker);

    selectHandler({ ...updatedItem }, formFieldName);
  };

  const multiDropdownHandler = (
    item: DropDownPropsWithId | null,
    formFieldName: string,
    selectHandler: (
      item: DropDownPropsWithId | null,
      formFieldName: string
    ) => void
  ) => {
    const code = item ? item.code : "";
    if (code === null) {
      throw new Error("Code is null");
    }

    // const updatedItem = data.find((i) => i.code === code);
    // if (!updatedItem) return;

    // setSelectedItem((prev) => ({ ...prev, ...updatedItem }));
    setShowDropdown(false);

    // if (code === "date_picker") setShowDatePicker(!showDatePicker);

    selectHandler(item, formFieldName);
  };

  return {
    selectedItem,
    showDropdown,
    showDatePicker,
    setShowDropdown,
    closeDatePicker,
    dropdownHandler,
    setSelectedItem,
    multiDropdownHandler,
  };
};

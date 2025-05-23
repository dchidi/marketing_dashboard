import { useState } from "react";
import type { DropDownPropsWithId } from "./types";

export const useDropdown = (
  data: DropDownPropsWithId[],
  defaultValue: DropDownPropsWithId
) => {
  const [selectedItem, setSelectedItem] = useState<DropDownPropsWithId | null>(
    defaultValue
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onToggle = (countryCode: string) => {
    const item = data.filter((item) => item.code === countryCode)[0];
    setSelectedItem(item);
    setShowDropdown(false);
    item.code === "date_picker" && setShowDatePicker(!showDatePicker);
  };
  const closeDatePicker = () => {
    setShowDatePicker(false);
  };
  return {
    selectedItem,
    onToggle,
    showDropdown,
    setShowDropdown,
    showDatePicker,
    closeDatePicker,
  };
};

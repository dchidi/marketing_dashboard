import { useState } from "react";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "../util/local_storage";

export const useFilterLocalStore = () => {
  const [filterPrefs, setFilterPrefs] = useState(null);
  // Save & update data
  const saveFilter = (filters: any) => {
    saveToLocalStorage("filterPrefs", filters);
    setFilterPrefs(getFromLocalStorage("filterPrefs"));
  };

  // Deleting data
  const deleteFilter = () => deleteFromLocalStorage("filterPrefs");

  return { saveFilter, filterPrefs, deleteFilter };
};

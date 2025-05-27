import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "../util/local_storage";

export const useFilterLocalStore = () => {
  // Save & update data
  const saveFilter = (filters: any) => {
    saveToLocalStorage("filterPrefs", filters);
  };

  // Deleting data
  const deleteFilter = () => deleteFromLocalStorage("filterPrefs");

  return { saveFilter, deleteFilter, getFromLocalStorage };
};

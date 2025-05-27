import { current_date, start_of_month } from "./date_util";

/**
 * Retrieves and validates data from localStorage
 * @param key - The key to retrieve
 * @param validator - Optional runtime type validator
 * @returns Parsed data of type T or null if not found/invalid
 */
export const getFromLocalStorage = <T,>(
  key: string,
  validator?: (data: unknown) => data is T
): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    const parsed = JSON.parse(item);

    // If validator provided, use it to check type at runtime
    if (validator && !validator(parsed)) {
      console.warn(`LocalStorage data for key "${key}" failed validation`);
      return null;
    }

    return parsed as T;
  } catch (error) {
    console.error(`Error getting item from localStorage (key: ${key}):`, error);
    return null;
  }
};

/**
 * Saves or updates data in localStorage
 * @param key - The key to store under
 * @param value - The value to store (can be partial for objects)
 * @param merge - Whether to merge with existing object (default: false)
 * @returns void
 */
export const saveToLocalStorage = <T,>(key: string, value: T): void => {
  try {
    // Get existing data if present
    const existingData = localStorage.getItem(key);

    // Determine the value to store
    let valueToStore: T;

    if (existingData) {
      // Key exists - handle update
      const currentValue = JSON.parse(existingData);

      // If both current and new values are objects (not arrays), merge them
      if (
        typeof currentValue === "object" &&
        typeof value === "object" &&
        !Array.isArray(currentValue) &&
        !Array.isArray(value)
      ) {
        valueToStore = { ...currentValue, ...value };
      } else {
        // Otherwise overwrite completely
        valueToStore = value;
      }
    } else {
      // Key doesn't exist - store new value

      const defaultValue = {
        country: "all",
        brand: "all",
        pet_type: "all",
        start_date: start_of_month,
        end_date: current_date,
      };
      valueToStore = { ...defaultValue, ...value };
    }

    // Save to localStorage
    localStorage.setItem(key, JSON.stringify(valueToStore));
  } catch (error) {
    console.error(`Error saving to localStorage (key: ${key}):`, error);
  }
};

/**
 * Removes data from localStorage
 * @param key - The key to remove
 */
export const deleteFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting from localStorage (key: ${key}):`, error);
  }
};

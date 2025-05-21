import { write, utils } from "xlsx";
import { saveAs } from "file-saver";

export const useTable = () => {
  function exportToExcel<T>(data: T[], fileName = "table.xlsx") {
    // Convert your data array to a worksheet
    const worksheet = utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    // Generate a binary string
    const wbout = write(workbook, { bookType: "xlsx", type: "array" });
    // Trigger download
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), fileName);
  }

  return { exportToExcel };
};

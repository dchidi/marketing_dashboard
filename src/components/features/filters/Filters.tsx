import { FaLongArrowAltRight } from "react-icons/fa";
import { PET_TYPE, BRANDS, COUNTRIES, DATEFILTERS } from "../../../constants";
import { Row } from "../../layouts/row_col/RowCol";
import { MultiSelect, SingleSelect } from "../../ui/dropdown/DropDown";
import type { DropDownPropsWithId } from "../../ui/dropdown/types";
import styles from "./Filters.module.css";
import { useFilterLocalStore } from "../../../hooks/useFilterLocalStore";
import { useState } from "react";
import { getFromLocalStorage } from "../../../util/local_storage";
import {
  current_date,
  start_of_month,
  start_of_week,
} from "../../../util/date_util";

const Filters = () => {
  const [brandList, setBrandList] = useState(BRANDS);
  const { saveFilter } = useFilterLocalStore();

  const callback = (
    item: DropDownPropsWithId | null,
    formFieldName: string
  ): void => {
    // convert date filter label to start and end date
    switch (item?.code) {
      case "mtd":
        saveFilter({ start_date: start_of_month, end_date: current_date });
        return;
      case "wtd":
        saveFilter({ start_date: start_of_week, end_date: current_date });
        return;
      case "now":
        saveFilter({ start_date: current_date, end_date: current_date });
        return;
      case "date_picker":
        console.log("trigger date picker");
        return;
      default:
        saveFilter({ [formFieldName]: item?.code });
    }
  };

  const countryHandler = (
    item: DropDownPropsWithId | null,
    formFieldName: string
  ): void => {
    // If "All Regions" is selected or no item selected, show all brands
    if (!item || item.code === "all") {
      setBrandList(BRANDS);
    } else {
      // Filter brands that include selected country code OR "all" in their country_code
      const updatedBrands = BRANDS.filter((brand) =>
        brand.country_code.includes(item!.code!)
      );

      setBrandList(updatedBrands);
    }
    saveFilter({ [formFieldName]: item?.code });
  };

  const multiCountryHandler = (
    item: DropDownPropsWithId | null,
    formFieldName: string
  ): void => {
    // If "All Regions" is selected or no item selected, show all brands
    if (!item || item.code?.split(",").includes("all")) {
      setBrandList(BRANDS);
    } else {
      // // Filter brands that include selected country code OR "all" in their country_code
      // const updatedBrands = BRANDS.filter((brand) =>
      //   brand.country_code.includes(item!.code!)
      // );
      // split the CSV into an array of selected codes
      const selectedCodes = item?.code?.split(",");

      // keep any brand whose country_code array has at least one of the selected codes
      const updatedBrands = BRANDS.filter((brand) =>
        selectedCodes?.some((code) => brand.country_code.includes(code))
      );

      setBrandList(updatedBrands);
    }
    saveFilter({ [formFieldName]: item?.code });
    console.log(item);
  };

  const applyFilterHandler = () => {
    let store = getFromLocalStorage("filterPrefs");
    if (!store) {
      store = {
        country: "all",
        brand: "all",
        pet_type: "all",
        start_date: start_of_month,
        end_date: current_date,
      };
      // console.log("use default values");
    }
    console.log("apply filter button clicked", store);
    // Call API endpoint
  };

  return (
    <Row gap="10px" className={styles.filters}>
      <MultiSelect
        data={COUNTRIES}
        defaultValue={COUNTRIES[0]}
        formFieldName="country"
        selectHandler={multiCountryHandler}
      />
      <MultiSelect
        data={brandList}
        defaultValue={brandList[0]}
        formFieldName="brand"
        selectHandler={multiCountryHandler}
      />
      <SingleSelect
        data={COUNTRIES}
        defaultValue={COUNTRIES[0]}
        selectHandler={countryHandler}
        formFieldName="country"
      />
      <SingleSelect
        data={brandList}
        defaultValue={brandList[0]}
        selectHandler={callback}
        formFieldName="brand"
      />
      <SingleSelect
        data={PET_TYPE}
        defaultValue={PET_TYPE[0]}
        selectHandler={callback}
        formFieldName="pet_type"
      />
      <SingleSelect
        data={DATEFILTERS}
        defaultValue={DATEFILTERS[0]}
        selectHandler={callback}
        className={styles.dateDropDown}
        formFieldName="date_filter"
      />
      <button
        className={styles.filterBtn}
        type="button"
        onClick={applyFilterHandler}
      >
        <FaLongArrowAltRight />
      </button>
    </Row>
  );
};
export default Filters;

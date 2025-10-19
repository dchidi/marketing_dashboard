import { FaLongArrowAltRight } from "react-icons/fa";
import { PET_TYPE, BRANDS, COUNTRIES, DATEFILTERS } from "../../../constants";
import { Row } from "../../layouts/row_col/RowCol";
import { SingleSelect } from "../../ui/dropdown/DropDown";
import type { DropDownPropsWithId } from "../../ui/dropdown/types";
import styles from "./Filters.module.css";
import { useFilterLocalStore } from "../../../hooks/useFilterLocalStore";
import { useCallback, useState } from "react";
import { getFromLocalStorage } from "../../../util/local_storage";
import {
  current_date,
  start_of_month,
  start_of_week,
  last_week_range,
  last_month_range,
  last_year_range,
  yesterday,
  start_of_year,
} from "../../../util/date_util";
import { useFilterCtx } from "../../../context/FilterContext";
import { DropDownV2 } from "../../ui/dropdown/DropDownV2";

const Filters = () => {
  const [brandList, setBrandList] = useState(BRANDS);
  const { saveFilter } = useFilterLocalStore();
  const { setStore, store } = useFilterCtx();

  const dateHandler = (
    item: DropDownPropsWithId | null,
    formFieldName: string
  ): void => {
    // convert date filter label to start and end date
    switch (item?.code) {
      case "mtd":
        saveFilter({
          start_date: start_of_month,
          end_date: current_date,
          date_code: "mtd",
        });
        return;
      case "wtd":
        saveFilter({
          start_date: start_of_week,
          end_date: current_date,
          date_code: "wtd",
        });
        return;
      case "now":
        saveFilter({
          start_date: current_date,
          end_date: current_date,
          date_code: "now",
        });
        return;
      case "last_week": {
        const range = last_week_range();
        saveFilter({
          start_date: range.start_date,
          end_date: range.end_date,
          date_code: "last_week",
        });
        return;
      }
      case "last_month": {
        const range = last_month_range();
        saveFilter({
          start_date: range.start_date,
          end_date: range.end_date,
          date_code: "last_month",
        });
        return;
      }
      case "yesterday":
        saveFilter({
          start_date: yesterday,
          end_date: yesterday,
          date_code: "yesterday",
        });
        return;
      case "last_year": {
        const range = last_year_range();
        saveFilter({
          start_date: range.start_date,
          end_date: range.end_date,
          date_code: "last_year",
        });
        return;
      }
      case "ytd":
        saveFilter({
          start_date: start_of_year,
          end_date: current_date,
          date_code: "ytd",
        });
        return;
      case "date_picker":
        console.log("trigger date picker");
        return;
      default:
        saveFilter({ [formFieldName]: item?.code });
    }
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
        skip: 0,
        limit: 100,
      };
    }

    // update context to trigger endpoint call
    setStore(store);
  };

  const countryHandler = (selectedCountryCodes: string[]) => {
    const updatedBrands = BRANDS.filter((brand) =>
      selectedCountryCodes?.some((code) => brand.country_code.includes(code))
    );
    setBrandList(updatedBrands);
    saveFilter({ ["country"]: selectedCountryCodes.join(",") });
  };
  const brandHandler = (selectedBrandCodes: string[]) => {
    saveFilter({ ["brand"]: selectedBrandCodes.join(",") });
  };

  const petTypeHandler = (codes: string[]) => {
    saveFilter({ ["pet_type"]: codes.join(",") });
  };

  const defaultDateSelected = useCallback(
    (data: any, start: any, end: any, code: any) => {
      if (code === "date_picker")
        return {
          code: "date_picker",
          name: `${start} - ${end}`,
          id: 99,
        };
      return data.find((i: any) => i.code === code);
    },
    []
  );

  const currentDateSelected = store?.date_code
    ? defaultDateSelected(
        DATEFILTERS,
        store.start_date ?? start_of_month,
        store.end_date ?? current_date,
        store.date_code
      )
    : DATEFILTERS[0];

  return (
    <Row gap="10px" className={styles.filters}>
      <DropDownV2
        data={COUNTRIES}
        defaultValue={store?.country ?? "all"}
        onChange={countryHandler}
      />
      <DropDownV2
        data={brandList}
        defaultValue={store?.brand ?? "all"}
        onChange={brandHandler}
      />

      <DropDownV2
        data={PET_TYPE}
        defaultValue={store?.pet_type ?? "all"}
        onChange={petTypeHandler}
      />
      <SingleSelect
        data={DATEFILTERS}
        defaultValue={currentDateSelected}
        selectHandler={dateHandler}
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

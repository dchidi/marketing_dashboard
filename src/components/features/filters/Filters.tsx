import { FaLongArrowAltRight } from "react-icons/fa";
import { PET_TYPE, BRANDS, COUNTRIES, DATEFILTERS } from "../../../constants";
import { Row } from "../../layouts/row_col/RowCol";
import { SingleSelect } from "../../ui/dropdown/DropDown";
import type { DropDownPropsWithId } from "../../ui/dropdown/types";
import styles from "./Filters.module.css";
import { useFilterLocalStore } from "../../../hooks/useFilterLocalStore";
import { MdOutlineClear } from "react-icons/md";

const Filters = () => {
  const { filterPrefs, deleteFilter, saveFilter } = useFilterLocalStore();
  const callback = (
    item: DropDownPropsWithId | null,
    formFieldName: string
  ): void => {
    console.log(item, formFieldName);

    saveFilter({ [formFieldName]: item?.code });
    // switch (item.code) {
    //   case "mtd":
    //     console.log("call api to update global table data with MTD data");
    //     return;
    //   case "wtd":
    //     console.log("call api to update global table data with WTD data");
    //     return;
    //   case "now":
    //     console.log("call api to update global table data with today's data");
    //     return;
    //   case "date_picker":
    //     console.log("trigger date picker");
    //     return;
    //   default:
    //     throw new Error("Error with dropdown item");
    // }
  };

  const applyFilterHandler = () => {
    console.log("apply filter button clicked", filterPrefs);
  };

  return (
    <Row gap="10px" className={styles.filters}>
      <SingleSelect
        data={COUNTRIES}
        defaultValue={COUNTRIES[0]}
        selectHandler={callback}
        formFieldName="country"
      />
      <SingleSelect
        data={BRANDS}
        defaultValue={BRANDS[0]}
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
      <button className={styles.filterBtn} type="button" onClick={deleteFilter}>
        <MdOutlineClear />
      </button>
    </Row>
  );
};
export default Filters;

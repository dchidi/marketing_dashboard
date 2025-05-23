import { ANIMALTYPE, BRANDS, COUNTRIES, DATEFILTERS } from "../../../constants";
import { Row } from "../../layouts/row_col/RowCol";
import { SingleSelect } from "../../ui/dropdown/DropDown";
import type { DropDownPropsWithId } from "../../ui/dropdown/types";
import styles from "./Filters.module.css";

const Filters = () => {
  const callback = (item: DropDownPropsWithId): void => {
    console.log(item);
    switch (item.code) {
      case "mtd":
        console.log("call api to update global table data with MTD data");
        return;
      case "wtd":
        console.log("call api to update global table data with WTD data");
        return;
      case "now":
        console.log("call api to update global table data with today's data");
        return;
      case "date_picker":
        console.log("trigger date picker");
        return;
      default:
        throw new Error("Error with dropdown item");
    }
  };
  return (
    <Row gap="10px" className={styles.filters}>
      <SingleSelect
        data={COUNTRIES}
        defaultValue={COUNTRIES[0]}
        selectHandler={callback}
      />
      <SingleSelect
        data={BRANDS}
        defaultValue={BRANDS[0]}
        selectHandler={callback}
      />
      <SingleSelect
        data={ANIMALTYPE}
        defaultValue={ANIMALTYPE[0]}
        selectHandler={callback}
      />
      <SingleSelect
        data={DATEFILTERS}
        defaultValue={DATEFILTERS[0]}
        selectHandler={callback}
        className={styles.dateDropDown}
      />
    </Row>
  );
};
export default Filters;

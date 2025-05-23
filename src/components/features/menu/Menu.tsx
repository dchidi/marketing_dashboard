import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import { SingleSelect } from "../../ui/dropdown/DropDown";
import { Row } from "../../layouts/row_col/RowCol";
import { AiOutlineDashboard } from "react-icons/ai";
import { ImStatsBars2 } from "react-icons/im";
import { COUNTRIES } from "../../../constants";
import type { DropDownPropsWithId } from "../../ui/dropdown/types";

const Menu = () => {
  const callback = (item: DropDownPropsWithId): void => {
    console.log(item);
  };
  return (
    <Row gap="30px" className={styles.root}>
      <div className={styles.menu}>
        <Link to="/dashboard" className={styles.menuItem}>
          <AiOutlineDashboard size={25} />
          Dashboard
        </Link>
        <Link to="/dashboard/report" className={styles.menuItem}>
          <ImStatsBars2 size={25} />
          Report
        </Link>
        <SingleSelect
          data={COUNTRIES}
          defaultValue={COUNTRIES[0]}
          selectHandler={callback}
        />
      </div>
      <div className={styles.profile}>DC</div>
    </Row>
  );
};
export default Menu;

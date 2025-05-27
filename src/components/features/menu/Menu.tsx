import { Link, useLocation } from "react-router-dom";
import styles from "./Menu.module.css";
import { SingleSelect } from "../../ui/dropdown/DropDown";
import { Row } from "../../layouts/row_col/RowCol";
import { AiOutlineDashboard } from "react-icons/ai";
import { ImStatsBars2 } from "react-icons/im";
import { COUNTRIES } from "../../../constants";
import type { DropDownPropsWithId } from "../../ui/dropdown/types";
import { useAuth } from "../../../context/AuthContext";

const Menu = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const callback = (item: DropDownPropsWithId | null): void => {
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
        {location.pathname === "/dashboard/home" && (
          <SingleSelect
            data={COUNTRIES}
            defaultValue={COUNTRIES[0]}
            selectHandler={callback}
            formFieldName="country"
          />
        )}
      </div>
      <Row className={styles.profile} onClick={logout}>
        <div className={styles.user}>DC</div>
        <div>Logout</div>
      </Row>
    </Row>
  );
};
export default Menu;

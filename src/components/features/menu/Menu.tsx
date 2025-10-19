import { Link, useLocation } from "react-router-dom";
import styles from "./Menu.module.css";
// import { SingleSelect } from "../../ui/dropdown/DropDown";
import { Row } from "../../layouts/row_col/RowCol";
import { AiOutlineDashboard } from "react-icons/ai";
import { ImStatsBars2 } from "react-icons/im";
// import { COUNTRIES } from "../../../constants";
// import type { DropDownPropsWithId } from "../../ui/dropdown/types";
import { useAuth } from "../../../context/AuthContext";
import Filters from "../filters/Filters";

export const MenuItem = ({
  path,
  icon,
  label,
}: {
  path: string;
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <Link to={path} className={styles.menuItem}>
      {icon}
      {label}
    </Link>
  );
};

const Menu = () => {
  const location = useLocation();
  const { logout } = useAuth();
  // const callback = (item: DropDownPropsWithId | null): void => {
  //   console.log(item);
  // };
  return (
    <Row gap="30px" className={styles.root}>
      <Row className={styles.menu}>
        <MenuItem
          path="/dashboard"
          icon={<AiOutlineDashboard size={20} />}
          label="Dashboard"
        />
        <MenuItem
          path="/dashboard/report"
          icon={<ImStatsBars2 size={18} />}
          label="Report"
        />
        {location.pathname === "/dashboard/home" && (
          // <SingleSelect
          //   data={COUNTRIES}
          //   defaultValue={COUNTRIES[0]}
          //   selectHandler={callback}
          //   formFieldName="country"
          // />
          <Filters />
        )}
      </Row>
      <Row className={styles.profile} onClick={logout}>
        <div className={styles.user}>DC</div>
        <div>Logout</div>
      </Row>
    </Row>
  );
};
export default Menu;

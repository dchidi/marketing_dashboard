import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import styles from "./DropDown.module.css";
import { Row } from "../../layouts/row_col/RowCol";
import { useDropdown } from "./useDropdown";

export const SingleSelect = () => {
  const { countries, country, countryHandler, showDropdown, setShowDropdown } =
    useDropdown();

  return (
    <>
      <div className={styles.root}>
        <Row
          gap="10px"
          className={styles.selected}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {country}
          {showDropdown ? <FaCaretUp /> : <FaCaretDown />}
        </Row>
        <ul
          className={`${styles.dropdown} ${
            showDropdown ? styles.showMenu : styles.hideMenu
          }`}
        >
          {countries.map(({ id, code, name }) => (
            <li key={id} onClick={() => countryHandler(code)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const MultiSelect = () => {
  return <div></div>;
};

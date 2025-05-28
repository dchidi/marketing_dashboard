import styles from "./Loading.module.css";
export const Loading = () => {
  return (
    <div className={styles.root}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

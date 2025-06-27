import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Column, Row } from "../components/layouts/row_col/RowCol";
import styles from "./css/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <Row className={styles.root}>
      <Column className={styles.left}>
        <div className={styles.displayName}>
          <h3>Marketing Dashboard</h3>
          <h2>Petcover</h2>
        </div>
        <img
          src="./1.png"
          alt="dashboard"
          loading="lazy"
          draggable="false"
          className={styles.img}
        />
      </Column>
      <Column className={styles.right}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.title}>Login</h3>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      </Column>
    </Row>
  );
}

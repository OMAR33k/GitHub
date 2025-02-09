// src/components/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from '../../Styles/MainStyle.module.css';

const MainLayout = () => {
  return (
    <div id={styles.root}>
      <Header />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

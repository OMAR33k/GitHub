import React from 'react';
import styles from '../../Styles/Loader.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";


const Loader = () => {
    const { t } = useTranslation();
  return (
    <div className={`${styles.loaderContainer} d-flex justify-content-center align-items-center vh-100`}>
      <div className={styles.neoLoader}>
        <div className={styles.neoLoaderInner}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={styles.neoLoaderBar}></div>
          ))}
        </div>
        <div className={`${styles.loaderText} mt-4`}>
          {/* <span className="h5 text-primary fw-light">{t("loading")}</span> */}
        </div>
      </div>
    </div>
  );
};

export default Loader;
// src/components/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidbar from "../sidbar/Sidbar"; // تأكد من صحة المسار واسم الملف
import styles from '../../Styles/DashboardLayout.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidbar />
      <div className={styles.dashboardContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

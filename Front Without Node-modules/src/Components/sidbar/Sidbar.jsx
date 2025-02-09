import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { HouseDoor, Person, Book, Gear } from "react-bootstrap-icons";
import styles from "../../Styles/SidbarStyle.module.css";
import { FaHome } from "react-icons/fa";

const Sidbar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3>لوحة التحكم</h3>
      </div>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard/Statistics" className={styles.navLink}>
          <HouseDoor className={styles.icon} />
          الإحصائيات
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/courses" className={styles.navLink}>
          <Book className={styles.icon} />
          دوراتي
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/profile" className={styles.navLink}>
          <Person className={styles.icon} />
          الملف الشخصي
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/settings" className={styles.navLink}>
          <Gear className={styles.icon} />
          الإعدادات
        </Nav.Link>
        <Nav.Link as={Link} to="/" className={styles.navLink}>
          <FaHome className={styles.icon} />
          الرئيسية 
        </Nav.Link>
      </Nav>
    </aside>
  );
};

export default Sidbar;
